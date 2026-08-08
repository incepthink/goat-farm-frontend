import { DAIRY, VERTICALS, VERTICALS_INTRO } from '@/data/story'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure, PhotoPending } from '@/components/Figure'
import { DepthLink } from '@/components/DepthLink'
import { Rail } from '@/components/Rail'

/**
 * BEAT 6 — The dairy, and what comes out of it.
 *
 * The old beats 7 and 8 merged. "The plant exists" and "here is what it produces" are one
 * claim; splitting them cost a section opener and a full `py-beat` to say the second half
 * of a sentence.
 *
 * A horizontal photo rail. Deliberately a native overflow-scroll strip rather than a
 * scroll-jacked pinned sequence: it works with a trackpad, a touch swipe, a mouse wheel
 * and a keyboard, needs no JavaScript, and does not fight Lenis. The plant photographs
 * are the strongest evidence on the page and should not be gated behind a gesture.
 *
 * The verticals run as a compact row against the dark ground rather than four portrait
 * cards. /products describes all four in full, with the enquiry form — this is the
 * headline only.
 */
export function Dairy() {
  return (
    <Section tone="ink" labelledBy="dairy-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead
              id="dairy-heading"
              eyebrow={DAIRY.eyebrow}
              title={DAIRY.heading}
              standfirst={DAIRY.standfirst}
              tone="dark"
            />
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <div className="border border-bone/15 p-8">
              <p className="font-display text-display-sm font-semibold text-bone">
                {DAIRY.promise.heading}
              </p>
              <p className="mt-3 text-body-sm text-bone/65">{DAIRY.promise.body}</p>

            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-16 grid gap-px overflow-hidden border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {DAIRY.spec.map((item) => (
            <RevealItem key={item.term} as="li" className="bg-earth-deep p-8">
              <p className="tnum font-display text-display-sm font-semibold text-accent-soft">
                {item.term}
              </p>
              <p className="mt-3 text-body-sm text-bone/70">{item.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Full-width rail — the one place the shell padding is broken deliberately. */}
      <Reveal className="mt-16">
        <Rail
          label="Photographs of the Malpur dairy"
          tone="dark"
          scrollerClassName="gap-5 pb-4"
          hint="Scroll sideways · the built plant at Malpur"
        >
          {DAIRY.gallery.map((photo) => (
            <div key={photo.file} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]">
              <Figure file={photo.file} alt={photo.alt} ratio="landscape" invert />
            </div>
          ))}
        </Rail>
      </Reveal>

      {/*
        The four verticals — headline only, under a sub-head rather than a second
        SectionHead. DAIRY.facility (the leased building inventory) is not here: it is
        buyer-facing detail and now lives once, on /products under Capability.
      */}
      <div className="shell mt-16">
        <Reveal>
          <div className="border-t border-bone/15 pt-12">
            <p className="eyebrow text-bone/50">{VERTICALS_INTRO.eyebrow}</p>
            <h3 className="mt-4 max-w-[24ch] text-display-sm font-semibold text-bone">
              {VERTICALS_INTRO.heading}
            </h3>
            <p className="mt-4 max-w-measure text-body text-bone/70">
              {VERTICALS_INTRO.standfirst}

            </p>
          </div>
        </Reveal>

        <RevealGroup
          as="ol"
          className="mt-14 grid gap-px overflow-hidden border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VERTICALS.map((vertical, i) => (
            <RevealItem key={vertical.slug} as="li" className="bg-earth-deep p-8">
              {/* The claim is that nothing the animal produces is wasted — it needs the
                  photographs to carry it. Landscape, uniform, one file swap each. */}
              {vertical.image ? (
                <Figure
                  file={vertical.image}
                  alt={vertical.imageAlt}
                  ratio="landscape"
                  invert
                  className="mb-6"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 88vw"
                />
              ) : (
                <PhotoPending
                  label="Distillation unit photograph to come"
                  ratio="landscape"
                  invert
                  className="mb-6"
                />
              )}

              <span className="tnum text-caption text-bone/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-3 text-display-sm font-semibold text-bone">{vertical.name}</h4>
              <p className="mt-1 text-body-sm text-terracotta-soft">{vertical.line}</p>
              <p className="mt-4 text-body-sm text-bone/65">{vertical.detail}</p>
              <p className="mt-5 inline-flex items-center border border-accent-soft/40 px-3 py-1.5 text-source uppercase tracking-[0.1em] text-accent-soft">
                {vertical.status}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <DepthLink
          to="/products"
          detail="All four lines in full, what buyers ask for, and B2B enquiries"
          tone="dark"
          className="mt-16"
        >
          Product details and enquiries
        </DepthLink>
      </div>
    </Section>
  )
}
