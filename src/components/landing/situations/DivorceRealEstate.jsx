import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Separation / Divorce" situation.
 *
 * SEO target keywords (Ontario context):
 *   divorce realtor Ontario, matrimonial home sale, selling matrimonial home,
 *   selling house during separation, separation real estate Ontario,
 *   selling home divorce Ontario
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
      lead={
        <>
          Selling a home in the middle of a separation or divorce is rarely
          just a real estate transaction. Two sets of interests, often raw
          emotions, and hard timelines all have to be managed at once, usually
          under the supervision of two different lawyers and on a schedule
          nobody chose. Resolve represents the sale itself, neutrally and
          carefully, so the home moves cleanly while both parties hold on to
          as much of their position as the process allows.
        </>
      }
    >
      <SituationBlock label="What it involves" title="What the matrimonial home means in Ontario.">
        <p>
          Under Ontario&rsquo;s Family Law Act, the matrimonial home is the
          property the couple ordinarily occupied at the time of separation.
          It carries special protections: both spouses generally have equal
          possessory rights regardless of whose name is on title, and the
          sale or mortgaging of a matrimonial home usually requires both
          spouses&rsquo; consent or a court order. That is the legal context.
          The practical reality is more delicate.
        </p>
        <p>
          In most separating households, the home is the single largest
          shared asset, the most emotionally charged, and the asset both
          lawyers are watching most closely. How the sale gets handled
          affects equalization calculations, support negotiations, and how
          the rest of the separation feels for both parties. A sale handled
          cleanly removes one of the biggest pressure points. A sale handled
          poorly becomes a recurring grievance.
        </p>
        <p>
          Resolve&rsquo;s role is the sale itself, in coordination with both
          parties&rsquo; real estate lawyers. We do not take sides on
          family-law questions and we do not make recommendations that should
          come from your lawyer.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve helps through a separation sale.">
        <p>
          <strong className="text-ink font-semibold">Neutral communication, on the record.</strong>{' '}
          We coordinate with both parties and both lawyers in writing, not
          just one. Every showing, offer, decision, and timeline is
          documented and shared with both sides at the same time. Nobody is
          surprised. Nobody is shut out.
        </p>
        <p>
          <strong className="text-ink font-semibold">A fair sale process, not a tilted one.</strong>{' '}
          Pricing, preparation, marketing, and showing decisions are made on
          the property&rsquo;s merits, not either party&rsquo;s preferences.
          The objective is the cleanest possible sale outcome, which is
          usually also the best foundation for the equalization that follows.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination with both lawyers through closing.</strong>{' '}
          Both lawyers usually want offer terms and closing instructions
          reviewed before they are accepted. We build that into the timeline
          rather than fighting it. The sale closes cleanly, the proceeds flow
          according to the lawyers&rsquo; instructions, and the home stops
          being a pressure point in the separation.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to reach out.">
        <p>
          Ideally when both parties have at least agreed in principle that
          the home will be sold, and before any formal listing decision is
          made. The earlier we are involved, the smoother the process is for
          everyone, and the less likely an early misstep becomes a friction
          point later.
        </p>
        <p>
          If you are the only party who has decided yet, a first conversation
          can still be useful for understanding what the process will look
          like. The sale itself will not move forward until both
          parties&rsquo; consent is properly in place, but mapping the path
          out costs nothing and commits you to nothing.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'property-disputes', 'mortgage-arrears']} />
    </>
  )
}
