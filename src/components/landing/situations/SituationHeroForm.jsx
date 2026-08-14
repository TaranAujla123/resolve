import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * SituationHeroForm — compact, above-the-fold capture for the situation
 * pages (power-of-sale, mortgage-arrears, financial-pressure,
 * time-sensitive-sales). Paid traffic clicks an emotional ad and lands
 * here; without an immediate action it has to scroll the full-page essay
 * to reach the bottom form, and it bounces. This puts a low-friction
 * ask right in the hero and fires the SAME Meta Lead event as the full
 * form (SituationInquiryForm), so submissions are tracked/attributed.
 *
 * Compliance: the two required acknowledgments (existing-listing +
 * not-legal-advice) remain on the full bottom form. Here they are a
 * passive submission notice to keep first-touch friction minimal.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function SituationHeroForm({ situationLabel, situationSlug }) {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get('name') || !data.get('phone')) {
      toast.error('Please add your name and a phone number so we can reach you.')
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
        const eventId = genEventId()
        trackLead({ content_category: situationLabel }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { phone: (data.get('phone') || '').toString(), email: '' },
          custom_data: { situation: situationLabel, source_page: `/${situationSlug}`, form: 'hero' },
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

  const fid = `hero-${situationSlug}`
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 sm:p-7 shadow-card"
    >
      <input type="hidden" name="_subject" value={`Resolve · ${situationLabel} inquiry (hero)`} />
      <input type="hidden" name="situation" value={situationLabel} />
      <input type="hidden" name="source_page" value={`/${situationSlug}`} />

      <h3 className="font-display font-medium text-navy text-[1.4rem] leading-snug">
        Get your free, private options
      </h3>
      <p className="mt-1.5 text-[14px] text-navy-soft leading-relaxed">
        Tell us what&rsquo;s happening. We&rsquo;ll reply the same day.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <Label htmlFor={`${fid}-name`} required>First name</Label>
          <Input id={`${fid}-name`} name="name" autoComplete="given-name" required />
        </div>
        <div>
          <Label htmlFor={`${fid}-phone`} required>Phone</Label>
          <Input id={`${fid}-phone`} name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div>
          <Label htmlFor={`${fid}-message`}>What&rsquo;s happening?</Label>
          <Textarea
            id={`${fid}-message`}
            name="message"
            rows={2}
            placeholder="e.g. received a power of sale notice&hellip;"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="mt-5 w-full justify-center group"
      >
        {submitting ? 'Sending…' : (
          <>
            Get my free options
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[11.5px] text-navy-mute leading-relaxed">
        No cost, no obligation. By submitting you acknowledge Resolve provides real estate
        services, not legal advice, and this will not interfere with any existing listing
        agreement. Cash-buyer close is subject to a qualified property and situation.
      </p>
    </form>
  )
}
