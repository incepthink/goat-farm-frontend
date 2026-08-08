# Annasaheb Shinde Foundation — Website Rebuild

Complete rebuild of `annasahebshindefoundation.org`. The existing site is a generic template that communicates nothing about the project. We are replacing it entirely.

---

## 1. What this organisation actually is

**Not a goat farm.** It is a vertically integrated rural livelihood venture in north Maharashtra, run by three linked entities.

| Entity | Type | Role |
|---|---|---|
| **ASF** — Annasaheb Shinde Foundation for Agro & Social Development | Section 8 non-profit | Ground implementation: farmer mobilisation, training, vet care, tagging, women's empowerment |
| **IGBDPL** — Indigenous Goat Breed Development Pvt. Ltd. | Private company (CIN u01100pn2022ptc209861, GST 27AAGCI5953D1ZI) | Commercial arm: milk collection, cold chain, processing, feed, market linkage |
| **AJAMESH** | ASF-affiliated enterprise | By-products: manure, urine-based pesticides, organic inputs |

### The thesis — understand this before writing any copy

Poor shepherd families in north Maharashtra already own goats. But a goat today is **a savings account they're forced to liquidate**: low milk yield, high kid mortality, no reliable milk buyer. So the only way to extract money from a goat is to sell the animal for meat. One payment, asset gone.

**The insight: make the goat healthier AND guarantee to buy its milk daily, and the goat flips from a one-time sale into a recurring income stream.** The family stops migrating; children can attend school. This is why the documents keep saying "nomadic to stabilized."

This only works if both halves happen simultaneously. A healthy goat with no buyer is worthless; a buyer with sick, low-yield goats has no supply. **That is precisely why there are two entities** — ASF does the non-revenue farmer-facing half (donor-funded), IGBDPL does the commercial half (investor-funded).

### The two defensible assets

1. **The dairy already exists.** 6 × 5,000 L bulk milk chillers (30,000 L chilling capacity), computerised weighing, conveyor line, full testing lab, boiler, 125 KVA generator, AC. Built and operating. Most projects pitching for money are a PowerPoint; this one has a plant.
2. **Every goat is tagged and recorded twice daily** — with Maharashtra Animal Husbandry Department support. Three years of per-animal milking data identifies genetically superior animals, which AI and embryo transfer then multiply. The dataset is the real long-term moat, though the documents never frame it that way.

---

## 2. Site architecture

**One story, told once, told extremely well.** A CSR head and an equity investor need the *same* evidence — goats tagged, dairy built, mortality down 50%, government involved. Only the final button differs. So: one argument, two CTAs. Donation gets its own page; nothing else is split.

The homepage **is** the product — the thing the client opens on a laptop in front of a stranger and scrolls top to bottom. A pitch deck that happens to be a website. Everything else is depth for people who want it.

### Routes

| Route | Purpose |
|---|---|
| `/` | The full story, long-scroll, heavily animated. 90% of visitors never leave. |
| `/project` | Depth: the model, villages + map, the Zalawadi breed, 4-phase plan |
| `/impact` | Numbers, the women, Jan-2024→today timeline, SDG alignment |
| `/products` | Four verticals. **B2B enquiry form only — no cart, no prices.** |
| `/about` | Annasaheb Shinde's legacy, three-entity structure, leadership, partners & institutions |
| `/gallery` | Field photography by village and event |
| `/contact` | Three locations + enquiry form (investor/CSR enquiries land here) |
| `/donate` | The one separate interface. Calm, focused, no scroll-jacking. |

---

## 3. Homepage — 15 beats

Build in this order. Source references for every fact are in `docs/CONTENT-SOURCE-MAP.md`.

