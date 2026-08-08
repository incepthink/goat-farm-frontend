import { useState } from 'react'
import { motion } from 'framer-motion'
import { MAP, SURVEYED_VILLAGES, VILLAGE_TOTALS } from '@/data/villages'
import { SectionHead } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * BEAT 11 — The area of operation.
 *
 * This is a distance schematic, NOT a geographic map — and it says so on the page.
 *
 * No survey coordinates exist in any source document, so plotting real pins would mean
 * inventing positions for thirteen real villages. What the documents *do* give is each
 * village's distance from Malpur, and the "30 km radius" framing the project selected
 * them by. So distance is plotted truthfully against scaled rings, and bearing is a
 * layout decision — which is the honest version of this diagram, and reads better than a
 * fake map would.
 */

const SIZE = 620
const C = SIZE / 2
const MAX_KM = 40
const R_MAX = 250

function place(distanceKm: number, bearing: number) {
  const r = (distanceKm / MAX_KM) * R_MAX
  const rad = (bearing * Math.PI) / 180
  return { x: C + r * Math.sin(rad), y: C - r * Math.cos(rad) }
}

/**
 * Labels sit further out along the same spoke and anchor away from the centre, so names
 * radiate outward instead of stacking on top of each other near the middle — which is
 * exactly where the short-distance villages bunch up.
 */
function labelFor(distanceKm: number, bearing: number) {
  const rad = (bearing * Math.PI) / 180
  const sin = Math.sin(rad)
  // A floor on the label radius: the villages within 10 km sit almost on top of the hub,
  // and their labels would overlap each other if they tracked the dots exactly. Pushing
  // them out to a common ring separates them, and the spoke still ties each name to its
  // dot.
  const r = Math.max((distanceKm / MAX_KM) * R_MAX + 20, 92)
  const anchor: 'start' | 'end' | 'middle' = sin > 0.25 ? 'start' : sin < -0.25 ? 'end' : 'middle'
  return {
    x: C + r * sin + (anchor === 'start' ? 4 : anchor === 'end' ? -4 : 0),
    y: C - r * Math.cos(rad) + 4,
    anchor,
  }
}

/**
 * The body only, with no <Section> wrapper — it is composed with the timeline into a
 * single "where, and when" beat (09-WhereAndWhen.tsx) rather than standing alone. Keeping
 * the wrapper out here is what lets the two share one section's vertical padding.
 *
 * This diagram now exists in exactly one place on the site. /project previously rendered
 * the same component a second time; it keeps the village *table* as its depth version,
 * which is the more useful artefact on a page built for checking figures.
 */
