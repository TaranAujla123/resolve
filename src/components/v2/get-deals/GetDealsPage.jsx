import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Phone, Lock, ArrowRight, CheckCircle2, Clock, ChevronRight, Gift, Scale } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * GetDealsPage — paid Meta traffic landing page at /get-deals/ for the
 * BUYER side of the practice.
 *
 * Why this exists:
 *   Mirror of /get-help/ architecture (above-fold form, 2-field
 *   capture, 24-hour callback, trust stack inline) — but tuned for
 *   investor psychology rather than distressed-seller empathy.
 *
 *   Investors are analytical, opportunity-driven, and skeptical of
 *   "another agent" pitches. The conversion mechanism is access to
 *   Resolve's seller-side pipeline of distressed files: those sellers
 *   often need to close fast, close quietly, or close on a deadline,
 *   which is a structural advantage for cash buyers and qualified
 *   investors with clear criteria.
 *
 * RECO compliance (buyer side):
 *   - HomeLife G1 attribution + RECO 6024721 visible
 *   - Disclosed representation language ("properly papered, disclosed")
 *   - No specific price-prediction or "guaranteed below market" claims
 *   - No "exclusive" claims without backing — wording is "first look"
 *   - "Free" refers only to the 15-minute consultation
 *
 * Tracking:
 *   - Pixel + CAPI Lead event with content_category = "Buyer Network"
 *   - Page is noindex,nofollow so it does not compete with /buyers in
 *     organic search.
 */

