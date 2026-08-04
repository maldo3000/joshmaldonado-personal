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
    slug: 'the-hundredth-frame',
    kind: 'Case study',
    title: 'The Hundredth Frame',
    dek: 'Three branded pieces, three answers to the only question that actually matters in generative media.',
    date: '2026-08-04',
    readingTime: '6 min',
    blocks: [
      {
        type: 'p',
        text: 'Every generative tool demos the same way. One image, one clip, one voice — and it is genuinely astonishing. Then you try to make the second one match the first, and the astonishment drains out of the room.',
      },
      {
        type: 'pull',
        text: 'The first frame is free. The hundredth is the job.',
      },
      {
        type: 'p',
        text: 'That gap — between a convincing sample and a coherent body of work — is where the actual production lives, and where most generative projects quietly fall apart. Three pieces I produced over the past year each ran straight at it. Side by side they read less like three films than like three arguments about where consistency should live: in the code, in the constraints, or in the edit.',
      },

      { type: 'h2', text: 'Permission: put it in the code' },
      {
        type: 'media',
        video: '/videos/permission-brand.mp4',
        poster: '/videos/permission-brand-poster.jpg',
        orientation: 'horizontal',
        caption: 'Permission — AI product film series, built on a Remotion pipeline.',
      },
      {
        type: 'p',
        text: 'Permission needed product films that could move as fast as the product did. The usual answer is to shoot a hero piece and then bleed budget re-cutting it every time a feature ships or a placement needs a different shape. We did the opposite: the edit became a program.',
      },
      {
        type: 'p',
        text: 'Layout, motion and typography were built as components in Remotion, with the brand expressed as tokens rather than as habits. AI-assisted media filled the frames where it served the story, and a human edit held the throughline. Change a headline, re-render. Need a vertical cut for a placement that did not exist last week, re-render.',
      },
      {
        type: 'p',
        text: 'When the composition is code, consistency stops being a discipline somebody has to maintain and becomes a property the system hands you. Nobody has to remember the brand’s spacing rules at two in the morning. The renderer remembers.',
      },
      {
        type: 'p',
        text: 'The cost is that you are building a tool before you are making a film. That trade only pays if you know more versions are coming — which, for a product that ships continuously, is a safe bet.',
      },

      { type: 'h2', text: 'The AI creator: put it in the constraints' },
      {
        type: 'media',
        video: '/videos/synthetic-character.mp4',
        poster: '/videos/synthetic-character-poster.jpg',
        orientation: 'vertical',
        caption: 'An experiment in synthetic personas — one character, held together across a full short-form piece.',
      },
      {
        type: 'p',
        text: 'A synthetic persona is a harder problem than it first appears, and not for the reason people expect. Generating a striking clip of a person who does not exist is now trivial. Generating the tenth clip that is recognisably the same person — same face under different light, same body language, same voice carrying the same attitude — is the entire exercise.',
      },
      {
        type: 'p',
        text: 'So the work front-loads identity. Character sheets defined the visual identity before a single frame of motion existed. Motion was generated with native audio under explicit consistency constraints. A voice clone carried the same performance across every segment, so the character sounds like herself even when the shot changes.',
      },
      {
        type: 'pull',
        text: 'You cannot make a stochastic system deterministic. You can fence it.',
      },
      {
        type: 'p',
        text: 'Give the model a specific enough definition of the character and the variance has nowhere interesting to go. The persona holds together not because any single clip is flawless, but because every clip agrees with the others. Consistency here is not a rendering property — it is a set of constraints you refuse to relax.',
      },

      { type: 'h2', text: 'Doing It Right: put it in the edit' },
      {
        type: 'media',
        video: '/videos/ctrlshift-demo.mp4',
        poster: '/videos/ctrlshift-demo-poster.jpg',
        orientation: 'horizontal',
        caption: 'Doing It Right — a branded film on using AI in product and brand marketing, made with the stack it argues for.',
      },
      {
        type: 'p',
        text: 'The branded film took the widest path: six tools, one piece. Script development in ChatGPT. Key visuals and stylistic reference through ChatGPT and Midjourney. Character sheets for consistency across auxiliary shots. Claude Code doing the unglamorous half — file naming, folder structure, asset cleanup — which is genuinely where a generative project drowns if nobody automates it. Cinematic scenes generated in Kling, assembled in CapCut, finished with AI upscaling.',
      },
      {
        type: 'p',
        text: 'A stack like that has no continuity of its own. Every handoff between tools is an opportunity for the thing to drift, and none of those tools has any opinion about whether the film is good.',
      },
      {
        type: 'p',
        text: 'What holds it together is the edit — a person choosing this take and not that one, this pace, this cut, this ending. The generative stack produced the material. It did not produce the film. That distinction is worth being precise about, because it is the part that does not automate.',
      },

      { type: 'h2', text: 'What actually changed' },
      {
        type: 'p',
        text: 'Put the three next to each other and the pattern is clear enough. Code gives you consistency for free but demands you build the machine first. Constraints let you work with generative models instead of against them, at the price of deciding exactly what you want before you start. A human edit fixes anything, but it does not scale — it is the most expensive kind of consistency there is, and sometimes the only kind that will do.',
      },
      {
        type: 'p',
        text: 'The common thread is that none of these projects treated a shot as the unit of production. The unit was the system: a renderer, a set of constraints, an editorial standard. That is a producer’s instinct more than a technologist’s one, and it is the part of this work that transfers cleanly from physical production, where you have always been designing a process that other people can execute at volume.',
      },
      {
        type: 'pull',
        text: 'The cost of making an asset collapsed. The cost of judgment did not move at all.',
      },
      {
        type: 'p',
        text: 'Which is the real shift. When output was expensive, scarcity did your editing for you — you shot what you could afford and used most of it. Now you can generate a hundred takes before lunch, and the constraint moves to knowing which one is worth keeping and being willing to throw away the ninety-nine that almost work.',
      },
      {
        type: 'p',
        text: 'Consistency was never a technical checkbox. It is what makes a body of work legible as one voice instead of a pile of impressive fragments. The tools decide how cheaply you can get there. They do not decide whether it was worth arriving.',
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
