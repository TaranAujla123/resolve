import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight, Compass, FileText, Wrench } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'

/**
 * ForInvestorsPage — /for-investors. The investor hub that replaces the
 * old "Investor Portal" nav item. Centralizes:
 *   1. How I Work With Investors (the selling point / anchor)
 *   2. Current Opportunities (links to /opportunities)
 *   3. Guides & Tools (existing static guides + PlexCheck)
 *
 * The private gated portal (/investor-access) is no longer surfaced in
 * primary nav; it stays available by direct link for existing partners.
 */

const OPPS = [
  { slug: 'kw-legal-duplex', label: 'Legal duplex, Kitchener', arv: '$715–760K ARV' },
  { slug: 'kw-distressed-detached', label: 'Power of sale, Kitchener', arv: '~$660K ARV' },
  { slug: 'kw-downtown-multiunit', label: 'Downtown multi-unit', arv: '$650–700K ARV' },
  { slug: 'kw-character-restoration', label: 'Character restoration', arv: '$800–900K ARV' },
]

const BRING = [
  'Sourced across the whole market, including off-cycle and off-market files most buyers walk past',
  'Underwritten before you drive: comparable sales, renovated value, the work required, and the spread',
  'The risks flagged early and in plain language, not buried in the upside',
  'Represented on a disclosed, cooperating basis, with the paperwork handled correctly',
]

const STEPS = [
  { n: '1', t: 'Tell me your box', d: 'Area, budget, and what you would take on. I build to your criteria, not a generic list.' },
  { n: '2', t: 'Matched, underwritten files first', d: 'Each read for real upside and the risks that do not show on the surface, before it reaches you.' },
  { n: '3', t: 'You decide, I negotiate', d: 'The full picture, no pressure. When you move, I represent you through the close.' },
]

const GUIDES = [
  { href: '/plexcheck/', icon: Wrench, t: 'PlexCheck lot tool', d: 'Check a lot’s multiplex potential in seconds.' },
  { href: '/lot-value/', icon: FileText, t: 'Guide: your lot’s value', d: 'What a lot is really worth, and why.' },
  { href: '/pays-for-itself/', icon: FileText, t: 'A home that pays for itself', d: 'The added-unit and income playbook.' },
  { to: '/multiplex', icon: Compass, t: 'The Multiplex Advantage', d: 'How small multiplexes make money in Ontario.' },
]

export function ForInvestorsPage() {
  return (
    <>
      <Seo
        title="For Investors · Vetted value-add deals · Resolve"
        description="Vetted, underwritten value-add and off-market deals across the GTA and Kitchener-Waterloo. See current opportunities with the numbers, how Taran works with investors, and the guides and tools."
        canonical="https://www.resolverealestate.ca/for-investors/"
      />

      {/* HERO — navy grid, matches the rest of the site */}
      <section data-surface="navy" className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20">
        <HeroBackdrop />
        <div className="relative container pt-28 pb-14 sm:pt-40 sm:pb-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">For Investors · GTA &amp; Kitchener-Waterloo</p>
          <h1 className="mt-5 font-display font-medium text-stone tracking-tight" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.04 }}>
            Vetted value-add deals, read the way an <span className="italic text-bronze">investor</span> needs them.
          </h1>
          <p className="mt-6 text-[17px] text-stone-soft leading-[1.6] max-w-2xl">
            I find, analyze, and vet value-add homes across the GTA and Kitchener-Waterloo, and I bring investors only the ones where the numbers actually work. If a deal will not make money, you never see it.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/opportunities" className="inline-flex items-center justify-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all" style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>
              See current opportunities <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how" className="inline-flex items-center justify-center gap-2 border-2 border-stone/40 text-stone hover:border-bronze hover:text-bronze font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all">
              How I work
            </a>
          </div>
        </div>
      </section>

      {/* CURRENT OPPORTUNITIES */}
      <section className="bg-mist border-y border-divider">
        <div className="container py-12 md:py-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">Current opportunities</p>
              <h2 className="mt-3 font-display font-medium text-navy text-[26px] md:text-[34px] leading-[1.1]">Real deals. Real numbers.</h2>
            </div>
            <Link to="/opportunities" className="inline-flex items-center gap-1 text-[14px] font-semibold text-bronze hover:text-bronze-deep">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPPS.map((o) => (
              <Link key={o.slug} to={`/opportunities/${o.slug}`} className="group block bg-white border border-divider rounded-[12px] p-5 hover:border-bronze transition-all">
                <p className="font-display font-medium text-navy text-[16px] leading-tight">{o.label}</p>
                <p className="mt-2 font-display font-semibold text-bronze-deep text-[18px] tabular-nums">{o.arv}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-bronze group-hover:text-bronze-deep">Breakdown <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-[11.5px] text-navy-mute max-w-2xl">Figures are illustrative estimates for discussion, not appraisals or guarantees. Specific listings are represented on a disclosed cooperating basis.</p>
        </div>
      </section>

      {/* HOW I WORK — the selling point */}
      <section id="how" className="bg-stone">
        <div className="container py-12 md:py-18">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">How I work with investors</p>
          <h2 className="mt-3 font-display font-medium text-navy text-[26px] md:text-[36px] leading-[1.1] max-w-3xl">
            My credibility is the filter. Your time is spent on files worth your capital.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t-2 border-bronze pt-5">
                <p className="font-display italic text-bronze text-[34px] leading-none" style={{ fontFamily: 'Newsreader, Georgia, serif' }}>{s.n}</p>
                <h3 className="mt-3 font-display font-medium text-navy text-[19px] leading-tight">{s.t}</h3>
                <p className="mt-2 text-[14.5px] text-navy-soft leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {BRING.map((b) => (
              <div key={b} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-bronze shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[15px] text-navy-soft leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES & TOOLS */}
      <section className="bg-white border-t border-divider">
        <div className="container py-12 md:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">Guides &amp; tools</p>
          <h2 className="mt-3 font-display font-medium text-navy text-[24px] md:text-[30px] leading-[1.1]">Read the market the way we do.</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDES.map((g) => {
              const Inner = (
                <>
                  <g.icon className="h-6 w-6 text-bronze" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-3 font-display font-medium text-navy text-[16.5px] leading-tight">{g.t}</h3>
                  <p className="mt-1.5 text-[13.5px] text-navy-soft leading-relaxed">{g.d}</p>
                </>
              )
              const cls = 'group block bg-stone border border-divider rounded-[12px] p-5 hover:border-bronze transition-all'
              return g.to
                ? <Link key={g.t} to={g.to} className={cls}>{Inner}</Link>
                : <a key={g.t} href={g.href} className={cls}>{Inner}</a>
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy text-stone">
        <div className="container py-12 md:py-16 text-center">
          <h2 className="font-display font-medium text-[26px] md:text-[38px] leading-[1.08] max-w-2xl mx-auto">Tell me your box. I will bring the ones that fit.</h2>
          <p className="mt-4 text-[15px] text-stone/80 max-w-xl mx-auto">Area, budget, and what you would take on. When a file matches, you see it first.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/opportunities" className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all" style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>
              See opportunities <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+13656457332" className="inline-flex items-center gap-2 border-2 border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all">(365) 645-7332</a>
          </div>
          <p className="mt-9 text-[12px] text-stone/60 leading-relaxed max-w-2xl mx-auto">Resolve · Taran Aujla, Salesperson · HomeLife G1 Realty Inc., Brokerage · Independently Owned &amp; Operated · RECO Reg. No. 6024721</p>
        </div>
      </section>
    </>
  )
}
