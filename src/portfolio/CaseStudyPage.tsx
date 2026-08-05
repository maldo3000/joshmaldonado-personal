import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PasswordGate from './PasswordGate'
import { usePortfolio } from './usePortfolio'
import './portfolio.css'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const { state, data, error, login } = usePortfolio()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })

  // Only hint in a direction that actually has more to show.
  const syncScrollHints = useCallback(() => {
    const el = stripRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanScroll({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 })
  }, [])

  const nudgeStrip = (direction: 1 | -1) => {
    const el = stripRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const project = data?.projects.find((p) => p.slug === slug) ?? null
  const gallery = project?.gallery
  const films = project?.films ?? []
  const [leadFilm, ...restFilms] = films

  useEffect(() => {
    document.title = project
      ? `${project.client} — ${project.title} — Josh Maldonado`
      : 'Portfolio — Josh Maldonado'
  }, [project])

  useEffect(() => {
    if (lightbox === null || !gallery) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight')
        setLightbox((i) => ((i ?? 0) + 1) % gallery.length)
      if (event.key === 'ArrowLeft')
        setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightbox, gallery])

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    syncScrollHints()
    el.addEventListener('scroll', syncScrollHints, { passive: true })
    window.addEventListener('resize', syncScrollHints)
    return () => {
      el.removeEventListener('scroll', syncScrollHints)
      window.removeEventListener('resize', syncScrollHints)
    }
  }, [syncScrollHints, gallery])

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

  if (!project) {
    return (
      <div className="pf-shell">
        <div className="pf-case pf-case-missing">
          <p>This project doesn&rsquo;t exist (or moved).</p>
          <Link className="pf-back" to="/portfolio">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pf-shell">
      <header className="pf-header">
        <Link className="pf-name" to="/">
          Josh Maldonado
        </Link>
        <Link className="pf-back" to="/portfolio">
          ← Portfolio
        </Link>
      </header>

      <main className="pf-case">
        <p className="pf-case-client">{project.client}</p>
        <h1 className="pf-case-title">{project.title}</h1>
        <p className="pf-case-meta">
          {project.role}
          {project.year ? ` · ${project.year}` : ''}
        </p>
        <ul className="pf-row-tags pf-case-tags" aria-label="Tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {/* One film leads, the copy follows, the rest of the series sits
            under it. A gallery stands in when there's no film, since a 16:9
            crop would cut portrait stills apart. */}
        {leadFilm ? (
          <div className="pf-case-films">
            <figure
              className={`pf-case-player pf-case-player--${leadFilm.orientation ?? 'horizontal'}`}
            >
              <video
                src={leadFilm.video}
                poster={leadFilm.poster}
                controls
                playsInline
                preload="metadata"
              />
              {leadFilm.caption && <figcaption>{leadFilm.caption}</figcaption>}
            </figure>
          </div>
        ) : gallery ? (
          <div
            className={`pf-case-strip${canScroll.left ? ' can-left' : ''}${canScroll.right ? ' can-right' : ''}`}
          >
            <div className="pf-case-gallery" ref={stripRef}>
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Expand image ${i + 1} of ${gallery.length}`}
                >
                  {/* Not lazy: the gallery is this page's lead visual, and an
                      unloaded auto-height image collapses to nothing. */}
                  <img src={src} alt="" onLoad={syncScrollHints} />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="pf-strip-nav pf-strip-nav--left"
              onClick={() => nudgeStrip(-1)}
              aria-label="Scroll images left"
              tabIndex={canScroll.left ? 0 : -1}
            >
              ‹
            </button>
            <button
              type="button"
              className="pf-strip-nav pf-strip-nav--right"
              onClick={() => nudgeStrip(1)}
              aria-label="Scroll images right"
              tabIndex={canScroll.right ? 0 : -1}
            >
              ›
            </button>
          </div>
        ) : (
          project.media && (
            <div className="pf-case-hero">
              {project.media.video ? (
                <video
                  src={project.media.video}
                  poster={project.media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : project.media.image ? (
                <img src={project.media.image} alt="" />
              ) : null}
            </div>
          )
        )}

        {project.caseStudy ? (
          <div className="pf-case-body">
            <p className="pf-case-intro">{project.caseStudy.intro}</p>
            {project.caseStudy.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="pf-case-body">
            <p className="pf-case-intro">{project.blurb}</p>
          </div>
        )}

        {restFilms.length > 0 && (
          <div className="pf-case-films pf-case-films--rest">
            {restFilms.map((film) => (
              <figure
                key={film.video}
                className={`pf-case-player pf-case-player--${film.orientation ?? 'horizontal'}`}
              >
                <video
                  src={film.video}
                  poster={film.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
                {film.caption && <figcaption>{film.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {project.workflow && (
          <section className="pf-case-workflow" aria-label="Workflow">
            <p className="pf-case-workflow-label">How it was built</p>
            <ol>
              {project.workflow.map((step, i) => (
                <li key={step.tool}>
                  <span className="pf-workflow-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pf-workflow-tool">{step.tool}</span>
                  <span className="pf-workflow-desc">{step.description}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.externalUrl && (
          <a
            className="pf-case-link"
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit project ↗
          </a>
        )}
      </main>

      {gallery && lightbox !== null && (
        <div
          className="pf-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="pf-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
          >
            ✕
          </button>
          <img
            src={gallery[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          {gallery.length > 1 && (
            <p className="pf-lightbox-count">
              {lightbox + 1} / {gallery.length}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
