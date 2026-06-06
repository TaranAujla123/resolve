import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'

// V2 shared layout — brokerage strip, header, trust strip, footer
// mounted globally.
import { Header } from '@/components/brand/Header'
import { Footer } from '@/components/brand/Footer'
import { TrustStrip } from '@/components/brand/TrustStrip'
import { MobileStickyCta } from '@/components/landing/MobileStickyCta'
import { BrokerageStrip } from '@/components/landing/BrokerageStrip'

// V2 pages (homepage + 3 standalone routes)
import { HomePage as V2HomePage } from '@/components/v2/home/HomePage'
import { ContactPage } from '@/components/v2/contact/ContactPage'
import { AboutPage } from '@/components/v2/about/AboutPage'

// Existing pages — kept as-is, restyled in-place to V2 surfaces and
// typography via the updated SituationPage shell + Tailwind tokens.
import { Buyers } from '@/components/landing/Buyers'
import { PowerOfSale } from '@/components/landing/situations/PowerOfSale'
import { MortgageArrears } from '@/components/landing/situations/MortgageArrears'
import { EstateSale } from '@/components/landing/situations/EstateSale'
import { DivorceRealEstate } from '@/components/landing/situations/DivorceRealEstate'
import { PropertyDisputes } from '@/components/landing/situations/PropertyDisputes'
import { LifeTransitions } from '@/components/landing/situations/LifeTransitions'
import { ForAgents } from '@/components/landing/ForAgents'
import { ThankYou } from '@/components/landing/ThankYou'

// SEO + analytics + Pixel/CAPI hooks — preserved verbatim.
import { Seo } from '@/components/seo/Seo'
import { Analytics, AnalyticsRouteTracker, fireConversion } from '@/components/seo/Analytics'
import { useMetaPixel, useMetaPixelContactLinks } from '@/lib/metaPixel'
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy'

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
//   - Practitioner roles are Salesperson (Taran) and Salesperson (Dave)
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
  // sameAs is Google's primary entity-disambiguation signal for a Person.
  // Each URL listed here tells Google "this Taran Aujla is also the
  // person at that URL", reinforcing the entity graph. The HomeLife G1
  // profile is the strongest institutional anchor (the brokerage's own
  // confirmation of practitioner status). prime-gate.ca is the
  // sister-site link. LinkedIn and taranaujla.ca to be added as those
  // come online.
  sameAs: [
    'https://www.homelifeg1realty.com/Taran-Aujla',
    'https://prime-gate.ca',
  ],
}

const DAVE_PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dave Dhaliwal',
  jobTitle: 'Salesperson',
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
    url: `${SITE_URL}/buyers/`,
    description:
      'Resolve maintains a network of pre-qualified buyers, investors, end-users, and developers interested in Ontario property. Match-based notification with disclosed representation, alongside full MLS exposure.',
    isPartOf: { '@type': 'WebSite', name: 'Resolve', url: `${SITE_URL}/` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Resolve', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Buyer Network', item: `${SITE_URL}/buyers/` },
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

// -----------------------------------------------------------------------
// Situation page JSON-LD helpers
// -----------------------------------------------------------------------
// Each dedicated situation page (e.g. /power-of-sale) ships with three
// structured-data blocks: WebPage (canonical, breadcrumb), Service
// (specific serviceType for Google's entity graph), and a small FAQ-
// adjacent description that helps People-Also-Ask coverage.

function situationJsonLd({ slug, name, serviceType, description, breadcrumbName }) {
  const pageUrl = `${SITE_URL}/${slug}/`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name,
      url: pageUrl,
      description,
      isPartOf: { '@type': 'WebSite', name: 'Resolve', url: `${SITE_URL}/` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Resolve', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Situations', item: `${SITE_URL}/#situations` },
          { '@type': 'ListItem', position: 3, name: breadcrumbName, item: pageUrl },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType,
      provider: RESOLVE_ORG,
      areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
      description,
    },
  ]
}

