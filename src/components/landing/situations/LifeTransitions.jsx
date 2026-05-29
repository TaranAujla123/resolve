import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Life Transitions" situation.
 *
 * Covers the four most common life-transition sales: corporate relocation,
 * health-driven downsizing, retirement and rightsizing, and family-driven
 * moves (caregiving for parents, blended family relocations, etc.).
 *
 * SEO target keywords (Ontario context):
 *   downsizing Ontario, selling house for retirement Ontario,
 *   selling house due to health Ontario, relocation sale Ontario,
 *   selling a long-tenured home Ontario, life transition real estate
 *
 * Compliance posture:
 *   - No outcome guarantees, no "best price" claims
 *   - No "specialist" / "exclusive" language
 *   - Educational framing; brokerage attribution covered by BrokerageStrip
 *     and Footer; general-info disclaimer rendered in SituationPage shell
 */
export function LifeTransitions() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Life Transitions"
      title="Selling a Home Through a Life Transition in Ontario."
      lead={
        <>
          A job move, a health change, a downsizing, a retirement. The right
          sale runs on your timeline, not under pressure. Resolve represents
          Ontario homeowners through life-transition sales with the patience
          and pacing the move actually allows.
        </>
      }
    >
      <SituationBlock label="What it means" title="What a life-transition sale actually looks like.">
        <p>
          Life-transition sales are the files where the property is fine but
          life has shifted. The four most common patterns are corporate
          relocation, health-driven downsizing, retirement and rightsizing, and
          family-driven moves (caregiving for a parent, blended families, an
          adult child returning home, a household becoming smaller). Each one
          has its own timeline. None of them benefit from a rushed listing.
        </p>
        <p>
          The decisions that matter most in this kind of sale tend to be timing
          and pacing rather than price reduction. When to list relative to the
          move date. Whether to use bridge financing or arrange a simultaneous
          closing. How to read the seasonality of the relevant micro-market.
          When to prepare the home and when to let it go as it is.
        </p>
        <p>
          The most common way money is left on the table in a life-transition
          sale is not in negotiation. It is in pushing for speed and exposure
          when the homeowner actually had more runway than they realised.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles life-transition files.">
        <p>
          <strong className="text-ink font-semibold">A real read on your timeline.</strong>{' '}
          Before anything is listed, we map the move date, the actual flexibility
          around it, and the property&rsquo;s market position. Sometimes the
          right answer is to list now. Sometimes it is to spend six weeks on
          quiet preparation. The right answer is the one the file supports, not
          the one a calendar assumes.
        </p>
        <p>
          <strong className="text-ink font-semibold">Preparation runway worth using.</strong>{' '}
          When a long-tenured family home is being sold, the highest-leverage
          work is often the preparation, not the negotiation. Decluttering,
          targeted touch-ups, the right photography, and a launch calibrated to
          the property&rsquo;s segment all do more for value than dropping the
          price ever will.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination with the rest of your team.</strong>{' '}
          A life-transition sale is often a tax or financial planning event in
          addition to a real estate transaction. We coordinate with your
          accountant, financial advisor, or estate planner where relevant, so
          the sale and the next chapter line up cleanly.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to start the conversation.">
        <p>
          Earlier than you would assume. The most common timing mistake in a
          life-transition sale is starting four weeks before the desired close
          date. Six to twelve weeks of runway, when available, almost always
          produces a better outcome than rushing for speed.
        </p>
        <p>
          The first conversation costs nothing and commits you to nothing. The
          point is to see the runway you actually have, and to make the move on
          your terms instead of under pressure.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'divorce-real-estate', 'mortgage-arrears']} />
    </>
  )
}
