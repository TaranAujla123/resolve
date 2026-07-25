import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * SellerPromise — the home-page trust beat, sitting where the old
 * BothSides dual-path block used to be (after Situations, before
 * DifferentApproach).
 *
 * BothSides was removed on purpose. Putting a seller path and a
 * buyer path side by side on the home page read like a conflict of
 * interest to the exact visitor this site is built for: a distressed
 * seller. Seeing "we also line up buyers for motivated-seller
 * listings" one card over undercuts the trust the seller needs to
 * feel before they call. The buyer side now lives only behind direct
 * buyer ads (/get-deals, /buyers) and in the footer.
 *
 * This block replaces it with a seller-focused reassurance beat. The
 * heading ("Focused on your sale.") is deliberately kept to focus and
 * care rather than an exclusive-loyalty claim: an earlier "Only yours"
 * version over-promised and would not hold up in a direct-buyer /
 * multiple-representation scenario. It reassures the seller before the
 * thesis without claiming something that could be contradicted later.
 *
 * Compliance: no guarantee of price or outcome (RECO 5.1). The pledge
 * is about representation, effort, and process — full market
 * exposure, a strategy built around the seller's number and timeline,
 * discretion — not a promised result.
 *
 * Surface: Cream — a small register lift between the Stone Situations
 * grid above and the Navy DifferentApproach thesis below.
 */
const PLEDGES = [
  'Full market exposure, so the right buyers compete for your home.',
  'A strategy built around your number and your timeline.',
  'Discretion from the first private call through to closing.',
]

export function SellerPromise() {
  return (
    <section
      data-surface="cream"
      className="bg-cream section-y"
      aria-label="Our commitment to sellers"
    >
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Your Sale</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            Focused on your{' '}
            <span className="italic text-bronze">sale.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-navy-soft">
            When you bring us a difficult sale, we represent you and the
            outcome you need. Nothing about that shifts partway through. The
            work is straightforward: get the value of your home in front of
            the market, negotiate it carefully, and hold your position from
            the first conversation to the closing table.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 max-w-2xl">
          {PLEDGES.map((line) => (
            <li key={line} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bronze/12"
              >
                <Check className="h-3.5 w-3.5 text-bronze" strokeWidth={2.4} />
              </span>
              <span className="text-[16px] leading-relaxed text-navy-soft">
                {line}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to="/get-help"
          className="
            mt-9 inline-flex items-center gap-1.5
            font-sans font-semibold text-[12.5px] uppercase tracking-[0.14em]
            text-bronze hover:text-bronze-deep transition-colors group
          "
        >
          See how we help sellers
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  )
}
