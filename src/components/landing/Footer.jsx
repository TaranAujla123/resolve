import React from 'react'
import { Wordmark } from './Wordmark'

export function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Wordmark tone="invert" />
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/70 max-w-md">
              Resolve is a trade name used by Taran Aujla in connection with real
              estate services provided through HomeLife G1 Realty Inc., Brokerage.
              Resolve is not a brokerage and does not itself trade in real estate.
              All real estate trades are made through HomeLife G1 Realty Inc.,
              Brokerage.
            </p>
          </div>

          <div className="lg:col-span-4">
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

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/55 font-medium">
              Practitioner
            </p>
            <p className="mt-3 font-semibold text-white">Taran Aujla, Salesperson</p>
            <p className="mt-2 text-[14px]">
              Direct:{' '}
              <a href="tel:+13656457332" className="text-white hover:text-accent transition-colors">
                (365) 645-7332
              </a>
            </p>
            <p className="mt-1 text-[14px] text-white/70">RECO Registration No. 6024721</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <p className="lg:col-span-8 text-[12.5px] text-white/55 leading-relaxed">
            The content on this site is informational only and is not legal, accounting,
            or financial advice. References to protecting equity are aspirational and
            are not a guarantee of any specific outcome. Real estate trades require a
            written representation agreement and are conducted under TRESA.
          </p>
          <p className="lg:col-span-4 text-[12.5px] text-white/55 lg:text-right">
            &copy; {new Date().getFullYear()} Taran Aujla, Salesperson. HomeLife G1 Realty Inc., Brokerage.
          </p>
        </div>
      </div>
    </footer>
  )
}
