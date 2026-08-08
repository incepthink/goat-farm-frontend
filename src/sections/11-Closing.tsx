import { CLOSING } from '@/data/traction'
import { Section } from '@/components/Section'
import { MaskReveal, Reveal } from '@/components/Reveal'
import { ArrowRight, ButtonLink } from '@/components/Button'

/**
 * BEAT 15 — Two buttons.
 *
 * One argument, two exits. A CSR head and a commercial partner have read the same
 * evidence; only the last step differs.
 *
 * No proposal PDF is offered. The only candidate document is the internal CSR proposal,
 * and publishing it would put figures on the open web that this site deliberately keeps
 * off it — including the 9,164 L table with no time unit. See docs/CLIENT-QUESTIONS.md §2.
 */
export function Closing() {
  return (
    <Section tone="ink" size="lg" labelledBy="closing-heading">
      <div className="shell">
        <MaskReveal
          as="h2"
          text={CLOSING.heading}
          className="max-w-[16ch] text-display-lg font-semibold text-bone"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-measure text-lead text-bone/70">{CLOSING.standfirst}</p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden border border-bone/15 bg-bone/15 lg:grid-cols-2">
          <Reveal className="bg-earth-deep p-10 md:p-14">
            <h3 className="font-display text-display-md font-semibold text-bone">
              {CLOSING.donate.title}
            </h3>
            <p className="mt-6 max-w-measure-sm text-body text-bone/70">{CLOSING.donate.body}</p>
            <ButtonLink to={CLOSING.donate.to} variant="primary" size="lg" magnetic className="mt-10">
              {CLOSING.donate.cta}
              <ArrowRight />
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="bg-earth-deep p-10 md:p-14">
            <h3 className="font-display text-display-md font-semibold text-bone">
              {CLOSING.partner.title}
            </h3>
            <p className="mt-6 max-w-measure-sm text-body text-bone/70">{CLOSING.partner.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink to={CLOSING.partner.to} variant="inverse" size="lg" magnetic>
                {CLOSING.partner.cta}
                <ArrowRight />
              </ButtonLink>

              {CLOSING.proposalPdf && (
                <ButtonLink
                  href={CLOSING.proposalPdf.href}
                  variant="ghost"
                  size="lg"
                  download
                  className="text-bone hover:border-bone/30"
                >
                  {CLOSING.proposalPdf.label}
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
