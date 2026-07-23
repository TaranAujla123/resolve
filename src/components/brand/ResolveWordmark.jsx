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
 */
export function ResolveWordmark({
  variant = 'dark',
  className = '',
  showDescriptor = true,
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
  return (
    <img
      src={src}
      alt="Resolve · Seller Representation"
      className={`block w-auto ${hasHeight ? '' : 'h-10'} ${className}`.trim()}
      draggable={false}
      decoding="async"
    />
  )
}
