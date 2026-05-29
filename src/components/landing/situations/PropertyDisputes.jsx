import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Property Disputes" situation.
 *
 * SEO target keywords (Ontario context):
 *   property dispute Ontario, co-owner dispute selling, partition sale Ontario,
 *   selling jointly owned property dispute, title cloud sale Ontario
 *
 * Compliance posture (HIGHEST care — legal adjacency on every page area):
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
          friction, a partition matter, a boundary or easement question, a
          lien, a tenancy in common with three signatures needed where you
          only have two. The sale can still happen, but it has to be handled
          with the dispute kept in mind and the legal questions kept with the
          lawyer. Resolve represents the real estate side of these sales, in
          close coordination with your real estate lawyer.
        </>
      }
    >
      <SituationBlock label="What it covers" title="What kinds of property disputes this involves.">
        <p>
          Property and co-ownership disputes come in many shapes in Ontario.
          The most common we see: two or more joint owners who disagree on
          whether or how to sell. Estates with multiple beneficiaries and no
          clear majority view. Partition or sale applications where a
          co-owner is pursuing a court-ordered sale. Title clouds (liens,
          easements, encroachments, undisclosed interests) that need
          addressing before a buyer will close. Boundary or tenant questions
          that affect what the property actually is.
        </p>
        <p>
          Each of these has a real estate dimension (what the property is,
          how it will sell, what buyers will pay) and a legal dimension (what
          consents are needed, what orders apply, how proceeds are
          distributed). Both have to be handled, but by different people.
          Resolve handles the real estate. Your real estate lawyer handles
          the legal.
        </p>
        <p>
          Many disputes look more intractable than they are. Done in the
          right order, legal questions settled first, then a properly run
          sale, most close cleanly. Done in the wrong order, or with the
          real estate work running ahead of the legal work, they stall.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve helps in a property dispute.">
        <p>
          <strong className="text-ink font-semibold">A first conversation with your lawyer looped in early.</strong>{' '}
          Property dispute sales work best when the real estate professional
          and the lawyer are talking from day one. We can join a call with
          your lawyer, review what needs to happen legally before any
          listing, and map out a sequence that works.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination, not advocacy.</strong>{' '}
          Where multiple owners or claimants are involved, we coordinate the
          sale itself across all parties in writing, the same way we do for
          separating spouses. Every decision is documented and shared. No
          party feels shut out or surprised by what is happening with the
          property.
        </p>
        <p>
          <strong className="text-ink font-semibold">A clean sale, ready to close.</strong>{' '}
          When the title issues are addressed and the legal authorisations
          are in place, the sale itself should be straightforward. We
          position, list, and run the property properly, then close cleanly
          so the proceeds can be distributed according to your
          lawyer&rsquo;s instructions.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to reach out.">
        <p>
          Early, even before you know whether selling is the right path.
          Often a brief joint conversation with your lawyer and us is the
          fastest way to map what is possible, in what order, and on what
          timeline.
        </p>
        <p>
          The first call costs nothing and commits you to nothing. If
          selling is not the right path, or not the right path yet, we will
          say so and stay out of the way until the legal situation is in a
          place where a sale makes sense.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'divorce-real-estate', 'mortgage-arrears']} />
    </>
  )
}
