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
    if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test((data.get('postal_code') || '').toString().trim())) {
      toast.error('Please add the postal code, so we know which property and which area.')
      return
    }
    if (!data.get('mortgage_status')) {
      toast.error('Please pick where the mortgage stands. It is the one thing that changes your options.')
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
        Find out where you stand
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
        {/* Postal code. Required because a street name alone is not a
            property: "73 William St N" exists in more than one Ontario
            town. Six characters pins the parcel and the service area
            without asking for the full address, which stays optional
            as the "please call me" signal. */}
        <div>
          <Label htmlFor={`${fid}-postal`} required>Postal code</Label>
          <Input
            id={`${fid}-postal`}
            name="postal_code"
            autoComplete="postal-code"
            placeholder="N2C 1R7"
            maxLength={7}
            pattern="[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]"
            title="A Canadian postal code, like N2C 1R7"
            required
          />
        </div>
        {/* Mortgage status. Self-selected, one tap, and the single field
            that segments a lead on something actionable: it separates a
            homeowner at month three from one past a possession order. Same
            field name and values as the homeowner-options guide so the
            Make register gets one column for both. */}
        <fieldset>
          <legend className="block text-[14px] font-medium text-navy mb-1.5">
            Which is closest to your situation?<span className="ml-0.5 text-bronze">*</span>
          </legend>
          {/* Six, not four. "Up to date" on its own hid the best lead
              there is: current but struggling, equity intact, time to
              choose. And "no mortgage" is a different situation again,
              equity-rich and cash-poor. Values are short for the register;
              labels are what the person reads. */}
          <div className="grid grid-cols-1 gap-2">
            {[
              ['Current but struggling', 'Payments are up to date, but it is getting hard'],
              ['Behind on payments', 'Behind on payments'],
              ['Notice received', 'I have received a notice from my lender'],
              ['Court process', 'A court process has started'],
              ['No mortgage, money tight', 'No mortgage, but money is tight'],
              ['Just reading', 'Just reading, or looking for someone else'],
            ].map(([v, l]) => (
              <label
                key={v}
                className="flex items-center gap-2.5 rounded-md border border-divider bg-stone px-3 py-2.5 text-[14px] text-navy leading-snug cursor-pointer hover:border-bronze/70 has-[:checked]:border-bronze has-[:checked]:bg-bronze/10 transition-colors"
              >
                <input
                  type="radio"
                  name="mortgage_status"
                  value={v}
                  required
                  className="h-4 w-4 flex-none accent-[#C8A56B]"
                />
                <span>{l}</span>
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-[12px] text-navy-mute leading-relaxed">
            This is the one thing that changes what your options actually are. It stays between us.
          </p>
        </fieldset>
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
            See where I stand
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[11.5px] text-navy-mute leading-relaxed">
        By submitting you acknowledge Resolve provides real estate services, not legal
        advice, and that this will not interfere with any existing listing agreement.
      </p>
    </form>
  )
}
