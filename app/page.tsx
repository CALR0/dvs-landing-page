import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Conversation } from '@/components/landing/conversation'
import { Services } from '@/components/landing/services'
import { Energy } from '@/components/landing/energy'
import { Trust } from '@/components/landing/trust'
import { AboutIntro, Principles } from '@/components/landing/about'
import { Contact, Footer } from '@/components/landing/contact'
import { MotionProvider } from '@/components/landing/motion'
import { SectionTitle } from '@/components/landing/section-title'

// Morning → clear sky → warm light → deep evening → golden hour.
export default function Page() {
  return (
    <MotionProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cloud">
        Skip to content
      </a>
      <SectionTitle />
      <Header />
      <main id="main">
        <div id="top" />
        <Hero />
        {/* 01 — About us: identity → process → principles */}
        <AboutIntro />
        <Conversation />
        <Principles />
        {/* 02 — Services, with the residential energy deep-dive */}
        <Services />
        <Energy />
        {/* 03 — Trust */}
        <Trust />
        {/* 04 — Contact */}
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  )
}
