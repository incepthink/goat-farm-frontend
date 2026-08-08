# Open questions for the client

Everything the website needs that is **not** in the three source documents, or that the documents
contradict. Nothing on this list blocks the build — the site is being built around every item.
All of it blocks **launch**.

Status key: 🔴 blocks launch · 🟡 degrades the site until answered · ⚪️ nice to have

---

## 1. Content the site cannot invent

### 🔴 Donation tier amounts
`/donate` prices seven tiers, each mapped to a real intervention from the documents. No rupee figure
appears in any source, so every amount is currently a placeholder constant in
`src/data/donationTiers.ts` marked `// TODO: client to confirm`.

Needed — approximate cost of:
| Intervention | Source for the intervention |
|---|---|
| Tagging + health card for one goat | A p10 L5, L19 |
| One family's flock — nutrition + vet care for a year | A p6 L23–24 |
| One hygienic goat shed | A p6 L25 |
| One village health camp (the MAFSU camp is a costed precedent) | A p10 L15–20 |
| Training one Livestock Supervisor | A p10 L21–22 |
| The laboratory — described only as "pretty handsome" | B p3 L1–6 |
| The AI / semen collection programme | B p2 L38–40 |

Until these arrive the donate page shows tiers without amounts and a custom-amount field only.

### 🔴 80G / FCRA / CSR-1 registration numbers
No tax-benefit copy ships without these. The trust block on `/donate` currently states Section 8
status only (A p3 L18), which is documented, and says nothing about tax deductibility.

### 🔴 Payment gateway
Which provider, and whose account. The donate flow is built against a mock behind an adapter
(`src/lib/payments/`), so going live is a key ID and one file — no page rewrite.
If there is no gateway yet: do you want UPI / NEFT details published as an interim? If so, send them.
**We will not publish bank details we were not given.**

### 🔴 Form destination
`/contact`, the `/products` B2B enquiry and the `/donate` details form all POST to
`VITE_FORM_ENDPOINT`. Set that env var to a Formspree / Web3Forms endpoint and every form starts
working. Who owns that account, and which inbox should receive enquiries?

### 🟡 Goat milk powder
Mentioned by the client, but appears in **none** of the three documents. Needs product name,
specification, packaging, FSSAI licence and photographs before it can appear on `/products`.
Currently the site refers only to goat milk and "value-added products" (A p9 L28).

### 🟡 Named flock-owner portraits
The single highest-value asset the site could gain. The documents already name
**Manishabai Devidas Dhangar of Dondaicha**, whose 38-goat data table is in the profile (B p8).
A photograph of her beside her own data would be the most persuasive thing on the site.
Six portraits with names and villages would be worth more than all remaining photography combined.

### 🟡 Vector logos
ASF has been redrawn as clean SVG for the header, favicon and OG images. If the original
`.ai` / `.eps` / `.svg` exists, send it and we swap ours out.
The **IGBDPL** mark has **not** been redrawn — the Warli figure ring, DNA helix and drawn goat head
cannot be traced faithfully from a 760px raster, and we will not ship an altered version of your
logo. It is used at small sizes from the raster until a vector arrives.

### ⚪️ Trustee / board list
Not in any document. `/about` currently names only the two officers the documents name.

### ⚪️ Audited financials or an annual report
Not provided. Would strengthen the trust block considerably.

---

## 2. Should the proposal PDF be downloadable?

**Decision taken for now: no PDF.** Homepage beat 15 ships with the two buttons only.

The only candidate file is `ASF- Proposal - FINAL PM 1oct2025.pdf`. Publishing it puts the complete
CSR proposal on the open web, search-indexed, including internal figures and the 9,164 L table we
have deliberately kept off the site (see §3).

Three options — the client picks:
1. **Nothing** (current state) — clean, nothing leaves your control.
2. **A purpose-made public one-pager** — recommended. Not the internal proposal; a document written
   to be handed to a stranger. Drops straight in.
3. **The full proposal, gated behind the enquiry form** — you capture who asked, and it stays out of
   search results.

---

## 3. Contradictions between documents

Calls already made per `CLAUDE.md` §5. Confirm or correct each.

