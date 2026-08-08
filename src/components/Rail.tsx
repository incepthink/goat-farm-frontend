import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * The site's one horizontal rail — the dairy photo strip and the journey timeline.
 *
 * A native overflow-scroll strip rather than a scroll-jacked pin: it works with a swipe,
 * a trackpad, a wheel and a keyboard, and does not fight the page's vertical scroll.
 *
 * The catch, and the reason this is a component rather than a `div` with utility classes:
 * Lenis preventDefaults every wheel event on the window. That kills both the browser's
 * native "vertical wheel scrolls a horizontal-only container" mapping AND trackpad
 * panning, so with `no-scrollbar` on top there is no way at all to move these rails with
 * a mouse. Handling wheel here and stopping it before it reaches Lenis's window listener
 * is what makes them scroll. At either end we leave the event alone, so it bubbles to
 * Lenis and the page carries on down — no dead zone, no trapped scroll.
 *
 * Snapping is proximity, not mandatory: mandatory snap fights wheel-driven scrolling,
 * yanking the strip back to a card edge on every notch.
 */
export function Rail({
  children,
  label,
  hint,
  as = 'div',
  tone = 'light',
  className,
  scrollerClassName,
}: {
  children: ReactNode
  /** Accessible name for the scroll region. */
  label: string
  /** Caption under the rail. Sits beside the arrows, inside the shell. */
  hint?: ReactNode
  as?: 'div' | 'ul' | 'ol'
  tone?: 'light' | 'dark'
  className?: string
  /** Gap and bottom padding for the strip — the rest of the scroller is fixed here. */
  scrollerClassName?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return

      // A trackpad pan carries deltaX; a mouse wheel only ever carries deltaY.
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const raw = horizontal ? e.deltaX : e.deltaY
      if (!raw) return

      // deltaMode 1 is lines, 2 is pages — some mice and Firefox report both.
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1
      const delta = raw * unit

      // Vertical intent at the end of the rail belongs to the page. A horizontal
      // gesture is still swallowed there, otherwise the trackpad triggers the
      // browser's back-navigation swipe mid-section.
      const spent = delta > 0 ? el.scrollLeft >= max - 1 : el.scrollLeft <= 1
      if (spent && !horizontal) return

      e.preventDefault()
      e.stopPropagation()
      el.scrollLeft = Math.min(max, Math.max(0, el.scrollLeft + delta))
      sync()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', sync, { passive: true })

    // Images land after first paint and change scrollWidth — the arrows must know.
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    sync()

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  const nudge = (direction: 1 | -1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const dark = tone === 'dark'
  const Tag = as as 'div'

  return (
    <div className={className}>
      <Tag
        ref={ref}
        tabIndex={0}
        aria-label={label}
        {...(as === 'div' ? { role: 'region' } : {})}
        className={`no-scrollbar flex snap-x overflow-x-auto scroll-px-gutter px-gutter ${
          scrollerClassName ?? 'gap-6 pb-4'
        }`}
      >
        {children}
      </Tag>

      <div className="shell mt-4 flex items-center justify-between gap-6">
        <p className={`text-caption ${dark ? 'text-bone/45' : 'text-earth-faint'}`}>{hint}</p>

        {/* Mouse users get an explicit control; touch and keyboard already have one. */}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <RailButton direction="prev" onClick={() => nudge(-1)} disabled={atStart} dark={dark} />
          <RailButton direction="next" onClick={() => nudge(1)} disabled={atEnd} dark={dark} />
        </div>
      </div>
    </div>
  )
}

function RailButton({
  direction,
  onClick,
  disabled,
  dark,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
  dark: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Scroll back' : 'Scroll forward'}
      className={`flex h-10 w-10 items-center justify-center border transition-colors disabled:opacity-25 ${
        dark
          ? 'border-bone/25 text-bone hover:enabled:bg-bone/10'
          : 'border-earth/25 text-earth hover:enabled:bg-earth/5'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${direction === 'prev' ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}
