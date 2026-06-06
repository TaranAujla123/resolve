import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import architectural from '/hero-architectural.jpg?url'

/**
 * DifferentApproach — V2 home page "A Different Approach" anchor block.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Home —
 * A Different Approach).
 *
 * Split layout. Left half is the Navy emphasis panel (with a darkened
 * architectural photo overlay). Right half stays on the Stone surface
 * and carries the "You Can Expect" bullet list with bronze ring
 * checkmarks.
 *
 * Per the surface-rhythm rules: this is the page's Navy moment. Used
 * at most once per page to anchor the positioning punchline.
 */
const EXPECTATIONS = [
  'Honest advice and clear options',
  'Straightforward communication',
  'Experienced negotiation',
  'Solutions tailored to your situation',
  'A respectful, supportive experience',
]

export function DifferentApproach() {
  return (
    <section data-surface="navy" aria-label="A different approach">
      {/* Navy column is slightly wider than half (58/42) so the
          emphasis side carries more visual weight than the
          expectations side, per the user's tuning pass. */}
      <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr]">
        {/* Left — navy + architectural */}
        <div className="relative bg-navy text-stone overflow-hidden">
          {/*
            Image lives only in the right ~60% of the panel so the left
            text column has solid navy underneath it. A soft left-edge
            fade blends the photo into the navy field instead of butting
            against it with a hard seam. Same compositional technique
            as the Hero's right-side image.

            filter: brightness(1.12) contrast(1.05) pushes the
            staircase composition forward visually so it actually
            reads against the deep navy panel rather than melting into
            it.
          */}
          <div className="absolute inset-y-0 right-0 w-[62%] pointer-events-none">
            <img
              src={architectural}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-right"
              style={{ filter: 'brightness(1.02) contrast(1.04)' }}
              loading="lazy"
              decoding="async"
            />
            {/* Soft fade on the image's left edge so it blends into
                the navy field rather than butting. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-navy to-transparent"
            />
            {/* Subtle top + bottom feathering for editorial finish. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-navy/70 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-navy/70 to-transparent"
            />
          </div>
          <div className="relative px-6 sm:px-10 lg:px-16 py-16 lg:py-24 max-w-2xl">
            <Eyebrow onDark>A Different Approach</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-stone text-display-md">
              Most agents market property.
            </h2>
            <p className="mt-1 font-display font-medium italic text-bronze text-display-md leading-[1.05]">
              We solve property problems.
            </p>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-stone-soft">
              When the situation is complicated, you need more than a sign in
              the yard. You need an experienced team who can see the
              full picture, reduce risk and guide you to the right decision.
            </p>
            <Button
              as={Link}
              to="/about"
              variant="outline"
              size="md"
              className="mt-8 text-stone"
            >
              Learn More About How We Help
            </Button>
          </div>
        </div>

        {/* Right — stone + expectations */}
        <div className="bg-stone">
          <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 max-w-xl">
            <Eyebrow>You Can Expect</Eyebrow>
            <ul className="mt-8 space-y-5">
              {EXPECTATIONS.map((line) => (
                <li key={line} className="flex items-start gap-3.5">
                  <span className="
                    inline-flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center
                    rounded-full border border-bronze/60 text-bronze
                    mt-[1px]
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
