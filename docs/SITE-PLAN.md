# Annasaheb Shinde Foundation — Website Plan (v2)

**Revision:** single narrative site + one dedicated donation page. No dual donor/investor split.
**Stack:** Vite + React + TypeScript + Tailwind + Framer Motion / GSAP + Lenis
**Language:** English · **Deliverable:** static SPA on Vercel

---

## The governing idea

One story, told once, told extremely well.

A CSR head and an equity investor need the *same* evidence — the goats are tagged, the dairy is built, mortality is down 50%, the government is involved. The only thing that differs is what they do at the end. So we build **one argument** and put **two buttons** at the bottom of it.

The homepage is the product. It should work as the thing the client opens on a laptop, in front of a stranger, and scrolls through top to bottom — a pitch deck that happens to be a website. Everything else is depth for people who want it.

---

## Architecture

```
  ┌──────────────────────────────────────────┐
  │  HOMEPAGE — the full story, one scroll   │
  │  problem → breed → model → data →        │
  │  dairy → products → traction → future    │
  └───────────────────┬──────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
   ┌─────────┐              ┌───────────────┐
   │ /donate │              │ Partner with  │
   │ (own    │              │ us → /contact │
   │  page)  │              │   + PDF       │
   └─────────┘              └───────────────┘
```

### Routes — 8 total (was 11)

| Route | Purpose |
|---|---|
| `/` | **The whole story.** Long-scroll, heavily animated. 90% of visitors never leave this page. |
| `/project` | Depth: the model, the 13–17 villages, the map, the Zalawadi breed, the 4-phase plan |
| `/impact` | Numbers, the women, the Jan-2024→today timeline, SDG alignment |
| `/products` | Four verticals — milk, feed, fertilizer, pesticide. B2B enquiry form, no cart |
| `/about` | Annasaheb Shinde's legacy, the ASF/IGBDPL/AJAMESH structure, leadership, partners & institutions |
| `/gallery` | Field photography, village by village, events |
| `/contact` | Three locations + enquiry form (this is also where investor/CSR enquiries land) |
| `/donate` | **The one separate interface.** Focused, distraction-free. |

Merged away from v1: `/zalawadi` folds into `/project`. `/partners` folds into `/about`. `/invest` disappears entirely — its content is now just part of the main story.

---

## The homepage scroll — 15 beats

This is the spine of the whole build. Every source reference is in `ASF-content-source-map.md`.

| # | Beat | What it does | Animation |
|---|---|---|---|
| 1 | **Hero** | Full-bleed Malpur field. Name, one-line promise, scroll cue | Slow parallax; headline word-by-word mask reveal |
| 2 | **The situation** | Farmer distress. 400,000 suicides. Under two acres. | **Deliberately still.** Stark type, slow fade, nothing else. The data carries it. |
| 3 | **Why goats** | "Poor man's cow." 150M goats. India is the world's largest goat-milk producer. But rearers stay poor — and here's why (4 barriers) | Barriers reveal in sequence |
| 4 | **The Zalawadi goat** | The breed. 2–2.15 kg/day, 55% twins, 12-yr lifespan, 150 years in the region, never scientifically improved | Sticky goat image, stats swap on scroll |
| 5 | **The model** | The core diagram: health + feed + genetics + a guaranteed buyer. Why all four must happen at once | Animated value-chain, draws in on scroll |
| 6 | **Tagging & data** | Every goat has a digital ID. Milked and recorded twice a day. Government-supported. | Goat-ID cards deal out; a stylised excerpt of the real 38-goat data table |
| 7 | **The dairy** | It already exists. 6 × 5,000 L chillers, testing lab, weighing line, 125 KVA | Horizontal-scroll photo gallery of the built plant |
| 8 | **Four verticals** | Milk · Feed · Fertilizer from dung · Pesticide from urine | Four cards, staggered rise |
| 9 | **Traction** | 4,000 goats · 110 families · 17 villages · 25 jobs · 3,000 health cards · mortality −50% · yield +15–20% | Count-up on enter, scroll-driven bar draw |
| 10 | **The women** | 93% of flock owners. Portraits. Named beneficiaries. | Photo grid, editorial, minimal motion |
| 11 | **The map** | Dhule + Nandurbar, villages pinned, hover for goats & litres | SVG pins drop in sequence |
| 12 | **The journey** | Jan 2024 → today. Health camp, health cards, public announcement, distillation unit, daily delivery | Horizontal scroll-jack with photos per milestone |
| 13 | **Who's behind it** | MAFSU, ICAR (×3), BAIF, AHD, District Collectors + the named scientists with photos | Logo marquee; portrait row |
| 14 | **Where it goes** | 30 villages · 10,000 more goats · 6,000 → 25,000 L/day · genetics from Yr 3 | Growth curve draws on scroll |
| 15 | **Two buttons** | "Support this work" → `/donate` · "Partner with us" → `/contact` + download the proposal PDF | Magnetic buttons, curtain transition |

