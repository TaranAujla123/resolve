import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Phone, Check } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'

/**
 * Hero — V3.5 home hero (navy, restored).
 *
 * The dark architectural doorway photo (dim navy interior, warm light
 * through a door ajar) returns as the full-bleed background on a navy
 * field — the confident, masculine, "a way through" image, not a
 * washed-out showroom. Text sits on the navy with a scrim so it reads.
 *
 * Register: Poppins 600 stone headline, ONE bronze Newsreader-italic
 * emphasis word ("clearer.") as the payoff — the same move as the
 * logo's italic "solve". Bronze is otherwise reserved (logo + this
 * word + the small trust checks); the eyebrow, pills, CTAs and phone
 * are stone, so the one warm word sings.
 *
 * Scrim: heavy on the LEFT (text) fading right on desktop so the
 * doorway glow reads; vertical top-heavy on mobile so the doorway is
 * clearly visible beneath the copy (the image concept must land on a
 * phone). The global MobileStickyCta gives the persistent call bar.
 */
const SITUATIONS = [
  { label: 'Mortgage Arrears',   to: '/mortgage-arrears' },
  { label: 'Power of Sale',      to: '/power-of-sale' },
  { label: 'Financial Pressure', to: '/financial-pressure' },
  { label: 'Time-Sensitive',     to: '/time-sensitive-sales' },
]

export function Hero({ headline } = {}) {
  return (
    <section
      data-surface="navy"
      className="relative bg-navy overflow-hidden isolate min-h-[600px] lg:min-h-[660px] -mt-16 sm:-mt-20"
    >
      {/* Shared navy hero backdrop (gradient + faint blueprint grid). */}
      <HeroBackdrop />

      <div className="relative container w-full pt-28 pb-14 sm:pt-40 sm:pb-20">
        <div className="max-w-[600px]">
          {/* Eyebrow: bronze hairline + label on one row (the "for Ontario
              homeowners" qualifier lives in the sub-headline below, so the
              eyebrow stays short). */}
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-bronze flex-shrink-0" />
            <p className="font-sans font-semibold text-[12.5px] uppercase tracking-[0.18em] text-bronze">
              Seller Representation
            </p>
          </div>

          {/* Poppins 600 stone, with the one bronze Newsreader-italic
              payoff word. "We make it clearer." starts on its own line. */}
          <h1 className="mt-5 font-sans font-semibold text-stone leading-[1.12] tracking-[-0.01em] text-[clamp(2.1rem,4.6vw,3.4rem)]">
            {headline || (
              <>
                Selling isn&rsquo;t always straightforward.
                <br />
                <span className="font-medium">We make it </span>
                <span className="font-emph italic font-normal text-bronze">clearer.</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-stone-soft">
            We help Ontario homeowners navigate complex property
            situations and sell with greater clarity, confidence, and
            equity as the priority.
          </p>

          {/* Bronze-outlined pills on navy — the V2 accent balance:
              bronze hairline border, stone text, bronze fill on hover. */}
          <ul className="mt-7 grid gap-2.5 grid-cols-2 max-w-md">
            {SITUATIONS.map((s) => (
              <li key={s.label} className="flex">
                <Link
                  to={s.to}
                  className="
                    inline-flex items-center justify-center w-full
                    px-4 sm:px-5 py-2.5 rounded-full
                    border border-bronze/70 bg-navy/25 backdrop-blur-[2px]
                    font-sans font-semibold text-[12.5px] sm:text-[13.5px] leading-none text-stone
                    hover:border-bronze hover:bg-bronze hover:text-navy
                    transition-colors duration-200 text-center
                  "
                >
                  {s.label}
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

          <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-stone-soft">
            {['Confidential', 'Boutique practice', 'No obligation', 'Serving Ontario'].map((label) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-bronze flex-shrink-0" strokeWidth={2.6} />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>

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
  )
}
