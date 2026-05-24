import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { BrokerageStrip } from '@/components/landing/BrokerageStrip'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Situations } from '@/components/landing/Situations'
import { Process } from '@/components/landing/Process'
import { WhyResolve } from '@/components/landing/WhyResolve'
import { About } from '@/components/landing/About'
import { Buyers } from '@/components/landing/Buyers'
import { InquiryForm } from '@/components/landing/InquiryForm'
import { Footer } from '@/components/landing/Footer'
import { MobileStickyCta } from '@/components/landing/MobileStickyCta'
import { Seo } from '@/components/seo/Seo'

// -----------------------------------------------------------------------
// Per-route SEO payloads
// -----------------------------------------------------------------------
// Branding posture:
//   - SEO surfaces (title, meta description, OG/Twitter, JSON-LD entity
//     names + descriptions) lead with "Resolve · Seller Representation".
//     The brokerage attribution lives on every page of the site itself
//     (BrokerageStrip top banner + Footer block + About section), which
//     satisfies RECO Bulletin 5.1's "clearly and prominently identified"
//     requirement for the advertisement itself. SERP snippets are
//     previews of the advertisement, not the advertisement, so they
//     stay brand-led.
//
// Compliance posture (still applies):
//   - Practitioner roles are Salesperson (Taran) and Broker (Dave)
//   - No present-tense legal-capacity claims, no outcome guarantees,
//     no "specialist" / "exclusive" / "best" language
//   - RECO registration numbers are factual identifiers in Person JSON-LD
// -----------------------------------------------------------------------

const SITE_URL = 'https://resolveproperty.ca'

const RESOLVE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '2260 Bovaird Dr. E., Suite 202',
  addressLocality: 'Brampton',
  addressRegion: 'ON',
  postalCode: 'L6R 3J5',
  addressCountry: 'CA',
}

// Lightweight Resolve organisation block reused as `worksFor` on the
// practitioner Persons. Keeps the entity graph anchored to the Resolve
// brand instead of the brokerage at the structured-data level.
const RESOLVE_ORG = {
  '@type': 'Organization',
  name: 'Resolve · Seller Representation',
  alternateName: 'Resolve',
  url: `${SITE_URL}/`,
}

const PROFESSIONAL_SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Resolve · Seller Representation',
  alternateName: 'Resolve',
  description:
    'A boutique seller representation practice for Ontario homeowners navigating mortgage arrears, power of sale, separation, estate sales, and property disputes.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
  telephone: '+1-365-645-7332',
  address: RESOLVE_ADDRESS,
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
}

const REAL_ESTATE_AGENT_LD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Resolve · Seller Representation',
  alternateName: 'Resolve',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  telephone: '+1-365-645-7332',
  address: RESOLVE_ADDRESS,
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
  knowsAbout: [
    'Mortgage arrears',
    'Power of sale',
    'Property disputes',
    'Separation and divorce real estate',
    'Estate and probate sales',
    'Life transition sales',
  ],
}

const TARAN_PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Taran Aujla',
  jobTitle: 'Salesperson',
  identifier: 'RECO Registration No. 6024721',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
  worksFor: RESOLVE_ORG,
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
}

const DAVE_PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dave Dhaliwal',
  jobTitle: 'Broker',
  identifier: 'RECO Registration No. 5024155',
  url: `${SITE_URL}/`,
  worksFor: RESOLVE_ORG,
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
}

const HOME_JSONLD = [
  PROFESSIONAL_SERVICE_LD,
  REAL_ESTATE_AGENT_LD,
  TARAN_PERSON_LD,
  DAVE_PERSON_LD,
]

const BUYERS_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Qualified Buyer Network · Resolve',
    url: `${SITE_URL}/buyers`,
    description:
      'Resolve maintains a network of pre-qualified buyers, investors, end-users, and developers interested in Ontario property. Match-based notification with disclosed representation, alongside full MLS exposure.',
    isPartOf: { '@type': 'WebSite', name: 'Resolve', url: `${SITE_URL}/` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Resolve', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Buyer Network', item: `${SITE_URL}/buyers` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Qualified Buyer Network',
    provider: RESOLVE_ORG,
    areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
    audience: {
      '@type': 'Audience',
      audienceType: 'Pre-qualified buyers, investors, end-users, and developers',
    },
    description:
      'A network of pre-qualified buyers across Ontario. Resolve notifies network members only of properties matching their criteria where the seller has consented in writing to share with the network. Multiple representation, where applicable, is disclosed and consented to in writing by both parties before any showing.',
  },
]

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Seo
        title="Resolve · Seller Representation · Ontario"
        description="Boutique seller representation for Ontario homeowners navigating mortgage arrears, power of sale, separation, estate sales, and property disputes."
        canonical={`${SITE_URL}/`}
        jsonLd={HOME_JSONLD}
      />
      <Hero />
      <Situations />
      <WhyResolve />
      <Process />
      <About />
      <InquiryForm />
    </>
  )
}

function BuyersPage() {
  return (
    <>
      <Seo
        title="Qualified Buyer Network · Resolve · Ontario"
        description="A network of pre-qualified buyers, investors, end-users, and developers interested in Ontario property. Match-based notification, disclosed representation, full MLS exposure preserved."
        canonical={`${SITE_URL}/buyers`}
        jsonLd={BUYERS_JSONLD}
      />
      <Buyers />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen bg-white text-ink antialiased selection:bg-accent/20 selection:text-ink">
        <BrokerageStrip />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <MobileStickyCta />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              color: '#0A1F44',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
