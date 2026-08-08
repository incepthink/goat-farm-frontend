import { TAGGING } from '@/data/story'
import { FEATURED_RECORDS, RECORD_OWNER, RECORD_SUMMARY } from '@/data/goatRecords'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { DepthLink } from '@/components/DepthLink'

/**
 * BEAT 5 — Tagging & data.
 *
 * The goat-ID cards deal out on scroll, then a stylised excerpt of the real per-animal
 * table. Feed-cost and labour-cost columns from the source are deliberately absent —
 * see src/data/goatRecords.ts for why.
 *
 * `summary` keeps the six cards and the honesty quote. The quote stays on the homepage
 * because it is a persuasion asset rather than evidence: admitting what is not yet proven
 * is what makes the rest of the page's claims credible. The eleven-field monitoring list
 * is the evidence, and it goes to /project alongside all thirty-eight records.
 */
export function Tagging({ variant = 'full' }: { variant?: 'summary' | 'full' }) {
  const isSummary = variant === 'summary'

  return (
    <Section tone="bone" labelledBy="tagging-heading">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              id="tagging-heading"
              eyebrow={TAGGING.eyebrow}
              title={TAGGING.heading}
              standfirst={TAGGING.standfirst}
            />
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <Figure
              file={TAGGING.image}
              alt={TAGGING.imageAlt}
              ratio="square"
              caption="One tag, one animal, one record that starts the day it is fitted."
            />
          </Reveal>
        </div>

        {/* Say what the cards are before showing them — six bare tag numbers explain nothing. */}
        <Reveal className="mt-16">
          <h3 className="text-display-sm font-semibold">{TAGGING.recordsLead.heading}</h3>
          <p className="mt-4 max-w-measure text-body text-earth-soft">
            {TAGGING.recordsLead.body}
          </p>
          <p className="mt-3 max-w-measure text-body-sm text-earth-faint">
            {TAGGING.recordsLead.provenance} {RECORD_SUMMARY.count} — {RECORD_OWNER.name}’s, in{' '}
            {RECORD_OWNER.village}.
          </p>
        </Reveal>

        {/* The cards deal out — the animation that makes "every goat has a number" land. */}
        <RevealGroup className="mt-8 grid gap-px overflow-hidden border border-bone-edge bg-bone-edge sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_RECORDS.map((goat) => (
            <RevealItem key={goat.id} className="bg-bone p-6">
              <p className="tnum text-caption tracking-[0.08em] text-earth-faint">{goat.id}</p>
              <dl className="mt-5 grid grid-cols-2 gap-y-4">
                <div>
                  <dt className="text-source uppercase tracking-[0.1em] text-earth-faint">Age</dt>
                  <dd className="tnum mt-1 font-display text-display-sm font-semibold">
                    {goat.ageYears}
                    <span className="ml-1 font-sans text-body-sm font-normal text-earth-faint">yr</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-source uppercase tracking-[0.1em] text-earth-faint">Weight</dt>
                  <dd className="tnum mt-1 font-display text-display-sm font-semibold">
                    {goat.weightKg}
                    <span className="ml-1 font-sans text-body-sm font-normal text-earth-faint">kg</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-source uppercase tracking-[0.1em] text-earth-faint">
                    Lactations
                  </dt>
                  <dd className="tnum mt-1 text-body font-semibold">{goat.lactations ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-source uppercase tracking-[0.1em] text-earth-faint">
                    Daily yield
                  </dt>
                  <dd className="tnum mt-1 text-body font-semibold text-accent">
                    {goat.milkAvgL !== null ? `${goat.milkAvgL} L` : '—'}
                  </dd>
                </div>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* The honesty note. Keeping it prominent is the point — it is what makes the
            rest of the claims on this page believable. */}
        <Reveal className="mt-16">
          <figure className="border-l-2 border-accent bg-accent-wash/60 p-8 md:p-10">
            <blockquote className="max-w-measure font-display text-display-sm font-semibold text-earth">
              “{TAGGING.honesty.text}”
            </blockquote>
            <figcaption className="mt-5 text-body-sm text-earth-soft">
              {TAGGING.honesty.attribution}

            </figcaption>
          </figure>
        </Reveal>

        {isSummary ? (
          <DepthLink
            to="/project"
            detail={`All ${RECORD_SUMMARY.count} animals in the flock, and the eleven fields recorded for each`}
            className="mt-16"
          >
            The full per-animal record
          </DepthLink>
        ) : (
          <>
            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <h3 className="text-display-sm font-semibold">Eleven things, per animal</h3>
                <p className="mt-4 max-w-measure text-body text-earth-soft">{TAGGING.moat}</p>
              </Reveal>

              <RevealGroup
                as="ul"
                className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
              >
                {TAGGING.monitoring.map((item, i) => (
                  <RevealItem key={item} as="li" className="flex items-baseline gap-3 border-b border-bone-edge py-2.5">
                    <span className="tnum text-source text-earth-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body-sm">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

          </>
        )}
      </div>
    </Section>
  )
}
