import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Phone, Lock, ArrowRight, CheckCircle2, Clock, ChevronRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * GetHelpPage — paid Meta traffic landing page at /get-help/.
 *
 * Why this exists:
 *   The /power-of-sale, /mortgage-arrears etc. SEO situation pages
 *   are long-form, designed to rank organically. They convert poorly
 *   from cold paid scroll traffic (form below the fold, too much
 *   reading). This page is built ONLY for Meta paid ads: above-fold
 *   form, ONE clear action, trust stack inline, message-matched hero
 *   per ad source via ?cat= URL parameter.
 *
 * Conversion design:
 *   - 2-field form (first name + phone) — every extra field cuts ~15%
 *   - 24-hour callback promise as the strongest trust signal
 *   - Risk reversal in section 1 ("if we can't help, we say so")
 *   - Photo + RECO + brokerage right column = inline trust stack
 *   - Bronze CTA, navy text, single dominant action per viewport
 *   - Auto-focus first field on load (reduces tap cost on mobile)
 *   - Sticky phone CTA on mobile (distressed sellers call > type)
 *
 * RECO compliance:
 *   - HomeLife G1 attribution in trust strip + footer
 *   - RECO Reg. No. 6024721 in three places (form trust line, photo
 *     caption, final CTA disclosure)
 *   - No "specialist" / "exclusive" / outcome-guarantee language
 *   - "Free" refers ONLY to the 15-minute consultation
 *
 * Tracking:
 *   - Pixel + CAPI Lead event fires ONLY on form submit success,
 *     with shared event_id for dedup. content_category is the
 *     resolved ad-source label.
 *   - Page is noindex,nofollow so it does not compete with the
 *     SEO situation pages for organic search.
 */