const HERO_VARIANTS = {
  mls: {
    eyebrow: 'BUYER NETWORK · ONTARIO',
    headline: 'The value most buyers walk past.',
    sub: 'Homes priced or positioned wrong, across Ontario. Worth more than they look, and worth a closer read.',
    label: 'Value Hunter',
  },
  cash: {
    eyebrow: 'BUYER NETWORK · ONTARIO',
    headline: 'A better home for your money.',
    sub: 'Homes worth more than their price, across Ontario. An honest read on the value and the risks before you commit.',
    label: 'Close-Ready Buyer',
  },
  investor: {
    eyebrow: 'BUYER NETWORK · ONTARIO',
    headline: 'Properties with room to add value.',
    sub: 'Income potential, added units, and repositions. The full read on upside and downside before you commit.',
    label: 'Active Investor',
  },
  default: {
    eyebrow: 'BUYER NETWORK · ONTARIO',
    headline: 'The value most buyers never see.',
    sub: 'Homes worth more than their price, and the risks that do not show on the surface. An honest read on every one, across Ontario.',
    label: 'General Buyer',
  },
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function GetDealsPage() {
  const [searchParams] = useSearchParams()
  const catRaw = (searchParams.get('cat') || '').toLowerCase()
  const cat = HERO_VARIANTS[catRaw] ? catRaw : 'default'
  const variant = HERO_VARIANTS[cat]
  const formCatValue = cat === 'default' ? 'buyer-general' : `buyer-${cat}`

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (success) return
    const t = setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 500)
    return () => clearTimeout(t)
  }, [success])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    if (!data.get('first_name') || !data.get('phone') || !data.get('email')) {
      setError('First name, phone, and email are required so we can reach you and send matches.')
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
        trackLead(
          {
            content_name: 'Resolve Get Deals Form',
            content_category: variant.label,
            currency: 'CAD',
            value: 100,
          },
          eventId
        )
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: {
            phone: (data.get('phone') || '').toString(),
            email: (data.get('email') || '').toString(),
          },
          custom_data: {
            content_name: 'Resolve Get Deals Form',
            content_category: variant.label,
            cat: formCatValue,
            currency: 'CAD',
            value: 100,
          },
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

  return (
    <>
      <Seo
        title={`${variant.headline} · Resolve Buyer Network`}
        description="Homes worth more than their price across Ontario, read for the hidden value and the risks that do not show on the surface. Matched to your criteria, with disclosed buy-side representation. Free 15-minute call."
        canonical="https://www.resolverealestate.ca/get-deals/"
        noindex={true}
      />

      {/* HERO */}
      <section className="bg-stone">
        <div className="container py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 items-start">
            {/* LEFT — copy + form (or success state) */}
            <div>
              {!success ? (
                <>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">
                    {variant.eyebrow}
                  </p>
                  <h1
                    className="mt-4 font-display font-medium text-navy tracking-tight"
                    style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.04 }}
                  >
                    {variant.headline}
                  </h1>
                  <p
                    className="mt-3 font-display font-medium italic text-bronze"
                    style={{ fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.1 }}
                  >
                    {variant.sub}
                  </p>

                  <p className="mt-6 text-[16px] text-navy-soft leading-relaxed max-w-md">
                    Free 15-minute call. Tell us what you are looking for:
                    <span className="block mt-1 text-navy">
                      area, budget, type. When a file matches, we send it to you <span className="italic text-bronze font-medium">first</span>.
                    </span>
                    <span className="block mt-1 font-semibold text-navy">
                      No fee. No commitment.
                    </span>
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 text-[13px] text-navy-soft">
                    <Clock className="h-3.5 w-3.5 text-bronze" />
                    <span>
                      <span className="font-semibold text-navy">Callback within 24 hours.</span> Often within 2.
                    </span>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-white border border-divider rounded-[14px] p-6 md:p-7"
                    style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value={`Resolve · Get Deals (${variant.label})`}
                    />
                    <input type="hidden" name="cat" value={formCatValue} />
                    <input type="hidden" name="source_page" value="/get-deals" />

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="gd-first-name"
                          className="block text-[13px] font-medium text-navy-soft mb-1.5"
                        >
                          First name <span className="text-bronze">*</span>
                        </label>
                        <input
                          ref={firstFieldRef}
                          id="gd-first-name"
                          name="first_name"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gd-phone"
                          className="block text-[13px] font-medium text-navy-soft mb-1.5"
                        >
                          Phone <span className="text-bronze">*</span>
                        </label>
                        <input
                          id="gd-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gd-email"
                          className="block text-[13px] font-medium text-navy-soft mb-1.5"
                        >
                          Email <span className="text-bronze">*</span>
                        </label>
                        <input
                          id="gd-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          required
                          autoComplete="email"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                        <p className="mt-1.5 text-[11.5px] text-navy-mute">
                          We send property briefings here. Phone is for the callback.
                        </p>
                      </div>
                    </div>

                    {error && (
                      <p className="mt-3 text-[13px] text-rose" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-5 w-full bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-6 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}
                    >
                      {submitting ? 'Sending…' : 'Join the Buyer List'}
                    </button>

                    <p className="mt-3 text-center text-[13px] text-navy-soft">
                      Or call directly:{' '}
                      <a
                        href="tel:+13656457332"
                        className="text-bronze hover:text-bronze-deep font-semibold transition-colors"
                      >
                        (365) 645-7332
                      </a>
                    </p>
                  </form>

                  <p className="mt-4 text-[12px] text-navy-mute tracking-wide flex items-center gap-1.5">
                    <Lock className="h-3 w-3" />
                    Disclosed representation · No fee · RECO Reg. No. 6024721
                  </p>
                </>
              ) : (
                <div
                  className="bg-white border border-divider rounded-[14px] p-7 md:p-10"
                  style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-9 w-9 text-bronze shrink-0 mt-1" />
                    <div>
                      <h2 className="font-display font-medium text-navy text-[28px] md:text-[32px] leading-[1.1]">
                        On the list. We will call within 24 hours.
                      </h2>
                      <p className="mt-3 text-[16px] text-navy-soft leading-relaxed">
                        Often within 2. We will brief you on the buyer network and ask what you are looking for. Once we have your criteria on file, matching properties get sent to you first.
                      </p>
                      <p className="mt-5 text-[14px] text-navy-mute">
                        Need to talk sooner? Call us at{' '}
                        <a
                          href="tel:+13656457332"
                          className="text-bronze hover:text-bronze-deep font-semibold"
                        >
                          (365) 645-7332
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — navy bio-card (matches /about), floats on the light page */}
            <div className="rounded-[18px] bg-navy p-6 sm:p-7 shadow-card">
              <div className="flex gap-5 items-start">
                <div
                  role="img"
                  aria-label="Taran Aujla, Salesperson at Resolve"
                  className="w-[120px] sm:w-[140px] aspect-[4/5] shrink-0 bg-mist border border-bronze/55 rounded-[10px] bg-cover bg-center select-none"
                  style={{
                    backgroundImage: "url('/get-help/taran-headshot.jpg')",
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTouchCallout: 'none',
                  }}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone text-[16px] leading-tight">Taran Aujla</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-bronze">
                    Real Estate Salesperson
                  </p>
                  <p className="mt-2.5 text-[12px] text-stone-soft leading-relaxed">
                    HomeLife G1 Realty Inc., Brokerage
                    <br />
                    RECO Reg. No. 6024721
                  </p>
                  <p className="mt-2.5 text-[12px] text-stone-soft/85 leading-relaxed">
                    Real estate investor &middot; Former real estate lawyer
                    (10 yrs) &middot; Strategic Negotiator &middot; Problem-Solver
                  </p>
                  <Link
                    to="/about"
                    className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-bronze hover:text-stone transition-colors group"
                  >
                    Learn more
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-[13px] text-stone-soft border-t border-white/10 pt-5">
                {[
                  'Homes priced under what they are worth',
                  'A fixable flaw others overlook, costed honestly',
                  'A layout, lot, or location advantage most miss',
                  'The risks that do not show on the surface, flagged early',
                  'Room to grow where you want it: a suite or income',
                  'Disclosed representation, properly papered',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="text-bronze mt-1.5 leading-none">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE EXTRA — buyer offer strip (on top of the representation) */}
      <section className="bg-navy">
        <div className="container py-8 md:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-x-9 gap-y-3 text-center">
            <p className="font-display font-medium text-stone text-[18px] md:text-[20px] shrink-0">
              More than a tour of homes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-x-7 gap-y-2 text-[14.5px] text-stone/85">
              <span className="inline-flex items-center gap-2">
                <Scale className="h-4 w-4 text-bronze" strokeWidth={1.9} aria-hidden="true" />
                Legal fees covered on closing
              </span>
              <span className="inline-flex items-center gap-2">
                <Gift className="h-4 w-4 text-bronze" strokeWidth={1.9} aria-hidden="true" />
                $1,000 Amazon gift card when you buy
              </span>
            </div>
          </div>
          <p className="mt-3.5 text-center text-[11.5px] text-stone/50 leading-relaxed">
            Offered through HomeLife G1 Realty Inc., Brokerage, on completed
            purchases where Resolve represents you. One per client and
            transaction, not combinable, and may be changed or withdrawn at any
            time.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET — mist surface */}
      <section className="bg-mist">
        <div className="container py-14 md:py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              How it works
            </p>
            <h2 className="mt-4 font-display font-medium text-navy text-[28px] md:text-[36px] leading-[1.1] max-w-3xl mx-auto">
              What happens after you call
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'Tell us what you want',
                desc: 'The area, the home, and what you would do with any upside.',
              },
              {
                num: '02',
                title: 'We read each one against it',
                desc: 'The opportunities and costs that are easy to miss, side by side.',
              },
              {
                num: '03',
                title: 'You weigh it and decide',
                desc: 'The full picture, no pressure. Representation disclosed.',
              },
            ].map((item) => (
              <div key={item.num} className="border-t border-divider pt-6">
                <p className="font-display font-medium text-bronze text-[40px] leading-none">
                  {item.num}
                </p>
                <h3 className="mt-4 font-display font-medium text-navy text-[20px] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-navy-soft leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — stone surface */}
      <section className="bg-stone">
        <div className="container py-14 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Where the value comes from
            </p>
            <p className="mt-6 text-[16px] text-navy-soft leading-[1.6]">
              We read the whole Ontario market for the value most buyers walk past: homes priced or marketed wrong, a fixable flaw that scares others off, a layout or lot advantage most overlook, and where you want it, room to add income later.
            </p>
            <p className="mt-4 text-[17px] text-navy leading-[1.55] font-medium">
              The edge is reading a property well, not finding someone in trouble.
            </p>
            <p className="mt-4 text-[16px] text-navy-soft leading-[1.6]">
              Some of what we find does come from sellers who need to move: an estate, a relocation, a tight timeline. Handled properly, that is a win on both sides. A seller who needs certainty gets a clean, on-time close, and a buyer who can deliver it gets a real opportunity. Representation is always disclosed. We read the file for upside and risk before we drive, and bring you the ones worth your time.
            </p>
            <p className="mt-6 text-[13px] text-navy-mute">
              Years of combined experience across complex Ontario property sales and value-add files, read for both what they could become and what could go wrong.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA — navy surface */}
      <section className="bg-navy text-stone">
        <div className="container py-14 md:py-20 text-center">
          <h2 className="font-display font-medium text-[28px] md:text-[40px] leading-[1.08] max-w-2xl mx-auto">
            One call. Your criteria on file. Matches go to you first.
          </h2>
          <p className="mt-4 text-[15px] text-stone/80">Callback within 24 hours. Often within 2.</p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 400)
              }}
              className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all"
              style={{ boxShadow: '0 2px 12px rgba(172, 142, 92, 0.32)' }}
            >
              Join the Buyer List
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+13656457332"
              className="inline-flex items-center gap-2 border-2 border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold py-4 px-8 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all"
            >
              <Phone className="h-4 w-4" />
              (365) 645-7332
            </a>
          </div>

          <p className="mt-10 text-[12px] text-stone/60 leading-relaxed">
            Resolve · HomeLife G1 Realty Inc., Brokerage · Independently Owned &amp; Operated · RECO Reg. No. 6024721
          </p>
        </div>
      </section>

      {/* WHY RESOLVE — buyer-side differentiators. Placed AFTER the CTA on
          purpose so the sign-up form stays front-and-center above the fold;
          this band is for visitors who scroll. No "guaranteed below market"
          or exclusivity-without-backing claims (RECO buyer-side posture). */}
      <section className="bg-stone border-t border-divider">
        <div className="container py-14 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Why Resolve
            </p>
            <h2 className="mt-4 font-display font-medium text-navy text-[28px] md:text-[36px] leading-[1.1]">
              Why buyers join the list
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl mx-auto">
            {[
              {
                title: 'First look at overlooked value',
                desc: 'Homes worth more than their price across Ontario, read before they reach the wider buyer pool.',
              },
              {
                title: 'Matched to what you are looking for',
                desc: 'We bring only what actually fits what you want, so you are not sifting through noise.',
              },
              {
                title: 'A real read, not a mailing list',
                desc: 'Each property is read for both upside and downside before it reaches you, sourced across the whole market.',
              },
              {
                title: 'Properly papered and disclosed',
                desc: 'Clean transactions with representation disclosed and the paperwork handled correctly.',
              },
            ].map((point) => (
              <div key={point.title} className="flex gap-3.5">
                <CheckCircle2
                  className="h-5 w-5 text-bronze shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display font-medium text-navy text-[19px] leading-tight">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] text-navy-soft leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
