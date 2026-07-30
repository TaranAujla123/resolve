import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Terms & Conditions page (/terms).
 *
 * General website terms for a real estate practice site. RECO / TRESA
 * compliant: brokerage attribution, Salesperson (never Agent), no
 * holding-out or legal-service claims, no guaranteed outcomes; any real
 * estate relationship is created only by a signed written agreement, not
 * by the site. Plain language, Resolve voice (calm, no em dashes, no
 * guarantees). This is a general template — have it reviewed before
 * relying on it.
 */

const UPDATED = 'July 2026'

function P({ children }) {
  return <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
}

function H({ children }) {
  return (
    <h2 className="mt-10 text-[19px] sm:text-[21px] font-display font-medium text-ink">
      {children}
    </h2>
  )
}

export function Terms() {
  return (
    <section>
      <div className="container section-y">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
            Legal
          </p>
          <h1 className="mt-3 text-display-lg text-ink font-display font-semibold leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-mute">Last updated: {UPDATED}</p>

          <P>
            These terms govern your use of resolverealestate.ca. By using this
            website, you agree to them. If you do not agree, please do not use
            the site.
          </P>

          <H>Who we are</H>
          <P>
            Resolve is the marketing identity of Taran Aujla, Salesperson. Real
            estate services are provided through HomeLife G1 Realty Inc.,
            Brokerage (RECO Registration No. 6024721), Independently Owned and
            Operated. Any real estate relationship is governed by a separate
            written agreement with the brokerage, not by this website.
          </P>

          <H>Information only, not advice</H>
          <P>
            The content on this site is general information about real estate
            situations and services. It is not legal, financial, mortgage, tax,
            or accounting advice, and it is not a substitute for advice from a
            qualified professional for your specific circumstances. Where a
            matter calls for a lawyer, a mortgage professional, or an
            accountant, we help you involve the right person.
          </P>

          <H>No offer or guarantee</H>
          <P>
            Nothing on this site is an offer, a promise of a specific result, or
            a guarantee of price, timing, or outcome. Real estate results depend
            on the property, the market, and factors outside our control. The
            services we provide, and any commitments about them, are set out in
            a written representation or service agreement signed with the
            brokerage.
          </P>

          <H>Brokerage and agency relationships</H>
          <P>
            Real estate trading services are provided through HomeLife G1 Realty
            Inc., Brokerage, and are subject to the Trust in Real Estate
            Services Act, 2002 (TRESA) and its regulations. A client or
            representation relationship, including any multiple representation,
            is created only by a written agreement and the disclosures required
            under TRESA, not by contacting us or using this site.
          </P>

          <H>Your submissions</H>
          <P>
            When you send a message through the site, you confirm that the
            information you provide is accurate and that you have the right to
            share it. We handle the information you send as described in our{' '}
            <Link to="/privacy" className="text-accent-deep hover:text-ink transition-colors font-semibold">
              Privacy Policy
            </Link>
            .
          </P>

          <H>Intellectual property</H>
          <P>
            The text, design, logos, and materials on this site are owned by
            Resolve or used with permission and are protected by law. You may
            view the site and share links to it, but you may not copy,
            reproduce, or reuse its content for commercial purposes without
            written permission.
          </P>

          <H>Other websites</H>
          <P>
            This site may link to websites we do not control. We are not
            responsible for their content, accuracy, or practices, and following
            an external link is at your own discretion.
          </P>

          <H>Limitation of liability</H>
          <P>
            This site is provided on an as-is basis. To the extent permitted by
            law, Resolve, Taran Aujla, and HomeLife G1 Realty Inc., Brokerage are
            not liable for any loss arising from your use of, or reliance on, the
            general information on this site. This does not limit any obligation
            owed to you under a signed service agreement or under applicable law.
          </P>

          <H>Governing law</H>
          <P>
            These terms are governed by the laws of the Province of Ontario and
            the laws of Canada that apply there. Any dispute relating to this
            site will be dealt with in the courts of Ontario.
          </P>

          <H>Changes to these terms</H>
          <P>
            We may update these terms as the site or our practices change. The
            date at the top reflects the most recent update, and continued use
            of the site means you accept the current terms.
          </P>

          <H>Contact</H>
          <P>
            Questions about these terms? Contact Resolve at{' '}
            <a
              href="mailto:info@resolverealestate.ca"
              className="text-accent-deep hover:text-ink transition-colors font-semibold"
            >
              info@resolverealestate.ca
            </a>{' '}
            or call{' '}
            <a
              href="tel:+13656457332"
              className="text-accent-deep hover:text-ink transition-colors font-semibold"
            >
              (365) 645-7332
            </a>
            . Real estate services are delivered through HomeLife G1 Realty Inc.,
            Brokerage, 2260 Bovaird Dr. E. Suite 202, Brampton, ON L6R 3J5.
          </P>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent-deep hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