| Question | Our decision | Why | Confirm? |
|---|---|---|---|
| Malpur's district | **Dhule**, Tal. Sindkheda | 4 of 5 sources say Dhule; only the proposal (A p6 L2) says Nandurbar | ☐ |
| Village count | **17 villages, 2 districts**, phrased "and growing" | Most recent document. B p2 says 13, C s3 names 17, C s2 says "more than 15" | ☐ |
| Goat count | **4,000 tagged, as of 31 May 2025** | A p10 L5. B p5's table totals 4,979 — likely present-vs-tagged, different dates | ☐ |
| Village name spellings | C s3 spellings used throughout | B p5 and C s3 differ: Balsana/Balsane, Shevade/Shewade, Lamkhani/Lamkani, Salve/Salwe | ☐ |
| Khokrale's district | **Nandurbar** | B p2 L4 and C s3 agree; B p5's table puts it in the Dhule block. Affects the map pin | ☐ |

### 🔴 The 9,164 litre figure — the one that actually matters

B p5's village table totals **9,164** in a column headed only *"Goat Milk (Liters)"* — **no time unit**.

- If it is **per day**, the year-one target of 6,000 L/day (C s2) is already beaten by 53%.
- If it is **per month or per year**, that target is still far off.

That is a 30× ambiguity in the headline growth number, so the figure is **omitted from the site
entirely** rather than misstated. It is the single most valuable answer on this page: with a unit
attached it becomes the strongest number the project owns.

**Is 9,164 litres per day, per month, or per year?**

---

## 4. Photography

The library is 76 images, and the constraint is real: only 12 exceed 1280px on the longest edge, and
most sit between 300 and 550px. The site is built as an editorial grid — framed cards at fixed
aspect ratios rather than full-bleed — specifically so this holds up, and so that better photography
later is a **file swap, not a redesign**.

### 🔴 Nine files still carry burned-in stamps and are excluded from the site

The asset audit reported the GPS Map Camera stamps as cropped out. Checking each file against the
rendered page, nine still have them. They are listed in `IMAGES_WITH_GPS_STAMP` in
`src/data/story.ts` and blocked from the gallery in `src/data/gallery.ts`, so nobody re-adds one by
accident:

`03-goats/image22` · `image24` · `image25` · `image29` · `image30` ·
`05-field-work/image28` · `07-dairy/image49` · `09-events/image46` ·
`04-women/B_p07_06` (a camera timestamp, "2024/11/13 17:45", rather than a GPS stamp)

**Please send clean originals** — several are otherwise good photographs, and `07-dairy/image49`
(the loaded delivery vehicle) and `09-events/image46` are ones the site would use.

### 🟡 Two verticals have no photograph at all

There is **no image of the goat urine distillation unit** anywhere in the library — the file
grouped under its launch is a project signboard. There is also no image of manure collection or of
any packaged product.

Rather than substitute a loosely-related photo and let it read as the real thing, those slots render
a visible "photograph to come" placeholder at the exact frame the eventual image drops into. Send a
photograph and it appears with no other change.

### Two asks

1. **Half a day at Malpur with a real camera** would transform the site. Priority shots: the dairy
   interior and chillers, women milking, a tagged ear in close-up, the villages wide, and portraits.
2. **The people photos are skewed the wrong way.** We have 13 images of officials in meeting rooms
   and 6 of women — while the proposal itself says 93% of flock owners are women (A p6 L17). The
   institutional photos are rationed to one section on `/about` and the partners strip, deliberately.
   More photographs of the women would change what the site is able to say.

Also missing entirely: product and packaging shots, any video, and wide landscape or drone footage
of Malpur.

---

## 5. Confirm before launch

- [ ] Every figure on the site is current as of its stated date
- [ ] The two officers' titles are right — Mr. Kiran Shreekant Patwardhan is listed as COO of ASF
      **and** CEO of IGBDPL. We have treated the dual title as correct and label roles by entity.
- [ ] Partner institutions are content to be named and logo'd (MAFSU, ICAR-CIRG/CSWRI/CIRC, BAIF,
      AHD Maharashtra, District Collectors, Bharatiya Krushak Samaj)
- [ ] The named individuals consent to their photographs being published
- [ ] **Manishabai Devidas Dhangar consents to being named.** Her 38-goat record is reproduced in
      full on `/project` and she is named beside it, as the source map recommends — it is the most
      persuasive artefact on the site. Her mobile number appears in the source table and is **not**
      published. If she would rather not be named, remove `RECORD_OWNER.name` in
      `src/data/goatRecords.ts` and the table stands on its own.
- [ ] Which of the three phone numbers and email addresses should be public
- [ ] Domain and DNS access for the cutover from the existing site
