import { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  error: string
  onSubmit: (password: string) => Promise<void>
}

export default function PasswordGate({ error, onSubmit }: Props) {
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="pf-gate">
      <Link className="pf-gate-home" to="/">
        Josh Maldonado
      </Link>
      <form
        className="pf-gate-form"
        onSubmit={async (event) => {
          event.preventDefault()
          if (!password || busy) return
          setBusy(true)
          await onSubmit(password)
          setBusy(false)
        }}
      >
        <p className="pf-gate-label">Private portfolio</p>
        <h1>Enter password</h1>
        <div className="pf-gate-row">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            aria-label="Portfolio password"
            autoFocus
          />
          <button type="submit" disabled={busy || !password}>
            {busy ? '…' : '→'}
          </button>
        </div>
        {error && <p className="pf-gate-error">{error}</p>}
        <p className="pf-gate-hint">
          Don&rsquo;t have the password?{' '}
          <a
            href="https://www.linkedin.com/in/joshmaldonado/"
            target="_blank"
            rel="noreferrer"
          >
            Ask me for access
          </a>
          .
        </p>
      </form>
    </div>
  )
}
