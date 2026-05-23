import React from 'react'
import { motion } from 'framer-motion'
import { Building2, BadgeCheck, Quote } from 'lucide-react'
import { Section, SectionHead } from './Section'
import portrait from '@/portrait.jpg'

export function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="eyebrow">About</p>
          <h2 className="mt-3 text-display-lg text-ink font-semibold">About Resolve</h2>

          <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-soft">
            <p>
              Resolve is a boutique seller representation practice operating through
              HomeLife G1 Realty Inc., Brokerage. It was built to handle the files
              that don&rsquo;t fit the standard listing playbook, where timing,
              discretion, equity, and the right counsel matter more than maximum
              exposure. The standard is the same on every file: a private first
              conversation, a clear written assessment before any decision, and full
              representation through to closing, with protecting your equity the
              priority at every stage. The practice operates from Brampton and
              serves Ontario.
            </p>
            <p>
              Resolve is led by Taran Aujla, Salesperson, and Dave Dhaliwal, Broker,
              both with HomeLife G1 Realty Inc., Brokerage. Between them they bring
              brokerage-level experience and several hundred Ontario property
              transactions across residential, commercial, and complex situations.
            </p>
          </div>

          <figure className="mt-8 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
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
                <blockquote className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">
                  For close to a decade I practised business and real estate law in
                  Ontario, working through hundreds of transactions and the
                  complications that come with them. I was often the one called in
                  when a deal was tangled, time-sensitive, or going sideways. That
                  work taught me where property transactions break, and how to keep
                  them from breaking. I now work on the deal side directly, as a
                  Salesperson, not as a lawyer. Legal questions go to your lawyer;
                  the strategy, the preparation, and the representation are mine.
                </blockquote>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.12em] font-semibold text-ink">
                  Taran Aujla, Salesperson
                </figcaption>
              </div>
            </div>
          </figure>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="bg-surface-tint border border-surface-line rounded-2xl p-7">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-surface-line flex items-center justify-center">
                <Building2 className="h-5 w-5 text-ink" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink-mute font-medium">
                  Brokerage
                </p>
                <p className="mt-1 font-semibold text-ink">
                  HomeLife G1 Realty Inc., Brokerage
                </p>
                <p className="text-sm text-ink-soft">Independently Owned and Operated</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-surface-line space-y-2.5 text-[14.5px] text-ink-soft">
              <p>2260 Bovaird Dr. E. Suite 202</p>
              <p>Brampton, ON L6R 3J5</p>
              <p>
                Office:{' '}
                <a href="tel:+19057937797" className="text-ink hover:text-accent-deep transition-colors">
                  (905) 793-7797
                </a>
              </p>
            </div>
            <div className="mt-5 pt-5 border-t border-surface-line">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-surface-line flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5 text-ink" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-mute font-medium">
                    Practitioners
                  </p>
                  <p className="mt-1 font-semibold text-ink">Taran Aujla, Salesperson</p>
                  <p className="text-sm text-ink-soft">RECO Registration No. 6024721</p>
                  <p className="mt-2 font-semibold text-ink">Dave Dhaliwal, Broker</p>
                  <p className="text-sm text-ink-soft">RECO Registration No. [DAVE_RECO_NUMBER]</p>
                  <p className="mt-3 text-sm text-ink-soft">
                    Direct:{' '}
                    <a href="tel:+13656457332" className="text-ink hover:text-accent-deep transition-colors">
                      (365) 645-7332
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </Section>
  )
}
