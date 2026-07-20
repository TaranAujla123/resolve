import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'
import { RelatedSituations } from './RelatedSituations'

/**
 * Dedicated landing page for the "Time-Sensitive Sales" situation.
 *
 * A service page, not an article. The three things a homeowner on a
 * deadline needs to answer in the first 30 seconds are:
 *   1. Am I in the right place?
 *   2. Do these people understand my situation?
 *   3. What happens next?
 *
 * Every block on the page supports one of those three. The Common
 * Situations list answers (1) and (2) immediately. The Our role
 * block answers (3). The Timing block lowers the cost of the first
 * step.
 *
 * SEO target keywords (Ontario context):
 *   selling house with a deadline Ontario, selling house before
 *   closing on next home Ontario, relocation sale Ontario, selling
 *   house quickly without distress Ontario, time-sensitive sale
 *   Ontario, bridge financing real estate Ontario
 *
 * Compliance posture (RECO Bulletin 5.3):
 *   - "Decisions within the time available" frames discipline as
 *     posture, not as an outcome guarantee.
 *   - "Certainty matters too" describes a trade-off, not a promise
 *     of closing on a specific price or date.
 *   - No "specialist" / "exclusive" / "best price" language.
 *   - Brokerage attribution covered by BrokerageStrip + Footer; a
 *     general-info disclaimer is rendered by the SituationPage shell.
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
          A time-sensitive sale is any situation where the timeline
          matters as much as the property itself. Estate and probate
          sales, court-deadline closings, a firm closing date on the
          next home, a relocation, a health or family timeline. The
          goal is not simply to sell quickly. The goal is to sell on
          your terms inside the time available.
        </>
      }
    >
      <SituationBlock label="What it means" title="When the timeline matters as much as the property.">
        <p>
          You may be relocating, purchasing another home, managing an
          estate, working through a family transition, or facing a
          financial deadline that requires a sale within a defined
          period.
        </p>
        <p>
          In each of these, the goal is not simply to sell quickly. It
          is to run the right sale inside the time actually available.
        </p>
      </SituationBlock>

      <SituationBlock label="Common situations" title="Files we see most often.">
        <ul className="list-disc pl-5 space-y-2">
          <li>Estate and probate sales, with court deadlines and multiple beneficiaries</li>
          <li>A firm closing date on another property already purchased</li>
          <li>Relocating for work or a family move</li>
          <li>Court-ordered or court-deadline closings</li>
          <li>Financial deadlines or carrying costs the owner cannot continue to absorb</li>
          <li>Vacant properties that cannot sit indefinitely</li>
          <li>Health or lifestyle changes requiring a move on a defined schedule</li>
          <li>Situations where certainty of close matters more than waiting for the perfect buyer</li>
        </ul>
        <p className="text-[15px] text-navy-mute leading-relaxed pt-2">
          Estate and probate sales are a category of their own. Longer read on the mechanics, executor duties, and coordination with the estate lawyer on the{' '}
          <a href="/estate-sale/" className="text-bronze hover:text-bronze-deep underline underline-offset-2">Estate or Probate</a> page.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve handles time-sensitive files.">
        <p>
          <strong className="text-navy font-semibold">Map the real timeline.</strong>{' '}
          The first step is sorting out what flexibility actually
          exists. Many sellers have more room than they realise.
          Others have less. Either way, knowing the timeline early
          keeps the sale out of rushed decisions and unnecessary
          pressure.
        </p>
        <p>
          <strong className="text-navy font-semibold">Build the right sale strategy.</strong>{' '}
          Every property and timeline are different. Sometimes the
          best move is immediate market exposure. Sometimes a short
          preparation period nets you materially more. The strategy
          should follow the facts of your sale, not the assumptions
          a calendar makes.
        </p>
        <p>
          <strong className="text-navy font-semibold">Coordinate the moving parts.</strong>{' '}
          Time-sensitive sales often involve lenders, lawyers,
          accountants, family members, executors, mortgage brokers,
          or financial advisors. We keep the sale moving so deadlines
          do not become problems.
        </p>
        <p>
          <strong className="text-navy font-semibold">Focus on certainty.</strong>{' '}
          Speed matters. Certainty matters too. A sale that closes is
          worth more than a higher offer that never reaches
          completion.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="Why sellers contact Resolve early.">
        <p>
          The most common mistake we see is waiting until the deadline
          feels urgent. Even a few additional weeks can create more
          options, stronger buyer interest, and a better outcome.
        </p>
        <p>
          An early conversation lays out what the sale can look like,
          what the risks are, and what strategy fits your timeline. It
          costs nothing and commits you to nothing.
        </p>
      </SituationBlock>
    </SituationPage>
    <RelatedSituations relatedSlugs={['estate-sale', 'power-of-sale', 'mortgage-arrears']} />
    </>
  )
}
