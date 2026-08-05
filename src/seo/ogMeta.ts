import { formatNoteDate, notes, type Note } from '../notes/notes'

export const SITE_URL = 'https://www.joshmaldonado.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

/**
 * Link-preview generators (iMessage, Slack, Twitter/X, Discord, LinkedIn,
 * Facebook, WhatsApp, Telegram…) fetch a URL and read the <head> of the raw
 * HTML — none of them execute the client bundle that sets document.title.
 * Matching a request's User-Agent against this list is how we tell "a
 * crawler building a preview card" apart from "a browser rendering the app"
 * so only the former gets a server-rendered meta document.
 */
const CRAWLER_UA_PATTERN =
  /facebookexternalhit|Facebot|Twitterbot|Slackbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|SkypeUriPreview|redditbot|Pinterest(?:bot)?|vkShare|Applebot|Googlebot|bingbot|DuckDuckBot|iMessage/i

export function isCrawlerRequest(userAgent: string | null | undefined): boolean {
  return !!userAgent && CRAWLER_UA_PATTERN.test(userAgent)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

type MetaDoc = {
  title: string
  description: string
  image: string
  url: string
  bodyHtml: string
}

function renderDoc({ title, description, image, url, bodyHtml }: MetaDoc): string {
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="${url}" />
    <title>${t}</title>
    <meta name="description" content="${d}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${image}" />
  </head>
  <body>
    ${bodyHtml}
  </body>
</html>
`
}

export function buildNoteDoc(note: Note): string {
  const url = `${SITE_URL}/notes/${note.slug}`
  return renderDoc({
    title: `${note.title} — Josh Maldonado`,
    description: note.dek,
    image: note.ogImage ? `${SITE_URL}${note.ogImage}` : DEFAULT_OG_IMAGE,
    url,
    bodyHtml: `<h1>${escapeHtml(note.title)}</h1>
    <p>${escapeHtml(note.dek)}</p>
    <p>${escapeHtml(formatNoteDate(note.date))} · ${escapeHtml(note.readingTime)} read</p>
    <p><a href="${url}">Read on joshmaldonado.com →</a></p>`,
  })
}

export function buildNotesIndexDoc(): string {
  const url = `${SITE_URL}/notes`
  const items = notes
    .map((n) => `<li><a href="${SITE_URL}/notes/${n.slug}">${escapeHtml(n.title)}</a> — ${escapeHtml(n.dek)}</li>`)
    .join('\n    ')
  return renderDoc({
    title: 'Notes — Josh Maldonado',
    description:
      'Case studies, thoughts and experiments — working notes on production, generative media and the systems underneath the work.',
    image: DEFAULT_OG_IMAGE,
    url,
    bodyHtml: `<h1>Notes</h1>
    <ul>
    ${items}
    </ul>`,
  })
}

/** Resolves a request path to the crafted document a crawler should see, or
 *  null if the path isn't one we serve custom meta for (caller should fall
 *  through to the normal app in that case). */
export function docForPath(pathname: string): string | null {
  if (pathname === '/notes' || pathname === '/notes/') return buildNotesIndexDoc()
  const match = pathname.match(/^\/notes\/([^/]+)\/?$/)
  if (match) {
    const note = notes.find((n) => n.slug === match[1])
    if (note) return buildNoteDoc(note)
  }
  return null
}