const POWER_OF_SALE_JSONLD = situationJsonLd({
  slug: 'power-of-sale',
  name: 'Selling a Home in Power of Sale · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Power of Sale (Ontario)',
  breadcrumbName: 'Power of Sale',
  description:
    'Power of sale is a lender-driven sale process in Ontario. Resolve represents homeowners navigating it quietly and quickly, with equity protection at the centre of every decision through to closing.',
})

const MORTGAGE_ARREARS_JSONLD = situationJsonLd({
  slug: 'mortgage-arrears',
  name: 'Selling a Home in Mortgage Arrears · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Mortgage Arrears (Ontario)',
  breadcrumbName: 'Mortgage Arrears',
  description:
    'Behind on mortgage payments and considering a sale? Resolve represents Ontario homeowners through the arrears window, privately and on a defensible timeline, with equity protection at the centre.',
})

const ESTATE_SALE_JSONLD = situationJsonLd({
  slug: 'estate-sale',
  name: 'Selling a Home Through Estate or Probate · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Estate and Probate Sales (Ontario)',
  breadcrumbName: 'Estate or Probate',
  description:
    'Selling a loved one’s home as part of administering an Ontario estate. Resolve represents executors and estate trustees, at the pace the estate allows, in coordination with the estate lawyer.',
})

const DIVORCE_JSONLD = situationJsonLd({
  slug: 'divorce-real-estate',
  name: 'Selling a Home During a Separation or Divorce · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Separation and Divorce Sales (Ontario)',
  breadcrumbName: 'Separation or Divorce',
  description:
    'Selling the matrimonial home during a separation or divorce in Ontario. Resolve represents the sale itself, neutrally, in coordination with both parties’ real estate lawyers.',
})

const PROPERTY_DISPUTES_JSONLD = situationJsonLd({
  slug: 'property-disputes',
  name: 'Selling a Home Through a Property Dispute · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Property and Co-Ownership Disputes (Ontario)',
  breadcrumbName: 'Property Disputes',
  description:
    'Co-ownership friction, partition matters, title clouds, joint-owner disputes. Resolve handles the real estate side of these Ontario sales in close coordination with your real estate lawyer.',
})

const LIFE_TRANSITIONS_JSONLD = situationJsonLd({
  slug: 'life-transitions',
  name: 'Selling a Home Through a Life Transition · Ontario · Resolve',
  serviceType: 'Real Estate Representation: Life Transition Sales (Ontario)',
  breadcrumbName: 'Life Transitions',
  description:
    'Relocation, downsizing, retirement, health-driven moves. Resolve represents Ontario homeowners through life-transition sales on the timeline the move actually allows, in coordination with your accountant or financial planner where relevant.',
})

// /for-agents page is its own thing: not a situation, but a referral
// channel for other Ontario real estate professionals. WebPage +
// Service + breadcrumb under a "For Agents" leaf.
const FOR_AGENTS_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'For Real Estate Professionals · Resolve Referral Partnership · Ontario',
    url: `${SITE_URL}/for-agents/`,
    description:
      'Refer a difficult Ontario seller file to Resolve. Brokerage-to-brokerage referral agreements under TRESA. The referring agent keeps the client relationship and a referral fee is paid at closing under terms agreed for each file.',
    isPartOf: { '@type': 'WebSite', name: 'Resolve', url: `${SITE_URL}/` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Resolve', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'For Agents', item: `${SITE_URL}/for-agents/` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Brokerage-to-Brokerage Seller File Referral (Ontario)',
    provider: RESOLVE_ORG,
    areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
    audience: {
      '@type': 'Audience',
      audienceType: 'Ontario real estate Salespersons and Brokers',
    },
    description:
      'Resolve takes the listing on referred files (power of sale, mortgage arrears, matrimonial home sales, estate sales, property disputes). Referrals are documented brokerage-to-brokerage under TRESA. The referring brokerage is paid a referral fee at closing under the terms agreed for each file.',
  },
]

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Mount-once route tracker that hands react-router's current pathname
// to AnalyticsRouteTracker so GA4 sees SPA navigations as pageviews.
function RouteAnalytics() {
  const { pathname } = useLocation()
  return <AnalyticsRouteTracker pathname={pathname} />
}

