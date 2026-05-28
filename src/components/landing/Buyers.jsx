import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Send, Shield, Users, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Label, Checkbox } from '@/components/ui/Field'
import { Section } from './Section'

// Buyer network signup posts to the same Formspree endpoint as the seller
// inquiry form, with a different _subject so submissions land in Taran's
// inbox clearly distinguishable from seller inquiries.
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
        // Same destination as the seller inquiry form. The /thanks page
        // copy is general enough to land cleanly for buyer-network
        // submissions too.
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
    <Section id="buyers" tint>
      <div className="max-w-4xl">
        <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <span aria-hidden="true" className="block h-px w-8 sm:w-10 flex-shrink-0 bg-accent-deep" />
          <span>For Buyers</span>
        </p>
        <h2 className="mt-4 text-display-lg text-ink font-display font-medium">
          Qualified buyers, considered representation.
        </h2>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-3xl">
          Resolve maintains a network of pre-qualified buyers, investors, end-users,
          and developers, interested in Ontario property with thoughtful representation
          on the buy side.
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

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 max-w-3xl mx-auto bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
        aria-disabled={FORM_DISABLED}
      >
        <h3 className="text-[1.2rem] sm:text-[1.35rem] font-semibold text-ink">
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
                <option value="Investor">Investor</option>
                <option value="End-user (primary home)">End-user (primary home)</option>
                <option value="Developer">Developer</option>
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
  )
}
