import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { VillageMapBody } from './VillageMap'
import { JourneyBody } from './Journey'
import { TIMELINE_INTRO } from '@/data/timeline'

/**
 * BEAT 9 — Where, and when.
 *
 * The old beats 11 and 12 merged into one. They were always answering halves of the same
 * question — the schematic says where this happens, the rail says when it happened — and
 * running them as two full sections cost a whole extra `py-beat` on both ends plus a second
 * section opener, for no gain in comprehension.
 *
 * The merged beat takes the map's dark ground, so the timeline rail runs in its inverted
 * treatment here. The rail's light version still exists for /impact; `JourneyBody` takes a
 * `tone` rather than being forked (docs/HOMEPAGE-CONDENSE-PLAN.md §3.1).
 *
 * The rail breaks out of the shell deliberately — it is full-bleed horizontal scroll, and
 * the padding it needs is its own.
 */
export function WhereAndWhen() {
  return (
    <Section tone="ink" labelledBy="map-heading">
      <VillageMapBody />

      {/*
        A sub-head, not a second SectionHead. Inside a merged beat the display-md heading
        plus lead standfirst reads as a new section starting and costs ~365px to say
        "and here is when" — the same words at display-sm do it in half the space.
      */}
      <div className="shell mt-16 border-t border-bone/15 pt-12">
        <Reveal>
          <p className="eyebrow text-bone/50">{TIMELINE_INTRO.eyebrow}</p>
          <h3 id="journey-heading" className="mt-4 max-w-[24ch] text-display-sm font-semibold text-bone">
            {TIMELINE_INTRO.heading}
          </h3>
          <p className="mt-4 max-w-measure text-body text-bone/70">{TIMELINE_INTRO.standfirst}</p>
        </Reveal>
      </div>

      <JourneyBody tone="dark" />
    </Section>
  )
}
