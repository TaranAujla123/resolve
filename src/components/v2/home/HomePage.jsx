import React from 'react'
import { Hero } from './Hero'
import { Situations } from './Situations'
import { WhyResolve } from './WhyResolve'
import { HowWeHelp } from './HowWeHelp'
import { DifferentApproach } from './DifferentApproach'
import { ClosingCta } from './ClosingCta'

/**
 * HomePage — V2 home page composition.
 *
 * Surface flow (per Brand-System-V2/colors.md):
 *   1. Hero               — Stone (default brand)
 *   2. Situations         — Stone (six file-type tiles linking out to
 *                                   each deep-dive page)
 *   3. WhyResolve         — Stone (credibility — three pillars; the
 *                                   "intro/setup" block reads as one
 *                                   continuous brand-introduction
 *                                   before HowWeHelp signals the shift
 *                                   to process)
 *   4. HowWeHelp          — Mist (cooler process tone — the rhythm
 *                                  break that signals "now the
 *                                  mechanics")
 *   5. DifferentApproach  — Navy (emphasis anchor)
 *   6. ClosingCta         — Stone (visual rhyme back to hero)
 *
 * TrustStrip + Footer are mounted globally in App.jsx so they render
 * underneath the page content on every route.
 *
 * Previously slotted between DifferentApproach and ClosingCta was a
 * WhyThisMatters block on Rose Wash — removed at the user's request
 * as filler. The component file at ./WhyThisMatters.jsx is preserved
 * in case the empathy-beat slot ever wants restoring (e.g., paired
 * with a real client quote). Same with Testimonial.jsx.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <WhyResolve />
      <HowWeHelp />
      <DifferentApproach />
      <ClosingCta />
    </>
  )
}
