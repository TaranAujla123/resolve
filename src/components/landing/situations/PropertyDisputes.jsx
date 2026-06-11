import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Property Disputes" situation.
 *
 * Service-page register. Answers three questions in 30 seconds:
 *   1. Am I in the right place?           (Lead + Common situations)
 *   2. Do these people understand me?     (Lead + Common situations)
 *   3. What happens next?                 (Our role, Timing)
 *
 * SEO target keywords (Ontario context):
 *   property dispute Ontario, co-owner dispute selling, partition sale
 *   Ontario, selling jointly owned property dispute, title cloud sale
 *   Ontario, lien on title selling Ontario
 *
 * Compliance posture (HIGHEST care — legal adjacency on every section):
 *   - "Real estate lane only" is enforced especially strictly here
 *   - Partition order process / title cure mechanics / lien resolution
 *     are NOT described (those are legal matters)
 *   - "Coordinate with your real estate lawyer" framing repeated where
 *     legal questions could arise
 *   - No outcome guarantees, no "we'll resolve the dispute" claims
 *   - Resolve does not give legal strategy advice or pick sides between
 *     co-owners; we handle the real estate work only
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function PropertyDisputes() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Property Disputes"
      title="Selling a Home Through a Property Dispute in Ontario."
      situationLabel="Property dispute"
      situationSlug="property-disputes"
      lead={
        <>
          Anything clouding title makes a clean sale harder. Co-ownership
          friction, a partition matter, a boundary or easement question,
          a lien, a tenancy in common with three signatures needed
          where you only have two. The sale can still happen, on your
          terms, with the dispute kept in mind and the legal questions
          kept with the lawyer. Resolve lists and sells the property
          itself, in close coordination with your real estate lawyer.
        </>
      }
    >
      <SituationBlock label="What it means" title="What kinds of disputes this covers.">
        <p>
          Property and co-ownership disputes come in many shapes in
          Ontario: joint owners who disagree on whether or how to sell,
          estates with multiple beneficiaries and no clear direction,
          partition or sale applications under Ontario&rsquo;s Partition
          Act, title clouds (construction or judgment liens, easements,
          encroachments), and boundary or tenancy questions affecting
          marketability. Each one has a real estate dimension and a legal
          dimension. Both have to be handled, but by different people.
          Resolve handles the real estate. Your real estate lawyer handles
          the legal.
        </p>
      </SituationBlock>

      <SituationBlock label="How it works" title="A lien on title is not a bar to selling.">
        <p>
          A lien on title is not a bar to listing or selling the
          property. It is a claim that has to be dealt with before a
          buyer&rsquo;s lawyer will release the closing funds. In
          practice that means the lien gets discharged out of the sale
          proceeds at closing, with the seller&rsquo;s lawyer holding the
          relevant amount in trust until the discharge is registered.
        </p>
        <p>
          Construction liens, judgment liens, and Canada Revenue Agency
          liens each follow slightly different mechanics, but the common
          element is that the closing math has to account for them
          before anyone signs. Buyers and their lawyers are usually
          willing to close on a property with a disclosed lien, provided
          the math is clean and the discharge is procedurally certain.
        </p>
        <p>
          What tanks deals is incomplete disclosure, late discoveries,
          or unrealistic estimates of the discharge amount. The same
          logic applies, in different forms, to partition orders, condo
          board disputes, easement enforcements, and most other title
          clouds. The legal mechanics are not our lane. The closing
          logistics that get the property properly sold around them are.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Co-owners want to sell but cannot agree on price or timing</li>
          <li>A partition or sale application is pending or being considered</li>
          <li>Construction lien, judgment lien, or CRA lien on title</li>
          <li>Boundary, easement, or encroachment question affecting the file</li>
          <li>Multiple beneficiaries with no clear majority view</li>
          <li>Tenant refusing to leave or cooperate with showings</li>
          <li>A title cloud that has not yet been quantified</li>
          <li>Litigation pending that touches the property</li>
        </ul>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles property dispute files.">
        <p>
          <strong className="text-navy font-semibold">A first conversation with your lawyer looped in early.</strong>{' '}
          Property dispute sales work best when the real estate
          practice and the lawyer are talking from day one. We can join
          a call with your lawyer, confirm what needs to happen
          legally before any listing, and map a sale sequence that
          works on your timeline.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordination, not advocacy.</strong>{' '}
          Where multiple owners or claimants are involved, we coordinate
          the sale itself across all parties in writing. Every decision is
          documented and shared. No party feels shut out or surprised by
          what is happening with the property.
        </p>
        <p>
          <strong className="text-navy font-semibold">Real estate lane only.</strong>{' '}
          Legal mechanics, partition orders, title cure, lien negotiation,
          are not our lane. The closing logistics that get the property
          properly sold around them are.
        </p>
        <p>
          <strong className="text-navy font-semibold">A clean sale, ready to close.</strong>{' '}
          When the title issues are addressed and the legal
          authorisations are in place, the sale itself should be
          straightforward. We position, list, market, and close the
          property properly so the proceeds can be distributed
          according to your lawyer&rsquo;s instructions.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          Early, even before you know whether selling is the right path.
          Often a brief joint conversation with your lawyer and us is the
          fastest way to map what is possible, in what order, and on what
          timeline.
        </p>
        <p>
          The first call costs nothing and commits you to nothing. If
          selling is not the right path yet, we will say so and stay
          out of the way until the legal situation is in a place where
          a sale makes sense.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'divorce-real-estate', 'mortgage-arrears']} />
    </>
  )
}
