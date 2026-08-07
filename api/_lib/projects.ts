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
  /** Full cuts with sound, played with controls on the case-study page.
   *  A list so a series can show more than one. */
  films?: {
    video: string
    poster?: string
    orientation?: 'vertical' | 'horizontal'
    /** Optional line under the player */
    caption?: string
  }[]
  /** Tool-by-tool build breakdown, listed under the case study */
  workflow?: { tool: string; description: string }[]
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
    media: {
      video: '/videos/reddit-arcadia-preview.mp4',
      poster: '/videos/reddit-arcadia-poster.jpg',
    },
    films: [
      {
        video: '/videos/reddit-arcadia.mp4',
        poster: '/videos/reddit-arcadia-poster.jpg',
        orientation: 'horizontal',
      },
    ],
    gallery: [
      '/notes/immersive/reddit-garden.jpg',
      '/notes/immersive/reddit-garden-detail.jpg',
      '/notes/immersive/reddit-arch.jpg',
      '/notes/immersive/reddit-airport.jpg',
      '/notes/immersive/reddit-trends.jpg',
      '/notes/immersive/reddit-stage.jpg',
      '/notes/immersive/reddit-city.jpg',
      '/notes/immersive/reddit-snoo.jpg',
    ],
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
      'A touring Chobani footprint built around soccer — modular canopy, skills challenge and sampling carts, dropped into match days and street festivals.',
    media: { image: '/chobani/chobani-goal.jpg' },
    gallery: [
      '/chobani/chobani-goal.jpg',
      '/chobani/chobani-street.jpg',
      '/chobani/chobani-skills.jpg',
      '/chobani/chobani-carts.jpg',
      '/chobani/chobani-crowd.jpg',
    ],
    caseStudy: {
      intro:
        'Chobani came to the pitch — a footprint that had to read as a destination from across a parking lot, then pack down and do it again in the next market.',
      body: [
        'I produced the activation build and its tour: modular branded canopies, a “Gooooooal” wall and skills challenge clocked by a speed radar, sampling carts, and turf laid over asphalt to turn a lot into a field. Everything was designed to break down, travel and rebuild on a run-of-show.',
        'The same kit flexed to its setting — a full pitch-side build on match days, a compact street-festival footprint elsewhere — so the brand met fans inside the ritual of game day rather than beside it.',
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
    client: 'Ambition Labs',
    title: 'Catalyst',
    kind: 'BRANDED CONTENT',
    category: 'content',
    tags: ['Video', 'Branded Content', 'Marketing'],
    role: 'Producer',
    year: '2026',
    blurb:
      'Catalyst for Ambition Labs — a long-form brand film, cut down to a vertical social edit.',
    media: {
      video: '/videos/ambition-catalyst-preview.mp4',
      poster: '/videos/ambition-catalyst-poster.jpg',
    },
    films: [
      {
        video: '/videos/ambition-catalyst.mp4',
        poster: '/videos/ambition-catalyst-poster.jpg',
        orientation: 'horizontal',
        caption: 'Catalyst — the full film.',
      },
      {
        video: '/videos/ambition-social.mp4',
        poster: '/videos/ambition-social-poster.jpg',
        orientation: 'vertical',
        caption: 'The social cut, recut vertical for feeds.',
      },
    ],
    caseStudy: {
      intro:
        'Catalyst is Ambition Labs’ brand film — the long version made to be watched, and a vertical cut made to be scrolled past and stop someone anyway.',
      body: [
        'I produced the piece from concept through delivery, then oversaw the social edit that carries the same story at a fraction of the runtime.',
      ],
    },
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
      'A four-part product video series built on a generative pipeline — Remotion code-driven edit with AI-assisted media, including a vertical social cut re-rendered from the same components.',
    media: {
      video: '/videos/permission-brand-preview.mp4',
      poster: '/videos/permission-brand-poster.jpg',
    },
    films: [
      {
        video: '/videos/permission-brand.mp4',
        poster: '/videos/permission-brand-poster.jpg',
        orientation: 'horizontal',
        caption: 'Brand intro.',
      },
      {
        video: '/videos/permission-why-ai.mp4',
        poster: '/videos/permission-why-ai-poster.jpg',
        orientation: 'horizontal',
        caption: 'Why AI for the family.',
      },
      {
        video: '/videos/permission-brand-02.mp4',
        poster: '/videos/permission-brand-02-poster.jpg',
        orientation: 'horizontal',
        caption: 'Get started.',
      },
      {
        video: '/videos/permission-social-cut.mp4',
        poster: '/videos/permission-social-cut-poster.jpg',
        orientation: 'vertical',
        caption:
          'Social cut — the same components re-rendered vertical for feeds, not re-edited.',
      },
    ],
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
      'Static PDF decks turned into a library of motion pieces for an Arcadia Earth activation — a programmatic pipeline built to beat an impossible turnaround.',
    media: {
      video: '/videos/reddit-demos-preview.mp4',
      poster: '/videos/reddit-demos-poster.jpg',
    },
    films: [
      {
        video: '/videos/reddit-demos.mp4',
        poster: '/videos/reddit-demos-poster.jpg',
        orientation: 'horizontal',
      },
    ],
    caseStudy: {
      intro:
        'The brief arrived as PDF presentations and had to leave as motion — in every size the Arcadia Earth activation called for, on a timeline that ruled out animating them one at a time.',
      body: [
        'Rather than treat each deck as a separate edit, I built the work as a system. A programmatic video library made the layouts code instead of timelines, and an agentic workflow using Claude did the groundwork of pulling the brand’s assets out of those static PDFs and standardizing them into components the pipeline could compose.',
        'Once that foundation existed, volume stopped being the constraint. Every new format was a render rather than a rebuild, so the activation got a full library of correctly-sized videos in the window a handful of hand-animated cuts would have taken.',
      ],
    },
  },
  {
    slug: 'ctrlshift-brand-content',
    client: 'CTRL+SHIFT',
    title: 'Doing It Right',
    kind: 'AI IN BRAND MARKETING',
    category: 'content',
    tags: ['Video', 'AI', 'Branded Content', 'Generative Media', 'Marketing'],
    role: 'Founder / Producer',
    year: '2026',
    blurb:
      'A comprehensive look at integrating AI into modern marketing stacks without losing the human touch — cinematic product storytelling, start to finish.',
    media: {
      video: '/videos/ctrlshift-demo-preview.mp4',
      poster: '/videos/ctrlshift-demo-poster.jpg',
    },
    films: [
      {
        video: '/videos/ctrlshift-demo.mp4',
        poster: '/videos/ctrlshift-demo-poster.jpg',
        orientation: 'horizontal',
      },
    ],
    caseStudy: {
      intro:
        'Doing It Right: AI in Product & Brand Marketing — a comprehensive look at integrating AI into modern marketing stacks without losing the human touch.',
      body: [
        'The piece demonstrates cinematic product storytelling built with a generative stack end to end, from script through finishing, with a human edit holding the through-line.',
        'It doubles as a lab for CTRL+SHIFT, the creative-tech community I run in Toronto — formats and pipelines get tested on our own brand first, then graduate into client work.',
      ],
    },
    workflow: [
      {
        tool: 'ChatGPT',
        description: 'Script development — the narrative arc and dialogue.',
      },
      {
        tool: 'ChatGPT & Midjourney',
        description: 'Key visuals — initial keyframes and stylistic reference.',
      },
      {
        tool: 'Gemini (NanoBanana)',
        description:
          'Character consistency — character sheets and auxiliary shots.',
      },
      {
        tool: 'Claude Code',
        description:
          'Asset management — automated file naming, folder structure and cleanup scripts.',
      },
      {
        tool: 'Kling & CapCut',
        description:
          'Production and assembly — cinematic scenes generated in Kling, edit finalized in CapCut.',
      },
      {
        tool: 'Topaz Labs',
        description: 'Finishing — AI upscaling and final visual pass.',
      },
    ],
  },
  {
    slug: 'synthetic-character',
    client: 'R&D',
    title: 'AI Influencer Case Study',
    kind: 'AI EXPERIMENT',
    category: 'content',
    tags: ['AI', 'Generative Media', 'Virtual Character', 'Content Experiment'],
    role: 'Creator',
    year: '2026',
    blurb:
      'An exploration of the synthetic persona phenomenon — how consistent character identity holds up across short-form content made with generative AI.',
    media: {
      video: '/videos/synthetic-character-preview.mp4',
      poster: '/videos/synthetic-character-poster.jpg',
    },
    films: [
      {
        video: '/videos/synthetic-character.mp4',
        poster: '/videos/synthetic-character-poster.jpg',
        orientation: 'vertical',
      },
    ],
    caseStudy: {
      intro:
        'An exploration of the synthetic persona phenomenon: how consistent character identity can be maintained across short-form media content using generative AI to replicate a social media personality.',
      body: [
        'The hard part isn’t generating a convincing shot — it’s generating the hundredth one that still looks like the same person, sounds like the same person, and carries the same performance.',
        'The build leaned on a defined character base, motion generated with native audio under consistency constraints, and a voice clone maintained across every segment.',
      ],
    },
    workflow: [
      {
        tool: 'Gemini (NanoBanana)',
        description:
          'Character exploration — defined the visual identity and generated character sheets and multiple shots for the persona base.',
      },
      {
        tool: 'Veo 3.1',
        description:
          'Video generation — high-fidelity motion clips with native audio, adhering to character consistency constraints.',
      },
      {
        tool: 'ElevenLabs',
        description:
          'Vocal consistency — a distinct, emotive voice clone maintained across all video segments.',
      },
    ],
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
