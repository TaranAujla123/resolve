import React from 'react'
import { Link } from 'react-router-dom'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Question page: "Can I still sell my house during power of sale in Ontario?"
 *
 * Answered in the first line ("Usually, yes"), then the two things owners
 * worry about: a price that will not cover the mortgage, and why their own
 * sale tends to leave them better off. Points at /power-of-sale/ and
 * /notice-of-sale/.
 *
 * Compliance: what the owner gets, never how the file is run. No promise
 * that a lender will agree to anything, no guarantees, no legal advice.
 * The owner lists without asking the lender's permission (lender approval
 * matters only at closing when the sale will not pay out in full).
 */
export function SellDuringPowerOfSale() {
  return (
    <>
      <SituationPage
        eyebrow="Situations · Selling During Power of Sale"
        title="Can You Still Sell Your House During Power of Sale?"
        situationLabel="Selling during power of sale"
        situationSlug="sell-during-power-of-sale"
        lead={
          <>
            Usually, yes. Power of sale gives your lender the right to sell the
            home, not ownership of it. Until the lender sells it, you can list
            it, accept an offer and close. A sale you run at market value,
            with you still in the home, usually leaves you better off than
            waiting for the lender to sell.
          </>
        }
      >
        <SituationBlock label="When you can sell" title="You can sell until the lender does.">
          <p>
            You do not need the lender&rsquo;s permission to list your own
            home. If the sale pays the mortgage, the arrears and the
            lender&rsquo;s costs in full, the lender is simply paid out from
            the proceeds on closing, like any other sale.
          </p>
          <p>
            If you have just received the notice, start with{' '}
            <Link to="/notice-of-sale/" className="text-navy underline underline-offset-4 decoration-bronze/60 hover:decoration-bronze">
              what a Notice of Sale means and what happens next
            </Link>
            .
          </p>
        </SituationBlock>

        <SituationBlock label="If the price falls short" title="If the sale will not cover what you owe.">
          <p>
            Many power of sale files are close to the line. If a fair sale
            will not pay everything, the lender has to agree to discharge the
            mortgage for the net proceeds, and any balance normally remains a
            debt.
          </p>
          <p>
            A sale at full market value still matters in that case. The higher
            the price, the smaller the balance left owing, and the sooner the
            sale closes, the less interest and cost is added to it.
          </p>
        </SituationBlock>

        <SituationBlock label="Why sell first" title="Why your own sale usually leaves you better off.">
          <p>
            A lender&rsquo;s sale tends to happen months later. Interest keeps
            running, and the lender&rsquo;s legal fees, appraisal, commission
            and other costs come out of the sale before anything is left for
            you.
          </p>
          <p>
            Homes sold by a lender are also marketed as power of sale
            listings, which draws buyers looking for a discount. Your own
            listing is simply a home for sale.
          </p>
        </SituationBlock>

        <SituationBlock label="With Resolve" title="What you get.">
          <p>
            A Salesperson who prices the home from real sales near you, keeps
            your lender informed, and sends every offer to the lender the day
            it arrives. You stay in the home while it sells, and your
            situation is not advertised.
          </p>
          <p>
            For the full picture, read our guide to{' '}
            <Link to="/power-of-sale/" className="text-navy underline underline-offset-4 decoration-bronze/60 hover:decoration-bronze">
              power of sale in Ontario
            </Link>
            .
          </p>
        </SituationBlock>
      </SituationPage>
      <RelatedSituations relatedSlugs={['mortgage-arrears', 'financial-pressure', 'time-sensitive-sales']} />
    </>
  )
}
