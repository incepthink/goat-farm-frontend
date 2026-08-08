import { Link } from 'react-router-dom'
import { NAV } from '@/data/nav'
import { CONTACT, OFFICES, ORG } from '@/data/org'
import { AsfLogo } from '@/components/brand/AsfLogo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-earth-deep text-bone">
      <div className="shell py-beat">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* Masked, not served as an image: the mark's own dark green is invisible on this ground. */}
            <AsfLogo paint="current" className="h-16 text-bone" />
            <p className="mt-6 max-w-measure-sm font-display text-display-sm">{ORG.legalName}</p>
            <p className="mt-4 max-w-measure-sm text-body-sm text-bone/60">{ORG.tagline}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-bone/50">Offices</h2>
            <ul className="mt-6 space-y-6">
              {OFFICES.map((office) => (
                <li key={office.label}>
                  <p className="text-body-sm font-semibold">{office.label}</p>
                  <p className="text-caption text-bone/50">{office.kind}</p>
                  <address className="mt-1.5 not-italic text-body-sm text-bone/70">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-bone/50">Contact</h2>
            <ul className="mt-6 space-y-2">
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="tnum text-body-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2">
              {CONTACT.emails.map((email) => (
                <li key={email.address}>
                  <a
                    href={`mailto:${email.address}`}
                    className="text-body-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    {email.address}
                  </a>
                  <span className="ml-2 text-caption text-bone/40">{email.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-bone/50">Pages</h2>
            <ul className="mt-6 space-y-2">
              {[{ label: 'Home', to: '/' }, ...NAV, { label: 'Support this work', to: '/donate' }].map(
                (item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-body-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/15 pt-8 text-caption text-bone/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {ORG.legalName}. A Section 8 non-profit organisation.
          </p>
          <p className="max-w-measure-sm">
            Every figure on this site cites the document it came from. Figures are stated as of the
            dates shown.
          </p>
        </div>
      </div>
    </footer>
  )
}
