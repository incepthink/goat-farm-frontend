import { NAMED_INDIVIDUALS, PARTNERS, PARTNERS_INTRO } from '@/data/partners'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { DepthLink } from '@/components/DepthLink'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Who is behind it.
 *
 * A marquee of partner names rather than logos: we hold no logo files for any of these
 * institutions, and a marquee of low-resolution logos scraped from a slide deck would
 * look worse than well-set type. Names are set in the display serif, which is what a
 * research-institution credit ought to look like anyway.
 *
 * Institutional photography is deliberately absent here — it is rationed to one section
 * on /about (CLAUDE.md §6, image rule 1).
 *
 * `summary` is the marquee and nothing else, and on the homepage it is rendered flush
 * against the closing section as a credibility band rather than as a beat of its own. The
 * eight-institution grid and the seven named individuals were being reproduced almost
 * line-for-line on /about, at a cost of ~1,850px; /about is now their only home.
 */
export function Partners({ variant = 'full' }: { variant?: 'summary' | 'full' }) {
  const reduced = usePrefersReducedMotion()
  const isSummary = variant === 'summary'

  return (
    <Section
      tone="bone"
      size={isSummary ? 'flush' : 'default'}
      labelledBy={isSummary ? undefined : 'partners-heading'}
      className={isSummary ? 'pt-beat' : undefined}
    >
      {isSummary ? (
        <div className="shell">
          <p className="eyebrow">{PARTNERS_INTRO.eyebrow}</p>
        </div>
      ) : (
        <div className="shell">
          <SectionHead
            id="partners-heading"
            eyebrow={PARTNERS_INTRO.eyebrow}
            title={PARTNERS_INTRO.heading}
            standfirst={PARTNERS_INTRO.standfirst}
            className="max-w-3xl"
          />
        </div>
      )}

      {/* Marquee. Paused entirely under reduced motion, where it renders as a static row. */}
      <div
        className={`relative flex overflow-hidden border-y border-bone-edge py-6 ${
          isSummary ? 'mt-8' : 'mt-16'
        }`}
        aria-hidden
      >
        <div className={`flex shrink-0 items-center gap-14 pr-14 ${reduced ? '' : 'animate-marquee'}`}>
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <span
              key={`${partner.abbr}-${i}`}
              className="whitespace-nowrap font-display text-display-sm font-semibold text-earth/45"
            >
              {partner.abbr}
            </span>
          ))}
        </div>
      </div>

      {isSummary ? (
        <div className="shell">
          {/*
            The marquee is aria-hidden, so the summary variant would otherwise name none of
            these institutions to a screen reader. The list carries them; the link carries
            the detail.
          */}
          <p className="sr-only">
            Partner institutions: {PARTNERS.map((p) => p.name).join(', ')}.
          </p>
          <DepthLink
            to="/about"
            detail={`All ${PARTNERS.length} institutions, and the scientists and officials who can be asked about this project`}
            className="mt-8"
          >
            Who is behind it
          </DepthLink>
        </div>
      ) : (
      <div className="shell">
        <RevealGroup as="ul" className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PARTNERS.map((partner) => (
            <RevealItem key={partner.abbr} as="li" className="border-t border-bone-edge pt-6">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-body font-semibold">{partner.abbr}</h3>
                {partner.location && (
                  <span className="text-caption text-earth-faint">{partner.location}</span>
                )}
              </div>
              <p className="mt-1 text-body-sm text-earth">{partner.name}</p>
              <p className="mt-3 max-w-measure-sm text-body-sm text-earth-soft">{partner.role}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-beat">
          <h3 className="eyebrow">Named on the record</h3>
          <p className="mt-4 max-w-measure text-body text-earth-soft">
            The scientists and officials who have engaged with this project directly, and can be
            asked about it.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
      )}
    </Section>
  )
}
