import React from 'react'
import { SituationPage, SituationBlock } from './SituationPage'

/**
 * Dedicated landing page for the "Power of Sale" situation.
 *
 * SEO target keywords (Ontario context):
 *   power of sale Ontario, power of sale realtor, power of sale process Ontario,
 *   selling home power of sale, what is power of sale Ontario, mortgages act
 *   redemption period
 *
 * Compliance posture:
 *   - Educational framing, no "stop power of sale" / "save your home" claims
 *   - No outcome guarantees, no specialist / exclusive / best language
 *   - Past-tense any legal-practice reference (none used here)
 *   - General-info disclaimer rendered in SituationPage shell
 */
export function PowerOfSale() {
  return (
    <SituationPage
      eyebrow="Situations · Power of Sale"
      title="Selling a home facing power of sale in Ontario."
      lead={
        <>
          If your lender has started a power of sale, the clock is running but
          the situation is not hopeless. The home still has equity, the equity
          is still yours, and the way it gets handled in the next few weeks
          will decide how much of it you keep. Resolve represents Ontario
          homeowners through power of sale: quietly, quickly, and with that
          equity protected at the centre of every decision through to closing.
        </>
      }
    >
      <SituationBlock label="What it means" title="What power of sale actually is in Ontario.">
        <p>
          Power of sale is the legal process by which a lender in Ontario,
          after a borrower has fallen into mortgage default, sells the property
          to recover what is owed. Unlike foreclosure, the lender does not take
          title to the home. They sell it, recover the mortgage balance plus
          legal and selling costs, and any surplus is returned to the
          homeowner. That surplus is the equity worth protecting.
        </p>
        <p>
          The process unfolds in stages. A Notice of Sale is issued, a
          redemption period runs (usually 35 to 45 days under section 32 of the
          Mortgages Act in Ontario), and if the loan is not brought current or
          paid out by the end of that period, the lender takes control of the
          sale. The homeowner can still sell during the redemption period, and
          often well past it depending on lender cooperation. That window is
          where the most important work gets done.
        </p>
        <p>
          Power of sale does not have to mean a forced auction or a
          lender-driven price. Most homeowners have more options than they
          realize, and the path that protects the most equity is usually the
          one taken early.
        </p>
      </SituationBlock>

      <SituationBlock label="Our role" title="How Resolve helps in a power of sale.">
        <p>
          <strong className="text-ink font-semibold">A private, no-obligation conversation first.</strong>{' '}
          We listen, look at the file, and tell you what is realistic given
          your equity, your timeline, and your lender. If selling is not the
          right path, we will say so. Nothing is listed, posted, or shared
          unless you decide to move forward.
        </p>
        <p>
          <strong className="text-ink font-semibold">Coordination with your lawyer and lender.</strong>{' '}
          Power of sale touches legal, financial, and real estate timelines all
          at once. We work alongside your real estate lawyer and stay in
          regular contact with the lender so the sale moves cleanly on a
          defensible timeline, not a panicked one.
        </p>
        <p>
          <strong className="text-ink font-semibold">Quiet, equity-first sale strategy.</strong>{' '}
          The property is positioned, priced, and prepared properly. We do not
          race a listing onto a desperation discount. We run it as a real sale,
          with the goal of preserving as much of your equity as the timeline
          allows. Full MLS exposure remains available, and where you choose, we
          can also bring qualified buyers from our own network.
        </p>
      </SituationBlock>

      <SituationBlock label="Timing" title="When to reach out.">
        <p>
          Earlier is easier. The further into the redemption period you are,
          the fewer options remain and the harder it becomes to influence the
          sale&rsquo;s outcome. If you have just received a Notice of Sale, or
          even just a default letter from your lender, this is the right time
          for a conversation.
        </p>
        <p>
          It costs nothing, it commits you to nothing, and it gives you a clear
          read on what is realistic. The point is to take back some control of
          the timeline before the lender takes it instead.
        </p>
      </SituationBlock>
    </SituationPage>
  )
}
