import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Section } from './Section'
import portrait from '@/portrait.jpg'

export function About() {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl"
      >
        <p className="eyebrow">About</p>
        <h2 className="mt-3 text-display-lg text-ink font-display font-medium">About Resolve</h2>

        <div className="mt-6 max-w-3xl space-y-4 text-[16.5px] leading-relaxed text-ink-soft">
          <p>
            Resolve is a boutique seller representation practice operating through
            HomeLife G1 Realty Inc., Brokerage. It was built to handle the files
            that don&rsquo;t fit the standard listing playbook, where timing,
            discretion, equity, and the right representation matter more than maximum
            exposure. The practice serves homeowners across Ontario. Resolve also maintains a{' '}
            <Link to="/buyers" className="text-accent-deep hover:text-ink underline-offset-4 hover:underline transition-colors">
              qualified buyer network
            </Link>
            {' '}available to sellers who choose to involve it, alongside full MLS
            exposure.
          </p>
          <p>
            Resolve is led by Taran Aujla, Salesperson, and Dave Dhaliwal,
            Salesperson, both with HomeLife G1 Realty Inc., Brokerage. Both
            came to real estate as investors first and now practise on the
            deal side as Salespersons. The combination gives the practice a
            working read of both sides of the table: what a property is
            worth, what buyers respond to, and what carries a sale through
            closing.
          </p>
        </div>

        <figure className="mt-10 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
            <img
              src={portrait}
              alt="Taran Aujla, Salesperson, HomeLife G1 Realty Inc., Brokerage"
              width="156"
              height="196"
              className="w-36 h-44 sm:w-40 sm:h-48 object-cover object-top rounded-xl border border-surface-line flex-shrink-0"
            />
            <div className="flex-1">
              <Quote
                className="h-6 w-6 text-accent-deep/70"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 text-[15.5px] text-ink-soft leading-relaxed space-y-4">
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
                  The approach is document-first, market-aware, and
                  position-driven. I read before I recommend, build the
                  position before I move on it, and understand both sides of
                  the table as carefully as I understand the file. Strength
                  in a transaction is doing the work, holding composure, and
                  walking in with options, not noise. The work is strategy
                  and positioning. The judgment is knowing the difference.
                </p>
              </blockquote>
              <figcaption className="mt-4 text-[13px] uppercase tracking-[0.12em] font-semibold text-ink">
                Taran Aujla, Salesperson
              </figcaption>
            </div>
          </div>
        </figure>

        <figure className="mt-5 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
            <div
              aria-hidden="true"
              className="w-36 h-44 sm:w-40 sm:h-48 rounded-xl border border-surface-line bg-accent-soft flex items-center justify-center flex-shrink-0"
            >
              <span className="font-serif text-[3rem] sm:text-[3.25rem] text-accent-deep tracking-tight leading-none">
                DD
              </span>
            </div>
            <div className="flex-1">
              <Quote
                className="h-6 w-6 text-accent-deep/70"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-3 text-[15.5px] text-ink-soft leading-relaxed space-y-4">
                <p>
                  My route into real estate started outside the licence. More
                  than a decade investing in Ontario property, acquiring,
                  holding, and operating residential and small-portfolio
                  assets, gave me the read on what a property is really
                  worth and what buyers actually respond to. The past five
                  years as a registered Salesperson sit on top of that
                  foundation.
                </p>
                <p>
                  My approach to every file is the same: calm, practical,
                  and centred on the client. The files I take most often
                  are the ones where the stakes are personal and the timing
                  isn&rsquo;t theirs. Separations, estate sales,
                  financial-pressure transactions, partnership disputes,
                  alongside the standard residential work that runs through
                  every quarter. Honest numbers, clear options, and a sale
                  handled with care from the first conversation to the
                  closing table.
                </p>
              </blockquote>
              <figcaption className="mt-4 text-[13px] uppercase tracking-[0.12em] font-semibold text-ink">
                Dave Dhaliwal, Salesperson
              </figcaption>
            </div>
          </div>
        </figure>
      </motion.div>
    </Section>
  )
}
