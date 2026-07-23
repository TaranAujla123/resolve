import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Phone, Lock, ArrowRight, CheckCircle2, Clock, ChevronRight } from 'lucide-react'
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
    eyebrow: 'BUYER NETWORK · GTA',
    headline: 'Where the value actually is.',
    sub: 'Motivated sellers. Undervalued. Off-market — before it lists.',
    label: 'Value Hunter',
  },
  cash: {
    eyebrow: 'BUYER NETWORK · GTA',
    headline: 'The deals average buyers skip.',
    sub: 'Off-market. Motivated GTA sellers. Not turnkey. For buyers who can close quickly.',
    label: 'Close-Ready Buyer',
  },
  investor: {
    eyebrow: 'BUYER NETWORK · GTA',
    headline: 'Diamond-in-the-rough properties.',
    sub: 'Value-add files from motivated GTA sellers. For close-ready portfolio buyers.',
    label: 'Active Investor',
  },
  default: {
    eyebrow: 'BUYER NETWORK · GTA',
    headline: 'The deals average buyers skip.',
    sub: 'Off-market GTA files. Motivated sellers. Not turnkey. Close-ready buyers only.',
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
        description="Off-market GTA property opportunities from motivated sellers — Power of Sale, mortgage arrears, estate, court-deadline closings. Distressed-seller files briefed before MLS. Disclosed representation. Free 15-minute call."
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
                    Free 15-minute call. Tell us what you are looking for —
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

            {/* RIGHT — compact photo + trust stack + About link */}
            <div className="lg:pt-2">
              <div className="flex gap-5 items-start">
                <div
                  role="img"
                  aria-label="Taran Aujla, Salesperson at Resolve"
                  className="w-[120px] sm:w-[140px] aspect-[4/5] shrink-0 bg-mist border border-divider rounded-[8px] bg-cover bg-center select-none"
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
                  <p className="font-semibold text-navy text-[15px] leading-tight">Taran Aujla</p>
                  <p className="mt-0.5 text-[12.5px] text-navy-soft">Salesperson</p>
                  <p className="mt-2.5 text-[12.5px] text-navy-soft leading-tight">
                    Led by Taran &amp; Dave.
                  </p>
                  <Link
                    to="/about"
                    className="mt-1 inline-flex items-center gap-1 text-[12.5px] font-semibold text-bronze hover:text-bronze-deep transition-colors group"
                  >
                    Learn more
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-[13px] text-navy-soft border-t border-divider pt-5">
                {[
                  'Off-market files (before MLS)',
                  'Motivated sellers with pressure to close',
                  'Value-add and non-turnkey opportunities',
                  'Power of Sale + Notice of Sale properties',
                  'Estate + court-deadline closings',
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
                title: 'Free 15-minute consult',
                desc: 'Tell us what you are looking for. Area, budget, type, timeline.',
              },
              {
                num: '02',
                title: 'Files briefed before MLS',
                desc: 'When a distressed-seller file matches your criteria, we send it to you first.',
              },
              {
                num: '03',
                title: 'You decide. No pressure',
                desc: 'Pass on what does not fit. We keep sending. Disclosed representation throughout.',
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
              Why Resolve has these files
            </p>
            <p className="mt-6 text-[16px] text-navy-soft leading-[1.6]">
              Resolve represents Ontario homeowners through complex property sales — power of sale, mortgage arrears, estate, and court-deadline closings. These sellers often need to close fast, close quietly, or close on a tight timeline.
            </p>
            <p className="mt-4 text-[17px] text-navy leading-[1.55] font-medium">
              That seller pressure is buyer opportunity.
            </p>
            <p className="mt-4 text-[16px] text-navy-soft leading-[1.6]">
              Ontario is a buyer&rsquo;s market right now &mdash; but the deals worth having aren&rsquo;t on Realtor.ca. They&rsquo;re off-market, they often need work, and the sellers are motivated for a reason. If you can close quickly and you don&rsquo;t need turnkey, that&rsquo;s exactly what we send you. Disclosed representation, properly papered. We work the GTA and visit properties with you; we vet the file before we drive.
            </p>
            <p className="mt-6 text-[13px] text-navy-mute">
              Years of combined experience handling complex Ontario property sales — from mortgage arrears and Power of Sale to estate and court-deadline closings.
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
    </>
  )
}
