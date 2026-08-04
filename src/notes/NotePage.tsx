import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findNote, formatNoteDate } from './notes'
import './notes.css'

export default function NotePage() {
  const { slug } = useParams()
  const note = findNote(slug)

  useEffect(() => {
    document.title = note
      ? `${note.title} — Josh Maldonado`
      : 'Notes — Josh Maldonado'
  }, [note])

  if (!note) {
    return (
      <div className="nt-shell">
        <main className="nt-article nt-missing">
          <p>That note doesn&rsquo;t exist (or moved).</p>
          <Link className="nt-back" to="/notes">
            ← All notes
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="nt-shell">
      <header className="nt-header">
        <Link className="nt-name" to="/">
          Josh Maldonado
        </Link>
        <Link className="nt-back" to="/notes">
          ← Notes
        </Link>
      </header>

      <article className="nt-article">
        <p className="nt-eyebrow">{note.kind}</p>
        <h1 className="nt-title">{note.title}</h1>
        <p className="nt-dek">{note.dek}</p>
        <p className="nt-meta">
          {formatNoteDate(note.date)} · {note.readingTime} read
        </p>

        <div className="nt-body">
          {note.blocks.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i}>{block.text}</h2>
            }
            if (block.type === 'pull') {
              return (
                <p key={i} className="nt-pull">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'sequence') {
              return (
                <section key={i} className="nt-sequence">
                  <p className="nt-sequence-label">{block.label}</p>
                  <ol>
                    {block.steps.map((step, s) => (
                      <li key={step.tool}>
                        <span className="nt-seq-num">
                          {String(s + 1).padStart(2, '0')}
                        </span>
                        <span className="nt-seq-tool">{step.tool}</span>
                        <span className="nt-seq-desc">{step.description}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )
            }
            if (block.type === 'media') {
              return (
                <figure
                  key={i}
                  className={`nt-figure nt-figure--${block.orientation ?? 'horizontal'}`}
                >
                  <video
                    src={block.video}
                    poster={block.poster}
                    controls
                    playsInline
                    preload="metadata"
                  />
                  <figcaption>{block.caption}</figcaption>
                </figure>
              )
            }
            return <p key={i}>{block.text}</p>
          })}
        </div>

        <footer className="nt-footer">
          <Link className="nt-back" to="/notes">
            ← All notes
          </Link>
          <a
            className="nt-contact"
            href="https://www.linkedin.com/in/joshmaldonado/"
            target="_blank"
            rel="noreferrer"
          >
            Get in touch ↗
          </a>
        </footer>
      </article>
    </div>
  )
}