const HERO_VARIANTS = {
  mortgage: {
    eyebrow: 'MORTGAGE TROUBLE · ONTARIO',
    headline: 'Behind on the mortgage?',
    sub: 'Notice from the bank? Sell on your terms.',
    label: 'Mortgage / Power of Sale',
  },
  estate: {
    eyebrow: 'ESTATE · ONTARIO',
    headline: 'Estate property to sell?',
    sub: 'Coordinated with the trustee.',
    label: 'Estate / Probate',
  },
  tss: {
    eyebrow: 'TIME-SENSITIVE · ONTARIO',
    headline: 'Sale on a deadline?',
    sub: 'We work the window.',
    label: 'Time-Sensitive Sale',
  },
  /* separation and disputes hero variants removed as part of the 4-lane
     practice refocus. Any ?cat=separation or ?cat=disputes URL falls
     through to the default (general) hero via the ternary in the
     component body. Kept referenceable in git history for context. */
  default: {
    eyebrow: 'SELLER REPRESENTATION · ONTARIO',
    headline: 'A property situation that needs handling?',
    sub: 'Let’s talk.',
    label: 'General',
  },
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function GetHelpPage() {
  const [searchParams] = useSearchParams()
  const catRaw = (searchParams.get('cat') || '').toLowerCase()
  const cat = HERO_VARIANTS[catRaw] ? catRaw : 'default'
  const variant = HERO_VARIANTS[cat]
  const formCatValue = cat === 'default' ? 'general' : cat

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const firstFieldRef = useRef(null)

  // Auto-focus first field after a beat so initial scroll/animations settle.
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
    if (!data.get('first_name') || !data.get('phone')) {
      setError('First name and phone are required so we can reach you.')
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
            content_name: 'Resolve Get Help Form',
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
          },
          custom_data: {
            content_name: 'Resolve Get Help Form',
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
        title={`${variant.headline} · Resolve`}
        description="Resolve handles complex Ontario property sales — mortgage arrears, power of sale, estate, time-sensitive closings. Free 15-minute confidential call. We call back within 24 hours."
        canonical="https://resolveproperty.ca/get-help/"
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

                  {cat === 'mortgage' && (
                    <p className="mt-6 text-[15.5px] text-navy leading-relaxed max-w-md border-l-2 border-bronze pl-4">
                      We work directly with your lender and their lawyers to buy
                      you the time to sell on your terms &mdash; before they
                      take over and control the sale themselves.
                    </p>
                  )}

                  <p className="mt-6 text-[16px] text-navy-soft leading-relaxed max-w-md">
                    Free 15-minute call with a real estate professional.
                    <span className="block mt-1 text-navy">
                      We help you keep more of the <span className="italic text-bronze font-medium">equity</span> you built.
                    </span>
                    <span className="block mt-1 font-semibold text-navy">
                      No fee. No obligation. Confidential.
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
                      value={`Resolve · Get Help (${variant.label})`}
                    />
                    <input type="hidden" name="cat" value={formCatValue} />
                    <input type="hidden" name="source_page" value="/get-help" />

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="gh-first-name"
                          className="block text-[13px] font-medium text-navy-soft mb-1.5"
                        >
                          First name <span className="text-bronze">*</span>
                        </label>
                        <input
                          ref={firstFieldRef}
                          id="gh-first-name"
                          name="first_name"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gh-phone"
                          className="block text-[13px] font-medium text-navy-soft mb-1.5"
                        >
                          Phone <span className="text-bronze">*</span>
                        </label>
                        <input
                          id="gh-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
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
                      {submitting ? 'Sending…' : 'Start a Private Conversation'}
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
                    Confidential · No obligation · RECO Reg. No. 6024721
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
                        Got it. We will call within 24 hours.
                      </h2>
                      <p className="mt-3 text-[16px] text-navy-soft leading-relaxed">
                        Often within 2. Your details stay private. The call is free, with no obligation. If we cannot help, we will tell you who can.
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
                {/*
                  Rendered as a background-image div (not <img>) so browser
                  hover overlays (Edge's "Visual Search" toolbar, Chrome's
                  reverse-image-search, etc.) do not appear over the
                  portrait. Accessibility preserved via role + aria-label.
                  user-select-none + select-none + draggable suppression
                  block any residual save/drag interactions.
                */}
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
                  'Power of Sale + Notice of Sale files',
                  'Mortgage arrears + default letters',
                  'Estate trustee sales',
                  'Court-deadline closings',
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

      {/* WHAT YOU GET — mist surface, risk reversal */}
      <section className="bg-mist">
        <div className="container py-14 md:py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              What you get
            </p>
            <h2 className="mt-4 font-display font-medium text-navy text-[28px] md:text-[36px] leading-[1.1] max-w-3xl mx-auto">
              What happens when we talk
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'Callback within 24 hours',
                desc: 'Often within 2. We reach out to you, on your schedule.',
              },
              {
                num: '02',
                title: '15 minutes of straight talk',
                desc: 'We listen. We ask. We tell you what is possible — and what is not.',
              },
              {
                num: '03',
                title: 'If we cannot help, we say so',
                desc: 'And tell you who can. No fee. No follow-up. No pressure.',
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

      {/* ABOUT — stone surface, plain language */}
      <section className="bg-stone">
        <div className="container py-14 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              About Resolve
            </p>
            <p className="mt-6 text-[16px] text-navy-soft leading-[1.6]">
              Resolve handles complex Ontario property sales — power of sale, mortgage arrears, estate, time-sensitive closings. The practice is defined by the type of property situation, not the location. We work across Ontario.
            </p>
            <p className="mt-4 text-[17px] text-navy leading-[1.55] font-medium">
              The priority is always the homeowner&rsquo;s equity.
            </p>
            <p className="mt-4 text-[16px] text-navy-soft leading-[1.6]">
              Whatever stage you are at — a default letter, a Notice of Sale, or just behind on payments — Resolve helps you sell on your timeline, with equity preserved, before the lender forces it.
            </p>
            <p className="mt-6 text-[13px] text-navy-mute">
              Years of combined experience handling complex Ontario property sales — from mortgage arrears and Power of Sale to estate and court-deadline closings.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA — navy surface, single bronze action */}
      <section className="bg-navy text-stone">
        <div className="container py-14 md:py-20 text-center">
          <h2 className="font-display font-medium text-[28px] md:text-[40px] leading-[1.08] max-w-2xl mx-auto">
            One conversation. No obligation. Completely confidential.
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
              Send a Message
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
