# Asset Audit — what we actually have to build with

**76 images** extracted from the three documents, cleaned and organised into `/assets/`.
Processing applied: black letterbox bars trimmed, burned-in GPS Map Camera stamps cropped out, converted to WebP, capped at 2000px.

---

## What's in the library

| Folder | Count | Contents |
|---|---|---|
| `01-hero` | 1 | **The boy carrying a goat kid on his shoulders, green field.** The single best photograph in the entire set. |
| `02-logos` | 2 | ASF laurel-wreath logo · IGBDPL circular logo (goat head + DNA helix — genuinely well designed) |
| `03-goats` | 14 | Zalawadi breed portraits, flocks in pens, mother-with-kids, village herds |
| `04-women` | 6 | Women milking, women with flocks, women outside a thatched home, women at the milk centre |
| `05-field-work` | 10 | Livestock supervisors recording data, vets examining goats, staff with flock owners |
| `06-tagging` | 1 | **Close-up of a hand holding an ear tag.** Small, but the single most on-message detail shot we own. |
| `07-dairy` | 10 | Chiller tanks, stainless plant interior, lab, generator, project building, delivery vehicle |
| `08-feed` | 2 | Silage machine · hands holding prepared silage |
| `09-events` | 8 | Health camp, public announcement, goat-handover ceremonies, project signboard |
| `10-institutional` | 13 | MAFSU/ICAR/BAIF/Collector meetings, MoU handovers, office visits |
| `11-community` | 7 | Village meetings, homes, gatherings |
| `12-maps` | 2 | The 30 km radius village map, milk-collection-centre route map |

---

## The three problems you need to know about

### 1. Resolution — this is the real constraint

Only **12 of 76 images exceed 1280px** on their longest edge. Most sit between 300 and 550px. They were compressed once inside the PowerPoint and again when placed, so what we have is effectively screenshot-quality.

**What this means practically:** we cannot build the cinematic full-bleed hero sections the plan described. A 400px image stretched across a 1920px viewport will look broken, and it will look worse on a retina laptop — which is exactly what an investor will be viewing it on.

Even the hero shot (`01-hero`) is 1379 × 776. That's usable for a hero, but with no room to crop and none to spare.

**Two ways forward:**

- **(A) Design around it.** Editorial grid layout — images live inside generous framed cards at 400–700px rather than full-bleed. Colour, typography, texture and motion carry the visual weight. This can look genuinely premium; a lot of high-end editorial sites work exactly this way. **No new photography needed, no delay.**
- **(B) Get new photography.** Half a day at Malpur with a decent camera transforms the whole thing. Worth pushing for regardless, but it shouldn't block the build.

**My recommendation: build with (A) now, designed so that (B) drops straight in later without a redesign.** Every image slot gets a defined aspect ratio, so better photos are a swap, not a rebuild.

### 2. The people photos are skewed the wrong way

This is the one I'd flag to your client directly.

| Category | Count |
|---|---|
| Officials, MoUs, meeting rooms, handshakes | **13** |
| Women — the actual beneficiaries | **6** |

The project's own proposal says **93% of flock owners are women**. The photo library says the project is mostly men in conference rooms signing things.

Institutional photos matter — they're credibility, and they belong on `/about` and in the partners section. But if the homepage is built from what's most plentiful, we'll produce exactly the kind of site that makes a CSR head's eyes glaze over.

**What I'll do:** ration the institutional photos to one dedicated section, and give the six women's photographs disproportionate prominence — larger frames, better positions, more space. `04-women/B_p06_07` (woman in a sari standing among her flock) and `04-women/B_p06_08` (women outside a thatched home) are the two most honest images in the whole set and should be used large.

**What to ask the client for:** portraits of named flock owners. Even six good ones, with names and villages, would be worth more than everything else combined. The docs already name one — Manishabai Devidas Dhangar of Dondaicha, whose 38-goat data table is in the profile. A photo of her next to her own data is the single most persuasive thing this site could contain.

### 3. Both logos are low-resolution raster

ASF logo: **267 × 238px**. IGBDPL logo: 760 × 713px.

The ASF mark will visibly blur in the site header and will be unusable on a favicon, an OG share image, or anything printed. **Ask the client for the original vector (.ai / .eps / .svg / .pdf).** If none exists, redrawing it as clean SVG is about two hours' work and worth doing once.

---

## I could not access the current website

You mentioned the live site has a lot of people photos. I can't get to them:

- `annasahebshindefoundation.org` returns an **empty response** to my fetcher — the page is client-rendered, so there's no HTML content to read
- The Claude in Chrome extension isn't connected in this session, so I can't render the page with JavaScript
- I'm not permitted to fetch web content by other means

**Any of these unblocks it:**

1. **Connect the Chrome extension** — install from the Chrome Web Store, sign in with this same account, then I can open the site, render it, and pull every image directly.
2. **Save the images to a folder and connect it** — right-click → save on the ones worth keeping, then share the folder with me.
3. **Send me the image URLs** if you can see them in the page source.

Option 1 is the most thorough — I'd also be able to audit the current site's structure and content properly, which I've been working blind on so far.

---

## Best assets, ranked — what I'd build the homepage from

| Use | File | Note |
|---|---|---|
| **Hero** | `01-hero/A_p01_01` | Boy with goat kid. Warm, human, high enough resolution. Nothing else comes close. |
| Breed section | `03-goats/image7` | Clean side-profile Zalawadi against a brick wall — a proper breed portrait |
| Breed section | `03-goats/image8` | Doe with two kids |
| Women section | `04-women/B_p06_07` | Woman in sari among her flock, under shelter |
| Women section | `04-women/B_p06_08` | Women outside a thatched home |
| Women section | `04-women/image39`, `image40` | Actually milking — the core activity of the whole project |
| Tagging section | `06-tagging/image27` | Hand holding an ear tag. Low-res but croppable to a tight detail shot |
| Dairy section | `07-dairy/image41` | Stainless plant interior, no people, clean lines. Looks like real industrial capacity |
| Dairy section | `07-dairy/image42` | Chiller tanks with staff — gives it scale |
| Dairy section | `07-dairy/image48`, `image49` | Delivery vehicle at Malpur — proof that distribution has started |
| Feed section | `08-feed/B_p05_03` | Hands holding silage. Simple, tactile, good detail shot |
| Field-work section | `05-field-work/B_p05_05` | Vet examining a goat, crouched in the dirt |
| Partners section | `10-institutional/image38`, `image19` | The two highest-resolution official photos |
| Map section | `12-maps/image6` | The 30 km radius map — needs redrawing as SVG, but it's the reference |

---

## Assets we do not have and will need to design around

- **Goat milk powder product shots** — no product photography of any kind exists
- **Packaging or branding for any product**
- **Named flock-owner portraits**
- **Any video**
- **Vector logo**
- **Drone or wide landscape shots** of Malpur or the villages
