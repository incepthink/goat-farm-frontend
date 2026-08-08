import { GAINS, TRACTION, TRACTION_INTRO, TRAINING } from '@/data/traction'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { DepthLink } from '@/components/DepthLink'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motion } from 'framer-motion'

/**
 * BEAT 7 — Traction.
 *
 * Count-ups on entry, and the before/after bars draw on scroll. Every figure carries its
 * as-of date: a number without one is a claim, a number with one is a measurement.
 *
 * `summary` is the homepage density: the six headline figures and the four gains, which
 * are what carry the argument. The training figures are the depth detail and belong to
 * /impact, which is the page about who was reached. One component rather than two so a
 * corrected figure is edited once — see docs/HOMEPAGE-CONDENSE-PLAN.md §3.1.
 */
export function Traction({ variant = 'full' }: { variant?: 'summary' | 'full' }) {
  const reduced = usePrefersReducedMotion()
  const isSummary = variant === 'summary'

  return (
    <Section tone="deep" labelledBy="traction-heading">
      <div className="shell">
        <SectionHead
          id="traction-heading"
          eyebrow={TRACTION_INTRO.eyebrow}
          title={TRACTION_INTRO.heading}
          standfirst={TRACTION_INTRO.standfirst}
          className="max-w-4xl"
        />

        <RevealGroup
          as="ul"
          className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRACTION.map((stat) => (
            <RevealItem key={stat.label} as="li" className="border-t border-earth/20 pt-6">
              <p className="font-display text-stat font-semibold text-earth">
                <CountUp value={stat.value} suffix={stat.suffix ?? ''} />
              </p>
              <p className="mt-3 text-lead text-earth">{stat.label}</p>
              {stat.note && <p className="mt-1 text-body-sm text-earth-faint">{stat.note}</p>}

            </RevealItem>
          ))}
        </RevealGroup>

        {/* The gains. These are the numbers that prove the interventions work, so they
            get their own treatment rather than sitting in the grid above. */}
        <Reveal className="mt-16">
          <h3 className="eyebrow">What changed for the animals</h3>
        </Reveal>

        <ul className="mt-10 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {GAINS.map((gain) => (
            <li key={gain.metric}>
              <Reveal amount={0.5}>
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-body font-semibold">{gain.metric}</h4>
                  <p className="tnum font-display text-display-sm font-semibold text-accent">
                    {/* Direction is carried by the glyph, not by hue. All four of these
                        are improvements, so a second colour would both miscommunicate
                        (terracotta reads as alarm) and fail CVD separation against the
                        olive — the two are ΔE 3.3 apart under protanopia. */}
                    <span aria-hidden className="mr-1.5 font-sans">
                      {gain.direction === 'down' ? '↓' : '↑'}
                    </span>
                    {gain.to}
                  </p>
                </div>

                {/* Two stacked rules: the faint one is the baseline, the solid one the
                    current state, drawn from the left on entry. */}
                <div className="mt-5 space-y-2">
                  <div className="relative h-1.5 w-full bg-earth/10">
                    <div
                      className="absolute inset-y-0 left-0 bg-earth/25"
                      style={{ width: `${gain.fromPct * 100}%` }}
                    />
                  </div>
                  <motion.div
                    className="relative h-1.5 w-full bg-earth/10"
                    initial={reduced ? false : 'hidden'}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 origin-left rounded-r-[4px] bg-accent"
                      style={{ width: `${gain.toPct * 100}%` }}
                      variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-4 text-caption text-earth-faint">
                  <span>from {gain.from}</span>
                  <span>to {gain.to}</span>
                </div>

                <p className="mt-3 max-w-measure-sm text-body-sm text-earth-soft">{gain.summary}</p>

              </Reveal>
            </li>
          ))}
        </ul>

        {isSummary ? (
          <DepthLink
            to="/impact"
            detail="Outcomes, the training figures, institutional visits and SDG alignment"
            className="mt-16"
          >
            The full impact record
          </DepthLink>
        ) : (
          <RevealGroup as="ul" className="mt-16 grid gap-10 border-t border-earth/20 pt-10 sm:grid-cols-2">
            {TRAINING.map((stat) => (
              <RevealItem key={stat.label} as="li">
                <p className="font-display text-stat-sm font-semibold">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-body text-earth-soft">{stat.label}</p>
                {stat.note && <p className="text-body-sm text-earth-faint">{stat.note}</p>}

              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </Section>
  )
}
