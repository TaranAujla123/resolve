import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * Site wordmark. Acts as the canonical "back home" affordance in the nav.
 *
 * Behaviour:
 *   - On any non-home route (/buyers, /power-of-sale, /mortgage-arrears,
 *     /estate-sale, /divorce-real-estate, /property-disputes): routes to /.
 *     ScrollToTopOnRouteChange in App.jsx handles scroll reset.
 *   - On / itself: prevents the route change (it would be a no-op) and
 *     smooth-scrolls back to the top of the page instead.
 *
 * The previous implementation used <a href="#top"> which only worked on
 * the homepage where the Hero carries id="top". On every other route the
 * click did nothing useful.
 */
export function Wordmark({ className, tone = 'ink' }) {
  const location = useLocation()

  const handleClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <Link
      to="/"
      onClick={handleClick}
      aria-label="Resolve, Seller Representation. Back to home."
      className={cn('inline-flex flex-col leading-none group', className)}
    >
      <span
        className={cn(
          'font-display font-bold tracking-[-0.02em] text-[1.6rem] sm:text-[1.7rem] leading-none',
          tone === 'ink' ? 'text-ink' : 'text-white',
        )}
      >
        <span className="text-accent">Re</span>solve<span className="text-accent">.</span>
      </span>
      <span
        className={cn(
          'text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] mt-1 font-medium',
          tone === 'ink' ? 'text-ink-soft' : 'text-white/75',
        )}
      >
        Seller Representation
      </span>
    </Link>
  )
}
