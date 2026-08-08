import { WOMEN } from '@/data/traction'
import { Section } from '@/components/Section'
import { MaskReveal, Reveal } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { CountUp } from '@/components/CountUp'

/**
 * BEAT 8 — The flock owners.
 *
 * The one section that got *longer* in the condense pass, deliberately. Everything else on
 * the homepage was cut because it duplicated a depth page; this exists nowhere else, and
 * it is the human centre of the argument, so it took the space the other cuts freed. See
 * docs/HOMEPAGE-CONDENSE-PLAN.md §5.
 *
 * Three things drive the layout:
 *
 * 1. The heading is the strongest sentence on the site. It previously sat at display-md
 *    inside a six-column block, sharing a row with the 93% stat and losing to it. It now
 *    runs alone, full measure, at display-lg. Nothing competes with it.
 *
 * 2. Ratio travels with the photograph, not with the slot. image39 and image40 are
 *    720×1281 — 9:16 vertical stills — and were previously rendered at `landscape` (3:2)
 *    with object-center, showing roughly 28% of the frame taken from the middle. The
 *    milking is in the lower half of both, so the site was displaying goat backs and
 *    gravel where its two best action frames should have been.
 *
 * 3. The grid is a balanced column flow rather than a fixed span grid. With frames at 2:3,
 *    3:4 and 3:2 there is no set of column spans that tiles without leaving holes, and
 *    forcing one ratio on all of them is exactly the bug above. Columns let each frame keep
 *    its own proportions and still bottom out evenly.
 *
 * Motion stays minimal. These are the least composed photographs on the site and
 * staggering them like product cards would be the wrong register.
 */
export function Women() {
  const [lead, ...rest] = WOMEN.gallery

  return (
    <Section tone="bone" labelledBy="women-heading">
      <div className="shell">
        {/* The line, alone. */}
        <MaskReveal
          as="h2"
          id="women-heading"
          text={WOMEN.heading}
          className="max-w-[22ch] text-display-lg font-semibold text-earth"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{WOMEN.eyebrow}</p>
            <p className="mt-6 font-display text-stat font-semibold text-accent">
              <CountUp value={WOMEN.stat.value} suffix={WOMEN.stat.suffix ?? ''} />
            </p>
            <p className="mt-3 max-w-measure-sm text-lead text-earth">{WOMEN.stat.label}</p>

          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            {WOMEN.body.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="max-w-measure text-body text-earth-soft [&+p]:mt-6"
              >
                {para}
              </p>
            ))}

          </Reveal>
        </div>

        {/*
          The lead frame runs tall beside the pull-quote rather than inside the grid below.
          It is the 9:16 still of a woman hand-milking into a bucket — the most on-message
          photograph the project owns, and the one the old layout cropped the subject out of.
        */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Figure
              file={lead.file}
              alt={lead.alt}
              ratio={lead.ratio}
              caption={lead.caption}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <p className="max-w-measure font-display text-display-md font-semibold text-earth">
              {WOMEN.turn}
            </p>

          </Reveal>
        </div>

        {/*
          Column flow, not a span grid — see note 3 above. `break-inside-avoid` keeps a
          figure and its caption together; the wrapper carries the bottom margin because
          `gap` does not apply across CSS columns.
        */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {rest.map((photo, i) => (
            <Reveal
              key={photo.file}
              delay={i * 0.06}
              className="mb-6 break-inside-avoid [-webkit-column-break-inside:avoid]"
            >
              <Figure
                file={photo.file}
                alt={photo.alt}
                ratio={photo.ratio}
                caption={photo.caption}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
              />
            </Reveal>
          ))}
        </div>

        {/* Stated rather than quietly worked around. The gap is real and it matters. */}
        <Reveal className="mt-6">
          <p className="max-w-measure text-body-sm text-earth-faint">{WOMEN.gapNote}</p>
        </Reveal>
      </div>
    </Section>
  )
}
