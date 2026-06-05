// -----------------------------------------------------------------------
// src/lib/metaPixel.ts
// -----------------------------------------------------------------------
// Meta (Facebook) Pixel — client-side tracking for the Resolve site.
//
// Posture:
//   - Pixel ID comes from VITE_META_PIXEL_ID. If unset, EVERYTHING here is
//     a no-op, so the scaffold ships inert until the ID is populated in
//     CI (GitHub Secret -> deploy.yml build env). The actual ID lives in
//     the Resolve Meta Ads V2 account -> Events Manager -> Pixel Settings.
//   - Every event carries an `eventID` so Meta can deduplicate the
//     client-side Pixel event against the matching server-side
//     Conversions API event (the Lead event is sent by both paths).
//   - No cookie-consent banner. Disclosure is handled in the footer notice
//     and the /privacy page (PIPEDA implied-consent posture). See the
//     Privacy Policy for what is collected and how to withdraw.
//   - The Pixel never initializes during the Puppeteer prerender step
//     (guarded on navigator.webdriver) so the build does not fire events
//     or bake fbq into the static HTML.
// -----------------------------------------------------------------------

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

const PIXEL_ID: string | undefined = import.meta.env.VITE_META_PIXEL_ID

// Situation route slug -> human-readable category passed as ViewContent
// content_category. Only these routes fire ViewContent.
const SITUATION_CATEGORY: Record<string, string> = {
  'mortgage-arrears': 'Mortgage arrears',
  'power-of-sale': 'Power of sale',
  'property-disputes': 'Property disputes',
  'divorce-real-estate': 'Separation / divorce',
  'estate-sale': 'Estate sale',
  'life-transitions': 'Life transitions',
}

// Puppeteer (the prerender step) sets navigator.webdriver = true. We use
// that to skip Pixel init/fire during the build so no events are sent and
// no fbq markup is captured into the prerendered HTML.
function isPrerender(): boolean {
  return typeof navigator !== 'undefined' && (navigator as any).webdriver === true
}

let initialized = false

/** Inject the fbq base code and init the Pixel. Idempotent and inert when unconfigured. */
export function initMetaPixel(): void {
  if (initialized) return
  if (!PIXEL_ID) return
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (isPrerender()) return

  /* Standard Meta Pixel base code (fbevents.js loader). */
  ;(function (f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', PIXEL_ID)
  initialized = true
}

/** RFC4122 v4 id used to dedupe the Pixel event against its CAPI twin. */
export function genEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function track(event: string, params: Record<string, any> = {}, eventID?: string): void {
  if (!PIXEL_ID) return
  if (typeof window === 'undefined' || !window.fbq) return
  if (isPrerender()) return
  window.fbq('track', event, params, eventID ? { eventID } : undefined)
}

export function trackPageView(): void {
  track('PageView', {}, genEventId())
}

export function trackViewContent(category: string): void {
  track('ViewContent', { content_category: category }, genEventId())
}

/** Lead is the only event also sent server-side (CAPI); pass the SHARED eventID. */
export function trackLead(params: Record<string, any>, eventID: string): void {
  track('Lead', params, eventID)
}

export function trackContact(): void {
  track('Contact', {}, genEventId())
}

/**
 * sendLeadToCapi — POST the Lead to the Conversions API relay (Cloudflare
 * Worker). Fire-and-forget with keepalive so it survives the navigation to
 * /thanks and never blocks form completion. The relay hashes email/phone;
 * we send them raw over HTTPS to our own endpoint only.
 *
 * The SAME event_id used in trackLead() must be passed here so Meta
 * deduplicates the browser and server events into one Lead.
 */
export function sendLeadToCapi(payload: {
  event_id: string
  event_source_url: string
  user_data: { email?: string; phone?: string }
  custom_data?: Record<string, any>
}): void {
  if (!PIXEL_ID) return
  const endpoint: string = import.meta.env.VITE_META_CAPI_ENDPOINT || '/api/meta-capi'
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        event_name: 'Lead',
        event_id: payload.event_id,
        event_source_url: payload.event_source_url,
        user_data: {
          email: payload.user_data.email || undefined,
          phone: payload.user_data.phone || undefined,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        },
        custom_data: payload.custom_data || {},
      }),
    }).catch(() => {})
  } catch {
    /* never let measurement break the form */
  }
}

/**
 * useMetaPixel — init the Pixel and fire PageView on every route change,
 * plus ViewContent on the situation routes. Call once with the current
 * react-router pathname.
 */
export function useMetaPixel(pathname: string): void {
  useEffect(() => {
    if (!PIXEL_ID) return
    initMetaPixel()
    trackPageView()
    const slug = pathname.replace(/^\/+|\/+$/g, '')
    if (SITUATION_CATEGORY[slug]) trackViewContent(SITUATION_CATEGORY[slug])
  }, [pathname])
}

/**
 * useMetaPixelContactLinks — one delegated document listener that fires a
 * Contact event when any tel: or sms: link is clicked, so we do not have
 * to instrument every phone/text button individually.
 */
export function useMetaPixelContactLinks(): void {
  useEffect(() => {
    if (!PIXEL_ID) return
    if (typeof document === 'undefined') return
    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null
      const link = el && el.closest ? el.closest('a[href^="tel:"], a[href^="sms:"]') : null
      if (link) trackContact()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
}
