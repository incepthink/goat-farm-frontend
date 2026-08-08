import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Curtain, PageShell } from '@/components/layout/PageShell'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Home from '@/pages/Home'

// The homepage is 90% of traffic, so it ships in the main bundle.
// Everything else is split — most visitors never request it.
const Project = lazy(() => import('@/pages/Project'))
const Impact = lazy(() => import('@/pages/Impact'))
const Products = lazy(() => import('@/pages/Products'))
const About = lazy(() => import('@/pages/About'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Contact = lazy(() => import('@/pages/Contact'))
const Donate = lazy(() => import('@/pages/Donate'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const location = useLocation()
  useSmoothScroll()

  return (
    <>
      <Header />

      <AnimatePresence mode="wait">
        <Curtain key={location.pathname} />
      </AnimatePresence>

      <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageShell>
                <Home />
              </PageShell>
            }
          />
          <Route
            path="/project"
            element={
              <PageShell>
                <Project />
              </PageShell>
            }
          />
          <Route
            path="/impact"
            element={
              <PageShell>
                <Impact />
              </PageShell>
            }
          />
          <Route
            path="/products"
            element={
              <PageShell>
                <Products />
              </PageShell>
            }
          />
          <Route
            path="/about"
            element={
              <PageShell>
                <About />
              </PageShell>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageShell>
                <Gallery />
              </PageShell>
            }
          />
          <Route
            path="/contact"
            element={
              <PageShell>
                <Contact />
              </PageShell>
            }
          />
          <Route
            path="/donate"
            element={
              <PageShell>
                <Donate />
              </PageShell>
            }
          />
          <Route
            path="*"
            element={
              <PageShell>
                <NotFound />
              </PageShell>
            }
          />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}