// Mount-once Meta Pixel: inits the Pixel, fires PageView on every route
// change and ViewContent on the situation routes, and fires Contact on
// any tel:/sms: link click. Inert unless VITE_META_PIXEL_ID is set.
function MetaPixel() {
  const { pathname } = useLocation()
  useMetaPixel(pathname)
  useMetaPixelContactLinks()
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
      <V2HomePage />
    </>
  )
}

function AboutRoutePage() {
  return (
    <>
      <Seo
        title="About Resolve · Seller Representation · Ontario"
        description="Boutique seller representation for Ontario homeowners. Led by Taran Aujla and Dave Dhaliwal under HomeLife G1 Realty Inc., Brokerage."
        canonical={`${SITE_URL}/about/`}
      />
      <AboutPage />
    </>
  )
}

function ContactRoutePage() {
  return (
    <>
      <Seo
        title="Contact Resolve · Confidential Inquiry · Ontario"
        description="Send a confidential inquiry to Resolve. We read every message personally and typically reply within a few hours during business hours."
        canonical={`${SITE_URL}/contact/`}
      />
      <ContactPage />
    </>
  )
}

function BuyersPage() {
  return (
    <>
      <Seo
        title="Qualified Buyer Network · Resolve · Ontario"
        description="A network of pre-qualified buyers, investors, end-users, and developers interested in Ontario property. Match-based notification, disclosed representation, full MLS exposure preserved."
        canonical={`${SITE_URL}/buyers/`}
        jsonLd={BUYERS_JSONLD}
      />
      <Buyers />
    </>
  )
}

function PowerOfSalePage() {
  return (
    <>
      <Seo
        title="Power of Sale in Ontario · Selling Your Home · Resolve"
        description="Power of sale is a lender-driven sale process in Ontario. Resolve represents homeowners navigating it quietly and quickly, with equity protection at the centre of every decision."
        canonical={`${SITE_URL}/power-of-sale/`}
        jsonLd={POWER_OF_SALE_JSONLD}
      />
      <PowerOfSale />
    </>
  )
}

function MortgageArrearsPage() {
  return (
    <>
      <Seo
        title="Mortgage Arrears in Ontario · Selling Your Home · Resolve"
        description="Behind on mortgage payments and considering a sale? Resolve represents Ontario homeowners through the arrears window, privately and on a defensible timeline."
        canonical={`${SITE_URL}/mortgage-arrears/`}
        jsonLd={MORTGAGE_ARREARS_JSONLD}
      />
      <MortgageArrears />
    </>
  )
}

function ThanksPage() {
  // Fire the Google Ads conversion event once on mount. Safe to call
  // when no Ads ID is configured — the helper returns silently.
  useEffect(() => {
    fireConversion()
  }, [])
  return (
    <>
      <Seo
        title="Inquiry received · Resolve"
        description="Your inquiry has been received. We read each one personally and typically reply within a few hours during business hours."
        canonical={`${SITE_URL}/thanks/`}
        noindex
      />
      <ThankYou />
    </>
  )
}

function EstateSalePage() {
  return (
    <>
      <Seo
        title="Estate or Probate Sale in Ontario · Selling Your Home · Resolve"
        description="Selling a loved one’s home as part of administering an Ontario estate. Resolve represents executors and estate trustees, at the pace the estate allows, in coordination with the estate lawyer."
        canonical={`${SITE_URL}/estate-sale/`}
        jsonLd={ESTATE_SALE_JSONLD}
      />
      <EstateSale />
    </>
  )
}

