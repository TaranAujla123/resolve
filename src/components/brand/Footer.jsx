import React from 'react'
import { Link } from 'react-router-dom'
import { ResolveWordmark } from './ResolveWordmark'

/**
 * Footer — V2 global footer (sitemap edition).
 *
 * Navy background, stone text. Layout:
 *   Row 1: brand + brokerage attribution (compliance) | three link
 *          columns that surface EVERY page, including the landing pages
 *          that are not in the top nav (situation pages, /deals showcase,
 *          multiplex tools, and the gated guides).
 *   Row 2: Led By (Taran + Dave, RECO numbers) + direct contact.
 *   Bottom strip: © + Privacy + Terms + Primegate cross-link.
 *
 * IMPORTANT — link element choice:
 *   - React routes use <Link>.
 *   - The static landing pages (/deals, /plexcheck, /lot-value,
 *     /pays-for-itself, /homeowner-options) are prerendered HTML served
 *     directly by the host, NOT React routes. They MUST use a plain
 *     <a href> so the browser does a full navigation; a React <Link>
 *     would be intercepted by the router and fall through to the
 *     catch-all. The Ext() helper below renders those.
 *
 * COMPLIANCE: this is the one place on every page where the full
 * brokerage attribution must appear. RECO Bulletin 5.1 requires
 * "HomeLife G1 Realty Inc., Brokerage" + Independently Owned & Operated
 * be clearly identified. Do not move or shorten the brand/Led By blocks
 * without compliance review.
 */

const linkCls =
  'text-[14px] text-stone-soft hover:text-bronze transition-colors'
const headCls =
  'text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze'

// Static (non-React-route) landing page — full navigation required.
function Ext({ href, children }) {
  return (
    <a href={href} className={linkCls}>
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy text-stone">
      <div className="container py-14 sm:py-16">
        {/* Row 1 — brand + three link columns */}
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          {/* Brand + brokerage attribution (compliance) */}
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
            <p className="mt-4 text-[13px] leading-relaxed text-stone-mute">
              Serving the Greater Toronto Area, Hamilton, and
              Kitchener-Waterloo. Multiplex opportunities in Ottawa with local
              partners.
            </p>
          </div>

          {/* For Sellers */}
          <div>
            <p className={headCls}>For Sellers</p>
            <ul className="mt-5 space-y-2.5">
              <li><Link to="/sellers" className={linkCls}>Seller representation</Link></li>
              <li><Link to="/power-of-sale" className={linkCls}>Power of sale</Link></li>
              <li><Link to="/mortgage-arrears" className={linkCls}>Mortgage arrears</Link></li>
              <li><Link to="/financial-pressure" className={linkCls}>Financial pressure</Link></li>
              <li><Link to="/time-sensitive-sales" className={linkCls}>Time-sensitive sales</Link></li>
              <li className="pt-1">
                <Link
                  to="/get-help"
                  className="inline-flex items-center gap-1.5 font-semibold text-[14px] text-bronze hover:text-bronze-deep transition-colors"
                >
                  Free 15-min seller call
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers & Multiplex */}
          <div>
            <p className={headCls}>Buyers &amp; Multiplex</p>
            <ul className="mt-5 space-y-2.5">
              <li><Link to="/buyers" className={linkCls}>For buyers</Link></li>
              <li><Ext href="/opportunities/">Current opportunities</Ext></li>
              <li><Link to="/multiplex" className={linkCls}>The Multiplex Advantage</Link></li>
              <li><Ext href="/plexcheck/">PlexCheck lot tool</Ext></li>
              <li className="pt-1">
                <Link
                  to="/get-deals"
                  className="inline-flex items-center gap-1.5 font-semibold text-[14px] text-bronze hover:text-bronze-deep transition-colors"
                >
                  Get matched to lots
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Practice */}
          <div>
            <p className={headCls}>Guides &amp; Practice</p>
            <ul className="mt-5 space-y-2.5">
              <li><Ext href="/lot-value/">Guide: your lot&rsquo;s value</Ext></li>
              <li><Ext href="/pays-for-itself/">Guide: a home that pays for itself</Ext></li>
              <li><Ext href="/homeowner-options/">Guide: homeowner options</Ext></li>
              <li><Link to="/about" className={linkCls}>About Resolve</Link></li>
              <li><Link to="/why-us" className={linkCls}>Why Resolve</Link></li>
              <li><Link to="/for-agents" className={linkCls}>For agents</Link></li>
              <li><Link to="/investor-access" className={linkCls}>Investor Portal</Link></li>
              <li><Link to="/contact" className={linkCls}>Confidential inquiry</Link></li>
            </ul>
          </div>
        </div>

        {/* Row 2 — Led By (compliance) + direct contact */}
        <div className="mt-12 pt-8 border-t border-stone-mute/30 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p className={headCls}>Led By</p>
            <ul className="mt-5 flex flex-col sm:flex-row gap-6 sm:gap-12 text-[14px] leading-relaxed text-stone-soft">
              <li>
                <Link to="/taranaujla" className="font-semibold text-stone hover:text-bronze transition-colors">
                  Taran Aujla
                </Link>
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
          <div className="sm:text-right">
            <p className={headCls}>Contact</p>
            <ul className="mt-5 space-y-2 text-[14px] text-stone-soft">
              <li>
                <a href="tel:+13656457332" className="hover:text-bronze transition-colors">
                  Direct line: (365) 645-7332
                </a>
              </li>
              <li>
                <a href="mailto:info@resolverealestate.ca" className="hover:text-bronze transition-colors">
                  info@resolverealestate.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-8 border-t border-stone-mute/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between text-[12.5px] text-stone-mute leading-relaxed">
            <p>&copy; {new Date().getFullYear()} Resolve. All rights reserved.</p>
            <p className="sm:text-right">
              <Link to="/privacy" className="underline hover:text-bronze">
                Privacy Policy
              </Link>
              {' · '}
              <Link to="/terms" className="underline hover:text-bronze">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
