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
 * the hero) ahead of the global Footer.
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
    // V3: the ONE substantial navy band on the consumer pages, sitting
    // just above the navy footer. This is where the institutional
    // weight lives now that the rest of the site is light — a quiet,
    // deep close that signals the practice can sit across from a lender.
    <section data-surface="navy" className="bg-navy text-stone section-y">
      <div className="container grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Left — couplet + CTA */}
        <div className="max-w-xl">
          <h2 className="font-sans font-semibold text-stone text-display-md leading-[1.14]">
            Ready to talk? We&rsquo;re here when you&rsquo;re{' '}
            <span className="font-emph italic font-normal text-bronze">ready.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-stone-soft">
            A confidential conversation is the first step toward a clearer path
            forward. Quiet, structured, and on your terms.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button as={Link} to="/contact" variant="contrast" size="lg" className="justify-center">
              Book a free 15-minute call
            </Button>
            <Button
              as="a"
              href="tel:+13656457332"
              variant="outline"
              size="lg"
              className="justify-center text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} />
              (365) 645-7332
            </Button>
          </div>

          {/* Cost-transparency callout — dark variant on the navy band. */}
          <WhatThisCosts onDark className="mt-12 pt-10 border-t border-white/15" />
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
              <p className="mt-3.5 font-sans font-semibold text-[14.5px] text-stone">
                {label}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-stone-soft">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
