import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Lock, Send, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label, Checkbox } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

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
    if (!data.get('acknowledges_real_estate_only')) {
      toast.error('Please acknowledge that Resolve provides real estate services, not legal advice.')
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
        // Meta Pixel Lead (browser) + Conversions API Lead (server) share
        // one event_id for dedup. The situation is known from the page.
        // No-op unless VITE_META_PIXEL_ID is set; does not block /thanks.
        const eventId = genEventId()
        trackLead({ content_category: situationLabel }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: {
            email: (data.get('email') || '').toString(),
            phone: (data.get('phone') || '').toString(),
          },
          custom_data: { situation: situationLabel, source_page: `/${situationSlug}` },
        })
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
    <section id="inquiry" data-surface="stone" className="bg-stone">
      <div className="container section-y">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              The Next Step
            </p>
            <h2 className="mt-4 font-display font-medium text-navy text-display-md">
              A private conversation, on your terms.
            </h2>
            <p className="mt-5 text-[16px] text-navy-soft leading-relaxed max-w-xl mx-auto">
              No obligation, no pressure to list and nothing public. All
              conversations stay private and some do not move further. That
              is fine. The point is for you to see what is realistic and what
              options you actually have.
            </p>
          </div>

          <motion.form
            id={formId}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-stone border border-divider rounded-[18px] p-7 sm:p-10 shadow-card"
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
                <p className="text-[12.5px] text-navy-mute leading-relaxed">
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

            <div className="mt-6 flex items-start gap-3 rounded-[10px] bg-mist border border-divider p-4">
              <Checkbox id={`${formId}-no-listing`} name="no_existing_listing" value="yes" required />
              <label htmlFor={`${formId}-no-listing`} className="text-[14px] text-navy-soft leading-relaxed cursor-pointer">
                I understand that if I&rsquo;m currently listed with another brokerage, Resolve cannot act as my representative until that agreement has ended or been mutually released, and that nothing here is intended to interfere with an existing agreement.
              </label>
            </div>

            <div className="mt-3 flex items-start gap-3 rounded-[10px] bg-mist border border-divider p-4">
              <Checkbox id={`${formId}-no-legal-advice`} name="acknowledges_real_estate_only" value="yes" required />
              <label htmlFor={`${formId}-no-legal-advice`} className="text-[14px] text-navy-soft leading-relaxed cursor-pointer">
                I understand that Resolve provides real estate services, not legal advice, and works alongside my own legal counsel.
              </label>
            </div>

            <p className="mt-3 text-[12.5px] text-navy-mute flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Your information is used only to respond to your inquiry. It is not sold, shared, or added to any list.
            </p>

            <p className="mt-6 text-center text-[13px] text-navy-soft leading-relaxed">
              No obligation. Completely confidential. We typically reply within a few hours.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12.5px] text-navy-mute">
                Prefer to call?{' '}
                <a href="tel:+13656457332" className="text-bronze hover:text-bronze-deep transition-colors font-semibold">
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
        </div>
      </div>
    </section>
  )
}
