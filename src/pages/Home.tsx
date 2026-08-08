import { Hero } from '@/sections/01-Hero'
import { Situation } from '@/sections/02-Situation'
import { WhyGoats } from '@/sections/03-WhyGoats'
import { Model } from '@/sections/04-Model'
import { Tagging } from '@/sections/05-Tagging'
import { Dairy } from '@/sections/06-Dairy'
import { Traction } from '@/sections/07-Traction'
import { Women } from '@/sections/08-Women'
import { WhereAndWhen } from '@/sections/09-WhereAndWhen'
import { Future } from '@/sections/10-Future'
import { Partners } from '@/sections/Partners'
import { Closing } from '@/sections/11-Closing'

/**
 * The homepage is the product — the thing the client opens on a laptop in front of a
 * stranger and scrolls top to bottom.
 *
 * Eleven beats, not fifteen. The page previously ran to roughly 22,500px because it did
 * not summarise the depth pages, it concatenated them: eleven of the fifteen beats had a
 * full-fidelity twin on /project, /impact, /products or /about, and four of those were
 * literally the same component rendered twice. It now states each claim, shows the single
 * strongest piece of evidence for it, and hands off with a <DepthLink>.
 *
 * Every data constant renders at full fidelity in exactly one place on the site. Before
 * adding anything here, check it is not already on a depth page.
 *
 * See docs/HOMEPAGE-CONDENSE-PLAN.md.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Situation />
      <WhyGoats />
      <Model variant="summary" />
      <Tagging variant="summary" />
      <Dairy />
      <Traction variant="summary" />
      <Women />
      <WhereAndWhen />
      <Future variant="summary" />
      {/* Credibility band, flush against the closing section rather than a beat of its own. */}
      <Partners variant="summary" />
      <Closing />
    </>
  )
}
