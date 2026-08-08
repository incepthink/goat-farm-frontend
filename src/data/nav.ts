export type NavItem = { label: string; to: string }

export const NAV: NavItem[] = [
  { label: 'The project', to: '/project' },
  { label: 'Impact', to: '/impact' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Annasaheb Shinde Foundation — Goat Milk & Breed Development, Malpur',
    description:
      'A goat is a savings account rural families are forced to liquidate. We make the animal healthier and guarantee to buy its milk daily. 4,000 goats tagged across 17 villages in north Maharashtra.',
  },
  '/project': {
    title: 'The project — Annasaheb Shinde Foundation',
    description:
      'The model, the villages, the Zalawadi breed and the four-phase plan behind the Goat Milk and Breed Development Project at Malpur, Dhule.',
  },
  '/impact': {
    title: 'Impact — Annasaheb Shinde Foundation',
    description:
      'Kid mortality down 50%, milk yield up 15–20%, 4,000 goats tagged and 3,000 health cards prepared. The numbers, the women, and the timeline since January 2024.',
  },
  '/products': {
    title: 'Products — Annasaheb Shinde Foundation',
    description:
      'Four verticals from one flock: goat milk, goat feed, fertilizer from dung and pesticide from urine. B2B enquiries welcome.',
  },
  '/about': {
    title: 'About — Annasaheb Shinde Foundation',
    description:
      'The legacy of Annasaheb Shinde, the three-entity structure of ASF, IGBDPL and AJAMESH, the leadership and the partner institutions.',
  },
  '/gallery': {
    title: 'Gallery — Annasaheb Shinde Foundation',
    description: 'Field photography from the villages, the dairy, the health camps and the flocks.',
  },
  '/contact': {
    title: 'Contact — Annasaheb Shinde Foundation',
    description:
      'Three offices — Mumbai, Pune and the project site at Malpur, Dhule. Investor, CSR and partnership enquiries.',
  },
  '/donate': {
    title: 'Support this work — Annasaheb Shinde Foundation',
    description:
      'Fund tagging, health cards, veterinary camps, training and the laboratory — the half of the project that produces no revenue and makes the rest possible.',
  },
}
