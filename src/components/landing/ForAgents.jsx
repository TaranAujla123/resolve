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
  Handshake,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Field'

/**
 * /for-agents — For Agents page for other Ontario real estate
 * practitioners (brokerages, agents) who have inherited or are
 * working a seller file that calls for Resolve's specialism: power
 * of sale, mortgage arrears, separation, estate, dispute, or
 * time-sensitive deadline.
 *
 * Naming choice — important. The nav label and the hero eyebrow
 * both read "For Agents" so a non-registrant (a consumer, a lawyer,
 * an accountant) landing cold cannot reasonably infer that they
 * qualify to receive a referral fee or a co-brokerage split.
 * Referral and co-brokerage fees can only legally flow brokerage to
 * brokerage between RECO-registered practitioners under TRESA.
 * "Partner with Resolve" appears in the H1 as the framing of the
 * relationship for the qualified audience the page already
 * identifies — it does not replace the audience signal.
 *
 * The page leads with partnership once the audience is named. Two
 * modes are presented:
 *   1. Full referral. The default. The referring agent hands off
 *      the file under a TRESA brokerage-to-brokerage referral
 *      agreement; Resolve takes the listing; the referring agent
 *      stays close to the client and keeps the long-term
 *      relationship; the referring brokerage is paid at closing.
 *   2. Co-brokerage. The option for files where the agent wants to
 *      remain visibly on the file (a long-standing client, a
 *      high-profile property, a file the agent wants to learn
 *      from). The referring agent stays on as co-listing brokerage;
 *      Resolve handles the operational load; commission is split
 *      per a co-listing agreement signed at the outset.
 *
 * The URL slug stays /for-agents/ for SEO continuity and inbound
 * link stability.
 *
 * Compliance posture:
 *   - All arrangements (referral or co-brokerage) are documented
 *     brokerage-to-brokerage under TRESA. Payments flow brokerage to
 *     brokerage at closing.
 *   - No agent-to-agent payment language anywhere. Each brokerage
 *     handles its internal split with its own salesperson per its
 *     standard arrangement.
 *   - Brokerage attribution lives in BrokerageStrip + Footer; not
 *     restated here.
 *   - No outcome guarantees, no "specialist" / "exclusive" / "best"
 *     language. "More than a standard listing" describes file
 *     complexity, not promised outcome.
 *   - "Partner" / "partnership" used in the marketing sense
 *     (collaboration), not the legal-entity sense.
 *   - No "Realtor" trademark usage. "Real estate professional",
 *     "practitioner", "agent", "brokerage" are used instead.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const filesWeTake = [
  'Power of sale and pre-power-of-sale files',
  'Mortgage arrears with a limited remaining timeline',
  'Estate sales with executors or multiple beneficiaries',
  'Time-sensitive deadlines (relocation, closing on the next home)',
  'Sensitive sales requiring discretion',
]

const milestones = [
  { stage: 'File opened (within 48 hours)', note: 'Brief confirmation and the expected timeline.' },
  { stage: 'Listing live', note: 'Listing details and a short offer-strategy summary.' },
  { stage: 'Offers received', note: 'Notification, with a summary of each offer.' },
  { stage: 'Offer accepted or countered', note: 'Notification of the position taken.' },
  { stage: 'Conditional waiver', note: 'Confirmation of firm sale and closing date.' },
  { stage: 'Closing', note: 'Confirmation, and brokerage-to-brokerage payment initiated.' },
]

const howItWorks = [
  'You call (365) 645-7332 or submit the form below.',
  'We review the file in a 15 minute call (within one business day, often the same day).',
  'If it is a fit, we agree on the structure (referral or co-brokerage) and send your brokerage the paperwork.',
  'We take the listing. You stay close to the client and stay informed at six milestones.',
  'Referral fee or commission split pays out brokerage to brokerage at closing.',
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
      {/* Section 1: Hero — partnership framing first beat */}
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
              <span className="text-ink-soft">For Agents</span>
            </p>
            <h1 className="mt-5 text-display-md sm:text-display-lg text-navy max-w-3xl font-display font-medium leading-[1.12]">
              Partner with Resolve on the files that need more than a standard listing.
            </h1>
            <p className="mt-5 sm:mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-ink-soft">
              You bring the client relationship. We bring the bandwidth, the
              discipline, and the boutique-practice handling that distressed
              and complex seller files actually need.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Power of sale. Mortgage arrears. Estate sales. Time-sensitive
              deadlines. Refer the
              file and step back, or stay on as co-listing brokerage. Either
              way, the operational weight stays with us.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="#partnership-form" size="lg" variant="primary" className="group">
                Discuss a Partnership
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

            {/* Section 2: Two ways to work together */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                The structure
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Two ways to work together.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
                <p>
                  <strong className="text-ink font-semibold">Refer the file.</strong>{' '}
                  The default path. Resolve takes the listing under HomeLife
                  G1 Realty Inc., Brokerage, under a TRESA brokerage-to-
                  brokerage referral agreement. You stay close to the client
                  and keep the long-term relationship. We control execution:
                  the listing, the communications, the negotiation, the
                  closing. Your brokerage is paid a referral fee at closing
                  under terms we agree at the outset.
                </p>
                <p>
                  <strong className="text-ink font-semibold">Co-broker where it fits.</strong>{' '}
                  Where you want to stay visibly on the file (a long-standing
                  client who knows you by name, a high-profile property, a
                  file you want to learn from), we co-broker. You stay on as
                  co-listing brokerage. We carry the operational load.
                  Commission is split per a co-listing agreement signed at
                  the outset. Same documentation discipline. Different
                  distribution of the work.
                </p>
                <p>
                  The right structure depends on the file. We work it out
                  when we discuss the file.
                </p>
              </div>
            </div>

            {/* Section 3: Why this works */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Why this works
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                You keep the relationship. We carry the work.
              </h2>
              <div className="mt-5 space-y-4 text-[16px] text-ink-soft leading-relaxed">
                <p>
                  These files have one thing in common: they need a single,
                  experienced point of execution. A power of sale handled by
                  two agents on the communications becomes a mess for the
                  seller. A matrimonial home sale with unclear lines of
                  responsibility signals to the buyer&rsquo;s side that the
                  listing brokerage is not fully in control. The work
                  between client conversations and closing day sits with us
                  either way. Lender follow-ups, multi-party coordination,
                  late-night calls from a seller under pressure.
                </p>
                <p>
                  A clean structure protects everyone. You keep the client
                  relationship and the long-term business that follows the
                  file. We get the executional control needed to handle the
                  situation properly. The seller gets one clear point of
                  contact and a clean transaction.
                </p>
              </div>
            </div>

            {/* Section 4: Files we take */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Scope
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                The files we take.
              </h2>
              <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
                Resolve is built for the seller files that need more than a
                standard listing. If your client&rsquo;s situation sits in
                any of the categories below, send it our way and we will
                read it seriously.
              </p>
              <div className="mt-6 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[#1F8B5A]" strokeWidth={2} />
                  <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-ink">
                    Files we take
                  </p>
                </div>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {filesWeTake.map((line) => (
                    <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
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
              <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
                Six milestone updates from file open to closing. Same cadence
                whether you are referring or co-brokering, with deeper
                involvement on the latter where joint decisions are needed.
              </p>
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

            {/* Section 7: TRESA compliance — covers both modes */}
            <div className="rounded-2xl border border-bronze-deep/40 bg-rose p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" strokeWidth={1.9} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-bronze">
                    TRESA compliance
                  </p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold text-navy leading-snug">
                    Brokerage to brokerage. In writing. No ambiguity.
                  </h3>
                  <p className="mt-3 text-[15px] text-navy-soft leading-relaxed">
                    Referrals are documented under brokerage-to-brokerage
                    referral agreements per TRESA. Co-brokerage files are
                    documented under co-listing agreements. Both flow
                    brokerage to brokerage at closing. Your brokerage handles
                    internal payment to you per its standard split. No
                    agent-to-agent payments, no unwritten arrangements, no
                    compliance ambiguity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Partnership inquiry form */}
      <section id="partnership-form">
        <div className="container section-y">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Send us a file
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Confidential partnership inquiry.
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-xl mx-auto">
                A brief description of the file is enough for a first read.
                We respond personally, typically within a few hours during
                business hours.
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
              <input type="hidden" name="_subject" value="Resolve · New partnership inquiry from agent" />
              <input type="hidden" name="source_page" value="/for-agents" />
              <input type="hidden" name="inquiry_type" value="agent-partnership" />
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
                Your information is used only to respond to this inquiry. It
                is not shared with anyone outside the practice.
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

      {/* Section 9: Closing handshake — partnership reassurance */}
      <section className="bg-surface-tint">
        <div className="container py-14 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
              <Handshake className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <p className="mt-5 text-[15px] text-ink-soft leading-relaxed max-w-xl mx-auto">
              A partnership designed to work for both sides. You stay close
              to the client and keep the long-term relationship. We carry
              the file from listing through closing. Your brokerage is paid
              at closing under the structure we agreed at the outset. Both
              sides do what they do best, and the seller gets a clean
              transaction.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
