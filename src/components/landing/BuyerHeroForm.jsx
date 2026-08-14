import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * BuyerHeroForm — compact, above-the-fold capture in the /buyers hero.
 * The "upside others scroll past" ad drives cold buyers here; this gives
 * them an immediate action and fires the same Meta Lead event as the rest
 * of the site, so buyer-side ad spend becomes measurable.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

export function BuyerHeroForm() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get('name') || !data.get('email')) {
      toast.error('Please add your name and an email so we can send matches.')
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
        trackLead({ content_category: 'Buyers' }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { email: (data.get('email') || '').toString(), phone: '' },
          custom_data: { situation: 'Buyers', source_page: '/buyers', form: 'hero' },
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
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 sm:p-7 shadow-card">
      <input type="hidden" name="_subject" value="Resolve · Buyer list inquiry (hero)" />
      <input type="hidden" name="situation" value="Buyers" />
      <input type="hidden" name="source_page" value="/buyers" />

      <h3 className="font-display font-medium text-navy text-[1.4rem] leading-snug">
        Get on the buyer list
      </h3>
      <p className="mt-1.5 text-[14px] text-navy-soft leading-relaxed">
        Tell us what you&rsquo;re after. We send only what fits.
      </p>

      <div className="mt-5 space-y-3.5">
        <div>
          <Label htmlFor="buyer-hero-name" required>First name</Label>
          <Input id="buyer-hero-name" name="name" autoComplete="given-name" required />
        </div>
        <div>
          <Label htmlFor="buyer-hero-email" required>Email</Label>
          <Input id="buyer-hero-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <Label htmlFor="buyer-hero-goal">What you&rsquo;re looking for</Label>
          <Textarea
            id="buyer-hero-goal"
            name="message"
            rows={2}
            placeholder="area, budget, goal&hellip;"
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
            Get on the buyer list
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[11.5px] text-navy-mute leading-relaxed">
        Incentive offered through HomeLife G1 Realty Inc., Brokerage, on completed purchases
        where Resolve acts as your buyer representative. One per client. Not combinable. May be
        changed or withdrawn at any time.
      </p>
    </form>
  )
}
