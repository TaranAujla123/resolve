import React from 'react'

/**
 * Section — the surface-aware page section wrapper.
 *
 * The V2 design uses a three-tone background rhythm (Stone / Mist / Rose)
 * with Navy reserved for emphasis anchors. Every section on every page
 * declares which surface it sits on via the `surface` prop, so the
 * surface flow stays consistent and the developer can't accidentally
 * skip a tone.
 *
 * Source of truth: Brand-System-V2/colors.md (surface rhythm)
 *
 * Props:
 *   surface: 'stone' (default) | 'mist' | 'rose' | 'navy'
 *   id: HTML id for in-page anchors
 *   className: extra classes (e.g., min-h adjustments)
 *   container: render with the .container wrapper inside (default true)
 *   tight: trim the section-y padding for compact strips
 */
export function Section({
  surface = 'stone',
  id,
  className = '',
  container = true,
  tight = false,
  children,
}) {
  const surfaceClass = {
    stone: 'bg-stone',
    mist: 'bg-mist',
    rose: 'bg-rose',
    navy: 'bg-navy text-stone',
  }[surface]

  const paddingClass = tight ? 'py-8 sm:py-12' : 'section-y'
  const inner = container ? (
    <div className="container">{children}</div>
  ) : (
    children
  )
  return (
    <section
      id={id}
      data-surface={surface}
      className={`${surfaceClass} ${paddingClass} ${className}`.trim()}
    >
      {inner}
    </section>
  )
}
