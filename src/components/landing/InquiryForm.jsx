import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Lock, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Label, Checkbox } from '@/components/ui/Field'
import { Section, SectionHead } from './Section'

// Replace this placeholder with your live Formspree endpoint when ready.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME'

const situations = [
  'Power of Sale',
  'Divorce or Separation',
  'Estate or Probate',
  'Mortgage Arrears',
  'Life Transition (job, health, downsizing, relocation)',
  'Property Dispute',
  'Other or prefer not to say',
]

export function InquiryForm() {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get('consent')) {
      toast.error('Please confirm the consent checkbox so we can respond.')
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
        toast.success('Thank you. Your inquiry has been received privately. We will be in touch shortly.')
        form.reset()
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
        eyebrow="Confidential inquiry"
        title="Tell us a little. We will take it from there."
        intro="Your message goes only to Taran Aujla at HomeLife G1 Realty Inc., Brokerage. We respond personally, usually within one business day."
        align="center"
      />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 mx-auto max-w-3xl bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name" required>Your name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>
          <div>
            <Label htmlFor="phone" required>Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
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
            <Label htmlFor="preferred" required>Preferred contact method</Label>
            <Select id="preferred" name="preferred" defaultValue="" required>
              <option value="" disabled>Select one</option>
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

        <p className="mt-3 text-[12.5px] text-ink-mute flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          Your information is used only to respond to your inquiry. It is not sold, shared, or added to any list.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[12.5px] text-ink-mute">
            Prefer to call? (365) 645-7332. Lines are answered personally during business hours.
          </p>
          <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
            {submitting ? 'Sending privately…' : (
              <>
                Send privately
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </div>
      </motion.form>
    </Section>
  )
}
