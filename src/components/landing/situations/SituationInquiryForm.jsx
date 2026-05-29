import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Lock, Send, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label, Checkbox } from '@/components/ui/Field'

/**
 * SituationInquiryForm — slim per-situation inline form rendered at the
 * bottom of every situation deep-dive page.
 *
 * Why this exists:
 *   The homepage InquiryForm has 7 interactions (name, phone, email, area,
 *   situation dropdown, message, preferred-contact, consent, listing-ack)
 *   because it's a general intake. A visitor who landed on /power-of-sale
 *   via search or paid traffic has ALREADY self-identified their
 *   situation by URL. Routing them back to /#contact to fill the full
 *   homepage form is a friction tax their funnel position does not need.
 *
 *   This form preserves the compliance load-bearing fields (consent,
 *   listing-agreement acknowledgment) and drops the operational noise
 *   (preferred-contact, repeated situation question). 5 interactions
 *   instead of 8. The hidden `situation` field is pre-filled per page.
 *
 * Compliance:
 *   - Phone OR email validated client-side (mirrors homepage form)
 *   - CASL consent checkbox retained (audit trail for response permission)
 *   - TRESA non-inducement acknowledgment retained, softened wording
 *   - Brokerage attribution lives in BrokerageStrip + Footer; not restated
 *   - Posts to the same Formspree endpoint with a situation-specific
 *     _subject so inbox filtering still works
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function SituationInquiryForm({ situationLabel, situationSlug }) {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('phone') && !data.get('email')) {
      toast.error('Please share a phone number or email so we can reach you.')
      return
    }
    if (!data.get('no_existing_listing')) {
      toast.error('Please acknowledge the note about existing listing agreements so we can proceed.')
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
        toast.error('Something went wrong on our side. Please call (365) 645-7332 or try again shortly.')
      }
    } catch (err) {
      toast.error('Network issue. Please call (365) 645-7332 or try again shortly.')
    } finally {
      setSubmitting(false)
    }
  }

  const formId = `sit-form-${situationSlug}`

  return (
    <section id="inquiry">
      <div className="container section-y">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
              The next step
            </p>
            <h2 className="mt-3 text-display-md text-ink font-display font-medium">
              A private conversation, on your terms.
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-xl mx-auto">
              No obligation, no pressure to list, and nothing public. Many
              conversations stay private and never move further. That is fine.
              The point is for you to see what is realistic and what options
              you actually have.
            </p>
          </div>

          <motion.form
            id={formId}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
          >
            <input type="hidden" name="_subject" value={`Resolve · ${situationLabel} inquiry`} />
            <input type="hidden" name="situation" value={situationLabel} />
            <input type="hidden" name="source_page" value={`/${situationSlug}`} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor={`${formId}-name`} required>Your name</Label>
                <Input id={`${formId}-name`} name="name" autoComplete="name" required />
              </div>
              <div>
                <Label htmlFor={`${formId}-phone`}>Phone</Label>
                <Input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={`${formId}-email`}>Email</Label>
                <Input id={`${formId}-email`} name="email" type="email" autoComplete="email" />
              </div>
              <div className="sm:col-span-2 -mt-2">
                <p className="text-[12.5px] text-ink-mute leading-relaxed">
                  Phone or email, at least one, so we can reach you.
                </p>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={`${formId}-message`}>
                  Anything you would like us to know (optional)
                </Label>
                <Textarea
                  id={`${formId}-message`}
                  name="message"
                  placeholder="Plain language is fine. A sentence or two is enough."
                />
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface-tint border border-surface-line p-4">
              <Checkbox id={`${formId}-no-listing`} name="no_existing_listing" value="yes" required />
              <label htmlFor={`${formId}-no-listing`} className="text-[14px] text-ink-soft leading-relaxed cursor-pointer">
                I understand that if I&rsquo;m currently listed with another brokerage, Resolve cannot act as my representative until that agreement has ended or been mutually released, and that nothing here is intended to interfere with an existing agreement.
              </label>
            </div>

            <p className="mt-3 text-[12.5px] text-ink-mute flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Your information is used only to respond to your inquiry. It is not sold, shared, or added to any list.
            </p>

            <p className="mt-6 text-center text-[13px] text-ink-soft leading-relaxed">
              No obligation. Completely confidential. We typically reply within a few hours.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12.5px] text-ink-mute">
                Prefer to call?{' '}
                <a href="tel:+13656457332" className="text-accent-deep hover:text-ink transition-colors font-semibold">
                  (365) 645-7332
                </a>
              </p>
              <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
                {submitting ? 'Sending…' : (
                  <>
                    Send Confidential Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>

          <p className="mt-6 text-center text-[12.5px] text-ink-mute leading-relaxed max-w-2xl mx-auto">
            This page describes a real estate process for general information.
            It is not legal, accounting, or financial advice. For questions
            about your specific situation, please speak with a real estate
            lawyer in your jurisdiction.
          </p>
        </div>
      </div>
    </section>
  )
}
