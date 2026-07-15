import { useEffect, useRef, useState } from 'react'
import './App.css'

type SocialLink = {
  label: string
  href: string
  icon: 'twitter' | 'linkedin' | 'github'
}

type Logo = {
  name: string
  /** Optional path to a logo image (e.g. /logos/intel.svg in public/). Falls back to a text wordmark. */
  src?: string
}

const logos: Logo[] = [
  { name: 'Intel', src: '/logos/intel.svg' },
  { name: 'Square', src: '/logos/square.svg' },
  { name: 'PokerStars', src: '/logos/pokerstars.svg' },
  { name: 'Chobani', src: '/logos/chobani.svg' },
  { name: 'Hasbro', src: '/logos/hasbro.svg' },
  { name: 'Lucky VR', src: '/logos/lucky-vr.png' },
  { name: 'Volvo', src: '/logos/volvo.svg' },
  { name: 'DC Comics', src: '/logos/dc.svg' },
  { name: 'Candy Digital', src: '/logos/candy.png' },
  { name: 'WonderMakr', src: '/logos/wondermakr.png' },
  { name: 'Permission', src: '/logos/permission.png' },
]

type Service = {
  id: string
  title: string
  tagline: string
  items: string[]
}

const services: Service[] = [
  {
    id: 'ai',
    title: 'Creative AI Services',
    tagline: 'New tools wired into real workflows',
    items: [
      'Generative media and campaign content',
      'Pipeline and workflow automation for creative teams',
      'Custom tools, websites and apps',
      'AI consulting and enablement',
    ],
  },
  {
    id: 'experiential',
    title: 'Experiential Production',
    tagline: 'Physical moments people step inside',
    items: [
      'Branded experiences and activations',
      'Interactive installations and software integration',
      'Projection mapping and large-format builds',
      'Event production and technical direction',
    ],
  },
  {
    id: 'video',
    title: 'Video & Content Production',
    tagline: 'Stories produced end to end',
    items: [
      'Brand and web video (Square etc.)',
      'Producing, directing and post',
      'Video games and interactive production',
      'Animation and 3D production pipeline management',
      'Generative and AI-assisted media — when it fits the project',
    ],
  },
]

type Project = {
  id: string
  client: string
  logo: string
  logoHeight: string
  title: string
  blurb: string
  /** Role credit shown under the blurb, e.g. "Produced for Mosaic" */
  credit: string
  tags: string[]
  /** Self-hosted video — enables hover preview and click-to-expand modal */
  video?: {
    /** Full-quality MP4 played in the modal */
    src: string
    /** Small muted MP4 looped on card hover */
    preview: string
    poster: string
  }
}

const projects: Project[] = [
  {
    id: 'intel',
    client: 'Intel',
    logo: '/logos/intel.svg',
    logoHeight: '1.6rem',
    title: 'Encore AI Exhibit',
    blurb:
      'Produced an interactive AI art exhibit — projection mapping, custom software and a roster of artists under one roof.',
    credit: 'Produced for Mosaic',
    tags: ['Experiential', 'AI'],
    video: {
      src: '/videos/intel-recap.mp4',
      preview: '/videos/intel-recap-preview.mp4',
      poster: '/videos/intel-recap-poster.jpg',
    },
  },
  {
    id: 'permission',
    client: 'Permission',
    logo: '/logos/permission.png',
    logoHeight: '1.5rem',
    title: 'AI Brand Films',
    blurb:
      'Directed and produced an AI-assisted brand film series — generative pipelines with a human edit.',
    credit: 'Freelance Production',
    tags: ['Video', 'Generative AI'],
    video: {
      src: '/videos/permission-brand.mp4',
      preview: '/videos/permission-brand-preview.mp4',
      poster: '/videos/permission-brand-poster.jpg',
    },
  },
  {
    id: 'dc',
    client: 'DC Comics',
    logo: '/logos/dc.svg',
    logoHeight: '2.2rem',
    title: 'Digital Collectibles',
    blurb:
      'Helped manage flagship digital collectible drops for the DC universe at Palm NFT Studio.',
    credit: 'Produced for Palm (Now Candy)',
    tags: ['Product', 'Web3'],
    video: {
      src: '/videos/dc-batcowl.mp4',
      preview: '/videos/dc-batcowl-preview.mp4',
      poster: '/videos/dc-batcowl-poster.jpg',
    },
  },
  {
    id: 'square',
    client: 'Square',
    logo: '/logos/square.svg',
    logoHeight: '1.5rem',
    title: 'Brand & Web Video',
    blurb:
      'Produced brand and web video for Square — concept through shoot, edit and delivery.',
    credit: 'Produced for Block Inc.',
    tags: ['Video', 'Production'],
    video: {
      src: '/videos/square-brand.mp4',
      preview: '/videos/square-brand-preview.mp4',
      poster: '/videos/square-brand-poster.jpg',
    },
  },
]

