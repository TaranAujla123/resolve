import React from 'react'

/**
 * WhatThisCosts — cost-transparency callout block.
 *
 * Mounted on every page that carries a closing CTA: the home page's
 * "Ready to talk?" section and each of the six situation deep-dive
 * pages. Cost transparency is a per-page trust signal, not a single
 * hero callout — a visitor landing directly on /power-of-sale via
 * paid traffic needs to see the same answer to "what does this cost
 * me?" without having to navigate to the home page.
 *
 * Surface: Warm Stone (same as the section it sits inside).
 * Layout: stacked block — eyebrow + headline + body.
 *
 * Source of truth for copy: locked by user on this turn.
 */
export function WhatThisCosts({ className = '' }) {
  return (
    <div
      data-component="what-this-costs"
      className={`max-w-[520px] ${className}`.trim()}
    >
      {/* Eyebrow — Inter 600, 12px, 2.4px letter-spacing, uppercase,
          bronze. Matches the brand eyebrow rhythm without using the
          Eyebrow shared component because this block needs slightly
          tighter spacing than the section-level eyebrow. */}
      <p className="font-sans font-semibold text-[12px] uppercase tracking-[0.2em] text-bronze leading-none">
        What This Costs
      </p>

      {/* Headline — Newsreader 500, 28-32px, navy, line-height 1.1.
          Spaced 14px below eyebrow. */}
      <h3 className="mt-[14px] font-display font-medium text-navy text-[clamp(1.625rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.01em]">
        Nothing upfront.
      </h3>

      {/* Body — Inter 400, 16-17px, navy-soft, line-height 1.55.
          Spaced 16px below headline. */}
      <p className="mt-[16px] text-[16.5px] leading-[1.55] text-navy-soft">
        We&rsquo;re paid only when the sale closes, at standard
        commission. No hidden fees. No retainers. The first call is
        always free.
      </p>
    </div>
  )
}
