import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * RelatedSituations — internal cross-linking block rendered at the bottom
 * of every situation deep-dive page.
 *
 * Purpose:
 *   1. SEO. Internal linking between topically related pages strengthens
 *      Google's understanding of the site's topic cluster and distributes
 *      link equity across the situation pages.
 *   2. Conversion. Visitors who arrived for one situation often have an
 *      adjacent one in play (separation + estate, arrears + power of sale,
 *      etc.). The block surfaces the next most relevant page without
 *      requiring the visitor to navigate back to the homepage.
 *
 * Each situation page passes its own slug in via `excludeSlug`; the
 * component renders three cards drawn from the remaining situations in
 * a fixed order tuned per-page in the parent.
 */

const ALL_SITUATIONS = {
  'mortgage-arrears': {
    title: 'Mortgage Arrears',
    blurb: 'Selling before the lender takes the timeline.',
  },
  'power-of-sale': {
    title: 'Power of Sale',
    blurb: 'Lender enforcement is running. Move before it accelerates.',
  },
  'divorce-real-estate': {
    title: 'Separation or Divorce',
    blurb: 'The matrimonial home, handled neutrally between both parties.',
  },
  'estate-sale': {
    title: 'Estate or Probate',
    blurb: 'Executor-led sales, at the pace the estate allows.',
  },
  'property-disputes': {
    title: 'Property Disputes',
    blurb: 'Partition, co-ownership, lien, title cloud. Coordinated with counsel.',
  },
  'life-transitions': {
    title: 'Life Transitions',
    blurb: 'Relocation, downsizing, retirement, family-driven moves.',
  },
}

export function RelatedSituations({ relatedSlugs }) {
  const items = relatedSlugs
    .map((slug) => ({ slug, ...ALL_SITUATIONS[slug] }))
    .filter((it) => it.title)

  if (items.length === 0) return null

  return (
    <section className="border-t border-surface-line">
      <div className="container section-y">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep text-center">
            Other situations we handle
          </p>
          <h2 className="mt-3 text-center text-display-md text-ink font-display font-medium">
            Adjacent files we represent.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((it) => (
              <Link
                key={it.slug}
                to={`/${it.slug}`}
                className="group bg-white rounded-2xl border border-surface-line p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300 flex flex-col"
              >
                <h3 className="text-[1.05rem] font-semibold text-ink">{it.title}</h3>
                <p className="mt-2.5 text-[14.5px] text-ink-soft leading-relaxed flex-1">
                  {it.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent-deep">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
