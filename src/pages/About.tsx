import { PageHeader } from '@/components/PageHeader'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure } from '@/components/Figure'
import { AsfLogo } from '@/components/brand/AsfLogo'
import { ENTITIES, IGBDPL_IDENTIFIERS, LEADERSHIP, LEGACY, ORG } from '@/data/org'
import { INSTITUTIONAL_IMAGES, NAMED_INDIVIDUALS, PARTNERS } from '@/data/partners'
import { img } from '@/lib/images'

/**
 * /about — the legacy, the three-entity structure, leadership and partners.
 *
 * This page carries the site's entire ration of institutional photography: the four
 * meeting-room images below and nothing else, anywhere. We hold thirteen such photos and
 * six of the women who own 93% of the flocks, and building from what is most plentiful
 * would produce a site about handshakes (CLAUDE.md §6, image rule 1).
 *
 * The IGBDPL mark is used here from the supplied raster, small. It has not been redrawn:
 * the Warli figure ring, DNA helix and drawn goat head cannot be traced faithfully from a
 * 760px file, and shipping an altered version of someone's logo is worse than shipping a
 * soft one. See docs/CLIENT-QUESTIONS.md §1.
 */

const OBJECTIVES = [
  {
    title: 'Increase yield and productivity',
    detail:
      'Of indigenous goat breeds, by providing nutrition, infrastructure and healthcare for the animals.',
    source: 'A p5 L20–25',
  },
  {
    title: 'Establish direct market linkages',
    detail: 'For goat milk, meat and manure — so that better animals turn into better income.',
    source: 'A p5 L20–25',
  },
  {
    title: 'Financial empowerment of women',
    detail: 'Through greater participation in every process of goat rearing.',
    source: 'A p5 L20–25',
  },
]

