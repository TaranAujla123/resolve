import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * Analytics — Google Analytics 4 + Google Ads conversion tracking.
 *
 * Reads three Vite env variables (set in Cloudflare Pages → Settings →
 * Environment variables on the resolve project):
 *
 *   VITE_GA_MEASUREMENT_ID         e.g. "G-XXXXXXXXXX"
 *   VITE_GOOGLE_ADS_ID             e.g. "AW-1234567890"
 *   VITE_GOOGLE_ADS_CONVERSION_LABEL  e.g. "abcDEFghiJKL" (the suffix
 *                                  after the slash in Google Ads
 *                                  conversion snippet)
 *
 * If neither GA nor Ads ID is set, this component renders nothing —
 * the site ships analytics-free until the IDs are populated. So the
 * scaffold can be merged before the accounts are created.
 *
 * Privacy posture:
 *   - We collect standard GA4 pageview + Google Ads click attribution.
 *   - No session replay, no Facebook Pixel, no Hotjar.
 *   - Per Resolve's audience (distressed Ontario sellers), this stays
 *     intentionally lean: enough to optimise paid spend, no further.
 *   - A short privacy line lives in the Footer naming what is collected.
 *
 * The component fires page_view automatically via gtag's default
 * config. Per-route page_view re-firing on SPA navigation is handled
 * via the `AnalyticsRouteTracker` companion below, which listens to
 * react-router location changes.
 */
export function Analytics() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID

  if (!gaId && !adsId) return null

  // Primary tag = whichever ID is configured first. gtag.js loads once
  // and accepts multiple `gtag('config', ID)` calls for additional
  // property streams.
  const primaryId = gaId || adsId

  // Build the gtag init script. send_page_view: false on the GA
  // config so we control page_view firing on SPA route changes via
  // AnalyticsRouteTracker below — otherwise we get a double-count on
  // the initial load.
  const initLines = [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js', new Date());",
  ]
  if (gaId) {
    initLines.push(`gtag('config', '${gaId}', { send_page_view: false });`)
  }
  if (adsId) {
    initLines.push(`gtag('config', '${adsId}');`)
  }

  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <script>{initLines.join('\n')}</script>
    </Helmet>
  )
}

/**
 * AnalyticsRouteTracker — listens for react-router location changes
 * and fires a fresh `page_view` event so SPA navigation registers in
 * GA4 as distinct pageviews. Mount once at the App root.
 */
export function AnalyticsRouteTracker({ pathname }) {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID

  React.useEffect(() => {
    if (!gaId) return
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, gaId])

  return null
}

/**
 * fireConversion — call from the /thanks page after a successful form
 * submission so Google Ads counts the lead as a conversion. Safe to
 * call when no Ads ID is configured (returns silently).
 */
export function fireConversion() {
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID
  const label = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL

  if (!adsId || !label) return
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${label}`,
  })
}
