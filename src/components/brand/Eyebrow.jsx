import React from 'react'

/**
 * Eyebrow — small uppercase tracked label that sits above headlines.
 *
 * Locked styling: Inter 600, 13px, 0.18em tracking, uppercase, Bronze on
 * Stone/Mist/Rose surfaces. On a Navy panel pass `onDark` so it switches
 * to a slightly muted stone tone (still readable against the deep navy
 * but not screaming).
 *
 * Source of truth: Brand-System-V2/typography.md
 */
export function Eyebrow({ onDark = false, as: Tag = 'p', children, className = '' }) {
  const tone = onDark ? 'text-bronze' : 'text-bronze'
  return (
    <Tag
      className={[
        'font-sans font-semibold uppercase',
        'text-[12.5px] sm:text-[13px]',
        'tracking-[0.18em]',
        'leading-tight',
        tone,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  )
}
