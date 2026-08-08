import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { CONTACT, LEADERSHIP, OFFICES } from '@/data/org'

/**
 * /contact — three locations and one enquiry form.
 *
 * This is where investor, CSR and partnership enquiries land, so the subject list covers
 * all of them rather than sending people hunting for a different page.
 */

const SUBJECTS = [
  'CSR or corporate partnership',
  'Investment or commercial partnership',
  'Product supply enquiry',
  'Institutional or research collaboration',
  'Press',
  'Something else',
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Three offices, one project"
        standfirst="Mumbai and Pune for administration, and Malpur for everything that actually happens. CSR, investment and partnership enquiries all reach the same team."
      />

      <Section tone="bone" size="flush">
        <div className="shell">
          <ul className="grid gap-px overflow-hidden border border-bone-edge bg-bone-edge lg:grid-cols-3">
            {OFFICES.map((office) => (
              <li key={office.label} className="bg-bone p-8 md:p-10">
                <p className="text-caption uppercase tracking-[0.12em] text-terracotta">
                  {office.kind}
                </p>
                <h2 className="mt-3 font-display text-display-sm font-semibold">{office.label}</h2>
                <address className="mt-4 not-italic text-body text-earth-soft">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="bone" labelledBy="reach-heading">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="reach-heading" className="text-display-md font-semibold">
                Reach us directly
              </h2>

              <div className="mt-10">
                <h3 className="eyebrow">By phone</h3>
                <ul className="mt-4 space-y-2">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="tnum text-lead text-earth transition-colors hover:text-accent"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h3 className="eyebrow">By email</h3>
                <ul className="mt-4 space-y-3">
                  {CONTACT.emails.map((email) => (
                    <li key={email.address}>
                      <a
                        href={`mailto:${email.address}`}
                        className="text-body font-semibold text-earth underline decoration-earth-faint/40 underline-offset-4 transition-colors hover:text-accent"
                      >
                        {email.address}
                      </a>
                      <span className="ml-2 text-body-sm text-earth-faint">{email.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-bone-edge pt-6">
                <h3 className="eyebrow">Who you will be speaking to</h3>
                <ul className="mt-4 space-y-3">
                  {LEADERSHIP.map((person) => (
                    <li key={`${person.name}-${person.org}`}>
                      <p className="text-body font-semibold">{person.name}</p>
                      <p className="text-body-sm text-earth-soft">
                        {person.role}, {person.org}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <h2 className="text-display-md font-semibold">Send an enquiry</h2>
                <p className="mt-4 max-w-measure text-body text-earth-soft">
                  Tell us who you are and what you are after. We will come back to you.
                </p>
                <div className="mt-10">
                  <EnquiryForm
                    kind="contact"
                    subjects={SUBJECTS}
                    messagePlaceholder="A sentence or two about what you are looking for is plenty."
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
