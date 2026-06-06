import React from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Gavel,
  Scale,
  HeartHandshake,
  Scroll,
  Sunrise,
  ArrowUpRight,
} from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * Situations — V2 home page "Situations We Handle" section.
 *
 * Rebuilt in the V2 editorial register from the existing site's
 * homepage Situations grid. Each tile is a quiet link to the deep-dive
 * page: bronze line-icon, navy title in Newsreader, a single
 * tightening line in Inter, and a small arrow affordance bronze on
 * hover.
 *
 * Surface: Stone (matches the Hero — two consecutive Stone sections
 * is intentional; the card lift creates the visual break, not a
 * surface swap). Anchor #situations so the header nav's "Situations
 * We Handle" link lands cleanly here.
 *
 * Icons match the existing landing/Situations.jsx mapping (same six
 * file types in the same order) so anyone arriving from a deep-dive
 * page in a separate tab recognises the lane immediately.
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
    Icon: Scale,
    title: 'Property Disputes',
    to: '/property-disputes',
    body: 'Co-ownership, boundary, tenancy, lien, or partition matters. Anything clouding title can still be sold cleanly.',
  },
  {
    Icon: HeartHandshake,
    title: 'Separation or Divorce',
    to: '/divorce-real-estate',
    body: 'Selling the matrimonial home rarely is just about the house. Neutral, coordinated, fair to both sides.',
  },
  {
    Icon: Scroll,
    title: 'Estate or Probate',
    to: '/estate-sale',
    body: 'Carrying probate timelines, multiple beneficiaries, and the weight of the loss. We move at the pace the estate allows.',
  },
  {
    Icon: Sunrise,
    title: 'Life Transitions',
    to: '/life-transitions',
    body: 'A move, a health change, a downsizing, a retirement. Plan around your timeline rather than rushing it.',
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
            Six situations.{' '}
            <span className="italic text-bronze">One approach.</span>
          </h2>
          {/*
            Tagline — Newsreader 500 italic, bronze. Sized between the
            display headline and the body so it reads as a named
            organising idea, not as a second headline. Spacing locked
            to the brief: 16px (mt-4) above, 24px (mt-6) below.

            "Equity-first" rather than "equity-protected" — matches the
            hero subhead's "equity as the priority" framing and keeps
            clear of RECO Bulletin 5.3 (no implied outcome guarantees).
          */}
          <p className="
            mt-4 font-display font-medium italic text-bronze
            text-[18px] sm:text-[22px] leading-snug tracking-[-0.005em]
          ">
            Document-first. Position-driven. Equity-first.
          </p>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-soft">
            Resolve focuses on the sales that need more than a standard
            listing.
          </p>
        </div>

        <ul className="
          mt-12 grid gap-5
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
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
