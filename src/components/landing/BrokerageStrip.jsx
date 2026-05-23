import React from 'react'

export function BrokerageStrip() {
  return (
    <div className="w-full bg-ink text-white/90 text-[12px] sm:text-[13px]">
      <div className="container flex items-center justify-between gap-4 py-2.5">
        <p className="truncate">
          A service of <span className="font-semibold text-white">HomeLife G1 Realty Inc., Brokerage</span>
          <span className="hidden sm:inline text-white/60"> · Independently Owned &amp; Operated</span>
        </p>
        <a
          href="tel:+13656457332"
          className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
        >
          <span aria-hidden>·</span>
          <span>Direct: (365) 645-7332</span>
        </a>
      </div>
    </div>
  )
}
