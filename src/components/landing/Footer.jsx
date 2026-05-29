import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Wordmark } from './Wordmark'

export function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Wordmark tone="invert" />
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/70 max-w-md">
              Real estate services by Resolve are delivered through HomeLife G1
              Realty Inc., Brokerage. Resolve is not itself a brokerage and does
              not itself trade in real estate. All real estate trades are made
              through HomeLife G1 Realty Inc., Brokerage.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/55 font-medium">
              Brokerage
            </p>
            <p className="mt-3 font-semibold text-white">HomeLife G1 Realty Inc., Brokerage</p>
            <p className="text-[14px] text-white/65">Independently Owned and Operated</p>
            <p className="mt-3 text-[14px] text-white/80">2260 Bovaird Dr. E. Suite 202</p>
            <p className="text-[14px] text-white/80">Brampton, ON L6R 3J5</p>
            <p className="mt-2 text-[14px]">
              Office:{' '}
              <a href="tel:+19057937797" className="text-white hover:text-accent transition-colors">
                (905) 793-7797
              </a>
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/55 font-medium">
              Practitioners
            </p>
            <div className="mt-3 space-y-2.5 text-[14px]">
              <div>
                <p className="font-semibold text-white">Taran Aujla, Salesperson</p>
                <p className="text-white/70">RECO Registration No. 6024721</p>
              </div>
              <div>
                <p className="font-semibold text-white">Dave Dhaliwal, Broker</p>
                <p className="text-white/70">RECO Registration No. 5024155</p>
              </div>
            </div>
            <p className="mt-4 pt-4 border-t border-white/10 text-[14px]">
              <span className="text-white/55 uppercase tracking-[0.12em] text-[11px] font-medium">
                Direct Line
              </span>
              <br />
              <a href="tel:+13656457332" className="text-white hover:text-accent transition-colors text-[15px] font-semibold">
                (365) 645-7332
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            Real estate professional with a difficult seller file?{' '}
            <Link
              to="/for-agents"
              className="text-white/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              See how Resolve takes referrals
            </Link>
            . Brokerage to brokerage under TRESA.
          </p>
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            Also by Taran Aujla.{' '}
            <a
              href="https://prime-gate.ca"
              className="text-white/80 hover:text-accent transition-colors underline-offset-4 hover:underline whitespace-nowrap"
            >
              Primegate<ArrowUpRight className="inline h-3 w-3 ml-0.5 -translate-y-px" aria-hidden="true" />
            </a>
            : representation for investment, land, development, and income-producing real estate.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <p className="lg:col-span-8 text-[12.5px] text-white/55 leading-relaxed">
              The content on this site is informational only and is not legal, accounting,
              or financial advice. References to protecting equity are aspirational and
              are not a guarantee of any specific outcome. Real estate trades require a
              written representation agreement and are conducted under TRESA.
            </p>
            <p className="lg:col-span-4 text-[12.5px] text-white/55 lg:text-right">
              &copy; {new Date().getFullYear()} Resolve. HomeLife G1 Realty Inc., Brokerage.
            </p>
          </div>
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            <span className="text-white/70 uppercase tracking-[0.12em] text-[11px] font-medium">Privacy:</span>{' '}
            We use Google Analytics to understand which pages are read and which campaigns bring people here.
            No session recording, no third-party data sales, no advertising profile built from your visit.
            Form submissions are used only to respond to your inquiry.
          </p>
        </div>
      </div>
    </footer>
  )
}
