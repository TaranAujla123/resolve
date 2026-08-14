import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * BothSides — the dual-path block on the home page (rewritten Aug 2026).
 *
 * The earlier version tied the buyer side to seller distress ("buyers
 * looking for value in the files those sellers produce" / "early
 * notification of motivated-seller listings"). That read as exploiting
 * distressed sellers and muddied representation, so it was pulled.
 *
 * This version reframes both sides around the SAME expertise applied to
 * two SEPARATE, fully-represented clients:
 *   - Sellers: complex / high-value / time-sensitive sales, equity-led.
 *   - Buyers: value-add & multiplex opportunity found on the open
 *     market through judgment — NOT insider access to distressed listings.
 * The only thing the two sides share is the practitioner's judgment
 * ("the value most people miss"), never a seller's misfortune.
 *
 * Placement: after SellerPromise, before DifferentApproach — the home
 * opens seller-led, then this block widens the practice to both sides
 * so a buyer sees their door within the first scrolls.
 */
export function BothSides() {
  return (
    <section
      data-surface="cream"
      className="bg-cream section-y"
      aria-label="Both sides of the table"
    >
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Both Sides of the Table</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            One practice.{' '}
            <span className="italic text-bronze">Both sides.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-navy-soft">
            We represent sellers and buyers as separate clients, each with
            their own goal. What connects the two is the same judgment:
            reading the position, and the value, that most people miss.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SELLER CARD */}
          <Link
            to="/get-help"
            className="
              group relative flex flex-col
              rounded-2xl border border-divider bg-stone
              px-7 py-8 sm:px-8 sm:py-10
              transition-all duration-300
              hover:border-bronze/60 hover:-translate-y-0.5
              hover:shadow-[0_10px_28px_-14px_rgba(7,43,74,0.22)]
            "
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              For Sellers
            </p>
            <h3 className="mt-4 font-display font-medium text-navy text-[1.75rem] leading-[1.1]">
              When the sale isn&rsquo;t simple.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-soft">
              Power of sale, mortgage arrears, financial pressure, and
              time-sensitive closings, or a high-value home where the details
              decide the outcome. We protect your equity and sell on your
              terms.
            </p>
            <span className="
              mt-6 inline-flex items-center gap-1.5
              font-sans font-semibold text-[12.5px] uppercase tracking-[0.14em]
              text-bronze
            ">
              See how we help sellers
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* BUYER CARD */}
          <Link
            to="/buyers"
            className="
              group relative flex flex-col
              rounded-2xl border border-divider bg-stone
              px-7 py-8 sm:px-8 sm:py-10
              transition-all duration-300
              hover:border-bronze/60 hover:-translate-y-0.5
              hover:shadow-[0_10px_28px_-14px_rgba(7,43,74,0.22)]
            "
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              For Buyers
            </p>
            <h3 className="mt-4 font-display font-medium text-navy text-[1.75rem] leading-[1.1]">
              Buy the upside most buyers miss.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-soft">
              Value-add homes, multiplex-eligible lots, and income potential,
              the value most buyers scroll past. Full buy-side representation
              from the first showing to closing. Buy strong bones and build
              the value yourself.
            </p>
            <span className="
              mt-6 inline-flex items-center gap-1.5
              font-sans font-semibold text-[12.5px] uppercase tracking-[0.14em]
              text-bronze
            ">
              See what we look for
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
