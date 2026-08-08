import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DONATE_COPY, DONATION_TIERS, SUGGESTED_AMOUNTS } from '@/data/donationTiers'
import { CONTACT, SDGS } from '@/data/org'
import { Figure } from '@/components/Figure'
import { AsfLogo } from '@/components/brand/AsfLogo'
import { Button } from '@/components/Button'
import { Field, TextArea, TextInput } from '@/components/forms/Field'
import { formatRupees, getGateway, type DonationIntent } from '@/lib/payments'
import { validate, type FieldErrors } from '@/lib/forms'

/**
 * /donate — the one page on the site with no scroll animation at all.
 *
 * Someone who reaches this page has already decided. The job is not to persuade them
 * again; it is to not lose them. So: no parallax, no reveals, no scroll-jacking, no
 * magnetic buttons. Everything is visible on arrival.
 *
 * ⚠️  Two absences here are deliberate and must not be "fixed" without client input:
 *   1. No tier carries a price. No rupee figure for any intervention exists in any source
 *      document (see src/data/donationTiers.ts).
 *   2. No 80G or tax-benefit claim appears anywhere. The registration numbers have not
 *      been supplied, and CLAUDE.md §5 bars the claim without them.
 */

const LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  amount: 'Amount',
}

export default function Donate() {
  const gateway = useMemo(() => getGateway(), [])

  const [tierId, setTierId] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState<DonationIntent['frequency']>('one-time')
  const [values, setValues] = useState({ name: '', email: '', phone: '', address: '', pan: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'failed'>('idle')
  const [reference, setReference] = useState('')
  const [failure, setFailure] = useState('')

  function set(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      setErrors((prev) => {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const found = validate({ ...values, amount }, ['name', 'email', 'amount'], LABELS)
    const parsed = Number(amount)
    if (amount && (!Number.isFinite(parsed) || parsed <= 0)) {
      found.amount = 'Enter an amount in rupees.'
    }

    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    setState('working')
    const result = await gateway.pay({
      amountPaise: Math.round(parsed * 100),
      frequency,
      tierId,
      donor: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        pan: values.pan || undefined,
        address: values.address || undefined,
      },
    })

    if (result.status === 'success') {
      setReference(result.reference)
      setState('done')
    } else if (result.status === 'cancelled') {
      setState('idle')
    } else {
      setFailure(result.status === 'failed' ? result.message : 'No payment gateway is connected.')
      setState('failed')
    }
  }

  if (state === 'done') {
    return (
      <div className="shell pb-beat-lg pt-[calc(4.5rem+clamp(3rem,8vh,6rem))]">
        <div className="mx-auto max-w-2xl rounded-card border border-accent/40 bg-accent-wash p-10">
          <AsfLogo className="h-16 w-auto" />
          <h1 className="mt-6 font-display text-display-md font-semibold">Thank you.</h1>
          <p className="mt-5 text-lead text-earth-soft">
            Your intent has been recorded with reference{' '}
            <span className="tnum font-semibold text-earth">{reference}</span>.
          </p>
          {!gateway.isLive && gateway.notice && (
            <p className="mt-5 rounded-card border border-terracotta/40 bg-bone p-5 text-body-sm text-earth-soft">
              <span className="font-semibold text-earth">Nothing has been charged. </span>
              {gateway.notice}
            </p>
          )}
          <p className="mt-6 text-body text-earth-soft">
            Someone will contact you at {values.email || 'the address you gave'}. If you would
            rather speak to us first, call{' '}
            <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`} className="tnum font-semibold">
              {CONTACT.phones[0]}
            </a>
            .
          </p>
          <Link
            to="/"
            className="mt-8 inline-block text-body font-semibold text-accent underline underline-offset-4"
          >
            Back to the project
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bone pb-beat-lg pt-[calc(4.5rem+clamp(3rem,8vh,6rem))]">
      <div className="shell">
        {/* 1 — One line of context and one image. No re-pitching. */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Whose page this is, stated before the amount field. */}
            <AsfLogo className="h-16 w-auto" />
            <p className="eyebrow mt-8">{DONATE_COPY.eyebrow}</p>
            <h1 className="mt-6 max-w-[16ch] text-display-lg font-semibold">
              {DONATE_COPY.heading}
            </h1>
            <p className="mt-8 max-w-measure text-lead text-earth-soft">
              {DONATE_COPY.standfirst}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Figure
              file={DONATE_COPY.image}
              alt={DONATE_COPY.imageAlt}
              ratio="portrait"
              priority
            />
          </div>
        </div>

        {/* The mock notice sits above everything. Nobody should reach the amount field
            without knowing the gateway is not live. */}
        {!gateway.isLive && gateway.notice && (
          <div className="mt-16 rounded-card border border-terracotta/50 bg-terracotta-wash/60 p-6">
            <p className="text-body-sm font-semibold text-earth">
              Online payment is not live on this site yet
            </p>
            <p className="mt-2 max-w-measure text-body-sm text-earth-soft">{gateway.notice}</p>
          </div>
        )}

        {/* 2 — Impact tiers, each mapped to a real intervention. */}
        <section className="mt-beat" aria-labelledby="tiers-heading">
          <h2 id="tiers-heading" className="text-display-md font-semibold">
            What your money does
          </h2>
          <p className="mt-4 max-w-measure text-body text-earth-soft">
            Every option below is an intervention the project already runs. Choose one to attach it
            to your gift, or give without choosing.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden border border-bone-edge bg-bone-edge md:grid-cols-2">
            {DONATION_TIERS.map((tier) => {
              const selected = tierId === tier.id
              return (
                <li key={tier.id} className="bg-bone">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTierId(selected ? null : tier.id)}
                    className={`flex h-full w-full flex-col items-start p-8 text-left transition-colors duration-200 ${
                      selected ? 'bg-accent-wash' : 'hover:bg-bone-deep'
                    }`}
                  >
                    {tier.headline && (
                      <span className="mb-3 inline-block border border-accent/40 px-2 py-1 text-source uppercase tracking-[0.1em] text-accent-deep">
                        Named in the documents as needing dedicated funding
                      </span>
                    )}
                    <span className="font-display text-display-sm font-semibold">{tier.title}</span>
                    <span className="mt-3 text-body-sm text-earth-soft">{tier.body}</span>
                    <span className="mt-5 flex items-center gap-3">
                      {tier.amount === null ? (
                        <span className="text-body-sm text-earth-faint">
                          Cost to be confirmed — choose your own amount below
                        </span>
                      ) : (
                        <span className="tnum text-body font-semibold text-accent">
                          {formatRupees(tier.amount * 100)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="mt-beat grid gap-16 lg:grid-cols-12">
          {/* 3 & 6 — Amount, then the minimum set of donor fields. */}
          <section className="lg:col-span-7" aria-labelledby="amount-heading">
            <h2 id="amount-heading" className="text-display-md font-semibold">
              Your gift
            </h2>

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-8">
              <fieldset>
                <legend className="text-body-sm font-semibold text-earth">How often?</legend>
                <div className="mt-3 flex gap-3">
                  {(['one-time', 'monthly'] as const).map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-card border px-5 py-3 text-body-sm font-semibold transition-colors ${
                        frequency === option
                          ? 'border-accent bg-accent text-bone'
                          : 'border-bone-edge text-earth-soft hover:border-earth/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={option}
                        checked={frequency === option}
                        onChange={() => setFrequency(option)}
                        className="sr-only"
                      />
                      {option === 'one-time' ? 'One-time' : 'Monthly'}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Preset amounts are null until the client confirms costs, so the custom
                  field is the only input. It is not a fallback — it is the whole control. */}
              {SUGGESTED_AMOUNTS && (
                <div className="flex flex-wrap gap-3">
                  {SUGGESTED_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className="rounded-card border border-bone-edge px-5 py-3 text-body-sm font-semibold hover:border-earth/30"
                    >
                      {formatRupees(preset * 100)}
                    </button>
                  ))}
                </div>
              )}

              <Field
                id="amount"
                label="Amount in rupees"
                required
                error={errors.amount}
                hint={
                  tierId
                    ? `Attached to: ${DONATION_TIERS.find((t) => t.id === tierId)?.title}`
                    : undefined
                }
              >
                <TextInput
                  id="amount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={errors.amount}
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Name" required error={errors.name}>
                  <TextInput
                    id="name"
                    value={values.name}
                    onChange={set('name')}
                    autoComplete="name"
                    error={errors.name}
                  />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <TextInput
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={set('email')}
                    autoComplete="email"
                    error={errors.email}
                  />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone}>
                  <TextInput
                    id="phone"
                    type="tel"
                    value={values.phone}
                    onChange={set('phone')}
                    autoComplete="tel"
                    error={errors.phone}
                  />
                </Field>
                <Field
                  id="pan"
                  label="PAN"
                  hint="Only needed if you want a receipt for tax purposes."
                >
                  <TextInput
                    id="pan"
                    value={values.pan}
                    onChange={set('pan')}
                    autoCapitalize="characters"
                  />
                </Field>
              </div>

              <Field id="address" label="Address">
                <TextArea id="address" rows={3} value={values.address} onChange={set('address')} />
              </Field>

              {state === 'failed' && (
                <p role="alert" className="text-body-sm text-terracotta">
                  {failure}
                </p>
              )}

              <Button type="submit" size="lg" disabled={state === 'working'}>
                {state === 'working' ? 'Working…' : 'Continue'}
              </Button>

              <p className="text-caption text-earth-faint">
                We ask for the minimum. Your details are used to contact you about this gift and
                nothing else.
              </p>
            </form>
          </section>

          {/* 4 & 5 — Where it goes, and the trust block. */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <section aria-labelledby="allocation-heading">
              <h2 id="allocation-heading" className="text-display-sm font-semibold">
                {DONATE_COPY.allocationHeading}
              </h2>
              <ul className="mt-5 space-y-3">
                {DONATE_COPY.allocation.map((item) => (
                  <li key={item.label} className="border-t border-bone-edge pt-3">
                    <p className="text-body-sm text-earth-soft">{item.label}</p>
                  </li>
                ))}
              </ul>
              {/* No percentage split — none exists in the documents, and a donation page
                  is the worst place on a website to invent one. */}
              <p className="mt-5 text-caption text-earth-faint">
                We have not published a percentage breakdown. The project documents do not set
                one out, and we would rather say what donations fund than guess at proportions.
              </p>
            </section>

            <section className="mt-12" aria-labelledby="trust-heading">
              <h2 id="trust-heading" className="text-display-sm font-semibold">
                {DONATE_COPY.trustHeading}
              </h2>
              <ul className="mt-5 space-y-5">
                {DONATE_COPY.trust.map((item) => (
                  <li key={item.claim} className="border-t border-bone-edge pt-4">
                    <p className="text-body-sm font-semibold">{item.claim}</p>
                    <p className="mt-1 text-body-sm text-earth-soft">{item.detail}</p>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {SDGS.goals.map((goal) => (
                  <li
                    key={goal.number}
                    className="border border-bone-edge px-3 py-1.5 text-caption text-earth-soft"
                  >
                    <span className="tnum font-semibold">SDG {goal.number}</span> · {goal.title}
                  </li>
                ))}
              </ul>

              {/* Rendered only when the client supplies registration numbers. */}
              {DONATE_COPY.taxNote && (
                <p className="mt-5 text-body-sm text-earth-soft">{DONATE_COPY.taxNote}</p>
              )}
            </section>

            <section className="mt-12 border-t border-bone-edge pt-6">
              <p className="text-body-sm text-earth-soft">{DONATE_COPY.csrLine}</p>
              <Link
                to="/contact"
                className="mt-2 inline-block text-body font-semibold text-accent underline underline-offset-4"
              >
                {DONATE_COPY.csrCta}
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
