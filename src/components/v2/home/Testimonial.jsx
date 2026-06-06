import React from 'react'

/**
 * Testimonial — V2 home page testimonial section.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Home —
 * Testimonial). This is the page's Rose Wash moment — the empathy beat.
 * Max one Rose Wash section per page; do not duplicate elsewhere.
 *
 * Layout: centered, max-width 720px, Newsreader italic quote bounded
 * by large bronze opening + closing quote marks.
 *
 * NOTE: copy below is a placeholder pattern from the brand brief. Mark
 * as placeholder until a real testimonial is captured.
 */
export function Testimonial() {
  return (
    <section data-surface="rose" className="bg-rose section-y">
      <div className="container">
        <figure className="max-w-[720px] mx-auto text-center">
          <span
            aria-hidden="true"
            className="font-display font-medium text-bronze leading-none select-none"
            style={{ fontSize: '88px' }}
          >
            &ldquo;
          </span>

          <blockquote className="
            -mt-4
            font-display font-medium italic text-navy
            text-[24px] sm:text-[28px] lg:text-[30px]
            leading-[1.35] tracking-[-0.005em]
          ">
            They handled a very difficult situation with professionalism,
            compassion and complete discretion. The outcome was better than we
            expected and the process was far less stressful than we imagined.
          </blockquote>

          <span
            aria-hidden="true"
            className="block font-display font-medium text-bronze leading-none select-none rotate-180"
            style={{ fontSize: '64px' }}
          >
            &ldquo;
          </span>

          <figcaption className="
            mt-4 font-sans font-semibold uppercase
            tracking-[0.18em] text-[12px] text-bronze
          ">
            — Past Client
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
