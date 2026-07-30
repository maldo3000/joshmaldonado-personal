# CTRL+SHIFT Academy — Generative Media (Course Book)

An interactive, self-contained course book for [ctrlshift.community/academy](https://ctrlshift.community/academy).
Nineteen chapters plus an appendix, with progress tracking, knowledge checks,
exercises, per-chapter notes and twenty-one interactive teaching widgets.

## Running it

It is plain HTML, CSS and JavaScript — no build step, no dependencies, no
framework. Open `index.html` over any static server:

```bash
npx http-server public -p 8899
# → http://127.0.0.1:8899/coursebook/
```

Because it lives in `public/`, it also ships with the Vite build and is served
at `/coursebook/` on whatever host this site is deployed to.

## Moving it to the Academy site

Two options:

1. **Copy the folder.** `index.html` plus `fonts/` is the whole thing. Drop it
   at `/academy/coursebook/` on any static host.
2. **Ship one file.** Inline the fonts and emit a single HTML file:

   ```bash
   node scripts/build-coursebook.mjs --out dist/coursebook.html
   node scripts/build-coursebook.mjs --fragment --out dist/coursebook-fragment.html
   ```

   `--fragment` drops the document wrapper (`doctype`/`html`/`head`/`body`) and
   keeps the title, styles, markup and script, for a CMS or app shell that
   supplies its own page chrome.

## Editing the content

Everything lives in the `<script>` block at the bottom of `index.html`:

- `PARTS` — the six part groupings and their descriptions.
- `CHAPTERS` — one object per chapter: `id`, `part`, `n`, `title`, `thesis`,
  `outcome`, `terms`, optional `deliverable`, the `body` HTML, a `quiz` array
  and a `tasks` array. Reading time is computed from the body, so nothing needs
  updating by hand.
- `GLOSSARY` — term/definition pairs, rendered and filtered in the appendix.
- `WIDGETS` — one function per interactive. A chapter opts in by placing
  `<div class="widget" data-widget="name"></div>` anywhere in its body; the
  matching function is called with that element after the chapter renders.

Adding a chapter means adding one object to `CHAPTERS`. The contents rail,
search index, pager, progress meter and export all derive from that array.

## Branding

The visual system is defined as custom properties at the top of the stylesheet:

- Ground `#0c0c0c`, warm off-white `#f6f5ef`, hairline rules — the CTRL+SHIFT
  treatment used across the site.
- Five stage lights, one per part, drawn from the event photography: mint
  `#56ffc4`, violet `#8b97ff`, pink `#ff6fae`, amber `#ffc46f`, cyan `#6fd8ff`.
  A part's light drives its rail marker, chapter numeral, accents and canvases.
- Three type roles, all inlined from `fonts/` so there is no CDN dependency and
  no silent fallback: **Work Sans** (heavy) for titles, section headings and
  chapter names in the contents rail; **Newsreader** for running prose;
  **Roboto Mono** for labels, eyebrows, numerals, data and UI chrome.

Light ("paper") and dark ("studio") themes are both designed. The page follows
the reader's system preference and the toggle in the rail overrides it.

## State

Progress, quiz answers, exercise checkboxes and notes are stored in
`localStorage` under `ctrlshift.coursebook.v1`. Nothing is uploaded anywhere.
**Export** in the top bar downloads it all as Markdown.
