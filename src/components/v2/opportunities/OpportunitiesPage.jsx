import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, Lock, AlertTriangle, ChevronRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * OpportunitiesPage — anonymized value-add deal breakdowns at
 * /opportunities/:slug. Numbers-first: acquisition, repairs, ARV and
 * spread lead every card and page; the read and risks sit below.
 *
 * Compliance: markets Resolve's ANALYSIS, not any brokerage's listing.
 * No address, MLS#, listing photos, exact list price or DOM — only
 * rounded illustrative bands and the math a buyer uses to check a deal.
 * The specific property is disclosed privately, after sign-up, on a
 * disclosed cooperating (buyer-rep) basis. All figures illustrative.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const DEALS = {
  'kw-legal-duplex': {
    eyebrow: 'Kitchener · Value-Add',
    city: 'Kitchener–Waterloo',
    kind: 'Legal duplex',
    headline: 'A legal duplex sitting in plain sight.',
    nums: { acq: '$500–540K', repairs: '$60–90K', arv: '$715–760K', spread: '$120–180K' },
    sub: 'On the comps it is priced like a single-family home while it already performs as two units.',
    read: 'Already a functional two-unit building, vacant, with a newer furnace and separate hydro meters. Renovated legal duplexes in the same neighbourhood have sold from the low-$700Ks into the $800Ks. It is a rental-income building being sold like an ordinary house, and it is hard to get a regular mortgage on, so most buyers pass it by. That is the opening.',
    flags: ['A cosmetic-to-moderate refresh, not a gut', 'Confirm two-unit rents cover at today’s rates', 'Confirm why earlier interest did not firm up'],
  },
  'kw-distressed-detached': {
    eyebrow: 'Kitchener · Distressed',
    city: 'Kitchener–Waterloo',
    kind: 'Power of sale',
    headline: 'A distressed detached the crowd walked past.',
    nums: { acq: '$460–490K', repairs: '$80–110K', arv: '~$660K', spread: '$80–120K' },
    sub: 'You cannot inspect it live, so almost everyone skips it. The value did not go anywhere.',
    read: 'A genuine distressed sale, as-is, utilities off. A renovated home of the same size one door away recently sold near the mid-$600Ks, so the finished value is well proven. The whole deal turns on one thing a contractor can measure up front, not on whether the value exists.',
    flags: ['One thing you cannot see yet decides the deal — inspect it before you price', 'Sold as-is, with offers backed by comparable sales', 'Newly distressed, not a listing the market has rejected for years'],
  },
  'kw-downtown-multiunit': {
    eyebrow: 'Kitchener · Income',
    city: 'Kitchener–Waterloo',
    kind: 'Multi-unit / transit',
    headline: 'A downtown multi-unit priced ahead of its condition.',
    nums: { acq: '$440–480K', repairs: '$100–130K', arv: '$650–700K', spread: '$60–100K' },
    sub: 'Steps from transit, two kitchens, real income potential — the ask is ahead of the work. That gap is the negotiation.',
    read: 'Two kitchens, an in-law layout, and a transit-line location give it a real income future. Renovated multi-unit homes nearby have sold in the $650K–$700K range, while a true fixer comparable sold far lower. It works for the buyer who reads it as an income hold and comes in well under ask, not a quick cosmetic flip.',
    flags: ['The entry has to come down — buy on condition, not on ask', 'Heavier, multi-storey reno; confirm the second unit is legal', 'A rental hold more than a fast resale'],
  },
  'kw-character-restoration': {
    eyebrow: 'Kitchener · Restoration',
    city: 'Kitchener–Waterloo',
    kind: 'Character home',
    headline: 'The highest ceiling, and the honest uncertainty.',
    nums: { acq: '$540–575K', repairs: '$150K+', arv: '$800–900K', spread: 'Varies' },
    sub: 'A large character home in a premium heritage pocket where restored homes sell for a lot. Real upside, real risk.',
    read: 'The biggest home of the set, on a rare corner lot in a neighbourhood where restored character homes have sold from the mid-$700Ks well past a million. The ceiling is the highest here, and so is the uncertainty: few comparables, a wide range, and a full high-end restoration. A project for an investor with the capital and the crew.',
    flags: ['Thin, widely spread comparables — the exit is provisional', 'The largest and priciest renovation of the set', 'Best outcomes need a skilled contractor and real capital'],
  },
}

