import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Separation / Divorce" situation.
 *
 * Service-page register. Answers three questions in 30 seconds:
 *   1. Am I in the right place?           (Lead + Common situations)
 *   2. Do these people understand me?     (Lead + Common situations)
 *   3. What happens next?                 (Our role, Timing)
 *
 * SEO target keywords (Ontario context):
 *   divorce realtor Ontario, matrimonial home sale Ontario, selling
 *   matrimonial home, selling house during separation Ontario, separation
 *   real estate Ontario, neutral realtor separation Ontario
 *
 * Compliance posture (high care — family-law adjacency):
 *   - Real estate lane only; family law deferred to each party's lawyer
 *   - "Matrimonial home" used as a Family Law Act term where accurate
 *   - No relationship advice, no family-law commentary, no positioning of
 *     one party over the other
 *   - Multiple-representation discipline acknowledged (Resolve represents
 *     the sale, in coordination with both parties' lawyers, not one party
 *     against the other)
 *   - No outcome guarantees / no "best price" / "fast sale" language
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function DivorceRealEstate() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Separation or Divorce"
      title="Selling a Home During a Separation or Divorce in Ontario."
      situationLabel="Separation or divorce"
      situationSlug="divorce-real-estate"
      lead={
        <>
          Selling a home in the middle of a separation or divorce is rarely
          just a real estate transaction. Two sets of interests, two
          lawyers, and timelines nobody chose all have to be managed at
          once. Resolve represents the sale itself, neutrally and
          carefully, so the home moves cleanly while both parties hold on
          to as much of their position as the process allows.
        </>
      }
    >
      <SituationBlock label="What it means" title="What the matrimonial home means in Ontario.">
        <p>
          Under Ontario&rsquo;s Family Law Act, the matrimonial home is the
          property the couple ordinarily occupied at the time of
          separation. Both spouses generally have equal possessory rights,
          and selling it usually requires both consents in writing (or a
          court order substituting for that consent). The sale itself is a
          real estate transaction, but it interacts with the equalisation
          calculation and the broader separation agreement each
          party&rsquo;s lawyer is running. Our role is the sale and the
          property, in coordination with both real estate lawyers, not the
          broader separation.
        </p>
      </SituationBlock>

      <SituationBlock label="How it works" title="The timing trade-offs in a separation sale.">
        <p>
          Several decisions interact with each other and the right
          sequence is rarely obvious. Whether to list before the
          separation agreement is finalised or after. Whether to set the
          sale price by appraisal, mutual agreement, or open market.
          Whether the proceeds get held in trust pending the
          lawyers&rsquo; instructions, or distributed at closing under a
          pre-agreed split.
        </p>
        <p>
          Selling during separation versus selling after the divorce is
          finalised changes the dynamics. During separation, both spouses
          have to sign every document and either party can in theory
          slow the sale down. After finalisation, the property may be
          held by only one party, the sale is simpler operationally, but
          the equity has often already been counted in the equalisation
          calculation. Neither is universally better. Family lawyers
          generally have a view on which path works best for a particular
          file, and the sale strategy should follow that view rather than
          run ahead of it.
        </p>
        <p>
          The right time for the real estate conversation is once both
          lawyers have aligned on the broad plan, and before any showing
          or listing decision is made. Early enough that the calendar
          can be built properly rather than retrofit a rushed timeline.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Both parties agree the home will be sold but disagree on timing or price</li>
          <li>One party still living in the home</li>
          <li>Court-ordered sale</li>
          <li>Family law lawyers actively involved</li>
          <li>Children still in school in the area</li>
          <li>Equalisation payment depending on the sale proceeds</li>
          <li>Disagreement about list price, preparation, or strategy</li>
          <li>High-conflict file requiring documented neutral handling</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles separation files.">
        <p>
          <strong className="text-navy font-semibold">Neutral communication, on the record.</strong>{' '}
          We coordinate with both parties and both lawyers in writing, not
          just one. Every showing, offer, decision, and timeline is
          documented and shared with both sides at the same time. Nobody is
          surprised. Nobody is shut out.
        </p>
        <p>
          <strong className="text-navy font-semibold">A fair sale process, not a tilted one.</strong>{' '}
          Pricing, preparation, marketing, and showing decisions are made
          on the property&rsquo;s merits, not either party&rsquo;s
          preferences. The objective is the cleanest possible sale
          outcome.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordination with both lawyers through closing.</strong>{' '}
          Both lawyers usually want offer terms and closing instructions
          reviewed before they are accepted. We build that into the
          timeline rather than fighting it.
        </p>
        <p>
          <strong className="text-navy font-semibold">Discretion in the listing itself.</strong>{' '}
          The fact that a separation is the reason for the sale does not
          need to be part of how the property is presented to buyers. The
          sale runs as a sale, not as a signal.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          Ideally when both parties have at least agreed in principle that
          the home will be sold, and before any formal listing decision is
          made. The earlier we are involved, the smoother the process is
          for everyone, and the less likely an early misstep becomes a
          friction point later.
        </p>
        <p>
          If you are the only party who has decided yet, a first
          conversation can still be useful for understanding what the
          process will look like. The sale itself will not move forward
          until both parties&rsquo; consent is properly in place, but
          mapping the path out costs nothing and commits you to nothing.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'property-disputes', 'mortgage-arrears']} />
    </>
  )
}
