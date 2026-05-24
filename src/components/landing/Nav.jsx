import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from './Wordmark'
import { cn } from '@/lib/utils'

// Home page nav items. Section anchors plus the Buyers route.
const homeLinks = [
  { href: '#situations', label: 'Situations', type: 'anchor' },
  { href: '#why', label: 'Why Us', type: 'anchor' },
  { href: '#process', label: 'Process', type: 'anchor' },
  { href: '#about', label: 'About', type: 'anchor' },
  { to: '/buyers', label: 'Buyers', type: 'route' },
  { href: '#contact', label: 'Contact', type: 'anchor' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  // Routes that get the slim nav (wordmark + back-to-home only): every
  // page that is not the homepage. Keeps focus on the page's own CTA.
  const isHome = location.pathname === '/'
  const isSlim = !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const headerClass = cn(
    'sticky top-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-white/90 backdrop-blur-md border-b border-surface-line shadow-[0_1px_0_rgba(15,23,42,0.02)]'
      : 'bg-white/70 backdrop-blur-sm border-b border-transparent',
  )

  // Slim nav on /buyers and on the dedicated situation pages
  // (/power-of-sale, /mortgage-arrears, etc.): wordmark + back to home
  // only. Keeps the page focused on its own CTA.
  if (isSlim) {
    return (
      <header className={headerClass}>
        <div className="container flex items-center justify-between h-16 sm:h-[72px]">
          <Wordmark />
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink font-medium transition-colors px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>
    )
  }

  // Default home nav.
  return (
    <header className={headerClass}>
      <div className="container flex items-center justify-between h-16 sm:h-[72px]">
        <Wordmark />
        <nav className="hidden lg:flex items-center gap-8">
          {homeLinks.map((l) =>
            l.type === 'route' ? (
              <Link
                key={l.to}
                to={l.to}
                className="text-[14px] text-ink-soft hover:text-ink font-medium transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-ink-soft hover:text-ink font-medium transition-colors"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="tel:+13656457332"
            className="hidden md:inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink font-medium transition-colors px-3 py-2 rounded-lg"
          >
            <Phone className="h-4 w-4" />
            (365) 645-7332
          </a>
          <Button as="a" href="#contact" size="sm" variant="primary" className="hidden sm:inline-flex">
            Request a Private Consultation
          </Button>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-ink hover:bg-surface-tint"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-surface-line bg-white">
          <div className="container py-3 flex flex-col">
            {homeLinks.map((l) =>
              l.type === 'route' ? (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-ink font-medium"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-ink font-medium"
                >
                  {l.label}
                </a>
              ),
            )}
            <a
              href="tel:+13656457332"
              className="py-2.5 text-ink font-medium inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" /> (365) 645-7332
            </a>
            <Button
              as="a"
              href="#contact"
              size="md"
              variant="primary"
              className="mt-2 mb-3 w-full"
              onClick={() => setOpen(false)}
            >
              Request a Private Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
