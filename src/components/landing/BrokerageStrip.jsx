import React from 'react'
import { Lock } from 'lucide-react'

export function BrokerageStrip() {
  return (
    <div className="w-full bg-ink text-white/90 text-[12px] sm:text-[13px]">
      <div className="container flex items-center justify-between gap-4 py-2.5">
        <p className="truncate">
          Real estate services by Resolve, delivered through{' '}
          <span className="font-semibold text-white">HomeLife G1 Realty Inc., Brokerage</span>
          <span className="hidden sm:inline text-white/60"> · Independently Owned &amp; Operated</span>
        </p>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Investor Portal login. Opens the gated Investment Desk
              (Cloudflare Access email-PIN login) in a new tab. Points at
              the pages.dev host, which is the verified-gated URL; swap to
              portal.resolverealestate.ca once that custom domain is
              confirmed gated. */}
          <a
            href="https://resolve-portal.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
          >
            <Lock className="h-3 w-3 text-bronze" strokeWidth={2} aria-hidden="true" />
            <span>Investor Login</span>
          </a>
          <a
            href="tel:+13656457332"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
          >
            <span aria-hidden>·</span>
            <span>Direct: (365) 645-7332</span>
          </a>
        </div>
      </div>
    </div>
  )
}
