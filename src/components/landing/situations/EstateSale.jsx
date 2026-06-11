import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Estate / Probate" situation.
 *
 * Service-page register. Answers three questions in 30 seconds:
 *   1. Am I in the right place?           (Lead + Common situations)
 *   2. Do these people understand me?     (Lead + Common situations)
 *   3. What happens next?                 (Our role, Timing)
 *
 * SEO target keywords (Ontario context):
 *   estate sale realtor Ontario, executor selling home Ontario, selling
 *   deceased parent home Ontario, probate property sale, estate trustee
 *   selling home Ontario
 *
 * Compliance posture (high care — estate law adjacency):
 *   - Real estate lane only; probate / tax / estate law deferred to the
 *     estate lawyer in every section
 *   - Executor / estate trustee duties NOT explained (that is legal info)
 *   - No outcome guarantees, no "fast sale" / "best price" claims
 *   - "Move at the pace the estate allows" — no urgency theatre
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function EstateSale() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Estate or Probate"
      title="Selling a Home Through Estate or Probate in Ontario."
      situationLabel="Estate or probate"
      situationSlug="estate-sale"
      lead={
        <>
          Selling a loved one&rsquo;s home while administering an estate
          is rarely just a transaction. There are probate timelines to
          navigate, beneficiaries to coordinate, and the weight of the
          loss carried through every conversation. Resolve lists and
          sells for executors and estate trustees in Ontario: at the
          pace the estate allows, in coordination with the estate
          lawyer, and handled with the care the situation calls for.
        </>
      }
    >
      <SituationBlock label="What it means" title="What an estate sale actually involves.">
        <p>
          An estate sale is the sale of a property as part of administering
          a deceased person&rsquo;s estate, usually led by an executor
          (called an estate trustee in Ontario). Some sales can proceed
          before probate is granted, depending on title and the will;
          others have to wait. The estate lawyer makes that call. Once the
          sale is permitted, the real estate work looks ordinary on the
          surface but is layered with estate-specific considerations:
          beneficiaries to keep informed, contents to clear, deferred
          maintenance to weigh, and tax timing the lawyer or accountant
          will flag.
        </p>
      </SituationBlock>

      <SituationBlock label="How it works" title="What the will and the estate direct.">
        <p>
          The mechanics of an estate sale layer on top of the usual real
          estate process. The will may direct how the property is to be
          handled, including who has the right to buy it at fair market
          value before it goes to the open market. That right has to be
          honoured before any external listing decision is made.
        </p>
        <p>
          The proceeds of the sale flow into the estate, not directly to
          any beneficiary. Distribution follows the estate&rsquo;s
          administration by the estate trustee, under the estate
          lawyer&rsquo;s direction. Timing is often driven by tax
          filings, beneficiary needs, and probate progress rather than by
          where the market is on any given week.
        </p>
        <p>
          What this means in practice: pricing, preparation, and listing
          timing are coordinated with the estate lawyer and, where
          relevant, the estate&rsquo;s accountant. The sale moves when
          the file is ready, not before.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Probate granted, estate ready to sell</li>
          <li>Multiple beneficiaries with different views on price or timing</li>
          <li>A beneficiary who wants to buy the property</li>
          <li>Property contains decades of accumulated possessions</li>
          <li>Executor unfamiliar with the real estate process</li>
          <li>A sibling or other family member still living in the home</li>
          <li>Deferred maintenance and the question of repairing versus selling as-is</li>
          <li>Estate trustee facing pressure to wind up the estate</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles estate files.">
        <p>
          <strong className="text-navy font-semibold">A first conversation that respects the moment.</strong>{' '}
          We sit down, listen, and walk through what the sale would
          actually look like given the probate stage, the
          property&rsquo;s condition, and the beneficiaries&rsquo;
          positions. No pressure to list, ever.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordination with the estate lawyer.</strong>{' '}
          Estate sales touch legal, tax, and real estate timelines at once.
          We work alongside the estate lawyer so the sale moves at the pace
          the estate allows. The legal work stays with legal counsel.
        </p>
        <p>
          <strong className="text-navy font-semibold">Quiet, careful sale execution.</strong>{' '}
          Properly priced, properly prepared, sold with patience. Where
          multiple beneficiaries are involved, we communicate clearly so
          everyone sees the same picture at the same time.
        </p>
        <p>
          <strong className="text-navy font-semibold">Property prep without overwhelming the family.</strong>{' '}
          Clear-out coordination, photography, staging where it adds value,
          and showing logistics handled by us so the family is not absorbing
          all of it on top of everything else.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          When you are ready, not before. Some executors call as soon as
          they receive their grant of probate. Others wait months while
          they settle the rest of the estate first. Either is fine.
        </p>
        <p>
          A first conversation costs nothing, commits you to nothing,
          and lays out what the sale will involve when you are ready
          to move. If the estate is not yet at a point where a sale
          can proceed, we will say so and stay out of the way until
          the lawyer says otherwise.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['property-disputes', 'divorce-real-estate', 'time-sensitive-sales']} />
    </>
  )
}
