import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'

/**
 * Dedicated landing page for the "Estate / Probate" situation.
 *
 * SEO target keywords (Ontario context):
 *   estate sale realtor Ontario, executor selling home, selling deceased
 *   parent home Ontario, probate property sale, estate trustee selling home
 *
 * Compliance posture (high care — estate law adjacency):
 *   - Real estate lane only; probate / tax / estate law deferred to the
 *     estate lawyer in every section
 *   - Executor duties NOT explained (that is legal info)
 *   - No outcome guarantees, no "fast sale" / "best price" claims
 *   - "Move at the pace the estate allows" — no urgency theatre
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function EstateSale() {
  return (
    <SituationPage
      eyebrow="Situations · Estate or Probate"
      title="Selling a Home Through Estate or Probate in Ontario."
      lead={
        <>
          Selling a loved one&rsquo;s home while administering an estate is
          rarely just a transaction. There are probate timelines to navigate,
          multiple beneficiaries to coordinate, and the weight of the loss
          carried through every conversation along the way. Resolve represents
          executors and estate trustees in Ontario through the sale: at the
          pace the estate allows, in coordination with the estate lawyer, and
          handled with the care the situation calls for.
        </>
      }
    >
      <SituationBlock label="What it involves" title="What an estate sale actually looks like.">
        <p>
          An estate sale is the sale of a property as part of administering a
          deceased person&rsquo;s estate, usually led by an executor (called an
          estate trustee in Ontario), and often after probate has been granted
          by the Ontario Superior Court of Justice. Some sales can proceed
          before probate is granted, depending on the will and the
          property&rsquo;s ownership structure. Others have to wait. The
          estate lawyer makes that call, not us.
        </p>
        <p>
          The sale itself involves the usual real estate steps, prep, listing,
          showings, offers, negotiation, closing, but layered with
          estate-specific considerations. Beneficiaries may need to be kept
          informed. The will may direct how the sale is handled. The proceeds
          flow into the estate, not directly to anyone. Timing is often driven
          by tax filings, beneficiary needs, and probate progress rather than
          market timing.
        </p>
        <p>
          Done well, an estate sale closes cleanly without forcing the family
          through unnecessary stress at an already difficult time. Done
          poorly, it adds friction and second-guessing that nobody needed.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve helps through an estate sale.">
        <p>
          <strong className="text-ink font-semibold">A first conversation that respects the moment.</strong>{' '}
          We listen, look at the file, and help you see what is realistic
          given the probate stage, the property&rsquo;s condition, the
          beneficiaries&rsquo; positions, and the market. No pressure to list,
          ever. Many conversations stay private and never move further.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination with the estate lawyer.</strong>{' '}
          Estate sales touch legal, tax, and real estate timelines all at
          once. We work alongside the estate lawyer so the sale moves at the
          pace the estate allows. The legal work stays with legal counsel.
          The real estate work stays with us. Neither runs ahead of the
          other.
        </p>
        <p>
          <strong className="text-ink font-semibold">Quiet, careful sale execution.</strong>{' '}
          Properly priced, properly prepared, sold with patience. Where
          multiple beneficiaries are involved, we communicate clearly so
          everyone sees the same picture at the same time. The goal is a
          clean closing the family can look back on without regret.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to reach out.">
        <p>
          When you are ready, not before. Some executors call as soon as they
          receive their grant of probate. Others wait months while they
          settle the rest of the estate first. Either is fine.
        </p>
        <p>
          A first conversation costs nothing, commits you to nothing, and
          gives you a clear picture of what the sale will involve when you
          are ready to move. If the estate is not yet at the point where a
          sale can proceed, we will tell you so and stay out of the way until
          the lawyer says otherwise.
        </p>
      </SituationBlock>
    </SituationPage>
  )
}