export function VillageMapBody() {
  const [active, setActive] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()

  const current = SURVEYED_VILLAGES.find((v) => v.name === active) ?? null

  return (
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead
              id="map-heading"
              eyebrow={MAP.eyebrow}
              title={MAP.heading}
              standfirst={MAP.standfirst}
              tone="dark"
            />
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <dl className="grid grid-cols-3 gap-px overflow-hidden border border-bone/15 bg-bone/15">
              <div className="bg-earth-deep p-5">
                <dt className="text-source uppercase tracking-[0.1em] text-bone/45">Villages</dt>
                <dd className="tnum mt-2 font-display text-display-sm font-semibold text-bone">
                  {VILLAGE_TOTALS.surveyedVillages}
                </dd>
              </div>
              <div className="bg-earth-deep p-5">
                <dt className="text-source uppercase tracking-[0.1em] text-bone/45">
                  Flock owners
                </dt>
                <dd className="tnum mt-2 font-display text-display-sm font-semibold text-bone">
                  {VILLAGE_TOTALS.flockOwners}
                </dd>
              </div>
              <div className="bg-earth-deep p-5">
                <dt className="text-source uppercase tracking-[0.1em] text-bone/45">Goats</dt>
                <dd className="tnum mt-2 font-display text-display-sm font-semibold text-bone">
                  {VILLAGE_TOTALS.goats.toLocaleString('en-IN')}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/*
          Mobile variant. Below md the schematic is only ~350px wide, which puts the
          village labels under 10px — unreadable, and the hover panel is meaningless on
          touch anyway. The same data reads better as a ranked list, so small screens get
          that instead of a shrunken diagram (CLAUDE.md §7).
        */}
        <Reveal className="mt-14 md:hidden">
          <ol className="border-t border-bone/15">
            {[...SURVEYED_VILLAGES]
              .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
              .map((village) => (
                <li
                  key={village.name}
                  className="flex items-baseline justify-between gap-4 border-b border-bone/15 py-3"
                >
                  <span className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden
                      className={`inline-block h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${
                        village.name === 'Malpur'
                          ? 'bg-accent'
                          : village.district === 'Nandurbar'
                            ? 'bg-terracotta'
                            : 'bg-bone'
                      }`}
                    />
                    <span className="text-body text-bone">{village.name}</span>
                    <span className="text-caption text-bone/45">{village.district}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="tnum text-body font-semibold text-bone">
                      {village.distanceKm} km
                    </span>
                    <span className="tnum block text-caption text-bone/45">
                      {village.goats} goats
                    </span>
                  </span>
                </li>
              ))}
          </ol>
          <p className="mt-4 text-caption text-bone/45">Distance from the dairy at Malpur.</p>
        </Reveal>

        <div className="mt-16 hidden gap-12 md:grid lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            {/*
              Capped. The viewBox is square, so an uncapped `w-full` in a 7-of-12 column
              renders ~765px tall — the single largest element on the homepage, for a
              diagram that is fully legible at two thirds of that. 34rem keeps the 13px
              village labels above 11px effective.
            */}
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="mx-auto w-full max-w-[34rem]"
              role="img"
              aria-label="Distance schematic of the thirteen surveyed villages around Malpur"
            >
              {/* Distance rings */}
              {MAP.ringsKm.map((km) => (
                <g key={km}>
                  <circle
                    cx={C}
                    cy={C}
                    r={(km / MAX_KM) * R_MAX}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-bone/15"
                    strokeDasharray={km === 30 ? undefined : '3 5'}
                  />
                  <text
                    x={C + 6}
                    y={C - (km / MAX_KM) * R_MAX - 6}
                    className="fill-current text-bone/35"
                    fontSize={11}
                    fontFamily="'Manrope Variable', Manrope, sans-serif"
                  >
                    {km} km
                  </text>
                </g>
              ))}

              {SURVEYED_VILLAGES.map((village, i) => {
                const { x, y } = place(village.distanceKm ?? 0, village.bearing)
                const isMalpur = village.name === 'Malpur'
                // Malpur sits at the centre, where a radial label would land on top of
                // the hub itself — so it is labelled directly beneath instead.
                const label = isMalpur
                  ? { x: C, y: C + 28, anchor: 'middle' as const }
                  : labelFor(village.distanceKm ?? 0, village.bearing)
                const isActive = active === village.name
                const isNandurbar = village.district === 'Nandurbar'

                return (
                  <motion.g
                    key={village.name}
                    initial={reduced ? false : { opacity: 0, y: -14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: reduced ? 0 : 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${village.name}, ${village.district} district, ${village.distanceKm} kilometres from Malpur`}
                    className="cursor-pointer focus:outline-none"
                    onMouseEnter={() => setActive(village.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(village.name)}
                    onBlur={() => setActive(null)}
                  >
                    {/* Spoke back to the centre — makes "distance from Malpur" readable. */}
                    {!isMalpur && (
                      <line
                        x1={C}
                        y1={C}
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth={1}
                        className={isActive ? 'text-accent-soft' : 'text-bone/10'}
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isMalpur ? 9 : isActive ? 8 : 5.5}
                      className={
                        isMalpur
                          ? 'fill-current text-accent'
                          : isNandurbar
                            ? 'fill-current text-terracotta'
                            : 'fill-current text-bone'
                      }
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor={label.anchor}
                      fontSize={13}
                      fontFamily="'Manrope Variable', Manrope, sans-serif"
                      className={`fill-current ${isActive ? 'text-bone' : 'text-bone/70'}`}
                    >
                      {village.name}
                    </text>
                  </motion.g>
                )
              })}
            </svg>

            <p className="mt-4 max-w-measure text-caption text-bone/45">{MAP.schematicNote}</p>
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            {/* Reserve the height so hovering pins does not shift the layout. */}
            <div className="min-h-[13rem] border border-bone/15 p-8" aria-live="polite">
              {current ? (
                <>
                  <p className="font-display text-display-sm font-semibold text-bone">
                    {current.name}
                  </p>
                  <p className="mt-1 text-body-sm text-bone/55">{current.district} district</p>
                  <dl className="mt-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-body-sm text-bone/55">Distance from Malpur</dt>
                      <dd className="tnum text-body font-semibold text-bone">
                        {current.distanceKm} km
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-body-sm text-bone/55">Flock owners</dt>
                      <dd className="tnum text-body font-semibold text-bone">
                        {current.flockOwners}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-body-sm text-bone/55">Goats</dt>
                      <dd className="tnum text-body font-semibold text-bone">{current.goats}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <p className="text-body-sm text-bone/50">
                  Hover or focus a village to see its flock and its distance from the dairy.
                </p>
              )}
            </div>

            <ul className="mt-6 space-y-2 text-caption text-bone/55">
              <li className="flex items-center gap-3">
                <span className="block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                Malpur — the dairy
              </li>
              <li className="flex items-center gap-3">
                <span className="block h-2.5 w-2.5 rounded-full bg-bone" aria-hidden />
                Dhule district
              </li>
              <li className="flex items-center gap-3">
                <span className="block h-2.5 w-2.5 rounded-full bg-terracotta" aria-hidden />
                Nandurbar district
              </li>
            </ul>
          </div>
        </div>

        <Reveal className="mt-12">
          <p className="max-w-measure border-l-2 border-bone/20 pl-6 text-body-sm text-bone/60">
            {MAP.countNote}
          </p>
        </Reveal>
      </div>
  )
}