function DivorceRealEstatePage() {
  return (
    <>
      <Seo
        title="Selling Your Home During Separation or Divorce in Ontario · Resolve"
        description="Selling the matrimonial home during a separation or divorce in Ontario. Resolve represents the sale itself, neutrally and carefully, in coordination with both parties’ real estate lawyers."
        canonical={`${SITE_URL}/divorce-real-estate/`}
        jsonLd={DIVORCE_JSONLD}
      />
      <DivorceRealEstate />
    </>
  )
}

function PropertyDisputesPage() {
  return (
    <>
      <Seo
        title="Selling a Home Through a Property Dispute in Ontario · Resolve"
        description="Co-ownership friction, partition matters, title clouds. Resolve handles the real estate side of these Ontario sales in close coordination with your real estate lawyer."
        canonical={`${SITE_URL}/property-disputes/`}
        jsonLd={PROPERTY_DISPUTES_JSONLD}
      />
      <PropertyDisputes />
    </>
  )
}

function LifeTransitionsPage() {
  return (
    <>
      <Seo
        title="Selling Your Home Through a Life Transition in Ontario · Resolve"
        description="Relocation, downsizing, retirement, health-driven moves. Resolve represents Ontario homeowners through life-transition sales on the timeline the move actually allows."
        canonical={`${SITE_URL}/life-transitions/`}
        jsonLd={LIFE_TRANSITIONS_JSONLD}
      />
      <LifeTransitions />
    </>
  )
}

function ForAgentsPage() {
  return (
    <>
      <Seo
        title="For Real Estate Professionals · Resolve Referral Partnership · Ontario"
        description="Refer a difficult Ontario seller file to Resolve. Brokerage-to-brokerage agreements under TRESA. You keep the client relationship and a referral fee is paid at closing under terms agreed for the file."
        canonical={`${SITE_URL}/for-agents/`}
        jsonLd={FOR_AGENTS_JSONLD}
      />
      <ForAgents />
    </>
  )
}

function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy · Resolve"
        description="What this site collects, why, who it is shared with, and how to withdraw. Resolve seller representation through HomeLife G1 Realty Inc., Brokerage."
        canonical={`${SITE_URL}/privacy/`}
      />
      <PrivacyPolicy />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Analytics />
      <RouteAnalytics />
      <MetaPixel />
      <div className="min-h-screen bg-stone text-navy antialiased selection:bg-bronze/25 selection:text-navy">
        {/*
          V2 global layout. BrokerageStrip sits above the sticky Header
          as a thin first-viewport identification of HomeLife G1 Realty
          Inc., Brokerage (plain text, no external link). The Header
          sits sticky beneath it, the page-level Routes render in the
          main, and the TrustStrip + Footer close every page.

          RECO Bulletin 5.1 ("clearly and prominently identified") is
          satisfied twice over — once at the top of every page via the
          BrokerageStrip and again in the Footer block. The strip
          itself does not hyperlink the brokerage name; it identifies
          the brokerage as the registered entity Resolve operates
          under, not as a separately marketed property.
        */}
        <BrokerageStrip />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutRoutePage />} />
            <Route path="/contact" element={<ContactRoutePage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/power-of-sale" element={<PowerOfSalePage />} />
            <Route path="/mortgage-arrears" element={<MortgageArrearsPage />} />
            <Route path="/estate-sale" element={<EstateSalePage />} />
            <Route path="/divorce-real-estate" element={<DivorceRealEstatePage />} />
            <Route path="/property-disputes" element={<PropertyDisputesPage />} />
            <Route path="/life-transitions" element={<LifeTransitionsPage />} />
            <Route path="/for-agents" element={<ForAgentsPage />} />
            {/* /resources retired — was a hub that only re-listed the
                six situation deep-dive pages. The public/resources/
                static stub handles direct hits + crawler redirects; this
                Navigate covers any internal Link that still points
                there. */}
            <Route path="/resources" element={<Navigate to="/#situations" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/thanks" element={<ThanksPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <TrustStrip />
        <Footer />
        <MobileStickyCta />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid #D8D2C8',
              color: '#051A2C',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
