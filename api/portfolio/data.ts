import type { VercelRequest, VercelResponse } from '@vercel/node'
// NB: package.json sets "type": "module", so relative imports need explicit
// extensions or the deployed function crashes with ERR_MODULE_NOT_FOUND.
import { COOKIE_NAME, parseCookies, tokenIsValid } from '../_lib/auth.js'
import { CATEGORY_LABELS, projects } from '../_lib/projects.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const cookies = parseCookies(req.headers.cookie)
  if (!tokenIsValid(cookies[COOKIE_NAME])) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  res.setHeader('Cache-Control', 'private, no-store')
  res.status(200).json({ projects, categoryLabels: CATEGORY_LABELS })
}
