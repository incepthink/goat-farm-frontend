# Annasaheb Shinde Foundation — website

Complete rebuild of `annasahebshindefoundation.org`. Vite + React + TypeScript + Tailwind,
static build, deployable to Vercel.

The brief, the content rules and the design direction live in [`CLAUDE.md`](./CLAUDE.md).
This file covers how to run it and where things are.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck
```

Node 22, npm 10.

### Environment

Both variables are optional. Without them the site runs completely — the two features they
control degrade to an explicit, visible "not connected" state rather than failing silently.

```bash
cp .env.example .env.local
```

| Variable | Effect |
|---|---|
| `VITE_FORM_ENDPOINT` | Where every form POSTs. Unset → forms validate normally but tell the visitor to email instead. |
| `VITE_PAYMENT_PROVIDER` | Unset → `/donate` runs against the mock gateway and says so, loudly. |
| `VITE_RAZORPAY_KEY_ID` | Only read once a provider is wired up in `src/lib/payments/`. |

---

## Where things are

```
src/
  data/          ALL copy and figures, as typed constants. Nothing is hardcoded in JSX.
  sections/      The fifteen homepage beats, one file each, numbered in scroll order.
  pages/         One per route.
  components/    Primitives — Reveal, Section, Figure, CountUp, Button, forms.
  lib/           images (manifest lookup), forms (submit adapter), payments (gateway adapter).
  hooks/         Reduced motion, mobile breakpoint, Lenis smooth scroll.
docs/            Source documents, the content source map, and the open client questions.
tools/           The OG image template. Not published.
public/images/   The curated photo library + manifest.json.
```

### The two rules that matter most

**1. Content lives in `src/data/`, and every figure cites its source.**
Nothing factual is written into a component. Each constant carries a `source` field
(`'A p7 L6'` = proposal, page 7, line 6) which renders on the page underneath the number.
That citation is the reason the site is credible — keep it when you edit.

**2. If it isn't in the documents, it doesn't go on the site.**
Several things are deliberately absent, and each is commented where you would otherwise
add it:

| Absent | Why |
|---|---|
| Any rupee amount, anywhere | No cost figure exists in any source. Donation tiers carry `amount: null` and render without a price. |
| Any 80G / FCRA / CSR-1 claim | Registration numbers not supplied. |
| The 9,164 litre figure | Its source column has no time unit — daily, monthly and annual are all consistent, and differ by 30×. |
| Goat milk powder | Appears in none of the three source documents. |
| A donation allocation percentage split | No breakdown exists; a donate page is the worst place to guess. |
| The proposal PDF | Would put internal figures on the open web. |
| Trustee / board names | Not in any document. |

Everything above is tracked in **[`docs/CLIENT-QUESTIONS.md`](./docs/CLIENT-QUESTIONS.md)** —
the handover list. None of it blocks the build; all of it blocks launch.

---

## Design system

Tokens are in `tailwind.config.ts`. **No arbitrary hex values in JSX.**

- **Palette** — deep earth brown, terracotta, warm off-white, and one olive accent
  reserved strictly for CTAs and data highlights.
- **The accent steps are validated, not chosen by eye.** `#4B7130` (light ground) and
  `#77A055` (dark) pass the lightness band, chroma floor and 3:1 contrast checks. The
  first olive tried failed the chroma floor and read gray as a chart mark. Re-run the
  validator before changing either.
- **Type** — Fraunces for display, Manrope for body and all numerals, both self-hosted
  via `@fontsource-variable`. Every statistic uses tabular figures so count-ups do not
  jitter.
- **Image slots** — every one uses a named aspect ratio, so better photography is a file
  swap rather than a redesign. `Figure` resolves dimensions from `manifest.json` and sets
  explicit `width`/`height`, which is what holds CLS at zero.

### Motion

Lenis smooth scroll site-wide, driven from GSAP's ticker so ScrollTrigger cannot drift
out of sync. Scroll reveals, count-ups, magnetic CTAs, a curtain page transition.

Three deliberate deviations from the original brief, each commented at the top of its file:

- **Beat 2 does not animate at all.** One slow opacity fade, nothing else. Going still on
  the farmer-suicide statistics right after a cinematic hero is the point.
- **The dairy and timeline rails are native horizontal scroll, not scroll-jacking.** They
  work with wheel, trackpad, swipe and keyboard, and do not fight Lenis on mid-range
  Android — which is a large part of this audience.
- **Beat 14 is a range bar chart, not a growth curve.** The source gives year one and two
  as target *bands*; a curve would draw a smooth line through values nobody ever stated.

`prefers-reduced-motion` is honoured everywhere, and renders the **final** state
immediately rather than a faster animation. Mobile ships lighter variants — the village
schematic becomes a ranked list below `md`, where its labels would fall under 10px.

---

## Deployment

`vercel.json` is configured: SPA rewrites (so `/project` resolves on a hard refresh),
immutable caching on hashed assets and images, and basic security headers.

Not deployed. Given the open items above, the site should not be publicly reachable until
the client has signed off on the figures.
