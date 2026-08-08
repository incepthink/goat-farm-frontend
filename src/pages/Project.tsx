import { PageHeader } from '@/components/PageHeader'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { BREED, MODEL, TAGGING } from '@/data/story'
import { PHASES } from '@/data/timeline'
import { ADDITIONAL_VILLAGES, MAP, SURVEYED_VILLAGES, VILLAGE_TOTALS } from '@/data/villages'
import { GOAT_RECORDS, RECORD_OWNER } from '@/data/goatRecords'

/**
 * /project — the depth page. The model, the villages, the breed, the four-phase plan and
 * the raw per-animal data.
 *
 * The homepage makes the argument; this page is where someone who wants to check it can.
 * That is why the full 38-row table lives here rather than a stylised excerpt, and why
 * this page is the only place the six interventions, the eleven monitoring fields and the
 * complete breed figures appear.
 *
 * The distance schematic is deliberately absent. It was rendered here and on the homepage;
 * a diagram is the summary artefact and a table is the depth one, so the homepage keeps
 * the diagram and this page keeps the survey table below.
 */
export default function Project() {
  return (
    <>
      <PageHeader
        eyebrow="The project"
        title="How it actually works, in detail"
        standfirst="The homepage makes the case. This is the working detail underneath it — the villages, the breed, the plan, and the data we hold on every animal."
      />

      {/* The model, in full */}
      <Section tone="deep" labelledBy="model-detail">
        <div className="shell">
          <SectionHead
            id="model-detail"
            eyebrow="The model"
            title={MODEL.heading}
            standfirst={MODEL.standfirst}
            className="max-w-3xl"
          />

          <RevealGroup as="ol" className="mt-16 grid gap-10 md:grid-cols-2">
            {MODEL.pillars.map((pillar) => (
              <RevealItem key={pillar.term} as="li" className="border-t border-earth/20 pt-6">
                <span className="tnum text-caption text-accent">{pillar.n}</span>
                <h3 className="mt-2 text-display-sm font-semibold">{pillar.term}</h3>
                <p className="mt-3 max-w-measure-sm text-body text-earth-soft">{pillar.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-beat">
            <h3 className="eyebrow">{MODEL.interventionsHeading}</h3>
          </Reveal>
          <RevealGroup as="ul" className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {MODEL.interventions.map((item) => (
              <RevealItem key={item.term} as="li" className="border-t border-earth/20 pt-4">
                <h4 className="text-body font-semibold">{item.term}</h4>
                <p className="mt-2 text-body-sm text-earth-soft">{item.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* The breed */}
      <Section tone="bone" labelledBy="breed-detail">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead
                id="breed-detail"
                eyebrow={`The ${BREED.name} goat`}
                title={BREED.heading}
                standfirst={BREED.standfirst}
              />

              <RevealGroup className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {BREED.stats.map((stat) => (
                  <RevealItem key={stat.label} className="border-t border-bone-edge pt-4">
                    <p className="text-body-sm text-earth-soft">{stat.label}</p>
                    <p className="tnum mt-1 font-display text-display-sm font-semibold">
                      {stat.value}
                      {stat.suffix ?? ''}
                    </p>
                    {stat.note && <p className="mt-1 text-caption text-earth-faint">{stat.note}</p>}
                  </RevealItem>
                ))}
                {BREED.weights.map((w) => (
                  <RevealItem key={w.term} className="border-t border-bone-edge pt-4">
                    <p className="text-body-sm text-earth-soft">{w.term}, body weight</p>
                    <p className="tnum mt-1 font-display text-display-sm font-semibold">
                      {w.detail}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <Figure file={BREED.image} alt={BREED.imageAlt} ratio="portrait" />
              <Figure
                file="03-goats/image8.webp"
                alt="A Zalawadi doe with two kids"
                ratio="landscape"
                className="mt-6"
                caption="Fifty-five per cent of births are twins."
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The villages — the real survey table */}
      <Section tone="deep" labelledBy="villages-heading">
        <div className="shell">
          <SectionHead
            id="villages-heading"
            eyebrow="The villages"
            title="Thirteen surveyed, flock by flock"
            standfirst={
              <>
                The full survey table as it appears in the project profile. Seventeen villages are
                in the project; these thirteen are the ones with published flock counts.
              </>
            }
            className="max-w-3xl"
          />

          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-body-sm">
              <caption className="sr-only">
                Goat rearers, goats and distance from Malpur for each surveyed village
              </caption>
              <thead>
                <tr className="border-b border-earth/30 text-left">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Village
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    District
                  </th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">
                    Flock owners
                  </th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">
                    Goats
                  </th>
                  <th scope="col" className="py-3 text-right font-semibold">
                    km from Malpur
                  </th>
                </tr>
              </thead>
              <tbody>
                {SURVEYED_VILLAGES.map((village) => (
                  <tr key={village.name} className="border-b border-earth/12">
                    <th scope="row" className="py-3 pr-4 text-left font-medium">
                      {village.name}
                    </th>
                    <td className="py-3 pr-4 text-earth-soft">{village.district}</td>
                    <td className="tnum py-3 pr-4 text-right">{village.flockOwners}</td>
                    <td className="tnum py-3 pr-4 text-right">{village.goats}</td>
                    <td className="tnum py-3 text-right">{village.distanceKm}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-earth/40 font-semibold">
                  <th scope="row" className="py-3 pr-4 text-left">
                    Total
                  </th>
                  <td className="py-3 pr-4" />
                  <td className="tnum py-3 pr-4 text-right">{VILLAGE_TOTALS.flockOwners}</td>
                  <td className="tnum py-3 pr-4 text-right">
                    {VILLAGE_TOTALS.goats.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3" />
                </tr>
              </tbody>
            </table>
          </Reveal>

          {/*
            The source table carries a fourth column headed "Milk (Liters)" totalling
            9,164 — with no time unit anywhere on the page. Daily, monthly and annual are
            all consistent with the document, and they differ by 30×. It is omitted rather
            than misstated. See docs/CLIENT-QUESTIONS.md §3.
          */}
          <Reveal className="mt-6">
            <p className="max-w-measure border-l-2 border-terracotta pl-6 text-body-sm text-earth-soft">
              The source table has a fifth column of milk volumes. Its heading gives no time
              unit — daily, monthly and annual are all equally consistent with the document, and
              they differ by a factor of thirty. We have left it out rather than publish a figure
              we cannot qualify.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="eyebrow">Also in the project</h3>
            <p className="mt-4 max-w-measure text-body-sm text-earth-soft">
              Named in the project documents, without published flock figures.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {ADDITIONAL_VILLAGES.map((village) => (
                <li
                  key={village.name}
                  className="border border-earth/20 px-3 py-1.5 text-body-sm text-earth-soft"
                >
                  {village.name}
                  <span className="ml-2 text-caption text-earth-faint">{village.district}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <p className="max-w-measure text-body-sm text-earth-faint">{MAP.countNote}</p>
          </Reveal>
        </div>
      </Section>

      {/* The full per-animal record */}
      <Section tone="bone" labelledBy="records-heading">
        <div className="shell">
          <SectionHead
            id="records-heading"
            eyebrow="The data"
            title="One flock, thirty-eight animals, every one measured"
            standfirst={
              <>
                This is the actual record for {RECORD_OWNER.name}’s flock in{' '}
                {RECORD_OWNER.village}, reproduced in full. It is the strongest evidence the
                project owns that the data system is real.
              </>
            }
            className="max-w-3xl"
          />

          <Reveal className="mt-12 max-h-[36rem] overflow-auto border border-bone-edge">
            <table className="w-full min-w-[34rem] border-collapse text-body-sm">
              <caption className="sr-only">
                Per-animal record: goat ID, age, height, weight, lactations and average daily yield
              </caption>
              <thead className="sticky top-0 bg-bone-deep">
                <tr className="text-left">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Goat ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Age
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Height
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Weight
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Lactations
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Daily yield
                  </th>
                </tr>
              </thead>
              <tbody>
                {GOAT_RECORDS.map((goat) => (
                  <tr key={goat.id} className="border-t border-bone-edge">
                    <th scope="row" className="tnum px-4 py-2.5 text-left font-normal">
                      {goat.id}
                    </th>
                    <td className="tnum px-4 py-2.5 text-right">{goat.ageYears} yr</td>
                    <td className="tnum px-4 py-2.5 text-right">{goat.heightCm} cm</td>
                    <td className="tnum px-4 py-2.5 text-right">{goat.weightKg} kg</td>
                    <td className="tnum px-4 py-2.5 text-right">{goat.lactations ?? '—'}</td>
                    <td className="tnum px-4 py-2.5 text-right font-semibold text-accent">
                      {goat.milkAvgL !== null ? `${goat.milkAvgL} L` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/*
            The source table also carries per-animal feed cost and labour cost in rupees,
            and the owner's mobile number. Neither is published — CLAUDE.md §5 bars any
            rupee figure without client confirmation, and the phone number is personal data.
          */}
          <Reveal className="mt-6">
            <p className="max-w-measure text-body-sm text-earth-faint">
              The original record also holds per-animal feed and labour costs. Those columns are
              not published here — no cost figure goes on this site until the client confirms it.
            </p>
          </Reveal>

          <Reveal className="mt-beat">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="text-display-sm font-semibold">Eleven things, per animal</h3>
                <p className="mt-4 max-w-measure text-body text-earth-soft">{TAGGING.moat}</p>
                <p className="mt-6 border-l-2 border-accent pl-6 text-body text-earth-soft">
                  “{TAGGING.honesty.text}”
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                {TAGGING.monitoring.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-bone-edge py-2.5"
                  >
                    <span className="tnum text-source text-earth-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The four-phase plan */}
      <Section tone="ink" labelledBy="phases-heading">
        <div className="shell">
          <SectionHead
            id="phases-heading"
            eyebrow="The plan"
            title="Four phases, twelve years"
            standfirst="Backward integration first, then processing, then market linkage — with genetic improvement running underneath the whole thing from year three."
            tone="dark"
            className="max-w-3xl"
          />

          <RevealGroup as="ol" className="mt-16 space-y-px">
            {PHASES.map((phase) => (
              <RevealItem key={phase.n} as="li" className="bg-earth-deep">
                <div className="grid gap-8 border-t border-bone/15 py-10 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="text-caption uppercase tracking-[0.12em] text-accent-soft">
                      {phase.n} · {phase.years}
                    </p>
                    <h3 className="mt-3 font-display text-display-sm font-semibold text-bone">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-bone/60">{phase.focus}</p>
                  </div>
                  <ul className="space-y-2 lg:col-span-7 lg:col-start-6">
                    {phase.activities.map((activity) => (
                      <li key={activity} className="flex gap-3 text-body-sm text-bone/75">
                        <span aria-hidden className="mt-2 block h-px w-4 shrink-0 bg-bone/30" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  )
}
