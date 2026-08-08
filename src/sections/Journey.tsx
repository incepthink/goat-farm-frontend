import { TIMELINE } from '@/data/timeline'
import { Reveal } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { Rail } from '@/components/Rail'

/**
 * The journey — Jan 2024 to today.
 *
 * A horizontal rail rather than a scroll-jacked pin. The plan called for scroll-jacking
 * here, but a hijacked vertical scroll on a page this long is the single most common way
 * to lose a reader on a mid-range Android — and a large share of this audience is on one.
 * Native horizontal scroll gives the same left-to-right reading of time, works with
 * trackpad, wheel, swipe and keyboard, and costs nothing in motion budget.
 *
 * Body only, with no <Section> wrapper: the rail is composed into the homepage's merged
 * "where, and when" beat (09-WhereAndWhen.tsx), which is now its only home. It keeps a
 * `tone` because that beat runs on the dark ground and a light variant may be wanted again.
 */

export function JourneyBody({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'

  return (
    <>
      <Reveal className="mt-16">
        <Rail
          as="ol"
          label="Project timeline"
          tone={tone}
          scrollerClassName="gap-6 pb-6"
          hint="Scroll sideways through the timeline"
        >
          {TIMELINE.map((milestone, i) => (
            <li
              key={milestone.title}
              className="w-[82vw] shrink-0 snap-start sm:w-[48vw] lg:w-[30vw] xl:w-[25vw]"
            >
              <article className="flex h-full flex-col">
                {milestone.image ? (
                  <Figure
                    file={milestone.image}
                    alt={milestone.imageAlt ?? milestone.title}
                    ratio="landscape"
                    invert={dark}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 82vw"
                  />
                ) : (
                  <div className={`${dark ? 'frame-invert' : 'frame'} aspect-landscape w-full`} />
                )}

                <div className="mt-6 flex items-baseline gap-3">
                  <span
                    className={`tnum text-source ${dark ? 'text-bone/40' : 'text-earth-faint'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-caption uppercase tracking-[0.12em] ${
                      dark ? 'text-terracotta-soft' : 'text-terracotta'
                    }`}
                  >
                    {milestone.date}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-display-sm font-semibold ${dark ? 'text-bone' : ''}`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`mt-3 text-body-sm ${dark ? 'text-bone/70' : 'text-earth-soft'}`}
                >
                  {milestone.detail}
                </p>
              </article>
            </li>
          ))}
        </Rail>
      </Reveal>
    </>
  )
}
