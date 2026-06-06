import React from 'react'

/**
 * ResolveWordmark — the canonical Resolve brand mark.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §3
 * Geometry: lowercase "Re·solve" in Newsreader 500 with a bronze
 * interpunct dot at x-height, an optional 1.5px divider, and a small
 * bronze "SELLER REPRESENTATION" descriptor underneath.
 *
 * All proportions are em-relative so the host element controls scale by
 * setting font-size on the outer .resolve-wordmark element. Examples:
 *   - 56px in the nav (desktop)
 *   - 44px in the nav (mobile)
 *   - 180px in the hero
 *   - 32px in the footer
 *
 * Variants:
 *   - light (default): navy ink on a Stone / Mist / Rose background
 *   - dark: stone ink on a Navy background
 *
 * Props:
 *   variant: 'light' | 'dark'
 *   showDescriptor: boolean — hide the descriptor for compact placements
 *   className: extra classes for the outer element (e.g., to set font-size)
 */
export function ResolveWordmark({
  variant = 'light',
  showDescriptor = true,
  className = '',
}) {
  const variantClass =
    variant === 'dark' ? 'resolve-wordmark--dark' : 'resolve-wordmark--light'
  return (
    <div
      className={`resolve-wordmark ${variantClass} ${className}`.trim()}
      aria-label="Resolve · Seller Representation"
      role="img"
    >
      <span className="wm">
        Re<span className="dot" aria-hidden="true" />solve
      </span>
      {showDescriptor && (
        <>
          <div className="divider" aria-hidden="true" />
          <div className="descriptor">Seller Representation</div>
        </>
      )}
    </div>
  )
}
