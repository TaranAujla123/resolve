import React from 'react'
import { cn } from '@/lib/utils'

export function Wordmark({ className, tone = 'ink' }) {
  return (
    <a
      href="#top"
      aria-label="Resolve, a seller representation service of Taran Aujla at HomeLife G1 Realty Inc., Brokerage"
      className={cn('inline-flex flex-col leading-none group', className)}
    >
      <span
        className={cn(
          'font-display font-bold tracking-[-0.02em] text-[1.6rem] sm:text-[1.7rem] leading-none',
          tone === 'ink' ? 'text-ink' : 'text-white',
        )}
      >
        Resolve<span className="text-accent">.</span>
      </span>
      <span
        className={cn(
          'text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] mt-1 font-medium',
          tone === 'ink' ? 'text-ink-soft' : 'text-white/75',
        )}
      >
        Seller Representation
      </span>
    </a>
  )
}
