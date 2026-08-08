/**
 * Form submission adapter.
 *
 * The site is a static build with no backend. Every form on it POSTs a JSON body to a
 * single endpoint read from `VITE_FORM_ENDPOINT` — a Formspree / Web3Forms style URL.
 *
 * Until that variable is set the forms validate and behave normally but report that
 * they are not connected, rather than silently pretending to send. Set the variable and
 * every form on the site starts delivering, with no code change.
 *
 * See docs/CLIENT-QUESTIONS.md §1.
 */

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

export type FormKind = 'contact' | 'product-enquiry' | 'donation-pledge'

export type SubmitResult =
  | { status: 'ok' }
  | { status: 'unconfigured' }
  | { status: 'error'; message: string }

export function isFormConfigured(): boolean {
  return Boolean(ENDPOINT)
}

export async function submitForm(
  kind: FormKind,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!ENDPOINT) {
    // Not an error — nothing is broken, the destination simply has not been supplied.
    if (import.meta.env.DEV) {
      console.info(`[forms] VITE_FORM_ENDPOINT is unset. "${kind}" payload:`, payload)
    }
    return { status: 'unconfigured' }
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _form: kind, _submittedAt: new Date().toISOString(), ...payload }),
    })

    if (!response.ok) {
      return { status: 'error', message: `The form service returned ${response.status}.` }
    }
    return { status: 'ok' }
  } catch {
    return {
      status: 'error',
      message: 'We could not reach the form service. Please check your connection, or email us.',
    }
  }
}

/* ── Validation ─────────────────────────────────────────────────────────────── */

export type FieldErrors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Indian mobile numbers, tolerant of +91, spaces and hyphens.
const PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/

export function validate(
  values: Record<string, string>,
  required: string[],
  labels: Record<string, string>,
): FieldErrors {
  const errors: FieldErrors = {}

  for (const field of required) {
    if (!values[field]?.trim()) {
      errors[field] = `${labels[field] ?? 'This field'} is required.`
    }
  }

  if (values.email?.trim() && !EMAIL.test(values.email.trim())) {
    errors.email = 'That does not look like an email address.'
  }

  if (values.phone?.trim() && !PHONE.test(values.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a ten-digit Indian mobile number.'
  }

  return errors
}
