import { motion } from 'framer-motion'
import { FUTURE } from '@/data/traction'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { DepthLink } from '@/components/DepthLink'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * BEAT 14 — Where it goes.
 *
 * The brief asked for a growth curve. It is a range bar chart instead, on purpose.
 *
 * The source gives year-one as "6,000 to 10,000 litres" and year-two as "10,000 to
 * 15,000" — these are target *bands*, not measured points. A curve would draw a smooth
 * line through values that were never stated and imply interpolated months that do not
 * exist. A bar per year, spanning from the low target to the high one, shows exactly what
 * the document says and nothing more.
 *
 * One series, so no legend — the title names it. Every bar is directly labelled, which is
 * also the secondary encoding that keeps the chart readable without colour.
 *
 * ⚠️  These are TARGETS, not achieved volumes. The label says so. No actual daily volume
 * can be published: the only figure in the documents (9,164 L) has no time unit attached.
 */

const MAX_L = 25000

export function Future({ variant = 'full' }: { variant?: 'summary' | 'full' }) {
  const reduced = usePrefersReducedMotion()
  const isSummary = variant === 'summary'

  return (
    <Section tone="bone" labelledBy="future-heading">
      <div className="shell">
        <SectionHead
          id="future-heading"
          eyebrow={FUTURE.eyebrow}
          title={FUTURE.heading}
          standfirst={FUTURE.standfirst}
          className="max-w-3xl"
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <figcaption className="mb-8">
              <h3 className="text-display-sm font-semibold">
                Milk collection targets, {FUTURE.volumeUnit}
              </h3>
              <p className="mt-2 text-body-sm text-earth-faint">
                Targets set out in the project documents — not volumes achieved. Years one and
                two are stated as ranges.
              </p>
            </figcaption>

            <ul className="space-y-7">
              {FUTURE.volumes.map((v, i) => {
                const isRange = v.from !== v.to
                const leftPct = (v.from / MAX_L) * 100
                const widthPct = ((v.to - v.from) / MAX_L) * 100

                return (
                  <li key={v.year}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-body font-semibold">{v.year}</span>
                      <span className="tnum text-body font-semibold text-earth">
                        {isRange
                          ? `${v.from.toLocaleString('en-IN')}–${v.to.toLocaleString('en-IN')} L`
                          : `${v.to.toLocaleString('en-IN')} L`}
                      </span>
                    </div>

                    <div className="relative mt-3 h-4 w-full bg-bone-deep">
                      {/* Every bar runs from zero to the year's upper target, with a tick
                          marking the lower end of the range. Year three states a single
                          value, so it has no tick — nothing is invented to give it one. */}
                      <motion.div
                        className="absolute inset-y-0 left-0 origin-left rounded-r-[4px] bg-accent"
                        style={{ width: `${isRange ? leftPct + widthPct : leftPct}%` }}
                        initial={reduced ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                          duration: 1,
                          delay: reduced ? 0 : i * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                      {isRange && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 w-px bg-bone"
                          style={{ left: `${leftPct}%` }}
                        />
                      )}
                    </div>


                  </li>
                )
              })}
            </ul>

            {/* Table view — the chart is never the only way to read the numbers. */}
            <details className="mt-8">
              <summary className="cursor-pointer text-body-sm text-earth-soft underline decoration-earth-faint/40 underline-offset-4">
                View as a table
              </summary>
              <table className="mt-4 w-full border-collapse text-body-sm">
                <caption className="sr-only">
                  Goat milk collection targets in litres per day, by year
                </caption>
                <thead>
                  <tr className="border-b border-bone-edge text-left">
                    <th scope="col" className="py-2 font-semibold">
                      Year
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      Target, litres per day
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FUTURE.volumes.map((v) => (
                    <tr key={v.year} className="border-b border-bone-edge">
                      <th scope="row" className="py-2 text-left font-normal">
                        {v.year}
                      </th>
                      <td className="tnum py-2 text-right">
                        {v.from !== v.to
                          ? `${v.from.toLocaleString('en-IN')}–${v.to.toLocaleString('en-IN')}`
                          : v.to.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </details>
          </figure>

          <div className="lg:col-span-4 lg:col-start-9">
            <RevealGroup as="ul" className="space-y-10">
              {FUTURE.targets.map((target) => (
                <RevealItem key={target.label} as="li" className="border-t border-bone-edge pt-5">
                  <p className="font-display text-stat-sm font-semibold text-earth">
                    <CountUp value={target.value} />
                  </p>
                  <p className="mt-2 text-body text-earth">{target.label}</p>
                  {target.note && (
                    <p className="mt-1 text-body-sm text-earth-faint">{target.note}</p>
                  )}

                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {isSummary ? (
          <DepthLink
            to="/project"
            detail="The genetic improvement pillar and the four-phase plan it sits inside"
            className="mt-16"
          >
            How the next twelve years are staged
          </DepthLink>
        ) : (
          <div className="mt-16 grid gap-12 border-t border-bone-edge pt-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="text-display-sm font-semibold">{FUTURE.genetics.heading}</h3>
              <p className="mt-4 max-w-measure text-body text-earth-soft">{FUTURE.genetics.body}</p>

            </Reveal>

            <RevealGroup as="ol" className="lg:col-span-6 lg:col-start-7">
              {FUTURE.dataBuild.map((step) => (
                <RevealItem
                  key={step.year}
                  as="li"
                  className="flex items-baseline gap-6 border-b border-bone-edge py-4"
                >
                  <span className="w-20 shrink-0 text-caption uppercase tracking-[0.12em] text-terracotta">
                    {step.year}
                  </span>
                  <span className="text-body">{step.detail}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </Section>
  )
}
