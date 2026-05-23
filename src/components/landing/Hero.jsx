import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-fade">
      <div className="container section-y relative">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="eyebrow"
        >
          A quieter way to sell
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mt-4 text-display-xl text-ink max-w-4xl font-semibold"
        >
          When selling your home is the hard part, you deserve a calm, capable advocate.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-2xl text-lg sm:text-[1.2rem] leading-relaxed text-ink-soft"
        >
          Resolve is private seller representation for Ontario homeowners navigating
          power of sale, separation, estate matters, mortgage arrears, life
          transitions, or property disputes. Honest counsel, careful process,
          discretion at every step.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <Button as="a" href="#contact" size="lg" variant="primary" className="group">
            Request a Private Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button as="a" href="tel:+13656457332" size="lg" variant="outline">
            <Phone className="h-4 w-4" />
            Call (365) 645-7332
          </Button>
        </motion.div>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
          className="mt-7 text-sm text-ink-mute max-w-xl"
        >
          A service of HomeLife G1 Realty Inc., Brokerage. Independently Owned and Operated. Your inquiry is confidential.
        </motion.p>
      </div>
    </section>
  )
}
