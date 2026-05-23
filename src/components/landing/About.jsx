import React from 'react'
import { motion } from 'framer-motion'
import { Building2, BadgeCheck } from 'lucide-react'
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
          <div className="mt-5 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-7">
            <img
              src={portrait}
              alt="Taran Aujla, Salesperson, HomeLife G1 Realty Inc., Brokerage"
              width="208"
              height="260"
              className="w-44 sm:w-52 h-56 sm:h-64 object-cover object-top rounded-2xl border border-surface-line shadow-card flex-shrink-0"
            />
            <div className="pb-1">
              <h2 className="text-display-lg text-ink font-semibold">
                Taran Aujla, Salesperson.
              </h2>
              <p className="mt-2 text-ink-soft font-medium">
                HomeLife G1 Realty Inc., Brokerage
              </p>
            </div>
          </div>
          <div className="mt-7 space-y-4 text-[16.5px] leading-relaxed text-ink-soft">
            <p>
              For close to a decade I practised business and real estate law in
              Ontario, working through hundreds of transactions and the
              complications that come with them. I was often the one called in
              when a deal was tangled, time-sensitive, or going sideways. That
              work taught me exactly where property transactions break, and how
              to keep them from breaking. I now work on the deal side directly,
              as a real estate Salesperson with HomeLife G1 Realty Inc., Brokerage.
            </p>
            <p>
              A difficult situation isn&rsquo;t solved by putting a sign on the
              lawn and cutting the price until something sells. It&rsquo;s solved
              by understanding it first. Before anything is listed, I work to
              understand your full situation, the timeline, the numbers, the
              pressures, and what a genuinely good outcome looks like for you,
              so the plan is built around your circumstances rather than a
              generic playbook. The legal questions go to your lawyer. The
              strategy, the preparation, and the representation are mine.
            </p>
            <p>
              That preparation is the difference between a sale that adds to the
              stress and one that quietly takes it away. If you would like a
              private, confidential conversation about what you are facing, with
              no obligation and no pressure, reach out below or by phone.
            </p>
          </div>
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
                    Practitioner
                  </p>
                  <p className="mt-1 font-semibold text-ink">Taran Aujla, Salesperson</p>
                  <p className="text-sm text-ink-soft">
                    Direct:{' '}
                    <a href="tel:+13656457332" className="text-ink hover:text-accent-deep transition-colors">
                      (365) 645-7332
                    </a>
                  </p>
                  <p className="text-sm text-ink-soft mt-1">RECO Registration No. 6024721</p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </Section>
  )
}
