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
import { docForPath, isCrawlerRequest } from './src/seo/ogMeta'

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
        // Match the production function, and keep edits to the project data
        // from being masked by a cached dev response.
        res.setHeader('Cache-Control', 'private, no-store')
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

/**
 * Dev-only mirror of middleware.ts (the Vercel Edge Middleware that serves
 * crawlers a server-rendered meta document for /notes routes). Vite's dev
 * server never runs the real edge middleware, so without this the behavior
 * is unverifiable until a real deploy — mirroring the same docForPath /
 * isCrawlerRequest logic lets `curl -A "Slackbot" localhost:5173/notes/...`
 * prove it locally.
 */
function notesOgDevMiddleware(): Plugin {
  return {
    name: 'notes-og-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!isCrawlerRequest(req.headers['user-agent'])) return next()
        const pathname = (req.url ?? '').split('?')[0]
        const doc = docForPath(pathname)
        if (!doc) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(doc)
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
    plugins: [react(), portfolioDevApi(), notesOgDevMiddleware()],
  }
})
