import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Coins, Compass, MessageCircleHeart } from 'lucide-react'
import { Section, SectionHead } from './Section'

const pillars = [
  {
    icon: Lock,
    title: 'Discretion',
    body: 'Conversations stay private. No public lists, no public posts, no pressure to publish your situation.',
  },
  {
    icon: Coins,
    title: 'Equity protection focus',
    body: 'Every decision is weighed against one question: does this protect what you have built in the home?',
  },
  {
    icon: Compass,
    title: 'Strategy, not a price cut',
    body: 'The work starts before the listing: understanding the file, the timeline, and the pressures, so problems get handled early instead of at the closing table.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Plain language',
    body: 'Plain language, honest timelines, and clear next steps. You will always know where you stand.',
  },
]

export function WhyResolve() {
  return (
    <Section id="why" tint>
      <SectionHead
        eyebrow="Why Resolve"
        title="The experience these situations actually require."
        intro="Between us, Taran Aujla and Dave Dhaliwal bring more than fifteen years of combined experience in complex Ontario real estate, from power of sale and estate files to separations and partnership disputes. We&rsquo;ve negotiated with the lenders, lawyers, opposing parties, and family members these situations bring to the table, and we know where these deals get stuck and how to keep them moving to a clean close."
      />
      <p className="mt-8 text-[15.5px] text-ink font-medium max-w-3xl">
        That experience sits behind four commitments we hold on every file:
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-surface-line p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent-deep flex items-center justify-center">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-[1.05rem] font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{p.body}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
