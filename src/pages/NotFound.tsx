import { Link } from 'react-router-dom'
import { NAV } from '@/data/nav'
import { ButtonLink } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-center pb-beat pt-[calc(4.5rem+clamp(3rem,8vh,6rem))]">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 max-w-[16ch] text-display-lg font-semibold">
        That page is not here
      </h1>
      <p className="mt-6 max-w-measure text-lead text-earth-soft">
        The link may be out of date. The whole story is on the homepage — everything else is
        detail underneath it.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink to="/" size="lg">
          Back to the project
        </ButtonLink>
      </div>

      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-bone-edge pt-8">
        {NAV.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="text-body-sm text-earth-soft underline decoration-earth-faint/40 underline-offset-4 hover:text-earth"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
