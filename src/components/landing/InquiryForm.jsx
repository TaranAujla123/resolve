import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Lock, Send, Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Label, Checkbox } from '@/components/ui/Field'
import { Section, SectionHead } from './Section'
import portrait from '@/portrait.jpg'

// Kill-switch: set to true to revert to the "call only" state.
// Flips the form between live submission and a disabled state that
// directs visitors to call (365) 645-7332 instead.
const FORM_DISABLED = false
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

// Order + wording mirrors the 04_Contact_Form_Optimization plan:
// most-frequent / highest-intent at the top, escape hatch at the bottom
// for sellers who feel exposed by naming the situation directly.
const situations = [
  'Mortgage arrears',
  'Power of sale',
  'Separation / divorce',
  'Estate sale',
  'Partnership / ownership dispute',
  'Other',
  "Prefer not to say — I'll explain",
]

export function InquiryForm() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (FORM_DISABLED) return
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('phone') && !data.get('email')) {
      toast.error('Please share a phone number or email so we can reach you.')
      return
    }
    if (!data.get('consent')) {
      toast.error('Please confirm the consent checkbox so we can respond.')
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
        // Hand off to the branded /thanks page. ScrollToTopOnRouteChange
        // in App.jsx handles scroll reset; the form unmounts so no need
        // to manually reset state.
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

  return (
    <Section id="contact" tint>
      <SectionHead
        title="Tell us a little. We will take it from there."
        intro={
          FORM_DISABLED
            ? 'The confidential inquiry form is opening shortly. In the meantime, you are welcome to call (365) 645-7332. Calls are answered personally and remain confidential.'
            : 'Your message goes to Resolve at HomeLife G1 Realty Inc., Brokerage. We read every message personally and typically reply within a few hours during business hours.'
        }
        align="center"
      />
      <div className="mt-8 mx-auto max-w-3xl bg-white border border-surface-line rounded-2xl p-5 sm:p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          <img
            src={portrait}
            alt=""
            aria-hidden="true"
            width="56"
            height="56"
            className="h-14 w-14 rounded-full object-cover object-top border border-surface-line shadow-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[14.5px] text-ink leading-relaxed">
              You&rsquo;ll speak directly with Taran or Dave. Never a call centre, never a hard sell.
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <Button as="a" href="sms:+13656457332" variant="primary" size="sm" className="justify-center">
                <MessageSquare className="h-4 w-4" />
                Text (365) 645-7332
              </Button>
              <Button as="a" href="tel:+13656457332" variant="outline" size="sm" className="justify-center">
                <Phone className="h-4 w-4" />
                Call instead
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 mb-1 mx-auto max-w-3xl text-center text-[12.5px] uppercase tracking-[0.18em] font-semibold text-ink-mute">
        Or send a confidential message
      </p>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 mx-auto max-w-3xl bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
        aria-disabled={FORM_DISABLED}
      >
        {/* Formspree special fields: set inbox subject + ensure replies go to the inquirer.
            Formspree auto-uses a field named "email" as Reply-To, but _replyto makes it explicit. */}
        <input type="hidden" name="_subject" value="Resolve · New confidential inquiry" />
        <fieldset disabled={FORM_DISABLED} className="contents">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name" required>Your name</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="sm:col-span-2 -mt-2">
              <p className="text-[12.5px] text-ink-mute leading-relaxed">
                Phone or email — at least one, so we can reach you. We will use the method you prefer below.
              </p>
            </div>
            <div>
              <Label htmlFor="area" required>Property city or area</Label>
              <Input id="area" name="area" placeholder="e.g. Brampton, Mississauga, Caledon" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="situation" required>Which situation best fits?</Label>
              <Select id="situation" name="situation" defaultValue="" required>
                <option value="" disabled>Select one</option>
                {situations.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">A short description (optional)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Anything you would like us to know before we connect. Plain language is fine."
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="preferred">Preferred contact method (optional)</Label>
              <Select id="preferred" name="preferred" defaultValue="">
                <option value="">No preference</option>
                <option value="Phone call">Phone call</option>
                <option value="Text message">Text message</option>
                <option value="Email">Email</option>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface-tint border border-surface-line p-4">
            <Checkbox id="consent" name="consent" value="yes" required />
            <label htmlFor="consent" className="text-[14px] text-ink-soft leading-relaxed cursor-pointer">
              I consent to be contacted by Resolve and HomeLife G1 Realty Inc., Brokerage about my inquiry.
            </label>
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-xl bg-surface-tint border border-surface-line p-4">
            <Checkbox id="no-listing" name="no_existing_listing" value="yes" required />
            <label htmlFor="no-listing" className="text-[14px] text-ink-soft leading-relaxed cursor-pointer">
              I understand that if I&rsquo;m currently listed with another brokerage, Resolve cannot act as my representative until that agreement has ended or been mutually released &mdash; and that nothing here is intended to interfere with an existing agreement.
            </label>
          </div>
          <p className="mt-2 text-[12.5px] text-ink-mute leading-relaxed">
            Already listed with another brokerage? You&rsquo;re still welcome to reach out with general questions. We simply can&rsquo;t represent you until your existing agreement has expired or been mutually released by that brokerage. Any decision about an existing agreement is between you and your current brokerage &mdash; we never ask anyone to break an agreement they&rsquo;ve signed.
          </p>

          <p className="mt-3 text-[12.5px] text-ink-mute flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Your information is used only to respond to your inquiry. It is not sold, shared, or added to any list.
          </p>
        </fieldset>

        {FORM_DISABLED ? (
          <div className="mt-7 rounded-xl border border-accent/30 bg-accent-soft/60 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="flex-1">
              <p className="text-[13px] uppercase tracking-[0.14em] font-semibold text-accent-deep">
                Inquiry form opening soon
              </p>
              <p className="mt-2 text-[15px] text-ink leading-relaxed">
                Please call Taran directly at (365) 645-7332 to speak privately.
                Lines are answered personally during business hours.
              </p>
            </div>
            <Button as="a" href="tel:+13656457332" variant="primary" size="lg" className="shrink-0">
              <Phone className="h-4 w-4" />
              Call (365) 645-7332
            </Button>
          </div>
        ) : (
          <>
            <p className="mt-6 text-center text-[13px] text-ink-soft leading-relaxed">
              No obligation. Completely confidential. We typically reply within a few hours.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12.5px] text-ink-mute">
                Prefer to call? (365) 645-7332. Lines are answered personally during business hours.
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
          </>
        )}
      </motion.form>
    </Section>
  )
}
