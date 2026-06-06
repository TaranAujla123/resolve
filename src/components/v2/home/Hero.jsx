import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Phone, Lock, Check } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import heroStillLife from '/hero-stilllife.jpg?url'

/**
 * Hero — V2 home page hero (creative refinement pass).
 *
 * Replaces the earlier card-shaped image with a true full-bleed photo
 * that extends from the right viewport edge into the hero space, with a
 * soft cream-stone gradient fading across its left edge so the image
 * and the type read as one composition rather than two boxes.
 *
 * Editorial moves layered in on top of the brief's spec:
 *   - A thin bronze hairline above the eyebrow signals "this is a
 *     considered piece of editorial design", not a SaaS landing.
 *   - The headline couplet sits in a tighter measure so the eye reads
 *     "Selling isn't always straightforward / We make it clearer." as
 *     one breath, not two stacked sentences.
 *   - The situation list moves to a single column (not two) — feels
 *     more advisory and less SEO-list, gives the right column more air.
 *
 * Surface: Warm Stone. Image is full-height of the hero, object-cover,
 * positioned so the vase/branches sit roughly on the visual third.
 */
// Six situation labels rendered as outline pills directly under the
// headline so a visitor recognises "this is property — and is for me"
// in the first second. Pills wrap naturally (2 columns mobile, 3 on
// tablet+, fits in 2 lines on the desktop hero column). Each pill
// links to its deep-dive page.
const SITUATIONS = [
  { label: 'Mortgage Arrears',     to: '/mortgage-arrears' },
  { label: 'Power of Sale',        to: '/power-of-sale' },
  { label: 'Separation & Divorce', to: '/divorce-real-estate' },
  { label: 'Ownership Disputes',   to: '/property-disputes' },
  { label: 'Estate Sales',         to: '/estate-sale' },
  { label: 'Time-Sensitive Sales', to: '/life-transitions' },
]

export function Hero() {
  return (
    <section
      data-surface="stone"
      className="relative bg-stone overflow-hidden isolate"
    >
      {/* Full-bleed still-life image on the right. On desktop it covers
          the right ~55% of the section; on mobile it stacks beneath
          the text via the structure below. */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[55%] pointer-events-none">
        <img
          src={heroStillLife}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Left-edge fade into stone so the image blends rather than
            butts against the text column. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[280px] bg-gradient-to-r from-stone to-transparent"
        />
        {/* Subtle top + bottom feathering for editorial finish. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-stone/70 to-transparent"
        />
      </div>

      <div className="relative container">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_1fr] gap-10 lg:gap-16 py-14 sm:py-20 lg:py-28">
          <div className="max-w-[560px]">
            {/* Thin bronze hairline — editorial signature */}
            <div
              aria-hidden="true"
              className="h-px w-12 bg-bronze mb-7"
            />

            <p className="font-sans font-semibold text-[12.5px] uppercase tracking-[0.22em] text-bronze">
              Seller Representation for Ontario Homeowners
            </p>

            <h1 className="mt-7 font-display font-medium text-navy leading-[1.04] tracking-[-0.012em] text-[clamp(2.5rem,5.2vw,4.5rem)]">
              Selling isn&rsquo;t<br />
              always straightforward.
            </h1>
            {/* Color split per user direction: "We make it" stays navy
                so the headline owns the visual register; only "clearer."
                takes the bronze emphasis. Stops the bronze from
                competing with the warm-toned hero image to the right —
                the eye lands on the headline first, then drifts to
                the single bronze word as the resolution. */}
            <p
              className="mt-2 font-display font-medium italic leading-[1.04] tracking-[-0.012em] text-[clamp(2.25rem,4.8vw,4rem)]"
            >
              <span className="text-navy">We make it </span>
              <span className="text-bronze">clearer.</span>
            </p>

            {/* Situation pills — six outline chips directly under the
                headline. Stand out visually so the recognition is
                instant: "this is property, and yes, my situation is
                here." Each pill links to its deep-dive page; hover
                fills bronze.

                Layout: 2-column grid on mobile (consistent alignment
                regardless of label length — was wrap-misaligned at
                xs width), 3 per row on tablet+, natural-width row on
                desktop. */}
            <ul className="
              mt-7 grid gap-2
              grid-cols-2 sm:grid-cols-3
            ">
              {SITUATIONS.map((s) => (
                <li key={s.label} className="flex">
                  <Link
                    to={s.to}
                    className="
                      inline-flex items-center justify-center w-full
                      px-3 sm:px-4 py-2 rounded-full
                      border border-bronze-deep
                      font-sans font-semibold text-[12.5px] sm:text-[13.5px] leading-none text-navy
                      hover:bg-bronze hover:border-bronze hover:text-stone
                      transition-colors duration-200
                      text-center
                    "
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-md text-[17px] leading-[1.55] text-navy-soft">
              We help Ontario homeowners navigate difficult property
              situations and sell with greater clarity and confidence.
            </p>

            {/* Two-button CTA. "Request Free Consultation" trimmed
                down from "Request a Private Consultation" so the row
                fits on a single line at the column width together
                with the phone CTA. */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="md"
                className="justify-center"
              >
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                Request Free Consultation
              </Button>
              <Button
                as="a"
                href="tel:+13656457332"
                variant="outline"
                size="md"
                className="justify-center text-navy"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                Call (365) 645-7332
              </Button>
            </div>

            {/* Trust pill row — four micro-signals separated by tiny
                navy-mute middots. Inline-flex on the whole row keeps
                them in a single clean line at the column width. Each
                pill carries a bronze check so they read as
                commitments, not specs. */}
            <ul className="mt-5 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-navy-soft">
              {['Confidential', 'Boutique practice', 'No obligation', 'Serving Ontario'].map((label, idx, arr) => (
                <li key={label} className="inline-flex items-center gap-1">
                  <Check className="h-3 w-3 text-bronze flex-shrink-0" strokeWidth={2.6} />
                  <span className="font-semibold text-navy">{label}</span>
                  {idx < arr.length - 1 && (
                    <span aria-hidden="true" className="text-navy-mute/40 select-none ml-1">&middot;</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Brokerage attribution under the trust row — RECO Bulletin
                5.1 visibility in the first viewport even for visitors
                who never scroll. Practitioner-style "Resolve is a name,
                not a brokerage" disclosure satisfies TRESA framing. */}
            <p className="mt-5 max-w-[560px] text-[12px] text-navy-mute leading-relaxed">
              Real estate services by Resolve, delivered through{' '}
              <span className="font-semibold text-navy-soft">
                HomeLife G1 Realty Inc., Brokerage
              </span>
              . Independently Owned &amp; Operated. &ldquo;Resolve&rdquo; is a
              name used in connection with these services and is not itself a
              brokerage.
            </p>
          </div>

          {/* On mobile the still-life image is intentionally suppressed.
              It read as a disconnected block under the CTA + trust row
              and added scroll length without telling the visitor
              anything new. The desktop hero still carries the image
              behind the text column (absolute-positioned above). */}

          {/* Right column spacer — empty on desktop because the image is
              absolutely positioned behind it. Reserved so the text
              column doesn't span the full width. */}
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
