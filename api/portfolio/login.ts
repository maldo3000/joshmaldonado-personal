import type { VercelRequest, VercelResponse } from '@vercel/node'
// NB: package.json sets "type": "module", so relative imports need explicit
// extensions or the deployed function crashes with ERR_MODULE_NOT_FOUND.
import { passwordIsCorrect, sessionCookie, sessionToken } from '../_lib/auth.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const password =
    req.body && typeof req.body === 'object'
      ? (req.body as Record<string, unknown>).password
      : undefined
  if (!passwordIsCorrect(password)) {
    res.status(401).json({ error: 'Incorrect password' })
    return
  }
  const token = sessionToken()
  if (!token) {
    res.status(500).json({ error: 'Portfolio password is not configured' })
    return
  }
  res.setHeader('Set-Cookie', sessionCookie(token, true))
  res.status(200).json({ ok: true })
}
