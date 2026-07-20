import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Financial Pressure" situation.
 *
 * The owner who is not behind yet, but the carrying costs have become
 * unsustainable. Renewal shock, negative cash flow rental, a
 * preconstruction closing that cannot be funded, a maxed HELOC or
 * private second, or an income drop that broke the carry. This is
 * the pre-arrears window, where options are widest and the seller
 * has the most leverage.
 *
 * SEO target keywords (Ontario context):
 *   mortgage renewal shock Ontario, cannot afford mortgage after
 *   renewal, negative cash flow rental Ontario, sell before power
 *   of sale, renewal payment doubled, HELOC maxed against home,
 *   preconstruction assignment closing Ontario
 *
 * Compliance posture (RECO Bulletin 5.3):
 *   - Positioning describes posture ("acting from strength"), never
 *     an outcome guarantee.
 *   - Honest-options framing: sell is one of several options and
 *     Resolve will say when a restructure or a hold with changes is
 *     the better move. This is a trust move as well as a compliance
 *     move.
 *   - No specialist / exclusive / best language. No uncited stats.
 *   - Brokerage attribution + RECO disclosure covered by
 *     BrokerageStrip + Footer; SituationPage shell provides the
 *     general-info disclaimer.
 *
 * Voice rules (new copy): no em dashes, no urgency-bait, dignified
 * analyst register. Reader is a professional adult under financial
 * pressure; the page must remove shame without naming it.
 */
export function FinancialPressure() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Financial Pressure"
      title="Selling From Strength, Before Arrears Begin."
      situationLabel="Financial pressure"
      situationSlug="financial-pressure"
      lead={
        <>
          You do not have to wait until you are behind. The strongest
          position a seller ever has is the one before the first missed
          payment. More equity, more time, more options, and a
          conversation with the lender that is still yours to shape.
          Resolve lists and sells for Ontario homeowners acting from
          strength, before arrears start.
        </>
      }
    >
      <SituationBlock label="What it means" title="Financial pressure, before it becomes arrears.">
        <p>
          Financial pressure is the stretch between the moment the carry
          becomes unsustainable and the moment the lender formally
          records a default. Nothing has been reported. No letters have
          arrived. The credit file is still clean. But the numbers do
          not work anymore, and the owner can see the next several
          months without a soft landing in them.
        </p>
        <p>
          This window is where the options are widest and the leverage
          is highest. Selling is one option. Restructuring the loan is
          another. Holding the property with a change in circumstances
          (a tenant, a co-owner arrangement, a private second) is a
          third. The right answer depends on the equity, the income
          picture, and the timeline. The point of the conversation is
          to see the actual position clearly.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Renewal shock. A mortgage renewing off a 2020 or 2021 rate onto today&rsquo;s. The payment jumped and the household budget does not absorb it.</li>
          <li>Negative cash flow rental. An investment property that once paid for itself and now costs the owner every month.</li>
          <li>Preconstruction or assignment closing. A closing date is on the calendar and the funding has not come together.</li>
          <li>HELOC or private second maxed against the home. The debt stack has climbed and refinancing options are narrowing.</li>
          <li>Reduced income against a high carry. Job loss, business slowdown, illness, a change in the household. The carrying costs have not moved but the income to support them has.</li>
          <li>A private mortgage approaching maturity with no clear renewal path.</li>
          <li>Property tax arrears starting to appear on the account.</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="How it works" title="Selling from strength versus selling under enforcement.">
        <p>
          The difference between a sale run in this window and a sale
          run after arrears begin is significant, and most owners
          underestimate it. Before the first missed payment the file is
          still private. There is no default fee accruing. There are no
          lender legal costs coming out of the equity. There is time to
          prepare the property properly, price it properly, and sell it
          properly.
        </p>
        <p>
          Once arrears begin, the picture shifts. The lender&rsquo;s
          collections team engages. Default fees start compounding.
          Somewhere between 90 and 120 days in, most Ontario lenders
          move toward power of sale, and once enforcement counsel is
          engaged the cost calculus shifts again. Every dollar of
          default fees, accrued interest, enforcement counsel, and
          lender-directed marketing comes out of the surplus that would
          otherwise return to the homeowner.
        </p>
        <p>
          Acting inside the pre-arrears window preserves both the equity
          and the standing. It also preserves the option not to sell.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles financial pressure files.">
        <p>
          <strong className="text-navy font-semibold">A clear look at the actual position.</strong>{' '}
          Before any listing decision, we walk through what you own,
          what you owe, what the property is worth in today&rsquo;s
          market, and what the sale would net after costs. Numbers on
          paper, not a pitch.
        </p>
        <p>
          <strong className="text-navy font-semibold">Honest about the alternatives.</strong>{' '}
          Selling is one option. It is not always the right one. If a
          refinance, a lender restructure, a private second, or a hold
          with different tenants makes more sense for the file, we say
          so and we can point you to the professionals who handle that
          side. Resolve is paid on a sale. The recommendation is not.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate with the lender before default starts.</strong>{' '}
          If a sale is the right call, we work directly with your
          lender to structure the timeline so the loan gets paid at
          closing and default is never recorded. The credit file stays
          clean. The lender writes a payoff letter, not a demand
          letter.
        </p>
        <p>
          <strong className="text-navy font-semibold">List with discipline, not desperation.</strong>{' '}
          Properly priced, properly prepared, listed for value rather
          than rushed for a quick exit. The sale runs as a sale, not
          as a signal that anything is wrong.
        </p>
        <p>
          <strong className="text-navy font-semibold">Quiet by default.</strong>{' '}
          The fact that pressure is part of the story does not need to
          be part of the listing. Nothing about the file, the
          motivation, or the timeline enters public view.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why the strongest sellers we work with call first.">
        <p>
          The homeowners who come out of this best are the ones who
          treat the first hard month as a signal, not a stumble. A
          renewal notice that changed the math. A tenant vacating with
          nothing lined up. A closing date on a preconstruction unit
          you can no longer close. A conversation at that point costs
          nothing and commits you to nothing.
        </p>
        <p>
          Even if you decide not to sell, having a clear view of what
          the sale would look like gives you real footing in the
          conversations you are about to have with lenders, brokers,
          and lawyers. Confidential, no obligation, and nothing about
          it needs to go anywhere.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['mortgage-arrears', 'power-of-sale', 'time-sensitive-sales']} />
    </>
  )
}
