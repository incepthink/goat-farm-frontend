import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MODEL } from '@/data/story'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowRight } from '@/components/Button'
import { DepthLink } from '@/components/DepthLink'

/**
 * BEAT 4 — The model.
 *
 * The connector between the four pillars draws in as the section scrolls. Two rails are
 * rendered — horizontal at lg and up, vertical below — because one element cannot change
 * axis responsively, and a scroll-driven scale on the wrong axis looks broken rather than
 * absent.
 *
 * `summary` keeps the four pillars and the before/after flip — the thesis, and the single
 * most important beat on the page — and hands the six interventions to /project, which
 * already renders them in full.
 */
export function Model({ variant = 'full' }: { variant?: 'summary' | 'full' }) {
  const railRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const isSummary = variant === 'summary'

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.85', 'end 0.55'],
  })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section tone="ink" labelledBy="model-heading">
      <div className="shell">
        <SectionHead
          id="model-heading"
          eyebrow={MODEL.eyebrow}
          title={MODEL.heading}
          standfirst={MODEL.standfirst}
          tone="dark"
          className="max-w-4xl"
        />

        <div ref={railRef} className="relative mt-20">
          {/* The rail. Purely decorative — the list below carries the meaning. */}
          <motion.div
            aria-hidden
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-accent-soft lg:block"
            style={reduced ? { scaleX: 1 } : { scaleX: draw }}
          />
          <motion.div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px origin-top bg-accent-soft lg:hidden"
            style={reduced ? { scaleY: 1 } : { scaleY: draw }}
          />

          <RevealGroup as="ol" className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {MODEL.pillars.map((pillar) => (
              <RevealItem key={pillar.term} as="li" className="relative pl-16 lg:pl-0">
                <span
                  aria-hidden
                  className="absolute left-[1.125rem] top-5 block h-3 w-3 rounded-full border-2 border-accent-soft bg-earth-deep lg:left-0 lg:top-[1.125rem]"
                />
                <div className="lg:pt-14">
                  <span className="tnum block text-caption text-accent-soft">{pillar.n}</span>
                  <h3 className="mt-3 text-display-sm font-semibold text-bone">{pillar.term}</h3>
                  <p className="mt-3 text-body-sm text-bone/70">{pillar.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>


        {/* The flip — the single idea the whole project turns on. */}
        <Reveal className="mt-16">
          <h3 className="eyebrow text-bone/50">{MODEL.flipHeading}</h3>
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="border border-bone/15 p-8 md:p-10">
              <p className="text-caption uppercase tracking-[0.14em] text-terracotta-soft">Before</p>
              <p className="mt-4 font-display text-display-sm font-semibold text-bone/70 line-through decoration-terracotta decoration-2">
                {MODEL.flip.before}
              </p>
              <p className="mt-4 max-w-measure-sm text-body-sm text-bone/60">
                {MODEL.flip.beforeDetail}
              </p>
            </div>

            <div className="flex items-center justify-center md:px-2">
              <ArrowRight className="h-8 w-8 rotate-90 text-accent-soft md:rotate-0" />
            </div>

            <div className="border border-accent-soft/40 bg-accent/10 p-8 md:p-10">
              <p className="text-caption uppercase tracking-[0.14em] text-accent-soft">After</p>
              <p className="mt-4 font-display text-display-sm font-semibold text-bone">
                {MODEL.flip.after}
              </p>
              <p className="mt-4 max-w-measure-sm text-body-sm text-bone/70">
                {MODEL.flip.afterDetail}
              </p>
            </div>
          </div>
        </Reveal>

        {isSummary ? (
          <DepthLink
            to="/project"
            detail={`The six interventions, the villages, the breed and the four-phase plan`}
            tone="dark"
            className="mt-16"
          >
            How the model works in detail
          </DepthLink>
        ) : (
          <>
            {/* The six interventions, kept quieter than the four pillars above them. */}
            <Reveal className="mt-16">
              <h3 className="eyebrow text-bone/50">{MODEL.interventionsHeading}</h3>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {MODEL.interventions.map((item) => (
                <RevealItem key={item.term} as="li" className="border-t border-bone/15 pt-5">
                  <h4 className="text-body font-semibold text-bone">{item.term}</h4>
                  <p className="mt-2 text-body-sm text-bone/60">{item.detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </div>
    </Section>
  )
}
