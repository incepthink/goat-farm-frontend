import { motion } from 'framer-motion'
import { SITUATION } from '@/data/story'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * BEAT 2 — The situation.
 *
 * ⚠️  DELIBERATELY STILL. DO NOT ANIMATE THIS SECTION.
 *
 * Every instinct says animate the farmer-suicide statistics — count them up, parallax
 * them, reveal them in sequence. Don't. A page that goes completely still and quiet
 * immediately after a cinematic hero is more affecting than anything we could animate,
 * and it earns the trust the rest of the page spends.
 *
 * The single permitted effect is one slow opacity fade on the whole block. No transform,
 * no parallax, no counters, no stagger, no scroll effects. This is a design decision, not
 * an oversight — see CLAUDE.md §3.
 *
 * The switch from the dark hero to bare off-white is doing the work here. Leave it alone.
 */
export function Situation() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="bg-bone py-beat-lg" aria-labelledby="situation-heading">
      <motion.div
        className="shell"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: 'linear' }}
      >
        <p className="eyebrow">{SITUATION.eyebrow}</p>

        <h2
          id="situation-heading"
          className="mt-8 max-w-[24ch] text-display-md font-semibold text-earth"
        >
          {SITUATION.heading}
        </h2>

        <dl className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-3">
          {SITUATION.facts.map((fact) => (
            <div key={fact.figure} className="border-t border-earth/20 pt-6">
              <dt className="tnum font-display text-stat font-semibold text-earth">
                {fact.figure}
              </dt>
              <dd className="mt-5 max-w-measure-sm text-body text-earth-soft">
                {fact.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-20 max-w-measure text-lead text-earth-soft">
          {SITUATION.closing}
        </p>
      </motion.div>
    </section>
  )
}
