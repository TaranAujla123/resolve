import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Lock, AlertTriangle, ChevronRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * OpportunitiesPage — anonymized value-add deal breakdowns at
 * /opportunities/:slug, built as shareable landing pages for social
 * (Facebook investor groups etc.).
 *
 * Compliance posture:
 *   These pages market Resolve's ANALYSIS, not any brokerage's listing.
 *   No address, MLS#, listing photos, exact list price, or days-on-market
 *   appear — only rounded bands and the spread a buyer uses to sanity-check
 *   the math, at community level. That keeps it clear of RECO/CREA rules
 *   against re-advertising another brokerage's listing. The specific
 *   property is disclosed only privately, after sign-up, on a disclosed
 *   cooperating (buyer-rep) basis. All figures illustrative, not appraisals.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const DEALS = {
  'kw-legal-duplex': {
    eyebrow: 'Kitchener · Value-Add',
    kind: 'Legal duplex',
    headline: 'A legal duplex sitting in plain sight.',
    sub: 'On the market, unsold, and misread. On the comps it is priced like a single-family home while it already performs as two units.',
    stats: [
      { label: 'Entry band', value: 'Low-$500Ks' },
      { label: 'Renovated duplex comps', value: '$715–760K' },
      { label: 'Work', value: 'Cosmetic + A/C' },
      { label: 'Illustrative spread*', value: '~$150K+' },
    ],
    read: 'It is already a functional two-unit building, vacant, with a newer furnace and separate hydro meters. Renovated legal duplexes in the same neighbourhood have sold from the low-$700Ks into the $800Ks. So why is it unread? It is an investor product wearing a retail listing, it is hard to finance conventionally, and the pool that can actually value it is small. That is the opening, not a red flag.',
    flags: [
      'A cosmetic-to-moderate refresh, not a gut',
      'The exit assumes two-unit rents — confirm they cover at today’s rates before underwriting',
      'Confirm why earlier interest did not firm up',
    ],
  },
  'kw-distressed-detached': {
    eyebrow: 'Kitchener · Distressed',
    kind: 'Power of sale',
    headline: 'A distressed detached the crowd walked past.',
    sub: 'You cannot even inspect it live, so almost everyone skips it. The value did not go anywhere — a renovated home the same size a street over sold near the mid-$600Ks.',
    stats: [
      { label: 'Entry band', value: 'High-$400Ks' },
      { label: 'Renovated comp', value: '~$660K' },
      { label: 'Work', value: 'Cosmetic + remediation' },
      { label: 'Illustrative spread*', value: '~$120K+' },
    ],
    read: 'This is a genuine distressed sale, as-is, with the utilities off. That combination scares off the crowd, which is exactly why it is still here. A renovated home of the same size one door away recently sold near the mid-$600Ks, so the finished value is well proven. The whole deal turns on one thing a contractor can measure up front, not on whether the value exists.',
    flags: [
      'One measurable unknown drives the deal — inspect it before you price',
      'Distressed-sale terms: as-is, comp-justified offers, a slower process',
      'This is fresh distress, not a listing the market has rejected for years',
    ],
  },
  'kw-downtown-multiunit': {
    eyebrow: 'Kitchener · Income',
    kind: 'Multi-unit / transit',
    headline: 'A downtown multi-unit priced ahead of its condition.',
    sub: 'Steps from transit, two kitchens, real income potential — but the ask is ahead of the work required. That gap is the negotiation.',
    stats: [
      { label: 'Entry', value: 'Well under ask' },
      { label: 'Renovated exit', value: '$650–700K' },
      { label: 'As-is (fixer comp)', value: '~$425K' },
      { label: 'Best as', value: 'Income hold' },
    ],
    read: 'Two kitchens, an in-law layout, and a transit-line location give it a real income future. Renovated multi-unit homes nearby have sold in the $650K–$700K range. But a true fixer comparable sold far lower, and this one has been priced ahead of its condition — which is why it sits. It works for the buyer who reads it as an income hold and comes in well under ask, not as a quick cosmetic flip.',
    flags: [
      'The entry has to come down materially — buy on condition, not on ask',
      'A heavier, multi-storey renovation; confirm the second unit is legal',
      'Reads as a rental hold more than a fast resale',
    ],
  },
  'kw-character-restoration': {
    eyebrow: 'Kitchener · Restoration',
    kind: 'Character home',
    headline: 'The highest ceiling, and the honest uncertainty.',
    sub: 'A large character home in a premium heritage pocket, where restored homes sell for a lot. The upside is real and so is the risk — we will not pretend otherwise.',
    stats: [
      { label: 'Entry band', value: 'Mid-$500Ks' },
      { label: 'Restored (est.)', value: '$800–900K' },
      { label: 'Comp spread', value: 'Wide' },
      { label: 'Reno', value: 'Major / high-end' },
    ],
    read: 'It is the biggest home of the set, on a rare corner lot in a neighbourhood where restored character homes have sold from the mid-$700Ks well past a million. The ceiling is the highest here. So is the uncertainty: only a handful of comparables, a wide range, and a full high-end restoration. This is a project for an investor with the capital and the crew, and we would firm up the exit with more comparables before anyone commits.',
    flags: [
      'Thin, widely spread comparables — treat the exit as provisional',
      'The largest and priciest renovation of the set',
      'Best outcomes need a skilled contractor and real capital',
    ],
  },
}

