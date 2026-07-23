import React from 'react'
import { Link } from 'react-router-dom'
import { ResolveWordmark } from './ResolveWordmark'

/**
 * Footer — V2 global footer.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Global footer)
 *
 * Navy background, stone text. Three columns:
 *   1. Wordmark (dark variant) + brokerage attribution + IO&O + address
 *   2. Led By — Taran Aujla, Salesperson, RECO 6024721
 *               Dave Dhaliwal, Salesperson, RECO 5024155
 *   3. Contact — direct line, email, Privacy Policy, Primegate
 *
 * Bottom strip carries © + Privacy Policy + Meta Pixel disclosure line
 * + cross-link to Primegate.
 *
 * COMPLIANCE: this is the one place on every page where the full
 * brokerage attribution must appear. RECO Bulletin 5.1 requires
 * "HomeLife G1 Realty Inc., Brokerage" + Independently Owned & Operated
 * be clearly identified. Do not move or shorten this block without
 * compliance review.
 */
export function Footer() {
  return (
    <footer className="bg-navy text-stone">
      <div className="container py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          {/* Column 1 — wordmark + brokerage attribution.
              V3: PNG lockup (dark variant) sized via height class. */}
          <div>
            <ResolveWordmark variant="dark" className="h-12" />
            <p className="mt-6 text-[14px] leading-relaxed text-stone-soft">
              Real estate services delivered through{' '}
              <span className="font-semibold text-stone">
                HomeLife G1 Realty Inc., Brokerage
              </span>
              .
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-stone-mute">
              Independently Owned &amp; Operated
              <br />
              2260 Bovaird Dr. E., Suite 202
              <br />
              Brampton, ON&nbsp; L6R 3J5
            </p>
          </div>

          {/* Column 2 — Led By (Taran + Dave) */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze">
              Led By
            </p>
            <ul className="mt-5 space-y-5 text-[14px] leading-relaxed text-stone-soft">
              <li>
                <p className="font-semibold text-stone">Taran Aujla</p>
                <p className="text-stone-mute">Salesperson</p>
                <p className="text-stone-mute">RECO Reg. No. 6024721</p>
              </li>
              <li>
                <p className="font-semibold text-stone">Dave Dhaliwal</p>
                <p className="text-stone-mute">Salesperson</p>
                <p className="text-stone-mute">RECO Reg. No. 5024155</p>
              </li>
            </ul>
          </div>

          {/* Column 3 — contact */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze">
              Contact
            </p>
            {/*
              Fast-lane CTAs. The /get-help and /get-deals pages are the
              highest-converting entry points on the site — 2-field form,
              above-fold, 24-hour callback promise. Giving them a bronze
              hairline separator + bronze font weight so they read as
              "start here if you want a fast reply" without overwhelming
              the rest of the Contact list. Site-visitors who don't come
              in via paid ads still get the same fast-lane path.
            */}
            <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-stone-soft">
              <li>
                <Link
                  to="/get-help"
                  className="inline-flex items-center gap-1.5 font-semibold text-bronze hover:text-bronze-deep transition-colors"
                >
                  Sellers — Free 15-min call
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/get-deals"
                  className="inline-flex items-center gap-1.5 font-semibold text-bronze hover:text-bronze-deep transition-colors"
                >
                  Investors — Join the buyer list
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li aria-hidden="true" className="pt-1">
                <div className="h-px w-8 bg-stone-mute/40" />
              </li>
              <li>
                <a
                  href="tel:+13656457332"
                  className="hover:text-bronze transition-colors"
                >
                  Direct line: (365) 645-7332
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@resolveproperty.ca"
                  className="hover:text-bronze transition-colors"
                >
                  info@resolveproperty.ca
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-bronze transition-colors"
                >
                  Confidential inquiry form
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-bronze transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://prime-gate.ca"
                  className="hover:text-bronze transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Primegate (buyer side) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 pt-8 border-t border-stone-mute/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between text-[12.5px] text-stone-mute leading-relaxed">
            <p>&copy; {new Date().getFullYear()} Resolve. All rights reserved.</p>
            <p className="sm:text-right max-w-md">
              This site uses Meta Pixel + Conversions API for ad measurement.
              Email and phone are hashed before transmission. See the{' '}
              <Link to="/privacy" className="underline hover:text-bronze">
                Privacy Policy
              </Link>{' '}
              for the full data flow.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
