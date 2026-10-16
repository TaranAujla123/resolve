import React from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * CoordinatedSale — "When the sale may not cover everything owed."
 *
 * The thin-equity / shortfall sale, written once and placed on /sellers,
 * /mortgage-arrears and /power-of-sale. Written for the owner only.
 *
 * 16 Oct 2026 (Taran): say WHAT the owner gets, never HOW. No offer
 * conditions, lender-consent mechanics, reporting cadence or payout steps,
 * and no lender-facing column: other agents read this page. The method
 * lives in the private SOPs.
 * Copy rules: no em dashes, no "!", no urgency, no guarantees, never state
 * what a lender must do.
 */
const STEPS = [
  ['A clear picture first.', 'What your home is worth today and what is owed, before you decide anything.'],
  ['The lender, handled properly.', 'Brought in with your written consent, on terms that protect you.'],
  ['A real market sale.', 'Listed and marketed like any other home, to every buyer.'],
  ['A clean close.', 'The sale closes, and the closing date is set around your move.'],
]

const FOR_YOU = [
  'Nothing is shared with a lender without your written consent.',
  'A market price, not an as-is enforcement sale.',
  'Fewer costs added to what you owe.',
  'Any balance is raised before the sale, not discovered after it.',
  'Time to plan where you go next.',
]

const PRIVATE = [
  'Your situation is never mentioned in the marketing.',
  'The listing reads like any other home for sale.',
  'Any lender terms stay between you, your lawyer and the lender.',
  'You see everything before it is shared.',
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
              What stays private
            </h3>
            <ul className="mt-4 space-y-3">
              {PRIVATE.map((x) => (
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
          </div>
        </div>
      </div>
    </section>
  )
}
