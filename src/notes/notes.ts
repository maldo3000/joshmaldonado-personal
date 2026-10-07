/** Diagrams drawn in HTML by diagrams.tsx (kept here so this file stays JSX-free for the edge middleware) */
export type DiagramId =
  | 'layers'
  | 'fanout'
  | 'core'
  | 'roundtrip'
  | 'publish'
  | 'tools'
  | 'tree'
  | 'status'

export type NoteBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'pull'; text: string }
  | {
      type: 'media'
      video: string
      poster?: string
      orientation?: 'vertical' | 'horizontal'
      caption: string
    }
  /** Stepped process — tool on one side, what it did on the other */
  | {
      type: 'sequence'
      label: string
      steps: { tool: string; description: string }[]
    }
  /** Stills. One runs full width; two or three sit side by side. `aspect`
   *  sets the crop for side-by-side stills — portrait unless the shots are
   *  wide, in which case a portrait frame would cut them apart. */
  | {
      type: 'figure'
      images: string[]
      caption?: string
      aspect?: 'portrait' | 'landscape'
    }
  | { type: 'list'; items: string[] }
  /** Explanatory figure drawn in HTML (see diagrams.tsx) */
  | { type: 'diagram'; id: DiagramId; caption?: string }
  /** A file to download, as a card with one button */
  | {
      type: 'download'
      kind: string
      title: string
      text: string
      href: string
      label: string
    }
  /** Shell commands or file listings, set in mono */
  | { type: 'code'; text: string }

export type Note = {
  slug: string
  /** Small label above the title — CASE STUDY, EXPERIMENT, NOTE */
  kind: string
  title: string
  /** Standfirst under the title */
  dek: string
  date: string
  readingTime: string
  /** Link-preview image — a frame from the piece with the title overlaid.
   *  Falls back to the site's default card when unset. */
  ogImage?: string
  /** Wider reading column on desktop for long, diagram-heavy notes */
  wide?: boolean
  blocks: NoteBlock[]
}

