import React from 'react'
import { Quote } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import portrait from '@/portrait.jpg'

/**
 * AboutPage — V2 /about route.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (About)
 *
 * Hero (Stone): "About Resolve." headline + italic sub.
 * Intro paragraphs.
 * Practitioner cards (Mist surface for the section that holds them):
 *   - Taran Aujla, Salesperson, RECO 6024721
 *   - Dave Dhaliwal, Salesperson, RECO 5024155
 * Each carries the existing bio block (preserved verbatim from the
 * landing page's About section). No legal-practice claims; Phase 1
 * conservative posture.
 *
 * Dave currently has no portrait file in the repo — render an initial
 * monogram in his place until one is added.
 */
export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container max-w-4xl">
          <Eyebrow>About Resolve</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-navy text-display-xl">
            About Resolve.
          </h1>
          <p className="mt-1 font-display font-medium italic text-bronze text-display-lg leading-[1.05]">
            Why this practice exists.
          </p>

          {/* Paragraph 1 — brand thesis. Newsreader display tier with the
              italic-bronze "Resolve" wordmark callback. The thesis sits
              alone in the display tier so it carries weight as the page's
              opening statement. */}
          <p className="mt-10 font-display font-medium text-navy text-[clamp(1.5rem,2.2vw,1.75rem)] leading-[1.45] max-w-[680px]">
            <em className="not-italic">
              <span className="font-display italic text-bronze">Resolve</span>
            </em>
            {' '}exists because some property situations need more than a
            standard listing.
          </p>

          {/* Paragraphs 2 and 3 — institutional body. Past-tense
              "background spans... including real estate law" preserves
              the legal-background credibility while staying clear of any
              present-tense legal-practice claim (Phase 1 LSO JR posture).
              Brokerage attribution lives on the bio cards below + the
              global Footer; no need to restate it here. */}
          <div className="mt-12 space-y-5 text-[17px] leading-relaxed text-navy-soft max-w-3xl">
            <p>
              We&rsquo;re Taran and Dave. Our background spans years inside
              Ontario real estate, including real estate law, property
              transactions, and real estate investing. That experience
              helps us identify issues early, understand what buyers
              respond to, and guide sellers through more complex situations
              with confidence.
            </p>
            <p>
              Whether the challenge involves mortgage arrears, power of
              sale, an estate matter, or a time-sensitive sale, our role
              is simple: provide practical seller representation when
              selling is not straightforward.
            </p>
          </div>
        </div>
      </section>

      {/* Practitioner bios */}
      <section data-surface="mist" className="bg-mist section-y">
        <div className="container max-w-4xl space-y-8">
          <Eyebrow>Led By</Eyebrow>

          {/*
            Practitioner figure layout (Taran + Dave below).

            Top row (always flex-row, including mobile): portrait on the
            left + identity block on the right. This fills the right-of-
            portrait whitespace that previously sat empty on mobile — the
            visitor now sees "Taran Aujla / Salesperson / RECO 6024721"
            beside the photo, which doubles as RECO Bulletin 5.2's
            practitioner identification right at the moment the face
            registers.

            Bottom row: blockquote spans the full card width below, so
            the long body copy reads at a comfortable measure rather
            than wedged into the right column on desktop. The bronze
            quote-mark glyph anchors the bottom row.
          */}

          {/* Taran */}
          <figure className="rounded-[18px] border border-divider bg-stone p-6 sm:p-8 shadow-card">
            <div className="flex flex-row gap-5 sm:gap-7 items-start">
              <img
                src={portrait}
                alt="Taran Aujla, Salesperson"
                width="160"
                height="200"
                className="w-28 h-36 sm:w-40 sm:h-48 object-cover object-top rounded-[14px] border border-divider flex-shrink-0"
              />
              <div className="flex-1 min-w-0 pt-1">
                <p className="font-display font-medium text-navy text-[1.35rem] sm:text-[1.55rem] leading-tight">
                  Taran Aujla
                </p>
                <p className="mt-1 font-sans text-[13.5px] sm:text-[14px] text-bronze font-semibold uppercase tracking-[0.14em]">
                  Salesperson
                </p>
                <p className="mt-2 text-[13px] sm:text-[13.5px] text-navy-mute leading-relaxed">
                  RECO Reg. No. 6024721
                </p>
                <p className="mt-3 text-[12.5px] text-navy-mute leading-relaxed">
                  HomeLife G1 Realty Inc., Brokerage
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-divider/70">
              <Quote
                className="h-6 w-6 text-bronze/80"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-navy-soft">
                <p>
                  For close to a decade I practised real estate law in
                  Ontario, working through hundreds of transactions and the
                  complications that come with them. I was often the one
                  called in when a deal was tangled, time-sensitive, or
                  going sideways. That work taught me where property
                  transactions break, and how to keep them from breaking.
                  How to calmly navigate the moving parts and logistics when
                  a deal gets complicated.
                </p>
                <p>
                  My introduction to real estate came even earlier than the
                  legal work. I started managing my parents&rsquo; rental
                  properties at sixteen, and acquired and operated my own
                  properties in the years that followed. That foundation,
                  alongside the years of closing-stage work, is what shapes
                  the practice now. I work on the deal side directly, as a
                  Salesperson, not as a lawyer.
                </p>
                <p>
                  The approach is document-first, market-aware and
                  position-driven. I read before I recommend, build the
                  position before I move on it, and understand both sides
                  of the table as carefully as I understand the file.
                  Strength in a transaction is doing the work, holding
                  composure and walking in with options, not noise.
                </p>
              </blockquote>
            </div>
          </figure>

          {/* Dave */}
          <figure className="rounded-[18px] border border-divider bg-stone p-6 sm:p-8 shadow-card">
            <div className="flex flex-row gap-5 sm:gap-7 items-start">
              {/*
                Dave's portrait is not yet shot. Rather than a "DD" monogram
                (which read more like a redacted name than a deliberate
                placeholder), the box holds a small italic note in the
                same Newsreader voice as the section headings. Reads as
                editorial restraint, not absence. Swap in the <img> the
                moment the portrait file lands in src/.
              */}
              <div
                aria-hidden="true"
                className="w-28 h-36 sm:w-40 sm:h-48 rounded-[14px] border border-divider bg-rose flex items-center justify-center flex-shrink-0 px-3 text-center"
              >
                <span className="font-display italic text-bronze text-[0.95rem] sm:text-[1.1rem] leading-snug">
                  Portrait<br />coming soon
                </span>
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="font-display font-medium text-navy text-[1.35rem] sm:text-[1.55rem] leading-tight">
                  Dave Dhaliwal
                </p>
                <p className="mt-1 font-sans text-[13.5px] sm:text-[14px] text-bronze font-semibold uppercase tracking-[0.14em]">
                  Salesperson
                </p>
                <p className="mt-2 text-[13px] sm:text-[13.5px] text-navy-mute leading-relaxed">
                  RECO Reg. No. 5024155
                </p>
                <p className="mt-3 text-[12.5px] text-navy-mute leading-relaxed">
                  HomeLife G1 Realty Inc., Brokerage
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-divider/70">
              <Quote
                className="h-6 w-6 text-bronze/80"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-navy-soft">
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
