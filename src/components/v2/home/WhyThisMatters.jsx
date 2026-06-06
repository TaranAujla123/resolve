import React from 'react'
import { Eyebrow } from '@/components/brand/Eyebrow'

/**
 * WhyThisMatters — the page's single Rose Wash empathy beat.
 *
 * Replaces the (removed) Testimonial section in the home page surface
 * rhythm. The page still needs one moment that breaks from the
 * informational / advisory register and acknowledges the human
 * stakes — that's what this block does, without putting an
 * unverified quote on the page.
 *
 * Per Brand-System-V2/colors.md, Rose Wash (#F2E8DC) is used at most
 * once per page. This is its slot.
 *
 * Surface mark: data-surface="rose" so the surface-rhythm audit can
 * confirm the page hits all four tones.
 */
export function WhyThisMatters() {
  return (
    <section
      data-surface="rose"
      className="bg-rose section-y"
      aria-label="Why this matters"
    >
      <div className="container">
        <div className="max-w-[720px] mx-auto text-center">
          <Eyebrow>Why This Matters</Eyebrow>
          <h2
            className="
              mt-5 font-display font-medium italic text-navy
              text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.18]
            "
          >
            Selling a home in a hard moment isn&rsquo;t a transaction.
            It&rsquo;s a turning point.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-soft">
            We built Resolve for the months when the bank&rsquo;s tone has
            changed, the estate has to be settled, or the marriage has
            ended. Quiet handling, measured pace, and a clear path through.
          </p>
        </div>
      </div>
    </section>
  )
}
