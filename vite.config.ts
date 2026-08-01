import react from '@vitejs/plugin-react'
import type { Connect, Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import {
  COOKIE_NAME,
  parseCookies,
  passwordIsCorrect,
  sessionCookie,
  sessionToken,
  tokenIsValid,
} from './api/_lib/auth'
import { CATEGORY_LABELS, projects } from './api/_lib/projects'

/**
 * Dev-only mirror of the Vercel serverless endpoints in /api so the
 * password-protected portfolio works under `vite dev`. Production uses the
 * real functions; this plugin never ships in the build output.
 */
function portfolioDevApi(): Plugin {
  const readBody = (req: Connect.IncomingMessage): Promise<string> =>
    new Promise((resolve) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => resolve(body))
    })

  return {
    name: 'portfolio-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/portfolio/login', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        let password: unknown
        try {
          password = JSON.parse(await readBody(req)).password
        } catch {
          password = undefined
        }
        if (!passwordIsCorrect(password)) {
          res.statusCode = 401
          res.end(JSON.stringify({ error: 'Incorrect password' }))
          return
        }
        const token = sessionToken()
        if (!token) {
          res.statusCode = 500
          res.end(
            JSON.stringify({ error: 'Portfolio password is not configured' })
          )
          return
        }
        res.setHeader('Set-Cookie', sessionCookie(token, false))
        res.end(JSON.stringify({ ok: true }))
      })

      server.middlewares.use('/api/portfolio/data', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const cookies = parseCookies(req.headers.cookie)
        if (!tokenIsValid(cookies[COOKIE_NAME])) {
          res.statusCode = 401
          res.end(JSON.stringify({ error: 'Not authenticated' }))
          return
        }
        res.end(JSON.stringify({ projects, categoryLabels: CATEGORY_LABELS }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.PORTFOLIO_PASSWORD) {
    process.env.PORTFOLIO_PASSWORD = env.PORTFOLIO_PASSWORD
  }
  return {
    plugins: [react(), portfolioDevApi()],
  }
})