export const notes: Note[] = [
  {
    slug: 'the-brand-agent',
    kind: 'Field guide',
    title: 'The Brand Agent',
    dek: 'How I use agents to make quality, on-brand content at scale, and a skill to set up your own. One repository per brand, holding the brand and the tools that turn one idea into finished work for every platform.',
    date: '2026-10-07',
    readingTime: '9 min',
    ogImage: '/notes/og/the-brand-agent.png',
    wide: true,
    blocks: [
      {
        type: 'media',
        video: '/videos/the-brand-agent.mp4',
        poster: '/videos/the-brand-agent-poster.jpg',
        orientation: 'horizontal',
        caption: 'The brand agent in 80 seconds.',
      },
      {
        type: 'p',
        text: 'Brands need more content than ever. Every platform wants its own format, every campaign needs more than one angle, and every post has to earn its audience. Agents can produce that volume now. The hard part is making every piece look and sound like the brand, the hundredth as much as the first.',
      },
      {
        type: 'p',
        text: 'That’s the problem a brand agent solves: quality, brand-consistent content at scale, across many posts and many platforms, made with agents. This is how it’s built, the tools inside it, and why each piece exists.',
      },

      { type: 'h2', text: 'What a brand agent is' },
      {
        type: 'p',
        text: 'A brand agent is a repository for one brand. It holds the brand itself, written down so an agent can follow it, and the tools that turn an idea into finished work: carousels, posts, stories, decks, print and video, in every format each platform needs. You hand it a brief. Agents do the production. The brand decides what on-brand means.',
      },
      {
        type: 'p',
        text: 'At its heart, a brand agent is about content production. The rules that make a piece on-brand are written down where every agent can read them, and they’re adjustable in one place. Change the accent color, the fonts, the voice or any other brand element, and every piece of content made after that, whether a post, a carousel or a video, adheres to the new standard, because every agent and every template reads from the same files.',
      },
      {
        type: 'p',
        text: 'Additionally, you can add distribution: publishing, to schedule and post organic content, and a Meta Ads connection, to put the brand on paid social and see what’s working. Every change is tracked, so nothing an agent does is lost or permanent. And because a brand agent is just a repository, you can share it with your team, so everyone can produce on-brand work with the same rules, parts and assets.',
      },
      {
        type: 'diagram',
        id: 'layers',
        caption: 'The colors carry through every diagram below.',
      },
      {
        type: 'p',
        text: '**The brand core** is the rulebook: what the brand is, written once for every tool, the video engines included. **The design system** is the kit built from that rulebook: ready-made pieces and full templates for layouts, at the sizes each platform uses. **The asset library** is what the kit is filled with: logos, fonts, photography, footage and graphic elements. Agents read the rules to know what’s right, and build from the kit and the library so they don’t start from a blank page. Change a rule and the kit updates with it, because the kit is built from the rules.',
      },

      { type: 'h2', text: 'One idea, every format' },
      {
        type: 'p',
        text: 'The core loop starts small. One idea, a launch or a recap or a few lines of copy, goes in. A coordinated set comes out: the carousel, the story, the square, the wide cut, the short video, each shaped for its platform and all of them recognizably the same brand.',
      },
      {
        type: 'diagram',
        id: 'fanout',
        caption: 'Scale comes from the fan-out. Consistency comes from every output being built from the same system.',
      },
      {
        type: 'figure',
        images: ['/notes/brand-agent/permission-five-more-minutes.jpg'],
        caption:
          'Permission, a family AI product. One made-up idea, “five more minutes,” as a cold open, a framed moment, a story and a wide slide, designed by the brand agent from Permission’s design system, with frames from the brand’s own films under its purple tint. An example, not a real campaign.',
      },

      { type: 'h2', text: 'The rules: the brand, written down three ways' },
      {
        type: 'p',
        text: 'An agent can only be as consistent as what it’s given. So the brand lives in three files, and the most important design decision was giving each one a different job.',
      },
      {
        type: 'diagram',
        id: 'core',
        caption: 'Values, rules and feel live in separate files, so each can be right without the others getting in the way.',
      },
      {
        type: 'p',
        text: 'tokens.json holds the values code needs: every color, typeface, size, margin and format, in the open design-token standard. Nothing else in the repo is allowed to define a value. A script writes each tool’s copy, one for HyperFrames, one for Remotion, one for the design system, and fails if any of them drifts. Before this, one brand had its colors written in four places that slowly disagreed.',
      },
      {
        type: 'p',
        text: 'BRAND.md holds judgment that code can’t: voice, the type hierarchy, what never happens to the logo. And canon/ holds approved work, each piece with a short note on why it works.',
      },
      {
        type: 'pull',
        text: 'Rules say what’s allowed. Examples show what right looks like.',
      },
      {
        type: 'p',
        text: 'Canon is the piece that moved the quality most. Agents copy examples far better than they follow adjectives. A rule like “keep it minimal” produces something in-palette and generic. A note like “the grounds alternate across the carousel while the frame stays fixed” produces something that looks like the brand. So BRAND.md ends with a section called How it looks in practice: the handful of concrete moves you find when you lay the canon side by side and ask what repeats.',
      },
      {
        type: 'figure',
        images: [
          '/notes/brand-agent/cs-bip-1.jpg',
          '/notes/brand-agent/cs-bip-2.jpg',
          '/notes/brand-agent/cs-bip-3.jpg',
        ],
        caption:
          'CTRL+SHIFT, Building in Public. The moves are legible: heavy display type staircased left, one violet as both tint and ground, photos duotoned into it, a meta rail on every slide.',
      },

      { type: 'h2', text: 'The parts: one design system, two places to design' },
      {
        type: 'p',
        text: 'The design system is the rules turned into parts: the tokens, a set of classes named after the canon’s moves, preview cards, and full templates for every format the brand ships. It’s plain HTML and CSS, and a thin layer of components syncs it into a design-system project in Claude Design.',
      },
      {
        type: 'diagram',
        id: 'roundtrip',
        caption: 'The round trip. Neither tool is the source of truth; the brand core is.',
      },
      {
        type: 'p',
        text: 'So a design can start in either place. I explore in Claude Design when I want to establish the look of a campaign. An agent in the repo reads the same system and designs from it directly: a new layout, not just a resize or new copy. Whichever side a piece starts on, it ends up as the same HTML and gets checked against the same canon. Because both sides speak HTML, nothing gets translated: a Claude Design file rendered by the repo matches Claude Design’s own export pixel for pixel.',
      },

      { type: 'h2', text: 'The materials: an asset library' },
      {
        type: 'p',
        text: 'Rules and templates only get you so far. Every piece also needs real material, so each brand agent keeps its own library: the logo and mark in every colorway, the brand fonts, approved photography, footage from the brand’s own films, illustrations and graphic elements. It lives in the repo next to the rules, and the templates and video projects draw from it directly.',
      },
      {
        type: 'p',
        text: 'When the library runs short, agents can go and get more. They search and download licensed stock photos and video, with every credit logged so attribution travels with the file, and generate voiceover, music and sound effects in the brand’s voice. The Permission example above uses frames from the brand’s own films under its purple tint, because the brand’s own material always beats a generic image.',
      },

      { type: 'h2', text: 'Quality: nothing ships unreviewed' },
      {
        type: 'p',
        text: 'Scale is easy to get wrong quietly. So every static piece renders to one image per frame at native size, and an agent looks at every frame before anyone else does: overlaps, contrast, safe zones, type that’s too small, a logo that didn’t render, anything that drifts from the canon.',
      },
      {
        type: 'sequence',
        label: 'A static piece, start to finish',
        steps: [
          { tool: 'Template', description: 'The closest design-system template to the brief.' },
          { tool: 'Copy + imagery', description: 'Written in the brand’s voice. Structure, margins and type stay.' },
          { tool: 'Render', description: 'Headless Chrome, one image per frame, every format the platforms need.' },
          { tool: 'Review', description: 'Every frame checked against the canon before it’s shown.' },
          { tool: 'Variations', description: 'New copy, new formats, new angles from the same approved piece.' },
        ],
      },
      {
        type: 'figure',
        images: [
          '/notes/brand-agent/cs-devday-1.jpg',
          '/notes/brand-agent/cs-devday-2.jpg',
          '/notes/brand-agent/cs-devday-3.jpg',
        ],
        caption:
          'A next-day event recap for CTRL+SHIFT, generated from the brand system and scheduled the same afternoon.',
      },
      {
        type: 'p',
        text: 'Video follows one rule above the rest: footage is never cut inside a motion engine. Footage is cut with ffmpeg against a beat grid when music leads, or from a transcript when speech leads. Graphics come from the brand’s one motion engine, HyperFrames for HTML timelines or Remotion for React components, and land on top as a transparent overlay, so a series keeps the same look from episode to episode, in every aspect ratio it ships.',
      },

      { type: 'h2', text: 'Publishing' },
      {
        type: 'p',
        text: 'Publishing takes finished organic content and posts it. A campaign file, post.json, lists what goes where and when, with a POST.md beside it for people to read. A channels file maps each account to the way it gets posted: a scheduler API for connected accounts, a browser agent that works a platform’s own scheduler for accounts that aren’t, or a hand-off folder for a person.',
      },
      {
        type: 'diagram',
        id: 'publish',
        caption: 'The approval gate isn’t optional. Nothing reaches a live account without a yes for those posts, those accounts, those times.',
      },

      { type: 'h2', text: 'Paid social' },
      {
        type: 'p',
        text: 'Meta’s Ads MCP connects the brand agent to Ads Manager, where paid social actually runs: the campaigns, the ads, and how they perform. The paid creative comes out of the same system as everything else, so an ad looks like the brand rather than like an ad. Permission’s design system even has a paid-social register: darker grounds, one word in green, the same voice delivered louder.',
      },
      {
        type: 'p',
        text: 'In my setup the connection is read-only for now, with every tool that could change a campaign blocked in the configuration. The agent pulls the numbers into a short report whose first paragraph says what to change in the next piece, and I make the changes in Ads Manager. Work that performs joins the canon. A pattern that holds becomes a rule.',
      },

      { type: 'h2', text: 'The tools' },
      {
        type: 'diagram',
        id: 'tools',
        caption: 'Each tool, colored by the layers it serves. A coding agent runs all of them.',
      },

      { type: 'h2', text: 'Tracking' },
      {
        type: 'p',
        text: 'Every brand repo is under git, with images, video and audio in Git LFS, so every change is tracked. That’s what makes working at this speed safe: an agent can change a template, the brand colors and three designs in a minute, and git turns all of that into something you can see and reverse. It also ties a finished piece to the exact recipe that made it, so “the version from two weeks ago, with new copy” becomes a re-render instead of a rebuild.',
      },
      {
        type: 'diagram',
        id: 'tree',
        caption: 'Every brand repo has this shape. Brands never copy each other’s files, only the pattern.',
      },

      { type: 'h2', text: 'Set up your own' },
      {
        type: 'p',
        text: 'I packaged the method as an agent skill: plain markdown and scripts, so it works in Claude Code and Codex alike. It covers content production, distribution and tracking, with a reference for each part, the templates a new brand repo starts from, a scaffolder that sets up git and LFS, the renderer that turns any HTML design, Claude Design exports and decks included, into exact images, and the publish tool with its approval gate. None of my brands are in it. It’s still a work in progress, and it will keep changing as I discover more.',
      },
      {
        type: 'download',
        kind: 'Agent skill · 53 KB',
        title: 'brand-agent',
        text: 'The method, templates, scaffolder, renderer and publish tool for running a brand agent.',
        href: '/downloads/brand-agent.zip',
        label: 'Download ↓',
      },
      {
        type: 'code',
        text: 'unzip brand-agent.zip -d ~/.claude/skills/\ncd ~/.claude/skills/brand-agent/scripts/static && npm install\n\n# start a brand\npython3 ~/.claude/skills/brand-agent/scripts/init_brand.py ~/Projects/acme-brand --name "Acme"\n\n# Codex: link the same skill\nln -s ~/.claude/skills/brand-agent ~/.codex/skills/brand-agent',
      },
      {
        type: 'p',
        text: 'Then open the new repo in your coding agent, drop your guidelines and best work in, and ask it to build the brand core. Start with the canon. It’s the part that makes everything after it look like you.',
      },
      {
        type: 'pull',
        text: 'The brand is the spec. The agents are the production team.',
      },
    ],
  },
  {
    slug: 'the-medium-is-the-room',
    kind: 'Case study',
    title: 'The Medium Is the Room',
    dek: 'Producing branded immersive experiences.',
    date: '2026-08-05',
    readingTime: '5 min',
    ogImage: '/notes/og/the-medium-is-the-room.png',
    blocks: [
      {
        type: 'p',
        text: 'Most events place content inside a venue. A projection-mapped experience turns the venue itself into the content.',
      },
      {
        type: 'media',
        video: '/videos/intel-recap.mp4',
        poster: '/videos/intel-recap-poster.jpg',
        orientation: 'horizontal',
        caption:
          'Intel Encore AI Art Show at Illuminarium — produced for Intel Canada through Mosaic.',
      },
      {
        type: 'media',
        video: '/videos/reddit-arcadia.mp4',
        poster: '/videos/reddit-arcadia-poster.jpg',
        orientation: 'horizontal',
        caption:
          'Reddit at Arcadia Earth — a summit staged across a working attraction. Led by Mint, with content and AV through Quiver.',
      },
      { type: 'h2', text: 'What is a branded immersive experience?' },
      {
        type: 'p',
        text: 'Walls become screens. Rooms become chapters. Guests move through the story instead of simply watching it from a seat.',
      },
      {
        type: 'p',
        text: 'For brands, this creates an opportunity to communicate through scale, atmosphere and movement. A product can become an installation. A presentation can become an environment. A conference can feel like entering a temporary world.',
      },
      {
        type: 'p',
        text: 'But access to an immersive venue does not automatically create an immersive experience.',
      },
      {
        type: 'p',
        text: 'These spaces bring together specialized projection systems, unusual content formats, audio, lighting, interactive technology, artists, speakers, agencies, vendors and venue teams. Someone has to connect all of those pieces into one coherent experience.',
      },
      {
        type: 'p',
        text: 'That is the work I have done for Intel and Reddit across two very different projects.',
      },

      { type: 'h2', text: 'Intel: turning technology into an art experience' },
      {
        type: 'p',
        text: 'For the Intel Encore AI Art Show, produced for Intel Canada through Mosaic, we transformed Illuminarium into an exhibition featuring AI-integrated work from a group of artists.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/intel-balloons.jpg'],
        caption: 'The room itself carrying the work.',
      },
      {
        type: 'p',
        text: 'The objective was to demonstrate the power of Intel machines without relying solely on product specifications or conventional technology messaging. Instead, audiences experienced what the technology could enable.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/intel-mural.jpg'],
        caption:
          'Projection-mapped artwork running the length of the room, floor included.',
      },
      {
        type: 'p',
        text: 'Projection-mapped artwork, live computing systems, interactive installations and artist-led programming turned the venue into a creative demonstration. Intel machines were not hidden behind the scenes. They were actively powering the work.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/intel-mcleod.jpg',
          '/notes/immersive/intel-masewich.jpg',
        ],
        caption:
          'Each artist ran live on Intel hardware at their own station, the machine sitting in the room as part of the piece.',
      },
      {
        type: 'p',
        text: 'The result was both an exhibition and a product story. It made computing power feel tangible by showing what artists could create with it.',
      },
      {
        type: 'p',
        text: 'Producing the experience required coordinating the artists, venue, hardware, projection systems, content pipeline and event teams. Each artist worked differently, so every piece had to be adapted to the venue while still contributing to a unified brand experience.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/intel-thermal.jpg',
          '/notes/immersive/intel-bpm.jpg',
        ],
        caption:
          'Interactive stations let visitors drive the work themselves — real-time vision on one, generative sound on another.',
      },

      { type: 'h2', text: 'Reddit: transforming an attraction into a summit' },
      {
        type: 'p',
        text: 'For Reddit, Arcadia Earth became the setting for a summit centred on selling to senior leaders. Mint led the engagement; I came in through Quiver and Graham Budd as the content and AV partner, managing a portion of the content and all of the technical integration into the venue’s screens.',
      },
      {
        type: 'p',
        text: 'Rather than placing the program inside a traditional conference venue, a series of existing immersive rooms was turned into a connected Reddit experience — including a completely bespoke projection room built for the storefront.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/reddit-garden.jpg'],
        caption:
          'The summit opened with an executive breakfast inside a projected park — the venue doing the work a decor budget usually does.',
      },
      {
        type: 'p',
        text: 'The experience opened with an executive breakfast, then moved guests into a sequence of rooms built around demonstrations of Reddit’s ad capabilities. Each space carried a different part of the program — presentations, demos, conversations, gifting and branded content — with the venue’s existing projection infrastructure combined with additional screens, staging, playback systems and AV equipment.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/reddit-garden-detail.jpg',
          '/notes/immersive/reddit-arch.jpg',
        ],
      },
      {
        type: 'p',
        text: 'The result felt less like a conference inside a ballroom and more like a journey through a sequence of branded environments.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/reddit-airport.jpg'],
        caption:
          'One of the demo rooms re-skinned as an airport terminal, with Reddit’s audience data staged as departure boards.',
      },
      {
        type: 'p',
        text: 'The production challenge was integrating Reddit’s program with a functioning attraction that already had its own technology, systems and constraints. The agency, venue, content teams, AV suppliers and technicians all needed to operate as one production system within a limited installation window.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/reddit-stage.jpg',
          '/notes/immersive/reddit-city.jpg',
        ],
        aspect: 'landscape',
        caption:
          'The same footprint carrying a keynote, then a demo — staging and playback layered onto the venue’s own projection.',
      },

      { type: 'h2', text: 'A programmable environment' },
      {
        type: 'p',
        text: 'Intel and Reddit used similar types of spaces for very different purposes. For Intel, the room became an AI art exhibition and a demonstration of creative computing. For Reddit, it became a summit environment built around a sales narrative.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/intel-balloons-blue.jpg',
          '/notes/immersive/reddit-garden-wide.jpg',
        ],
        aspect: 'landscape',
        caption:
          'Same kind of room, two identities — an exhibition floor and an executive breakfast.',
      },
      {
        type: 'p',
        text: 'This is what makes projection-mapped venues valuable. They are not simply dramatic locations. They are programmable environments.',
      },
      {
        type: 'p',
        text: 'The same space can become a gallery, product launch, conference, performance, data visualization or interactive installation. The venue can change its identity through content rather than through a complete physical rebuild.',
      },
      {
        type: 'p',
        text: 'Used strategically, these spaces allow brands to:',
      },
      {
        type: 'list',
        items: [
          'Communicate through atmosphere and scale',
          'Demonstrate products through experiences rather than explanations',
          'Create distinct environments for different parts of an event',
          'Generate visually memorable photo and video content',
          'Build a stronger relationship between the message and the setting',
        ],
      },
      {
        type: 'p',
        text: 'The format works best when the environment contributes to the idea. Projection should not be used simply because it looks impressive. It should help the audience understand or feel something that a conventional stage cannot communicate as effectively.',
      },

      { type: 'h2', text: 'Producing the room as one system' },
      {
        type: 'p',
        text: 'Immersive production sits between creative direction, technical planning, content production and event execution. It involves evaluating venues, developing the spatial concept, defining content specifications, coordinating technical systems, managing artists and vendors, planning rehearsals and overseeing installation.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/intel-welcome.jpg'],
      },
      {
        type: 'p',
        text: 'My role is to connect those disciplines. I help brands and agencies transform projection-mapped venues into complete branded environments, managing the relationship between the story, the content and the technology.',
      },
      {
        type: 'pull',
        text: 'When the medium is the room, every part of the room has to tell the same story.',
      },
    ],
  },
  {
    slug: 'generative-media-in-practice',
    kind: 'Case study',
    title: 'Generative Media in Practice',
    dek: 'Two experiments and a client deliverable — the tools, the order we used them in, and what held up.',
    date: '2026-08-04',
    readingTime: '4 min',
    ogImage: '/notes/og/generative-media-in-practice.png',
    blocks: [
      {
        type: 'p',
        text: 'Most generative AI demos fall apart the moment you need a second asset that matches the first. These three pieces were about closing that gap — two experiments run on our own brand, then the same thinking applied to client work.',
      },

      { type: 'h2', text: 'Experiment one: run the whole stack' },
      {
        type: 'media',
        video: '/videos/ctrlshift-demo.mp4',
        poster: '/videos/ctrlshift-demo-poster.jpg',
        orientation: 'horizontal',
        caption:
          'Doing It Right — a branded film about using AI in product and brand marketing, made with the stack it argues for.',
      },
      {
        type: 'p',
        text: 'A branded film about AI in marketing, produced with a fully generative pipeline. The point was to run every stage through the tools and find where it breaks.',
      },
      {
        type: 'sequence',
        label: 'The stack, in order',
        steps: [
          { tool: 'ChatGPT', description: 'Script — narrative arc and dialogue.' },
          {
            tool: 'ChatGPT + Midjourney',
            description: 'Key visuals — first keyframes and style reference.',
          },
          {
            tool: 'Gemini + Nano Banana',
            description:
              'Character sheets, so faces hold across auxiliary shots.',
          },
          {
            tool: 'Claude Code',
            description:
              'Asset management — file naming, folder structure, cleanup scripts.',
          },
          {
            tool: 'Kling + CapCut',
            description: 'Scene generation, then assembly and edit.',
          },
          {
            tool: 'Topaz',
            description: 'Finishing — upscaling and the final visual pass.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Two things came out of it. The tools generate material, but nothing in that chain has an opinion about whether the film is good — the edit still does that. And asset management across six tools is where the hours quietly go if you don’t automate it, which is why Claude Code earned its place in a list otherwise made of creative tools.',
      },

      { type: 'h2', text: 'Experiment two: hold one character together' },
      {
        type: 'media',
        video: '/videos/synthetic-character.mp4',
        poster: '/videos/synthetic-character-poster.jpg',
        orientation: 'vertical',
        caption:
          'An AI creator experiment — one synthetic persona sustained across a full short-form piece.',
      },
      {
        type: 'p',
        text: 'The second test was narrower: can a synthetic persona stay recognisable across a whole piece? Generating one striking clip of someone who doesn’t exist is easy now. Ten clips that read as the same person is the real problem.',
      },
      {
        type: 'p',
        text: 'The approach was to define the character before generating any motion, so every later step inherited a fixed identity rather than reinventing one.',
      },
      {
        type: 'sequence',
        label: 'Locking the character',
        steps: [
          {
            tool: 'Gemini + Nano Banana',
            description:
              'Character sheets — visual identity fixed before a frame of motion existed. This was the step that made character consistency possible at all.',
          },
          {
            tool: 'Veo 3.1',
            description:
              'Motion with native audio, generated under consistency constraints.',
          },
          {
            tool: 'ElevenLabs',
            description:
              'A single voice clone carried across every segment.',
          },
        ],
      },
      {
        type: 'p',
        text: 'You can’t make a generative model deterministic, but a tight enough definition up front removes most of the drift. Consistency here isn’t a setting — it’s a set of constraints you decide not to loosen halfway through.',
      },

      { type: 'h2', text: 'Client work: make it repeatable' },
      {
        type: 'media',
        video: '/videos/permission-brand-02.mp4',
        poster: '/videos/permission-brand-02-poster.jpg',
        orientation: 'horizontal',
        caption:
          'Permission — an AI product film series built on a Remotion pipeline, where new versions are renders rather than re-edits.',
      },
      {
        type: 'p',
        text: 'Then the client version. Permission needed product films that could keep pace with a product shipping continuously, in whatever aspect ratio the next placement called for.',
      },
      {
        type: 'p',
        text: 'So the edit became code. Layout, motion and typography were built as Remotion components with the brand expressed as tokens rather than as habits. AI-assisted media filled the frames where it served the story, with a human edit holding the throughline.',
      },
      {
        type: 'media',
        video: '/videos/permission-brand.mp4',
        poster: '/videos/permission-brand-poster.jpg',
        orientation: 'horizontal',
        caption:
          'A second cut from the same pipeline — different story, same components underneath.',
      },
      {
        type: 'p',
        text: 'A new headline or a new aspect ratio is a re-render, not a re-cut. That’s the difference between making a film and building a system — and it only pays when you know more versions are coming.',
      },

      { type: 'h2', text: 'What carries over' },
      {
        type: 'p',
        text: 'In all three, the unit of work was never a shot. It was the system underneath: a renderer, a set of constraints, an editorial standard. Which layer does the work is the decision worth making early.',
      },
      {
        type: 'p',
        text: 'Use code when you’ll need many versions of the same thing. Use constraints when one thing has to stay itself across many generations. Use the edit for everything the other two can’t fix, which is still most of what makes a piece good.',
      },
      {
        type: 'pull',
        text: 'The cost of producing an asset dropped. The cost of judging one didn’t.',
      },
    ],
  },
]

export const findNote = (slug: string | undefined) =>
  notes.find((n) => n.slug === slug) ?? null

export const formatNoteDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
