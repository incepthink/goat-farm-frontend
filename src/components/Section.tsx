import { type ReactNode } from 'react'
import { MaskReveal, Reveal } from './Reveal'

type Tone = 'bone' | 'deep' | 'ink'

const TONES: Record<Tone, string> = {
  bone: 'bg-bone text-earth',
  deep: 'bg-bone-deep text-earth',
  ink: 'bg-earth-deep text-bone',
}

/**
 * Every homepage beat and page section is a <Section>. Owning the vertical rhythm here
 * is what keeps fifteen separately-built beats reading as one document.
 */
export function Section({
  children,
  tone = 'bone',
  id,
  className,
  size = 'default',
  as: Tag = 'section',
  labelledBy,
}: {
  children: ReactNode
  tone?: Tone
  id?: string
  className?: string
  size?: 'default' | 'lg' | 'flush'
  as?: 'section' | 'div'
  labelledBy?: string
}) {
  const pad =
    size === 'flush' ? '' : size === 'lg' ? 'py-beat-lg' : 'py-beat'

  return (
    <Tag id={id} aria-labelledby={labelledBy} className={`${TONES[tone]} ${pad} ${className ?? ''}`}>
      {children}
    </Tag>
  )
}

/**
 * Standard section opener: eyebrow, heading, optional standfirst.
 * `still` renders it without the word-by-word reveal — beat 2 requires this.
 */
export function SectionHead({
  eyebrow,
  title,
  standfirst,
  id,
  align = 'left',
  tone = 'light',
  still = false,
  className,
}: {
  eyebrow?: string
  title: string
  standfirst?: ReactNode
  id?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  still?: boolean
  className?: string
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left'
  const faint = tone === 'dark' ? 'text-bone/55' : 'text-earth-faint'
  const body = tone === 'dark' ? 'text-bone/75' : 'text-earth-soft'

  return (
    <div className={`flex flex-col ${alignment} ${className ?? ''}`}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow mb-5 ${faint}`}>{eyebrow}</p>
        </Reveal>
      )}

      {still ? (
        <h2 id={id} className="max-w-[18ch] text-display-md font-semibold">
          {title}
        </h2>
      ) : (
        // The id must land on the heading in both branches. Without it every section that
        // passes `labelledBy` has an aria-labelledby pointing at nothing.
        <MaskReveal
          as="h2"
          id={id}
          text={title}
          className="max-w-[20ch] text-display-md font-semibold"
        />
      )}

      {standfirst && (
        <Reveal delay={0.1}>
          <div className={`mt-6 max-w-measure text-lead ${body}`}>{standfirst}</div>
        </Reveal>
      )}
    </div>
  )
}

/*
 * There is deliberately no <SourceNote> component. Citations are no longer rendered —
 * the `source` field is kept on every constant in src/data/ as internal provenance
 * (CLAUDE.md §8) so a claim can always be traced back, but it does not go on the page.
 */

