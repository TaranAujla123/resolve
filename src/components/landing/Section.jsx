import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Section({ id, tint = false, children, className }) {
  return (
    <section
      id={id}
      className={cn('section-y', tint && 'bg-surface-tint', className)}
    >
      <div className="container">{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, intro, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-display-lg text-ink font-semibold">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-soft leading-relaxed">{intro}</p>}
    </motion.div>
  )
}