export default function About() {
  const igbdplLogo = img('02-logos/image4.webp')

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A name, a thesis, and three organisations"
        standfirst={ORG.tagline}
      />

      {/* The legacy */}
      <Section tone="deep" labelledBy="legacy-heading">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead
                id="legacy-heading"
                eyebrow="The name"
                title="Annasaheb Shinde"
                standfirst={LEGACY.body}
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="border-l-2 border-terracotta pl-6">
                <p className="font-display text-display-sm font-semibold">{LEGACY.descriptor}</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-beat">
            <h3 className="eyebrow">The mission</h3>
            <p className="mt-6 max-w-measure text-lead text-earth-soft">
              To transform the lives of small and marginal farmers, particularly women and nomadic
              communities, by building sustainable and scalable goat-rearing ecosystems that
              provide stable incomes and improved quality of life.
            </p>
          </Reveal>

          <RevealGroup as="ol" className="mt-14 grid gap-10 md:grid-cols-3">
            {OBJECTIVES.map((objective, i) => (
              <RevealItem key={objective.title} as="li" className="border-t border-earth/20 pt-5">
                <span className="tnum text-caption text-earth-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-2 text-display-sm font-semibold">{objective.title}</h4>
                <p className="mt-3 text-body-sm text-earth-soft">{objective.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* The three entities */}
      <Section tone="bone" labelledBy="entities-heading">
        <div className="shell">
          <SectionHead
            id="entities-heading"
            eyebrow="The structure"
            title="Why it takes three organisations"
            standfirst="A healthy goat with no buyer is worthless; a buyer with sick goats has no supply. One half is donor-funded and produces no revenue, the other is commercial. Trying to do both inside one entity is what stops this model working elsewhere."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-16 space-y-px">
            {ENTITIES.map((entity) => (
              <RevealItem key={entity.abbr} as="li">
                <div className="grid gap-8 border-t border-bone-edge py-10 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="font-display text-display-sm font-semibold">{entity.abbr}</p>
                    <p className="mt-2 text-caption uppercase tracking-[0.1em] text-terracotta">
                      {entity.type}
                    </p>
                  </div>
                  <div className="lg:col-span-8 lg:col-start-5">
                    <p className="text-body font-semibold">{entity.name}</p>
                    <p className="mt-3 max-w-measure text-body text-earth-soft">{entity.role}</p>
                    <p className="mt-3 text-body-sm text-earth-faint">{entity.funding}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* The two marks side by side — the clearest statement of the structure the section
              has just argued: one non-profit, one company, one project. */}
          <Reveal className="mt-14">
            <div className="grid gap-10 border-t border-bone-edge pt-10 sm:grid-cols-2">
              <div className="flex flex-wrap items-center gap-8">
                <AsfLogo className="h-24 w-auto" />
                <div className="text-body-sm">
                  <p className="font-semibold">{ORG.legalName}</p>
                  <p className="mt-1 text-earth-faint">Section 8 non-profit</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <img
                  src={igbdplLogo.src}
                  alt="The IGBDPL mark — a goat's head inside a DNA helix, ringed with Warli figures"
                  width={igbdplLogo.width}
                  height={igbdplLogo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-24 object-contain"
                />
                <dl className="text-body-sm">
                  <div className="flex gap-3">
                    <dt className="text-earth-faint">CIN</dt>
                    <dd className="tnum font-medium">{IGBDPL_IDENTIFIERS.cin}</dd>
                  </div>
                  <div className="mt-1 flex gap-3">
                    <dt className="text-earth-faint">GSTIN</dt>
                    <dd className="tnum font-medium">{IGBDPL_IDENTIFIERS.gstin}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="ink" labelledBy="leadership-heading">
        <div className="shell">
          <SectionHead
            id="leadership-heading"
            eyebrow="Leadership"
            title="Who runs it"
            tone="dark"
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-10 md:grid-cols-3">
            {LEADERSHIP.map((person) => (
              <RevealItem
                key={`${person.name}-${person.org}`}
                as="li"
                className="border-t border-bone/20 pt-5"
              >
                <p className="font-display text-display-sm font-semibold text-bone">
                  {person.name}
                </p>
                <p className="mt-2 text-body text-accent-soft">{person.role}</p>
                <p className="mt-1 text-body-sm text-bone/60">{person.org}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* The dual title is correct, not a duplication error. Saying so pre-empts the
              obvious "your website has a mistake" email. */}
          <Reveal className="mt-8">
            <p className="max-w-measure text-body-sm text-bone/50">
              Mr. Patwardhan holds two posts — Chief Operating Officer of the foundation and Chief
              Executive Officer of the commercial company. Roles are listed by entity rather than
              merged.
            </p>
          </Reveal>

          {/* Trustees are not listed — no board list appears in any source document. */}
        </div>
      </Section>

      {/* Partners — and the site's entire allocation of institutional photography */}
      <Section tone="bone" labelledBy="partners-page-heading">
        <div className="shell">
          <SectionHead
            id="partners-page-heading"
            eyebrow="Partners & institutions"
            title="The bodies standing behind the protocol"
            standfirst="Breed improvement claims are only worth something if an independent institution designed the protocol. These are the ones that did, and they can be asked."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {PARTNERS.map((partner) => (
              <RevealItem key={partner.abbr} as="li" className="border-t border-bone-edge pt-6">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-body font-semibold">{partner.abbr}</h3>
                  {partner.location && (
                    <span className="text-caption text-earth-faint">{partner.location}</span>
                  )}
                </div>
                <p className="mt-1 text-body-sm">{partner.name}</p>
                <p className="mt-3 max-w-measure-sm text-body-sm text-earth-soft">{partner.role}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-beat">
            <h3 className="eyebrow">On the record</h3>
          </Reveal>
          <RevealGroup as="ul" className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {NAMED_INDIVIDUALS.map((person) => (
              <RevealItem key={person.name} as="li" className="border-t border-bone-edge pt-4">
                <p className="text-body font-semibold">{person.name}</p>
                <p className="mt-1 text-body-sm text-earth-soft">
                  {person.role}
                  {person.org ? `, ${person.org}` : ''}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INSTITUTIONAL_IMAGES.map((image) => (
              <RevealItem key={image.file}>
                <Figure file={image.file} alt={image.alt} ratio="landscape" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  )
}
