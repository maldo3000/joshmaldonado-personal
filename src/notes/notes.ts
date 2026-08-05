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
  blocks: NoteBlock[]
}

export const notes: Note[] = [
  {
    slug: 'the-medium-is-the-room',
    kind: 'Case study',
    title: 'The Medium Is the Room',
    dek: 'Producing branded projection-mapping experiences.',
    date: '2026-08-05',
    readingTime: '5 min',
    ogImage: '/notes/og/the-medium-is-the-room.png',
    blocks: [
      {
        type: 'p',
        text: 'Most events place content inside a venue. A projection-mapped experience turns the venue itself into the content.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/intel-balloons.jpg'],
        caption:
          'Intel Encore AI Art Show at Illuminarium — the room itself carrying the work.',
      },
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
        images: ['/notes/immersive/intel-mural.jpg'],
        caption:
          'Projection-mapped artwork running the length of the room, floor included.',
      },
      {
        type: 'p',
        text: 'The objective was to demonstrate the power of Intel machines without relying solely on product specifications or conventional technology messaging. Instead, audiences experienced what the technology could enable.',
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
      {
        type: 'media',
        video: '/videos/intel-recap.mp4',
        poster: '/videos/intel-recap-poster.jpg',
        orientation: 'horizontal',
        caption: 'Intel Encore AI Art Show — the exhibit in motion.',
      },

      { type: 'h2', text: 'Reddit: transforming an attraction into a branded event' },
      {
        type: 'p',
        text: 'For Reddit, we used Arcadia Earth as the setting for a business-focused event centred on selling to senior leaders.',
      },
      {
        type: 'p',
        text: 'Rather than placing the program inside a traditional conference venue, we transformed a series of existing immersive rooms into a connected Reddit experience.',
      },
      {
        type: 'figure',
        images: ['/notes/immersive/reddit-garden.jpg'],
        caption:
          'A dining room built inside a projected park — the venue doing the work a decor budget usually does.',
      },
      {
        type: 'p',
        text: 'Different areas supported different parts of the event, including presentations, demonstrations, conversations, gifting and branded content. Existing projection infrastructure was combined with additional screens, staging, playback systems and AV equipment.',
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
          'One room re-skinned as an airport terminal, with Reddit’s data staged as departure boards.',
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
      {
        type: 'media',
        video: '/videos/reddit-cities.mp4',
        poster: '/videos/reddit-cities-poster.jpg',
        orientation: 'horizontal',
        caption: 'Reddit at Arcadia Earth — the event film.',
      },

      { type: 'h2', text: 'A programmable environment' },
      {
        type: 'p',
        text: 'Intel and Reddit used similar types of spaces for very different purposes. For Intel, the room became an AI art exhibition and a demonstration of creative computing. For Reddit, it became an immersive conference environment built around a business narrative.',
      },
      {
        type: 'figure',
        images: [
          '/notes/immersive/intel-balloons-blue.jpg',
          '/notes/immersive/reddit-garden-wide.jpg',
        ],
        aspect: 'landscape',
        caption:
          'Same kind of room, two identities — an exhibition floor and a garden dining room.',
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
