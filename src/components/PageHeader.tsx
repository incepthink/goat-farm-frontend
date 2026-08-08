import { type ReactNode } from 'react'
import { MaskReveal, Reveal } from './Reveal'

/**
 * The opening block on every route except the homepage. Clears the fixed header, and
 * keeps all seven interior pages opening the same way.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  children,
}: {
  eyebrow: string
  title: string
  standfirst?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="bg-bone pb-beat pt-[calc(4.5rem+clamp(3rem,8vh,6rem))]">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>

        <MaskReveal
          as="h1"
          text={title}
          className="mt-6 max-w-[18ch] text-display-lg font-semibold"
        />

        {standfirst && (
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-measure text-lead text-earth-soft">{standfirst}</div>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  )
}
