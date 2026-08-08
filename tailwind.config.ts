import type { Config } from 'tailwindcss'

/**
 * Design tokens — "Scientific Pastoral".
 *
 * Rules enforced by this file:
 *  - No arbitrary hex values in JSX. Every colour used anywhere on the site is named here.
 *  - `accent` (deep olive) is reserved STRICTLY for CTAs and data highlights. Never decorative.
 *  - Every image slot uses one of the named aspect ratios, so better photography is a file
 *    swap rather than a redesign.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ground
        bone: {
          DEFAULT: '#FAF7F1', // warm off-white — page background
          deep: '#F2ECE1', // recessed panels, alternating bands
          edge: '#E5DCCC', // hairlines, dividers, card borders
        },
        // Ink
        earth: {
          DEFAULT: '#2B211A', // deep earth brown — body text, dark sections
          soft: '#4A3D33', // secondary text on light
          faint: '#7A6A5C', // captions, metadata, source citations
          deep: '#1C1511', // the darkest ground, used for inverted sections
        },
        // Secondary
        terracotta: {
          DEFAULT: '#B5623C',
          soft: '#C98A6B',
          wash: '#EFDDD3', // tint backgrounds only
        },
        /**
         * The single saturated accent — CTAs and data highlights ONLY.
         *
         * These exact steps are validated, not chosen by eye. The first olive tried
         * (#4A6B3A) failed the chroma floor at 0.083 — as a chart mark it reads gray.
         * #4B7130 is the nearest step that passes the lightness band, chroma floor and
         * 3:1 contrast on the bone surface; #77A055 is the equivalent on the dark
         * ground. Re-run scripts/validate_palette.js before changing either.
         */
        accent: {
          DEFAULT: '#4B7130', // deep olive / field green — data marks and CTAs on light
          deep: '#3B5A26', // hover / pressed
          soft: '#77A055', // data marks and CTAs on the dark ground
          wash: '#E5EDDD', // data-highlight tint backgrounds only
        },
        /**
         * The client's own mark colour, sampled from the supplied logo file
         * (public/images/02-logos/logo-png.png — a flat single-colour silhouette).
         *
         * Not part of the palette and not for text or UI: it exists solely so the logo can be
         * painted its true colour without an arbitrary hex in JSX. It is far too dark and too
         * low in chroma to serve as the accent — that is `accent`, and the two are not
         * interchangeable.
         */
        brand: '#004402',
      },
      fontFamily: {
        // High-contrast editorial serif — headlines
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        // Geometric sans — body and all numerals
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale. Display sizes are fluid; body sizes are fixed.
        'display-xl': ['clamp(3rem, 9vw, 8.5rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6.2vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 4.4vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.625rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        // Statistics — always tabular, always large
        stat: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'stat-sm': ['clamp(2rem, 3.4vw, 3rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        // Body
        lead: ['clamp(1.125rem, 1.5vw, 1.375rem)', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        // The small uppercase label that runs above every section heading
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
        caption: ['0.8125rem', { lineHeight: '1.45' }],
        source: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      spacing: {
        // Vertical rhythm between homepage beats
        beat: 'clamp(5rem, 11vh, 9rem)',
        'beat-lg': 'clamp(7rem, 16vh, 13rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      maxWidth: {
        measure: '62ch', // prose line length
        'measure-sm': '48ch',
        shell: '90rem', // outer page container
      },
      aspectRatio: {
        // Every image slot must use one of these. See CLAUDE.md §6, image rule 2.
        portrait: '3 / 4',
        'portrait-tall': '2 / 3',
        landscape: '3 / 2',
        wide: '16 / 9',
        panorama: '21 / 9',
        square: '1 / 1',
      },
      borderRadius: {
        card: '2px', // flat. no soft-UI rounding.
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee-x 45s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
