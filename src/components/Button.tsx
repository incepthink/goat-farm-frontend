import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // Accent is reserved for CTAs. This is the only place it may be used as a fill.
  primary: 'bg-accent text-bone hover:bg-accent-deep border border-accent hover:border-accent-deep',
  secondary: 'bg-transparent text-earth border border-earth/25 hover:border-earth hover:bg-earth hover:text-bone',
  inverse: 'bg-bone text-earth border border-bone hover:bg-transparent hover:text-bone',
  ghost: 'bg-transparent text-earth border border-transparent hover:border-earth/25',
}

const SIZES: Record<Size, string> = {
  md: 'px-6 py-3 text-body-sm',
  lg: 'px-8 py-4 text-body',
}

const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-card font-sans font-semibold tracking-tight transition-colors duration-300 ease-editorial disabled:opacity-45 disabled:pointer-events-none'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  magnetic?: boolean
}

/**
 * Magnetic wrapper — the button drifts toward the cursor within a small radius.
 * Pointer-driven only: disabled under reduced motion and on touch, where there is no
 * cursor to be attracted to and the transform just makes taps land oddly.
 */
function Magnetic({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  if (!enabled) return <>{children}</>

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={offset}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      onPointerMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        setOffset({ x: dx * 0.22, y: dy * 0.32 })
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  )
}

function useMagneticEnabled(requested: boolean) {
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  return requested && !reduced && !isMobile
}

export function ButtonLink({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  ...rest
}: CommonProps & {
  to?: string
  href?: string
  download?: boolean | string
  target?: string
  rel?: string
}) {
  const enabled = useMagneticEnabled(magnetic)
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className ?? ''}`

  const inner = to ? (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )

  return <Magnetic enabled={enabled}>{inner}</Magnetic>
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  type = 'button',
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const enabled = useMagneticEnabled(magnetic)

  return (
    <Magnetic enabled={enabled}>
      <button
        type={type}
        className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className ?? ''}`}
        {...rest}
      >
        {children}
      </button>
    </Magnetic>
  )
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
    >
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
