import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

// Mobile-only sticky bottom bar. Appears once the visitor has scrolled
// past the hero (`#top`), giving them persistent access to the three
// primary actions: call, text, or jump to the inquiry form. Hidden on
// md and up because desktop has the full hero CTAs and brokerage strip
// always visible.
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    if (!onHome) {
      setVisible(false)
      return
    }
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [onHome])

  if (!onHome) return null

  return (
    <div
      aria-hidden={!visible}
      className={[
        'md:hidden fixed bottom-0 inset-x-0 z-40',
        'bg-white/95 backdrop-blur-md border-t border-surface-line',
        'shadow-[0_-4px_24px_-12px_rgba(15,23,42,0.18)]',
        'transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none',
      ].join(' ')}
    >
      <div className="container py-2.5">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+13656457332"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-surface-line text-ink hover:bg-surface-tint active:bg-surface-tint transition-colors"
          >
            <Phone className="h-4 w-4 text-accent-deep" />
            <span className="text-[11.5px] font-semibold tracking-wide">Call</span>
          </a>
          <a
            href="sms:+13656457332"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-surface-line text-ink hover:bg-surface-tint active:bg-surface-tint transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-accent-deep" />
            <span className="text-[11.5px] font-semibold tracking-wide">Text</span>
          </a>
          <a
            href="#contact"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-ink text-white hover:bg-[#0d2855] active:bg-[#0d2855] transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="text-[11.5px] font-semibold tracking-wide">Inquire</span>
          </a>
        </div>
      </div>
    </div>
  )
}
