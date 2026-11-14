import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Check,
  Minus,
  FileSignature,
  Scale,
  Send,
  Gavel,
  Lock,
  KeyRound,
  Phone,
} from 'lucide-react'
import { Input, Textarea, Select, Label } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { FaqSection } from '@/components/brand/FaqSection'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ClosingCta } from '../home/ClosingCta'

/**
 * WorkingWithLendersPage — /working-with-lenders/ (13 Nov 2026, Taran).
 *
 * Replaces the parked /for-lenders page (unpublished 16 Oct because it
 * mapped out the strategy). Information, not process: what the lender
 * keeps, two paths side by side in general terms, commitments, and a
 * listing band. Never the steps, timing, letters, A&D
 * wording, offer-package format, pricing method, Schedule C,
 * calculators, weekly reports or any live file. The owner-led path is
 * the visually emphasized one. 13 Nov (Taran): listing band with one form
 * for owners AND lenders; he lists for lenders after possession, never
 * on a property where he acts for the owners.
 */

const KEEPS = [
  {
    Icon: Gavel,
    title: 'Its decision',
    body:
      'No sale closes without the lender’s written consent. Whether to consent to a discharge on the net proceeds is entirely the lender’s call.',
  },
  {
    Icon: Scale,
    title: 'Its rights',
    body:
      'The listing does not stop the lender’s enforcement steps. A discharge is not a release: any judgment stays in place for whatever remains owing.',
  },
  {
    Icon: KeyRound,
    title: 'Its own evidence',
    body:
      'The lender’s appraiser can see the property, and the lender can test the price against its own numbers.',
  },
]

// [label, owner-led, lender sale]
const PATHS = [
  [
    'The property',
    'The owners stay in it, keep it insured, heated and maintained, and make it available for showings.',
    'The lender takes possession, then secures, insures and maintains a vacant home.',
  ],
  [
    'Costs before the sale',
    'None to the lender for possession, security or management.',
    'Costs of possession, management and sale come out of the proceeds first.',
  ],
  [
    'How buyers see it',
    'An ordinary listing on MLS.',
    'A power of sale listing, which often draws buyers looking for a discount.',
  ],
  [
    'The price',
    'Supported by an independent appraisal and recent comparable sales, shared with the lender.',
    'Set from the lender’s own appraisal.',
  ],
  [
    'Timing',
    'Can be on the market as soon as the owners sign.',
    'Starts once possession is taken and the home is appraised and listed.',
  ],
  [
    'The lender’s control',
    'The lender decides whether to consent to the sale.',
    'The lender runs the sale.',
  ],
  ['Any balance', 'Remains owing.', 'Remains owing.'],
]

const COMMITMENTS = [
  {
    Icon: FileSignature,
    title: 'The owners’ written authority',
    body:
      'Before I contact a lender or its lawyers, the owners have signed an authorization allowing me to speak with you and to share the listing, the appraisal and every offer.',
  },
  {
    Icon: Scale,
    title: 'A price backed by evidence',
    body:
      'The list price is supported by an independent appraisal and by the sales a buyer would look at, and I share that evidence with you.',
  },
  {
    Icon: Send,
    title: 'Every offer, the day it arrives',
    body:
      'Each offer comes to you with its terms in full. The buyer’s personal details are withheld until there is a deal to close.',
  },
  {
    Icon: Gavel,
    title: 'Your decision, on your timeline',
    body: 'You consent, or you don’t. I don’t ask you to set aside your process.',
  },
  {
    Icon: Lock,
    title: 'Discretion',
    body: 'The terms of the file stay between the owners, the lender and counsel.',
  },
  {
    Icon: KeyRound,
    title: 'Access for your appraiser',
    body: 'When you ask, your appraiser sees the property.',
  },
]

