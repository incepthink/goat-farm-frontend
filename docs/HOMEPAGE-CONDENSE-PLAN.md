# Homepage condense plan

Agreed change: the homepage is too long, and it is too long because it duplicates the
depth pages rather than summarising them. This document is the design for fixing that.

Supersedes CLAUDE.md §3's fifteen-beat structure (approved deviation) and CLAUDE.md §6's
treatment of the women's section (approved deviation — that section gets *more* room, not
less).

---

## 1. Diagnosis

### 1.1 Length

The homepage is roughly **22,500px on a 1440×900 desktop — about 25 full screens.**
Mobile is likely double. A long-scroll pitch page works at 10–14 screens.

Estimates below are analytical, derived from the layout and the spacing tokens, not
measured in a browser. They are good enough to rank the problem; re-measure before
declaring the work done.

| Beat | Est. height | Note |
|---|---:|---|
| 1 Hero | 900 | `h-[100svh]` |
| 2 Situation | 930 | |
| 3 Why goats | 1,450 | three `mt-beat` gaps |
| 4 Breed | **2,050** | 5 stats × `lg:min-h-[38vh]` = 1,700px alone |
| 5 Model | 1,700 | |
| 6 Tagging | **2,050** | four blocks, three `mt-beat` gaps |
| 7 Dairy | 1,230 | |
| 8 Verticals | 1,350 | |
| 9 Traction | **2,300** | 6 stats + 4 bars + 2 training stats |
| 10 Women | 1,830 | |
| 11 Map | 1,100 | 620px SVG |
| 12 Journey | 1,050 | horizontal rail — cheap |
| 13 Partners | **1,850** | 8-partner grid + 7 named individuals |
| 14 Future | 1,550 | |
| 15 Closing | 1,030 | |
| **Total** | **≈ 22,500** | |

About **4,500px (20%) is pure vertical rhythm** — 15 sections × `py-beat` (~198px at this
viewport) plus ~14 internal `mt-beat`/`mt-beat-lg` gaps. The token values are not the
problem and must not change; they are the design's signature. Fewer sections and fewer
internal gaps reclaims most of it automatically.

### 1.2 The actual problem: 11 of 15 beats have a full-fidelity twin

Four are literally the same component rendered on two routes.

| Homepage beat | Also on | Mechanism |
|---|---|---|
| 4 Breed | `/project` | Same `BREED.stats` + `BREED.weights`, both in full |
| 5 Model | `/project` | Same `MODEL.pillars` **and** all six `interventions` |
| 6 Tagging | `/project` | Same `TAGGING.monitoring` (11 items), `honesty`, `moat` |
| 7 Dairy spec | `/products` | Same `DAIRY.spec` + `DAIRY.promise` |
| 8 Verticals | `/products` | Same `VERTICALS`, full detail |
| 9 Traction | `/impact` | **`import { Traction }`** — same component |
| 10 Women | `/impact` | **`import { Women }`** — same component |
| 11 Map | `/project` | **`import { VillageMap }`** — same component |
| 12 Journey | `/impact` | **`import { Journey }`** — same component |
| 13 Partners | `/about` | Same `PARTNERS` + `NAMED_INDIVIDUALS`, near-identical markup |
| 14 Future | `/project` | `genetics` / `dataBuild` overlaps the four-phase plan |

Only Hero, Situation, Why-goats and Closing are homepage-exclusive. Someone who reads the
homepage and then opens `/project` is shown the same breed stats, the same model pillars,
the same monitoring list and the same map a second time.

---

## 2. The principle

> The homepage makes the claim and shows the single strongest piece of evidence for it.
> The depth page holds the evidence.
> **Every data constant renders at full fidelity in exactly one place.**

Each beat ends where verification begins — with a consistent link into depth, not with the
verification itself.

---

## 3. Architecture

### 3.1 One component, two densities

Shared beats take a `variant?: 'summary' | 'full'` prop, defaulting to `'full'`.
`Home.tsx` passes `summary`; `/impact` and `/project` pass nothing.

Same file, same data import, one place to edit when the client changes a figure. This is
the whole point — the current duplication means every corrected number has to be found in
two files.

Applies to: `09-Traction`, `10-Women`, `12-Journey`, `13-Partners`, `05-Model`,
`06-Tagging`, `14-Future`.

**Exception —** `04-Breed`. A 38vh-per-stat sticky scroll and a compact three-stat row are
not the same layout with a flag. That beat gets a genuinely separate compact treatment on
the homepage; the existing full version stays on `/project`, which already has one.

### 3.2 New primitive: `<DepthLink>`

`src/components/DepthLink.tsx` — the consistent "the evidence is here" affordance that
closes every trimmed beat.

