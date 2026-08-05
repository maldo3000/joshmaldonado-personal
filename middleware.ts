import { docForPath, isCrawlerRequest } from './src/seo/ogMeta'

// Vercel Edge Middleware: framework-agnostic, matched by config.matcher.
// Returning nothing lets the request continue to the normal SPA/rewrite;
// returning a Response short-circuits it. Only link-preview crawlers hit
// the branch below — real browsers always get the untouched app.
export const config = {
  matcher: ['/notes', '/notes/:path*'],
}

export default function middleware(request: Request) {
  if (!isCrawlerRequest(request.headers.get('user-agent'))) return

  const { pathname } = new URL(request.url)
  const doc = docForPath(pathname)
  if (!doc) return

  return new Response(doc, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
