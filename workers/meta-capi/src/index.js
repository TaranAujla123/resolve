// -----------------------------------------------------------------------
// workers/meta-capi/src/index.js
// -----------------------------------------------------------------------
// Cloudflare Worker: Meta Conversions API (CAPI) relay for resolveproperty.ca
//
// The Resolve site is static (GitHub Pages) and the form posts to Formspree,
// so there is no server to send server-side conversions. This Worker is that
// server. The site's form handler POSTs a Lead here; the Worker SHA-256
// hashes the email/phone and forwards the event to Meta's Conversions API.
//
// The browser also fires the same Lead via the Pixel with the SAME event_id,
// and Meta deduplicates the two into one conversion.
//
// Secrets (set with `wrangler secret put <NAME>` — never commit these):
//   META_PIXEL_ID            the Resolve Meta Ads V2 Pixel ID
//   META_CAPI_ACCESS_TOKEN   Events Manager -> Pixel -> Settings -> Conversions
//                            API -> Generate access token
// -----------------------------------------------------------------------

const GRAPH_VERSION = 'v18.0'

// Origins allowed to call this relay. Same-origin (Worker routed at
// resolveproperty.ca/api/meta-capi) needs no CORS, but we set permissive
// headers so a *.workers.dev cross-origin setup also works.
const ALLOWED_ORIGINS = ['https://resolveproperty.ca', 'https://www.resolveproperty.ca']

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Meta normalization: email lowercased + trimmed; phone reduced to digits,
// defaulting a 10-digit North American number to a 1-prefixed E.164 form.
const normalizeEmail = (e) => (e || '').trim().toLowerCase()
function normalizePhone(p) {
  let d = (p || '').replace(/[^0-9]/g, '')
  if (!d) return ''
  if (d.length === 10) d = '1' + d
  return d
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin)
    }
    if (!env.META_PIXEL_ID || !env.META_CAPI_ACCESS_TOKEN) {
      return json({ error: 'CAPI not configured' }, 500, origin)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin)
    }

    const ud = body.user_data || {}
    const userData = {
      // Captured server-side from the request — more reliable than client values.
      client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
      client_user_agent: ud.user_agent || request.headers.get('User-Agent') || undefined,
    }
    const em = normalizeEmail(ud.email)
    if (em) userData.em = [await sha256Hex(em)]
    const ph = normalizePhone(ud.phone)
    if (ph) userData.ph = [await sha256Hex(ph)]
    if (ud.fbp) userData.fbp = ud.fbp
    if (ud.fbc) userData.fbc = ud.fbc

    const event = {
      event_name: body.event_name || 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: body.event_source_url,
      action_source: 'website',
      user_data: userData,
      custom_data: body.custom_data || {},
    }

    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${env.META_PIXEL_ID}/events`
    let fbResp
    try {
      fbResp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [event], access_token: env.META_CAPI_ACCESS_TOKEN }),
      })
    } catch {
      return json({ ok: false, error: 'Upstream request failed' }, 502, origin)
    }

    // Do not echo Meta's raw response (or the token) back to the browser.
    return json({ ok: fbResp.ok }, fbResp.ok ? 200 : 502, origin)
  },
}