This is load-bearing. It is what makes a shorter beat read as **editorial confidence**
rather than **missing content**. Right now only Verticals has such a link and it is
ad-hoc ([08-Verticals.tsx:48–56](../src/sections/08-Verticals.tsx#L48-L56)); that markup
becomes the component.

---

## 4. The new homepage: 15 beats → 11

| # | Beat | Change | Est. before → after |
|---|---|---|---:|
| 1 | Hero | unchanged | 900 |
| 2 | The situation | **untouched.** Protected by the CLAUDE.md §3 stillness rule. | 930 |
| 3 | Why goats **+ the animal** | Merge 3+4. Four barriers stay at full strength. Breed becomes portrait + three stats (2.15 kg/day · 55% twins · 150 years unimproved) + DepthLink. Sticky 38vh scroll deleted. | 3,500 → 1,150 |
| 4 | The model | Keep four pillars + the before/after flip — this is the thesis. Drop the six interventions. | 1,700 → 1,100 |
| 5 | Tagging & data | Keep tag photo + six goat-ID cards + the honesty quote. Drop the 11-item monitoring list. | 2,050 → 1,050 |
| 6 | The dairy **+ four verticals** | Merge 7+8. Photo rail + spec, then verticals as a compact row rather than four portrait cards. | 2,580 → 1,400 |
| 7 | Traction | Keep six count-ups + four gain bars. Drop the two training stats. | 2,300 → 1,450 |
| 8 | **The women** | **Expanded and rebuilt — see §5.** | 1,830 → 2,200 |
| 9 | Where **and when** | Merge 11+12. Diagram lives here only; `/project` keeps the village table as its depth version. | 2,150 → 1,300 |
| 10 | Where it goes | Keep the target chart. Drop genetics + dataBuild. | 1,550 → 950 |
| 11 | Two buttons | Keep, with the partner **marquee only** as a credibility band above. Grid and named individuals move to `/about`. | 2,880 → 1,250 |

### 4.1 Measured result — the estimates above were wrong

Everything above this line was written from analytical estimates. The work is now built
and measured in headless Chromium at 1440×900, and the estimates were **systematically
optimistic by 40–60%**.

| | Estimated | **Measured** |
|---|---:|---:|
| Homepage, desktop | ≈13,700px | **19,160px · 21.3 screens** |
| Homepage, mobile (390×844) | — | **29,608px · 35.1 screens** |
| /project | — | 8,756px · 9.7 screens |
| /impact | — | 5,313px · 5.9 screens |

Reconstructing the "before" from per-block measurements puts the original at roughly
**24,000px / ~27 screens**, so the delivered cut is **about 20%, not 39%** — and the
flock-owners section grew by ~530px inside that.

**Why the estimate was wrong.** Merging two beats does not save two beats' worth of height.
It saves exactly one section's chrome: one `py-beat` pair (198px) and one `SectionHead`
(~300px). Four merges is therefore ~2,000px, not the ~6,000px assumed. The remaining
length is genuine content rendered at this design's scale, and per-section measurement
confirms there is no further slack of that size to reclaim:

| Section | Measured |
|---|---:|
| Why goats + the animal | 2,244 |
| The flock owners | 2,531 *(grown deliberately)* |
| Where, and when | 2,307 |
| The dairy + verticals | 2,109 |
| Tagging & data | 1,661 |
| Traction | 1,634 |
| The model | 1,339 |
| Where it goes | 1,239 |
| Hero / Situation / Closing / Partners band | 900 / 1,011 / 1,054 / 349 |

### 4.2 What is left, with measured costs

Three levers remain. None is taken, because each trades against a decision already made:

1. **Move the timeline rail off the homepage → −~950px.** It is the most depth-like content
   still on the page. Kept on the homepage by explicit instruction; this is the single
   largest remaining item.
2. **Trim the flock-owners section → −~800px.** Explicitly counter-instructed; that section
   was asked to get better, and it did.
3. **Reduce `py-beat` from 11vh to ~8vh → −~700px site-wide.** Flattens the vertical rhythm
   that is the design's signature. §7 rules it out.

Applied instead, and already in the measured figure: within-beat separators dropped from
`mt-beat`/`mt-beat-lg` to `mt-16`, keeping the full rhythm *between* beats; the village
schematic capped at 34rem (it rendered 765px tall uncapped); merged sub-heads demoted from
`display-md` + lead standfirst to `display-sm` + body.

---

## 5. Beat 8 — the women, rebuilt

Explicitly out of scope for the condensing. This section gets better.

### 5.1 A real bug, found while auditing

`04-women/image39.webp` and `image40.webp` are **720×1281 — 9:16 vertical frames.**
Both are currently rendered at `ratio="landscape"` (3:2) with `object-cover object-center`
([10-Women.tsx:58–64](../src/sections/10-Women.tsx#L58-L64)).

A centred 3:2 crop of a 9:16 image shows **about 28% of the frame height**, taken from the
middle. In both photographs the woman's hands, the udder and the steel bucket are in the
*lower* portion. So the two best action photographs in the entire library currently render
as a band of goat backs and gravel, with the actual milking cropped out.

These are the only images the project owns of its own core transaction. Fix first.

### 5.2 Two frames recovered, no new photography

| File | Status now | Proposed |
|---|---|---|
| `04-women/B_p07_06.webp` | Excluded — burned-in `2024/11/13 17:45` bottom-right | **Recover.** Two women in yellow and orange saris feeding a pen of black goats. The stamp sits in the bottom ~6%; cropping it is exactly the cleaning already applied to the rest of the library (CLAUDE.md §6), not a deviation. |
| `04-women/B_p05_02.webp` | Small thumbnail in the activity row | **Promote to a lead.** Nine women in saris standing inside the dairy beside a bulk milk chiller. This is the **only image that joins the two halves of the thesis** — the women and the plant — and it is currently the size of a postage stamp. |

Usable frames go from **5 → 7** without asking the client for anything.

Checked and rejected: `05-field-work` (all men), `09-events` (institutional),
`11-community` (men, except `B_p06_00`, which is a village meeting and belongs on
`/gallery`).

### 5.3 Layout

Current: heading + 93% in a two-column split, then two equal portraits, then three equal
landscapes. Uniform, and the uniformity is what makes it read as a photo dump.

Proposed:

1. **Lead with the line, full width.** *"They already run this. The project just pays them
   for it."* is the strongest sentence on the site and is currently set at `display-md`
   inside a 6-column block, competing with the 93% stat beside it. Set it at
   `display-lg`, across the measure, alone.
2. **93% and the body below it**, asymmetric — stat left, both paragraphs right.
3. **Pull the second paragraph out as a statement**, not body copy: *"…moves them from
   rearing goats to running the enterprise around them."*
4. **A deliberately uneven editorial grid.** Seven frames, three ratios, unequal column
   spans:
   - `image39` at **`portrait-tall`** (2:3) — the milking frame, uncropped, running large
   - `B_p05_02` at `landscape`, wide span — women in the dairy
   - `B_p06_07` and `B_p06_08` at `portrait` — the two most honest frames, unchanged
   - `B_p07_06` at `landscape`, cropped
   - `image40` at `portrait-tall`
5. **Keep `gapNote` verbatim.** It is honest and it is a standing ask to the client for
   named portraits.

> **Ratios still come only from the design-system tokens** (`portrait`, `portrait-tall`,
> `landscape`, …). CLAUDE.md §6 rule 2 holds: variation comes from *choosing different
> tokens per slot*, never from inventing ratios. Better photography must still be a file
> swap.

---

## 6. What the depth pages absorb

They cannot just receive links — they must become the sole home of what leaves.

- **`/project`** — already renders the six interventions and the 11-item monitoring list.
  Drops `<VillageMap />`; the village table is its depth version.
- **`/impact`** — `<Traction variant="full">`, so it keeps the two training stats the
  homepage no longer shows. Drops `<Journey />` and `<Women />`: the timeline now lives
  only inside the homepage's merged beat, and the flock-owners section is not worth
  double-rendering six large photographs to restate a figure this page already carries as
  an outcome. It is 5,313px — thinner than before, and that is the point.
- **`/about`** — the only place partners are enumerated.
- **`/products`** — the only place verticals are described in full, and now the only home
  of `DAIRY.facility`, the leased-building inventory moved off the homepage.

### 6.1 Cross-route anchors

`PageShell` calls `window.scrollTo(0, 0)` on every pathname change and nothing handles a
location hash, so a `DepthLink` pointing at `/#some-heading` would land at the top of the
page. `<DepthLink>` targets whole routes only. Adding hash support means teaching
`PageShell` to defer to `scrollToElement()` from `useSmoothScroll` — not done here.

---

## 7. Not changing

- Beat 2. Still, silent, one slow fade. The rule stands.
- The spacing tokens in `tailwind.config.ts`.
- Any figure, any source citation, any `source:` field.
- The one-argument / two-CTA architecture.
- `docs/CLIENT-QUESTIONS.md` — no open question is closed by this work.

---

## 8. Status

All done and measured:

1. ✅ `<DepthLink>` primitive.
2. ✅ Flock-owners section rebuilt; the 9:16 crop bug fixed.
3. ✅ `04-women/B_p07_06.webp` cropped 558×378 → 558×340; `manifest.json` updated.
4. ✅ `variant` prop on Traction, Model, Tagging, Future, Partners.
5. ✅ Merges 3+4, 7+8, 11+12, 13→closing band. Sections renumbered 01–11; `VillageMap`,
   `Journey` and `Partners` un-numbered, since they are composables rather than beats.
6. ✅ Compact breed treatment.
7. ✅ Measured — see §4.1.

Fixed in passing, not part of the brief: `SectionHead` never applied its `id` to the
animated heading, so every section using `labelledBy` had an `aria-labelledby` pointing at
nothing. `MaskReveal` now takes an `id`.

**Still outstanding:** Lighthouse has not been re-run, and nothing has been checked on a
throttled mid-range Android. The mobile figure (29,608px / 35 screens) is the one that
should worry us more than the desktop one.
