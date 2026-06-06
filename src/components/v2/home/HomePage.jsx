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
 * Section flow (editorial rhythm — thesis, proof, process, close):
 *   1. Hero               — Navy (image scrim, the "what" lives in
 *                                  the situation pills inside)
 *   2. Situations         — Stone (six file-type tiles linking out to
 *                                   each deep-dive page — the "what
 *                                   we handle" answer)
 *   3. DifferentApproach  — Navy (the THESIS. "Most agents market
 *                                  property. We solve property
 *                                  problems." This is the strongest
 *                                  positioning statement on the page
 *                                  and now carries the #why-resolve
 *                                  anchor so the header's "Why Us"
 *                                  nav lands on it first.)
 *   4. WhyResolve         — Stone (the PROOF — three pillars backing
 *                                   the thesis: decade of combined
 *                                   experience, direct negotiation
 *                                   history, qualified buyer network)
 *   5. HowWeHelp          — Mist (the PROCESS — what working with
 *                                  Resolve actually looks like)
 *   6. ClosingCta         — Stone (the CLOSE — last visual rhyme
 *                                   back to hero)
 *
 * The previous flow had WhyResolve at #3 and DifferentApproach buried
 * at #5. Visitors who never made it that far missed the strongest
 * positioning statement on the site. Moving DifferentApproach up and
 * giving it the #why-resolve anchor fixes both problems at once —
 * the nav lands on the thesis, and the three supporting pillars
 * immediately follow as the proof block.
 *
 * Surface rhythm now reads Navy → Stone → Navy → Stone → Mist →
 * Stone. The Stone-between-the-two-Navys (Situations) is the visual
 * breath; the two Navy moments anchor "the situations are real" and
 * "this is how we approach them differently."
 *
 * TrustStrip + Footer are mounted globally in App.jsx so they render
 * underneath the page content on every route.
 *
 * WhyThisMatters and Testimonial component files are preserved but
 * not mounted — kept in case the empathy-beat slot ever wants
 * restoring (e.g. paired with a real client quote).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <DifferentApproach />
      <WhyResolve />
      <HowWeHelp />
      <ClosingCta />
    </>
  )
}