const ORDER = ['kw-legal-duplex', 'kw-distressed-detached', 'kw-downtown-multiunit', 'kw-character-restoration']
const CITIES = ['Toronto', 'Peel Region', 'Kitchener–Waterloo', 'Hamilton']
const NUM_LABELS = [['acq', 'Acquisition'], ['repairs', 'Repairs'], ['arv', 'ARV (comps)'], ['spread', 'Spread*']]
const THESIS = 'These are motivated-seller situations: a power of sale, a price that outran the condition, a building the ordinary buyer could not finance or could not read. The motivation is real and so is the value. Most buyers simply stop at the surface, and reading past it is the work. That gap is the opportunity.'

function NumberGrid({ nums, large }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 border border-divider rounded-[12px] overflow-hidden bg-white`}>
      {NUM_LABELS.map(([key, label], i) => (
        <div key={key} className={`px-4 ${large ? 'py-5' : 'py-3.5'} ${i % 2 === 0 ? 'border-r' : ''} ${i < 3 ? 'sm:border-r' : ''} ${i < 2 ? 'border-b sm:border-b-0' : ''} border-divider ${key === 'spread' ? 'bg-mist' : ''}`}>
          <p className={`${large ? 'text-[10.5px]' : 'text-[9.5px]'} font-semibold uppercase tracking-[0.11em] ${key === 'spread' ? 'text-bronze-deep' : 'text-navy-mute'}`}>{label}</p>
          <p className={`mt-1 font-display font-semibold text-navy ${large ? 'text-[22px] md:text-[26px]' : 'text-[16px]'} leading-none tabular-nums`}>{nums[key]}</p>
        </div>
      ))}
    </div>
  )
}

function SignupForm({ dealSlug, dealTitle }) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)
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
          event_id: eventId, event_source_url: window.location.href,
          user_data: { email: (data.get('email') || '').toString(), phone: (data.get('phone') || '').toString() },
          custom_data: { content_name: 'Resolve Opportunity Signup', content_category: dealSlug || 'opportunities', currency: 'CAD', value: 100 },
        })
        setSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else setError('Something went wrong on our side. Please call (365) 645-7332.')
    } catch (err) {
      setError('Network issue. Please call (365) 645-7332 or try again shortly.')
    } finally { setSubmitting(false) }
  }

  if (success) {
    return (
      <div className="bg-white border border-divider rounded-[14px] p-6 md:p-8" style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}>
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-8 w-8 text-bronze shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-medium text-navy text-[24px] leading-[1.12]">You are on the list.</h3>
            <p className="mt-3 text-[15px] text-navy-soft leading-relaxed">We will send the full breakdown on this one and new value-add files as they come up. Sooner is fine too — call <a href="tel:+13656457332" className="text-bronze hover:text-bronze-deep font-semibold">(365) 645-7332</a>.</p>
          </div>
        </div>
      </div>
    )
  }

  const inputCls = 'w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all'
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-divider rounded-[14px] p-6 md:p-7" style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}>
      <input type="hidden" name="_subject" value={`Resolve · Opportunity interest (${dealTitle || dealSlug || 'general'})`} />
      <input type="hidden" name="deal" value={dealSlug || 'opportunities'} />
      <input type="hidden" name="source_page" value="/opportunities" />
      <p className="font-display font-medium text-navy text-[19px] leading-tight">Want the address and full numbers?</p>
      <p className="mt-1.5 text-[13.5px] text-navy-soft">A few quick details so we send the right ones. No fee, no obligation.</p>
      <ul className="mt-3.5 pt-3.5 border-t border-divider space-y-1.5">
        {[
          'Exact address and location',
          'Full price and listing history',
          'The complete underwriting: comps, purchase and repair scope',
          'First look at new value-add files as they come up',
        ].map((x) => (
          <li key={x} className="flex items-start gap-2 text-[13px] text-navy-soft leading-snug">
            <CheckCircle2 className="h-3.5 w-3.5 text-bronze shrink-0 mt-0.5" aria-hidden="true" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-1 gap-3.5">
        <input name="first_name" type="text" required autoComplete="given-name" placeholder="First name" className={inputCls} />
        <input name="email" type="email" inputMode="email" required autoComplete="email" placeholder="Email" className={inputCls} />
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone (optional)" className={inputCls} />
        <select name="financing" required defaultValue="" className={`${inputCls} appearance-none`}>
          <option value="" disabled>How would you fund a purchase?</option>
          <option value="cash">Cash</option>
          <option value="pre-approved">Pre-approved / financing ready</option>
          <option value="private-jv">Private lender / JV partner</option>
          <option value="exploring">Still exploring</option>
        </select>
        <select name="budget" defaultValue="" className={`${inputCls} appearance-none`}>
          <option value="" disabled>Budget range</option>
          <option value="under-500k">Under $500K</option>
          <option value="500-750k">$500K – $750K</option>
          <option value="750k-1m">$750K – $1M</option>
          <option value="1m-plus">$1M+</option>
        </select>
        <select name="experience" defaultValue="" className={`${inputCls} appearance-none`}>
          <option value="" disabled>Investment properties owned</option>
          <option value="none">None yet</option>
          <option value="1-3">1 – 3</option>
          <option value="4-plus">4 or more</option>
        </select>
      </div>
      {error && <p className="mt-3 text-[13px] text-rose" role="alert">{error}</p>}
      <button type="submit" disabled={submitting} className="mt-4 w-full bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-6 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all disabled:opacity-60" style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>
        {submitting ? 'Sending…' : 'Send me the details'}
      </button>
      <p className="mt-3 text-[12px] text-navy-mute tracking-wide flex items-center gap-1.5"><Lock className="h-3 w-3" /> Disclosed representation · No fee · RECO Reg. No. 6024721</p>
    </form>
  )
}

function DealIndex() {
  return (
    <>
      <Seo title="Value-Add Property Opportunities · Resolve" description="Motivated-seller, value-add property breakdowns across Toronto, Peel, Kitchener-Waterloo and Hamilton — acquisition, repairs, ARV and spread. The numbers to check the math; the specifics after we connect." canonical="https://www.resolverealestate.ca/opportunities/" />
      {/* HERO — navy grid */}
      <section data-surface="navy" className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20">
        <HeroBackdrop />
        <div className="relative container pt-28 pb-12 sm:pt-40 sm:pb-16">
          <Link to="/for-investors" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone/70 hover:text-stone transition-colors">
            <ArrowLeft className="h-4 w-4" /> For Investors
          </Link>
          <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">Motivated-Seller Opportunities · Ontario</p>
          <h1 className="mt-4 font-display font-medium text-stone tracking-tight" style={{ fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.05 }}>
            Motivated sellers, misread <span className="italic text-bronze">value</span>.
          </h1>
          <p className="mt-5 text-[16px] text-stone-soft leading-[1.6] max-w-2xl">{THESIS}</p>
        </div>
      </section>

      {/* Deals (light) */}
      <section className="bg-stone">
        <div className="container py-12 md:py-16">
          <p className="text-[15px] text-navy leading-[1.55] font-medium max-w-2xl">Real files we are underwriting right now, grouped by market. The numbers are below; the exact address comes once we are working together.</p>

          <div className="mt-9 space-y-11">
            {CITIES.map((city) => {
              const cityDeals = ORDER.filter((slug) => DEALS[slug].city === city)
              return (
                <div key={city}>
                  <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-divider">
                    <h2 className="font-display font-medium text-navy text-[21px] md:text-[24px]">{city}</h2>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-mute">{cityDeals.length ? `${cityDeals.length} ${cityDeals.length === 1 ? 'file' : 'files'}` : 'Sourcing now'}</span>
                  </div>
                  {cityDeals.length ? (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cityDeals.map((slug) => {
                        const d = DEALS[slug]
                        return (
                          <Link key={slug} to={`/opportunities/${slug}`} className="group block bg-white border border-divider rounded-[14px] p-6 hover:border-bronze transition-all" style={{ boxShadow: '0 2px 14px rgba(5,26,44,0.05)' }}>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">{d.eyebrow}</p>
                            <h3 className="mt-1.5 font-display font-medium text-navy text-[20px] leading-tight">{d.headline}</h3>
                            <div className="mt-4"><NumberGrid nums={d.nums} /></div>
                            <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-bronze group-hover:text-bronze-deep">See the breakdown <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="mt-5 bg-white border border-dashed border-divider rounded-[14px] p-6">
                      <p className="text-[14.5px] text-navy-soft leading-relaxed max-w-2xl">We are actively sourcing motivated-seller files in {city}. They move quietly and quickly. Tell us your box and you will see them first.</p>
                      <a href="tel:+13656457332" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-bronze hover:text-bronze-deep">Get on the list · (365) 645-7332 <ChevronRight className="h-3.5 w-3.5" /></a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-6 text-[11.5px] text-navy-mute">*Illustrative gross spread before renovation, financing and transaction costs. Not a guarantee. Estimates for discussion, not appraisals; specific listings represented on a disclosed cooperating basis. Taran Aujla, Salesperson · HomeLife G1 Realty Inc., Brokerage · RECO 6024721.</p>
        </div>
      </section>
    </>
  )
}

export function OpportunitiesPage() {
  const { slug } = useParams()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])
  if (!slug || !DEALS[slug]) return <DealIndex />
  const d = DEALS[slug]

  return (
    <>
      <Seo title={`${d.headline} · Resolve Value-Add`} description={`${d.sub} Acquisition ${d.nums.acq}, repairs ${d.nums.repairs}, ARV ${d.nums.arv}.`} canonical={`https://www.resolverealestate.ca/opportunities/${slug}/`} />

      {/* HERO — navy grid, numbers + form */}
      <section data-surface="navy" className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20">
        <HeroBackdrop />
        <div className="relative container pt-28 pb-12 sm:pt-36 sm:pb-14">
          <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone/70 hover:text-stone transition-colors">
            <ArrowLeft className="h-4 w-4" /> All opportunities
          </Link>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze">{d.eyebrow} · {d.kind}</p>
              <h1 className="mt-2 font-display font-medium text-stone tracking-tight" style={{ fontSize: 'clamp(25px, 3.6vw, 38px)', lineHeight: 1.08 }}>{d.headline}</h1>
              <div className="mt-5"><NumberGrid nums={d.nums} large /></div>
              <p className="mt-2 text-[11px] text-stone/55">*Illustrative gross spread before renovation, financing and transaction costs. Not a guarantee.</p>
              <p className="mt-6 text-[16.5px] text-stone-soft leading-relaxed max-w-xl">{d.sub}</p>
            </div>
            <div className="lg:sticky lg:top-8">
              <SignupForm dealSlug={slug} dealTitle={d.headline} />
              <p className="mt-4 text-[12px] text-stone/55 leading-relaxed">Figures are illustrative estimates for discussion, not an appraisal or guarantee. The property is described in general terms only; the specific listing is shared privately, on a disclosed cooperating basis, once we are working together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The read + what to watch (light) */}
      <section className="bg-stone">
        <div className="container py-11 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 max-w-5xl">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">The read</p>
              <p className="mt-3 text-[16px] text-navy-soft leading-[1.6]">{d.read}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">What to watch</p>
              <ul className="mt-3 space-y-2.5">
                {d.flags.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-navy-soft leading-relaxed">
                    <AlertTriangle className="h-4 w-4 text-bronze shrink-0 mt-1" /><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/opportunities" className="mt-9 inline-flex items-center gap-1 text-[13px] font-semibold text-bronze hover:text-bronze-deep">See the other opportunities <ChevronRight className="h-3.5 w-3.5" /></Link>
        </div>
      </section>

      <section className="bg-mist border-y border-divider">
        <div className="container py-9 md:py-11">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">Why it is still available</p>
          <p className="mt-3 text-[17px] md:text-[19px] text-navy leading-[1.5] max-w-3xl font-display">{THESIS}</p>
        </div>
      </section>

      <section className="bg-navy text-stone">
        <div className="container py-12 md:py-16 text-center">
          <h2 className="font-display font-medium text-[26px] md:text-[36px] leading-[1.1] max-w-2xl mx-auto">If the math works for you, let us send the ones that fit your box.</h2>
          <p className="mt-4 text-[15px] text-stone/80 max-w-xl mx-auto">Tell us your area, budget and what you would take on. When a file matches, you see it first.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all" style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}>Send me the details <ArrowRight className="h-4 w-4" /></a>
            <a href="tel:+13656457332" className="inline-flex items-center gap-2 border-2 border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all">(365) 645-7332</a>
          </div>
          <p className="mt-9 text-[12px] text-stone/60 leading-relaxed max-w-2xl mx-auto">Resolve · HomeLife G1 Realty Inc., Brokerage · Independently Owned &amp; Operated · RECO Reg. No. 6024721</p>
        </div>
      </section>
    </>
  )
}
