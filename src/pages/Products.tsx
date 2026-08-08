import { PageHeader } from '@/components/PageHeader'
import { Section, SectionHead } from '@/components/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Figure, PhotoPending } from '@/components/Figure'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { GOAT_MILK_BENEFITS, VERTICALS, DAIRY } from '@/data/story'

/**
 * /products — four verticals, B2B enquiry only.
 *
 * No cart and no prices, by design. Beyond that, two things are deliberately absent:
 *   · Goat milk powder. The client has mentioned it, but it appears in none of the three
 *     source documents — no specification, packaging, FSSAI licence or photograph exists.
 *     It is not listed until they supply those (docs/CLIENT-QUESTIONS.md §1).
 *   · Any price, margin or volume commitment. Enquiries go to a person instead.
 */

const SUBJECTS = [
  'Goat milk — wholesale supply',
  'Goat feed and silage',
  'Organic fertilizer from goat manure',
  'Organic pesticide from goat urine',
  'Distribution or retail partnership',
  'Something else',
]

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Four lines from one flock"
        standfirst="Goat milk is the business. Feed, fertilizer and pesticide come from the same animals and the same operation. All enquiries are business-to-business — tell us what you need and the team will come back to you."
      />

      <Section tone="bone" size="flush">
        <div className="shell">
          <RevealGroup as="ul" className="space-y-px">
            {VERTICALS.map((vertical, i) => (
              <RevealItem key={vertical.slug} as="li">
                <article className="grid gap-10 border-t border-bone-edge py-14 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    {vertical.image ? (
                      <Figure file={vertical.image} alt={vertical.imageAlt} ratio="landscape" />
                    ) : (
                      <PhotoPending label="Photograph to come" ratio="landscape" />
                    )}
                  </div>

                  <div className="lg:col-span-7 lg:col-start-6">
                    <span className="tnum text-caption text-earth-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-2 text-display-md font-semibold">{vertical.name}</h2>
                    <p className="mt-2 text-lead text-terracotta">{vertical.line}</p>
                    <p className="mt-5 max-w-measure text-body text-earth-soft">
                      {vertical.detail}
                    </p>
                    <p className="mt-6 inline-flex items-center border border-accent/30 bg-accent-wash px-3 py-1.5 text-source uppercase tracking-[0.1em] text-accent-deep">
                      {vertical.status}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Why goat milk — the one place the health claims belong */}
      <Section tone="deep" labelledBy="milk-heading">
        <div className="shell">
          <SectionHead
            id="milk-heading"
            eyebrow="Goat milk"
            title="Why buyers ask for it"
            standfirst="An immunity booster with higher nutritional and medicinal value and a lower fat proportion than cow milk — the positioning the project sells on."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {GOAT_MILK_BENEFITS.map((benefit) => (
              <RevealItem key={benefit.term} as="li" className="border-t border-earth/20 pt-5">
                <h3 className="text-body font-semibold">{benefit.term}</h3>
                <p className="mt-2 text-body-sm text-earth-soft">{benefit.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* These are claims from the source document, not our medical advice. Saying so
              costs nothing and protects the client. */}
          <Reveal className="mt-10">
            <p className="max-w-measure text-caption text-earth-faint">
              These properties are as described in the project’s own documentation. They are not
              medical advice and no therapeutic claim is made for the product.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Capability — what a buyer actually wants to know */}
      <Section tone="bone" labelledBy="capability-heading">
        <div className="shell">
          <SectionHead
            id="capability-heading"
            eyebrow="Capability"
            title="What we can supply against"
            standfirst="The plant is built and running. These are the facts a buyer needs before a conversation about volume."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-px overflow-hidden border border-bone-edge bg-bone-edge sm:grid-cols-2 lg:grid-cols-4">
            {DAIRY.spec.map((item) => (
              <RevealItem key={item.term} as="li" className="bg-bone p-8">
                <p className="tnum font-display text-display-sm font-semibold text-accent">
                  {item.term}
                </p>
                <p className="mt-3 text-body-sm text-earth-soft">{item.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <div className="border-l-2 border-accent pl-6">
              <p className="font-display text-display-sm font-semibold">
                {DAIRY.promise.heading}
              </p>
              <p className="mt-2 max-w-measure text-body text-earth-soft">{DAIRY.promise.body}</p>
            </div>
          </Reveal>

          {/* The building. Moved off the homepage — it is an inventory a buyer wants and a
              general visitor does not, so it lives here, once. */}
          <Reveal className="mt-14">
            <div className="grid gap-8 border-t border-bone-edge pt-10 lg:grid-cols-12">
              <h3 className="text-display-sm font-semibold lg:col-span-4">
                {DAIRY.facility.heading}
              </h3>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="max-w-measure text-body text-earth-soft">{DAIRY.facility.body}</p>
              </div>
            </div>
          </Reveal>

          {/* Prices are never published here — CLAUDE.md §5. */}
          <Reveal className="mt-10">
            <p className="max-w-measure text-body-sm text-earth-faint">
              We do not publish prices or volume commitments. Both depend on product, quantity and
              delivery point, so they are agreed directly.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Enquiry */}
      <Section tone="deep" labelledBy="enquiry-heading">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead
                id="enquiry-heading"
                eyebrow="Enquiries"
                title="Tell us what you need"
                standfirst="Wholesale supply, distribution, retail or institutional purchase. One of the team will reply."
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <EnquiryForm
                kind="product-enquiry"
                subjects={SUBJECTS}
                messageLabel="What are you looking for?"
                messagePlaceholder="Product, approximate quantity, delivery location and timing."
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
