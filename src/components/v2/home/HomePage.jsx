import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import { Situations } from './Situations'
import { BothSides } from './BothSides'
import { ClosingCta } from './ClosingCta'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'

/**
 * HomePage — the root (/), seller-led again (13 Oct 2026).
 *
 * The Aug 2026 two-door hub ("We find the value most people miss") is
 * retired as the hero: the practice's real files are sellers in complex
 * and high-value situations, so the home now speaks to them first,
 * without excluding ordinary sales or buyers.
 *
 *   1. Hero        — eyebrow "Complex & High-Value Sales" (matches the
 *                    LinkedIn banner), the "Selling isn't always
 *                    straightforward" headline (moved here from /sellers),
 *                    one booking CTA, no form. Buyers get one line.
 *   2. Situations  — the four situation cards (moved down from the hero,
 *                    so distress labels never lead the first impression).
 *   3. BothSides   — keeps the buyer door within the first scrolls.
 *   4. ClosingCta  — the close.
 *
 * No "how it works" mechanics here (lender notice, offer handling): that
 * is backend process, not homepage copy.
 */
export function HomePage() {
  return (
    <>
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate min-h-[620px] sm:min-h-[600px] lg:min-h-[640px] -mt-16 sm:-mt-20"
      >
        <HeroBackdrop />

        <div className="relative container w-full pt-28 pb-14 sm:pt-40 sm:pb-20">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-bronze flex-shrink-0" />
              <p className="font-sans font-semibold text-[12.5px] uppercase tracking-[0.18em] text-bronze">
                Complex &amp; High-Value Sales
              </p>
            </div>

            <h1 className="mt-5 font-sans font-semibold text-stone leading-[1.1] tracking-[-0.012em] text-[clamp(2.2rem,4.8vw,3.6rem)]">
              Selling isn&rsquo;t always straightforward.
              <br />
              <span className="font-medium">We make it </span>
              <span className="font-emph italic font-normal text-bronze">clearer.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-stone-soft">
              We represent Ontario homeowners whose sale involves more than a
              sign on the lawn: a lender, a deadline, a family decision, or
              simply a lot at stake. Priced from the market, coordinated with
              every party, handled quietly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button as={Link} to="/contact" variant="contrast" size="lg" className="justify-center shadow-card">
                <Calendar className="h-4 w-4" strokeWidth={1.9} />
                Book a 15-minute call
              </Button>
              <a
                href="tel:+13656457332"
                className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-[15px] text-stone hover:text-bronze transition-colors"
              >
                <Phone className="h-4 w-4" strokeWidth={1.9} />
                Or call (365) 645-7332
              </a>
            </div>

            <p className="mt-6 text-[14.5px] text-stone-soft">
              Buying?{' '}
              <Link
                to="/buyers"
                className="inline-flex items-center gap-1 font-semibold text-stone underline decoration-bronze/60 underline-offset-4 hover:text-bronze transition-colors"
              >
                We find the value most people miss
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </Link>
            </p>

            <p className="mt-7 font-sans font-semibold text-[12px] uppercase tracking-[0.16em] text-stone-mute">
              GTA &middot; Durham &middot; Hamilton &middot; Kitchener-Waterloo
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

      <Situations />
      <BothSides />
      <ClosingCta />
    </>
  )
}
