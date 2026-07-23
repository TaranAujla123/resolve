import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ResolveWordmark } from './ResolveWordmark'
import { Button } from './Button'

/**
 * Header — V3.5 global header with a scroll transition.
 *
 * On pages whose top section is navy (home, /for-agents), the nav
 * starts TRANSPARENT so the navy hero reads full-bleed to the top edge
 * (logo + links in stone, outlined stone Contact). Once the visitor
 * scrolls past the hero into the light body, the nav becomes SOLID
 * WHITE — navy links, the light-surface (gold "re" / navy "solve")
 * logo, and a gold Contact button. On light-top pages the nav is solid
 * white from the start.
 *
 * The hero pages pull their hero up under the sticky header (negative
 * top margin) so the transparent nav overlays the image. The navy
 * BrokerageStrip sits above the header in flow and scrolls away.
 */
const NAV_ITEMS = [
  { to: '/#situations', label: 'Situations We Handle', isAnchor: true },
  { to: '/#why-resolve', label: 'Why Us', isAnchor: true },
  { to: '/#how-we-help', label: 'How We Help', isAnchor: true },
  { to: '/about', label: 'About' },
  { to: '/buyers', label: 'For Buyers' },
  { to: '/for-agents', label: 'For Agents' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(true)
  const location = useLocation()

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Transparent-over-navy-hero → solid-white-on-scroll. Solid whenever
  // the page's first section is NOT navy, or once that navy hero has
  // scrolled up under the nav.
  useEffect(() => {
    const compute = () => {
      const first = document.querySelector('main section')
      const topIsNavy = first && first.getAttribute('data-surface') === 'navy'
      if (!topIsNavy) {
        setSolid(true)
        return
      }
      setSolid(first.getBoundingClientRect().bottom <= 80)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [location.pathname])

  // When the mobile menu is open, force the readable (solid) treatment
  // so the panel and bar don't sit transparent over the hero.
  const barSolid = solid || open

  const linkBase = 'font-sans font-medium text-[14.5px] transition-colors py-1 border-b-[2px]'

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-colors duration-300',
        barSolid
          ? 'bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90 border-b border-divider text-navy'
          : 'bg-transparent border-b border-transparent text-stone',
      ].join(' ')}
    >
      <div className="container flex items-center justify-between h-[64px] sm:h-[80px]">
        <Link to="/" aria-label="Resolve — home" className="inline-flex items-center">
          {/* Wordmark + live-text descriptor lockup. The descriptor is
              rendered as HTML (not baked into the PNG) so it stays crisp
              at nav size. Gold divider + "REAL ESTATE" in both states. */}
          <span className="inline-flex flex-col items-center leading-none">
            <ResolveWordmark
              variant={barSolid ? 'light' : 'dark'}
              showDescriptor={false}
              className="h-[30px] sm:h-[35px]"
            />
            <span aria-hidden="true" className="mt-[6px] h-px w-[78%] bg-bronze/55" />
            <span className="mt-[5px] font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-bronze pl-[0.34em]">
              Real Estate
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) =>
            item.isAnchor ? (
              <a
                key={item.to}
                href={item.to}
                className={[
                  linkBase,
                  'border-transparent',
                  barSolid ? 'text-navy hover:text-bronze' : 'text-stone/80 hover:text-stone',
                ].join(' ')}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    linkBase,
                    barSolid
                      ? isActive
                        ? 'text-navy border-bronze'
                        : 'text-navy border-transparent hover:text-bronze'
                      : isActive
                        ? 'text-stone border-bronze'
                        : 'text-stone/80 border-transparent hover:text-stone',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          {barSolid ? (
            <Button as={Link} to="/contact" variant="primary" size="sm">
              Contact us
            </Button>
          ) : (
            <Button
              as={Link}
              to="/contact"
              variant="outline"
              size="sm"
              className="text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
            >
              Contact us
            </Button>
          )}
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={[
            'lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-md transition-colors',
            barSolid ? 'text-navy hover:bg-navy/5' : 'text-stone hover:bg-white/10',
          ].join(' ')}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel — always solid white (the bar is forced solid when
          open) so links read cleanly. */}
      {open && (
        <div className="lg:hidden border-t border-divider bg-surface">
          <nav className="container py-4 flex flex-col">
            {NAV_ITEMS.map((item) =>
              item.isAnchor ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-sans font-medium text-[15px] text-navy hover:text-bronze"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-sans font-medium text-[15px] text-navy hover:text-bronze"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button
              as={Link}
              to="/contact"
              variant="primary"
              size="md"
              className="mt-3 mb-2 w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Contact us
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