const ORDER = ['kw-legal-duplex', 'kw-distressed-detached', 'kw-downtown-multiunit', 'kw-character-restoration']

const THESIS = 'People assume a home that has been on MLS and has not sold must be a bad deal. Usually it just means the price was wrong for who saw it, or the right buyer never did. The value does not disappear because a listing expired — it waits for someone who can read it.'

function SignupForm({ dealSlug, dealTitle }) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    if (!data.get('first_name') || !data.get('email')) {
      setError('First name and email are required so we can send you the details.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      if (res.ok) {
        const eventId = genEventId()
        trackLead({ content_name: 'Resolve Opportunity Signup', content_category: dealSlug || 'opportunities', currency: 'CAD', value: 100 }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { email: (data.get('email') || '').toString(), phone: (data.get('phone') || '').toString() },
          custom_data: { content_name: 'Resolve Opportunity Signup', content_category: dealSlug || 'opportunities', currency: 'CAD', value: 100 },
        })
        setSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError('Something went wrong on our side. Please call (365) 645-7332.')
      }
    } catch (err) {
      setError('Network issue. Please call (365) 645-7332 or try again shortly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white border border-divider rounded-[14px] p-6 md:p-8" style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}>
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-8 w-8 text-bronze shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-medium text-navy text-[24px] md:text-[27px] leading-[1.12]">You are on the list.</h3>
            <p className="mt-3 text-[15px] text-navy-soft leading-relaxed">
              We will send the full breakdown on this one and new value-add files as they come up. Sooner is fine too — call{' '}
              <a href="tel:+13656457332" className="text-bronze hover:text-bronze-deep font-semibold">(365) 645-7332</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-divider rounded-[14px] p-6 md:p-7" style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}>
      <input type="hidden" name="_subject" value={`Resolve · Opportunity interest (${dealTitle || dealSlug || 'general'})`} />
      <input type="hidden" name="deal" value={dealSlug || 'opportunities'} />
      <input type="hidden" name="source_page" value="/opportunities" />
      <p className="font-display font-medium text-navy text-[19px] leading-tight">Want the address and the full numbers?</p>
      <p className="mt-1.5 text-[13.5px] text-navy-soft">Tell us where to send it. No fee, no obligation.</p>
      <div className="mt-4 grid grid-cols-1 gap-3.5">
        <input name="first_name" type="text" required autoComplete="given-name" placeholder="First name"
          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all" />
        <input name="email" type="email" inputMode="email" required autoComplete="email" placeholder="Email"
          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all" />
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone (optional)"
          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all" />
      </div>
      {error && <p className="mt-3 text-[13px] text-rose" role="alert">{error}</p>}
      <button type="submit" disabled={submitting}
        className="mt-4 w-full bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-6 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all disabled:opacity-60"
        style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>
        {submitting ? 'Sending…' : 'Send me the details'}
      </button>
      <p className="mt-3 text-[12px] text-navy-mute tracking-wide flex items-center gap-1.5">
        <Lock className="h-3 w-3" /> Disclosed representation · No fee · RECO Reg. No. 6024721
      </p>
    </form>
  )
}

