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
      situationLabel="Mortgage arrears"
      situationSlug="mortgage-arrears"
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
          Ontario, after a single missed payment most lenders will call. After
          two or three, default letters start arriving and fees begin
          accumulating. Around 90 to 120 days in arrears, most lenders will
          either start a power of sale, call the loan, or pressure for a sale
          arranged by the homeowner. Different lenders run different
          timelines, but the direction is consistent: arrears get more
          expensive the longer they run, and the options narrow at every step.
        </p>
        <p>
          There are usually three real paths once arrears begin. Bring the loan
          current (often through a refinance, a second mortgage, or a private
          lender). Restructure the loan with the existing lender, through
          forbearance, a partial payment plan, or an interest-only arrangement
          where the lender will accept one. Or sell the home before the lender
          forces the issue. The right path depends on the equity in the
          property, the income picture, the timeline, and what your existing
          lender is realistically willing to consider.
        </p>
        <p>
          Selling is not always the answer. Sometimes a refinance or a
          structured workout makes more sense. But when selling is the right
          path, doing it before the lender takes control of the timeline is
          what preserves the most value. The equity drain in late-stage
          arrears (default fees, accrued interest, legal costs, eventually a
          lender-driven listing) compounds quickly and is hard to reverse.
        </p>
      </SituationBlock>

      <SituationBlock label="What lenders will and will not do" title="What homeowners commonly do not realise.">
        <p>
          Most Ontario lenders have a workout function before they reach for
          power of sale. What they will consider varies. Forbearance, where
          payments are deferred for a defined period, is more common with
          A-tier lenders and with newer arrears files. Partial payment plans
          can buy time when income is recovering. Interest-only arrangements
          show up occasionally. A small number of lenders will quietly
          re-amortise to lower the monthly payment.
        </p>
        <p>
          What they generally will not do: forgive arrears, pause accruing
          interest, or hold off enforcement forever. After a certain point the
          file moves from collections to enforcement counsel, and once a
          lawyer is engaged the cost calculus shifts. Most homeowners do not
          see this transition coming until the legal fees start showing up on
          the statement.
        </p>
        <p>
          Refinancing into a private mortgage is a real option in many cases,
          but it is rarely a long-term fix. Rates and fees on private lending
          are materially higher than on A-tier mortgages, so a private
          refinance buys time at a cost. Whether that trade is worth making is
          a math problem that depends on the homeowner&rsquo;s plan for
          getting back to conventional lending, and on the equity available to
          absorb the higher carrying cost.
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
