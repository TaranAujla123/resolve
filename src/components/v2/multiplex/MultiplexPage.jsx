import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Home, Building2, Calculator } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'

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
    label: 'For homeowners',
    title: 'Your lot may be worth more than your house.',
    body: 'The value most owners are never shown, and what it could mean before you list.',
    href: '/lot-value/',
    cta: 'Get the seller guide',
  },
  {
    icon: Building2,
    label: 'For buyers & investors',
    title: 'Buy real estate that pays for itself.',
    body: 'A multiplex where tenants carry the mortgage, for far less down than most assume.',
    href: '/pays-for-itself/',
    cta: 'Get the buyer guide',
  },
]

export function MultiplexPage() {
  return (
    <>
      {/* Hero (light) */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container max-w-4xl">
          <Eyebrow>Multiplex · GTA, Hamilton &amp; KW</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-navy text-display-xl leading-[1.05]">
            Your lot could be worth far more{' '}
            <span className="font-display italic text-bronze">as a multiplex.</span>
          </h1>
          <p className="mt-7 text-[18px] leading-relaxed text-navy-soft max-w-[640px]">
            Ontario&rsquo;s rules changed. Many lots that used to allow a single home can now hold a
            multiplex of three to six units. We find the opportunity, value it, and &mdash; with our
            build partner &mdash; turn it into a real, financed project. One licensed team, start to
            finish.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button as="a" href="/plexcheck/" variant="primary" size="lg">
              Check your lot in 60 seconds <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as={Link} to="/contact" variant="outline" size="lg">
              Talk to us
            </Button>
          </div>
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
                <d.icon className="h-7 w-7 text-bronze" strokeWidth={1.6} aria-hidden="true" />
                <span className="mt-5 font-sans font-semibold text-[12px] uppercase tracking-[0.14em] text-bronze">
                  {d.label}
                </span>
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
            and a builder. We bring the strategy, the research, and the realtor side &mdash; finding,
            valuing, listing, or buying the right lot. Our construction partner &mdash; 15+ years,
            200+ units &mdash; brings the permits, the build, and a real quote. Most agents
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
