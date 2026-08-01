import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PasswordGate from './PasswordGate'
import { usePortfolio } from './usePortfolio'
import './portfolio.css'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const { state, data, error, login } = usePortfolio()

  const project = data?.projects.find((p) => p.slug === slug) ?? null

  useEffect(() => {
    document.title = project
      ? `${project.client} — ${project.title} — Josh Maldonado`
      : 'Portfolio — Josh Maldonado'
  }, [project])

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
        {project.media && (
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
    </div>
  )
}
