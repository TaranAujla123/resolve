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
        <h2 className="mt-3 text-display-lg text-ink font-semibold">About Resolve</h2>

        <div className="mt-6 max-w-3xl space-y-4 text-[16.5px] leading-relaxed text-ink-soft">
          <p>
            Resolve is a boutique seller representation practice operating through
            HomeLife G1 Realty Inc., Brokerage. It was built to handle the files
            that don&rsquo;t fit the standard listing playbook, where timing,
            discretion, equity, and the right counsel matter more than maximum
            exposure. The standard is the same on every file: a private first
            conversation, a clear written assessment before any decision, and full
            representation through to closing, with protecting your equity the
            priority at every stage. The practice serves homeowners across
            Ontario. Resolve also maintains a{' '}
            <Link to="/buyers" className="text-accent-deep hover:text-ink underline-offset-4 hover:underline transition-colors">
              qualified buyer network
            </Link>
            {' '}available to sellers who choose to involve it, alongside full MLS
            exposure.
          </p>
          <p>
            Resolve is led by Taran Aujla, Salesperson, and Dave Dhaliwal, Broker,
            both with HomeLife G1 Realty Inc., Brokerage. Between them they bring
            brokerage-level experience and several hundred Ontario property
            transactions across residential, commercial, and complex situations.
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
              <blockquote className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">
                For close to a decade I practised business and real estate law in
                Ontario, working through hundreds of transactions and the
                complications that come with them. I was often the one called in
                when a deal was tangled, time-sensitive, or going sideways. That
                work taught me where property transactions break, and how to keep
                them from breaking. How to calmly navigate the moving parts and
                logistics when a deal gets complicated. I now work on the deal
                side directly, as a Salesperson, not as a lawyer. I focus on the
                strategy, the preparation, and ensuring the deal closes smoothly.
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
              <blockquote className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">
                I&rsquo;ve spent years as a broker, and as a real estate investor
                myself, which gives me a clear read on what a property is really
                worth and what buyers actually respond to. Much of my work has been
                with families selling under pressure: a separation, an estate, a
                financial squeeze, where the stakes are personal and the timing
                isn&rsquo;t theirs. In those moments my job is to bring a steady
                hand, honest numbers, clear options, and a sale handled with care
                from the first conversation to the closing table.
              </blockquote>
              <figcaption className="mt-4 text-[13px] uppercase tracking-[0.12em] font-semibold text-ink">
                Dave Dhaliwal, Broker
              </figcaption>
            </div>
          </div>
        </figure>
      </motion.div>
    </Section>
  )
}
