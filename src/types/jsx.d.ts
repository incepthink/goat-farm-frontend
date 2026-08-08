import 'react'

/**
 * React 18's DOM renderer does not map the camelCase `fetchPriority` prop onto the
 * `fetchpriority` attribute — it warns and drops it, so the hint never reaches the
 * browser. Passing the lowercase form works, but @types/react only declares the
 * camelCase one. This augmentation makes the working form type-check.
 *
 * Remove this file on the move to React 19, and switch the call sites back to
 * `fetchPriority`.
 */
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
