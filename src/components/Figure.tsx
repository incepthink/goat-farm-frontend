import { type ReactNode } from 'react'
import { img } from '@/lib/images'

/**
 * Every image slot on the site. Ratios are fixed and named in tailwind.config.ts, so
 * replacing a photograph is a file swap rather than a redesign (CLAUDE.md §6, rule 2).
 *
 * The library is low-resolution — most files sit between 300 and 550px — so images live
 * inside framed cards at moderate size rather than full-bleed. `object-cover` plus a
 * fixed ratio means a small file fills its frame without being stretched past its
 * intrinsic width on a large viewport.
 *
 * `bleed` applies a 3% scale. These images were extracted from PDFs and slide decks and
 * several carry a thin strip of noise or leftover letterbox along one edge; the scale
 * clips it. Turn it off for anything where the edge matters.
 */

type Ratio = 'portrait' | 'portrait-tall' | 'landscape' | 'wide' | 'panorama' | 'square'

const RATIOS: Record<Ratio, string> = {
  portrait: 'aspect-portrait',
  'portrait-tall': 'aspect-portrait-tall',
  landscape: 'aspect-landscape',
  wide: 'aspect-wide',
  panorama: 'aspect-panorama',
  square: 'aspect-square',
}

const POSITIONS = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
} as const

export function Figure({
  file,
  alt,
  ratio = 'landscape',
  caption,
  position = 'center',
  className,
  imgClassName,
  priority = false,
  invert = false,
  bleed = true,
  sizes,
}: {
  /** Manifest path, e.g. "04-women/B_p06_07.webp" */
  file: string
  alt: string
  ratio?: Ratio
  caption?: ReactNode
  position?: keyof typeof POSITIONS
  className?: string
  imgClassName?: string
  /** Above-the-fold images load eagerly and are fetched at high priority. */
  priority?: boolean
  invert?: boolean
  bleed?: boolean
  sizes?: string
}) {
  const { src, width, height } = img(file)

  return (
    <figure className={className}>
      <div className={`${invert ? 'frame-invert' : 'frame'} ${RATIOS[ratio]} w-full`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // Lowercase: React 18 does not map the camelCase form to the DOM attribute.
          fetchpriority={priority ? 'high' : 'auto'}
          className={`h-full w-full object-cover ${POSITIONS[position]} ${
            bleed ? 'scale-[1.03]' : ''
          } ${imgClassName ?? ''}`}
        />
      </div>
      {caption && (
        <figcaption className={`mt-3 text-caption ${invert ? 'text-bone/55' : 'text-earth-faint'}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * The slot for a photograph that does not exist yet.
 *
 * We have no product photography, no shot of the urine distillation unit and no named
 * flock-owner portraits (docs/CLIENT-QUESTIONS.md §1 and §4). Rather than substitute a
 * loosely-related image and let it read as the real thing, the gap is shown as a gap —
 * deliberate, and sized to exactly the frame the eventual photograph will drop into.
 */
export function PhotoPending({
  label,
  ratio = 'portrait',
  className,
  invert = false,
}: {
  label: string
  ratio?: Ratio
  className?: string
  invert?: boolean
}) {
  return (
    <div
      className={`${invert ? 'frame-invert' : 'frame'} ${RATIOS[ratio]} flex w-full items-center justify-center ${className ?? ''}`}
    >
      <div className="px-6 text-center">
        <svg
          viewBox="0 0 24 24"
          className={`mx-auto h-7 w-7 ${invert ? 'text-bone/25' : 'text-earth-faint/40'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="M3 16l5-4 4 3 3-2 6 5" strokeLinejoin="round" />
        </svg>
        <p
          className={`mt-3 text-source uppercase tracking-[0.12em] ${
            invert ? 'text-bone/35' : 'text-earth-faint/70'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
