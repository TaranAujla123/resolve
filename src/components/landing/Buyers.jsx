import React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  AlertTriangle,
  ClipboardList,
  Search,
  Eye,
  Phone,
  ArrowRight,
  Check,
} from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'

/**
 * /buyers — the V3.5 "For Buyers" page.
 *
 * Rebuilt July 2026 from the old "motivated-seller inventory" framing
 * to a VALUE-ADD spine: we read properties for the value the marketing
 * missed and the risks the photos hid, across the whole market. This
 * de-couples the buyer pitch from seller distress (which undercut the
 * seller-side "equity first" promise) and expands the market from a
 * narrow distressed pool to every under-marketed listing.
 *
 * Firewall: this page is reachable from the FOOTER + direct buyer
 * links, not the seller nav. Informational / organic-SEO page; the
 * conversion form lives on /get-deals (paid landing). All CTAs here
 * point to /get-deals so there is one form to maintain.
 *
 * Compliance spine (do not soften):
 *   - Sellers always retain full MLS exposure. No "insider access".
 *   - Value language hedged ("could become", "worth paying for"); no
 *     guaranteed returns or ARV.
 *   - Multiple representation, where it applies, is disclosed and
 *     consented to in writing by both parties before any showing.
 *   - Motivated-seller reality is acknowledged only as the buyer
 *     PROVIDING certainty to a seller who needs it (win-win, disclosed),
 *     never as a bargain off a distressed seller.
 *   - Specialized steps (legal, zoning, financing) are framed as "we
 *     coordinate the right professional", not advice Resolve gives.
 *   - Voice: calm, confident, no em dashes, no exclamations.
 */

const UPSIDE = [
  'Income units, small multiplexes, and rental upside',
  'Lots that fit a garden or laneway suite',
  'Basements and spaces that could be legalized',
  'Homes priced low because they were marketed wrong',
]

const RISKS = [
  'Units that were never legally permitted',
  'Deferred work that fails an appraisal or inspection',
  'Zoning or use limits that quietly kill the plan',
  'Title or timing issues that surface at closing',
]

const STEPS = [
  {
    num: '01',
    Icon: ClipboardList,
    title: 'Tell us what you want',
    body:
      'You already know the area and the home you are after. Tell us that, plus what you would do with any upside: income, a suite, a hold, or a rebuild.',
  },
  {
    num: '02',
    Icon: Search,
    title: 'We read them against your needs',
    body:
      'For each listing you are weighing, the opportunities and the costs most agents miss, laid out side by side and measured against what matters to you.',
  },
  {
    num: '03',
    Icon: Eye,
    title: 'You weigh it and decide',
    body:
      'The trade-off is yours to make, with the full picture in front of you. Disclosed representation throughout. Pass on what does not fit, and we keep looking.',
  },
]

const ANSWERS = [
  {
    q: 'Is this insider access?',
    a: 'No. Sellers always keep full MLS exposure. The value comes from reading a property well and matching it to you, not from anyone being disadvantaged or from skipping the market.',
  },
  {
    q: 'Does it cost anything to join?',
    a: 'No. There is no fee to join or to receive matches. Buy-side representation is agreed in writing at the point we act for you on a specific file.',
  },
  {
    q: 'What if Resolve also represents the seller?',
    a: 'Multiple representation, where it applies, is disclosed and consented to in writing by both parties before any showing. Either party may choose a different brokerage instead, and we support that.',
  },
  {
    q: 'How often will I hear from you?',
    a: 'Only when something genuinely fits your brief. Some months that is nothing. Some months it is more than one. Update your criteria any time and the matching updates with it.',
  },
]

