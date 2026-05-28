import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

/**
 * Inquiry-received page. Reached programmatically after a successful
 * Formspree submission (see InquiryForm.jsx and Buyers.jsx), and not
 * linked from anywhere else. Carries noindex,nofollow via <Seo /> in
 * App.jsx so the URL stays out of search results.
 *
 * Tone mirrors the Primegate /thanks/ pattern (read personally + named
 * response window + brokerage attribution + back-to-home). Resolve-
 * specific: uses "one business day" matching the inquiry form copy,
 * and softens the Primegate "I will tell you" into the practice voice
 * ("we'll let you know") since Resolve operates as a two-practitioner
 * shop, not a solo voice.
 */
export function ThankYou() {
  return (
    <section className="bg-hero-fade">
      <div className="container section-y">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center pt-8 sm:pt-12 pb-16"
        >
          <div className="h-14 w-14 mx-auto rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7" strokeWidth={1.7} />
          </div>

          <p className="mt-7 inline-flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
            <span aria-hidden="true" className="block h-px w-8 sm:w-10 bg-accent-deep" />
            Inquiry Received
            <span aria-hidden="true" className="block h-px w-8 sm:w-10 bg-accent-deep" />
          </p>

          <h1 className="mt-4 text-display-xl text-ink font-display font-semibold leading-tight">
            Thank you.
          </h1>

          <p className="mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-ink-soft">
            Your inquiry has been received privately. We read each one personally
            and will be in touch within one business day. If we&rsquo;re a fit for
            what you&rsquo;re navigating, we&rsquo;ll let you know. If not,
            we&rsquo;ll point you to a colleague better suited.
          </p>

          <p className="mt-8 text-[14px] text-ink-mute leading-relaxed">
            All real estate trades are made through{' '}
            <span className="font-semibold text-ink-soft">
              HomeLife G1 Realty Inc., Brokerage
            </span>
            .
          </p>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent-deep hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
