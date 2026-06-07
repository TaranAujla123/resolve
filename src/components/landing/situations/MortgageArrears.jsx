import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Mortgage Arrears" situation.
 *
 * Service-page register. Answers three questions in 30 seconds:
 *   1. Am I in the right place?           (Lead + Common situations)
 *   2. Do these people understand me?     (Lead + Common situations)
 *   3. What happens next?                 (Our role, Timing)
 *
 * SEO target keywords (Ontario context):
 *   mortgage arrears Ontario, behind on mortgage payments sell house,
 *   missed mortgage payments selling, sell house before power of sale
 *   Ontario, equity preservation arrears Ontario
 *
 * Compliance posture (RECO Bulletin 5.3):
 *   - No "stop foreclosure" / "save your home" / outcome-guarantee language
 *   - "Equity preserved as the situation allows" frames priority, not promise
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
          Falling behind on mortgage payments narrows the options week by
          week, and the equity drain compounds quickly. Resolve represents
          Ontario homeowners considering a sale to step out of arrears:
          privately, on a realistic timeline, with as much equity preserved
          as the situation allows.
        </>
      }
    >
      <SituationBlock label="What it means" title="What mortgage arrears means here.">
        <p>
          Mortgage arrears is the formal name for missed mortgage payments.
          After two or three missed payments, default letters arrive and
          fees begin accumulating. Around 90 to 120 days in, most Ontario
          lenders move toward power of sale. The longer arrears run, the
          narrower the options become and the more the equity is consumed
          by default fees, accrued interest, and legal costs.
        </p>
      </SituationBlock>

      <SituationBlock label="How it works" title="The three real paths once arrears begin.">
        <p>
          There are usually three real paths once arrears begin. Bring
          the loan current, through a refinance, a second mortgage, or
          a private lender. Restructure the loan with the existing
          lender, through forbearance, a partial payment plan, or an
          interest-only arrangement where the lender will accept one.
          Or sell the home before the lender forces the issue.
        </p>
        <p>
          The right path depends on the equity in the property, the
          income picture, the timeline, and what the existing lender is
          realistically willing to consider. Selling is not always the
          answer. Sometimes a refinance or a structured workout makes
          more sense, and we will say so.
        </p>
        <p>
          One inflection point most homeowners do not see coming: at a
          certain stage the file moves from the lender&rsquo;s
          collections team to enforcement counsel, and once a lawyer is
          engaged the cost calculus shifts. Most homeowners do not
          register the transition until legal fees start showing up on
          the statement.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Missed two or three payments</li>
          <li>Default or demand letter received from the lender</li>
          <li>Job loss, business slowdown, or income disruption</li>
          <li>Mortgage renewal coming up with no clear path forward</li>
          <li>Carrying costs no longer supportable on current income</li>
          <li>Property tax arrears compounding the file</li>
          <li>A private second mortgage approaching maturity</li>
          <li>Wanting to sell on your terms before the lender forces the next step</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles arrears files.">
        <p>
          <strong className="text-navy font-semibold">Understand where you actually stand.</strong>{' '}
          Before anything is listed, we look at the file with you and tell
          you what is realistic. Sometimes a refinance or a lender restructure
          is the better path, and we will say so.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate, not hand off.</strong>{' '}
          If selling is the right path, we work alongside your real estate
          lawyer and stay in contact with the lender so the sale moves on a
          defensible timeline, not a panic one.
        </p>
        <p>
          <strong className="text-navy font-semibold">Equity-first sale strategy.</strong>{' '}
          Properly priced, properly prepared, listed for value rather than
          rushed for a quick exit. Full MLS exposure remains available;
          where you choose, qualified buyers from our network can be brought
          alongside.
        </p>
        <p>
          <strong className="text-navy font-semibold">Discretion through every stage.</strong>{' '}
          The fact that arrears are part of the story does not need to be
          part of the listing. The sale runs as a sale, not as a distress
          signal.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          At the first sign of strain, ideally before the second missed
          payment. Once arrears are in the lender&rsquo;s system, options
          narrow week by week, and the leverage in any conversation with
          the lender drops with them.
        </p>
        <p>
          Even if you decide not to sell, knowing what the sale option looks
          like gives you real leverage in the conversations you are about to
          have. It costs nothing and commits you to nothing.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['power-of-sale', 'divorce-real-estate', 'estate-sale']} />
    </>
  )
}
