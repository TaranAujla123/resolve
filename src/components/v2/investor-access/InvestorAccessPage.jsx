import React from 'react'
import { Link } from 'react-router-dom'
import { Lock, ArrowUpRight, ArrowRight } from 'lucide-react'
import { Seo } from '@/components/seo/Seo'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { Button } from '@/components/brand/Button'

/**
 * InvestorAccessPage — /investor-access.
 *
 * The branded "door" that sits in FRONT of the Cloudflare Access login
 * for the Resolve Investment Desk portal. Cloudflare's own login page
 * cannot be customised with a "join" link, so this page owns the two-
 * path messaging:
 *
 *   1. Members  → "Have an account? Enter your email for a code" →
 *      opens the gated portal (Cloudflare emails a one-time code).
 *   2. Non-members → "Not a member? Join the buyer network" → /get-deals
 *      (the existing Buyer Network signup).
 *
 * Reached from the header "Investor Login" link. noindex — this is a
 * gateway, not organic-search content, and should not compete with the
 * seller-side pages.
 *
 * Portal URL points at the verified-gated pages.dev host; swap to
 * portal.resolverealestate.ca once that custom domain is confirmed gated.
 */
const PORTAL_URL = 'https://resolve-portal.pages.dev'

export function InvestorAccessPage() {
  return (
    <>
      <Seo
        title="Investor Portal · Resolve"
        description="Sign in to the Resolve Investment Desk, or join the buyer network for first look at motivated-seller and off-market opportunities. HomeLife G1 Realty Inc., Brokerage."
        canonical="https://www.resolverealestate.ca/investor-access"
        noindex
      />

      {/* No data-surface="navy" here on purpose: this page's navy hero
          does NOT tuck up under the sticky header, so we want the header
          in its SOLID state (white background, navy text + light-surface
          logo) rather than the transparent white-text treatment, which
          would be invisible on the light bar. */}
      <section className="bg-navy section-y min-h-[72vh] flex items-center">
        <div className="container max-w-4xl">
          <Eyebrow>Investor Portal</Eyebrow>
          <h1 className="mt-5 font-display font-medium text-stone text-display-xl">
            The Investment Desk.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-stone/75">
            Underwriting, acquisition playbooks, and market intelligence for
            the buyers and investors we work with directly. Access is private
            and by approval.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Members */}
            <div className="rounded-2xl border border-bronze/40 bg-stone/[0.05] p-8 flex flex-col">
              <div className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold uppercase tracking-[0.18em]">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                Members
              </div>
              <h2 className="mt-4 font-display font-medium text-stone text-[1.6rem] leading-tight">
                Have an account?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone/70 flex-1">
                Enter your email on the next screen and we send a one-time
                code. No password to remember.
              </p>
              <Button
                as="a"
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="mt-6 w-full justify-center"
              >
                Sign in to the Desk
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>

            {/* Non-members */}
            <div className="rounded-2xl border border-stone/20 bg-stone/[0.02] p-8 flex flex-col">
              <div className="text-stone/55 text-[12px] font-semibold uppercase tracking-[0.18em]">
                Not a member?
              </div>
              <h2 className="mt-4 font-display font-medium text-stone text-[1.6rem] leading-tight">
                Join the buyer network.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone/70 flex-1">
                Get first look at motivated-seller and off-market
                opportunities, matched to your written criteria, before they
                reach the open market.
              </p>
              <Button
                as={Link}
                to="/get-deals"
                variant="outline"
                size="md"
                className="mt-6 w-full justify-center text-stone border-stone/50 hover:bg-stone/10 hover:text-stone"
              >
                Join the buyer network
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </div>

          <p className="mt-10 text-[12px] leading-relaxed text-stone/45 max-w-2xl">
            The Investment Desk is a private workspace, shared by invitation.
            Real estate services by Resolve, delivered through HomeLife G1
            Realty Inc., Brokerage. Independently Owned &amp; Operated.
          </p>
        </div>
      </section>
    </>
  )
}
