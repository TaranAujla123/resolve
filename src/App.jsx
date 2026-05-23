import React from 'react'
import { Toaster } from 'sonner'
import { BrokerageStrip } from '@/components/landing/BrokerageStrip'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Situations } from '@/components/landing/Situations'
import { Process } from '@/components/landing/Process'
import { WhyResolve } from '@/components/landing/WhyResolve'
import { About } from '@/components/landing/About'
import { InquiryForm } from '@/components/landing/InquiryForm'
import { Footer } from '@/components/landing/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink antialiased selection:bg-accent/20 selection:text-ink">
      <BrokerageStrip />
      <Nav />
      <main>
        <Hero />
        <Situations />
        <Process />
        <WhyResolve />
        <About />
        <InquiryForm />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            color: '#0A1F44',
          },
        }}
      />
    </div>
  )
}
