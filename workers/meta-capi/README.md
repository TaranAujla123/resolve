# Meta Conversions API relay (Cloudflare Worker)

Server-side companion to the Meta Pixel. The static Resolve site (GitHub Pages)
and Formspree cannot send server-side conversions, so this Worker does it. The
site form POSTs a `Lead` here; the Worker hashes email/phone and forwards the
event to Meta. The browser fires the same `Lead` via the Pixel with the **same
`event_id`**, and Meta deduplicates the pair into one conversion.

## One-time setup

1. Install Wrangler and log in:
   ```
   npm i -g wrangler
   wrangler login
   ```
2. From `workers/meta-capi/`, set the two secrets (never commit these):
   ```
   wrangler secret put META_PIXEL_ID            # Resolve Meta Ads V2 Pixel ID
   wrangler secret put META_CAPI_ACCESS_TOKEN   # Events Manager > Pixel > Settings > Conversions API > Generate access token
   ```
3. Choose routing (see `wrangler.toml`):
   - **Same-origin (preferred):** if `resolveproperty.ca` DNS is on Cloudflare,
     add the zone, uncomment the `[[routes]]` block, and the site can keep
     `VITE_META_CAPI_ENDPOINT=/api/meta-capi` (no CORS).
   - **workers.dev (fallback):** if the domain is not on Cloudflare, deploy to
     the default `*.workers.dev` URL and set the site's
     `VITE_META_CAPI_ENDPOINT` to that full URL (the Worker already returns CORS
     headers for resolveproperty.ca).
4. Deploy:
   ```
   wrangler deploy
   ```

## Verify

- Events Manager → Pixel → **Test events**: submit the site form and confirm a
  `Lead` arrives from both **Browser** and **Server**, deduplicated by event ID.

## Aggregated Event Measurement (configured in the UI, not in code)

In **Events Manager → Aggregated Event Measurement → Configure Web Events** for
`resolveproperty.ca`, set **Lead** as the highest-priority event (slot 1). AEM
caps a verified domain at 8 prioritized events and governs measurement for
users who opt out of tracking on iOS, so Lead must sit at the top to keep the
conversion measurable. This step requires the domain to be **verified** first
(see domain verification below).

## Domain verification

`resolveproperty.ca` must be verified in **Business Settings → Brand Safety →
Domains**. The verification code goes in the
`<meta name="facebook-domain-verification">` tag in the repo root `index.html`
(currently a placeholder with a TODO). After deploying the site with the real
code, click **Verify** in Business Settings.
