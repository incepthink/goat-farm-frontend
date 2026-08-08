import { PageHeader } from '@/components/PageHeader'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { SDGS } from '@/data/org'
import { AS_OF, GAINS, TRACTION, TRAINING } from '@/data/traction'
import { Traction } from '@/sections/07-Traction'
import { VISITS } from '@/data/timeline'

/**
 * /impact — the numbers, the outcomes and the SDG alignment.
 *
 * Renders traction at its `full` density, which is the density the homepage no longer
 * uses: the training figures live here. Same component, same data constants — a corrected
 * figure is still edited once.
 *
 * The Jan-2024 timeline is not repeated here either; the homepage owns it, inside the
 * "where, and when" beat. What this page keeps is VISITS below — the institutional record,
 * which was always separate from the operational one.
 *
 * The flock-owners section is deliberately NOT repeated here. It is the human centre of
 * the homepage argument and now runs six photographs large; rendering it twice doubled
 * that image payload to restate a figure this page already carries as an outcome. The
 * homepage owns the photographic treatment, this page owns the outcome statement — a real
 * division of labour rather than a copy (docs/HOMEPAGE-CONDENSE-PLAN.md §6).
 */

const OUTCOMES = [
  {
    title: 'Improved livestock productivity',
    detail:
      'More deliveries per year, more kids per delivery, higher yield and fewer deaths — the four measures the interventions were designed to move.',
    source: 'A p7 L17–26',
  },
  {
    title: 'Enhanced farmer income',
    detail:
      'Milk sold daily to a guaranteed buyer, plus manure and by-products, instead of a single payment when an animal is sold.',
    source: 'A p7 L17–26',
  },
  {
    title: 'Job creation',
    detail:
      'Twenty-five direct jobs so far — livestock supervisors, collection staff, dairy and distillation workers.',
    source: 'A p7 L17–26',
  },
  {
    title: 'Increased participation of women',
    detail:
      'Ninety-three per cent of flock owners are women, and the training and health camps are built around them.',
    source: 'A p7 L17–26',
  },
]

const LONG_TERM = [
  {
    title: 'A sustainable goat farming ecosystem',
    detail:
      'Health, feed, genetics and market linkage operating together, at a scale where each one supports the others.',
    source: 'A p7 L28–34',
  },
  {
    title: 'Rural revitalisation and community well-being',
    detail:
      'A stable income means a family stops migrating with the grazing — which is what puts children in a school and within reach of a clinic.',
    source: 'A p7 L28–34',
  },
  {
    title: 'Women’s empowerment',
    detail:
      'Moving women from rearing goats to running the enterprise built around them.',
    source: 'A p7 L28–34',
  },
]

export default function Impact() {
  return (
    <>
      <PageHeader
        eyebrow={`Impact · as of ${AS_OF}`}
        title="What has changed, and for how many"
        standfirst={
          <>
            Phase one began on 1 January 2024. Everything on this page was measured seventeen
            months later, and every figure says where it came from.
          </>
        }
      >
        <Reveal delay={0.2}>
          <dl className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[TRACTION[0], TRACTION[2], GAINS[0], TRAINING[0]].map((item) => {
              const isStat = 'value' in item
              return (
                <div key={isStat ? item.label : item.metric} className="border-t border-bone-edge pt-5">
                  <dt className="text-body-sm text-earth-soft">
                    {isStat ? item.label : item.metric}
                  </dt>
                  <dd className="mt-2 font-display text-stat-sm font-semibold text-earth">
                    {isStat ? (
                      <CountUp value={item.value} suffix={item.suffix ?? ''} />
                    ) : (
                      <span className="tnum">{item.to}</span>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </Reveal>
      </PageHeader>

      <Traction />

      {/* Outcomes */}
      <Section tone="bone" labelledBy="outcomes-heading">
        <div className="shell">
          <SectionHead
            id="outcomes-heading"
            eyebrow="Immediate outcomes"
            title="What the work produces now"
            className="max-w-3xl"
          />
          <RevealGroup as="ul" className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {OUTCOMES.map((outcome) => (
              <RevealItem key={outcome.title} as="li" className="border-t border-bone-edge pt-6">
                <h3 className="text-display-sm font-semibold">{outcome.title}</h3>
                <p className="mt-3 max-w-measure-sm text-body text-earth-soft">{outcome.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Institutional visits, kept apart from the operational timeline */}
      <Section tone="bone" labelledBy="visits-heading" size="default">
        <div className="shell">
          <h2 id="visits-heading" className="eyebrow">
            Also on the record
          </h2>
          <ul className="mt-8 space-y-4">
            {VISITS.map((visit) => (
              <li key={visit.title} className="border-t border-bone-edge pt-4">
                <p className="text-body font-semibold">{visit.title}</p>
                <p className="mt-1 text-body-sm text-earth-soft">{visit.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Long-term impact and SDGs */}
      <Section tone="ink" labelledBy="longterm-heading">
        <div className="shell">
          <SectionHead
            id="longterm-heading"
            eyebrow="Long-term impact"
            title="What it adds up to"
            tone="dark"
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-10 md:grid-cols-3">
            {LONG_TERM.map((item) => (
              <RevealItem key={item.title} as="li" className="border-t border-bone/20 pt-6">
                <h3 className="text-display-sm font-semibold text-bone">{item.title}</h3>
                <p className="mt-3 text-body-sm text-bone/70">{item.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-beat">
            <h3 className="eyebrow text-bone/50">Sustainable Development Goals</h3>
            <ul className="mt-8 grid gap-px overflow-hidden border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
              {SDGS.goals.map((goal) => (
                <li key={goal.number} className="bg-earth-deep p-6">
                  <p className="tnum font-display text-display-sm font-semibold text-accent-soft">
                    SDG {goal.number}
                  </p>
                  <p className="mt-2 text-body-sm text-bone/70">{goal.title}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