| # | Beat | Content | Motion |
|---|---|---|---|
| 1 | **Hero** | Name, one-line promise, scroll cue | Slow parallax, headline word-by-word mask reveal |
| 2 | **The situation** | Farmer distress: 400,000 suicides 1995–2018 (48/day); 4,248 in Maharashtra 2018–2022 (15% of national); marginal = under two acres | **DELIBERATELY STILL.** See rule below. |
| 3 | **Why goats** | "Poor man's cow." 150M goats, India is world's largest goat-milk producer. Yet rearers stay poor — 4 barriers: kid mortality, low yield, no market linkage, nomadic life | Barriers reveal in sequence |
| 4 | **The Zalawadi goat** | 2–2.15 kg/day over 200-day lactation · males 40 kg / females 34 kg · 55% twins, 2% triplets · 11-month kidding interval · 12-year lifespan · 150 years in the region, never scientifically improved | Sticky image, stats swap on scroll |
| 5 | **The model** | The core diagram: health + feed + genetics + a guaranteed buyer, and why all four must happen at once | Value chain draws in on scroll |
| 6 | **Tagging & data** | Every goat has a unique digital ID. Milked and recorded twice daily. Government-supported tagging. Show a stylised excerpt of the real 38-goat data table | Goat-ID cards deal out |
| 7 | **The dairy** | It already exists — 6 × 5,000 L chillers, testing lab, weighing line, 125 KVA generator | Horizontal-scroll photo gallery |
| 8 | **Four verticals** | Goat milk · Goat feed · Fertilizer from dung · Pesticide from urine | Four cards, staggered rise |
| 9 | **Traction** | 4,000 goats tagged · 110 families · 17 villages · 2 districts · 500 people · 25 direct jobs · 3,000 health cards · mortality −50% · yield +15–20% · deliveries 1→3 per 2 years · kids 2→2–3 | Count-up on enter, scroll-driven bar draw |
| 10 | **The women** | 93% of flock owners are women. Portraits, large. | Editorial photo grid, minimal motion |
| 11 | **The map** | Dhule + Nandurbar, villages pinned, hover for detail | SVG pins drop in sequence |
| 12 | **The journey** | Jan 2024 → today (see timeline below) | Horizontal scroll-jack, photo per milestone |
| 13 | **Who's behind it** | MAFSU, ICAR-CIRG/CSWRI/CIRC, BAIF, AHD Maharashtra, District Collectors, Bharatiya Krushak Samaj + named scientists | Logo marquee, portrait row |
| 14 | **Where it goes** | 30 villages · 6,000 more goats → 600+ families · 6,000 → 25,000 L/day · genetics from Yr 3 · ~200 more livelihoods | Growth curve draws on scroll |
| 15 | **Two buttons** | "Support this work" → `/donate` · "Partner with us" → `/contact` + proposal PDF download | Magnetic buttons, curtain transition |

> ### ⚠️ Rule for beat 2 — do not break this
> Every instinct will say animate the farmer-suicide statistics. **Don't.** A page that goes completely still and quiet right after a cinematic hero is more affecting than anything we could animate — and it earns the trust the rest of the page spends. Stark type, one slow fade, nothing else. No parallax, no counters, no scroll effects. This is a deliberate design decision, not an oversight.

---

## 4. Verified content — safe to publish

Every figure below is traced to a document page and line in `docs/CONTENT-SOURCE-MAP.md`. **Do not invent numbers. Do not round up. If it isn't in this file or the source map, it doesn't go on the site.**

### Traction (as of 31 May 2025)
- 4,000 goats tagged, ~110 families
- 17 villages across 2 districts, 500 people impacted
- 25 direct jobs created
- 3,000+ health cards prepared
- 10 Livestock Supervisors trained; 6 managing 110 flocks
- 90 women flock owners participated in health camps

### Productivity gains
- Deliveries: 1/year → up to 3 within 2 years
- Mortality: reduced ~50%
- Kids per delivery: 2 → 2–3
- Milk yield: +15–20%

### The Zalawadi breed
- Indigenous to Gujarat, reared in North Maharashtra 150+ years
- 2–2.15 kg/day over a 200-day lactation cycle
- Males 40 kg, females 34 kg
- 55% twins, 2% triplets, 11-month average kidding interval
- ~12-year lifespan

### Infrastructure
- 6 × 5,000 L bulk milk chillers, conveyor belt, computerised weighing, dump tank
- Full milk-testing laboratory, hot water boiler, 125 KVA generator, air conditioning
- Leased building: project office, dairy section, training hall, two dormitories, VIP/trainer rooms, kitchen, caretaker quarters, urine distillation room, feed & milk storage, expansion floor

### Forward targets
- Year 1: 6,000 → 10,000 L/day · Year 2: 10,000 → 15,000 L/day · Year 3: 25,000 L/day
- Tag 6,000 more goats → 600+ families, 3,000+ individuals
- Expand to 30 villages across two districts within two years
- ~200 additional livelihoods across the value chain
- Genetic improvement pillar: Years 3–12

### Timeline
| Date | Milestone |
|---|---|
| 1 Jan 2024 | Phase 1 begins |
| Mar–Apr 2025 | Summer health camps — MAFSU, 4 vets + 4 PG students from Akola, 17 villages, 90 women |
| 10 Apr 2025 | Zalawadi health checkup & health card distribution camp |
| 29 Apr 2025 | Public announcement of the project |
| 15 Jul 2025 | Goat urine distillation unit starts |
| — | Daily delivery of Zalawadi goat milk begins from Malpur |

