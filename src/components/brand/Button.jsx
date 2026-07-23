import React from 'react'

/**
 * Button — the V3.5 brand button.
 *
 * Buttons are NOT the accent colour — bronze stays reserved for the
 * logo and the one emphasis word per headline, so CTAs read on their
 * own weight:
 *   - primary  → navy fill, white text. The default CTA on LIGHT
 *                surfaces.
 *   - contrast → cream/stone fill, navy text. The CTA on NAVY surfaces
 *                (hero, closing band) — higher contrast than a colour
 *                fill and keeps the accent special.
 *   - outline  → transparent, bronze border + text on light; pass
 *                `className="text-stone border-stone/50"` on navy.
 *   - ghost    → transparent, navy text.
 *
 * Sentence case, 14px radius, Poppins SemiBold. ≥44px tap height at
 * md/lg. Polymorphic via `as`.
 */
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const variantClass = {
    // Light-section CTA: gold fill (#B89865), navy text. Gold buttons
    // pop on white where a cream button would disappear.
    primary:
      'bg-[#B89865] text-white border border-[#B89865] hover:bg-[#a5875a] hover:border-[#a5875a] transition-colors',
    // Navy-section CTA: cream/stone fill, navy text.
    contrast:
      'bg-stone text-navy border border-stone hover:bg-white hover:border-white transition-colors',
    outline:
      'bg-transparent text-bronze border border-bronze hover:bg-bronze/10 transition-colors',
    ghost:
      'bg-transparent text-navy hover:bg-navy/5 transition-colors',
  }[variant]

  const sizeClass = {
    sm: 'px-4 py-2.5 text-[13px]',
    md: 'px-6 py-3 text-[14px]',
    lg: 'px-7 py-3.5 text-[15px]',
  }[size]

  return (
    <Tag
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-sans font-semibold',
        'rounded-button',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-stone',
        variantClass,
        sizeClass,
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
