import React from 'react'
import { Link } from 'react-router-dom'
import { FileSearch, Globe, FileCheck, Handshake, Users, CalendarCheck, Phone, Mail, Linkedin } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ResolveWordmark } from '@/components/brand/ResolveWordmark'
import aboutPortrait from '@/taran-about.jpg'

/**
 * BioPage — /taran. The profile link on Taran's MLS listings.
 *
 * Read by buyer agents, lenders and their counsel, so it says how a listing
 * is run and nothing about any seller's situation (Taran, 1 Nov 2026).
 * Global Header, Footer and sticky CTA are hidden on this route (App.jsx):
 * the wordmark is the only way back to the main site. noindex.
 * Hero is the About hero, unchanged. Brokerage attribution stays at the top
 * (BrokerageStrip) and in the closing block (RECO Bulletin 5.1).
 */

const PRACTICE = [
  {
    Icon: FileSearch,
    title: 'Price',
    body: 'Set from sold comparables, current supply and an independent appraisal.',
  },
  {
    Icon: Globe,
    title: 'Exposure',
    body: 'Every listing goes on MLS, open to every buyer and every agent.',
  },
  {
    Icon: FileCheck,
    title: 'Paperwork',
    body: 'The schedules are in the listing from day one, so offers come in on known terms.',
  },
  {
    Icon: CalendarCheck,
    title: 'Showings',
    body: 'I book and confirm each one myself, daily 9 to 8, with an hour’s notice.',
  },
  {
    Icon: Handshake,
    title: 'Offers and negotiation',
    body: 'Every offer goes to my sellers. Every agent gets a clear answer, and negotiation stays direct, civil and in writing.',
  },
  {
    Icon: Users,
    title: 'Coordination',
    body: 'From acceptance to closing, I keep the buyer’s agent, both lawyers and everyone else the deal depends on working to the same dates.',
  },
]

const contactCls =
  'inline-flex items-center gap-2 font-sans font-semibold text-[14px] text-bronze hover:text-stone transition-colors'

export function BioPage() {
  return (
    <>
      {/* Logo-only bar over the navy hero: the single link back to the site. */}
      <div className="absolute inset-x-0 z-20">
        <div className="container h-[64px] sm:h-[80px] flex items-center">
          <Link to="/" aria-label="Resolve Real Estate, main site" className="inline-flex items-center">
            <span className="inline-flex flex-col items-center leading-none">
              <ResolveWordmark variant="dark" showDescriptor={false} tm className="h-[34px] sm:h-[40px]" />
              <span aria-hidden="true" className="mt-[6px] h-px w-[78%] bg-bronze/55" />
              <span className="mt-[5px] font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-bronze pl-[0.34em]">
                Real Estate
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Hero: the About hero as it stands. */}
      <section data-surface="navy" className="relative bg-navy overflow-hidden isolate min-h-[500px] lg:min-h-[540px]">
        <HeroBackdrop />
        <div className="relative container max-w-4xl w-full pt-32 pb-16 sm:pt-44 sm:pb-24">
          <Eyebrow>About Resolve</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-stone text-display-xl">About Resolve.</h1>
          <p className="mt-1 font-display font-medium italic text-bronze text-display-lg leading-[1.05]">
            Why this practice exists.
          </p>
          <p className="mt-8 font-display font-medium text-stone text-[clamp(1.4rem,2.2vw,1.7rem)] leading-[1.45] max-w-[620px]">
            <span className="font-display italic text-bronze">Resolve</span>
            {' '}exists because some property situations need more than a standard approach.
          </p>
        </div>
      </section>

      <section data-surface="stone" className="bg-stone py-16 sm:py-24">
        <div className="container max-w-4xl space-y-14 sm:space-y-16">
          {/* Identity card (the About card, without the bio paragraphs). */}
          <figure className="rounded-[18px] bg-navy p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="shrink-0 rounded-[16px] border border-bronze/60 p-1.5">
                <img
                  src={aboutPortrait}
                  alt="Taran Aujla, Real Estate Salesperson"
                  className="w-48 sm:w-60 h-auto rounded-[11px] block"
                />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="font-display font-medium text-stone text-[1.7rem] sm:text-[2rem] leading-tight">
                  Taran Aujla
                </p>
                <p className="mt-1.5 font-sans text-[13px] sm:text-[13.5px] text-bronze font-semibold uppercase tracking-[0.16em]">
                  Real Estate Salesperson
                </p>
                <p className="mt-3 text-[13.5px] text-stone-soft leading-relaxed">
                  HomeLife G1 Realty Inc., Brokerage
                  <br />
                  RECO Reg. No. 6024721
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <a href="tel:+13656457332" className={contactCls}>
                    <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    365-645-7332
                  </a>
                  <a href="mailto:taran@resolverealestate.ca" className={contactCls}>
                    <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    taran@resolverealestate.ca
                  </a>
                  <a
                    href="https://www.linkedin.com/in/itstaranaujla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactCls}
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </figure>

          {/* The line, then how a listing is run (the How We Work pattern). */}
          <div>
            <Eyebrow>How I Run a Listing</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
              Priced on evidence.{' '}
              <span className="italic text-bronze">Terms that hold. Timing that closes.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-navy-soft">
              Most of the work on a sale happens before the listing goes live. By the time a buyer
              sees it, the price has a basis, the paperwork is complete, and the path to closing is
              mapped.
            </p>
            <ul className="mt-12 grid gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2">
              {PRACTICE.map(({ Icon, title, body }) => (
                <li key={title} className="flex flex-col">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-bronze/55 text-bronze"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display font-medium text-navy text-[1.35rem] leading-snug">{title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-navy-soft max-w-[46ch]">{body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Background: one fact, then his two lines. */}
          <div className="border-t border-divider pt-12 sm:pt-14 max-w-3xl space-y-5 text-[17px] leading-relaxed text-navy-soft">
            <p>
              I spent close to a decade in real estate law and closed several hundred purchase, sale
              and mortgage transactions.
            </p>
            <p>A signed agreement is the start of the work, not the finish.</p>
            <p className="font-sans font-semibold text-navy text-[22px] sm:text-[24px] leading-snug">
              Set it up right, and it closes.
            </p>
          </div>
        </div>
      </section>

      {/* Closing brokerage block (RECO Bulletin 5.1). */}
      <footer data-surface="navy" className="bg-navy py-12 sm:py-14">
        <div className="container max-w-4xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <Link to="/" aria-label="Resolve Real Estate, main site" className="inline-flex">
              <ResolveWordmark variant="dark" showDescriptor={false} tm className="h-[30px]" />
            </Link>
            <p className="mt-5 text-[14px] leading-relaxed text-stone-soft">
              Real estate services delivered through{' '}
              <span className="font-semibold text-stone">HomeLife G1 Realty Inc., Brokerage</span>.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-stone-mute">
              Independently Owned &amp; Operated
              <br />
              2260 Bovaird Dr. E., Suite 202, Brampton, ON&nbsp; L6R 3J5
            </p>
          </div>
          <div className="flex gap-6 text-[13px]">
            <Link to="/privacy" className="text-stone-soft hover:text-bronze transition-colors">Privacy</Link>
            <Link to="/terms" className="text-stone-soft hover:text-bronze transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
