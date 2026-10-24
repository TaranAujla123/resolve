import React from 'react'
import wordmarkNavy from '/logo-wordmark-navy.png?url'
import wordmarkLight from '/logo-wordmark-light.png?url'
import lockupNavy from '/logo-lockup-navy.png?url'
import logoLight from '/logo-v3-light.png?url'

/**
 * ResolveWordmark — the canonical Resolve brand mark (V3.5).
 *
 * Pre-baked PNG lockups: Poppins "re" (bronze) + the interpunct dot +
 * Newsreader italic "solve". The full lockup also carries the "SELLER
 * REPRESENTATION" descriptor.
 *
 * V3.5 surfaces are navy (nav + footer), so the primary assets are the
 * bronze-on-navy renders:
 *   - showDescriptor={false} → wordmark only (nav). Bronze "re", cream
 *     "solve". No descriptor (it garbles at nav size).
 *   - variant="dark" (default full lockup) → full lockup with descriptor
 *     for the navy footer.
 *   - variant="light" → light-surface full lockup, kept for any light
 *     placement (not currently mounted).
 *
 * Height is set by the caller via a Tailwind class in `className`
 * (e.g. "h-7"); width auto-scales. A default applies if none is given.
 *
 * tm={true} adds a small superscript ™ after the mark (RESOLVE,
 * CIPO application 2509938, filed 24 Oct 2026). Use ® only once the
 * mark is registered.
 */
export function ResolveWordmark({
  variant = 'dark',
  className = '',
  showDescriptor = true,
  tm = false,
}) {
  let src
  if (!showDescriptor) {
    // Wordmark-only: gold "re" + navy "solve" for a LIGHT nav surface,
    // gold "re" + cream "solve" for a NAVY nav surface.
    src = variant === 'light' ? wordmarkLight : wordmarkNavy
  } else {
    src = variant === 'light' ? logoLight : lockupNavy
  }
  const hasHeight = /\bh-/.test(className)
  const img = (
    <img
      src={src}
      alt="Resolve · Seller Representation"
      className={`block w-auto ${hasHeight ? '' : 'h-10'} ${className}`.trim()}
      draggable={false}
      decoding="async"
    />
  )
  if (!tm) return img
  // The ™ is absolutely positioned so it never changes the mark's size or
  // centring. Offsets are where the visible ink ends inside each PNG
  // (the files carry transparent padding): wordmark ink ends at 95.8% of
  // the width and starts 13.6% down; the full lockup at 93.6% and 14.2%.
  const pos = showDescriptor
    ? { left: '94.2%', top: '18%' }
    : { left: '96.4%', top: '20%' }
  return (
    <span className="relative inline-block">
      {img}
      <span
        aria-hidden="true"
        style={pos}
        className="absolute font-sans text-[8px] sm:text-[9px] font-semibold leading-none text-bronze"
      >
        ™
      </span>
    </span>
  )
}
