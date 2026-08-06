import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import { BothSides } from './BothSides'
import { ClosingCta } from './ClosingCta'
import heroImage from '/hero-v3-a.jpg?url'

/**
 * HomePage — the root (/) HUB (Aug 2026 restructure).
 *
 * The root used to be the seller page. Because paid traffic goes to
 * dedicated landing pages and only organic / brand / direct / referral
 * visitors land on "/", the home's real job is ORIENTATION, not
 * conversion — so it is now a lean router:
 *
 *   1. Hub hero      — navy, compact. The two-sided thesis in one line.
 *   2. BothSides     — the two audience doors (For Sellers -> /sellers,
 *                       For Buyers -> /buyers). The primary choice.
 *   3. Multiplex     — the flagship specialty band, framed as the thing
 *                       that spans both sides -> /multiplex. Placed UNDER
 *                       the two doors so it reads as "our specialty", not
 *                       a competing third audience.
 *   4. ClosingCta    — the close.
 *
 * The full seller experience lives at /sellers (SellersPage); the buyer
 * experience at /buyers; the multiplex hub at /multiplex.
 */
export function HomePage() {
  return (
    <>
      {/* Hub hero — full-bleed navy hallway image (brand hero), pulled up
          under the sticky header. Same photographic language as /sellers so
          the root reads unmistakably as the same house, then hands off to
          the two doors below. */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate min-h-[730px] sm:min-h-[600px] lg:min-h-[640px] -mt-16 sm:-mt-20"
      >
        {/* Mobile-first: the doorway is cropped toward the warm light and
            the lower scrim stays light, so on a phone the image is the
            obvious hero beneath the copy — not a dark wash. */}
        <img
          src={heroImage}
          alt="A home hallway opening onto a room filled with warm light"
          className="absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[60%_center]"
          loading="eager"
          decoding="async"
          draggable={false}
        />
        {/* Light unifying tint so the doorway glow survives. */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy/38" />
        {/* Desktop scrim — heavy left so the headline seats, doorway glows right. */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-gradient-to-r from-navy via-navy/72 to-navy/15"
        />
        {/* Mobile scrim — dark enough behind the copy (top ~half) to keep
            the stone headline crisp, then opens up so the lower half of the
            hero is a clear, obvious doorway image on a phone. */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,31,68,0.92) 0%, rgba(10,31,68,0.80) 42%, rgba(10,31,68,0.30) 66%, rgba(10,31,68,0.06) 100%)',
          }}
        />

        <div className="relative container w-full pt-28 pb-16 sm:pt-40 sm:pb-24">
          <div className="max-w-[620px]">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-bronze flex-shrink-0" />
              <p className="font-sans font-semibold text-[12.5px] uppercase tracking-[0.18em] text-bronze">
                Ontario Real Estate
              </p>
            </div>

            <h1 className="mt-6 font-sans font-semibold text-stone leading-[1.08] tracking-[-0.015em] text-[clamp(2.4rem,5.2vw,3.9rem)]">
              We find the value
              <br />
              most people{' '}
              <span className="font-emph italic font-normal text-bronze">miss.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-[1.62] text-stone-soft">
              Resolve works both sides of the table. For sellers, the complex
              and high-value sales a standard listing can&rsquo;t do justice.
              For buyers, the upside most people scroll past. Two clients, one
              eye for the details that decide the outcome.
            </p>

            <p className="mt-8 font-sans font-semibold text-[12px] uppercase tracking-[0.16em] text-stone-mute">
              GTA &middot; Hamilton &middot; Kitchener-Waterloo &middot; Ottawa
            </p>
          </div>
        </div>
      </section>

      {/* The two audience doors */}
      <BothSides />

      {/* Multiplex Advantage — the flagship specialty (navy) */}
      <section data-surface="navy" className="bg-navy section-y">
        <div className="container max-w-4xl">
          <Eyebrow>The Specialty</Eyebrow>
          <h2 className="mt-4 font-display font-medium text-stone text-display-lg leading-[1.1]">
            The Multiplex{' '}
            <span className="font-display italic text-bronze">Advantage.</span>
          </h2>
          <p className="mt-6 max-w-[650px] text-[17px] leading-relaxed text-stone/85">
            Whether you are selling a lot that could hold more, or buying one to
            build on, this is where we go deepest. Under Ontario&rsquo;s new
            rules many lots can support three to six units, and we bring the
            strategy and a build partner to turn it into a plan, subject to city
            by-laws, permits and a site-specific review.
          </p>
          <div className="mt-8">
            <Button as={Link} to="/multiplex" variant="contrast" size="lg">
              Explore the Multiplex Advantage <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
