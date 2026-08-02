export type PortfolioCategory = 'experiential' | 'content' | 'interactive'

export type PortfolioProject = {
  slug: string
  client: string
  title: string
  /** Short parenthetical shown after the title, e.g. "INSTALLATION" */
  kind: string
  category: PortfolioCategory
  tags: string[]
  role: string
  /** Display year — edit freely, shown right-aligned in the row */
  year: string
  /** One-liner shown when a row expands */
  blurb: string
  media?: { video?: string; image?: string; poster?: string }
  /** Extra stills shown as a grid on the case-study page */
  gallery?: string[]
  /** External destination — used when there is no case-study page */
  externalUrl?: string
  /** Present → row opens /portfolio/p/:slug */
  caseStudy?: { intro: string; body: string[] }
}

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  experiential: 'Experiential & Installations',
  content: 'Film, Video & Content',
  interactive: 'Interactive Products & Platforms',
}

export const projects: PortfolioProject[] = [
  // ── EXPERIENTIAL & INSTALLATIONS ────────────────────────────────
  {
    slug: 'intel-ai-art-show',
    client: 'Intel',
    title: 'AI Art Show',
    kind: 'INSTALLATION',
    category: 'experiential',
    tags: ['Experiential', 'AI', 'Generative Media', 'Installation', 'Event Production'],
    role: 'Producer',
    year: '2024',
    blurb:
      'An interactive AI art exhibit for Intel — projection mapping, custom software and a roster of artists under one roof.',
    media: {
      video: '/videos/intel-recap-preview.mp4',
      poster: '/videos/intel-recap-poster.jpg',
    },
    caseStudy: {
      intro:
        'Intel wanted to show what its hardware makes possible for creative work — not on a spec sheet, but in a room people could walk through.',
      body: [
        'I produced the Encore AI Art Show end to end: curating a roster of artists working with generative tools, coordinating custom software builds for each piece, and directing the technical install — projection mapping, interactive stations and show control — inside a single venue.',
        'The result was an exhibit where every piece ran live on Intel hardware, from real-time diffusion installations to interactive projection work, produced on a broadcast-grade timeline with a gallery-grade finish.',
      ],
    },
  },
  {
    slug: 'benq-cdmx-art-show',
    client: 'BenQ',
    title: 'Armonia CDMX Art Show',
    kind: 'INSTALLATION',
    category: 'experiential',
    tags: ['Experiential', 'Installation', 'Art', 'Event Production'],
    role: 'Producer',
    year: '2023',
    blurb:
      'Armonia — a gallery-style art show in Mexico City built around BenQ display hardware and local artists.',
    media: {
      video: '/videos/benq-armonia-preview.mp4',
      poster: '/videos/benq-armonia-poster.jpg',
    },
    caseStudy: {
      intro:
        'BenQ needed its displays to be seen the way artists see them — as canvases, not monitors. Armonia was the answer.',
      body: [
        'I produced Armonia, an art show in Mexico City pairing local artists with BenQ hardware — venue production, artist coordination, and the technical direction of the exhibition build.',
        'The show framed color-accurate displays as part of the work itself, giving the brand a presence in the CDMX creative scene that a product demo never could.',
      ],
    },
  },
  {
    slug: 'reddit-connected-cities',
    client: 'Reddit',
    title: 'Connected Cities',
    kind: 'PROJECTION',
    category: 'experiential',
    tags: ['Experiential', 'Projection', 'Branded Experience', 'Creative Technology'],
    role: 'Producer',
    year: '2025',
    blurb:
      'A projection-driven brand experience connecting Reddit communities across cities.',
    caseStudy: {
      intro:
        'Reddit is a network of communities — Connected Cities made that literal, linking physical locations through synchronized projection.',
      body: [
        'I produced the activation from concept through show nights: large-format projection, site logistics and permits, content pipeline, and the creative-technology build that tied the locations together.',
        'The piece turned Reddit’s abstract community graph into something you could stand inside — live, synchronized and public.',
      ],
    },
  },
  {
    slug: 'chobani-alianza',
    client: 'Chobani',
    title: 'Alianza Soccer Activation',
    kind: 'ACTIVATION',
    category: 'experiential',
    tags: ['Experiential', 'Branded Activation', 'Sports', 'Event Production'],
    role: 'Producer',
    year: '2025',
    blurb:
      'A branded activation for Chobani built around Alianza soccer — live event production at field scale.',
    caseStudy: {
      intro:
        'Chobani came to the pitch — a branded experience produced around Alianza de Futbol events.',
      body: [
        'I produced the on-site activation: build-out, staffing, run-of-show and the brand moments woven through match days.',
        'The activation put the brand inside the ritual of game day rather than beside it, meeting fans at field level.',
      ],
    },
  },
  {
    slug: 'volvo-eaton-centre',
    client: 'Volvo',
    title: 'Eaton Centre Banners',
    kind: 'LARGE FORMAT',
    category: 'experiential',
    tags: ['Experiential', 'Installation', 'Large Format', 'Production', 'Fabrication'],
    role: 'Producer',
    year: '2026',
    blurb:
      'The Volvo Cars Safety Standard hung at architectural scale in Toronto’s Eaton Centre — banners, rigging and crash-tested vehicles on the floor below.',
    media: { image: '/volvo/volvo-atrium.jpg' },
    gallery: [
      '/volvo/volvo-atrium.jpg',
      '/volvo/volvo-banners.jpg',
      '/volvo/volvo-signage.jpg',
      '/volvo/volvo-detail.jpg',
    ],
    caseStudy: {
      intro:
        'Volvo’s safety record is a number nobody feels. In the Eaton Centre atrium, we made it something you had to crane your neck at.',
      body: [
        'The campaign suspended the Volvo Cars Safety Standard above Toronto’s busiest retail floor: a red banner marked 7, flanked by black banners marked 4. Volvo tests front crashes at energy equivalent to dropping a car from the seventh floor — the industry standard stops at the fourth. The comparison only lands at full height, which is why it was built as a multi-storey install rather than a poster.',
        'I produced the build — large-format fabrication, rigging and structural approvals for suspending from the atrium truss, and the overnight install windows the centre requires. On the floor below, crash-tested vehicles from the Volvo Safety Centre sat with their test placards still attached, so the claim overhead had physical evidence underneath it.',
      ],
    },
  },

  // ── FILM, VIDEO & CONTENT ───────────────────────────────────────
  {
    slug: 'square-brand-video',
    client: 'Square',
    title: 'Brand & Web Video',
    kind: 'BRANDED CONTENT',
    category: 'content',
    tags: ['Video', 'Branded Content', 'Production', 'Live Action'],
    role: 'Producer — Block Inc.',
    year: '2026',
    blurb:
      'Brand and web video for Square — concept through shoot, edit and delivery.',
    media: {
      video: '/videos/square-brand-preview.mp4',
      poster: '/videos/square-brand-poster.jpg',
    },
    caseStudy: {
      intro:
        'Square’s products live or die on clarity — the films had to feel as effortless as the checkout.',
      body: [
        'I produced brand and web video for Square inside Block Inc. — concepting with the brand team, running live-action shoots, and carrying the edits through post and delivery.',
        'The work shipped across web and campaign placements, built to make complex commerce tools feel simple in under a minute.',
      ],
    },
  },
  {
    slug: 'ambition',
    client: 'Ambition',
    title: 'Brand Video',
    kind: 'BRANDED CONTENT',
    category: 'content',
    tags: ['Video', 'Branded Content', 'Marketing'],
    role: 'Producer',
    year: '2026',
    blurb: 'Branded marketing video for Ambition.',
  },
  {
    slug: 'permission-ai-product-videos',
    client: 'Permission',
    title: 'AI Product Videos',
    kind: 'PRODUCT VIDEO',
    category: 'content',
    tags: ['Video', 'AI', 'Product Video', 'Remotion', 'Creative Automation'],
    role: 'Freelance Production',
    year: '2026',
    blurb:
      'A product video series built on a generative pipeline — Remotion code-driven edit with AI-assisted media.',
    media: {
      video: '/videos/permission-brand-preview.mp4',
      poster: '/videos/permission-brand-poster.jpg',
    },
    caseStudy: {
      intro:
        'Permission needed a video series that could iterate at the speed of its product — so the edit became code.',
      body: [
        'I directed and produced a series of AI product films using a Remotion pipeline: layouts, motion and versioning generated programmatically, with AI-assisted footage where it served the story and a human edit throughout.',
        'Because the system is code, new cuts — new aspect ratios, new messaging, new platforms — render in minutes instead of re-editing for days.',
      ],
    },
  },
  {
    slug: 'reddit-product-demos',
    client: 'Reddit',
    title: 'Product Demo Videos',
    kind: 'PRODUCT DEMO',
    category: 'content',
    tags: ['Video', 'AI', 'Product Demo', 'Remotion', 'Creative Automation'],
    role: 'Producer',
    year: '2025',
    blurb:
      'Programmatic product demo videos for Reddit — a Remotion pipeline that turns product flows into finished cuts.',
    caseStudy: {
      intro:
        'Product demos age the moment the UI changes. For Reddit, the fix was a demo pipeline that re-renders instead of re-shoots.',
      body: [
        'I produced a Remotion-based system for Reddit product demo videos: screens, motion and narrative beats defined in code, so every product update meant a re-render rather than a new edit.',
        'AI-assisted generation handled variants and localization, keeping a growing library of demos current without a growing production bill.',
      ],
    },
  },
  {
    slug: 'ctrlshift-brand-content',
    client: 'CTRL+SHIFT',
    title: 'Brand Content Demo',
    kind: 'BRANDED CONTENT',
    category: 'content',
    tags: ['Video', 'Branded Content', 'Marketing'],
    role: 'Founder / Producer',
    year: '2026',
    blurb:
      'Brand content for CTRL+SHIFT — the creative-tech community I’m building in Toronto.',
    media: {
      video: '/videos/ctrlshift-demo-preview.mp4',
      poster: '/videos/ctrlshift-demo-poster.jpg',
    },
    caseStudy: {
      intro:
        'CTRL+SHIFT is my own brand — a Toronto community for curious, future-minded creatives — and its content is produced in-house.',
      body: [
        'I produce the brand’s content system end to end: event films, social cuts and the visual identity that carries a packed-room feeling onto a feed.',
        'It doubles as a lab — formats and pipelines get tested on CTRL+SHIFT first, then graduate into client work.',
      ],
    },
  },
  {
    slug: 'synthetic-character',
    client: 'R&D',
    title: 'Synthetic Character Experiment',
    kind: 'AI EXPERIMENT',
    category: 'content',
    tags: ['AI', 'Generative Media', 'Virtual Character', 'Content Experiment'],
    role: 'Creator',
    year: '2026',
    blurb:
      'A generative-media experiment: a consistent synthetic character performing across formats — native-audio generation with an ElevenLabs voice clone for vocal consistency.',
    media: {
      video: '/videos/synthetic-character-preview.mp4',
      poster: '/videos/synthetic-character-poster.jpg',
    },
  },

  // ── INTERACTIVE PRODUCTS & PLATFORMS ────────────────────────────
  {
    slug: 'dc-digital-collectibles',
    client: 'DC Comics',
    title: 'Digital Collectibles',
    kind: 'WEB3 PRODUCT',
    category: 'interactive',
    tags: ['Interactive', 'Digital Collectibles', 'Web3', 'Product'],
    role: 'Producer — Palm NFT Studio',
    year: '2022',
    blurb:
      'Flagship digital collectible drops for the DC universe, delivered at Palm NFT Studio (now Candy).',
    media: {
      video: '/videos/dc-batcowl-preview.mp4',
      poster: '/videos/dc-batcowl-poster.jpg',
    },
    externalUrl:
      'https://www.dc.com/blog/2024/03/08/the-legacy-cowls-collection-a-new-dc-digital-collectible-experience-to-launch-march-29-2024',
  },
  {
    slug: 'transpose-vr',
    client: 'Secret Location',
    title: 'Transpose VR',
    kind: 'VR TITLE',
    category: 'interactive',
    tags: ['Interactive', 'VR', 'Product', 'Games'],
    role: 'Producer',
    year: '2018',
    blurb:
      'A body-swapping VR puzzle experience — record and layer clones of yourself to solve impossible spaces.',
    media: {
      video: '/videos/transpose-preview.mp4',
      poster: '/videos/transpose-poster.jpg',
    },
    externalUrl: 'https://store.steampowered.com/app/835950/Transpose/',
  },
  {
    slug: 'blasters-of-the-universe',
    client: 'Secret Location',
    title: 'Blasters of the Universe',
    kind: 'VR GAME',
    category: 'interactive',
    tags: ['Interactive', 'VR', 'Gaming'],
    role: 'Producer',
    year: '2018',
    blurb:
      'A bullet-hell VR shooter — dodge, weave and build your own blaster inside an 80s arcade fever dream.',
    media: {
      video: '/videos/blasters-preview.mp4',
      poster: '/videos/blasters-poster.jpg',
    },
    externalUrl:
      'https://store.steampowered.com/app/490490/Blasters_of_the_Universe/',
  },
  {
    slug: 'vegas-infinite',
    client: 'PokerStars',
    title: 'Vegas Infinite',
    kind: 'LIVE PRODUCT',
    category: 'interactive',
    tags: ['Interactive', 'VR', 'Gaming', 'Live Product'],
    role: 'Senior Producer — Lucky VR',
    year: '2025',
    blurb:
      'The live social-casino world by PokerStars — I lead cross-functional teams building its avatar system.',
    media: {
      video: '/videos/vegas-infinite-preview.mp4',
      poster: '/videos/vegas-infinite-poster.jpg',
    },
    externalUrl: 'https://www.vegasinfinite.com/',
  },
  {
    slug: 'mealscanner',
    client: 'MealScanner',
    title: 'MealScanner',
    kind: 'MOBILE APP',
    category: 'interactive',
    tags: ['Interactive', 'AI', 'Mobile', 'Product Design', 'Computer Vision'],
    role: 'Product Designer / Builder',
    year: '2025',
    blurb:
      'A computer-vision mobile app that turns a photo of your plate into nutritional insight.',
    media: {
      video: '/videos/mealscanner-preview.mp4',
      poster: '/videos/mealscanner-poster.jpg',
    },
    externalUrl: 'https://mealscanner.app',
  },
]
