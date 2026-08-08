import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PAGE_META } from '@/data/nav'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Sets the document title and meta description per route. */
function useDocumentMeta(pathname: string) {
  useEffect(() => {
    // An unknown path is the 404 route, which needs its own title rather than inheriting
    // whichever page was rendered last.
    const meta = PAGE_META[pathname] ?? {
      title: 'Page not found — Annasaheb Shinde Foundation',
      description:
        'That page could not be found. The full story of the Goat Milk and Breed Development Project is on the homepage.',
    }
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])
}

/**
 * Route wrapper. Handles scroll restoration, per-route metadata, and the curtain
 * transition between pages.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()

  useDocumentMeta(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (reduced) {
    return <main id="main">{children}</main>
  }

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

/**
 * The curtain that sweeps across on route change. Rendered once at app level so it
 * survives the outgoing page unmounting.
 */
export function Curtain() {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()

  if (reduced) return null

  return (
    <motion.div
      key={pathname}
      className="pointer-events-none fixed inset-0 z-[70] origin-top bg-earth-deep"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    />
  )
}
