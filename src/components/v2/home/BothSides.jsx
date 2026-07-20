import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * BothSides — the dual-path "hub" block on the home page.
 *
 * Added July 2026 as part of the hub reframe: Resolve serves both
 * sides of the transaction by design. Sellers navigating difficult
 * property situations. Buyers looking for value in the files those
 * sellers produce. The two are connected, but only through disclosed
 * and consented process. This block puts both paths on screen in
 * one glance so a visitor understands within the first scroll that
 * the practice covers both.
 *
 * Compliance guardrail: the language on the buyer card describes
 * seeing motivated-seller listings early with proper representation.
 * It does NOT imply insider access, MLS bypass, or that sellers are
 * disadvantaged. The consent framing lives on the /buyers page
 * itself; this block just points to it.
 *
 * Placement: after Situations, before DifferentApproach. The
 * Situations grid is the "what we handle" answer; this block asks
 * "which side are you on?" and routes accordingly.
 *
 * Surface: Cream (a small register lift between the two Stone
 * sections above and below). Keeps the visual rhythm intact.
 */
export function BothSides() {
  return (
    <section
      data-surface="cream"
      className="bg-cream section-y"
      aria-label="Two sides of Resolve"
    >
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Both Sides of the Table</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            One practice.{' '}
            <span className="italic text-bronze">Two paths.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-navy-soft">
            Resolve represents sellers navigating difficult property situations, and buyers looking for value in the files those situations produce. Different work, one house. Which side are you on?
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
              Selling
            </p>
            <h3 className="mt-4 font-display font-medium text-navy text-[1.75rem] leading-[1.1]">
              Selling under pressure.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-soft">
              Mortgage arrears, power of sale, financial pressure before arrears, and time-sensitive closings. A private conversation with a real estate professional. Free 15 minutes. No obligation.
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
              Buying
            </p>
            <h3 className="mt-4 font-display font-medium text-navy text-[1.75rem] leading-[1.1]">
              Buying for value.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-navy-soft">
              Early notification of motivated-seller listings, matched to your written criteria. Sellers retain full MLS exposure. Full buy-side representation from first visit through closing. No fee to join.
            </p>
            <span className="
              mt-6 inline-flex items-center gap-1.5
              font-sans font-semibold text-[12.5px] uppercase tracking-[0.14em]
              text-bronze
            ">
              Join the buyer network
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
