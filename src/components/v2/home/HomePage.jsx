import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import { BothSides } from './BothSides'
import { ClosingCta } from './ClosingCta'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'

/**
 * HomePage — the root (/) HUB (Aug 2026 restructure).
 *
 * The root used to be the seller page. Because paid traffic goes to
 * dedicated landing pages and only organic / brand / direct / referral
 * visitors land on "/", the home's real job is ORIENTATION, not
 * conversion — so it is now a lean router:
 *
 *   1. Hub hero      — navy, compact. The two-sided thesis in one line.
 *   2. BothSides     — the two audience doors (For Sellers -> /sellers,
 *                       For Buyers -> /buyers). The primary choice.
 *   3. Multiplex     — the flagship specialty band, framed as the thing
 *                       that spans both sides -> /multiplex. Placed UNDER
 *                       the two doors so it reads as "our specialty", not
 *                       a competing third audience.
 *   4. ClosingCta    — the close.
 *
 * The full seller experience lives at /sellers (SellersPage); the buyer
 * experience at /buyers; the multiplex hub at /multiplex.
 */
export function HomePage() {
  return (
    <>
      {/* Hub hero — full-bleed navy aerial: hundreds of dark homes, one lit.
          The "value most people miss / standing out from the crowd" image,
          pulled up under the sticky header. Two audience pills + a primary
          CTA sit above the fold, then the page hands off to the two doors. */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate min-h-[660px] sm:min-h-[600px] lg:min-h-[640px] -mt-16 sm:-mt-20"
      >
        {/* Shared navy hero backdrop (gradient + faint blueprint grid). */}
        <HeroBackdrop />

        <div className="relative container w-full pt-28 pb-14 sm:pt-40 sm:pb-20">
          <div className="max-w-[600px]">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-bronze flex-shrink-0" />
              <p className="font-sans font-semibold text-[12.5px] uppercase tracking-[0.18em] text-bronze">
                Ontario Real Estate
              </p>
            </div>

            <h1 className="mt-5 font-sans font-semibold text-stone leading-[1.08] tracking-[-0.015em] text-[clamp(2.3rem,5vw,3.7rem)]">
              We find the value
              <br />
              most people{' '}
              <span className="font-emph italic font-medium text-bronze">miss.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[16.5px] leading-[1.6] text-stone-soft">
              Both sides of the table: complex, high-value sales for sellers,
              and the upside most buyers scroll past. One eye for the details
              that decide the outcome.
            </p>

            {/* Two audience pills — the primary routing decision, above the
                fold. Bronze-outlined on navy, filling on hover. */}
            <ul className="mt-7 grid grid-cols-2 gap-2.5 max-w-sm">
              {[
                { label: 'For Sellers', to: '/sellers' },
                { label: 'For Buyers', to: '/buyers' },
              ].map((p) => (
                <li key={p.label} className="flex">
                  <Link
                    to={p.to}
                    className="
                      inline-flex items-center justify-center w-full gap-1.5
                      px-5 py-2.5 rounded-full
                      border border-bronze/70 bg-navy/25 backdrop-blur-[2px]
                      font-sans font-semibold text-[13.5px] leading-none text-stone
                      hover:border-bronze hover:bg-bronze hover:text-navy
                      transition-colors duration-200
                    "
                  >
                    {p.label}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button as={Link} to="/contact" variant="contrast" size="lg" className="justify-center shadow-card">
                <Calendar className="h-4 w-4" strokeWidth={1.9} />
                Book a free 15-minute call
              </Button>
              <a
                href="tel:+13656457332"
                className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-[15px] text-stone hover:text-bronze transition-colors"
              >
                <Phone className="h-4 w-4" strokeWidth={1.9} />
                Or call (365) 645-7332
              </a>
            </div>

            <p className="mt-7 font-sans font-semibold text-[12px] uppercase tracking-[0.16em] text-stone-mute">
              Greater Toronto &amp; Hamilton Area &middot; Kitchener-Waterloo
            </p>

            <p className="mt-4 max-w-md text-[12px] text-stone-mute leading-relaxed">
              Real estate services by Resolve, delivered through{' '}
              <span className="font-semibold text-stone">
                HomeLife G1 Realty Inc., Brokerage
              </span>
              . Independently Owned &amp; Operated.
            </p>
          </div>
        </div>
      </section>

      {/* The two audience doors */}
      <BothSides />

      {/* Multiplex Advantage — the flagship specialty (navy) */}
      <section data-surface="navy" className="bg-navy section-y">
        <div className="container max-w-4xl">
          <Eyebrow>The Specialty</Eyebrow>
          <h2 className="mt-4 font-display font-medium text-stone text-display-lg leading-[1.1]">
            The Multiplex{' '}
            <span className="font-display italic text-bronze">Advantage.</span>
          </h2>
          <p className="mt-6 max-w-[650px] text-[17px] leading-relaxed text-stone/85">
            Whether you are selling a lot that could hold more, or buying one to
            build on, this is where we go deepest. Under Ontario&rsquo;s new
            rules many lots can support three to six units, and we bring the
            strategy and a build partner to turn it into a plan, subject to city
            by-laws, permits and a site-specific review.
          </p>
          <div className="mt-8">
            <Button as={Link} to="/multiplex" variant="contrast" size="lg">
              Explore the Multiplex Advantage <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
