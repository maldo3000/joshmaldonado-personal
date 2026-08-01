import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PasswordGate from './PasswordGate'
import type { PortfolioProject } from './usePortfolio'
import { usePortfolio } from './usePortfolio'
import './portfolio.css'

/**
 * Nav deliberately omits an "all" entry: /portfolio still shows everything,
 * but a client sent a focused link shouldn't be nudged back out to the
 * full list.
 */
const NAV_FILTERS = [
  { key: 'experiential', label: 'Experiential', path: '/portfolio/experiential' },
  { key: 'content', label: 'Film & Content', path: '/portfolio/content' },
  { key: 'interactive', label: 'Interactive', path: '/portfolio/interactive' },
  { key: 'ai', label: 'AI', path: '/portfolio/ai' },
] as const

type FilterKey = (typeof NAV_FILTERS)[number]['key'] | 'all'

const isFilterKey = (value: string | undefined): value is FilterKey =>
  value === 'all' || NAV_FILTERS.some((f) => f.key === value)

function isTouchLayout() {
  return window.matchMedia('(hover: none), (max-width: 640px)').matches
}

function destinationOf(p: PortfolioProject) {
  if (p.caseStudy) return { type: 'page' as const, to: `/portfolio/p/${p.slug}` }
  if (p.externalUrl) return { type: 'link' as const, href: p.externalUrl }
  return null
}

export default function PortfolioPage() {
  const { filter: filterParam } = useParams()
  const navigate = useNavigate()
  const { state, data, error, login } = usePortfolio()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const filter: FilterKey = isFilterKey(filterParam) ? filterParam : 'all'

  useEffect(() => {
    document.title = 'Portfolio — Josh Maldonado'
  }, [])

  // Unknown filter segment (and not a known route) → treat as All
  useEffect(() => {
    if (filterParam && !isFilterKey(filterParam)) {
      navigate('/portfolio', { replace: true })
    }
  }, [filterParam, navigate])

  const visible = useMemo(() => {
    const all = data?.projects ?? []
    if (filter === 'all') return all
    if (filter === 'ai') return all.filter((p) => p.tags.includes('AI'))
    return all.filter((p) => p.category === filter)
  }, [data, filter])

  useEffect(() => {
    setActiveSlug(null)
  }, [filter])

  if (state === 'checking') {
    return <div className="pf-shell pf-loading" aria-busy="true" />
  }

  if (state === 'locked') {
    return (
      <div className="pf-shell">
        <PasswordGate error={error} onSubmit={login} />
      </div>
    )
  }

  const active = visible.find((p) => p.slug === activeSlug) ?? null

  const open = (p: PortfolioProject) => {
    const dest = destinationOf(p)
    if (!dest) return
    if (dest.type === 'page') navigate(dest.to)
    else window.open(dest.href, '_blank', 'noreferrer')
  }

  const onRowClick = (p: PortfolioProject) => {
    if (isTouchLayout() && activeSlug !== p.slug) {
      setActiveSlug(p.slug)
      return
    }
    open(p)
  }

  return (
    <div className="pf-shell">
      <div className="pf-backdrop" aria-hidden="true">
        {active?.media?.video ? (
          <video
            key={active.slug}
            src={active.media.video}
            poster={active.media.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : active?.media?.image ? (
          <img key={active.slug} src={active.media.image} alt="" />
        ) : null}
      </div>

      <header className="pf-header">
        <Link className="pf-name" to="/">
          Josh Maldonado
        </Link>
        <nav className="pf-filters" aria-label="Portfolio filters">
          {NAV_FILTERS.map((f) => (
            <Link
              key={f.key}
              to={f.path}
              className={filter === f.key ? 'is-active' : undefined}
              aria-current={filter === f.key ? 'page' : undefined}
            >
              {f.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="pf-main">
        <div className="pf-rows" onMouseLeave={() => setActiveSlug(null)}>
          {visible.map((p, i) => {
            const dest = destinationOf(p)
            const expanded = activeSlug === p.slug
            return (
              <article
                key={p.slug}
                className={`pf-row${expanded ? ' is-open' : ''}${dest ? ' has-dest' : ''}`}
                onMouseEnter={() => {
                  if (!isTouchLayout()) setActiveSlug(p.slug)
                }}
              >
                <button
                  type="button"
                  className="pf-row-line"
                  onClick={() => onRowClick(p)}
                  onFocus={() => {
                    // Keyboard/hover contexts expand on focus; on touch the
                    // tap itself fires focus, which would skip the
                    // expand-first step.
                    if (!isTouchLayout()) setActiveSlug(p.slug)
                  }}
                  aria-expanded={expanded}
                >
                  <span className="pf-row-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pf-row-client">{p.client}</span>
                  <span className="pf-row-title">
                    {p.title}
                    {p.kind ? ` (${p.kind})` : ''}
                  </span>
                  <span className="pf-row-role">{p.role}</span>
                  <span className="pf-row-year">{p.year}</span>
                </button>
                <div className="pf-row-body">
                  <div className="pf-row-inner">
                    {p.media && (
                      <div className="pf-row-media" aria-hidden="true">
                        {p.media.video ? (
                          <video
                            src={p.media.video}
                            poster={p.media.poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : p.media.image ? (
                          <img src={p.media.image} alt="" />
                        ) : null}
                      </div>
                    )}
                    <p className="pf-row-blurb">{p.blurb}</p>
                    <ul className="pf-row-tags" aria-label="Tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {dest && (
                      <span className="pf-row-open" aria-hidden="true">
                        {dest.type === 'page'
                          ? 'Open case study →'
                          : 'Visit project ↗'}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}
