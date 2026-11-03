import React from 'react'
import { Link } from 'react-router-dom'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Question page: "I got a Notice of Sale. What happens now?"
 *
 * Written in the searcher's words, answered in the first lines, then
 * pointed at /power-of-sale/ and /sell-during-power-of-sale/.
 *
 * Statute checked on e-Laws (2 Nov 2026), Mortgages Act, R.S.O. 1990, c. M.40:
 *   s. 32: notice only after 15 days of default; no sale for at least
 *          35 days after the notice is given.
 *   s. 22(1)(a): the mortgagor may pay the amount due (excluding money due
 *          only by lapse of time) and the mortgagee's necessary expenses
 *          at any time before sale, and is relieved of the default.
 *
 * Compliance: says what the owner gets, never how the file is run. No
 * "stop power of sale" or "save your home" claims, no guarantees, no
 * legal advice (dates on a file go to the owner's own lawyer).
 */
export function NoticeOfSale() {
  return (
    <>
      <SituationPage
        eyebrow="Situations · Notice of Sale"
        title="You Got a Notice of Sale. What Happens Now?"
        situationLabel="Notice of sale"
        situationSlug="notice-of-sale"
        lead={
          <>
            A Notice of Sale means your lender has started the power of sale
            process. It does not mean the house is sold. In Ontario the lender
            has to wait at least 35 days after giving the notice before it can
            sell, and until it does, the home is still yours to sell. What you
            do in those weeks decides how much of your equity you keep.
          </>
        }
      >
        <SituationBlock label="What it is" title="What a Notice of Sale is.">
          <p>
            It is a formal notice, usually sent by your lender&rsquo;s lawyer,
            that the lender intends to sell the property under the power of
            sale in your mortgage. It sets out the amount the lender says is
            owing and the date after which it can sell.
          </p>
          <p>
            The rules come from Ontario&rsquo;s Mortgages Act. The notice can
            only be given once a payment has been in default for at least 15
            days, and the sale cannot happen until at least 35 days after the
            notice is given (section 32). Your notice states the date that
            applies to your mortgage.
          </p>
        </SituationBlock>

        <SituationBlock label="Your options" title="What you can still do.">
          <p>
            Until the lender completes a sale, you still own the house. Most
            owners in this position have the same choices: catch up, pay the
            mortgage out, or sell.
          </p>
          <p>
            The Mortgages Act lets an owner pay what is in arrears, plus the
            lender&rsquo;s necessary expenses, at any time before the sale,
            and be relieved of the default (section 22). If that is realistic
            for you, it is worth knowing the exact figure early. Your lawyer
            can confirm it.
          </p>
        </SituationBlock>

        <SituationBlock label="If selling is the answer" title="Selling it yourself, inside the notice period.">
          <p>
            If catching up is not realistic, the house will be sold either
            way. The question is who sells it. When you sell, you choose the
            agent, the price and the closing date, and you can usually stay in
            the home while it is on the market.
          </p>
          <p>
            A lender&rsquo;s sale tends to come later. Interest keeps running,
            and the lender&rsquo;s legal fees and other enforcement costs are
            added to what you owe before anything comes back to you.
          </p>
          <p>
            With Resolve you get a listing priced from real sales near you,
            your lender kept informed, and every offer sent to the lender the
            day it arrives, so the sale is not held up waiting for an
            answer. More on how this works in{' '}
            <Link to="/sell-during-power-of-sale/" className="text-navy underline underline-offset-4 decoration-bronze/60 hover:decoration-bronze">
              selling your house during power of sale
            </Link>
            .
          </p>
        </SituationBlock>

        <SituationBlock label="This week" title="What to do now.">
          <p>
            Keep the notice and every letter from the lender together, and
            ask your lawyer to confirm the dates on your file. Then find out
            what the home would sell for today, so you know what a sale would
            leave you before you decide anything.
          </p>
          <p>
            A conversation with Resolve is private and costs nothing. For the
            wider picture, read our guide to{' '}
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