**Beat 2 is the one to get right.** Every instinct will say animate it. Don't. A page that goes quiet and still on the suicide statistics, right after a flashy hero, is more affecting than anything we could animate — and it earns the trust the rest of the page spends.

---

## `/donate` — the one separate page

Deliberately calm. No parallax, no scroll-jacking. Someone arriving here has already decided; the job is to not lose them.

**Structure:**

1. One line of context + one image. No re-pitching.
2. **Impact tiers** — every tier maps to a real intervention from the documents:
   - Tag and health-card one goat
   - A family's flock: nutrition + vet care for a year
   - One hygienic goat shed
   - One village health camp (MAFSU vets — a costed precedent already exists)
   - Train one Livestock Supervisor
   - **The laboratory** — the headline ask, flagged in the docs as needing dedicated funding
   - **The AI / semen programme** — explicitly called "an independent project [that] will need specific funding"
3. **Amount selector** — tiers preset, custom field, one-time / monthly toggle
4. **Where your money goes** — simple allocation breakdown
5. **Trust block** — Section 8 status, 80G, District Collector endorsements, Nandurbar Aspirational District, SDG 1/2/5/8
6. **Form** — name, email, phone, PAN (for 80G), address. Minimal fields.
7. **For CSR partners** — a quiet secondary line: "Making a corporate contribution? Talk to us directly" → contact

> **Blocking decision: payment gateway.** Razorpay is the standard for Indian non-profits (UPI, cards, international, 80G-friendly). Alternatives: Cashfree, Instamojo. Fallback if no account exists yet: publish UPI/NEFT details plus a pledge form that emails the team. **I can build the entire page against a mock and swap the gateway in later** — this doesn't block anything.

---

## Design direction

**"Scientific Pastoral."** Earth-toned and grounded, but with the precision of an agri-tech company — because the digital tagging, the milking lab and the embryo-transfer roadmap mean that's genuinely what it is.

- **Palette:** deep earth brown, terracotta, warm off-white; one saturated accent (green or gold) reserved strictly for CTAs and data highlights
- **Type:** high-contrast editorial serif for headlines, geometric sans for body and numerals
- **Photography-forward.** 49 real field images already extracted. Real women, real goats, real plant — beats any illustration
- **Layout:** asymmetric editorial grid, generous whitespace, full-bleed imagery

**Motion system:** Lenis smooth scroll site-wide (the single biggest "expensive site" signal), scroll-triggered reveals, count-ups, custom magnetic cursor, curtain page transitions. All of it respects `prefers-reduced-motion`, and mobile ships a lighter variant — a large share of this audience (district officials, government, rural stakeholders) is on mid-range Android.

---

## Build sequence

| Phase | Work | Est. |
|---|---|---|
| 0 | Asset prep — crop, compress, WebP-convert the 49 images | 0.5 d |
| 1 | Design system — tokens, type scale, component + motion primitives | 1 d |
| 2 | **Homepage beats 1–8** | 2 d |
| 3 | **Homepage beats 9–15** | 1.5 d |
| 4 | `/donate` — full page, mock gateway | 1 d |
| 5 | `/project` + `/impact` — map, data viz, timeline | 2 d |
| 6 | `/products`, `/about`, `/gallery`, `/contact` | 1.5 d |
| 7 | Forms, gateway swap-in, PDF downloads | 0.5 d |
| 8 | Responsive, performance, a11y, SEO, OG images | 1 d |
| 9 | Deploy + handover | 0.5 d |

**~11 working days.** Roughly the same as v1 — the pages we cut were replaced by making the homepage genuinely excellent, which is where the value is.

---

## Still blocking

From the source map, unchanged and still needing client answers:

1. **Is 9,164 litres per day, per month, or per year?** Changes the entire growth story.
2. **Malpur — Dhule or Nandurbar?** 4 sources say Dhule, 1 says Nandurbar.
3. **Goat milk powder** — appears in none of the three documents. Need name, spec, packaging, FSSAI, photos.
4. **80G / CSR-1 registration numbers** — required before any tax-benefit copy.
5. **Cost per intervention** — needed to price the donation tiers.
6. **Payment gateway** — which one, whose account.
7. **Vector logo** — only a raster PNG exists.
8. Village count (13 / 15 / 17) and goat count (4,000 / 4,979) — pick one, add an "as of" date.

None of these block starting. All of them block launching.

---

## Recommended next step

Build **homepage beats 1–8 as a working, animated prototype** with real content and real photographs. That's the artefact that tells you whether the direction lands, and it's what the client signs off on before we commit to the rest. Everything in "Still blocking" can be chased in parallel.
