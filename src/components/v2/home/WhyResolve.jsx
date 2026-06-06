import React from 'react'
import { Award, Network, Users } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * WhyResolve — V2 home page "Why Resolve" credibility section.
 *
 * Restores three substantive claims from the live site's "Why Resolve"
 * block that V2 was missing:
 *
 *   1. A decade of combined experience across complex Ontario files
 *   2. Direct negotiation history across the cast these files bring
 *      (lenders, lawyers, opposing parties, family, business partners)
 *   3. The qualified buyer network — alongside a full-market listing,
 *      Resolve can bring pre-screened buyers directly, giving the
 *      sale more than one path to a clean close
 *
 * Placement: between Situations and HowWeHelp. The page logic reads
 * Situations (what we handle) → WhyResolve (why we can handle it) →
 * HowWeHelp (the process clients move through).
 *
 * Surface: Mist (cooler, informational). HowWeHelp continues on Mist
 * below, so the page now reads Stone → Stone → Mist → Mist → Navy →
 * Rose → Stone. Two consecutive Mist sections is intentional — these
 * are the credibility + process blocks, linked conceptually.
 */
const POINTS = [
  {
    Icon: Award,
    title: 'A decade of combined experience',
    body:
      'Across complex Ontario files — power of sale and estate work to separations and partnership disputes.',
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

export function WhyResolve() {
  return (
    <section
      id="why-resolve"
      data-surface="stone"
      className="bg-stone section-y"
      aria-label="Why Resolve"
    >
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>Why Resolve</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
            The experience these situations{' '}
            <span className="italic text-bronze">actually require.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-soft">
            Three things make a sale come together: knowing the file,
            knowing everyone at the table, and being able to bring a
            qualified buyer when timing matters. The combination is what
            we built Resolve around.
          </p>
        </div>

        <ul
          className="
            mt-14 grid gap-x-10 gap-y-12
            grid-cols-1 lg:grid-cols-3
          "
        >
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