function DealIndex() {
  return (
    <>
      <Seo
        title="Value-Add Property Opportunities · Resolve"
        description="Anonymized value-add property breakdowns across Kitchener-Waterloo, read for real upside and the risks that do not show on the surface. The numbers to check the math; the specifics after we connect."
        canonical="https://www.resolverealestate.ca/opportunities/"
      />
      <section className="bg-stone">
        <div className="container py-12 md:py-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">Value-Add Opportunities · Ontario</p>
          <h1 className="mt-4 font-display font-medium text-navy tracking-tight" style={{ fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.05 }}>
            Unsold is not the same as <span className="italic text-bronze">bad</span>.
          </h1>
          <p className="mt-5 text-[17px] text-navy-soft leading-[1.6] max-w-2xl">{THESIS}</p>
          <p className="mt-4 text-[16px] text-navy leading-[1.55] font-medium max-w-2xl">
            Below are value-add files we are underwriting across Kitchener-Waterloo — the numbers to check whether the math works, with the specifics held until we are working together.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ORDER.map((slug) => {
              const d = DEALS[slug]
              return (
                <Link key={slug} to={`/opportunities/${slug}`}
                  className="group block bg-white border border-divider rounded-[14px] p-6 hover:border-bronze transition-all" style={{ boxShadow: '0 2px 14px rgba(5,26,44,0.05)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">{d.eyebrow}</p>
                  <h2 className="mt-2 font-display font-medium text-navy text-[21px] leading-tight">{d.headline}</h2>
                  <p className="mt-2 text-[14px] text-navy-soft leading-relaxed">{d.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-bronze group-hover:text-bronze-deep">
                    See the breakdown <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
          <p className="mt-8 text-[12px] text-navy-mute leading-relaxed max-w-2xl">
            All figures are illustrative estimates for discussion, not appraisals or guarantees. Properties are described in general terms only; specific listings are represented on a disclosed, cooperating basis. Resolve is a name used by Taran Aujla, Salesperson, HomeLife G1 Realty Inc., Brokerage · RECO Reg. No. 6024721.
          </p>
        </div>
      </section>
    </>
  )
}

export function OpportunitiesPage() {
  const { slug } = useParams()
  const topRef = useRef(null)

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  if (!slug || !DEALS[slug]) return <DealIndex />
  const d = DEALS[slug]

  return (
    <>
      <Seo
        title={`${d.headline} · Resolve Value-Add`}
        description={d.sub}
        canonical={`https://www.resolverealestate.ca/opportunities/${slug}/`}
      />

      <section ref={topRef} className="bg-stone">
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-start">
            {/* LEFT — the anonymized breakdown */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze">{d.eyebrow} · {d.kind}</p>
              <h1 className="mt-3 font-display font-medium text-navy tracking-tight" style={{ fontSize: 'clamp(28px, 4.4vw, 44px)', lineHeight: 1.07 }}>
                {d.headline}
              </h1>
              <p className="mt-4 text-[16.5px] text-navy-soft leading-relaxed max-w-xl">{d.sub}</p>

              {/* stats — the math, no listing identifiers */}
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 border border-divider rounded-[12px] overflow-hidden bg-white">
                {d.stats.map((s, i) => (
                  <div key={s.label} className={`p-4 ${i < d.stats.length - 1 ? 'sm:border-r border-divider' : ''} ${i % 2 === 0 ? 'border-r sm:border-r' : ''} ${i < 2 ? 'border-b sm:border-b-0 border-divider' : ''}`}>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-navy-mute">{s.label}</p>
                    <p className="mt-1 font-display font-medium text-navy text-[17px] leading-tight">{s.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-navy-mute">*Illustrative gross spread before renovation, financing and transaction costs. Not a guarantee.</p>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">The read</p>
                <p className="mt-3 text-[16px] text-navy-soft leading-[1.6] max-w-xl">{d.read}</p>
              </div>

              <div className="mt-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">What to watch</p>
                <ul className="mt-3 space-y-2.5 max-w-xl">
                  {d.flags.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-navy-soft leading-relaxed">
                      <AlertTriangle className="h-4 w-4 text-bronze shrink-0 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — sign-up gate */}
            <div className="lg:sticky lg:top-8">
              <SignupForm dealSlug={slug} dealTitle={d.headline} />
              <p className="mt-4 text-[12px] text-navy-mute leading-relaxed">
                Figures are illustrative estimates for discussion, not an appraisal or a guarantee. The property is described in general terms only; the specific listing is shared privately, on a disclosed cooperating basis, once we are working together.
              </p>
              <Link to="/opportunities" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-bronze hover:text-bronze-deep">
                See the other opportunities <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS band */}
      <section className="bg-mist border-y border-divider">
        <div className="container py-10 md:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">Why it is still available</p>
          <p className="mt-3 text-[17px] md:text-[19px] text-navy leading-[1.5] max-w-3xl font-display">{THESIS}</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy text-stone">
        <div className="container py-12 md:py-16 text-center">
          <h2 className="font-display font-medium text-[26px] md:text-[36px] leading-[1.1] max-w-2xl mx-auto">
            If the math works for you, let us send the ones that fit your box.
          </h2>
          <p className="mt-4 text-[15px] text-stone/80 max-w-xl mx-auto">
            Tell us your area, budget and what you would take on. When a file matches, you see it first.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all"
              style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>
              Send me the details <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+13656457332"
              className="inline-flex items-center gap-2 border-2 border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all">
              (365) 645-7332
            </a>
          </div>
          <p className="mt-9 text-[12px] text-stone/60 leading-relaxed max-w-2xl mx-auto">
            Resolve · HomeLife G1 Realty Inc., Brokerage · Independently Owned &amp; Operated · RECO Reg. No. 6024721
          </p>
        </div>
      </section>
    </>
  )
}
