import manifest from '../../public/images/manifest.json'

type ManifestEntry = {
  cat: string
  file: string
  src: string
  orig: [number, number]
  final: [number, number]
  kb: number
}

const entries = manifest as ManifestEntry[]

const byFile = new Map(entries.map((e) => [e.file, e]))

export type ImageRef = {
  src: string
  width: number
  height: number
}

/**
 * Resolve a manifest path (e.g. "01-hero/A_p01_01.webp") to a URL plus its intrinsic
 * dimensions. Serving explicit width/height on every image is what keeps CLS at zero —
 * and with this library's resolution problem, knowing the real pixel size matters
 * (CLAUDE.md §6, image rule 4).
 */
export function img(file: string): ImageRef {
  const entry = byFile.get(file)
  if (!entry) {
    // Loud in dev, harmless in production — a typo'd path should be obvious immediately.
    if (import.meta.env.DEV) console.warn(`[images] "${file}" is not in manifest.json`)
    return { src: `/images/${file}`, width: 1200, height: 800 }
  }
  return { src: `/images/${entry.file}`, width: entry.final[0], height: entry.final[1] }
}

/** Every image in one category, in manifest order. Used by /gallery. */
export function imagesIn(cat: string): ImageRef[] {
  return entries
    .filter((e) => e.cat === cat)
    .map((e) => ({ src: `/images/${e.file}`, width: e.final[0], height: e.final[1] }))
}

/** Longest edge, used to decide whether a photo can carry a large slot. */
export function longestEdge(file: string): number {
  const entry = byFile.get(file)
  return entry ? Math.max(entry.final[0], entry.final[1]) : 0
}
