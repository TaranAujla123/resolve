import React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHead } from './Section'

const pairs = [
  {
    reality: 'Timelines you did not set',
    realityBody:
      'Lender enforcement dates, court schedules, probate windows, separation timetables. The clock is set by something other than the market.',
    approach:
      'We start by understanding the deadline. The plan, the pricing, and the preparation are built backward from it, with your lawyer kept in the loop the whole way.',
  },
  {
    reality: 'More than one party at the table',
    realityBody:
      'Co-owners, executors, beneficiaries, separating spouses, lenders. A difficult sale usually has more than one person whose interests have to be respected.',
    approach:
      'Communication stays neutral. Updates go to everyone who needs them. Decisions are documented in plain language so no one is caught off guard.',
  },
  {
    reality: 'Equity exposed',
    realityBody:
      'When a sale is rushed or priced reactively, what gets cut first is the equity you have built. The cost is invisible until it is not.',
    approach:
      'Every pricing and timing decision is weighed against what protects that equity. Pre-listing preparation matters more than reactive cuts later.',
  },
  {
    reality: 'Legal questions overlap with the sale',
    realityBody:
      'Title, probate, separation agreements, lien releases, mortgage discharges. The legal layer often dictates what is and is not possible in the sale.',
    approach:
      'Legal questions go to your lawyer. We coordinate with them closely so the sale and the legal work move together instead of in conflict.',
  },
]

export function Reality() {
  return (
    <Section id="reality">
      <SectionHead
        eyebrow="Ontario&rsquo;s real estate reality"
        title={
          <>
            Real estate can get messy.{' '}
            <span className="text-accent-deep italic font-medium">We bring clean solutions.</span>
          </>
        }
        intro="Ontario homeowners are under more pressure than ever. Rising interest rates, legal complexity, and an unforgiving market leave too many people vulnerable. Here&rsquo;s how we solve the problems."
      />
      <div className="mt-10 sm:mt-12 border-y border-surface-line">
        {pairs.map((p, i) => (
          <motion.div
            key={p.reality}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-surface-line last:border-b-0"
          >
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
                The reality
              </p>
              <h3 className="mt-2 text-[1.25rem] sm:text-[1.35rem] font-semibold text-ink leading-snug">
                {p.reality}
              </h3>
              <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
                {p.realityBody}
              </p>
            </div>
            <div className="md:col-span-7 md:pl-2">
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">
                How we work
              </p>
              <p className="mt-2 text-[15.5px] text-ink leading-relaxed">{p.approach}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
