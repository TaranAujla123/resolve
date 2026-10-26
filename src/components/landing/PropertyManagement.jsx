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
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Label } from '@/components/ui/Field'
import { genEventId, trackLead, sendLeadToCapi } from '@/lib/metaPixel'

/**
 * /property-management — full-service property management for
 * landlords and investors, with a separate section for lenders and
 * their counsel (properties in enforcement).
 *
 * Front end = plain marketing copy (Taran, 26 Oct 2026): clear service
 * names, the way property managers describe themselves; no clever
 * lines, no compliance text. The structure behind it (leasing through
 * HomeLife G1; management company under licence of the RESOLVE mark)
 * lives in the Property Management Agreement and the Terms. The lender
 * offer is its own section and does not mix with the investor pitch.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoezqwa'

const services = [
  {
    icon: KeyRound,
    title: 'Tenant placement',
    body: 'Marketing, showings and full screening: credit, income, employment and references. A signed Ontario Standard Lease.',
  },
  {
    icon: CalendarCheck,
    title: 'Rent collection',
    body: 'Collected on the first and followed up the day it is late. Deposited to your account by the 10th.',
  },
  {
    icon: Wrench,
    title: 'Maintenance and repairs',
    body: 'Licensed trades at cost, with no markup. Your approval for anything over $500. Emergencies handled right away and reported the same day.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspections',
    body: 'Move-in, move-out and twice-yearly inspections, with photos, so you always know the condition of your property.',
  },
  {
    icon: Receipt,
    title: 'Monthly owner statements',
    body: 'Every dollar in and out, every month. A year-end summary for your accountant.',
  },
  {
    icon: PhoneCall,
    title: 'Tenant communication',
    body: 'Your tenants call us, not you. Requests, complaints and notices handled properly and on time.',
  },
]

const steps = [
  'Call (365) 645-7332 or send the form. Tell us about the property.',
  'A 15 minute call about the rent, the tenant and what you need handled.',
  'We take it from there. A vacant unit is listed that week. A tenanted unit moves to us on the next first of the month.',
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
        const eventId = genEventId()
        trackLead({ content_category: 'Property management' }, eventId)
        sendLeadToCapi({
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: { phone: (data.get('phone') || '').toString(), email: (data.get('email') || '').toString() },
          custom_data: { situation: 'Property management', source_page: '/property-management', form: 'property-management' },
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
              Stress-free property management for landlords and investors. We
              find and screen your tenant, collect the rent, take care of
              maintenance and send you a clear statement every month.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-stone-soft">
              Single homes, basement units, condos and small portfolios in
              Brampton, Mississauga, Caledon and across the GTA, Durham,
              Hamilton and Kitchener-Waterloo.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="#management-form" size="lg" variant="contrast" className="group">
                Get a Management Quote
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

            {/* Services */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Our services
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Full-service management, from tenant placement to monthly statements.
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map(({ icon: Icon, title, body }) => (
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
                Simple, transparent pricing.
              </h2>
              <div className="mt-6 rounded-2xl border border-surface-line bg-white p-6 sm:p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">Tenant placement</p>
                    <p className="mt-2 text-[1.35rem] font-semibold text-ink leading-tight">One month&rsquo;s rent</p>
                    <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">Paid when the lease is signed. Nothing if we do not place a tenant.</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-accent-deep">Monthly management</p>
                    <p className="mt-2 text-[1.35rem] font-semibold text-ink leading-tight">A flat fee per unit</p>
                    <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">Quoted before you sign and deducted from the rent collected.</p>
                  </div>
                </div>
                <ul className="mt-6 pt-5 border-t border-surface-line grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    'No markup on repairs',
                    'No management fee while the unit is vacant',
                    'No lease renewal fee',
                    'No cancellation fee, 30 days’ notice',
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5 text-[15px] text-ink-soft leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buying or selling */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Buying or selling
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Growing your portfolio? Ready to sell one?
              </h2>
              <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
                The same team helps you buy your next investment property and,
                when the time is right, sell one, tenanted or vacant.{' '}
                <Link to="/for-investors" className="font-semibold text-accent-deep hover:text-navy underline underline-offset-4">For investors</Link>
                {' · '}
                <Link to="/sellers" className="font-semibold text-accent-deep hover:text-navy underline underline-offset-4">For sellers</Link>
              </p>
            </div>

            {/* How it starts */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
                Getting started
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Three simple steps.
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
                Get a quote
              </p>
              <h2 className="mt-3 text-display-md text-ink font-display font-medium">
                Tell us about your property.
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
                    <option value="Leasing only">Tenant placement only</option>
                    <option value="Management only">Management of a tenanted unit</option>
                    <option value="Leasing and management">Tenant placement and management</option>
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
                    placeholder="Current rent, number of units, anything we should know. Optional."
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
                      Get My Quote
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Lenders: a separate audience, a separate section */}
      <section id="lenders" data-surface="navy" className="relative bg-navy text-stone overflow-hidden isolate">
        <HeroBackdrop />
        <div className="relative container py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em] font-semibold text-bronze">
              <Building2 className="h-4 w-4" strokeWidth={1.9} />
              For lenders and their counsel
            </p>
            <h2 className="mt-4 text-display-md text-stone font-sans font-semibold leading-[1.18]">
              Properties in enforcement, managed until they{' '}
              <span className="font-emph italic font-normal text-bronze">sell.</span>
            </h2>
            <p className="mt-5 text-[16px] text-stone-soft leading-relaxed">
              Once a lender takes possession, the property has to be held,
              protected and accounted for until the sale closes. We handle all
              of it, with one point of contact for the file.
            </p>
            <ul className="mt-6 space-y-3 text-[15.5px] text-stone-soft leading-relaxed">
              <li><strong className="text-stone font-semibold">Tenanted properties:</strong> rent collected and accounted for to the dollar, and the tenancy managed under the Residential Tenancies Act.</li>
              <li><strong className="text-stone font-semibold">Vacant properties:</strong> weekly checks, securing, winterizing and insurance kept in place, with photos on file.</li>
              <li><strong className="text-stone font-semibold">Reporting:</strong> a monthly statement and a written update every Monday, ready for the file.</li>
              <li><strong className="text-stone font-semibold">The sale:</strong> listed by the same team that holds the keys, priced from current sales, with every offer to you the day it arrives.</li>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button as="a" href="tel:+13656457332" size="lg" variant="contrast">
                <Phone className="h-4 w-4" />
                Call (365) 645-7332
              </Button>
              <Button as="a" href="mailto:taran@resolverealestate.ca?subject=Property%20in%20enforcement" size="lg" variant="outline" className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone">
                taran@resolverealestate.ca
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="bg-surface-tint">
        <div className="container py-12 sm:py-14">
          <p className="max-w-3xl mx-auto text-center text-[12.5px] text-ink-mute leading-relaxed">
            Leasing and sales by Taran Aujla, Salesperson, HomeLife G1 Realty
            Inc., Brokerage. Property management by the Resolve management
            team. Details in our{' '}
            <Link to="/terms" className="underline underline-offset-4 hover:text-ink">terms</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
