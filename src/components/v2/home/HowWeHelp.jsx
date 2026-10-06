import React from 'react'
import { Calculator, Handshake, FileCheck, Scale, Home } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * HowWeHelp — V2 home page "How We Help" 5-step process strip.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Home)
 * + Brand-System-V2/icons.md (Process Steps — locked icons)
 *
 * Surface: Mist (the cooler tone — invites the reader to absorb, not to
 * react). Each cell pairs a navy outline icon at 40px with a short
 * Newsreader card title and an Inter body sentence.
 *
 * These 5 process icons describe the *process* the client moves
 * through, not Resolve's character. (A separate 5-pillar TrustStrip
 * used to live just above the Footer carrying the character beats;
 * it was removed because it was decorative without adding new
 * information. If a character strip ever returns, keep the two
 * concepts visually distinct.)
 */
const STEPS = [
  {
    Icon: Calculator,
    title: 'The number first',
    body: 'What it will sell for, priced from real sales and not the balance owing, what is owed, and what you keep. In writing, before anything lists.',
  },
  {
    Icon: Handshake,
    title: 'The lender, early',
    body: 'Where a lender is involved, we bring them in with your consent, so the sale has room to run.',
  },
  {
    Icon: FileCheck,
    title: 'Offers built to close',
    body: 'Dates, deposits and conditions that hold, including any lender sign-off.',
  },
  {
    Icon: Scale,
    title: 'Your lawyer in the loop',
    body: 'Through to closing, with what is left paid to you on closing day.',
  },
  {
    Icon: Home,
    title: 'Your next place',
    body: 'Buying smaller with what is left, or renting. We help find it and line it up, so you move straight from one to the other.',
  },
]

export function HowWeHelp() {
  return (
    <section id="how-we-help" data-surface="mist" className="bg-mist section-y">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>How the Sale Runs</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
            Five steps, in this order.
          </h2>
        </div>

        <ul className="
          mt-14 grid gap-y-12 gap-x-8
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
        ">
          {STEPS.map(({ Icon, title, body }, idx) => (
            <li key={title} className="flex flex-col items-center text-center">
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-10 w-10 text-navy"
              />
              {/* Bronze 01/02/03/04/05 italic numerals — a subtle
                  editorial cadence above each step title. Newsreader
                  italic 500 at 24px in bronze. */}
              <span
                aria-hidden="true"
                className="
                  mt-5 font-display italic font-medium text-bronze
                  text-[24px] leading-none tracking-tight
                "
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-sans font-semibold text-[16px] text-navy leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-navy-soft max-w-[18ch] sm:max-w-none">
                {body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center text-[14.5px] text-navy-soft">
          Private throughout. Nothing in the listing says why the home is for sale.
        </p>
      </div>
    </section>
  )
}
