import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SituationInquiryForm } from './SituationInquiryForm'

/**
 * Shared layout for a situation deep-dive page (e.g. /power-of-sale,
 * /mortgage-arrears). Owns the eyebrow + H1 + lead block, renders the
 * page body as children, and closes with a CTA card and a general-info
 * legal disclaimer so the page is RECO/LSO clean by default.
 *
 * Compliance posture:
 *   - No "stop foreclosure" / "save your home" / "guaranteed" language
 *   - Brokerage attribution covered by BrokerageStrip (top of every page)
 *     and Footer block — not restated on this layout
 *   - Single-line "see your real estate lawyer" disclaimer at the bottom
 *     keeps the page firmly inside the real-estate-representation lane
 */
export function SituationPage({ eyebrow, title, lead, situationLabel, situationSlug, children }) {
  return (
    <>
      <section className="bg-hero-fade">
        <div className="container section-y">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Resolve
              </Link>
              <span aria-hidden="true" className="text-ink-mute/40">·</span>
              <span className="text-ink-soft">{eyebrow}</span>
            </p>
            <h1 className="mt-4 text-display-lg sm:text-display-xl text-ink max-w-4xl font-display font-semibold leading-tight">
              {title}
            </h1>
            <p className="mt-5 sm:mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-ink-soft">
              {lead}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint">
        <div className="container section-y">
          <div className="max-w-3xl space-y-12">{children}</div>
        </div>
      </section>

      {/*
        Subtle coordination line. Renders on every situation page (with form
        or with the fallback CTA card) so the "we coordinate with the
        lawyer" note carries consistently and the old generic disclaimer is
        replaced by something that reads like a benefit, not a hedge.
      */}
      <div className="container pt-8 sm:pt-10">
        <p className="mx-auto max-w-3xl text-[12.5px] text-ink-mute leading-relaxed">
          We coordinate with the lawyer on every file. Legal, tax, and
          financial questions sit with your own counsel. If you don&rsquo;t
          have one yet, we can recommend a lawyer who handles these matters.
        </p>
      </div>

      {situationLabel && situationSlug ? (
        <SituationInquiryForm
          situationLabel={situationLabel}
          situationSlug={situationSlug}
        />
      ) : (
        <section>
          <div className="container section-y">
            <div className="mx-auto max-w-3xl rounded-2xl border border-surface-line bg-white p-7 sm:p-10 shadow-card">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                The next step
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                A private conversation, on your terms.
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed">
                No obligation, no pressure to list, and nothing public. All
                conversations stay private and some don&rsquo;t move further.
                That is fine. The point is for you to see what is realistic
                and what options you actually have.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button as="a" href="/#contact" size="lg" variant="primary" className="group">
                  Request a Private Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button as="a" href="tel:+13656457332" size="lg" variant="outline">
                  <Phone className="h-4 w-4" />
                  Call (365) 645-7332
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/**
 * Convenience subcomponent: a body section with a small uppercase eyebrow
 * label, an H2, and freeform children. Keeps every situation page sharing
 * the same visual rhythm.
 */
export function SituationBlock({ label, title, children }) {
  return (
    <section>
      {label && (
        <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
          {label}
        </p>
      )}
      <h2 className="mt-3 text-display-md text-ink font-display font-medium">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
        {children}
      </div>
    </section>
  )
}
