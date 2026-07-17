import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Phone, Lock, Check } from 'lucide-react'
import { Button } from '@/components/brand/Button'
import heroStillLife from '/hero-stilllife.jpg?url'

/**
 * Hero — V2 home page hero (full-bleed image-on-navy pass).
 *
 * The architectural-passage photo (doorway with warm light entering a
 * dark hallway) now serves as a full-bleed background for the entire
 * hero, not a side panel. The image has a darker left side (hallway
 * wall) and a brighter right side (the doorway and the light spilling
 * out of it), so the natural composition does the heavy lifting:
 *
 *   - Desktop: a horizontal navy scrim deepens the LEFT half of the
 *     image where the text column lives, fades to nearly transparent
 *     over the RIGHT half so the doorway light reads cleanly.
 *
 *   - Mobile: object-position favors the left/wall side so the dark
 *     area fills the viewport behind the text. A softer vertical
 *     navy gradient keeps every line of text readable while still
 *     letting the warm light glow through at the bottom-right.
 *
 * Color register flips from V2 "Stone surface" to "Navy surface":
 *   - Type: stone (light cream) instead of navy
 *   - Italic emphasis: stays bronze (still the on-brand accent)
 *   - Pills: bronze hairline border + stone text on a faint navy
 *     scrim, so they read as quiet chips, not heavy buttons
 *   - Primary CTA: BRONZE fill instead of navy fill — navy would
 *     vanish against the navy-scrimmed image
 *   - Outline CTA: stone border + stone text
 *   - Brokerage attribution: stone/70 with the brokerage name in
 *     full stone weight so it still passes the "clearly and
 *     prominently identified" RECO Bulletin 5.1 test
 */
// Four situation labels rendered as outline pills directly under the
// headline so a visitor recognises "this is property — and is for me"
// in the first second. Practice deliberately focused on financially-
// motivated sales; separation/divorce and ownership-dispute files were
// intentionally removed from the practice — those files carry emotional
// and litigious loads that do not match the practitioner voice or fit.
// Order deliberate: Arrears + PoS lead (primary paid-media anchors),
// Estate + TSS follow (referral-driven, cleaner mechanics).
const SITUATIONS = [
  { label: 'Mortgage Arrears',     to: '/mortgage-arrears' },
  { label: 'Power of Sale',        to: '/power-of-sale' },
  { label: 'Estate Sales',         to: '/estate-sale' },
  { label: 'Time-Sensitive Sales', to: '/time-sensitive-sales' },
]

export function Hero() {
  return (
    <section
      data-surface="navy"
      className="relative bg-navy overflow-hidden isolate"
    >
      {/* Full-bleed background image. object-cover keeps the aspect
          right; object-position favors the LEFT (dark wall) side so the
          text column overlays the darkest part of the photograph and
          the warm doorway light stays visible to the right / lower
          right of the frame on every viewport. */}
      <img
        src={heroStillLife}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 w-full h-full object-cover
          object-[30%_center] lg:object-[60%_center]
        "
        loading="eager"
        decoding="async"
      />

      {/* Desktop scrim — horizontal navy gradient from heavy LEFT
          (where the text column lives) fading to nearly transparent
          on the RIGHT so the doorway light reads cleanly through the
          image. Hidden below lg where the layout is single-column. */}
      <div
        aria-hidden="true"
        className="
          hidden lg:block absolute inset-0
          bg-gradient-to-r from-navy/90 via-navy/60 to-navy/15
        "
      />

      {/* Mobile scrim — vertical navy gradient: deep at the top where
          the headline lands, eased through the middle, and pulled back
          up at the bottom so the brokerage attribution stays legible
          against the warm light spilling in at the bottom of the image. */}
      <div
        aria-hidden="true"
        className="
          lg:hidden absolute inset-0
          bg-gradient-to-b from-navy/85 via-navy/60 to-navy/80
        "
      />

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

            <h1 className="mt-7 font-display font-medium text-stone leading-[1.04] tracking-[-0.012em] text-[clamp(2.5rem,5.2vw,4.5rem)]">
              Selling isn&rsquo;t<br />
              always straightforward.
            </h1>
            {/* Color split: "We make it" carries the stone weight of
                the headline; only "clearer." takes the bronze emphasis.
                On the navy-scrimmed image the bronze italic reads as
                the resolution — the single word that lands. */}
            <p
              className="mt-2 font-display font-medium italic leading-[1.04] tracking-[-0.012em] text-[clamp(2.25rem,4.8vw,4rem)]"
            >
              <span className="text-stone">We make it </span>
              <span className="text-bronze">clearer.</span>
            </p>

            {/* Situation pills — six chips directly under the headline.
                Stone text on a faint navy scrim with a bronze hairline
                border. backdrop-blur gives them a quiet glass quality
                so the image still breathes through them but the
                labels stay crisp.

                Layout: 2-column grid on mobile (consistent alignment
                regardless of label length), 3 per row on tablet+, on
                desktop they wrap naturally within the text column. */}
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
                      border border-bronze/70
                      bg-navy/30 backdrop-blur-[2px]
                      font-sans font-semibold text-[12.5px] sm:text-[13.5px] leading-none text-stone
                      hover:bg-bronze hover:border-bronze hover:text-navy
                      transition-colors duration-200
                      text-center
                    "
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-md text-[17px] leading-[1.55] text-stone/90">
              We help Ontario homeowners navigate difficult property
              situations and sell with greater clarity, confidence, and
              equity as the priority.
            </p>

            {/* Two-button CTA.
                Primary: BRONZE fill (overrides Button's default navy
                fill — navy would disappear into the navy-scrimmed
                background).
                Outline: stone border + stone text so it reads against
                the dark backdrop. */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="md"
                className="
                  justify-center
                  !bg-bronze !text-navy !border-bronze
                  hover:!bg-bronze-deep hover:!border-bronze-deep
                "
              >
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                Request Free Consultation
              </Button>
              <Button
                as="a"
                href="tel:+13656457332"
                variant="outline"
                size="md"
                className="justify-center text-stone border-stone/50 hover:bg-stone/10"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                Call (365) 645-7332
              </Button>
            </div>

            {/* Trust pill row — four micro-signals separated by tiny
                middots. Each pill carries a bronze check; labels in
                stone so they read on the dark backdrop. */}
            <ul className="mt-5 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px]">
              {['Confidential', 'Boutique practice', 'No obligation', 'Serving Ontario'].map((label, idx, arr) => (
                <li key={label} className="inline-flex items-center gap-1">
                  <Check className="h-3 w-3 text-bronze flex-shrink-0" strokeWidth={2.6} />
                  <span className="font-semibold text-stone">{label}</span>
                  {idx < arr.length - 1 && (
                    <span aria-hidden="true" className="text-stone/40 select-none ml-1">&middot;</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Brokerage attribution under the trust row — RECO Bulletin
                5.1 visibility in the first viewport even for visitors
                who never scroll. Stone/70 body, full-stone brokerage
                name so it still passes "clearly and prominently
                identified" against the navy hero. */}
            <p className="mt-5 max-w-[560px] text-[12px] text-stone/70 leading-relaxed">
              Real estate services by Resolve, delivered through{' '}
              <span className="font-semibold text-stone">
                HomeLife G1 Realty Inc., Brokerage
              </span>
              . Independently Owned &amp; Operated. &ldquo;Resolve&rdquo; is a
              name used in connection with these services and is not itself a
              brokerage.
            </p>
          </div>

          {/* Right column spacer — empty on desktop because the image
              fills the entire hero behind it. Reserved so the text
              column doesn't span the full width and the doorway-light
              focal point sits in the right half of the frame. */}
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
