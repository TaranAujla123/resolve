import React from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * CoordinatedSale — "When the sale may not cover everything owed."
 *
 * The thin-equity / shortfall sale: the work Resolve actually does on
 * enforcement files, written once and placed on /sellers, /mortgage-arrears
 * and /power-of-sale. Two readers on purpose: the owner (first, navy
 * column) and the lender or its counsel (second, white column), with the
 * same facts. Owner-first for RECO best interest: we act for the homeowner
 * only, and lender cooperation is how we protect the owner.
 *
 * Category level only. Never publish Schedule A wording, letter templates
 * or negotiation tactics here (they live in the private SOPs).
 * Copy rules: no em dashes, no "!", no urgency, no guarantees, never state
 * what a lender must do.
 */
const STEPS = [
  ['The numbers first.', 'A price from real sales, and every amount owing confirmed, fees included.'],
  ['A plan to the lender, before the listing.', 'With your written consent: the comparable sales, the proposed price and a timetable. The listing goes live once the lender approves the price in writing.'],
  ['Every offer, the same day.', 'Offers are signed on the condition of lender approval, so the buyer is held while the lender decides.'],
  ['A clean close.', 'The lender approves the discharge, your lawyer handles any balance, and the closing date is set around your move.'],
]

const FOR_YOU = [
  'Nothing is shared with a lender without your written consent.',
  'A market price, not an as-is enforcement sale.',
  'Fewer costs added to what you owe.',
  'Any balance is raised before the sale, not discovered after it.',
  'Time to plan where you go next.',
]

const FOR_LENDER = [
  'An arm’s-length sale at market, priced from comparable sales.',
  'A lean commission it approves, and no enforcement or carrying costs.',
  'A written timetable with dates.',
  'Every offer sent the day it arrives.',
  'A seller who is cooperating, with their own lawyer.',
]

export function CoordinatedSale({ ctaHref = '#inquiry', ctaLabel = 'Ask about a coordinated sale', eyebrow = 'When the sale may not cover everything owed' }) {
  const isAnchor = ctaHref.startsWith('#')
  const ctaClass =
    'inline-flex items-center gap-2 font-semibold text-navy hover:text-bronze transition-colors'
  return (
    <section id="coordinated-sale" data-surface="white" className="bg-white section-y scroll-mt-24">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md leading-[1.14] text-balance">
            A coordinated sale,{' '}
            <span className="italic text-bronze">with the lender at the table.</span>
          </h2>
          <p className="mt-6 text-[16.5px] leading-relaxed text-navy-soft">
            Sometimes the realistic price is close to, or below, what is owing.
            A regular listing cannot close that sale on its own, because the
            lender has to agree to discharge the mortgage. So we run it as a
            coordinated sale: you, your lawyer, the lender and its counsel,
            working from the same numbers and the same timetable.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-[14px] border border-divider bg-stone p-5 sm:p-6">
              <span className="font-display text-bronze text-[1.35rem] leading-none">{i + 1}</span>
              <h3 className="mt-3 font-display font-medium text-navy text-[1.08rem] leading-snug">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">{d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="rounded-[14px] bg-navy p-6 sm:p-7">
            <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-bronze">For you</h3>
            <ul className="mt-4 space-y-3">
              {FOR_YOU.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-stone/90">
                  <span className="mt-[3px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-bronze/20 text-bronze">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[14px] border border-divider bg-stone p-6 sm:p-7">
            <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-navy-mute">
              For the lender and its counsel
            </h3>
            <ul className="mt-4 space-y-3">
              {FOR_LENDER.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-navy-soft">
                  <span className="mt-[3px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-divider text-navy-mute">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 max-w-3xl space-y-3">
          <p className="text-[15.5px] leading-relaxed text-navy">
            We act for the homeowner, and only the homeowner. Working with the
            lender is how we protect your outcome.
          </p>
          <p className="text-[13px] leading-relaxed text-navy-mute">
            Any balance after the sale is between you and your lender, and your
            own lawyer advises you on it. Lender approval is never guaranteed.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-8 text-[15px]">
            {isAnchor ? (
              <a href={ctaHref} className={ctaClass}>
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link to={ctaHref} className={ctaClass}>
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link to="/for-lenders" className="font-semibold text-bronze hover:text-navy transition-colors">
              Lender or lender’s counsel? How we work with you
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
