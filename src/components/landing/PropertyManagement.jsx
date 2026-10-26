import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  Send,
  Lock,
  KeyRound,
  Receipt,
  Wrench,
  Building2,
  CalendarCheck,
  PhoneCall,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Label } from '@/components/ui/Field'

/**
 * /property-management — leasing and management for rental owners,
 * plus a lender section (properties in enforcement).
 *
 * Front end = marketing copy only (Taran, 26 Oct 2026). One team, one
 * phone number. The structure behind it (leasing through HomeLife G1
 * under an OREA listing agreement; management by a separate company
 * under licence of the RESOLVE mark; family relationship; LTB and
 * condo exclusions) lives in the Property Management Agreement and
 * the Terms, not on this page. The page carries one attribution line
 * at the end; the site-wide brokerage strip and footer carry the rest.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const benefits = [
  {
    icon: KeyRound,
    title: 'The right tenant, not the first one',
    body: 'Listed, shown and screened properly. Credit, income, references, and a lease done right.',
  },
  {
    icon: CalendarCheck,
    title: 'Rent on the first',
    body: 'Collected on the first, chased the day it is late, in your account by the 10th.',
  },
  {
    icon: Wrench,
    title: 'Repairs at cost',
    body: 'Licensed trades, their invoice, no markup. You approve anything over $500. Emergencies are handled first and reported the same day.',
  },
  {
    icon: Receipt,
    title: 'A statement that adds up',
    body: 'Rent in, costs out, balance to you. Every line, every month, plus a year-end summary for your accountant.',
  },
  {
    icon: PhoneCall,
    title: 'Someone answers',
    body: 'The tenant calls us, not you. You hear from us when it matters, and you can reach us when you want.',
  },
  {
    icon: Home,
    title: 'Nothing while it is empty',
    body: 'No fee for a vacant month. We would rather fill it, and the listing goes up the same week.',
  },
]

const steps = [
  'Call (365) 645-7332 or send the form. Tell us the address and what is going on.',
  'A 15 minute call. The rent, the tenant, what has been difficult, what you want handled.',
  'We start. Vacant: it is listed this week. Tenanted: we take over rent on the next first of the month.',
]

export function PropertyManagement() {
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
              <span className="text-stone-soft">Property Management</span>
            </p>
            <h1 className="mt-5 text-display-md sm:text-display-lg text-stone max-w-3xl font-sans font-semibold leading-[1.14]">
              One team for the tenant, the rent and the{' '}
              <span className="font-emph italic font-normal text-bronze">repairs.</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-[16.5px] sm:text-[1.2rem] leading-relaxed text-stone-soft">
              Your rental should pay you, not call you. We find the tenant,
              collect the rent, handle the repairs and send you one clean
              statement a month. One phone number, across the GTA, Durham,
              Hamilton and Kitchener-Waterloo.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-stone-soft">
              One house or a small portfolio. Tenanted or vacant. Also for
              lenders holding a property through enforcement.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="#management-form" size="lg" variant="contrast" className="group">
                Ask About Your Property
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

            {/* What you get */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                What you get
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Everything between the listing and the sale, handled.
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 text-accent-deep" strokeWidth={1.9} />
                      <p className="text-[15px] font-semibold text-ink">{title}</p>
                    </div>
                    <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Fees
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Plain fees. No surprises on the statement.
              </h2>
              <div className="mt-6 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">To place a tenant</p>
                    <p className="mt-2 text-[1.35rem] font-semibold text-ink leading-tight">One month&rsquo;s rent</p>
                    <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">Paid when the lease is signed. Nothing if we do not find one.</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">To manage it</p>
                    <p className="mt-2 text-[1.35rem] font-semibold text-ink leading-tight">A flat monthly fee per unit</p>
                    <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">Quoted before you sign. Deducted from the rent, so you never write us a cheque.</p>
                  </div>
                </div>
                <ul className="mt-6 pt-5 border-t border-surface-line grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    'No markup on repairs',
                    'No fee while the unit is vacant',
                    'No renewal fee when a good tenant stays',
                    'No termination fee. Thirty days’ notice, any time',
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The whole cycle */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                The whole cycle
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Buy it. Lease it. Manage it. Sell it.
              </h2>
              <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
                Management is the middle of a rental&rsquo;s life. Resolve
                covers both ends too, with the same team and the same phone
                number.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">Acquire</p>
                  <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">
                    The next one. Value others miss, on and off market, with
                    the numbers run before you offer.{' '}
                    <Link to="/for-investors" className="font-semibold text-accent-deep hover:text-navy underline underline-offset-4">For investors</Link>
                  </p>
                </div>
                <div className="rounded-2xl border border-bronze-deep/40 bg-rose p-5 shadow-card">
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-bronze">Hold</p>
                  <p className="mt-2 text-[15px] text-navy-soft leading-relaxed">
                    Leased, managed, and paying you every month. This page.
                  </p>
                </div>
                <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">Sell</p>
                  <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">
                    When the time comes, tenanted or vacant. We already know
                    the property and the tenant.{' '}
                    <Link to="/sellers" className="font-semibold text-accent-deep hover:text-navy underline underline-offset-4">For sellers</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Lenders */}
            <div className="rounded-2xl border border-bronze-deep/40 bg-rose p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" strokeWidth={1.9} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-bronze">
                    For lenders and their counsel
                  </p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold text-navy leading-snug">
                    A property in enforcement, held properly until it sells. One call.
                  </h3>
                  <div className="mt-3 space-y-2.5 text-[15px] text-navy-soft leading-relaxed">
                    <p><strong className="text-navy font-semibold">Tenant in place:</strong> rent collected and accounted for to the dollar, the tenancy handled under the Residential Tenancies Act, nothing done that puts the file at risk.</p>
                    <p><strong className="text-navy font-semibold">Vacant:</strong> checked weekly, secured, winterized, insurance kept in place, with photos on file.</p>
                    <p><strong className="text-navy font-semibold">Ready to sell:</strong> listed the same week by the team that already holds the keys, priced from current sales, with a written activity report every Monday until it closes.</p>
                    <p>One contact from possession to closing, and a monthly statement counsel can put straight on the file.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How it starts */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                How it starts
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Three steps. Usually within the week.
              </h2>
              <ol className="mt-6 space-y-4">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="h-8 w-8 flex-shrink-0 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center text-[13px] font-semibold">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-[16px] text-ink-soft leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="management-form">
        <div className="container section-y">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Tell us about the property
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                A tenant, management, or both.
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-xl mx-auto">
                The address and a line or two is enough. We reply personally,
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
              <input type="hidden" name="_subject" value="Resolve · Property management inquiry" />
              <input type="hidden" name="source_page" value="/property-management" />
              <input type="hidden" name="inquiry_type" value="property-management" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="pm-name" required>Your name</Label>
                  <Input id="pm-name" name="name" autoComplete="name" required />
                </div>
                <div>
                  <Label htmlFor="pm-role" required>You are</Label>
                  <Select id="pm-role" name="role" required defaultValue="">
                    <option value="" disabled>Choose one</option>
                    <option value="Owner, one property">An owner with one property</option>
                    <option value="Owner, several properties">An owner with several properties</option>
                    <option value="Lender or counsel">A lender, or counsel for a lender</option>
                    <option value="Other">Something else</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pm-phone">Phone</Label>
                  <Input id="pm-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <Label htmlFor="pm-email">Email</Label>
                  <Input id="pm-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className="sm:col-span-2 -mt-2">
                  <p className="text-[12.5px] text-ink-mute leading-relaxed">
                    Phone or email, at least one, so we can reach you.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="pm-address" required>Property address or area</Label>
                  <Input id="pm-address" name="address" autoComplete="street-address" placeholder="Street and city, or just the city" required />
                </div>
                <div>
                  <Label htmlFor="pm-need" required>What you need</Label>
                  <Select id="pm-need" name="service" required defaultValue="">
                    <option value="" disabled>Choose one</option>
                    <option value="Leasing only">A tenant found</option>
                    <option value="Management only">Management of a tenanted unit</option>
                    <option value="Leasing and management">Both: tenant and management</option>
                    <option value="Enforcement property">A property in enforcement</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pm-status">The unit today</Label>
                  <Select id="pm-status" name="unit_status" defaultValue="">
                    <option value="">Choose one</option>
                    <option value="Vacant">Vacant</option>
                    <option value="Tenanted, paying">Tenanted and paying</option>
                    <option value="Tenanted, behind">Tenanted and behind on rent</option>
                    <option value="Not sure">Not sure</option>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="pm-notes">Anything else</Label>
                  <Textarea
                    id="pm-notes"
                    name="message"
                    placeholder="Current rent, number of units, what has been difficult. Optional."
                    maxLength={2000}
                  />
                </div>
              </div>

              <p className="mt-5 text-[12.5px] text-ink-mute flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Used only to reply to you. Not shared with anyone outside the practice.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-[12.5px] text-ink-mute">
                  Prefer to call? (365) 645-7332.
                </p>
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

      {/* Close */}
      <section className="bg-surface-tint">
        <div className="container py-14 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-accent-soft text-accent-deep flex items-center justify-center">
              <Wrench className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <p className="mt-5 text-[15px] text-ink-soft leading-relaxed max-w-xl mx-auto">
              The tenant is found properly. The rent is collected and
              accounted for every month. The repairs are handled at cost. When
              you buy the next one, or sell this one, it is the same team and
              the same phone number.
            </p>
            <p className="mt-5 text-[12.5px] text-ink-mute leading-relaxed max-w-xl mx-auto">
              Leasing and sales by Taran Aujla, Salesperson, HomeLife G1
              Realty Inc., Brokerage. Management by the Resolve management
              team. Details in our{' '}
              <Link to="/terms" className="underline underline-offset-4 hover:text-ink">terms</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
