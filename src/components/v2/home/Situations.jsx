import React from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Gavel,
  Scale,
  HeartHandshake,
  Scroll,
  Clock,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * Situations — V2 home page "Situations We Handle" section.
 *
 * Four financially-motivated lanes only. Separation/divorce and
 * ownership-dispute files were removed from the practice in a
 * deliberate refocus toward files with cleaner mechanics, motivated
 * sellers, and shorter cycle times. Mortgage Arrears + Power of Sale
 * are the paid-media anchor lanes (leads); Estate + TSS are the
 * referral-driven adjacencies.
 *
 * Surface: Stone (matches the Hero — two consecutive Stone sections
 * is intentional; the card lift creates the visual break, not a
 * surface swap). Anchor #situations so the header nav's "Situations
 * We Handle" link lands cleanly here.
 */
const SITUATIONS = [
  {
    Icon: AlertCircle,
    title: 'Mortgage Arrears',
    to: '/mortgage-arrears',
    body: 'When payments fall behind and the lender’s tone changes, the options narrow week by week. Move from reactive to planned.',
  },
  {
    Icon: Gavel,
    title: 'Power of Sale',
    to: '/power-of-sale',
    body: 'Enforcement is underway and the clock is running. Sell properly on your timeline rather than the bank’s.',
  },
  {
    Icon: TrendingDown,
    title: 'Financial Pressure',
    to: '/financial-pressure',
    body: 'Not behind yet, but the carry has become unsustainable. A renewal that doubled the payment, a property that costs more than it returns, a closing you cannot fund. Options are widest exactly now, before arrears start.',
  },
  {
    Icon: Clock,
    title: 'Time-Sensitive Sales',
    to: '/time-sensitive-sales',
    body: 'A closing date on the next home, an estate or probate timeline, a job relocation, a family deadline. Make the right decisions within the time available.',
  },
]

export function Situations() {
  return (
    <section
      id="situations"
      data-surface="stone"
      className="bg-stone section-y"
      aria-label="Situations we handle"
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>Situations We Handle</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
            Four situations.{' '}
            <span className="italic text-bronze">One approach.</span>
          </h2>
          {/*
            Tagline — Inter bold, navy. Sized one step above the body
            line below so it reads as a declarative, structural beat
            (a named approach), not as ornamental italic emphasis.
            Spacing locked to the brief: 16px (mt-4) above, 24px
            (mt-6) below.

            "Equity-led" (not "Equity-first" or "Equity-protected") —
            three distinct suffixes (first / driven / led) so the
            line doesn't echo on the word "first." Still frames
            posture, not outcome, so it stays clear of RECO Bulletin
            5.3 the same way the hero subhead's "equity as the
            priority" framing does.
          */}
          <p className="
            mt-4 font-sans font-bold text-navy
            text-[18px] sm:text-[19px] leading-snug
          ">
            Document-first. Position-driven. Equity-led.
          </p>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-soft">
            Resolve focuses on the sales that need more than a standard
            listing.
          </p>
        </div>

        {/* 4 situations → symmetric grids at every breakpoint:
            1 col mobile, 2x2 tablet, 4-across desktop. No orphan card. */}
        <ul className="
          mt-12 grid gap-5
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        ">
          {SITUATIONS.map(({ Icon, title, to, body }) => (
            <li key={title} className="flex">
              <Link
                to={to}
                className="
                  group flex w-full flex-col
                  rounded-2xl border border-divider bg-cream
                  px-6 py-7 sm:px-7 sm:py-8
                  transition-all duration-300
                  hover:border-bronze/60 hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_-12px_rgba(7,43,74,0.18)]
                "
              >
                <span className="
                  inline-flex h-11 w-11 items-center justify-center
                  rounded-full border border-bronze/50 text-bronze
                ">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="
                  mt-6 font-display font-medium text-navy
                  text-[1.4rem] leading-tight
                ">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-soft">
                  {body}
                </p>
                <span className="
                  mt-6 inline-flex items-center gap-1.5
                  font-sans font-semibold text-[12.5px] uppercase tracking-[0.14em]
                  text-bronze
                ">
                  Read about {title.toLowerCase()}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
