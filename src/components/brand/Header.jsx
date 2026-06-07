import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ResolveWordmark } from './ResolveWordmark'
import { Button } from './Button'

/**
 * Header — V2 sticky global header.
 *
 * Source of truth: Brand-System-V2/claude-code-v2-build.md §6 (Global header)
 *
 * Layout:
 *   - Sticky top, Stone background, 1px Light Divider bottom border
 *   - Left: <ResolveWordmark /> with descriptor, font-size 48px desktop /
 *     38px mobile (the brief says 56/44 but the host descriptor sits
 *     comfortably at ~48 in dense nav rows)
 *   - Right: Home / About / How We Help / Situations We Handle /
 *     Resources, then a Navy "Contact Us" button
 *   - Active link gets a 3px bronze bottom border
 *
 * Mobile: collapses to a hamburger that opens a panel with the full
 * nav stack + Contact Us button at the bottom.
 */
// Six primary nav items. Home is dropped because the wordmark on
// the left of the header is itself a clickable "back to /" affordance.
// Resources is dropped because that page only redirected back to the
// same situation deep-dives the Situations grid on the homepage
// already covers.
//
// Order — front-loaded for distressed sellers who landed via search:
//   1. Situations We Handle — does Resolve handle MY situation?
//   2. Why Us               — why this practice over a volume agent?
//   3. How We Help          — what does the process look like?
//   4. About                — who are Taran and Dave?
//   5. For Buyers           — the adjacent path on the buy side
//   6. Partner With Us      — the partnership path for other practitioners
//                             (refer or co-broker, brokerage-to-brokerage)
// Contact is the separate CTA button to the right of the nav row.
const NAV_ITEMS = [
  { to: '/#situations', label: 'Situations We Handle', isAnchor: true },
  { to: '/#why-resolve', label: 'Why Us', isAnchor: true },
  { to: '/#how-we-help', label: 'How We Help', isAnchor: true },
  { to: '/about', label: 'About' },
  { to: '/buyers', label: 'For Buyers' },
  { to: '/for-agents', label: 'Partner With Us' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header
      className="
        sticky top-0 z-50 bg-navy text-stone
        border-b border-white/10
        backdrop-blur supports-[backdrop-filter]:bg-navy/95
      "
    >
      <div className="container flex items-center justify-between h-[68px] sm:h-[84px]">
        <Link
          to="/"
          aria-label="Resolve — home"
          className="inline-flex items-center"
          style={{ fontSize: '42px' }}
        >
          {/*
            translateY(5px) — the wordmark's geometric box centers
            correctly, but the heavy "Re·solve" letters sit in the upper
            half of that box while the tiny SELLER REPRESENTATION
            descriptor sits in the lower half. The eye reads that as
            top-aligned. A 5px downward visual nudge brings the *mass*
            into optical balance with the nav links to the right
            without affecting layout flow.
          */}
          <span
            className="hidden sm:inline"
            style={{ fontSize: '48px', transform: 'translateY(5px)' }}
          >
            <ResolveWordmark variant="dark" />
          </span>
          <span
            className="inline sm:hidden"
            style={{ transform: 'translateY(4px)' }}
          >
            <ResolveWordmark variant="dark" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) =>
            item.isAnchor ? (
              <a
                key={item.to}
                href={item.to}
                className="
                  font-sans font-semibold text-[14.5px] text-stone
                  hover:text-bronze transition-colors
                  py-1 border-b-[3px] border-transparent
                "
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => [
                  'font-sans font-semibold text-[14.5px] text-stone',
                  'hover:text-bronze transition-colors',
                  'py-1 border-b-[3px]',
                  isActive ? 'border-bronze' : 'border-transparent',
                ].join(' ')}
              >
                {item.label}
              </NavLink>
            ),
          )}
          {/* On navy header the primary fill (navy-on-navy) disappears,
              so the CTA flips to outline. text-current inside Button
              picks up the stone text color from the header parent. */}
          <Button as={Link} to="/contact" variant="outline" size="sm">
            Contact Us
          </Button>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-stone hover:bg-white/10 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel — also flipped to navy for continuity with the
          sticky header on small screens. */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy">
          <nav className="container py-4 flex flex-col">
            {NAV_ITEMS.map((item) =>
              item.isAnchor ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-sans font-semibold text-[15px] text-stone hover:text-bronze"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-sans font-semibold text-[15px] text-stone hover:text-bronze"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button
              as={Link}
              to="/contact"
              variant="outline"
              size="md"
              className="mt-3 mb-2 w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
