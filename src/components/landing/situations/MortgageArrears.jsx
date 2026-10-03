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
      title="Selling a Home in Mortgage Arrears or Default in Ontario."
      situationLabel="Mortgage arrears"
      situationSlug="mortgage-arrears"
      lead={
        <>
          Falling behind on mortgage payments narrows the options week by
          week, and the equity drain compounds fast. Resolve lists and
          sells for Ontario homeowners stepping out of arrears on their
          terms: privately, on a realistic timeline, with as much of
          your equity preserved as the sale allows.
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

      {/* Cost of waiting. The paid arrears ads promise this argument, so it
          sits ahead of the paths: the reader needs to see why the clock
          matters before the three options mean anything. Worked example
          uses public rates only, never a client file. Simple interest,
          labelled as an illustration, so nothing here reads as a quote. */}
      <SituationBlock label="What waiting costs" title="Every month behind adds to what you owe, and not to what the house is worth.">
        <p>
          Missed payments are the part people watch. The part that does the
          damage is quieter. A mortgage in default keeps accruing interest on
          the full balance, the lender adds its own fees and legal costs on
          top, and in some files the lender pays the property taxes and adds
          those too. None of that stops while you are deciding what to do.
        </p>
        <p>
          On a $580,000 mortgage at 6.99%, the interest alone runs to roughly:
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-[14px] border border-divider bg-stone px-6 py-5 text-[16px] tabular-nums">
          <dt className="text-navy-mute">One month behind</dt>
          <dd className="font-semibold text-navy">about $3,400 added</dd>
          <dt className="text-navy-mute">Six months behind</dt>
          <dd className="font-semibold text-navy">about $20,300 added</dd>
          <dt className="text-navy-mute">Twelve months behind</dt>
          <dd className="font-semibold text-navy">about $40,500 added</dd>
          <dd className="col-span-2 mt-1 text-[13px] text-navy-mute">
            Simple interest, for illustration, before any lender fees, legal
            costs or tax arrears. Your own figures sit in your mortgage
            statement.
          </dd>
        </dl>
        <p>
          The house, meanwhile, is worth what the market says it is worth that
          month. That number does not climb because the balance did. So there
          is a point where what is owed passes what the house would sell for,
          and from that point on there is no sale that puts money in your
          hands. The house changes hands either way. The only thing that is
          different is whether you had a say in it.
        </p>
        <p>
          If you are a few months behind, there is usually still a gap between
          the two numbers, and that gap is what gives you choices. It is what
          pays for a refinance to be worth doing, or for a sale to leave you
          with something to start again on. It gets smaller every month, and
          nobody writes to tell you when it closes.
        </p>
        <p>
          That is the whole reason to find out where you stand now rather than
          after the next letter. Knowing the gap does not commit you to selling.
          It tells you how much time you actually have.
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
          realistically willing to consider. Where selling is the strongest
          move, our job is to run it properly and get the home in front of
          the right buyers, well before the lender forces a worse outcome.
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
          <strong className="text-navy font-semibold">Buy you the time to sell on your terms.</strong>{' '}
          We work directly with your lender and their lawyers to buy you
          the time to sell on your terms &mdash; before they take over
          and control the sale themselves.
        </p>
        <p>
          <strong className="text-navy font-semibold">Sit down with you before anything goes live.</strong>{' '}
          Before any listing decision, we walk through where you stand
          and what the sale would actually look like. Sometimes a
          refinance or a lender restructure is the better path, and we
          will say so.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate, not hand off.</strong>{' '}
          When selling is the right path, we work alongside your real
          estate lawyer and stay in contact with the lender so the sale
          moves on your timeline, not a panicked one.
        </p>
        <p>
          <strong className="text-navy font-semibold">List the way that protects your equity.</strong>{' '}
          Properly priced, properly prepared, listed for value rather
          than rushed for a quick exit. Full MLS exposure stays on the
          table; where you choose, qualified buyers from our network can
          be brought alongside.
        </p>
        <p>
          <strong className="text-navy font-semibold">Discretion through every stage.</strong>{' '}
          The fact that arrears are part of the story does not need to
          be part of the listing. The sale runs as a sale, not as a
          distress signal.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          At the first sign of strain, ideally before the second missed
          payment. Once arrears are in the lender&rsquo;s system, the
          window to sell on your terms narrows week by week, and so
          does the leverage in any conversation with the lender.
        </p>
        <p>
          Even if you decide not to sell, knowing what the clean sale
          looks like gives you real footing in the conversations you
          are about to have.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['power-of-sale', 'financial-pressure', 'time-sensitive-sales']} />
    </>
  )
}
