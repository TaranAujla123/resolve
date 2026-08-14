import React from 'react'
import { Link } from 'react-router-dom'
import { Check, FileSearch, UserCheck, Gem, Scale, ShieldCheck, Award, Network, Users } from 'lucide-react'
import { Eyebrow } from '@/components/brand/Eyebrow'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ClosingCta } from '../home/ClosingCta'

/**
 * WhyUsPage — /why-us.
 *
 * A practice-level, TWO-SIDED trust page. "Why Resolve" used to be an
 * anchor to the seller page's DifferentApproach section; it earned its
 * own page in the Aug 2026 hub restructure because the differentiator is
 * the same judgment applied on EITHER side of the table, not a
 * seller-only pitch. The header "Why Us" nav lands here.
 *
 * Register: navy hero (overlay pattern) -> light "how we work" principles
 * -> "what you can expect" checklist -> the experience behind it ->
 * ClosingCta. Copy is two-sided and compliance-safe (RECO 5.1 / LSO 3.1):
 * posture and process, no outcome guarantees, no specialist/exclusive
 * language, value framed as judgment ("find the value others stop short
 * of"), not a promise.
 */
const PRINCIPLES = [
  {
    Icon: FileSearch,
    title: 'We read before we recommend.',
    body:
      'Every file starts with the documents and the real position, not a listing template. We understand what is actually going on before we move on it.',
  },
  {
    Icon: UserCheck,
    title: 'We represent one side, fully.',
    body:
      'Sellers and buyers are separate clients, each with their own goal. You get representation built around your side of the deal, and any shared interest is disclosed and consented to in writing.',
  },
  {
    Icon: Gem,
    title: 'We find the value beneath the surface.',
    body:
      'On either side of the table, the outcome sits in the details most people skim past: what a property is really worth, what it could become, and where the risk hides.',
  },
  {
    Icon: Scale,
    title: 'We negotiate from a real position.',
    body:
      'Strength in a transaction is doing the work, holding composure, and walking in with options rather than noise. We build the position first, then negotiate it.',
  },
  {
    Icon: ShieldCheck,
    title: 'Discreet, calm, and on your terms.',
    body:
      'These decisions are personal and the timing is often not yours. The work stays private, the pace stays yours, and there is no pressure to move before you are ready.',
  },
]

const EXPECTATIONS = [
  'A clear read on the real position',
  'Straightforward communication',
  'Experienced negotiation',
  'A plan built around your timeline',
  'A respectful, discreet experience',
]

const EXPERIENCE = [
  {
    Icon: Award,
    title: 'A decade of combined experience',
    body:
      'Across complex Ontario files on both sides of the deal: power of sale, mortgage arrears, time-sensitive sales, and value-add and multiplex purchases.',
  },
  {
    Icon: Network,
    title: 'We have sat across from everyone these deals bring',
    body:
      'Lenders, lawyers, other agents, opposing parties, family members, business partners. We know where these deals get stuck and how to keep them moving to a clean close.',
  },
  {
    Icon: Users,
    title: 'Our own buyers and opportunities',
    body:
      'Qualified buyers on one side, value-add and multiplex-eligible opportunities on the other. Either way, that means more than one path to a strong result.',
  },
]

export function WhyUsPage() {
  return (
    <>
      {/* Hero (navy, pulled up under the sticky header) */}
      <section
        data-surface="navy"
        className="relative bg-navy overflow-hidden isolate -mt-16 sm:-mt-20"
      >
        <HeroBackdrop />
        <div className="relative container max-w-4xl pt-28 pb-16 sm:pt-40 sm:pb-20">
          <Eyebrow>Why Resolve</Eyebrow>
          <h1 className="mt-5 font-sans font-semibold text-stone leading-[1.1] tracking-[-0.01em] text-[clamp(2.2rem,4.8vw,3.5rem)]">
            We don&rsquo;t just market property.
            <br />
            We solve{' '}
            <span className="font-emph italic font-normal text-bronze">property problems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.62] text-stone-soft">
            When a deal is more than a standard listing, you need more than a
            sign in the yard. On either side of the table, we read the real
            position, find the value most people miss, and make it work for the
            person we represent.
          </p>
        </div>
      </section>

      {/* How we work — the two-sided principles */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
              The same judgment,{' '}
              <span className="italic text-bronze">either side of the deal.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2">
            {PRINCIPLES.map(({ Icon, title, body }) => (
              <li key={title} className="flex flex-col">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-bronze/55 text-bronze"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display font-medium text-navy text-[1.35rem] leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-navy-soft max-w-[46ch]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you can expect — checklist (cream lift) */}
      <section data-surface="cream" className="bg-cream section-y">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[42fr_58fr] lg:items-center">
            <div className="max-w-md">
              <Eyebrow>What You Can Expect</Eyebrow>
              <h2 className="mt-5 font-display font-medium text-navy text-display-md leading-[1.14]">
                Clear, steady,{' '}
                <span className="italic text-bronze">and yours to control.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-navy-soft">
                Whether you are selling a complex or high-value home or buying
                for the upside, the working relationship feels the same.
              </p>
            </div>
            <ul className="space-y-5">
              {EXPECTATIONS.map((line) => (
                <li key={line} className="flex items-start gap-3.5">
                  <span className="inline-flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full border border-bronze/60 text-bronze mt-[1px]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[16.5px] leading-snug text-navy font-medium">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The experience behind it */}
      <section data-surface="stone" className="bg-stone section-y">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow>The Experience Behind It</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-navy text-display-lg">
              The experience these deals{' '}
              <span className="italic text-bronze">actually require.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 grid-cols-1 lg:grid-cols-3">
            {EXPERIENCE.map(({ Icon, title, body }) => (
              <li key={title} className="flex flex-col">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-bronze/55 text-bronze"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display font-medium text-navy text-[1.35rem] leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-navy-soft max-w-[38ch]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-navy-mute">
            More about the people behind the practice is on the{' '}
            <Link to="/about" className="font-semibold text-bronze hover:text-navy transition-colors">
              About page
            </Link>
            .
          </p>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
