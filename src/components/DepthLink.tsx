import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { ArrowRight } from './Button'

/**
 * The "the evidence is here" affordance that closes every trimmed homepage beat.
 *
 * This is load-bearing rather than decorative. The homepage now states a claim and shows
 * the single strongest piece of evidence for it, then stops — the verification lives on
 * the depth page. A consistent, deliberate link at that hand-off is what makes the shorter
 * beat read as editorial confidence instead of missing content. Scattered ad-hoc links
 * would read as the latter.
 *
 * `detail` is the part that does the work: naming what is actually on the other side
 * ("the full 38-animal record", "all eight institutions") converts a generic "read more"
 * into a specific promise. Never omit it to save a line.
 *
 * Not a <ButtonLink>. These sit at the end of a beat, at body weight — a filled CTA here
 * would compete with the two real buttons in the closing section, and `accent` as a fill
 * is reserved for those (CLAUDE.md §7).
 */
export function DepthLink({
  to,
  children,
  detail,
  tone = 'light',
  className,
}: {
  to: string
  /** The link text itself, e.g. "The full breed profile" */
  children: string
  /** What the reader will find there. Required — see above. */
  detail: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const rule = tone === 'dark' ? 'border-bone/20' : 'border-bone-edge'
  const label = tone === 'dark' ? 'text-bone' : 'text-earth'
  const hover = tone === 'dark' ? 'group-hover:text-accent-soft' : 'group-hover:text-accent'
  const detailTone = tone === 'dark' ? 'text-bone/55' : 'text-earth-faint'

  return (
    <Reveal className={className}>
      <Link
        to={to}
        className={`group flex max-w-measure flex-col gap-2 border-t ${rule} pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8`}
      >
        <span
          className={`inline-flex items-center gap-3 text-body font-semibold ${label} ${hover} transition-colors duration-300 ease-editorial`}
        >
          {children}
          <ArrowRight className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
        </span>
        <span className={`text-body-sm ${detailTone}`}>{detail}</span>
      </Link>
    </Reveal>
  )
}
