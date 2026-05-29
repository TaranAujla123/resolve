import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Gavel,
  HeartHandshake,
  Scroll,
  AlertCircle,
  Sunrise,
  Scale,
  ArrowRight,
} from 'lucide-react'
import { Section, SectionHead } from './Section'

const items = [
  {
    icon: AlertCircle,
    title: 'Mortgage Arrears',
    href: '/mortgage-arrears',
    situation:
      'When payments fall behind and the calls get heavier each week, it’s hard to see a way out, and the longer it waits, the narrower the options become.',
    help:
      'A private, no-obligation review shows you what’s realistic. When selling is the right path, we list and manage it carefully so you move from a reactive position to a planned one.',
  },
  {
    icon: Gavel,
    title: 'Power of Sale',
    href: '/power-of-sale',
    situation:
      'Your lender has started enforcement and the clock is running. The real fear is losing the home, and the equity in it, on the bank’s timeline instead of yours.',
    help:
      'We move quickly to list and position the property properly and coordinate with your lawyer and lender, so the sale is handled in good order with your remaining equity kept front and centre.',
  },
  {
    icon: Scale,
    title: 'Property Disputes',
    href: '/property-disputes',
    situation:
      'Co-ownership friction, a boundary or tenancy question, a lien, or a partition matter. Anything clouding title makes a clean sale harder.',
    help:
      'We listen carefully, coordinate with your real estate lawyer to address the title and ownership issues, and work to bring the property to a clean, orderly sale.',
  },
  {
    icon: HeartHandshake,
    title: 'Separation or Divorce',
    href: '/divorce-real-estate',
    situation:
      'Selling the matrimonial home during a separation is rarely just about the house. Two sets of interests, raw emotions, and hard timelines all have to be managed at once.',
    help:
      'We keep communication neutral, coordinate with both parties’ lawyers, and run a clean, fair sale so neither side feels disadvantaged by how the home was handled.',
  },
  {
    icon: Scroll,
    title: 'Estate or Probate',
    href: '/estate-sale',
    situation:
      'Selling a loved one’s home as an executor means carrying probate timelines, multiple beneficiaries, and the weight of the loss all at the same time.',
    help:
      'We move at the pace the estate allows, coordinate with the estate lawyer and the beneficiaries, and manage the sale with patience and care so it’s handled properly for everyone.',
  },
  {
    icon: Sunrise,
    title: 'Life Transitions',
    href: '/life-transitions',
    situation:
      'A job move, a health change, a downsizing, a retirement. Sometimes life calls for a property change on a real timeline.',
    help:
      'We plan the sale around your timeline rather than rushing it, handling pricing, preparation, and negotiation so the move happens on your terms, not under pressure.',
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
        title={
          <>
            Whatever you&rsquo;re facing,{' '}
            <span className="font-serif italic font-normal text-ink tracking-[-0.01em]">there&rsquo;s a way through.</span>
          </>
        }
        intro="Resolve focuses on the sales that need more than a standard listing. Every file is handled to the same standard. Each one starts with a private conversation, never a pitch."
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
              className="group bg-white rounded-2xl border border-surface-line p-5 sm:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 flex flex-col"
            >
              <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent-deep flex items-center justify-center">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-[1.2rem] font-semibold text-ink">{it.title}</h3>
              <p className="mt-2.5 text-[15px] text-ink-soft leading-relaxed">{it.situation}</p>
              <div className="mt-5 pt-5 border-t border-surface-line">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">
                  How we help
                </p>
                <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{it.help}</p>
                {it.href && (
                  <Link
                    to={it.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent-deep hover:text-ink transition-colors"
                  >
                    Read about {it.title.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
