import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { WhatThisCosts } from '@/components/brand/WhatThisCosts'
import { SituationInquiryForm } from './SituationInquiryForm'

/**
 * SituationPage — shared layout for a situation deep-dive page
 * (e.g. /power-of-sale, /mortgage-arrears).
 *
 * V2 surface flow:
 *   1. Hero strip            — Stone (default)
 *   2. Body / SituationBlocks — Mist (cooler informational tone)
 *   3. Lawyer coordination note — Stone
 *   4. SituationInquiryForm  — Stone (matches /contact register)
 *
 * The eyebrow lockup keeps the "Resolve · <situation name>" return
 * pattern intact; only the surfaces and ink colors shift to V2.
 */
export function SituationPage({ eyebrow, title, lead, situationLabel, situationSlug, children }) {
  return (
    <>
      {/* Hero */}
      <section data-surface="stone" className="bg-stone">
        <div className="container section-y">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 text-[12.5px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 hover:text-bronze-deep transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Resolve
              </Link>
              <span aria-hidden="true" className="text-divider">·</span>
              <span className="text-navy-soft">{eyebrow}</span>
            </p>
            <h1 className="mt-5 font-display font-medium text-navy text-display-md sm:text-display-lg leading-[1.12]">
              {title}
            </h1>
            <p className="mt-6 text-[17px] sm:text-[19px] leading-relaxed text-navy-soft">
              {lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body — situation blocks */}
      <section data-surface="mist" className="bg-mist">
        <div className="container section-y">
          <div className="max-w-3xl space-y-12">{children}</div>
        </div>
      </section>

      {/* Lawyer coordination line */}
      <section data-surface="stone" className="bg-stone">
        <div className="container pt-10 pb-2">
          <p className="mx-auto max-w-3xl text-[12.5px] text-navy-mute leading-relaxed">
            We coordinate with the lawyer on every file. Legal, tax and financial
            questions sit with your own counsel. If you do not have one yet, we
            can recommend a lawyer who handles these matters.
          </p>
        </div>
      </section>

      {/* Cost-transparency callout — answers "what does this cost me?"
          on every situation page so a paid-traffic visitor landing
          directly on /power-of-sale gets the same trust signal a home-
          page visitor sees in the closing CTA. */}
      <section data-surface="stone" className="bg-stone">
        <div className="container pt-12 sm:pt-16">
          <WhatThisCosts className="mx-auto" />
        </div>
      </section>

      {/* CTA / inline inquiry form */}
      {situationLabel && situationSlug ? (
        <SituationInquiryForm
          situationLabel={situationLabel}
          situationSlug={situationSlug}
        />
      ) : (
        <section data-surface="stone" className="bg-stone">
          <div className="container section-y">
            <div className="mx-auto max-w-3xl rounded-[18px] border border-divider bg-stone p-7 sm:p-10 shadow-card">
              <Eyebrow>The Next Step</Eyebrow>
              <h2 className="mt-4 font-display font-medium text-navy text-display-md">
                A private conversation, on your terms.
              </h2>
              <p className="mt-4 text-[16px] text-navy-soft leading-relaxed">
                No obligation, no pressure to list and nothing public. All
                conversations stay private and some do not move further. That
                is fine. The point is for you to see what is realistic and what
                options you actually have.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button as={Link} to="/contact" size="lg" variant="primary" className="group">
                  Request a Private Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button as="a" href="tel:+13656457332" size="lg" variant="outline" className="text-navy border-navy">
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
 * SituationBlock — convenience wrapper for a single body section
 * (eyebrow + H2 + freeform children). Renders inside the Mist body
 * surface of SituationPage so block titles get the bronze eyebrow.
 */
export function SituationBlock({ label, title, children }) {
  return (
    <section>
      {label && (
        <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
          {label}
        </p>
      )}
      <h2 className="mt-3 font-display font-medium text-navy text-display-md">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[16.5px] text-navy-soft leading-relaxed">
        {children}
      </div>
    </section>
  )
}