export function Buyers() {
  return (
    <>
      {/* HERO — navy. No data-surface so the sticky header renders solid
          (this hero does not tuck under it), keeping nav text readable. */}
      <section className="bg-navy section-y">
        <div className="container max-w-4xl">
          <Eyebrow>For Buyers · Ontario</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-stone text-display-xl leading-[1.08]">
            Most agents send you the listing. We show you{' '}
            <span className="italic text-bronze">what it could become.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-stone/80">
            We read properties for the potential most buyers walk past, on and
            off market. Homes to live in, and income properties to hold. Not
            turnkey. Not for everyone. For buyers who look past the price to
            what a property could become.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button as={Link} to="/get-deals" variant="primary" size="md">
              Join the buyer network
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="tel:+13656457332"
              variant="outline"
              size="md"
              className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
              (365) 645-7332
            </Button>
          </div>
        </div>
      </section>

      {/* THE WORK — upside + risk, the value-add spine */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container max-w-4xl">
          <Eyebrow>The work</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            Anyone can forward a listing.{' '}
            <span className="italic text-bronze">We read it.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-navy-soft">
            You already know the area and the home you want. The harder part,
            and what actually makes you money, is reading each listing against
            your needs: the potential the marketing missed, and the problems
            the photos hid. You get both sides in a clear written read, the
            opportunities and the costs most agents skip, side by side, so you
            can weigh the trade-off and decide.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-bronze/40 bg-white p-7 shadow-card">
              <div className="flex items-center gap-2 text-bronze">
                <TrendingUp className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  The upside we look for
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {UPSIDE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-navy leading-snug">
                    <Check className="h-4 w-4 text-bronze shrink-0 mt-0.5" strokeWidth={2.2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-divider bg-white p-7 shadow-card">
              <div className="flex items-center gap-2 text-navy">
                <AlertTriangle className="h-4 w-4 text-navy-mute" strokeWidth={1.9} aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-mute">
                  The risks we flag early
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {RISKS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-navy-soft leading-snug">
                    <span className="text-navy-mute mt-1.5 leading-none" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-[14px] text-navy-mute leading-relaxed">
            Where a step needs a lawyer, a mortgage professional, or the city,
            we point you to the right person and coordinate the pieces. We read
            the file; the specialists confirm it.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-surface="mist" className="bg-mist section-y">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-md">
              Tell us. We read.{' '}
              <span className="italic text-bronze">You decide.</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {STEPS.map(({ num, Icon, title, body }) => (
              <div key={num} className="border-t border-divider pt-6">
                <div className="flex items-center gap-3">
                  <span className="font-display font-medium text-bronze text-[34px] leading-none">
                    {num}
                  </span>
                  <Icon className="h-5 w-5 text-bronze" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display font-medium text-navy text-[1.25rem] leading-snug">
                  {title}
                </h3>
                <p className="mt-2.5 text-[15px] text-navy-soft leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOTIVATED SELLERS, DONE RIGHT — certainty framing, disclosed */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container max-w-3xl">
          <Eyebrow>The honest part</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            Some of it comes from sellers who need to move.
          </h2>
          <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-navy-soft">
            <p>
              An estate, a relocation, a tight timeline. We do not hide that,
              and we do not treat it as a bargain hunt. A seller in that
              position usually values a clean, certain, on-time close over a
              long shot at top dollar months from now, and a buyer who can close
              cleanly delivers exactly that.
            </p>
            <p>
              Handled properly, both sides win: the seller gets certainty and a
              fair result, and you get a real opportunity on a home that may not
              be turnkey. Representation is always disclosed, and a seller&rsquo;s
              need for a fast, quiet close is something we serve, never something
              we exploit.
            </p>
          </div>
        </div>
      </section>

      {/* STRAIGHT ANSWERS */}
      <section data-surface="mist" className="bg-mist section-y">
        <div className="container max-w-3xl">
          <Eyebrow>Straight answers</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            Questions worth answering openly.
          </h2>
          <div className="mt-8 space-y-4">
            {ANSWERS.map((qa) => (
              <div key={qa.q} className="rounded-xl border border-divider bg-white p-6">
                <p className="font-display font-medium text-navy text-[1.05rem] leading-snug">
                  {qa.q}
                </p>
                <p className="mt-2 text-[15px] text-navy-soft leading-relaxed">
                  {qa.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section data-surface="navy" className="bg-navy section-y">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display font-medium text-stone text-display-md leading-[1.1]">
            Tell us what you are after.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-stone/80">
            When something fits your brief, you hear it with the full read: the
            upside, what it would take, and what to watch for.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/get-deals" variant="primary" size="lg">
              Join the buyer network
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-10 text-[12px] leading-relaxed text-stone/55">
            Real estate services by Resolve, delivered through HomeLife G1
            Realty Inc., Brokerage. Independently Owned &amp; Operated. RECO
            Reg. No. 6024721.
          </p>
        </div>
      </section>
    </>
  )
}
