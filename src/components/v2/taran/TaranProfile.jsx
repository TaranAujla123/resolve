import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'
import portrait from '@/portrait.jpg'

/**
 * /taranaujla — a canonical "hub" profile page for Taran Aujla.
 *
 * Purpose is twofold: a real, indexable page about Taran (an extra
 * page-1 asset for his name query), and the human-visible half of the
 * entity graph — it links out to every property and profile he owns, so
 * Google (and people) can see they are one person. The machine-readable
 * half (Person JSON-LD with sameAs + backend-only legal-name
 * alternateName) is wired in App.jsx on this route.
 *
 * Compliance: same conservative register as the About page — credibility
 * sourced to Realtor merit; the legal background is a single factual
 * past-tense line; no holding-out, no guarantees, no em dashes. The
 * legal name (Tarnjit Singh Aujla) is NOT shown here by design; it lives
 * only in structured data.
 */

const PROPERTIES = [
  {
    label: 'Resolve Real Estate',
    href: '/',
    internal: true,
    note: 'Seller representation and complex Ontario sales.',
  },
  {
    label: 'Primegate',
    href: 'https://prime-gate.ca',
    note: 'Off-market acquisitions and development.',
  },
  {
    label: 'taranaujla.ca',
    href: 'https://www.taranaujla.ca',
    note: 'Personal site and writing.',
  },
  {
    label: 'ALFA Rebuild',
    href: 'https://www.alfarebuild.com',
    note: 'A venture I co-founded.',
  },
  {
    label: 'REALTOR.ca',
    href: 'https://www.realtor.ca/agent/2260569/taran-aujla-202-2260-bovaird-dr-east-brampton-ontario-l6r3j5',
    note: 'Registered agent profile.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/itstaranaujla/',
    note: 'Professional profile.',
  },
  {
    label: 'IBBA Canada',
    href: 'https://ibbacanada.org/broker/taran-aujla/',
    note: 'Business brokerage profile.',
  },
]

export function TaranProfile() {
  return (
    <>
      {/* HERO — navy. No data-surface so the sticky header renders solid. */}
      <section className="bg-navy section-y">
        <div className="container max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-7 sm:gap-9 items-start">
            <img
              src={portrait}
              alt="Taran Aujla, Real Estate Salesperson, Ontario"
              width="160"
              height="200"
              className="w-32 h-40 sm:w-44 sm:h-56 object-cover object-center rounded-[16px] border border-stone/20 flex-shrink-0"
            />
            <div className="min-w-0">
              <Eyebrow>Salesperson · HomeLife G1 Realty Inc., Brokerage</Eyebrow>
              <h1 className="mt-4 font-display font-medium text-stone text-display-xl leading-[1.05]">
                Taran Aujla
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-stone/80">
                Real estate Salesperson in Ontario. Investor, former real
                estate lawyer, and problem-solver, focused on complex sales and
                on value-add property for buyers who look past the price to what
                a home could become.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button as={Link} to="/contact" variant="primary" size="md">
                  Work with Taran
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </Button>
                <Button
                  as="a"
                  href="tel:+13656457332"
                  variant="outline"
                  size="md"
                  className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                  (365) 645-7332
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO — conservative, Realtor-merit register, one legal line */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container max-w-3xl">
          <Eyebrow>Background</Eyebrow>
          <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-navy-soft">
            <p>
              I come at real estate from two sides: as an investor, and for
              close to a decade as a real estate lawyer. I began managing my
              family&rsquo;s rentals as a teenager and have owned and operated my
              own since. In practice I closed several hundred transactions, and
              the same lesson held on both sides: most problems that surface at
              closing are preventable, and they trace back to how the deal was
              put together at the start.
            </p>
            <p>
              I work as a real estate Salesperson now, focused on the sales that
              are anything but routine, power of sale, mortgage arrears, estate
              sales, financial pressure, and time-sensitive closings, and on
              value-add property for buyers who look past the price to what a
              home could become.
            </p>
            <p className="text-[14px] text-navy-mute">
              Salesperson, HomeLife G1 Realty Inc., Brokerage. Independently
              Owned &amp; Operated. RECO Reg. No. 6024721.
            </p>
          </div>
        </div>
      </section>

      {/* ACROSS THE WEB — the visible half of the entity graph */}
      <section data-surface="mist" className="bg-mist section-y">
        <div className="container max-w-4xl">
          <Eyebrow>Find Taran</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-navy text-display-md">
            Across the web.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROPERTIES.map((p) =>
              p.internal ? (
                <Link
                  key={p.label}
                  to={p.href}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-divider bg-white p-6 transition-colors hover:border-bronze/50"
                >
                  <div>
                    <p className="font-display font-medium text-navy text-[1.1rem]">{p.label}</p>
                    <p className="mt-1 text-[14px] text-navy-soft leading-relaxed">{p.note}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-bronze shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" strokeWidth={1.9} aria-hidden="true" />
                </Link>
              ) : (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-divider bg-white p-6 transition-colors hover:border-bronze/50"
                >
                  <div>
                    <p className="font-display font-medium text-navy text-[1.1rem]">{p.label}</p>
                    <p className="mt-1 text-[14px] text-navy-soft leading-relaxed">{p.note}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-bronze shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.9} aria-hidden="true" />
                </a>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  )
}
