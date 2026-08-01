import { createHmac, timingSafeEqual } from 'node:crypto'

export const COOKIE_NAME = 'pf_session'

function configuredPassword(): string | null {
  const pw = process.env.PORTFOLIO_PASSWORD
  return pw && pw.length > 0 ? pw : null
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

/** Session token derived from the password — stateless across serverless instances. */
export function sessionToken(): string | null {
  const pw = configuredPassword()
  if (!pw) return null
  return createHmac('sha256', `pf-v1:${pw}`)
    .update('portfolio-session')
    .digest('hex')
}

export function passwordIsCorrect(input: unknown): boolean {
  const pw = configuredPassword()
  return typeof input === 'string' && pw !== null && safeEqual(input, pw)
}

export function tokenIsValid(token: string | undefined): boolean {
  const expected = sessionToken()
  return !!token && expected !== null && safeEqual(token, expected)
}

export function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    out[part.slice(0, eq).trim()] = decodeURIComponent(part.slice(eq + 1).trim())
  }
  return out
}

export function sessionCookie(token: string, secure: boolean): string {
  const attrs = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (secure) attrs.push('Secure')
  return attrs.join('; ')
}