### Partners
MAFSU (Nagpur) · ICAR-CIRG (Mathura) · ICAR-CSWRI (Jaipur) · ICAR-CIRC (Meerut) · Animal Husbandry Department, Maharashtra · District Collectors, Dhule & Nandurbar · BAIF (Pune) · Bharatiya Krushak Samaj

**Named individuals (photos available):** Dr. Niteen Patil (VC, MAFSU) · Padma Shree Dr. Raj Paroda · Dr. Manish Kumar Chatli (Dir, ICAR-CIRG) · Dr. Umesh Singh (Dir, ICAR-CIRC) · Dr. Arunkumar Tomar (Dir, ICAR-CSWRI) · Dr. Manoj Aware (BAIF) · Shri Mahadev Kokate (Hon'ble Minister, Agriculture)

### Contact
- **Mumbai:** G-102, Maheshwari Nagar, Kondivita Road No. 16, Andheri East, Mumbai 400093
- **Pune:** Alankar Bhavan, 1132/2, Fergusson College Road, Pune 411016
- **Project site:** Goat Dairy, Amravati Dam Road, Village Malpur, Sindkheda, Dist. Dhule, Maharashtra 425408
- **Phone:** +91 99207 88947 · +91 77090 10407 · +91 94230 12256
- **Email:** ceoasf23@gmail.com · cooasf22@gmail.com · igbdpl22@gmail.com
- **Leadership:** Mr. Anil Annasaheb Shinde (CEO, ASF) · Mr. Kiran Shreekant Patwardhan (COO, ASF; CEO, IGBDPL) — *label roles by entity, the dual title is correct, not an error*

---

## 5. Resolved ambiguities — use these, don't re-litigate

The source documents contradict each other in places. These calls are made:

| Question | Decision | Why |
|---|---|---|
| Malpur's district | **Dhule** (Tal: Sindkheda) | 4 of 5 sources say Dhule; only the proposal says Nandurbar |
| Village count | **17 villages, 2 districts** | Most recent document (Oct 2025). Phrase as "17 villages and growing" |
| Goat count | **4,000 tagged** | Label "as of May 2025" |
| The 9,164 litre figure | **DO NOT PUBLISH** | Source table has no time unit. Could be daily, monthly or annual — a 30× ambiguity. Omit entirely rather than misstate. |
| Goat milk powder | **DO NOT MENTION** | Appears in none of the three documents. Refer only to goat milk and "value-added products" until the client supplies specs and photos. |

### Never publish without client confirmation
- 80G / FCRA / CSR-1 registration numbers, or any tax-benefit claim
- Any rupee amount, cost per intervention, revenue, margin or milk price
- Any equity, return, or investment-terms language
- Trustee or board names

Where a donation tier needs a price, use a **placeholder constant** in `src/data/donationTiers.ts` with a clear `// TODO: client to confirm` marker — never a guessed number in JSX.

---

## 6. Assets

`public/images/` — 76 curated images, already cleaned (black letterbox bars trimmed, burned-in GPS Map Camera stamps cropped), converted to WebP, capped at 2000px. `manifest.json` lists every file with original and final dimensions.

| Folder | Count | Use |
|---|---|---|
| `01-hero` | 1 | **`A_p01_01.webp`** — boy carrying a goat kid in a green field. Best photo in the set. Use as the hero. |
| `02-logos` | 2 | ASF laurel-wreath mark · IGBDPL circular mark (goat head + DNA helix) |
| `03-goats` | 14 | Breed portraits, flocks, doe with kids. `image7` is the clean side-profile Zalawadi. |
| `04-women` | 6 | **Use these large and prominently.** `B_p06_07` and `B_p06_08` are the most honest images we have. |
| `05-field-work` | 10 | Supervisors recording data, vets examining goats |
| `06-tagging` | 1 | `image27` — hand holding an ear tag. Crop tight; most on-message detail shot we own. |
| `07-dairy` | 10 | `image41` (clean plant interior) and `image42` (chillers with staff) are the strongest |
| `08-feed` | 2 | Silage machine, hands holding silage |
| `09-events` | 8 | Health camp, public announcement, handover ceremonies |
| `10-institutional` | 13 | MoU signings, official meetings. **Ration these — one section only.** |
| `11-community` | 7 | Village meetings, homes |
| `12-maps` | 2 | Village radius map — redraw as SVG, use as reference only |

### Image rules

1. **Ration the institutional photos.** We have 13 images of men in meeting rooms and 6 of women, but 93% of flock owners are women. If the homepage is built from what's most plentiful we produce a site about handshakes. Institutional photos go in ONE section on `/about` and the partners strip. Nowhere else.
2. **Every image slot gets a fixed aspect ratio** defined in the design system. Better photography arrives later — it must be a file swap, not a redesign.
3. **Both logos are low-resolution raster** (ASF is 267×238). Redraw both as clean SVG early — they're needed for the header, favicon and OG images.
4. Serve with explicit `width`/`height`, `loading="lazy"` below the fold, `decoding="async"`.

---

## 7. Design direction

**"Scientific Pastoral."** Earth-toned and grounded, but with the precision of an agri-tech company — because the digital tagging, milking lab and embryo-transfer roadmap mean that's genuinely what it is. Not an NGO brochure. Not a SaaS landing page.

- **Palette:** deep earth brown, terracotta, warm off-white. One saturated accent (green or gold) reserved **strictly** for CTAs and data highlights — never decorative.
- **Type:** high-contrast editorial serif for headlines, geometric sans for body and numerals. Tabular figures for all statistics.
- **Layout:** asymmetric editorial grid, generous whitespace, images in framed cards rather than full-bleed (see image rules).
- **Flat.** No gradients, no glassmorphism, no drop shadows as decoration.

### Motion
Lenis smooth scroll site-wide — the single biggest "expensive site" signal. Scroll-triggered reveals, count-up statistics, custom magnetic cursor on interactive elements, curtain page transitions.

**Non-negotiable:** every animation respects `prefers-reduced-motion`. Mobile ships a lighter variant — a large share of this audience (district officials, government staff, rural stakeholders) is on mid-range Android. Test on a throttled connection.

---

## 8. Stack & conventions

- **Vite + React + TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts`, never arbitrary hex values in JSX
- **Framer Motion** for component animation, **GSAP + ScrollTrigger** for scroll-driven sequences
- **Lenis** for smooth scroll
- **React Router** for the 8 routes
- Static build, deploy to Vercel

### Structure
```
src/
  components/     # reusable primitives (Button, Stat, Section, Reveal, ...)
  sections/       # homepage beats, one file per beat, numbered
  pages/          # route-level components
  data/           # ALL content as typed constants — no hardcoded copy in JSX
  hooks/
  styles/
public/images/    # the curated asset library
docs/             # source documents + reference maps
```

### Rules
- **All copy and figures live in `src/data/` as typed constants.** Nothing hardcoded in JSX. Content will change once the client answers open questions, and it must be editable in one place.
- Add a `source` field to every statistic constant citing its document and page, e.g. `source: 'Proposal p7 L6'`. This is why the site is trustworthy — keep it.
- Semantic HTML. Real `<h1>`–`<h3>` hierarchy, real `<button>`/`<a>`, alt text on every image.
- Target Lighthouse 90+ on all four categories.

---

## 9. Build order

1. Scaffold Vite + TS + Tailwind + router; design tokens; motion primitives; redraw both logos as SVG
2. Homepage beats 1–8
3. Homepage beats 9–15
4. `/donate` — full page against a mock gateway (Razorpay is the likely target; keep the integration behind an adapter so it's a drop-in later)
5. `/project` + `/impact` — map, data viz, timeline
6. `/products`, `/about`, `/gallery`, `/contact`
7. Forms, PDF downloads, gateway adapter
8. Responsive, performance, accessibility, SEO, OG images
9. Deploy

**Start with beats 1–8 as a working animated prototype.** That's the artefact that proves the design direction before committing to the rest.

---

## 10. Reference documents

| File | Contents |
|---|---|
| `docs/CONTENT-SOURCE-MAP.md` | **Every claim traced to a document page and line number.** Consult before writing any factual copy. |
| `docs/ASSET-AUDIT.md` | Full image inventory with per-file recommendations |
| `docs/SITE-PLAN.md` | The architecture rationale in full |
| `docs/ASF- Proposal - FINAL PM 1oct2025.pdf` | Primary source — the CSR proposal (12 pp) |
| `docs/MODIFIED PROFILE ASF MALPUR GOAT PROJECT ANNA LOGO NO BK.pdf` | Project profile, village data table, per-goat data sample (9 pp) |
| `docs/IGBDPL LATEST PROFILE TO BE USED.pptx` | Commercial arm profile, dairy specs, targets (15 slides) |
