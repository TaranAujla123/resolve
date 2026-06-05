import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Privacy Policy page (/privacy).
 *
 * Reflects the actual data practices of the site after the Meta Pixel +
 * Conversions API were added: what is collected, why, who it is shared
 * with, the PIPEDA basis, and how to withdraw. Plain language, Resolve
 * voice (calm, no guarantees, no em dashes). Kept in sync with the
 * footer privacy notice and the Meta Pixel/CAPI implementation.
 */

const UPDATED = 'June 2026'

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

export function PrivacyPolicy() {
  return (
    <section>
      <div className="container section-y">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-accent-deep">
            Privacy
          </p>
          <h1 className="mt-3 text-display-lg text-ink font-display font-semibold leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-mute">Last updated: {UPDATED}</p>

          <P>
            This policy explains what information this website collects, why, and
            how it is handled. Resolve provides seller representation through
            HomeLife G1 Realty Inc., Brokerage. We keep data collection lean and
            use it only for the purposes set out below.
          </P>

          <H>Information you give us</H>
          <P>
            When you send a message through the inquiry form, we collect what you
            provide: your name, your phone number or email, the property city or
            area, the situation you select, and any note you add. This is used to
            respond to your inquiry and, if we work together, to provide real
            estate services. It is not sold, rented, or added to any marketing
            list.
          </P>
          <P>
            The form is delivered to us through Formspree, which passes your
            message to our inbox. Your message is also handled by Google Workspace,
            which hosts our email.
          </P>

          <H>Information collected automatically</H>
          <P>
            Like most websites, basic technical information is collected when you
            visit, such as the pages you view, your approximate location, your
            device and browser type, and your IP address. We use this to understand
            which pages are read and which advertising campaigns bring people here,
            so we can spend our advertising budget responsibly.
          </P>

          <H>Analytics and advertising tools</H>
          <P>
            This site may use Google Analytics to measure page visits, and the Meta
            (Facebook and Instagram) Pixel together with the Meta Conversions API to
            measure the performance of our advertising. These tools tell us, in
            aggregate, that an ad led to a visit or an inquiry. We do not use
            session recording, and we do not build or sell an advertising profile of
            you from your visit.
          </P>
          <P>
            When you submit the inquiry form, a hashed (one-way, non-readable)
            version of your email and phone number may be sent to Meta for the sole
            purpose of matching and measuring that ad result. The category of
            situation you selected may be included so we can tell which kinds of
            inquiries our ads produce. Hashing means Meta receives a scrambled value,
            not your actual email or phone number.
          </P>

          <H>Who your information is shared with</H>
          <P>
            We share information only with the service providers that make this site
            and our work function: Formspree and Google (to receive and read your
            message), and Google and Meta (to measure website and advertising
            performance as described above). We do not sell your information, and we
            do not share it with anyone for their own marketing.
          </P>

          <H>Your choices and your rights</H>
          <P>
            Under Canada's Personal Information Protection and Electronic Documents
            Act (PIPEDA), you may ask what personal information we hold about you,
            ask us to correct it, or ask us to delete it. You can also limit the
            advertising tools above by using your browser's privacy settings, an ad
            or tracker blocker, or your device's ad-tracking controls. To make any
            of these requests, contact us using the details below and we will
            respond.
          </P>

          <H>Retention and security</H>
          <P>
            We keep inquiry information only as long as needed to respond to you and,
            where applicable, to meet our record-keeping obligations as a real estate
            practice under TRESA. Information sent to us is transmitted over an
            encrypted connection.
          </P>

          <H>Contact</H>
          <P>
            For any privacy question or request, contact Resolve at{' '}
            <a
              href="mailto:info@resolveproperty.ca"
              className="text-accent-deep hover:text-ink transition-colors font-semibold"
            >
              info@resolveproperty.ca
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

          <H>Changes to this policy</H>
          <P>
            We may update this policy as our practices or tools change. The date at
            the top reflects the most recent update.
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
