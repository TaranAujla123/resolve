import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Mortgage Arrears" situation.
 *
 * SEO target keywords (Ontario context):
 *   mortgage arrears Ontario, behind on mortgage payments sell house,
 *   missed mortgage payments selling, can't pay mortgage Ontario,
 *   sell house before foreclosure Ontario
 *
 * Compliance posture:
 *   - No "stop foreclosure" / "save your home" / outcome-guarantee language
 *   - No specialist / exclusive / best language
 *   - Educational framing; brokerage attribution covered by BrokerageStrip
 *     and Footer; general-info disclaimer rendered in SituationPage shell
 */
export function MortgageArrears() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Mortgage Arrears"
      title="Selling a Home in Mortgage Arrears in Ontario."
      lead={
        <>
          Falling behind on mortgage payments does not happen overnight, and
          the way out is rarely a single conversation either. But the longer
          arrears sit, the narrower the options become and the heavier the
          equity drain. Resolve represents Ontario homeowners considering a
          sale to step out of arrears: privately, on a realistic timeline, and
          with as much equity as possible kept in your hands.
        </>
      }
    >
      <SituationBlock label="What it means" title="What mortgage arrears means here.">
        <p>
          Mortgage arrears is the formal name for missed mortgage payments. In
          Ontario, after a couple of missed payments your lender will typically
          start sending default letters, calling, and adding fees. After
          roughly 90 to 120 days in arrears, most lenders will either start a
          power of sale, call the loan, or pressure for a sale arranged by the
          homeowner. Different lenders run different timelines, but the
          direction is consistent: arrears get more expensive the longer they
          run.
        </p>
        <p>
          There are usually three real paths once arrears begin. Bring the loan
          current (often through refinancing or a private lender). Restructure
          the loan with the existing lender. Or sell the home. The right path
          depends on the equity in the property, the income picture, the
          timeline, and what other options are realistic.
        </p>
        <p>
          Selling is not always the answer. But when it is, doing it before the
          lender takes control of the timeline preserves the most value.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve helps when arrears begin.">
        <p>
          <strong className="text-ink font-semibold">A private conversation first.</strong>{' '}
          Before anything else, we look at the file with you and tell you what
          is realistic. Sometimes refinancing or a lender restructure makes
          more sense than selling, and we will say so. The first conversation
          stays private and never moves further unless you decide to move
          forward.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination, not handoff.</strong>{' '}
          If selling is the right path, we coordinate with your real estate
          lawyer and stay in contact with the lender. The sale moves on a
          defensible timeline, not a panic one, and the lender stays informed
          rather than surprised.
        </p>
        <p>
          <strong className="text-ink font-semibold">Equity-first sale strategy.</strong>{' '}
          Properly priced, properly prepared, listed for value rather than
          rushed for a quick exit. Full MLS exposure remains available, and
          where you choose, qualified buyers from our network can be brought
          alongside. The goal is to leave you with as much of your equity as
          the situation allows.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to reach out.">
        <p>
          At the first sign of strain, ideally before the second missed
          payment. Once arrears are in the lender&rsquo;s system, options
          narrow week by week, and the leverage in any conversation with the
          lender drops with them.
        </p>
        <p>
          Even if you decide not to sell, knowing what the sale option looks
          like gives you real leverage in the conversations you are about to
          have with your lender. The point of the first conversation is
          clarity, not commitment.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['power-of-sale', 'divorce-real-estate', 'estate-sale']} />
    </>
  )
}
