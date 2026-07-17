import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Lock, Send, Phone, MessageSquare } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import { Input, Textarea, Select, Label, Checkbox } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * ContactPage — V2 /contact route.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Contact)
 *
 * Preserves the existing Formspree endpoint + every field name + the
 * Meta Pixel `Lead` event + the Conversions API call (shared event_id
 * for dedup). The integration is verbatim from the previous landing
 * InquiryForm; only the surface, copy, and form-field shell are
 * restyled to V2.
 *
 * Surface: Stone (the brief specifies Stone background for /contact).
 * The Footer renders globally underneath.
 */
const FORM_DISABLED = false
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const SITUATIONS = [
  'Mortgage arrears',
  'Power of sale',
  'Estate sale',
  'Partnership / ownership dispute',
  'Other',
  "Prefer not to say — I'll explain",
]

export function ContactPage() {
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
        // Meta Pixel + CAPI: SAME event_id for browser + server so Meta
        // deduplicates them into a single Lead conversion.
        const eventId = genEventId()
        const situation = (data.get('situation') || '').toString()
        trackLead({ content_category: situation }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: {
            email: (data.get('email') || '').toString(),
            phone: (data.get('phone') || '').toString(),
          },
          custom_data: { situation },
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

  return (
    <section data-surface="stone" className="bg-stone section-y">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>A Confidential Inquiry</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-navy text-display-lg">
            Tell us a little. We&rsquo;ll take it from there.
          </h1>
          <p className="mt-1 font-display font-medium italic text-bronze text-display-md leading-[1.05]">
            Confidential. No obligation.
          </p>
          <p className="mt-6 text-[16.5px] text-navy-soft leading-relaxed">
            Your message goes to Resolve at HomeLife G1 Realty Inc., Brokerage.
            We read every message personally and typically reply within a few
            hours during business hours.
          </p>
        </div>

        {/* Quick contact row */}
        <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center">
          <Button as="a" href="sms:+13656457332" variant="primary" size="md" className="justify-center">
            <MessageSquare className="h-4 w-4" />
            Text (365) 645-7332
          </Button>
          <Button as="a" href="tel:+13656457332" variant="outline" size="md" className="justify-center text-navy border-navy">
            <Phone className="h-4 w-4" />
            Call instead
          </Button>
        </div>

        <p className="mt-12 mx-auto max-w-3xl text-center text-[12.5px] uppercase tracking-[0.18em] font-semibold text-bronze">
          Or send a confidential message
        </p>

        <form
          onSubmit={handleSubmit}
          className="
            mt-4 mx-auto max-w-3xl bg-stone
            border border-divider rounded-[18px] shadow-card
            p-6 sm:p-10
          "
          aria-disabled={FORM_DISABLED}
        >
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
              <div>
                <Label htmlFor="area" required>Property city or area</Label>
                <Input id="area" name="area" placeholder="e.g. Brampton, Mississauga, Caledon" required />
              </div>
              <div className="sm:col-span-2 -mt-2">
                <p className="text-[12.5px] text-navy-mute leading-relaxed">
                  Phone or email, at least one, so we can reach you.
                </p>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="situation" required>Which situation best fits?</Label>
                <Select id="situation" name="situation" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  {SITUATIONS.map((s) => (
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
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-[10px] bg-mist border border-divider p-4">
              <Checkbox id="no-listing" name="no_existing_listing" value="yes" required />
              <label htmlFor="no-listing" className="text-[14px] text-navy-soft leading-relaxed cursor-pointer">
                I understand that if I&rsquo;m currently listed with another brokerage, Resolve cannot act as my representative until that agreement has ended or been mutually released, and that nothing here is intended to interfere with an existing agreement.
              </label>
            </div>
            <div className="mt-3 flex items-start gap-3 rounded-[10px] bg-mist border border-divider p-4">
              <Checkbox id="no-legal-advice" name="acknowledges_real_estate_only" value="yes" required />
              <label htmlFor="no-legal-advice" className="text-[14px] text-navy-soft leading-relaxed cursor-pointer">
                I understand that Resolve provides real estate services, not legal advice, and works alongside my own legal counsel.
              </label>
            </div>

            <p className="mt-3 text-[12.5px] text-navy-mute flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Your information is used only to respond to your inquiry. It is not sold, shared, or added to any list.
            </p>
          </fieldset>

          {FORM_DISABLED ? (
            <div className="mt-7 rounded-[12px] border border-bronze/40 bg-rose p-5 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="flex-1">
                <p className="text-[13px] uppercase tracking-[0.14em] font-semibold text-bronze">
                  Inquiry form opening soon
                </p>
                <p className="mt-2 text-[15px] text-navy leading-relaxed">
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
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12.5px] text-navy-mute">
                Prefer to call? (365) 645-7332. Lines are answered personally during business hours.
              </p>
              <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
                {submitting ? 'Sending…' : (
                  <>
                    Send Confidential Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
