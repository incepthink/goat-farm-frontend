import { useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { EXCLUDED_FILES, GALLERY_GROUPS, GALLERY_NOTE } from '@/data/gallery'
import { imagesIn } from '@/lib/images'

/**
 * /gallery — field photography, grouped.
 *
 * Alt text here is necessarily generic: we know what each folder contains, but not who or
 * what is in every individual frame, and inventing specific descriptions would be worse
 * than an honest general one. When the client supplies captions, they go in
 * src/data/gallery.ts.
 */
export default function Gallery() {
  const groups = useMemo(
    () =>
      GALLERY_GROUPS.map((group) => ({
        ...group,
        images: imagesIn(group.cat).filter(
          (image) => !EXCLUDED_FILES.some((excluded) => image.src.endsWith(excluded)),
        ),
      })).filter((group) => group.images.length > 0),
    [],
  )

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The project, as photographed in the field"
        standfirst={GALLERY_NOTE}
      />

      {groups.map((group, groupIndex) => (
        <Section
          key={group.cat}
          tone={groupIndex % 2 === 0 ? 'bone' : 'deep'}
          labelledBy={`gallery-${group.cat}`}
        >
          <div className="shell">
            <Reveal>
              <h2 id={`gallery-${group.cat}`} className="text-display-md font-semibold">
                {group.title}
              </h2>
              <p className="mt-3 max-w-measure text-body text-earth-soft">{group.blurb}</p>
              <p className="mt-2 text-caption text-earth-faint">
                {group.images.length} {group.images.length === 1 ? 'photograph' : 'photographs'}
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.images.map((image, i) => (
                <RevealItem key={image.src}>
                  <div className="frame aspect-landscape w-full">
                    <img
                      src={image.src}
                      alt={`${group.title} — photograph ${i + 1} of ${group.images.length}`}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full scale-[1.03] object-cover"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      ))}
    </>
  )
}
