import React from 'react'
import { Shield, MessageSquare, Users, Lock, Target } from 'lucide-react'

/**
 * TrustStrip — the locked 5-pillar trust strip that sits above the
 * footer on every page.
 *
 * Source of truth: Brand-System-V2/icons.md (5 Brand Pillars) +
 * claude-code-v2-build.md §5
 *
 * Five cells, locked copy and locked icons:
 *   1. Experienced Guidance     Shield
 *   2. Practical Solutions      MessageSquare
 *   3. Personal Approach        Users
 *   4. Discreet & Confidential  Lock
 *   5. Focused on Results       Target
 *
 * Icons: navy line-art, 1.5px stroke, 44px rendered. Labels Inter 500
 * 16px navy. 1px vertical dividers (Light Divider) between cells.
 *
 * Lays out as a 5-column horizontal strip on desktop, collapses to a
 * 2-column grid on tablet and a single column on mobile so the icon +
 * label pair stays comfortably readable at every viewport.
 */
const PILLARS = [
  { Icon: Shield, label: 'Experienced Guidance' },
  { Icon: MessageSquare, label: 'Practical Solutions' },
  { Icon: Users, label: 'Personal Approach' },
  { Icon: Lock, label: 'Discreet & Confidential' },
  { Icon: Target, label: 'Focused on Results' },
]

export function TrustStrip() {
  return (
    <section
      data-surface="stone"
      className="bg-stone border-y border-divider"
      aria-label="Resolve brand pillars"
    >
      <div className="container py-8 sm:py-10">
        <ul
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
            gap-y-6 gap-x-0
            divide-y divide-divider lg:divide-y-0 lg:divide-x lg:divide-divider
          "
        >
          {PILLARS.map(({ Icon, label }) => (
            <li
              key={label}
              className="
                flex items-center gap-4
                px-0 lg:px-6
                py-4 lg:py-0
              "
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-10 w-10 sm:h-11 sm:w-11 text-navy flex-shrink-0"
              />
              <span className="font-sans font-medium text-[15.5px] leading-snug text-navy">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
