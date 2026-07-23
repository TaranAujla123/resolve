import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

/**
 * MobileStickyCta — V2 sticky mobile bottom bar.
 *
 * Persistent access to the three primary actions: call, text, or
 * jump to the consultation form. Hidden on md+ (desktop has the
 * header CTA + hero CTAs always reachable).
 *
 * Visibility rules:
 *   - On the homepage: appears once the visitor has scrolled past
 *     the hero (uses #top sentinel via IntersectionObserver).
 *   - On every other content page (situations, about, buyers,
 *     for-agents, privacy): appears immediately on mount — these
 *     pages have no equivalent hero CTA row, so the bar is the
 *     primary call/text/inquire affordance.
 *   - Hidden on /contact and /thanks (the inquire button leads to
 *     /contact, and the thank-you confirmation doesn't need it).
 *
 * V2 styling:
 *   - Navy field with bronze accents
 *   - "Inquire" button is bronze-fill (primary) so it reads as the
 *     hero action; Call + Text are quieter outlined chips
 *   - Inquire links to /contact (V2 has no homepage inline form)
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'
  // Routes where the bar is suppressed entirely.
  const SUPPRESS = ['/contact', '/thanks']
  const suppressed = SUPPRESS.some(
    (p) => location.pathname === p || location.pathname === `${p}/`,
  )

  useEffect(() => {
    if (suppressed) {
      setVisible(false)
      return
    }
    if (!onHome) {
      // On every non-home content page, the bar is visible immediately.
      setVisible(true)
      return
    }
    // Homepage — gate on hero exit.
    const hero = document.getElementById('top') || document.querySelector('section')
    if (!hero) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [onHome, suppressed, location.pathname])

  if (suppressed) return null

  return (
    <div
      aria-hidden={!visible}
      className={[
        'md:hidden fixed bottom-0 inset-x-0 z-40',
        'bg-navy/95 backdrop-blur-md border-t border-bronze/30',
        'shadow-[0_-6px_24px_-12px_rgba(5,26,44,0.45)]',
        'transition-transform duration-300 ease-out',
        // iOS safe-area bottom inset so the bar clears the home indicator.
        'pb-[env(safe-area-inset-bottom)]',
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none',
      ].join(' ')}
    >
      <div className="container py-2.5">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+13656457332"
            className="
              flex flex-col items-center justify-center gap-1 py-2.5 min-h-[48px]
              rounded-[12px] border border-stone/20 text-stone
              hover:bg-stone/10 active:bg-stone/15 transition-colors
            "
          >
            <Phone className="h-4 w-4 text-bronze" strokeWidth={1.9} />
            <span className="font-sans font-semibold text-[11.5px] tracking-wide">
              Call
            </span>
          </a>
          <a
            href="sms:+13656457332"
            className="
              flex flex-col items-center justify-center gap-1 py-2.5 min-h-[48px]
              rounded-[12px] border border-stone/20 text-stone
              hover:bg-stone/10 active:bg-stone/15 transition-colors
            "
          >
            <MessageSquare className="h-4 w-4 text-bronze" strokeWidth={1.9} />
            <span className="font-sans font-semibold text-[11.5px] tracking-wide">
              Text
            </span>
          </a>
          <Link
            to="/contact"
            className="
              flex flex-col items-center justify-center gap-1 py-2.5 min-h-[48px]
              rounded-[12px] bg-bronze text-white
              hover:bg-bronze-deep active:bg-bronze-deep transition-colors
            "
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
            <span className="font-sans font-semibold text-[11.5px] tracking-wide">
              Inquire
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
