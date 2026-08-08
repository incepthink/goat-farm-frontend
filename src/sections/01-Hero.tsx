import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HERO } from '@/data/story'
import { ORG } from '@/data/org'
import { img } from '@/lib/images'
import { MaskReveal, Reveal } from '@/components/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * BEAT 1 — Hero.
 *
 * The photograph is 1379×776 and is the highest-resolution image in the library, so it
 * is the one thing on the site allowed to run full-bleed. Parallax is kept shallow
 * (12%) — any more and a 776px-tall image starts revealing its edges.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const hero = img(HERO.image)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.42, 0.72])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[38rem] w-full overflow-hidden bg-earth-deep">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y }}>
        <img
          src={hero.src}
          alt={HERO.imageAlt}
          width={hero.width}
          height={hero.height}
          fetchpriority="high"
          decoding="sync"
          className="h-[112%] w-full object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-earth-deep"
        style={reduced ? { opacity: 0.5 } : { opacity: overlay }}
        aria-hidden
      />
      {/* A second, bottom-weighted wash so the standfirst stays legible over the field. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-earth-deep/90 to-transparent"
        aria-hidden
      />

      <div className="shell relative flex h-full flex-col justify-end pb-16 pt-24 text-bone md:pb-24">
        <Reveal>
          <p className="eyebrow text-bone/70">{HERO.eyebrow}</p>
        </Reveal>

        <MaskReveal
          as="h1"
          text={HERO.headline}
          className="mt-6 max-w-[16ch] text-display-lg font-semibold"
          delay={0.15}
        />

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal delay={0.5} className="md:col-span-7 lg:col-span-6">
            <p className="max-w-measure text-lead text-bone/80">{HERO.standfirst}</p>
          </Reveal>

          <Reveal delay={0.65} className="md:col-span-5 md:justify-self-end lg:col-span-6">
            <p className="text-caption uppercase tracking-[0.16em] text-bone/50">
              {ORG.projectName}
              <span className="mt-1 block normal-case tracking-normal text-bone/40">
                {ORG.projectLocation}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.9} className="mt-14">
          <div className="flex items-center gap-3 text-caption uppercase tracking-[0.16em] text-bone/50">
            <span>{HERO.scrollCue}</span>
            <motion.span
              aria-hidden
              className="block h-px w-16 origin-left bg-bone/40"
              animate={reduced ? undefined : { scaleX: [0.3, 1, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
