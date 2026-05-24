import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { BrokerageStrip } from '@/components/landing/BrokerageStrip'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Situations } from '@/components/landing/Situations'
import { Process } from '@/components/landing/Process'
import { WhyResolve } from '@/components/landing/WhyResolve'
import { About } from '@/components/landing/About'
import { Buyers } from '@/components/landing/Buyers'
import { InquiryForm } from '@/components/landing/InquiryForm'
import { Footer } from '@/components/landing/Footer'
import { MobileStickyCta } from '@/components/landing/MobileStickyCta'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <Situations />
      <Process />
      <WhyResolve />
      <About />
      <InquiryForm />
    </>
  )
}

function BuyersPage() {
  return <Buyers />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen bg-white text-ink antialiased selection:bg-accent/20 selection:text-ink">
        <BrokerageStrip />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <MobileStickyCta />
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
    </BrowserRouter>
  )
}
