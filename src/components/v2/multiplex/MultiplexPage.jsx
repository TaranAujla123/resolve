import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Home, Building2, Calculator } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'

/**
 * MultiplexPage — /multiplex hub (the front door for the multiplex line).
 *
 * Role: overview + router, NOT a conversion landing page. Leads with the
 * licensed-team pitch and sends visitors to the three doors:
 *   - PlexCheck (the free tool)      -> /plexcheck   (static page)
 *   - Seller guide (lot value)       -> /lot-value   (static page)
 *   - Buyer guide (pays for itself)  -> /pays-for-itself (static page)
 *
 * Those three are STATIC pages under public/, so links to them use plain
 * <a href> (full navigation) — NOT react-router <Link>, which would fall
 * through to the "*" catch-all.
 *
 * Voice: collective "we/us/our". Tease not teach — say the outcome
 * (a multiplex, 3 to 6 units, end-to-end with a build partner); the
 * playbook stays behind the tool + guides + a call. Build partner is
 * referred to generically (no name) pending consent.
 */

const DOORS = [
  {
    icon: Calculator,
    label: 'Free tool',
    title: 'How many units can your lot hold?',
    body: 'A free 60-second check. Enter your lot and see whether it qualifies for a multiplex.',
    href: '/plexcheck/',
    cta: 'Run PlexCheck',
  },
  {
    icon: Home,
    label: 'Homeowners',
    title: 'Your lot may be worth more than your house.',
    body: 'The value most owners are never shown, and what it could mean before you list.',
    href: '/lot-value/',
    cta: 'Get the seller guide',
  },
  {
    icon: Building2,
    label: 'Buyers & investors',
    title: 'Buy real estate that pays for itself.',
    body: 'A multiplex where tenants carry the mortgage, for far less down than most assume.',
    href: '/pays-for-itself/',
    cta: 'Get the buyer guide',
  },
]

export function MultiplexPage() {
  return (
    <>
      {/* Hero (navy, full-bleed). Pulls up under the sticky header
          (-mt-16/-20) so the nav overlays it transparently, then the nav
          goes solid on scroll into the light "Where to start" section
          below — giving the navy -> light -> navy rhythm. pt-28/40
          compensates for the negative margin so copy clears the nav. */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20"
      >
        <HeroBackdrop />
        <div className="relative container max-w-4xl pt-28 pb-16 sm:pt-40 sm:pb-24">
          <Eyebrow>
            <span className="text-stone">Multiplex</span> · Toronto, Peel Region, Kitchener-Waterloo &amp; Hamilton
          </Eyebrow>
          <h1 className="mt-5 font-display font-medium text-stone text-display-xl leading-[1.02]">
            The Multiplex{' '}
            <span className="font-display italic text-bronze">Advantage.</span>
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-stone-soft max-w-[540px]">
            Ontario&rsquo;s rules changed. Many lots can now hold three to six units &mdash; worth
            far more than the house on them. We find it, value it, and build it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button as="a" href="/plexcheck/" variant="contrast" size="lg">
              Check your lot in 60 seconds <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as={Link}
              to="/contact"
              variant="outline"
              size="lg"
              className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
            >
              Talk to us
            </Button>
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-stone/55 max-w-[560px]">
            Strong across Toronto, Peel Region, Kitchener-Waterloo and Hamilton &mdash; and elsewhere in
            Ontario through trusted local partners.
          </p>
        </div>
      </section>

      {/* Three doors */}
      <section data-surface="surface" className="bg-surface section-y">
        <div className="container max-w-5xl">
          <Eyebrow>Where to start</Eyebrow>
          <h2 className="mt-4 font-display font-medium text-navy text-display-lg leading-[1.1]">
            Three ways in.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DOORS.map((d) => (
              <a
                key={d.href}
                href={d.href}
                className="group flex flex-col rounded-[18px] border border-divider bg-stone p-7 shadow-card transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <d.icon className="h-6 w-6 text-bronze flex-shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-bronze-deep px-3 py-1.5 font-sans font-bold text-[12px] uppercase tracking-[0.11em] text-white">
                    {d.label}
                  </span>
                </div>
                <h3 className="mt-2 font-display font-medium text-navy text-[1.3rem] leading-snug">
                  {d.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-navy-soft flex-1">{d.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans font-semibold text-[13.5px] text-navy group-hover:text-bronze transition-colors">
                  {d.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-end pitch (navy) */}
      <section data-surface="navy" className="bg-navy section-y">
        <div className="container max-w-4xl">
          <Eyebrow>Why this is different</Eyebrow>
          <h2 className="mt-4 font-display font-medium text-stone text-display-lg leading-[1.1]">
            Strategy from us.{' '}
            <span className="font-display italic text-bronze">Build from our partner.</span>
          </h2>
          <p className="mt-7 text-[17px] leading-relaxed text-stone/85 max-w-[650px]">
            A tool can tell you roughly what&rsquo;s possible. Turning it into reality takes a plan
            and a builder. We bring the strategy, the research, and the brokerage side &mdash; finding,
            valuing, listing, or buying the right lot. Our construction partner &mdash; 15+ years,
            200+ units &mdash; brings the permits, the build, and a real quote. Most people
            don&rsquo;t know where to start. With us, you get both, from one licensed team.
          </p>
          <div className="mt-9">
            <Button as="a" href="/plexcheck/" variant="contrast" size="lg">
              Check your lot <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-10 text-[12px] leading-relaxed text-stone/45 max-w-[72ch]">
            Educational only, not legal, planning, mortgage, tax, or financial advice. Unit
            permissions depend on the specific parcel and current municipal by-laws, and are subject
            to permits and a site-specific zoning review &mdash; verify per lot. Financing programs
            and eligibility are confirmed only by a CMHC-approved lender. No outcome, value, or
            approval is guaranteed.
          </p>
        </div>
      </section>
    </>
  )
}
