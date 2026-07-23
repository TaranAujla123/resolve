import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import architectural from '/hero-architectural.jpg?url'

/**
 * DifferentApproach — home "A Different Approach" / "Why Us" anchor.
 *
 * V3.5: the navy split panel with the upward-staircase architectural
 * image is restored (V2 form). Left = navy emphasis panel with the
 * staircase photo (light climbing the stairs — "a way up"); right =
 * light "You Can Expect" list, hidden on mobile so the phone flows
 * from the thesis straight into the proof block below.
 *
 * Register updated to V3.5: Poppins 600 stone heading, ONE bronze
 * Newsreader-italic emphasis phrase ("property problems."), outlined
 * stone button. Carries `#why-resolve` for the header "Why Us" nav.
 */
const EXPECTATIONS = [
  'A clear read on what the sale can look like',
  'Straightforward communication',
  'Experienced negotiation',
  'A listing approach built around your timeline',
  'A respectful, supportive experience',
]

export function DifferentApproach() {
  return (
    <section
      id="why-resolve"
      data-surface="navy"
      aria-label="A different approach — Why Resolve"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr]">
        {/* Left — navy + architectural staircase */}
        <div className="relative bg-navy text-stone overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-[62%] pointer-events-none">
            <img
              src={architectural}
              alt=""
              aria-hidden="true"
              className="
                absolute inset-0 w-full h-full object-cover object-right
                brightness-[0.65] contrast-[1.08]
                lg:brightness-[1.02] lg:contrast-[1.04]
              "
              loading="lazy"
              decoding="async"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-navy/45 lg:bg-transparent" />
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-navy to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-navy/70 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-navy/70 to-transparent" />
          </div>
          <div className="relative px-6 sm:px-10 lg:px-16 py-16 lg:py-24 max-w-2xl">
            <Eyebrow>A Different Approach</Eyebrow>
            <h2 className="mt-5 font-sans font-semibold text-stone text-display-md leading-[1.14]">
              Most agents market property.
              <br />
              We solve{' '}
              <span className="font-emph italic font-normal text-bronze">property problems.</span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-stone-soft">
              When the situation is complicated, you need more than a sign in
              the yard. You need an experienced team who can see the full
              picture, run the right sale and protect what you have built.
            </p>
            <Button
              as={Link}
              to="/about"
              variant="outline"
              size="md"
              className="mt-8 text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
            >
              Learn more about how we help
            </Button>
          </div>
        </div>

        {/* Right — light "You Can Expect" list. Hidden on mobile (the
            thesis + the proof block below already carry the phone). */}
        <div className="hidden lg:block bg-stone">
          <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 max-w-xl">
            <Eyebrow>You Can Expect</Eyebrow>
            <ul className="mt-8 space-y-5">
              {EXPECTATIONS.map((line) => (
                <li key={line} className="flex items-start gap-3.5">
                  <span className="
                    inline-flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center
                    rounded-full border border-bronze/60 text-bronze mt-[1px]
                  ">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[16px] leading-snug text-navy font-medium">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
