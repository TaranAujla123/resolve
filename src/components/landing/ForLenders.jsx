import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Phone, ArrowRight, ArrowLeft, Send, Lock, ShieldCheck, Scale } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Field'

/**
 * /for-lenders — for lenders, mortgage administrators and the lawyers who
 * act for them on enforcement files. Written to be read by a senior
 * bank-side partner in under two minutes: what we do, the two ways we
 * work with a lender, an honest side-by-side, and the one conflict rule.
 *
 * Deliberately NOT in the main nav. The consumer pages tell distressed
 * owners we act for them; a "we list for lenders" link in the header
 * would read badly to that audience. Footer + direct links (letters to
 * counsel, email signature) only.
 *
 * Compliance posture:
 *   - Lender behaviour is described as what the lender gets, never what
 *     it must do. No statement of law presented as advice.
 *   - No track-record claims (no "we have sold N lender properties").
 *   - One side per property, stated plainly (TRESA multiple
 *     representation is the reason; we simply do not do it on these files).
 *   - "Former real estate lawyer" is background, not a service offered.
 *   - Brokerage attribution lives in BrokerageStrip + Footer.
 *   - Brand voice: no em dashes in copy, no "!", no urgency, no guarantees.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const ownerLed = [
  'Payout statement requested before a price is set.',
  'Price taken from comparable sales, shared with counsel before the listing goes live.',
  'Every offer sent to counsel the day it arrives, conditional on the lender’s consent to discharge.',
  'A written activity report every Monday.',
  'A dated timetable with an end date, so the lender knows when the plan has run its course.',
  'Any shortfall left where it belongs: between the lender and the borrower’s counsel.',
]

const afterPossession = [
  'A pricing memo with the comparable sales behind it, for your file.',
  'Vacant-property handling: access, lockbox, condition notes, and coordination with your property manager or insurer.',
  'Full market exposure, documented, so the record shows how the property was marketed if the price is ever questioned.',
  'Offers presented with the estimated net to the lender, on your schedule and your standard clauses.',
  'One point of contact from listing to closing, working directly with counsel on the discharge and closing documents.',
]

const compare = [
  ['Proceeds', 'Usually sooner. No motion, writ or possession step first.', 'Later. Possession has to be obtained before the listing.'],
  ['Lender’s costs', 'A lean commission it approves. No enforcement or carrying costs.', 'Enforcement costs, plus carrying a vacant property until it closes.'],
  ['Presentation', 'Occupied and maintained. Shows like an ordinary listing.', 'Vacant and as-is. Buyers tend to discount lender sales.'],
  ['Control', 'The lender approves each offer through its consent to discharge.', 'Full control of price, timing and terms.'],
  ['Depends on', 'A cooperating owner and enough time before the action moves on.', 'Nothing from the borrower.'],
  ['Best fit', 'The owner is cooperating and there is still time.', 'Cooperation has broken down, or the time has run out.'],
]

const milestones = [
  { stage: 'File opened', note: 'Payout or account figures requested, timeline confirmed with counsel.' },
  { stage: 'Pricing', note: 'Comparable sales and a proposed list price, sent before anything goes live.' },
  { stage: 'Listing live', note: 'MLS details and the marketing plan.' },
  { stage: 'Every Monday', note: 'Showings, agent feedback, and any offers in hand.' },
  { stage: 'Each offer', note: 'Sent the same day, with the estimated net to the lender.' },
  { stage: 'Firm and closing', note: 'Waiver confirmation, then coordination with counsel through discharge.' },
]

export function ForLenders() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get('phone') && !data.get('email')) {
      toast.error('Please share a phone number or email so we can reach you.')
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

  return (
    <>
      {/* Hero */}
      <section data-surface="navy" className="relative bg-navy text-stone overflow-hidden isolate -mt-16 sm:-mt-20">
        <HeroBackdrop />
        <div className="relative container pt-28 pb-16 sm:pt-40 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-bronze">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-stone transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Resolve
              </Link>
              <span aria-hidden="true" className="text-stone/40">·</span>
              <span className="text-stone-soft">For Lenders &amp; Counsel</span>
            </p>
            <h1 className="mt-5 text-display-md sm:text-display-lg text-stone max-w-3xl font-sans font-semibold leading-[1.14]">
              Mortgage enforcement files, sold properly.{' '}
              <span className="font-emph italic font-normal text-bronze">Before possession, or after it.</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-stone-soft">
              For lenders, mortgage administrators and the lawyers who act for
              them. A listing brokerage led by someone who spent close to ten
              years as a real estate lawyer on these files, and knows what you
              need to see before you consent to a sale.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-stone-soft">
              The property sells either way. The question is which sale returns
              more, sooner, with less to carry. That is the only question we
              work on.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="#lender-form" size="lg" variant="contrast" className="group">
                Discuss a file
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button as="a" href="tel:+13656457332" size="lg" variant="outline" className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone">
                <Phone className="h-4 w-4" />
                Call (365) 645-7332
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint">
        <div className="container section-y">
          <div className="max-w-3xl space-y-14">

            {/* Two ways */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Two ways we work with lenders
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Coordinated before possession. Represented after it.
              </h2>

              <div className="mt-7 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">Before possession</p>
                <h3 className="mt-2 text-[1.2rem] font-semibold text-ink leading-snug">
                  An owner-led sale, run with counsel in the loop.
                </h3>
                <p className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">
                  The owner lists with us and we act for the owner. What changes
                  for the lender is that the price, the reporting and the offers
                  now come from a licensed third party with no interest in the
                  debt, paid only if the property sells, at a commission the
                  lender approves. Our interest and the lender’s point the same
                  way: the highest net the market will pay, as soon as it will
                  pay it.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {ownerLed.map((line) => (
                    <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">After possession</p>
                <h3 className="mt-2 text-[1.2rem] font-semibold text-ink leading-snug">
                  We list the property for the lender.
                </h3>
                <p className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">
                  Once you hold possession, we act for you. A vacant property,
                  marketed properly, with a record you can rely on.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {afterPossession.map((line) => (
                    <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side by side */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Side by side
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Both routes have their place.
              </h2>
              <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
                Which one fits depends on the owner and the time left. In
                general terms:
              </p>
              {/* Phones: one card per factor, both routes stacked. No sideways scrolling. */}
              <div className="mt-6 space-y-3 sm:hidden">
                {compare.map(([k, a, b]) => (
                  <div key={k} className="rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">{k}</p>
                    <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-accent-deep">Owner-led, coordinated</p>
                    <p className="mt-1 text-[15px] text-ink-soft leading-relaxed">{a}</p>
                    <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-bronze-deep">Lender sale after possession</p>
                    <p className="mt-1 text-[15px] text-ink-soft leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden sm:block overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
                <table className="w-full text-left text-[14.5px] leading-relaxed">
                  <thead>
                    <tr className="border-b border-surface-line">
                      <th className="px-5 py-4 w-[22%]" aria-label="Factor"></th>
                      <th className="px-5 py-4 bg-navy text-stone font-semibold">Owner-led sale, coordinated</th>
                      <th className="px-5 py-4 bg-bronze/15 text-ink font-semibold">Lender sale after possession</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-line">
                    {compare.map(([k, a, b]) => (
                      <tr key={k}>
                        <th scope="row" className="px-5 py-4 font-semibold text-ink align-top">{k}</th>
                        <td className="px-5 py-4 text-ink-soft align-top">{a}</td>
                        <td className="px-5 py-4 text-ink-soft align-top">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[13px] text-ink-mute leading-relaxed">
                General comparison only. Every file turns on its own mortgage
                terms, the stage of enforcement, and the property.
              </p>
            </div>

            {/* Who you deal with */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Who you deal with
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Someone who has sat on your side of the file.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
                <p>
                  Taran Aujla spent close to ten years as a real estate lawyer
                  in Ontario and closed several hundred transactions before
                  moving to the sales side. Payout statements, per diems,
                  consents to discharge, the timeline from claim to motion to
                  writ: none of it needs explaining. Offers are structured so
                  they can close, and conditions are written so they hold.
                </p>
                <p>
                  We act as a real estate brokerage, not as anyone’s lawyer.
                  Legal questions on the file stay with counsel, and we keep
                  counsel informed throughout.
                </p>
              </div>
            </div>

            {/* What you receive */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Reporting
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                What you receive, and when.
              </h2>
              <div className="mt-6 rounded-2xl border border-surface-line bg-white overflow-hidden shadow-card">
                <ul className="divide-y divide-surface-line">
                  {milestones.map((m) => (
                    <li key={m.stage} className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-start sm:gap-6">
                      <p className="sm:w-1/3 text-[15px] font-semibold text-ink">{m.stage}</p>
                      <p className="mt-1 sm:mt-0 sm:w-2/3 text-[15px] text-ink-soft leading-relaxed">{m.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* One side per property */}
            <div className="rounded-2xl border border-bronze-deep/40 bg-rose p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" strokeWidth={1.9} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-bronze">
                    One rule we do not bend
                  </p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold text-navy leading-snug">
                    One side per property.
                  </h3>
                  <p className="mt-3 text-[15px] text-navy-soft leading-relaxed">
                    If we act for the owner on a property, we do not take the
                    lender’s listing for that property, and the reverse. You
                    always know whose side we are on, in writing, from the
                    first email.
                  </p>
                  <p className="mt-3 text-[14.5px] text-navy-soft leading-relaxed">
                    When the price may not cover everything owed, we run a
                    coordinated sale.{' '}
                    <Link to="/coordinated-sale" className="font-semibold text-bronze hover:text-navy transition-colors">
                      See how it works, as the homeowner reads it
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="lender-form">
        <div className="container section-y">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Discuss a file
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                A short note is enough to start.
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-xl mx-auto">
                The property, the stage, and what you need. We reply personally,
                usually the same business day.
              </p>
            </div>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-surface-line rounded-2xl p-7 sm:p-10 shadow-card"
            >
              <input type="hidden" name="_subject" value="Resolve · Lender / counsel inquiry" />
              <input type="hidden" name="source_page" value="/for-lenders" />
              <input type="hidden" name="inquiry_type" value="lender-counsel" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="ln-name" required>Your name</Label>
                  <Input id="ln-name" name="name" autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="ln-firm" required>Firm or institution</Label>
                  <Input id="ln-firm" name="firm" autoComplete="organization" required />
                </div>
                <div>
                  <Label htmlFor="ln-phone">Phone</Label>
                  <Input id="ln-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <Label htmlFor="ln-email">Email</Label>
                  <Input id="ln-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className="sm:col-span-2 -mt-2">
                  <p className="text-[12.5px] text-ink-mute leading-relaxed">
                    Phone or email, at least one, so we can reach you.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="ln-file" required>The file</Label>
                  <Textarea
                    id="ln-file"
                    name="file_description"
                    placeholder="Property area, stage of enforcement, and whether you hold possession. Names are not needed at this stage."
                    minLength={20}
                    maxLength={2000}
                    required
                  />
                </div>
              </div>
              <p className="mt-5 text-[12.5px] text-ink-mute flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Used only to respond to this inquiry. Not shared outside the practice.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-[12.5px] text-ink-mute">Prefer to call? (365) 645-7332.</p>
                <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
                  {submitting ? 'Sending…' : (
                    <>
                      Send
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <section className="bg-surface-tint">
        <div className="container py-12 sm:py-14">
          <div className="max-w-3xl mx-auto flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-accent-deep flex-shrink-0 mt-0.5" strokeWidth={1.9} />
            <p className="text-[13px] text-ink-mute leading-relaxed">
              Real estate services by Resolve, delivered through HomeLife G1
              Realty Inc., Brokerage. This page is general information about how
              we work. It is not legal advice and does not describe what any
              lender is required to do on a particular file. No outcome is
              guaranteed.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
