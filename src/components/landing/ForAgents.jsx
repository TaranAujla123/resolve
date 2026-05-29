import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  Send,
  Lock,
  CheckCircle2,
  XCircle,
  Handshake,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Field'

/**
 * /for-agents — referral page targeting other Ontario real estate
 * professionals who have inherited a difficult seller file (power of sale,
 * mortgage arrears, separation, estate, dispute) and would prefer to
 * refer the file under a TRESA-compliant brokerage-to-brokerage
 * agreement than risk damaging the client relationship.
 *
 * The page sits outside the main consumer funnel: not linked from the
 * primary Nav, only from the Footer and from internal cross-links on
 * the situation pages. The visual register is more direct than the
 * consumer pages — the audience is professional, not anxious.
 *
 * Compliance posture:
 *   - All referrals are documented brokerage-to-brokerage under TRESA
 *     Bulletin 5.1. Referral fees flow from HomeLife G1 Realty Inc.,
 *     Brokerage to the referring brokerage at closing.
 *   - No agent-to-agent payment language. Brokerage handles the internal
 *     split with the referring agent per its standard arrangement.
 *   - Brokerage attribution lives in BrokerageStrip + Footer; not
 *     restated here.
 *   - No outcome guarantees, no "specialist" / "exclusive" language.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const filesWeTake = [
  'Power of sale and pre-power-of-sale files',
  'Mortgage arrears with a limited remaining timeline',
  'Matrimonial home sales during separation or divorce',
  'Estate sales with executors or multiple beneficiaries',
  'Property disputes (partition, co-ownership, lien, title cloud)',
  'Sensitive sales requiring discretion',
]

const filesWeDont = [
  'Standard residential listings',
  'Pre-construction assignments',
  'Buyer representation for investment property',
  'Anything where we are not the clearly right fit',
]

const milestones = [
  { stage: 'File opened (within 48 hours)', note: 'Brief confirmation and the expected timeline.' },
  { stage: 'Listing live', note: 'Listing details and a short offer-strategy summary.' },
  { stage: 'Offers received', note: 'Notification, with a summary of each offer.' },
  { stage: 'Offer accepted or countered', note: 'Notification of the position taken.' },
  { stage: 'Conditional waiver', note: 'Confirmation of firm sale and closing date.' },
  { stage: 'Closing', note: 'Confirmation, and referral fee processing initiated.' },
]

const howItWorks = [
  'You call (365) 645-7332 or submit the form below.',
  'We review the file in a 15 minute call (within one business day, often the same day).',
  'If it is a fit, we send your brokerage a referral agreement.',
  'We take the listing. You stay informed at six milestones.',
  'Referral fee pays out brokerage to brokerage at closing.',
]

export function ForAgents() {
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
      {/* Section 1: Hero, agent-facing register */}
      <section className="bg-hero-fade">
        <div className="container section-y">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Resolve
              </Link>
              <span aria-hidden="true" className="text-ink-mute/40">·</span>
              <span className="text-ink-soft">For Real Estate Professionals</span>
            </p>
            <h1 className="mt-4 text-display-lg sm:text-display-xl text-ink max-w-4xl font-display font-semibold leading-tight">
              Your client is facing a difficult property situation.
            </h1>
            <p className="mt-5 sm:mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-ink-soft">
              You would rather refer the file than risk damaging the relationship.
              Here is how we work with referring agents.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Resolve is a boutique seller representation practice that takes the
              files most agents are not built for. Power of sale, mortgage arrears,
              matrimonial home sales, estate sales, and complex property disputes.
              You refer the file, keep the client relationship, and get paid at
              closing.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="#referral-form" size="lg" variant="primary" className="group">
                Discuss a Referral
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button as="a" href="tel:+13656457332" size="lg" variant="outline">
                <Phone className="h-4 w-4" />
                Call (365) 645-7332
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body sections */}
      <section className="bg-surface-tint">
        <div className="container section-y">
          <div className="max-w-3xl space-y-14">
            {/* Section 2: How we work */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                The structure
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                How we work with referring agents.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
                <p>
                  Resolve takes the listing under HomeLife G1 Realty Inc., Brokerage.
                  You stay in the loop on the file&rsquo;s progress and keep the
                  client relationship for future non-distressed business. We control
                  execution: the listing, the communications, the negotiation, and
                  the closing. You stay out of the day-to-day work and out of the
                  late-night phone calls from a seller under stress.
                </p>
                <p>
                  A standard referral agreement, brokerage to brokerage under TRESA,
                  sets the terms in writing. You are notified at six key milestones
                  (file opened, listing live, offers received, accepted, conditional
                  waiver, closing). You are informed without being on the hook for
                  the execution.
                </p>
                <p>
                  At closing, your brokerage receives 25 percent of the net
                  listing-side commission. Your brokerage handles the internal split
                  with you per its standard arrangement. No invoicing, no chasing.
                </p>
              </div>
            </div>

            {/* Section 3: Why this structure */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Why this structure
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Single point of execution.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
                <p>
                  Difficult seller files need a single point of execution. A power of
                  sale file handled by two agents on the communications becomes a
                  mess for the seller. A matrimonial home sale with a co-broker
                  arrangement signals to the buyer&rsquo;s side that the listing
                  brokerage is not fully in control. Sensitive files close cleanly
                  when one agent holds the line.
                </p>
                <p>
                  You get the financial outcome and the long-term client
                  relationship. We get the executional control needed to handle the
                  file properly. The seller gets a clean transaction.
                </p>
              </div>
            </div>

            {/* Section 4: Files we take / don't */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Scope
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Files we take, files we don&rsquo;t.
              </h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#1F8B5A]" strokeWidth={2} />
                    <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-ink">
                      Files we take
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {filesWeTake.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="h-5 w-5 text-ink-mute" strokeWidth={2} />
                    <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-ink">
                      Files we don&rsquo;t
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {filesWeDont.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-ink-mute flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-[15px] italic text-ink-soft leading-relaxed">
                If we are not the right fit for your file, we will tell you.
              </p>
            </div>

            {/* Section 5: Communication schedule */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Communication
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                What you receive, when.
              </h2>
              <div className="mt-6 rounded-2xl border border-surface-line bg-white overflow-hidden shadow-card">
                <ul className="divide-y divide-surface-line">
                  {milestones.map((m, i) => (
                    <li key={m.stage} className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-start sm:gap-6">
                      <div className="sm:w-1/3">
                        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">
                          Stage {String(i + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-1 text-[15px] font-semibold text-ink">{m.stage}</p>
                      </div>
                      <p className="mt-2 sm:mt-0 sm:w-2/3 text-[15px] text-ink-soft leading-relaxed">
                        {m.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 6: How it works */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                The path
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                How it works.
              </h2>
              <ol className="mt-6 space-y-4">
                {howItWorks.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="h-8 w-8 flex-shrink-0 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center text-[13px] font-semibold">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-[16px] text-ink-soft leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Section 7: TRESA compliance note */}
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-accent-deep flex-shrink-0 mt-0.5" strokeWidth={1.9} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                    TRESA compliance
                  </p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold text-ink leading-snug">
                    Brokerage to brokerage. In writing. No ambiguity.
                  </h3>
                  <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
                    All referrals are documented through brokerage-to-brokerage
                    referral agreements per TRESA. Referral fees flow from HomeLife
                    G1 Realty Inc., Brokerage to your brokerage at closing. Your
                    brokerage handles internal payment to you per its standard
                    split. No agent-to-agent payments, no unwritten arrangements,
                    no compliance ambiguity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Referral inquiry form */}
      <section id="referral-form">
        <div className="container section-y">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Send us a file
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Confidential referral inquiry.
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-xl mx-auto">
                A brief description of the file is enough for a first read. We respond
                personally, typically within a few hours during business hours.
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
              <input type="hidden" name="_subject" value="Resolve · New referral inquiry from agent" />
              <input type="hidden" name="source_page" value="/for-agents" />
              <input type="hidden" name="inquiry_type" value="agent-referral" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="ag-name" required>Your name</Label>
                  <Input id="ag-name" name="name" autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="ag-brokerage" required>Your brokerage</Label>
                  <Input id="ag-brokerage" name="brokerage" required />
                </div>
                <div>
                  <Label htmlFor="ag-phone">Phone</Label>
                  <Input id="ag-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <Label htmlFor="ag-email">Email</Label>
                  <Input id="ag-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className="sm:col-span-2 -mt-2">
                  <p className="text-[12.5px] text-ink-mute leading-relaxed">
                    Phone or email, at least one, so we can reach you.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="ag-file" required>Brief description of the file</Label>
                  <Textarea
                    id="ag-file"
                    name="file_description"
                    placeholder="Situation, timeline, anything relevant. Names are not necessary at this stage."
                    minLength={30}
                    maxLength={2000}
                    required
                  />
                </div>
              </div>

              <p className="mt-5 text-[12.5px] text-ink-mute flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Your information is used only to respond to this inquiry. It is not
                shared with anyone outside the practice.
              </p>

              <p className="mt-5 text-center text-[13px] text-ink-soft leading-relaxed">
                Confidential. No obligation. Reply typically within a few hours during business hours.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-[12.5px] text-ink-mute">
                  Prefer to call? (365) 645-7332.
                </p>
                <Button type="submit" variant="primary" size="lg" disabled={submitting} className="group">
                  {submitting ? 'Sending…' : (
                    <>
                      Submit Confidentially
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Section 9: Closing handshake CTA */}
      <section className="bg-surface-tint">
        <div className="container py-14 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
              <Handshake className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <p className="mt-5 text-[14px] text-ink-soft leading-relaxed">
              Two practitioners. Over a decade combined inside Ontario&rsquo;s most
              difficult sales. The right file in the right hands.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
