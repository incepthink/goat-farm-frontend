import { type ReactNode } from 'react'

const BASE =
  'w-full rounded-card border bg-bone px-4 py-3 text-body text-earth placeholder:text-earth-faint/60 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-semibold text-earth">
        {label}
        {required && (
          <span className="ml-1 text-terracotta" aria-hidden>
            *
          </span>
        )}
        {!required && <span className="ml-2 font-normal text-earth-faint">optional</span>}
      </label>
      {hint && <p className="mt-1 text-caption text-earth-faint">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-body-sm text-terracotta">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextInput({
  id,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  return (
    <input
      id={id}
      name={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${BASE} ${error ? 'border-terracotta' : 'border-bone-edge'}`}
      {...rest}
    />
  )
}

export function TextArea({
  id,
  error,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: string }) {
  return (
    <textarea
      id={id}
      name={id}
      rows={5}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${BASE} resize-y ${error ? 'border-terracotta' : 'border-bone-edge'}`}
      {...rest}
    />
  )
}

export function Select({
  id,
  error,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string; error?: string }) {
  return (
    <select
      id={id}
      name={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${BASE} ${error ? 'border-terracotta' : 'border-bone-edge'}`}
      {...rest}
    >
      {children}
    </select>
  )
}

/**
 * The banner shown when VITE_FORM_ENDPOINT is unset. Deliberately explicit — a form that
 * appears to send and does not is worse than one that says it cannot.
 */
export function UnconfiguredNotice({ emails }: { emails: string[] }) {
  return (
    <div className="rounded-card border border-terracotta/40 bg-terracotta-wash/50 p-5">
      <p className="text-body-sm font-semibold text-earth">This form is not connected yet</p>
      <p className="mt-2 text-body-sm text-earth-soft">
        No form endpoint has been configured, so we cannot deliver your message from here. Please
        email us directly and we will reply:
      </p>
      <ul className="mt-3 space-y-1">
        {emails.map((email) => (
          <li key={email}>
            <a
              href={`mailto:${email}`}
              className="text-body-sm font-semibold text-accent underline underline-offset-4"
            >
              {email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
