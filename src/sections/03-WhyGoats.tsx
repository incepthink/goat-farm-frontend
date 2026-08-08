import { BREED, WHY_GOATS } from '@/data/story'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { CountUp } from '@/components/CountUp'
import { DepthLink } from '@/components/DepthLink'

/**
 * BEAT 3 — Why goats, and which goat.
 *
 * The old beats 3 and 4 merged. They were one argument split across two full sections: the
 * four barriers say why goat rearers stay poor, and the Zalawadi figures say what the
 * animal is actually capable of once those barriers come down. Reading them apart made the
 * second look like trivia.
 *
 * The breed half is deliberately compact now. It previously ran as a sticky portrait with
 * five statistics each holding `lg:min-h-[38vh]` — 1,700px of scroll for five numbers that
 * /project already lists in a plain grid. Three figures carry the point here; the rest is
 * one link away. See docs/HOMEPAGE-CONDENSE-PLAN.md §4.
 *
 * The barriers themselves are untouched. The sequence matters more than the individual
 * facts: each barrier is survivable alone, and the point is that they compound into a
 * single dead end.
 */

/** The three figures that carry the argument. The full set lives on /project. */
const HEADLINE_STATS = BREED.stats.slice(0, 3)

export function WhyGoats() {
  return (
    <Section tone="deep" labelledBy="why-goats-heading">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead
              id="why-goats-heading"
              eyebrow={WHY_GOATS.eyebrow}
              title={WHY_GOATS.heading}
              standfirst={WHY_GOATS.standfirst}
            />
          </div>

          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <Figure
              file="03-goats/image8.webp"
              alt="A Zalawadi doe with two young kids in a village pen"
              ratio="landscape"
              caption="A doe with twins. Fifty-five per cent of Zalawadi births are twins."
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <p className="max-w-measure text-display-sm font-display text-earth">{WHY_GOATS.turn}</p>
        </Reveal>

        <RevealGroup as="ol" className="mt-14 grid gap-px overflow-hidden border border-bone-edge bg-bone-edge md:grid-cols-2">
          {WHY_GOATS.barriers.map((barrier, i) => (
            <RevealItem key={barrier.term} as="li" className="bg-bone p-8 md:p-10">
              <span className="tnum text-caption text-earth-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-display-sm font-semibold">{barrier.term}</h3>
              <p className="mt-3 max-w-measure-sm text-body text-earth-soft">{barrier.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>


        <Reveal className="mt-16">
          <div className="border-l-2 border-terracotta pl-8 md:pl-12">
            <p className="max-w-measure text-lead font-medium text-earth">
              {WHY_GOATS.consequence}
            </p>
            <p className="mt-4 text-caption uppercase tracking-[0.14em] text-terracotta">
              {WHY_GOATS.consequenceNote}
            </p>
          </div>
        </Reveal>

        {/*
          The animal. A sub-head at display-sm rather than a second SectionHead — inside a
          merged beat the full display-md opener reads as a new section starting.
          BREED.image is the clean side-profile, so it takes `landscape`: a side profile in
          a 3:4 slot is mostly empty ground above and below the animal.
        */}
        <div className="mt-16 grid gap-12 border-t border-bone-edge pt-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Figure
              file={BREED.image}
              alt={BREED.imageAlt}
              ratio="landscape"
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow">{BREED.eyebrow}</p>
              <h3 className="mt-4 max-w-[24ch] text-display-sm font-semibold">{BREED.heading}</h3>
              <p className="mt-4 max-w-measure text-body text-earth-soft">
                {BREED.standfirst}

              </p>
            </Reveal>

            <RevealGroup as="ul" className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {HEADLINE_STATS.map((stat) => (
                <RevealItem key={stat.label} as="li" className="border-t border-bone-edge pt-5">
                  <p className="font-display text-stat-sm font-semibold text-earth">
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ''}
                    />
                  </p>
                  <p className="mt-3 text-body text-earth">{stat.label}</p>
                  {stat.note && <p className="mt-1 text-body-sm text-earth-faint">{stat.note}</p>}

                </RevealItem>
              ))}
            </RevealGroup>

            <DepthLink
              to="/project"
              detail="Weights, kidding interval, lifespan, adaptability and the survey behind them"
              className="mt-12"
            >
              The full breed profile
            </DepthLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
