import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Hero text renders statically so the headline is fully visible from frame 1.
// Only the CTA row, trust row, and footnote get a short fade-up entrance.
const polish = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.05 },
  }),
}

const trustItems = [
  'Confidential',
  'Boutique practice',
  'No obligation',
  'Serving Ontario',
]

const heroLanes = [
  'Mortgage Arrears',
  'Power of Sale',
  'Separation',
  'Disputes',
  'Estate Sales',
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-fade">
      <div className="container section-y relative">
        <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <span aria-hidden="true" className="block h-px w-8 sm:w-10 flex-shrink-0 bg-accent-deep" />
          <span>Resolve &middot; For Ontario Homeowners</span>
        </p>
        <h1 className="mt-4 text-display-xl text-ink max-w-4xl font-semibold">
          Facing a difficult property situation?
        </h1>
        <p className="mt-3 text-display-md text-ink/90 max-w-3xl font-medium">
          {heroLanes.map((label, i) => (
            <span key={label} className="inline-block whitespace-nowrap">
              {label}
              {i < heroLanes.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mx-1.5 sm:mx-2 text-accent text-[1.15em] sm:text-[1.45em] leading-none align-middle"
                >
                  &middot;
                </span>
              )}
            </span>
          ))}
        </p>
        <p className="mt-7 max-w-2xl text-lg sm:text-[1.2rem] leading-relaxed text-ink-soft">
          A boutique seller representation practice where the sale needs more than a
          standard listing. The first conversation is private and free. Focused on
          protecting what you&rsquo;ve worked for.
        </p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={polish}
          custom={0}
          className="mt-9 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
        >
          <Button as="a" href="#contact" size="lg" variant="primary" className="group">
            Request a Private Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button as="a" href="tel:+13656457332" size="lg" variant="ghost">
            <Phone className="h-4 w-4" />
            Call (365) 645-7332
          </Button>
        </motion.div>
        <motion.ul
          initial="hidden"
          animate="show"
          variants={polish}
          custom={1}
          className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px] text-ink-soft"
        >
          {trustItems.map((label, idx) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-accent-deep flex-shrink-0" strokeWidth={2.4} />
              <span>{label}</span>
              {idx < trustItems.length - 1 && (
                <span aria-hidden="true" className="text-ink-mute/40 select-none">&middot;</span>
              )}
            </li>
          ))}
        </motion.ul>
        <motion.p
          initial="hidden"
          animate="show"
          variants={polish}
          custom={2}
          className="mt-6 text-sm text-ink-mute max-w-xl"
        >
          Real estate services by Resolve, delivered through HomeLife G1 Realty Inc., Brokerage. Independently Owned and Operated. Your inquiry is confidential.
        </motion.p>
      </div>
    </section>
  )
}
