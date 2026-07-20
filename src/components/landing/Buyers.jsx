import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Send, Shield, Users, Mail, ArrowRight, ClipboardList, Bell, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Label, Checkbox } from '@/components/ui/Field'
import { Section } from './Section'

/**
 * /buyers — the demand side of the Resolve hub.
 *
 * Repositioned July 2026 to lead with end-user value buyers, not
 * investors. Reasoning: 2026 Ontario market is producing more
 * motivated-seller inventory (renewal shock, power of sale, time-
 * sensitive sales) than any year in the last decade. The buyer we
 * serve most is the family or individual who wants a home below where
 * the market priced it and is willing to look at power of sale,
 * arrears, and time-sensitive listings to get it. Investors and
 * builders remain welcome as profile options, but the page speaks to
 * the end-user.
 *
 * Compliance spine (do not remove or soften):
 *   - Sellers always retain full MLS exposure. No "insider access".
 *   - Match-based notification is opt-in and requires seller written
 *     consent for the specific file before any sharing.
 *   - Multiple representation, where applicable, is disclosed and
 *     consented to in writing by both parties before any showing.
 *   - Brokerage attribution ("HomeLife G1 Realty Inc., Brokerage") in
 *     the form footer stays exact.
 *
 * Voice: dignified, factual, analyst register. No urgency-bait, no
 * countdowns, no cited statistics. Global rule for July 2026 edit:
 * no em dashes in new copy.
 */

const FORM_DISABLED = false
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const pillars = [
  {
    icon: Users,
    title: 'Pre-qualified by criteria',
    body:
      'We document each buyer’s geography, budget, asset type, and timeline so matching is intentional, not noise.',
  },
  {
    icon: Mail,
    title: 'Match-based notification',
    body:
      'When Resolve represents a property matching your criteria, and the seller has consented in writing to share with the network, we let you know. Sellers always retain full MLS exposure.',
  },
  {
    icon: Shield,
    title: 'Disclosed, consented representation',
    body:
      'Where Resolve would act for both sides on a transaction, multiple representation is disclosed and consented to in writing by both parties before any showing.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Profile',
    body:
      'A short intake documents what you are looking for. Geography, budget, asset type, timeline, and any hard requirements. The profile becomes your criteria on file.',
  },
  {
    step: '02',
    icon: Bell,
    title: 'Match',
    body:
      'When a Resolve-represented listing matches your criteria, and the seller has consented in writing to share with the network, you get a note. If nothing matches, nothing arrives. No broadcast lists, no filler.',
  },
  {
    step: '03',
    icon: Handshake,
    title: 'Represented',
    body:
      'When a file is worth pursuing, full buy-side representation follows. Written engagement, coordinated with the lawyer, from the initial visit through closing.',
  },
]

const WHO_JOINS = [
  {
    label: 'First-home buyers',
    body:
      'Priced out during 2021 and 2022, waiting for value to return to the market. It has, in specific places, in specific files.',
  },
  {
    label: 'Move-up buyers',
    body:
      'Selling the starter home and stepping up. A motivated-seller file with room to negotiate suits the double-move math.',
  },
  {
    label: 'Downsizers',
    body:
      'Freeing capital from a larger property and moving to something smaller. Timing matters and the right file often is not on MLS on day one.',
  },
  {
    label: 'Investors',
    body:
      'Portfolio builders and family capital deploying against documented acquisition criteria. Income and multi-unit files are welcome.',
  },
  {
    label: 'Builders and developers',
    body:
      'Land acquisitions, assembly plays, tear-downs, or opportunistic residential. Written brief, matched against consented files.',
  },
]

const STRAIGHT_ANSWERS = [
  {
    q: 'Are these "deals"?',
    a: 'They are properly listed properties from motivated sellers. Sellers always retain full MLS exposure. Value comes from timing and matching, not from anyone being taken advantage of. When we represent a seller, we run the sale to their benefit. The buyer network sees the file where the seller has consented to share it.',
  },
  {
    q: 'Does it cost me anything to join?',
    a: 'No. There is no fee to join the network or to receive matches. Standard buyer representation, when we act for you on a file, is agreed in writing at that point.',
  },
  {
    q: 'What about when Resolve represents the seller too?',
    a: 'Multiple representation, where Resolve would act for both parties on the same transaction, is disclosed and consented to in writing by both parties before any showing. Either party may choose to be represented by a different brokerage instead, and we support that choice.',
  },
  {
    q: 'How often will I hear from you?',
    a: 'Only when a file actually matches your criteria and the seller has consented to share it. Some months that is nothing. Some months it is more than one. If your criteria change, you update the profile and matching updates with it.',
  },
]