type CtrlShiftPhoto = {
  src: string
  alt: string
}

const ctrlShiftPhotos: CtrlShiftPhoto[] = [
  {
    src: '/ctrlshift/talk-1.jpg',
    alt: 'A speaker giving a talk to a packed room lit in green at a CTRL+SHIFT event',
  },
  {
    src: '/ctrlshift/talk-3.jpg',
    alt: 'An AI talk in progress under pink lights at a CTRL+SHIFT event',
  },
  {
    src: '/ctrlshift/talk-4.jpg',
    alt: 'A raffle on stage in a blue-lit room at a CTRL+SHIFT event',
  },
  {
    src: '/ctrlshift/crowd-disco.jpg',
    alt: 'A packed audience under a disco ball at a CTRL+SHIFT event',
  },
]

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

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
        el.classList.add('is-visible')
        window.removeEventListener('scroll', check)
        window.removeEventListener('resize', check)
        return true
      }
      return false
    }

    if (check()) return
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return ref
}

function WorkSection() {
  const ref = useReveal<HTMLElement>()
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [modalProject, setModalProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!modalProject) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalProject(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [modalProject])

  const trackSpotlight = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section
      ref={ref}
      className="work-section reveal-on-scroll"
      aria-label="Featured projects"
    >
      <p className="section-label">Selected work</p>
      <div className="work-grid">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className={`work-card${p.video ? ' has-video' : ''}`}
            onMouseMove={trackSpotlight}
            onMouseEnter={p.video ? () => setPreviewId(p.id) : undefined}
            onMouseLeave={
              p.video
                ? () => setPreviewId((prev) => (prev === p.id ? null : prev))
                : undefined
            }
            onClick={p.video ? () => setModalProject(p) : undefined}
            onKeyDown={
              p.video
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setModalProject(p)
                    }
                  }
                : undefined
            }
            tabIndex={p.video ? 0 : undefined}
            role={p.video ? 'button' : undefined}
            aria-label={
              p.video
                ? `Watch the ${p.client} ${p.title} video`
                : undefined
            }
          >
            {p.video && previewId === p.id && (
              <div className="work-card-video" aria-hidden="true">
                <video
                  src={p.video.preview}
                  poster={p.video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  tabIndex={-1}
                />
              </div>
            )}
            <div className="work-card-top">
              <img
                className="work-logo"
                src={p.logo}
                alt={p.client}
                style={{ height: p.logoHeight }}
              />
              <span className="work-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="work-title">{p.title}</h3>
            <p className="work-blurb">{p.blurb}</p>
            <p className="work-credit">{p.credit}</p>
            <ul className="work-tags" aria-label="Project tags">
              {p.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {p.video && (
              <span className="work-play-hint" aria-hidden="true">
                ▶ Watch
              </span>
            )}
          </article>
        ))}
      </div>

      {modalProject && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalProject.client} — ${modalProject.title}`}
          onClick={() => setModalProject(null)}
        >
          <div
            className="video-modal-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setModalProject(null)}
              aria-label="Close video"
            >
              ✕
            </button>
            {modalProject.video && (
              <video
                src={modalProject.video.src}
                poster={modalProject.video.poster}
                autoPlay
                controls
                playsInline
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function CtrlShiftSection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="ctrlshift-section reveal-on-scroll"
      aria-label="CTRL+SHIFT"
    >
      <p className="section-label">Now building</p>
      <div className="ctrlshift-head">
        <h2 className="ctrlshift-title">CTRL+SHIFT</h2>
        <p className="ctrlshift-copy">
          A community and event series for curious, future-minded creatives —
          talks, screenings and experiments at the intersection of art and
          technology.
        </p>
        <a
          className="services-cta ctrlshift-cta"
          href="https://ctrlshift.community/"
          target="_blank"
          rel="noreferrer"
        >
          <span>ctrlshift.community</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="ctrlshift-gallery">
        {ctrlShiftPhotos.map((photo) => (
          <div key={photo.src} className="ctrlshift-photo">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contact"
      className="contact-section reveal-on-scroll"
      aria-label="Schedule a call"
    >
      <div className="contact-card">
        <div className="contact-photo">
          <img
            src="/ctrlshift/fitc-talk-web.jpg"
            alt="Josh giving a talk on stage at FITC Toronto"
            loading="lazy"
          />
        </div>
        <div className="contact-copy">
          <p className="section-label">Let&rsquo;s talk</p>
          <h2>Got something worth building?</h2>
          <p>
            Experiential builds, films, AI pipelines or something that
            doesn&rsquo;t have a name yet — tell me what you&rsquo;re making
            and we&rsquo;ll figure out the rest on a call.
          </p>
          <a
            className="services-cta"
            href="https://www.linkedin.com/in/joshmaldonado/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Get in touch</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const [active, setActive] = useState(0)
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([])

  const moveFocus = (index: number) => {
    const next = (index + services.length) % services.length
    setActive(next)
    headerRefs.current[next]?.focus()
  }

  const onHeaderKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocus(index + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocus(index - 1)
    }
  }

  return (
    <section id="what-i-do" className="services-section" aria-label="Services">
      <p className="section-label">What I do</p>
      <div className="service-rows">
        {services.map((s, i) => {
          const open = i === active
          return (
            <div key={s.id} className={`service-row${open ? ' is-open' : ''}`}>
              <button
                ref={(el) => {
                  headerRefs.current[i] = el
                }}
                type="button"
                id={`service-header-${s.id}`}
                className="service-row-header"
                aria-expanded={open}
                aria-controls={`service-panel-${s.id}`}
                onClick={() => setActive(i)}
                onKeyDown={(event) => onHeaderKeyDown(event, i)}
              >
                <span className="service-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="service-row-title">{s.title}</span>
                <span className="service-row-arrow" aria-hidden="true">
                  ▹
                </span>
              </button>
              <div
                id={`service-panel-${s.id}`}
                role="region"
                aria-labelledby={`service-header-${s.id}`}
                className="service-row-body"
              >
                <div className="service-row-inner">
                  <p className="service-tagline">{s.tagline}</p>
                  <ul className="service-items">
                    {s.items.map((item, j) => (
                      <li
                        key={item}
                        style={{ animationDelay: `${j * 90 + 120}ms` }}
                      >
                        <span className="service-marker" aria-hidden="true">
                          ▹
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="site-shell">
      <main className="page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Creative Producer & Product Manager</p>
            <div className="hero-title-row">
              <h1 id="hero-title">Josh Maldonado</h1>
              <a
                className="spotify-link"
                href="#playlist"
                aria-label="Listen to my playlist"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02Zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2Zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
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
            <a className="services-cta" href="#what-i-do">
              <span>What I do</span>
              <span className="services-cta-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </section>

        <section className="logo-section" aria-label="Companies I've worked with">
          <p className="section-label">Brands &amp; teams I&rsquo;ve worked with</p>
          <div className="logo-marquee">
            <div className="logo-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="logo-group"
                  aria-hidden={copy === 1 || undefined}
                >
                  {logos.map((logo) => (
                    <span key={logo.name} className="logo-item">
                      {logo.src ? (
                        <img src={logo.src} alt={logo.name} />
                      ) : (
                        logo.name
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection />

        <WorkSection />

        <CtrlShiftSection />

        <ContactSection />

        <section
          id="playlist"
          className="playlist-section"
          aria-label="Spotify playlist"
        >
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
