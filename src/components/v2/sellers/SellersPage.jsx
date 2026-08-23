import React from 'react'
import { Hero } from '../home/Hero'
import { Situations } from '../home/Situations'
import { WhyResolve } from '../home/WhyResolve'
import { HowWeHelp } from '../home/HowWeHelp'
import { ClosingCta } from '../home/ClosingCta'

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
export function SellersPage() {
  return (
    <>
      <Hero
        headline={
          <>
            Selling under pressure doesn&rsquo;t mean
            <br />
            selling in the open.{' '}
            <span className="font-emph italic font-normal text-bronze">We keep it discreet.</span>
          </>
        }
      />
      <Situations />
      <WhyResolve />
      <HowWeHelp />
      <ClosingCta />
    </>
  )
}
