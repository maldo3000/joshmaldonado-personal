import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PasswordGate from './PasswordGate'
import { usePortfolio } from './usePortfolio'
import './portfolio.css'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const { state, data, error, login } = usePortfolio()
  const [lightbox, setLightbox] = useState<number | null>(null)

  const project = data?.projects.find((p) => p.slug === slug) ?? null
  const gallery = project?.gallery

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
        {/* A gallery stands in for the hero — these stills are portrait and a
            16:9 hero crop would cut the subject out. */}
        {gallery ? (
          <div className="pf-case-gallery">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Expand image ${i + 1} of ${gallery.length}`}
              >
                {/* Not lazy: the gallery is this page's lead visual, and an
                    unloaded auto-height image collapses to nothing. */}
                <img src={src} alt="" />
              </button>
            ))}
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
