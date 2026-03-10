import './App.css'

type SocialLink = {
  label: string
  href: string
  icon: 'twitter' | 'linkedin' | 'github'
}

const socialLinks: SocialLink[] = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/josh_maldonado',
    icon: 'twitter',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joshmaldonado/',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/maldo3000',
    icon: 'github',
  },
]

function SocialIcon({ icon }: Pick<SocialLink, 'icon'>) {
  switch (icon) {
    case 'twitter':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="social-icon"
          focusable="false"
        >
          <path
            d="M18.9 7.2c.8-.1 1.5-.5 2.1-1.1-.3.8-.9 1.5-1.7 1.9v.5c0 5.1-3.9 11-11 11-2.1 0-4-.6-5.7-1.6.3 0 .7.1 1 .1 1.8 0 3.5-.6 4.9-1.7-1.7 0-3.1-1.1-3.6-2.7.2 0 .5.1.8.1.4 0 .7 0 1-.1-1.8-.4-3.1-2-3.1-3.9v-.1c.5.3 1.2.5 1.8.5-1-.7-1.7-1.9-1.7-3.2 0-.7.2-1.4.6-2 2 2.5 5 4.1 8.4 4.3-.1-.3-.1-.6-.1-.9 0-2.1 1.7-3.8 3.8-3.8 1.1 0 2.1.5 2.8 1.2Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'linkedin':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="social-icon"
          focusable="false"
        >
          <path
            d="M6.8 8.3a1.8 1.8 0 1 1 0-3.5 1.8 1.8 0 0 1 0 3.5ZM5.2 9.7h3.1V19H5.2V9.7Zm5 0h3v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3.1v-4.3c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V19h-3.1V9.7Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'github':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="social-icon"
          focusable="false"
        >
          <path
            d="M12 2.5a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5V19c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-5A3.9 3.9 0 0 1 7.6 8c-.1-.2-.4-1.3.1-2.7 0 0 .8-.2 2.7 1a9.1 9.1 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7a4 4 0 0 1 1.1 2.8c0 3.9-2.3 4.8-4.5 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.5Z"
            fill="currentColor"
          />
        </svg>
      )
  }
}

function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <main className="page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Creative Producer & Product Manager</p>
            <h1 id="hero-title">Josh Maldonado</h1>
            <p className="intro">
              Creative Producer & Product Manager // currently building a
              platform for curious, future-minded creatives @{' '}
              <a
                className="inline-highlight-link"
                href="https://ctrlshift.community/"
                target="_blank"
                rel="noreferrer"
              >
                CTRL+SHIFT
              </a>
            </p>
            <p className="bio">
              I like to understand technology conceptually and
              philosophically as it relates to creativity and expanding the
              potential for human progress and actualization. I also love God,
              music and exploring new places.
            </p>
          </div>

          <nav className="socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="social-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <SocialIcon icon={link.icon} />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </section>

        <section className="playlist-section" aria-label="Spotify playlist">
          <div className="playlist-frame">
            <iframe
              data-testid="spotify-embed"
              style={{ borderRadius: '20px' }}
              src="https://open.spotify.com/embed/playlist/6prwUOb3iSRibVeovvwCei?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify playlist: maldo fm"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
