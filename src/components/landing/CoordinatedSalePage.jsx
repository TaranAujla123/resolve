import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { CoordinatedSale } from './CoordinatedSale'

/**
 * /coordinated-sale — the shareable link.
 *
 * Not in the nav. Sent directly to (a) homeowners whose sale may not cover
 * what is owing and (b) lender counsel, e.g. with the SOP-01 letter. A
 * neutral title on purpose: a homeowner opening it from a text should not
 * land on a "Power of Sale" headline. The body is the shared
 * CoordinatedSale section used on /sellers, /mortgage-arrears and
 * /power-of-sale.
 */
export function CoordinatedSalePage() {
  return (
    <>
      <section data-surface="navy" className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20">
        <HeroBackdrop />
        <div className="relative container w-full pt-28 pb-14 sm:pt-36 sm:pb-16">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-bronze">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-bronze-deep transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Resolve
              </Link>
              <span aria-hidden="true" className="text-stone/40">·</span>
              <span className="text-stone/80">Coordinated sale</span>
            </p>
            <h1 className="mt-5 font-display font-medium text-stone text-display-md sm:text-display-lg leading-[1.1] text-balance">
              When the sale may not cover everything owed.
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-stone/85 max-w-xl">
              A coordinated sale puts the homeowner, the lender and both
              lawyers on the same numbers and the same timetable. This page
              explains how it works and what each side gets from it, for
              homeowners and for lenders and their counsel alike.
            </p>
            <p className="mt-6 text-[13px] leading-relaxed text-stone/55">
              Taran Aujla, Salesperson &middot; former real estate lawyer &middot; HomeLife G1
              Realty Inc., Brokerage
            </p>
          </div>
        </div>
      </section>
      <CoordinatedSale ctaHref="/contact" eyebrow="How it works" />
    </>
  )
}
