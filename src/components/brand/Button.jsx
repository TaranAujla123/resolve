import React from 'react'

/**
 * Button — the V2 brand button.
 *
 * Two locked variants:
 *   - primary  → navy fill, stone text. The default CTA.
 *   - outline  → transparent fill, current-color border. Used inside the
 *                Navy "A Different Approach" panel (stone outline) and
 *                anywhere a softer affordance is needed against a busy
 *                surface.
 *
 * The brief specifies Inter 600 uppercase tracked for the CTA label.
 * Sizing presets:
 *   - md (default): comfortable in body sections
 *   - lg: hero CTA
 *   - sm: dense nav / footer / inline placements
 *
 * Polymorphic via `as` — renders <button> by default; pass `as="a"` to
 * render as a link (still keeps the same classes).
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
    primary:
      'bg-navy text-stone border border-navy hover:bg-[#051F35] hover:border-[#051F35] transition-colors',
    outline:
      'bg-transparent text-current border border-current hover:bg-current/10 transition-colors',
    ghost:
      'bg-transparent text-navy hover:bg-navy/5 transition-colors',
  }[variant]

  const sizeClass = {
    sm: 'px-4 py-2 text-[12px]',
    md: 'px-5 py-3 text-[13px]',
    lg: 'px-6 py-3.5 text-[13.5px]',
  }[size]

  return (
    <Tag
      className={[
        'inline-flex items-center gap-2',
        'font-semibold uppercase tracking-[0.12em]',
        'rounded-md',
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
