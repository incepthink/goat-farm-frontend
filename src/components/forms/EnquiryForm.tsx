import { useState } from 'react'
import { Field, Select, TextArea, TextInput, UnconfiguredNotice } from './Field'
import { Button } from '@/components/Button'
import { CONTACT } from '@/data/org'
import { isFormConfigured, submitForm, validate, type FieldErrors, type FormKind } from '@/lib/forms'

type Values = {
  name: string
  organisation: string
  email: string
  phone: string
  subject: string
  message: string
}

const EMPTY: Values = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  subject: 'Subject',
  message: 'Message',
}

/**
 * The one enquiry form, used by /contact and /products.
 *
 * `subjects` differs between the two — a CSR head and a wholesale milk buyer are not
 * choosing from the same list — but the fields, validation and submission path are
 * shared so there is a single place to wire the endpoint.
 */
export function EnquiryForm({
  kind,
  subjects,
  messageLabel = 'Message',
  messagePlaceholder,
}: {
  kind: FormKind
  subjects: string[]
  messageLabel?: string
  messagePlaceholder?: string
}) {
  const [values, setValues] = useState<Values>({ ...EMPTY, subject: subjects[0] })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'unconfigured' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const configured = isFormConfigured()

  function set(field: keyof Values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const found = validate(values, ['name', 'email', 'message'], LABELS)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users are not
      // left guessing which field failed.
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    setState('sending')
    const result = await submitForm(kind, values)

    if (result.status === 'ok') {
      setState('sent')
      setValues({ ...EMPTY, subject: subjects[0] })
    } else if (result.status === 'unconfigured') {
      setState('unconfigured')
    } else {
      setErrorMessage(result.message)
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div
        className="rounded-card border border-accent/40 bg-accent-wash p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-display-sm font-semibold text-earth">Thank you.</p>
        <p className="mt-3 max-w-measure text-body text-earth-soft">
          Your enquiry has been sent. Someone from the team will be in touch.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setState('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {!configured && (
        <UnconfiguredNotice emails={CONTACT.emails.map((e) => e.address)} />
      )}

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

        <Field id="organisation" label="Organisation">
          <TextInput
            id="organisation"
            value={values.organisation}
            onChange={set('organisation')}
            autoComplete="organization"
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
      </div>

      <Field id="subject" label="What is this about?">
        <Select id="subject" value={values.subject} onChange={set('subject')}>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="message" label={messageLabel} required error={errors.message}>
        <TextArea
          id="message"
          value={values.message}
          onChange={set('message')}
          placeholder={messagePlaceholder}
          error={errors.message}
        />
      </Field>

      {state === 'error' && (
        <p role="alert" className="text-body-sm text-terracotta">
          {errorMessage}
        </p>
      )}

      {state === 'unconfigured' && (
        <div role="alert" className="rounded-card border border-terracotta/40 bg-terracotta-wash/50 p-5">
          <p className="text-body-sm text-earth">
            We could not send this — no form endpoint is configured yet. Please email{' '}
            <a
              href={`mailto:${CONTACT.emails[0].address}`}
              className="font-semibold text-accent underline underline-offset-4"
            >
              {CONTACT.emails[0].address}
            </a>{' '}
            and we will reply.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}
