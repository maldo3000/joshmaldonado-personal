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

export type Note = {
  slug: string
  /** Small label above the title — CASE STUDY, EXPERIMENT, NOTE */
  kind: string
  title: string
  /** Standfirst under the title */
  dek: string
  date: string
  readingTime: string
  blocks: NoteBlock[]
}

export const notes: Note[] = [
  {
    slug: 'generative-media-in-practice',
    kind: 'Case study',
    title: 'Generative Media in Practice',
    dek: 'Two experiments and a client deliverable — the tools, the order we used them in, and what held up.',
    date: '2026-08-04',
    readingTime: '4 min',
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
        type: 'p',
        text: 'The sequence: script in ChatGPT. Key visuals and style reference through ChatGPT and Midjourney. Character sheets in Gemini to hold faces consistent across shots. Claude Code handling file naming, folder structure and cleanup. Scenes generated in Kling, assembled in CapCut, upscaled and finished in Topaz.',
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
        text: 'The approach was to define the character before generating any motion. Character sheets in Gemini fixed the visual identity first. Veo 3.1 generated motion with native audio under consistency constraints. ElevenLabs carried a single voice clone across every segment.',
      },
      {
        type: 'p',
        text: 'You can’t make a generative model deterministic, but a tight enough definition up front removes most of the drift. Consistency here isn’t a setting — it’s a set of constraints you decide not to loosen halfway through.',
      },

      { type: 'h2', text: 'Client work: make it repeatable' },
      {
        type: 'media',
        video: '/videos/permission-brand.mp4',
        poster: '/videos/permission-brand-poster.jpg',
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
