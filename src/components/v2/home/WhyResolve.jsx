import React from 'react'
import { Award, Network, Users, TrendingUp, Check } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

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
const POINTS = [
  {
    Icon: Award,
    title: 'A decade of combined experience',
    body:
      'Across complex Ontario files — power of sale, mortgage arrears, estate work, and time-sensitive sales.',
  },
  {
    Icon: Network,
    title: 'We have sat across from everyone these files bring',
    body:
      'Lenders, lawyers, opposing parties, family members, business partners. We know where these deals get stuck and how to keep them moving to a clean close.',
  },
  {
    Icon: Users,
    title: 'Pre-screened buyers of our own',
    body:
      'Alongside a full-market listing we can bring qualified buyers directly. That gives your sale more than one path to a strong, clean close.',
  },
]

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
      aria-label="The experience these situations require"
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>Why Resolve</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
            The experience these situations{' '}
            <span className="italic text-bronze">actually require.</span>
          </h2>
        </div>

        {/* Featured differentiator — pre-listing value work */}
        <div className="mt-10 rounded-[22px] border border-bronze/40 bg-white shadow-card p-7 sm:p-10">
          <div className="flex items-center gap-2 text-bronze">
            <TrendingUp className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              Before You List
            </span>
          </div>
          <h3 className="mt-4 font-display font-medium text-navy text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.12]">
            We build the value{' '}
            <span className="italic text-bronze">before we list.</span>
          </h3>
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
        </div>

        {/* Supporting pillars — the experience behind the value work */}
        <p className="mt-16 max-w-2xl text-[17px] leading-relaxed text-navy-soft">
          Behind that sits the experience these files take: knowing the file,
          knowing everyone at the table, and bringing a qualified buyer when
          timing matters.
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-12 grid-cols-1 lg:grid-cols-3">
          {POINTS.map(({ Icon, title, body }) => (
            <li key={title} className="flex flex-col">
              <span
                className="
                  inline-flex h-12 w-12 items-center justify-center
                  rounded-full border border-bronze/55 text-bronze
                "
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display font-medium text-navy text-[1.4rem] leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-navy-soft max-w-[38ch]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
