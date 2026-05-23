import React from 'react'
import { motion } from 'framer-motion'
import {
  Gavel,
  HeartHandshake,
  Scroll,
  AlertCircle,
  Sunrise,
  Scale,
} from 'lucide-react'
import { Section, SectionHead } from './Section'

const items = [
  {
    icon: Gavel,
    title: 'Power of Sale',
    body:
      'When the lender has begun enforcement, time matters and so does composure. We work to position the property, manage process, and protect any remaining equity available to you.',
  },
  {
    icon: HeartHandshake,
    title: 'Divorce or Separation',
    body:
      'Selling during separation is rarely just about the house. We coordinate with your counsel, keep communication neutral, and run a tidy sale so both sides feel respected.',
  },
  {
    icon: Scroll,
    title: 'Estate and Probate',
    body:
      'Selling a loved one’s home asks a lot of executors. We move at the pace of the estate, work with your lawyer, and bring careful, patient guidance to every step.',
  },
  {
    icon: AlertCircle,
    title: 'Mortgage Arrears',
    body:
      'If arrears are mounting and the calls feel heavier each week, you have more options than you think. A confidential review can show what is realistic and what is not.',
  },
  {
    icon: Sunrise,
    title: 'Life Transitions',
    body:
      'Job change, health change, downsizing, relocation. Major life shifts deserve a sale that is planned rather than rushed, with options laid out clearly before any listing begins.',
  },
  {
    icon: Scale,
    title: 'Property Disputes',
    body:
      'Co-ownership friction, boundary or tenancy questions, partition matters. We listen carefully, coordinate with your legal team, and help bring the property toward a clean resolution.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}

export function Situations() {
  return (
    <Section id="situations" tint>
      <SectionHead
        eyebrow="Situations we focus on"
        title="Quiet help for the moments that feel anything but quiet."
        intro="Resolve was built around the situations where a thoughtful sale matters most. Every engagement begins with a private conversation, never a pitch."
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <motion.article
              key={it.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              custom={i}
              className="group bg-white rounded-2xl border border-surface-line p-7 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent-deep flex items-center justify-center">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-[1.2rem] font-semibold text-ink">{it.title}</h3>
              <p className="mt-2.5 text-[15px] text-ink-soft leading-relaxed">{it.body}</p>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