function TwoPaths() {
  return (
    <section data-surface="cream" className="bg-cream section-y">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>Two Paths, Side by Side</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
            Before possession,{' '}
            <span className="italic text-bronze">or after it.</span>
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-navy-soft max-w-2xl">
            Neither path is right for every file. The point is that the lender
            gets to compare a real offer against its own alternative before it
            decides.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_1fr] lg:items-stretch">
          {/* Owner-led: emphasized */}
          <div className="relative rounded-[18px] bg-navy text-stone p-7 sm:p-9 shadow-[0_24px_60px_-28px_rgba(10,31,68,0.55)] ring-1 ring-bronze/60">
            <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-bronze px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
              Before possession
            </span>
            <h3 className="font-display font-medium text-[1.65rem] leading-snug text-stone">
              A sale by the owners
            </h3>
            <p className="mt-1.5 text-[16px] text-stone-soft">
              The home stays lived in, cared for and easy to show.
            </p>
            <dl className="mt-7 divide-y divide-stone/15">
              {PATHS.map(([label, owner]) => (
                <div key={label} className="py-4 grid grid-cols-[26px_1fr] gap-3">
                  <span className="mt-[2px] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-bronze text-navy">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-bronze">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[16.5px] leading-relaxed text-stone">{owner}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Lender sale: muted */}
          <div className="relative rounded-[18px] border border-divider bg-white/60 p-7 sm:p-9">
            <span className="absolute -top-3 left-7 inline-flex items-center rounded-full border border-divider bg-white px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-mute">
              After possession
            </span>
            <h3 className="font-display font-medium text-[1.45rem] leading-snug text-navy-soft">
              The lender’s own sale
            </h3>
            <p className="mt-1.5 text-[16px] text-navy-mute">
              The lender carries a vacant home until it sells.
            </p>
            <dl className="mt-7 divide-y divide-divider">
              {PATHS.map(([label, , lender]) => (
                <div key={label} className="py-4 grid grid-cols-[26px_1fr] gap-3">
                  <span className="mt-[2px] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-divider text-navy-mute">
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-mute">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[16px] leading-relaxed text-navy-mute">{lender}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const ROLES = [
  'Owner',
  'Lender or lender’s counsel',
  'Family member or advisor of the owner',
  'Other',
]

/* Listing band: one form for owners and lenders (13 Nov 2026). Same
 * Formspree endpoint and Meta Lead event as /contact. */
function ListWithUs() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get('phone') && !data.get('email')) {
      toast.error('Please share a phone number or email so I can reach you.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        const eventId = genEventId()
        const category = `Working With Lenders · ${(data.get('selling_as') || '').toString()}`
        trackLead({ content_category: category }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: {
            email: (data.get('email') || '').toString(),
            phone: (data.get('phone') || '').toString(),
          },
          custom_data: { situation: category },
        })
        navigate('/thanks')
      } else {
        toast.error('Something went wrong on our side. Please call (365) 645-7332 or try again shortly.')
      }
    } catch (err) {
      toast.error('Network issue. Please call (365) 645-7332 or try again shortly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="list"
      data-surface="navy"
      className="relative bg-navy overflow-hidden isolate section-y scroll-mt-24"
    >
      <HeroBackdrop />
      <div className="relative container grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14 items-start">
        <div className="lg:pt-2">
          <Eyebrow>List With Resolve</Eyebrow>
          <h2 className="mt-5 font-sans font-semibold text-stone leading-[1.15] tracking-[-0.01em] text-[clamp(1.8rem,3.4vw,2.6rem)]">
            A property to sell, with a mortgage in enforcement?
          </h2>
          <div className="mt-6 space-y-4 text-[16.5px] leading-[1.65] text-stone-soft max-w-md">
            <p>
              Owners can list with me before possession. Lenders can list with
              me after possession, under their power of sale. I never act for
              both on the same property.
            </p>
            <p>
              The work is the same either way: an independent appraisal, a price
              set from fair market value, an ordinary MLS listing, and every
              offer reported the day it arrives.
            </p>
          </div>
          <a
            href="tel:+13656457332"
            className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-bronze hover:text-stone transition-colors"
          >
            <Phone className="h-4 w-4" />
            Or call (365) 645-7332
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[18px] bg-stone border border-divider shadow-card p-6 sm:p-8"
        >
          <input type="hidden" name="_subject" value="Resolve · Listing inquiry (Working With Lenders)" />
          <input type="hidden" name="source_page" value="/working-with-lenders/" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Label htmlFor="wwl-role" required>I’m contacting you as</Label>
              <Select id="wwl-role" name="selling_as" defaultValue="" required>
                <option value="" disabled>Select one</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </Select>
            </div>
            <div>
              <Label htmlFor="wwl-name" required>Name</Label>
              <Input id="wwl-name" name="name" autoComplete="name" required />
            </div>
            <div>
              <Label htmlFor="wwl-company">Company or firm (if any)</Label>
              <Input id="wwl-company" name="company" autoComplete="organization" />
            </div>
            <div>
              <Label htmlFor="wwl-phone">Phone</Label>
              <Input id="wwl-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div>
              <Label htmlFor="wwl-email">Email</Label>
              <Input id="wwl-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="wwl-address" required>Property address</Label>
              <Input id="wwl-address" name="property_address" autoComplete="street-address" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="wwl-area" required>City or area</Label>
              <Input id="wwl-area" name="area" placeholder="e.g. Ajax, Kitchener, Hamilton" required />
            </div>
            <div>
              <Label htmlFor="wwl-debt">Approx. total owing (if known)</Label>
              <Input id="wwl-debt" name="approx_total_owing" inputMode="numeric" placeholder="e.g. 650,000" />
            </div>
            <div>
              <Label htmlFor="wwl-value">Approx. value (if known)</Label>
              <Input id="wwl-value" name="approx_value" inputMode="numeric" placeholder="e.g. 720,000" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="wwl-notes">Anything else (optional)</Label>
              <Textarea id="wwl-notes" name="message" rows={3} placeholder="Stage of enforcement, who lives there, timing. Plain language is fine." />
            </div>
          </div>
          <p className="mt-4 text-[14px] text-navy-mute flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            Phone or email, at least one. Used only to reply; never shared or added to a list.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[12px] bg-navy px-6 py-3 text-[16px] font-semibold text-stone hover:bg-bronze hover:text-navy transition-colors disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}

export function WorkingWithLendersPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20"
      >
        <HeroBackdrop />
        <div className="relative container max-w-4xl pt-28 pb-16 sm:pt-40 sm:pb-20">
          <Eyebrow>For lenders, their counsel, and the owners they lend to</Eyebrow>
          <h1 className="mt-5 font-sans font-semibold text-stone leading-[1.1] tracking-[-0.01em] text-[clamp(2.2rem,4.8vw,3.5rem)]">
            A sale by the owners,
            <br />
            <span className="font-emph italic font-normal text-bronze">with the lender in the picture.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.62] text-stone-soft">
            When a mortgage is in default, the owners can still sell. I act for
            them, and I keep the lender and its lawyers informed from the start,
            so a fair offer can reach the lender while the home is still lived
            in, cared for and easy to show.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#list"
              className="inline-flex items-center rounded-[12px] bg-bronze px-5 py-3 text-[16px] font-semibold text-navy hover:bg-stone transition-colors"
            >
              Contact us
            </a>
            <Link
              to="/sellers/"
              className="inline-flex items-center rounded-[12px] border border-stone/40 px-5 py-3 text-[16px] font-semibold text-stone hover:border-stone transition-colors"
            >
              If you’re the owner
            </Link>
          </div>
        </div>
      </section>

      {/* What the lender keeps */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow>What the Lender Keeps</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
              Every right,{' '}
              <span className="italic text-bronze">and the final say.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-3">
            {KEEPS.map(({ Icon, title, body }) => (
              <li key={title} className="flex flex-col">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-bronze/55 text-bronze"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display font-medium text-navy text-[1.35rem] leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-[16.5px] leading-relaxed text-navy-soft max-w-[40ch]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TwoPaths />

      {/* Commitments */}
      <section data-surface="white" className="bg-white section-y">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow>What You Can Expect From Me</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
              A cooperative sale,{' '}
              <span className="italic text-bronze">from the first contact.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map(({ Icon, title, body }) => (
              <li key={title} className="rounded-[14px] border border-divider bg-stone p-6">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-bronze/55 text-bronze">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-navy text-[1.15rem] leading-snug">{title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-navy-soft">{body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ListWithUs />

      <FaqSection slug="working-with-lenders" heading="Selling during enforcement, answered." />

      {/* Who you'll be dealing with */}
      <section data-surface="white" className="bg-white section-y">
        <div className="container max-w-3xl">
          <Eyebrow>Who You’ll Be Dealing With</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md leading-[1.14]">
            Taran Aujla,{' '}
            <span className="italic text-bronze">Salesperson.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-navy-soft">
            <p>
              HomeLife G1 Realty Inc., Brokerage. I act for owners selling during
              mortgage enforcement, and for lenders selling after possession,
              across the GTA, Durham, Hamilton, Kitchener and Waterloo. Never for
              both on the same property. Before real estate sales I spent close to a decade in real
              estate law, so I read a judgment, a notice of sale and a payout
              statement the way your counsel does.
            </p>
            <p>
              I am not the owners’ lawyer, and I don’t give legal advice; owners
              have their own lawyers for that.
            </p>
            <p className="text-navy font-medium flex flex-col sm:flex-row sm:gap-2">
              <a href="tel:+13656457332" className="hover:text-bronze transition-colors">365-645-7332</a>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <a href="mailto:taran@resolverealestate.ca" className="hover:text-bronze transition-colors">taran@resolverealestate.ca</a>
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
