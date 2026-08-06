import React, { useState } from 'react'
import { Quote, Linkedin } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import aboutPortrait from '@/taran-about.jpg'

/**
 * AboutPage — V2 /about route.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (About)
 *
 * Register: NAVY throughout (inverted from the earlier light hero). The
 * page reads like the branded bio card — navy field, gold-framed
 * portrait, gold "Real Estate Salesperson" label, stone body — so the
 * practitioner profile carries the same confident, lawyer-facing look
 * as the Bio-and-Profiles card. Copy is preserved verbatim from the
 * prior version (legal background stated as factual past-tense
 * biography only; no present-tense legal-practice / holding-out claim —
 * conservative LSO 3.1 / RECO 5.1 posture while the JR is pending).
 *
 * Hero uses the navy-hero overlay pattern (-mt-16/20 + pt-28/40) so the
 * sticky header sits transparent over it, then goes solid on scroll.
 *
 * Dave has no portrait file yet — render an editorial "coming soon"
 * frame until one lands in src/.
 */
export function AboutPage() {
  const [bioOpen, setBioOpen] = useState(false)

  return (
    <>
      {/* Hero (navy, pulled up under the sticky header) */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_45%_at_85%_8%,rgba(196,164,104,0.14),transparent_70%)]"
        />
        <div className="relative container max-w-4xl pt-28 pb-14 sm:pt-40 sm:pb-16">
          <Eyebrow>About Resolve</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-stone text-display-xl">
            About Resolve.
          </h1>
          <p className="mt-1 font-display font-medium italic text-bronze text-display-lg leading-[1.05]">
            Why this practice exists.
          </p>

          <p className="mt-10 font-display font-medium text-stone text-[clamp(1.5rem,2.2vw,1.75rem)] leading-[1.45] max-w-[680px]">
            <span className="font-display italic text-bronze">Resolve</span>
            {' '}exists because some property situations need more than a
            standard listing.
          </p>

          <div className="mt-12 space-y-5 text-[17px] leading-relaxed text-stone-soft max-w-3xl">
            <p>
              I&rsquo;m Taran. My background spans decades in real estate,
              including Ontario real estate law, property transactions, and
              real estate investing across Ontario and Montreal, Quebec. That
              experience helps me see issues early, read what a property is
              really worth, and work either side of a deal with the same eye
              for the details that decide the outcome.
            </p>
            <p>
              For sellers, that means the sales that need more than a standard
              listing: mortgage arrears, power of sale, financial pressure,
              time-sensitive closings, and high-value or complex homes where
              protecting your equity is the point. For buyers, it means the
              value most people walk past: value-add homes, multiplex-eligible
              lots, and income potential, bought on strong bones and built up
              over time.
            </p>
            <p>
              Whichever side you are on, the work is the same: understand the
              real position, and make it work for the person I represent.
            </p>
          </div>
        </div>
      </section>

      {/* Practitioner bios — navy bio-cards floating on the light band.
          Three-band rhythm: navy hero -> light band -> navy footer. */}
      <section data-surface="stone" className="bg-stone py-16 sm:py-24">
        <div className="container max-w-4xl space-y-8">
          <Eyebrow>Led By</Eyebrow>

          {/* Taran — gold-framed portrait + identity, blockquote below */}
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
                <p className="mt-4 text-[12.5px] sm:text-[13px] text-stone-soft/85 leading-relaxed">
                  Real estate investor &middot; Former real estate lawyer
                  (10 yrs) &middot; Strategic Negotiator &middot; Problem-Solver
                </p>
                <a
                  href="https://www.linkedin.com/in/itstaranaujla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-sans font-semibold text-[12.5px] text-bronze hover:text-stone transition-colors"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-white/10">
              <Quote
                className="h-6 w-6 text-bronze/80"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-stone-soft">
                <p>
                  I come at real estate from two sides: as an investor, and
                  for close to a decade as a real estate lawyer. I started
                  managing my parents&rsquo; multiplexes as a teenager and have
                  owned and operated my own since; in practice, I closed
                  several hundred transactions. Both taught me the same
                  lesson, and it shapes how I work now: most problems that
                  surface at closing are preventable, and they trace back to
                  how the deal was put together at the start.
                </p>
                {bioOpen && (
                  <>
                    <p>
                      I work as a real estate Salesperson now, focused on the
                      sales that are anything but routine: power of sale,
                      mortgage arrears, estate sales, financial pressure, and
                      time-sensitive closings. On those files the outcome
                      depends on the work done before the sign goes up: getting
                      involved early, reading the file, negotiating terms that
                      hold, and steering a clean path to closing. A signed
                      agreement is the start of the work, not the finish.
                    </p>
                    <p>
                      I also keep my own list of qualified buyers and investors
                      who are ready to buy. When a home fits what one of them is
                      looking for, I can often sell it privately, without a long
                      wait on the open market.
                    </p>
                    <p>
                      The approach is document-first and position-driven: I read
                      before I recommend, build the position before I move on it,
                      and understand both sides of the table as carefully as the
                      file. Strength in a transaction is doing the work, holding
                      composure, and walking in with options, not noise.
                    </p>
                  </>
                )}
              </blockquote>
              <button
                type="button"
                onClick={() => setBioOpen((o) => !o)}
                aria-expanded={bioOpen}
                className="mt-4 inline-flex items-center gap-1.5 font-sans font-semibold text-[12px] uppercase tracking-[0.14em] text-bronze hover:text-stone transition-colors"
              >
                {bioOpen ? 'Read less' : 'Read more'}
                <span aria-hidden="true">{bioOpen ? '↑' : '↓'}</span>
              </button>
            </div>
          </figure>

          <div className="pt-6">
            <Eyebrow>Team</Eyebrow>
          </div>

          {/* Dave — portrait pending */}
          <figure className="rounded-[18px] bg-navy p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div
                aria-hidden="true"
                className="w-48 sm:w-60 aspect-[4/5] rounded-[16px] border border-bronze/40 bg-white/[0.02] flex items-center justify-center shrink-0 px-3 text-center"
              >
                <span className="font-display italic text-bronze/90 text-[1rem] sm:text-[1.15rem] leading-snug">
                  Portrait<br />coming soon
                </span>
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="font-display font-medium text-stone text-[1.7rem] sm:text-[2rem] leading-tight">
                  Dave Dhaliwal
                </p>
                <p className="mt-1.5 font-sans text-[13px] sm:text-[13.5px] text-bronze font-semibold uppercase tracking-[0.16em]">
                  Real Estate Salesperson
                </p>
                <p className="mt-3 text-[13.5px] text-stone-soft leading-relaxed">
                  HomeLife G1 Realty Inc., Brokerage
                  <br />
                  RECO Reg. No. 5024155
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-white/10">
              <Quote
                className="h-6 w-6 text-bronze/80"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-stone-soft">
                <p>
                  My route into real estate started outside the licence.
                  More than a decade investing in Ontario property,
                  acquiring, holding and operating residential and
                  small-portfolio assets, gave me the read on what a
                  property is really worth and what buyers actually respond
                  to. The past five years as a registered Salesperson sit
                  on top of that foundation.
                </p>
                <p>
                  My approach to every file is the same: calm, practical
                  and centred on the client. The files I take most often
                  are the ones where the stakes are personal and the timing
                  is not theirs. Separations, estate sales,
                  financial-pressure transactions, partnership disputes,
                  alongside the standard residential work that runs through
                  every quarter. Honest numbers, clear options and a sale
                  handled with care from the first conversation to the
                  closing table.
                </p>
              </blockquote>
            </div>
          </figure>
        </div>
      </section>
    </>
  )
}
