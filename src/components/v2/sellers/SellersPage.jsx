import React from 'react'
import { Hero } from '../home/Hero'
import { Situations } from '../home/Situations'
import { WhyResolve } from '../home/WhyResolve'
import { HowWeHelp } from '../home/HowWeHelp'
import { ClosingCta } from '../home/ClosingCta'
import { CoordinatedSale } from '@/components/landing/CoordinatedSale'

/**
 * SellersPage — /sellers.
 *
 * This is the former home page: the full seller experience (the sharp
 * "Selling isn't always straightforward" hero, the situation grid, the
 * "we solve property problems" thesis, the proof pillars, the process,
 * and the close). It moved off the root when the home became a two-sided
 * hub (Aug 2026). The header "For Sellers" nav and the home's seller door
 * both land here. Seller-focused SEO keywords live on this route.
 *
 * The BothSides two-door block is intentionally NOT here (it lives on the
 * hub home); this page is the seller side, start to finish.
 */
/* The comparison guide, offered to sellers who are reading, not ready to
   call. Links to the static landing page (full reload, so <a>, not Link). */
function GuideBand() {
  return (
    <section data-surface="cream" className="bg-cream">
      <div className="container py-12 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">A short guide</p>
            <h2 className="mt-3 font-display font-medium text-navy text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.15]">
              The bank sells it.{' '}
              <span className="italic text-bronze">Or you do.</span>
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-soft">
              The two ways a mortgaged home ends up sold, side by side: what each
              costs, who decides, and what you are left with.
            </p>
          </div>
          <a
            href="/bank-sells-it-or-you-do/"
            className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3.5 font-sans font-semibold text-[15px] text-stone hover:bg-navy/90 transition-colors whitespace-nowrap"
          >
            Get the guide
          </a>
        </div>
      </div>
    </section>
  )
}

export function SellersPage() {
  return (
    <>
      <Hero />
      <Situations />
      <WhyResolve />
      <HowWeHelp />
      <CoordinatedSale ctaHref="/contact" />
      <GuideBand />
      <ClosingCta />
    </>
  )
}
