import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Time-Sensitive Sales" situation.
 *
 * Covers the four most common deadline-driven sales: a firm closing
 * date on the next home, an employer-driven relocation, a family or
 * health timeline that doesn't bend, and a financial deadline (a
 * bridge loan limit, a HELOC reset, a margin call).
 *
 * SEO target keywords (Ontario context):
 *   selling house with a deadline Ontario, selling house before
 *   closing on next home Ontario, relocation sale Ontario, selling
 *   house quickly without distress Ontario, time-sensitive home sale
 *   Ontario, bridge financing real estate Ontario
 *
 * Compliance posture:
 *   - No outcome guarantees, no "best price" claims
 *   - No "specialist" / "exclusive" language
 *   - "Quickly" framed against discipline, not desperation
 *   - Educational framing; brokerage attribution covered by BrokerageStrip
 *     and Footer; general-info disclaimer rendered in SituationPage shell
 */
export function TimeSensitiveSales() {
  return (
    <>
    <SituationPage
      eyebrow="Situations · Time-Sensitive Sales"
      title="Selling a Home Under a Deadline in Ontario."
      situationLabel="Time-sensitive sale"
      situationSlug="time-sensitive-sales"
      lead={
        <>
          A closing date on the next home. A job relocation. A family or
          health timeline that won&rsquo;t wait. Resolve represents Ontario
          homeowners through time-sensitive sales with discipline on what
          is actually achievable in the window available.
        </>
      }
    >
      <SituationBlock label="What it means" title="When time is the binding constraint.">
        <p>
          Time-sensitive sales are the files where the property is fine
          but the calendar is not. The four patterns we see most are a
          firm closing date on the next home, an employer-driven
          relocation with a hard report date, a family or health timeline
          that does not bend, and a financial deadline (a bridge loan
          limit, a HELOC reset, a margin call) where every week of delay
          has a price.
        </p>
        <p>
          The decisions that matter most in this kind of sale are the
          timing and the pacing rather than the price reduction. When to
          list relative to the deadline. Whether to use bridge financing
          or arrange a simultaneous closing. How to read the seasonality
          of the relevant micro-market. When to prepare the home and
          when to let it go as it is.
        </p>
        <p>
          The most common way money is left on the table in a
          time-sensitive sale is panic. Pushing for speed and exposure
          when the homeowner actually had more runway than they realised.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles time-sensitive files.">
        <p>
          <strong className="text-ink font-semibold">A real read on your timeline.</strong>{' '}
          Before anything is listed, we map the deadline, the actual
          flexibility around it, and the property&rsquo;s market position.
          Sometimes the right answer is to list now. Sometimes it is to
          spend a defined window on quiet preparation. The right answer
          is the one the file supports, not the one the deadline assumes.
        </p>
        <p>
          <strong className="text-ink font-semibold">Preparation runway worth using.</strong>{' '}
          Even when time is short, the highest-leverage work is often the
          preparation rather than the negotiation. Decluttering, targeted
          touch-ups, the right photography, and a launch calibrated to
          the property&rsquo;s segment all do more for value than dropping
          the price ever will.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination with the rest of your team.</strong>{' '}
          A time-sensitive sale is often a tax, financing, or planning
          event in addition to a real estate transaction. We coordinate
          with your accountant, financial advisor, mortgage broker, or
          estate planner where relevant, so the sale and the next chapter
          line up cleanly.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to start the conversation.">
        <p>
          Earlier than you would assume. The most common timing mistake
          in a time-sensitive sale is starting four weeks before the
          desired close date. Six to twelve weeks of runway, when
          available, almost always produces a better outcome than rushing
          for speed.
        </p>
        <p>
          The first conversation costs nothing and commits you to
          nothing. The point is to see the runway you actually have, and
          to make the move on your terms instead of under pressure.
        </p>
      </SituationBlock>

      <SituationBlock label="The financial intersection" title="When the sale becomes a planning event.">
        <p>
          Time-sensitive sales are often the moment a real estate
          transaction becomes a broader financial planning event. A few
          examples we see. Capital gains on a non-principal residence
          (the cottage, a rental property, a secondary home) need to be
          modelled before the sale, not after, because the after-tax
          proceeds drive the affordability of whatever comes next. A
          downsize that frees up equity can be paired with a registered
          account contribution, a tax deferral, or a structured gift to
          adult children, depending on the file. A retirement-adjacent
          sale can interact with OAS clawback thresholds, depending on
          how the proceeds are deployed.
        </p>
        <p>
          The principal residence exemption usually shelters the gain on
          a long-tenured family home, but the rules around designated
          years, changes of use (a basement rented out for a decade, a
          work-from-home claim that touched a depreciation calculation),
          and the timing of the sale relative to a property change of
          use can introduce wrinkles that matter. None of this is real
          estate advice. It is the reason we coordinate with your
          accountant or financial planner where one is in the picture.
        </p>
        <p>
          For relocation sales driven by an employer, we also flag the
          interaction with any employer-sponsored relocation program.
          Some employers reimburse closing costs, real estate
          commissions, or carrying costs during a transition window. The
          terms of that program often dictate timing constraints that
          have to be built into the listing plan.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'divorce-real-estate', 'mortgage-arrears']} />
    </>
  )
}
