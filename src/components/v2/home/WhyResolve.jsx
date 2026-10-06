import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Check } from 'lucide-react'

/**
 * WhyResolve — V2 home page credibility block.
 *
 * Leads with the practice's clearest DIFFERENTIATOR — the pre-listing
 * value work — as a featured, visually distinct card, then backs it
 * with three supporting pillars (experience / everyone-at-the-table /
 * pre-screened buyers).
 *
 * The featured card is deliberately PRO-SELL and value-focused: it is
 * about walking away with more when you do sell, NOT about talking a
 * seller out of selling (that anti-sell framing was removed from the
 * situation pages on purpose). Category-level only — the actual tactics
 * (income, cost, upgrade specifics) stay off the public site by design.
 * All value language is hedged ("where it allows," "return more than
 * they cost"); nothing reads as a guaranteed outcome, and any step that
 * needs a lawyer / mortgage professional / accountant is framed as
 * "we coordinate the right professional," never as advice Resolve gives
 * directly. Compliance posture: cleared (RECO 5.1 / LSO 3.1).
 *
 * Placement: immediately under DifferentApproach; shares the
 * #why-resolve conceptual stretch. Surface: Stone (the featured card
 * lifts to white so it stands out from the borderless pillars).
 */

const VALUE_MOVES = [
  'Lower the carrying cost',
  'Add income where the property allows',
  'Upgrades that return more than they cost',
]

export function WhyResolve() {
  return (
    <section
      data-surface="stone"
      className="bg-stone section-y"
      aria-label="Before you list"
    >
      <div className="container">
        <div className="rounded-[22px] border border-bronze/40 bg-white shadow-card p-7 sm:p-10">
          <div className="flex items-center gap-2 text-bronze">
            <TrendingUp className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              Before You List
            </span>
          </div>
          <h2 className="mt-4 font-display font-medium text-navy text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.12]">
            We build the value{' '}
            <span className="italic text-bronze">before we list.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-navy-soft">
            We start before the photos, not at them. Before anything
            lists, we find the moves that quietly strengthen your position,
            some straightforward, some rarely discussed, and bring in the right
            professional where a step calls for one.
          </p>
          <ul className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-x-9 gap-y-3">
            {VALUE_MOVES.map((move) => (
              <li
                key={move}
                className="inline-flex items-center gap-2 text-[14.5px] font-medium text-navy"
              >
                <Check
                  className="h-4 w-4 text-bronze flex-shrink-0"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                {move}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] text-navy-mute">
            The experience behind it is on{' '}
            <Link to="/why-us" className="font-semibold text-bronze hover:text-navy transition-colors">
              Why Resolve
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
