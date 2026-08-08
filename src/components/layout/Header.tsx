import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV } from '@/data/nav'
import { AsfLockup } from '@/components/brand/AsfLogo'
import { ButtonLink } from '@/components/Button'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { startScroll, stopScroll } from '@/hooks/useSmoothScroll'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()

  // Only the homepage opens on a full-bleed photograph. Everywhere else the header sits
  // on the page background from the first pixel, so it must never start inverted.
  const overHero = pathname === '/' && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  // The mobile sheet covers the page — Lenis must stop or the page scrolls behind it.
  useEffect(() => {
    if (menuOpen) stopScroll()
    else startScroll()
    return () => startScroll()
  }, [menuOpen])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-earth focus:px-4 focus:py-2 focus:text-bone"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
          overHero
            ? 'border-b border-transparent text-bone'
            : 'border-b border-bone-edge bg-bone/95 text-earth backdrop-blur-sm'
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link to="/" aria-label="Annasaheb Shinde Foundation — home" className="shrink-0">
            <AsfLockup inverted={overHero} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-body-sm font-medium transition-colors duration-200 ${
                    overHero
                      ? 'text-bone/80 hover:text-bone'
                      : isActive
                        ? 'text-earth'
                        : 'text-earth-soft hover:text-earth'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && !overHero && (
                      <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" aria-hidden />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              to="/donate"
              variant={overHero ? 'inverse' : 'primary'}
              size="md"
              className="hidden sm:inline-flex"
            >
              Support this work
            </ButtonLink>

            <button
              type="button"
              className="-mr-2 p-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="flex h-4 w-6 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bone pt-[4.5rem] lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-8">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="border-b border-bone-edge py-4 font-display text-display-sm"
                >
                  {item.label}
                </NavLink>
              ))}
              <ButtonLink to="/donate" variant="primary" size="lg" className="mt-8 w-full">
                Support this work
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
