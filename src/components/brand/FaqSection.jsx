import React from 'react'
import { SITUATION_FAQS } from '@/content/situationFaqs'

/**
 * FaqSection: the visible, crawlable "Common questions" block for pages
 * outside SituationPage (14 Nov 2026: /working-with-lenders, /coordinated-sale,
 * /sellers). Same markup as the SituationPage FAQ. The FAQPage JSON-LD for the
 * slug is built in App.jsx from the same SITUATION_FAQS entry, so the
 * structured data always matches what is on the page.
 */
export function FaqSection({ slug, heading, surface = 'stone' }) {
  const faqs = SITUATION_FAQS[slug]
  if (!faqs || !faqs.length) return null
  const bg = surface === 'white' ? 'bg-white' : 'bg-stone'
  return (
    <section data-surface={surface} className={bg} id="questions">
      <div className="container section-y">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
            Common questions
          </p>
          <h2 className="mt-3 font-display font-medium text-navy text-display-md">
            {heading}
          </h2>
          <dl className="mt-8 divide-y divide-divider">
            {faqs.map((item) => (
              <div key={item.q} className="py-6 first:pt-0">
                <dt className="font-display font-medium text-navy text-[19px] sm:text-[20px] leading-snug">
                  {item.q}
                </dt>
                <dd className="mt-3 text-[16.5px] text-navy-soft leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
