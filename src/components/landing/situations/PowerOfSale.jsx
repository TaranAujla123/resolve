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
          but the equity in the home is still yours. The next few weeks
          decide how much of it you keep. Resolve lists and sells homes
          for Ontario owners inside the power of sale window: quietly,
          on your timeline, with as much of your equity preserved as
          the sale allows.
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
          entitled to take control of the sale. Inside that window there
          is usually still a clean sale you can run yourself. We run it.
        </p>
      </SituationBlock>

      <SituationBlock label="How it works" title="Power of sale is not foreclosure.">
        <p>
          Unlike foreclosure (which is the process most Ontario lenders
          avoid), the lender under power of sale does not take title to
          the home. They sell it, recover the mortgage balance plus their
          costs, and any surplus is returned to the homeowner. That
          surplus is your equity, and it is what these decisions are
          protecting.
        </p>
        <p>
          The cost layer is worth understanding. Once a power of sale is
          underway, the lender is entitled to recover its enforcement
          costs from the sale proceeds before any surplus flows back.
          Lender&rsquo;s legal fees, bailiff or process server,
          lender-commissioned appraisal, brokerage commission if the
          lender lists with their own agent, status certificates, tax
          arrears advances. In a typical Ontario residential file these
          commonly run into the low five figures. Every dollar comes out
          of the homeowner&rsquo;s equity.
        </p>
        <p>
          A homeowner-arranged sale, properly positioned and on a
          defensible timeline, often produces a materially better net
          than a sale taken over by the lender, even when the gross sale
          prices end up similar. The shorter the timeline the lender
          has to run, the less of the surplus gets consumed.
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
          <strong className="text-navy font-semibold">Plan the sale around the window you have.</strong>{' '}
          We sit down with you, look at where things stand, and lay out
          how the sale runs inside the time available. Sometimes the
          right move is to bring the loan current rather than sell, and
          we will say so.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate with your real estate lawyer.</strong>{' '}
          Power of sale touches legal and real estate timelines at once.
          We work alongside the lawyer so the sale moves cleanly on your
          timeline, not a panicked one.
        </p>
        <p>
          <strong className="text-navy font-semibold">List with discipline, not desperation.</strong>{' '}
          Properly priced, properly prepared. The goal is to sell on
          your terms and protect as much of your equity as the timeline
          allows, not race a discount onto MLS.
        </p>
        <p>
          <strong className="text-navy font-semibold">Stay in contact with the lender.</strong>{' '}
          A homeowner-led sale, communicated cleanly with the lender,
          often nets you materially more than a lender-driven listing
          even when the gross sale prices are similar.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          Earlier is easier. The further into the redemption period you
          are, the harder it becomes to run the sale on your terms. If
          you have just received a Notice of Sale, or even just a
          default letter, this is the right time for a conversation.
        </p>
        <p>
          It costs nothing and commits you to nothing. The point is to
          take the timeline back before the lender takes it instead, so
          the sale closes the way you want it to close.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['mortgage-arrears', 'divorce-real-estate', 'property-disputes']} />
    </>
  )
}