export function Buyers() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (FORM_DISABLED) return
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('buyer_consent')) {
      toast.error('Please confirm the consent checkbox so we can proceed.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        navigate('/thanks')
      } else {
        toast.error('Something went wrong. Please try again shortly, or call (365) 645-7332.')
      }
    } catch (err) {
      toast.error('Network issue. Please try again shortly, or call (365) 645-7332.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* HERO — end-user value buyer positioning */}
      <Section id="buyers" tint>
        <div className="max-w-4xl">
          <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
            <span aria-hidden="true" className="block h-px w-8 sm:w-10 flex-shrink-0 bg-accent-deep" />
            <span>For Buyers</span>
          </p>
          <h1 className="mt-4 text-display-lg text-ink font-display font-medium">
            The homes the market{' '}
            <span className="italic">mispriced</span>.
          </h1>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-3xl">
            Early notification of motivated-seller listings across the GTA and Ontario. Power of sale, mortgage arrears, financial pressure, and time-sensitive files, matched to your criteria, with proper buy-side representation from first visit through closing.
          </p>
          <p className="mt-4 text-[15px] text-ink-mute leading-relaxed max-w-3xl">
            Sellers always retain full MLS exposure. Nothing here is a shortcut past the market. It is a way to see the right files sooner, decide from a documented position, and be represented properly on the way in.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-surface-line p-5 sm:p-6"
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

      {/* WHY NOW — market context (no cited stats) */}
      <Section>
        <div className="max-w-4xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Why now
          </p>
          <h2 className="mt-4 text-display-md text-ink font-display font-medium">
            2026 is producing motivated-seller inventory the market has not seen in a decade.
          </h2>
          <div className="mt-5 space-y-4 text-[16.5px] text-ink-soft leading-relaxed">
            <p>
              A large share of Ontario mortgages taken during 2020 and 2021 are renewing this year at materially higher rates. Investment properties bought for cash flow are now negative-carry. Preconstruction closings are landing on owners who can no longer fund them. Court-deadline and estate files, always steady, are running heavier as the population moves through demographic transitions.
            </p>
            <p>
              For a value buyer with financing ready, the position is stronger than it has been at any point since 2019. What matters is being on the right list, with a documented profile, so the file matches when it surfaces.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS — 3 steps */}
      <Section tint>
        <div className="max-w-4xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            How it works
          </p>
          <h2 className="mt-4 text-display-md text-ink font-display font-medium">
            Profile. Match. Represented.
          </h2>
          <p className="mt-5 text-[16px] text-ink-soft leading-relaxed max-w-3xl">
            Three steps, in order. No newsletter, no filler, no broadcast list.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl border border-surface-line p-6 sm:p-7"
                >
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
                    Step {s.step}
                  </p>
                  <div className="mt-3 h-10 w-10 rounded-xl bg-accent-soft text-accent-deep flex items-center justify-center">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-[1.15rem] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{s.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* WHO JOINS */}
      <Section>
        <div className="max-w-4xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Who joins
          </p>
          <h2 className="mt-4 text-display-md text-ink font-display font-medium">
            The network is intentionally mixed.
          </h2>
          <p className="mt-5 text-[16px] text-ink-soft leading-relaxed max-w-3xl">
            Different files fit different buyers. What holds across the network: a written criteria profile, financing readiness, and the patience to wait for the right match.
          </p>

          <ul className="mt-8 space-y-4">
            {WHO_JOINS.map((w) => (
              <li key={w.label} className="bg-white rounded-xl border border-surface-line p-5 sm:p-6">
                <p className="text-[15px] font-semibold text-ink">{w.label}</p>
                <p className="mt-1.5 text-[14.5px] text-ink-soft leading-relaxed">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* STRAIGHT ANSWERS — 4 items */}
      <Section tint>
        <div className="max-w-4xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Straight answers
          </p>
          <h2 className="mt-4 text-display-md text-ink font-display font-medium">
            Questions worth answering openly.
          </h2>

          <div className="mt-8 space-y-4">
            {STRAIGHT_ANSWERS.map((qa, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-surface-line p-5 sm:p-6"
              >
                <p className="text-[15.5px] font-semibold text-ink leading-snug">{qa.q}</p>
                <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{qa.a}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[14px] text-ink-mute leading-relaxed max-w-3xl">
            Selling a property yourself? See the situations we handle on the{' '}
            <Link to="/" className="text-accent-deep hover:underline">seller side</Link>: mortgage arrears, power of sale, financial pressure, and time-sensitive closings.
          </p>
        </div>
      </Section>

      {/* FORM — unchanged compliance spine, expanded profile dropdown */}
      <Section>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
          aria-disabled={FORM_DISABLED}
        >
          <h3 className="text-[1.25rem] sm:text-[1.4rem] font-semibold text-ink">
            Join the buyer network
          </h3>
          <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">
            A short profile so we can match you accurately. We do not sell or share your information.
          </p>

          <input type="hidden" name="_subject" value="Resolve · Buyer network signup" />
          <input type="hidden" name="form_type" value="buyer" />

          <fieldset disabled={FORM_DISABLED} className="contents">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="buyer-name" required>Your name</Label>
                <Input id="buyer-name" name="name" autoComplete="name" required />
              </div>
              <div>
                <Label htmlFor="buyer-email" required>Email</Label>
                <Input id="buyer-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div>
                <Label htmlFor="buyer-phone">Phone (optional)</Label>
                <Input id="buyer-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div>
                <Label htmlFor="buyer-profile" required>Buyer profile</Label>
                <Select id="buyer-profile" name="buyer_profile" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  <option value="First home">First home</option>
                  <option value="Move-up">Move-up</option>
                  <option value="Downsizing">Downsizing</option>
                  <option value="Investment">Investment</option>
                  <option value="Builder / developer">Builder / developer</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="buyer-areas">Geographic interest (optional)</Label>
                <Input id="buyer-areas" name="areas" placeholder="e.g. Brampton, Mississauga, GTA West" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="buyer-budget">Approximate budget range (optional)</Label>
                <Input id="buyer-budget" name="budget" placeholder="e.g. $800K to $1.2M" />
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface-tint border border-surface-line p-4">
              <Checkbox id="buyer-consent" name="buyer_consent" value="yes" required />
              <label htmlFor="buyer-consent" className="text-[14px] text-ink-soft leading-relaxed cursor-pointer">
                I understand Resolve will notify me only of properties that match my criteria where the seller has consented to share with the network, and that multiple representation, if applicable, will be disclosed and consented to in writing by both parties before any showing.
              </label>
            </div>
          </fieldset>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[12.5px] text-ink-mute">
              Real estate services by Resolve, delivered through HomeLife G1 Realty Inc., Brokerage.
            </p>
            <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
              {submitting ? 'Sending…' : (
                <>
                  Join the network
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </Section>
    </>
  )
}
