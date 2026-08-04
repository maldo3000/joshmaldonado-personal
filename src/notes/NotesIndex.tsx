import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatNoteDate, notes } from './notes'
import './notes.css'

export default function NotesIndex() {
  useEffect(() => {
    document.title = 'Notes — Josh Maldonado'
  }, [])

  return (
    <div className="nt-shell">
      <header className="nt-header">
        <Link className="nt-name" to="/">
          Josh Maldonado
        </Link>
        <Link className="nt-back" to="/">
          ← Home
        </Link>
      </header>

      <main className="nt-index">
        <p className="nt-eyebrow">Notes</p>
        <h1 className="nt-index-title">
          Case studies, thoughts and experiments
        </h1>
        <p className="nt-index-lede">
          Working notes on production, generative media and the systems
          underneath the work.
        </p>

        <ol className="nt-list">
          {notes.map((note, i) => (
            <li key={note.slug}>
              <Link to={`/notes/${note.slug}`}>
                <span className="nt-list-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="nt-list-body">
                  <span className="nt-list-kind">{note.kind}</span>
                  <span className="nt-list-title">{note.title}</span>
                  <span className="nt-list-dek">{note.dek}</span>
                </span>
                <span className="nt-list-meta">
                  {formatNoteDate(note.date)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
