import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ClipboardList, KeySquare } from 'lucide-react'
import { Section, SectionHead } from './Section'

const steps = [
  {
    n: '01',
    icon: ShieldCheck,
    title: 'Private, confidential assessment',
    body:
      'We meet on your terms, in person, by phone, or by video. Nothing is listed, posted, or shared. You tell us what is happening and we listen.',
  },
  {
    n: '02',
    icon: ClipboardList,
    title: 'A clear plan of your real options',
    body:
      'You receive a written, plain-language summary of your realistic paths forward, the trade-offs of each, and what you can expect at each stage.',
  },
  {
    n: '03',
    icon: KeySquare,
    title: 'Full representation through closing',
    body:
      'If we are the right fit, you receive full seller representation through to closing, focused on protecting your equity and your privacy at every step.',
  },
]

export function Process() {
  return (
    <Section id="process">
      <SectionHead
        eyebrow="How it works"
        title="Three steps. No pressure. Full discretion."
        intro="There is no obligation to list and no pressure at any stage. Many conversations stay private and never move further. That is fine."
      />
      <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="relative bg-white rounded-2xl border border-surface-line p-7 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent-deep font-semibold tracking-wider text-sm">{s.n}</span>
                <span className="h-px flex-1 bg-surface-line" />
                <Icon className="h-5 w-5 text-ink-soft" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-[1.2rem] font-semibold text-ink">{s.title}</h3>
              <p className="mt-2.5 text-[15px] text-ink-soft leading-relaxed">{s.body}</p>
            </motion.li>
          )
        })}
      </ol>
    </Section>
  )
}
