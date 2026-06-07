import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Power of Sale" situation.
 *
 * Service-page register. Answers three questions in 30 seconds:
 *   1. Am I in the right place?           (Lead + Common situations)
 *   2. Do these people understand me?     (Lead + Common situations)
 *   3. What happens next?                 (Our role, Timing)
 *
 * SEO target keywords (Ontario context):
 *   power of sale Ontario, power of sale realtor, selling home power of sale
 *   Ontario, Notice of Sale Mortgages Act Ontario, equity protection power
 *   of sale Ontario, redemption period Ontario
 *
 * Compliance posture (RECO Bulletin 5.3):
 *   - Educational framing, no "stop power of sale" / "save your home" claims
 *   - "Equity protection as the priority" frames priority, not promise
 *   - No outcome guarantees, no specialist / exclusive / best language
 *   - No legal-practice references (past or present)
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function PowerOfSale() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Power of Sale"
      title="Selling a Home Facing Power of Sale in Ontario."
      situationLabel="Power of sale"
      situationSlug="power-of-sale"
      lead={
        <>
          If your lender has started a power of sale, the clock is running
          but the situation is not hopeless. The equity in the home is
          still yours, and how the next few weeks are handled will decide
          how much of it you keep. Resolve represents Ontario homeowners
          through power of sale: quietly, on a defensible timeline, with
          equity protection as the priority through to closing.
        </>
      }
    >
      <SituationBlock label="What it means" title="What power of sale actually is in Ontario.">
        <p>
          Power of sale is the legal process by which an Ontario lender,
          after a borrower has fallen into mortgage default, sells the
          property to recover the loan. A Notice of Sale Under Mortgage is
          issued, a redemption period (commonly 35 to 45 days under
          section 32 of the Mortgages Act) runs, and if the loan is not
          brought current or paid out by the end of it, the lender becomes
          entitled to take control of the sale. Within that window, the
          homeowner usually has more room to act than they realise.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Notice of Sale Under Mortgage already received</li>
          <li>Statement of Claim served</li>
          <li>Redemption period running or recently expired</li>
          <li>The lender pushing toward their own listing agent</li>
          <li>Meaningful equity remaining that is worth protecting</li>
          <li>A second mortgage or private lender involved</li>
          <li>Default letter received but no Notice of Sale yet</li>
          <li>Wanting to sell before the lender takes full control of the file</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles power of sale files.">
        <p>
          <strong className="text-navy font-semibold">Read the file first.</strong>{' '}
          Before anything else, we look at where the matter actually stands:
          Notice of Sale, redemption window, lender posture, equity picture.
          Sometimes the right move is to bring the loan current rather than
          sell, and we will say so.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate with your real estate lawyer.</strong>{' '}
          Power of sale touches legal and real estate timelines at once. We
          work alongside the lawyer so the sale moves cleanly on a
          defensible timeline, not a panicked one.
        </p>
        <p>
          <strong className="text-navy font-semibold">List with discipline, not desperation.</strong>{' '}
          Properly priced, properly prepared. The goal is preserving as
          much of your equity as the timeline allows, not racing a discount
          onto MLS.
        </p>
        <p>
          <strong className="text-navy font-semibold">Stay in contact with the lender.</strong>{' '}
          A homeowner-led sale, communicated cleanly with the lender, often
          produces a materially better net than a lender-driven listing
          even when the gross sale prices are similar.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          Earlier is easier. The further into the redemption period you
          are, the fewer options remain and the harder it becomes to
          influence the outcome. If you have just received a Notice of
          Sale, or even just a default letter, this is the right time for
          a conversation.
        </p>
        <p>
          It costs nothing, commits you to nothing, and gives you a clear
          read on what is realistic. The point is to take back some
          control of the timeline before the lender takes it instead.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['mortgage-arrears', 'divorce-real-estate', 'property-disputes']} />
    </>
  )
}
