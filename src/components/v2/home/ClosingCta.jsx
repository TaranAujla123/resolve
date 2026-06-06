import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Calendar, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import { WhatThisCosts } from '@/components/brand/WhatThisCosts'

/**
 * ClosingCta — V2 home page closing call-to-action.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Home —
 * Closing CTA). Surface returns to Stone (the "visual rhyme" back to
 * the hero) ahead of the global TrustStrip + Footer.
 *
 * Two-column layout. Left: Newsreader couplet ("Ready to talk? / We're
 * here when you're ready.") + body + navy CTA pointing to /contact.
 * Right: four small feature cells (Confidential / No Obligation /
 * Ontario Focused / We're Here) with bronze Lucide icons.
 */
const FEATURES = [
  {
    Icon: Phone,
    label: 'Confidential',
    body: 'Your privacy is always protected.',
  },
  {
    Icon: Calendar,
    label: 'No Obligation',
    body: 'A conversation does not commit you to anything.',
  },
  {
    Icon: MapPin,
    label: 'Ontario Focused',
    body: 'Local knowledge. Regional experience. Better outcomes.',
  },
  {
    Icon: Mail,
    label: 'We are Here',
    body: 'Reach out by phone, email or through our secure form.',
  },
]

export function ClosingCta() {
  return (
    <section data-surface="stone" className="bg-stone section-y">
      <div className="container grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Left — couplet + CTA */}
        <div className="max-w-xl">
          <h2 className="font-display font-medium text-navy text-display-lg">
            Ready to talk?
          </h2>
          <p className="mt-1 font-display font-medium italic text-bronze text-display-lg leading-[1.05]">
            We&rsquo;re here when you&rsquo;re ready.
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-soft">
            A confidential conversation is the first step toward a clearer path
            forward.
          </p>
          <Button
            as={Link}
            to="/contact"
            variant="primary"
            size="lg"
            className="mt-8"
          >
            Contact Us Today
          </Button>

          {/* Cost-transparency callout — same WhatThisCosts component
              used on every situation deep-dive page so the answer to
              "what does this cost me?" is one consistent block across
              the site, not a one-time hero callout. */}
          <WhatThisCosts className="mt-12 pt-10 border-t border-divider" />
        </div>

        {/* Right — 4 small feature cells */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
          {FEATURES.map(({ Icon, label, body }) => (
            <li key={label}>
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-7 w-7 text-bronze"
              />
              <p className="mt-3.5 font-sans font-semibold text-[14.5px] text-navy">
                {label}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-soft">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
