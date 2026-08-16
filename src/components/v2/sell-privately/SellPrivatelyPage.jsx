import React, { useEffect, useRef, useState } from 'react'
import {
  Clock, Lock, CheckCircle2, Check, X, ShieldCheck, Scale, Users, Phone, ArrowRight,
} from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * SellPrivatelyPage — /sell-privately/
 *
 * Landing page for owners who need a fast, quiet, certain sale: we
 * represent the seller and bring a vetted, cash-ready buyer. A private,
 * no-obligation offer usually within 48 hours; if accepted and the
 * buyer's own due diligence checks out, a close in about a week.
 *
 * Positioning intent (per Taran): this must NOT read like the "we buy
 * houses cash" wholesalers. The differentiators, made explicit on the
 * page:
 *   - Resolve represents the SELLER, is not the buyer.
 *   - The buyers are named types (investors/funds/builders/qualified
 *     end-buyers), not an anonymous number.
 *   - The price/speed trade-off is disclosed honestly, not hidden — we
 *     tell the seller how a private sale compares to an open listing.
 *   - No obligation; the seller can walk at any step.
 *
 * RECO compliance:
 *   - HomeLife G1 attribution + RECO 6024721 on the page.
 *   - No "we buy" principal framing; representation-of-seller throughout.
 *   - No guaranteed price / "guaranteed market value" claims.
 *   - Off-MLS is framed as the seller's documented choice (exclusive
 *     listing + written direction), with the honest "listing openly may
 *     net more" disclosure.
 *   - Multiple representation, where it applies, disclosed in writing.
 *
 * Tracking: Pixel + CAPI Lead event, content_category "Sell Privately".
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function SellPrivatelyPage() {
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
    if (!data.get('first_name') || !data.get('phone')) {
      setError('First name and a phone number so we can reach you.')
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
        trackLead({ content_name: 'Resolve Sell Privately', content_category: 'Sell Privately' }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { phone: (data.get('phone') || '').toString(), email: (data.get('email') || '').toString() },
          custom_data: { content_name: 'Resolve Sell Privately', content_category: 'Sell Privately', source_page: '/sell-privately' },
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

  const STEPS = [
    {
      t: 'A private conversation',
      d: 'You tell us the situation and the property. No obligation, nothing public, no pressure to go further.',
    },
    {
      t: 'An offer, usually within 48 hours',
      d: 'We take it to a cash-ready buyer we know. If the property fits, you get a firm, written offer, often within two days.',
    },
    {
      t: 'You decide',
      d: 'Accept it, counter it, or walk away. Talking to us commits you to nothing, and we will tell you honestly how it compares to listing.',
    },
    {
      t: 'A clean close',
      d: 'If you accept and the buyer’s due diligence checks out, they can close in about a week. No financing delays, no drawn-out conditions.',
    },
  ]

  const BUYERS = [
    {
      icon: Scale,
      t: 'Private investors and small funds',
      d: 'People and groups with cash on hand and clear criteria, who buy to hold or reposition, and who close without a mortgage approval.',
    },
    {
      icon: Users,
      t: 'Builders and renovators',
      d: 'Buyers who take on homes that need work, close on their own timeline, and do not need the place to be showroom-ready first.',
    },
    {
      icon: ShieldCheck,
      t: 'Qualified end-buyers',
      d: 'Ready buyers looking for the right home who can move quickly and firmly when it appears, without conditions dragging it out.',
    },
  ]

  return (
    <>
      <Seo
        title="Sell Your Home Privately, Fast · Resolve"
        description="Need to sell quickly or quietly? Resolve represents you and brings a vetted, cash-ready buyer. A private, no-obligation offer usually within 48 hours, and a close in about a week if you accept. Not a we-buy-houses lowball."
        canonical="https://www.resolverealestate.ca/sell-privately/"
      />

      {/* HERO — light, hook + instant form left, credibility card right */}
      <section className="bg-stone">
        <div className="container py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 items-start">
            {/* LEFT — hook + form / success */}
            <div>
              {!success ? (
                <>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze">
                    Sell privately &middot; Ontario
                  </p>
                  <h1
                    className="mt-4 font-display font-medium text-navy tracking-tight"
                    style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.04 }}
                  >
                    A no-obligation offer in 48 hours.
                  </h1>
                  <p
                    className="mt-3 font-display font-medium italic text-bronze"
                    style={{ fontSize: 'clamp(21px, 3vw, 34px)', lineHeight: 1.12 }}
                  >
                    A cash-ready buyer, without a listing, showings, or the long wait.
                  </p>

                  <p className="mt-6 text-[16px] text-navy-soft leading-relaxed max-w-md">
                    If you need to sell quickly or quietly, we bring you a private offer from a
                    vetted, cash-ready buyer. No sign on the lawn, no parade of showings, nothing
                    public.
                    <span className="block mt-1 font-semibold text-navy">
                      You stay in control, and it costs you nothing to look.
                    </span>
                  </p>

                  <div className="mt-3 inline-flex items-start gap-2 text-[13px] text-navy-soft">
                    <Clock className="h-3.5 w-3.5 text-bronze mt-0.5 shrink-0" />
                    <span>
                      <span className="font-semibold text-navy">Written offer usually within 48 hours.</span>{' '}
                      Accept it and, once the buyer’s review checks out, a close in about a week.
                    </span>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-white border border-divider rounded-[14px] p-6 md:p-7"
                    style={{ boxShadow: '0 4px 20px rgba(5, 26, 44, 0.06)' }}
                  >
                    <input type="hidden" name="_subject" value="Resolve · Sell Privately inquiry" />
                    <input type="hidden" name="source_page" value="/sell-privately" />

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="sp-first-name" className="block text-[13px] font-medium text-navy-soft mb-1.5">
                          First name <span className="text-bronze">*</span>
                        </label>
                        <input
                          ref={firstFieldRef}
                          id="sp-first-name"
                          name="first_name"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="sp-phone" className="block text-[13px] font-medium text-navy-soft mb-1.5">
                          Phone <span className="text-bronze">*</span>
                        </label>
                        <input
                          id="sp-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          className="w-full px-4 py-3 border border-divider rounded-[8px] text-[16px] text-navy bg-white focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="sp-address" className="block text-[13px] font-medium text-navy-soft mb-1.5">
                          Property address <span className="text-navy-mute font-normal">(optional)</span>
                        </label>
                        <input
                          id="sp-address"
                          name="address"
                          type="text"
                          autoComplete="street-address"
                          placeholder="Helps us line up the right buyer"
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
                      {submitting ? 'Sending…' : 'Get a private offer'}
                    </button>

                    <p className="mt-3 text-center text-[13px] text-navy-soft">
                      Or call directly:{' '}
                      <a href="tel:+13656457332" className="text-bronze hover:text-bronze-deep font-semibold transition-colors">
                        (365) 645-7332
                      </a>
                    </p>
                  </form>

                  <p className="mt-4 text-[12px] text-navy-mute tracking-wide flex items-center gap-1.5">
                    <Lock className="h-3 w-3" />
                    We represent you, not the buyer &middot; No obligation &middot; RECO Reg. No. 6024721
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
                        Often within 2. We will talk through your situation privately, and if a
                        buyer fits, we will line up a no-obligation offer. Nothing is public and you
                        are committed to nothing.
                      </p>
                      <p className="mt-5 text-[14px] text-navy-mute">
                        Need to talk sooner? Call{' '}
                        <a href="tel:+13656457332" className="text-bronze hover:text-bronze-deep font-semibold">
                          (365) 645-7332
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — navy credibility card */}
            <div className="lg:mt-2">
              <div className="rounded-[16px] bg-navy p-7 md:p-8 shadow-card">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze">
                  Why sellers trust this
                </p>
                <p className="mt-4 font-display font-medium text-stone text-[22px] leading-snug">
                  A former real estate lawyer, on your side of the table.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-stone/80">
                  Taran spent a decade in real estate law before moving to the deal side. On a
                  private sale he represents <span className="italic text-bronze">you</span>, reads
                  the offer the way a lawyer reads it, and makes sure the terms hold up. The buyer is
                  never us.
                </p>
                <div className="mt-6 space-y-2.5">
                  {[
                    'We represent the seller, always',
                    'Real, vetted, cash-ready buyers',
                    'A fair offer, not a take-it lowball',
                    'No obligation, walk away anytime',
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-2.5 text-[14.5px] text-stone/90">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-bronze/20 text-bronze">
                        <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden="true" />
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[12px] leading-relaxed text-stone/55">
                  Taran Aujla, Salesperson &middot; HomeLife G1 Realty Inc., Brokerage &middot; RECO
                  Reg. No. 6024721
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream">
        <div className="container section-y">
          <div className="max-w-3xl">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              How it works
            </p>
            <h2 className="mt-3 font-display font-medium text-navy text-display-md">
              Four steps, and you can stop at any of them.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
            {STEPS.map((s, i) => (
              <div key={s.t} className="flex gap-4">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-navy text-stone font-display font-medium text-[15px]">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-medium text-navy text-[19px] leading-snug">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-[15.5px] text-navy-soft leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO OUR BUYERS ARE */}
      <section className="bg-stone">
        <div className="container section-y">
          <div className="max-w-3xl">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              Who is on the other side
            </p>
            <h2 className="mt-3 font-display font-medium text-navy text-display-md">
              Real buyers we know, not an anonymous number.
            </h2>
            <p className="mt-4 text-[16.5px] text-navy-soft leading-relaxed">
              The problem with &ldquo;we buy houses&rdquo; ads is you never know who is behind them.
              Ours are people we have worked with and vetted, and every one of them can close without
              waiting on a bank.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {BUYERS.map((b) => (
              <div key={b.t} className="rounded-[14px] border border-divider bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze/12 text-bronze">
                  <b.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display font-medium text-navy text-[18px] leading-snug">
                  {b.t}
                </h3>
                <p className="mt-2 text-[14.5px] text-navy-soft leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE ARE DIFFERENT — navy contrast */}
      <section className="bg-navy">
        <div className="container section-y">
          <div className="max-w-3xl">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              The difference
            </p>
            <h2 className="mt-3 font-display font-medium text-stone text-display-md">
              This is not a &ldquo;we buy cash&rdquo; lowball.
            </h2>
            <p className="mt-4 text-[16.5px] text-stone/80 leading-relaxed">
              A private sale trades a little top-dollar for certainty, speed, and privacy. That is a
              fair trade for a lot of people, but only if it is made with eyes open. So we make the
              comparison plain instead of hiding it.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            <div className="rounded-[14px] border border-stone/15 p-6 md:p-7">
              <p className="font-display font-medium text-stone/70 text-[17px]">
                The usual cash-buyer
              </p>
              <div className="mt-4 space-y-3">
                {[
                  'The buyer is the one advertising to you',
                  'One take-it-or-leave-it number',
                  'Pressure to sign fast',
                  'You never learn what it was really worth',
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2.5 text-[14.5px] text-stone/70">
                    <X className="h-4 w-4 flex-none mt-0.5 text-stone/40" strokeWidth={2.2} aria-hidden="true" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-bronze/40 bg-bronze/[0.06] p-6 md:p-7">
              <p className="font-display font-medium text-bronze text-[17px]">Resolve</p>
              <div className="mt-4 space-y-3">
                {[
                  'We represent you, and bring the buyer to you',
                  'A fair offer you can weigh, counter, or refuse',
                  'No obligation, no pressure, walk anytime',
                  'We show you honestly how it compares to listing',
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2.5 text-[14.5px] text-stone/90">
                    <Check className="h-4 w-4 flex-none mt-0.5 text-bronze" strokeWidth={2.4} aria-hidden="true" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE HONEST PART — compliance / trust */}
      <section className="bg-stone">
        <div className="container section-y">
          <div className="mx-auto max-w-3xl rounded-[18px] border border-divider bg-white p-7 sm:p-10 shadow-card">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              The honest part
            </p>
            <h2 className="mt-3 font-display font-medium text-navy text-[26px] sm:text-[30px] leading-snug">
              A private sale is a choice, and not always the right one.
            </h2>
            <div className="mt-5 space-y-4 text-[16px] text-navy-soft leading-relaxed">
              <p>
                Kept off the open market, your home does not get the full market&rsquo;s exposure,
                which can affect price. When listing openly would serve you better, we will tell you
                so, plainly, before you decide anything.
              </p>
              <p>
                If a private sale is right for you, you sign an exclusive listing agreement and a
                written direction to keep it off MLS, so the record shows the decision was yours. We
                represent you and your interest throughout. If a buyer we bring is also our client,
                that is disclosed to you in writing before anything moves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy">
        <div className="container section-y">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-medium text-stone text-display-md leading-[1.1]">
              A quiet conversation, on your terms.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-stone/80">
              Tell us what is happening. If a private sale fits, you will have a no-obligation offer
              in front of you within about 48 hours. If it does not, we will tell you that too.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="tel:+13656457332"
                className="inline-flex items-center justify-center gap-2 bg-bronze hover:bg-bronze-deep text-white font-semibold py-4 px-7 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Call (365) 645-7332
              </a>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="inline-flex items-center justify-center gap-2 border border-stone/40 text-stone hover:bg-stone/10 font-semibold py-4 px-7 rounded-[8px] uppercase tracking-[0.10em] text-[13px] transition-all"
              >
                Get a private offer
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-10 text-[12px] leading-relaxed text-stone/55">
              Real estate services by Resolve, delivered through HomeLife G1 Realty Inc., Brokerage.
              Independently Owned &amp; Operated. RECO Reg. No. 6024721. A private-sale offer is not
              guaranteed and depends on the property and a buyer&rsquo;s own due diligence.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
