import type { CSSProperties } from 'react'
import type { DiagramId } from './notes'

/* Diagrams for notes. Plain HTML + CSS (not images) so they stay crisp,
   reflow on phones and inherit the site's type. One color per layer of
   the brand agent, used consistently across every diagram. */

type LayerKey = 'foundation' | 'core' | 'design' | 'library' | 'static' | 'video' | 'publish' | 'learn'

const LAYERS: Record<
  LayerKey,
  { n: string; name: string; color: string; what: string; tools: string[] }
> = {
  foundation: {
    n: '07',
    name: 'Version history',
    color: '#a7adb6',
    what: 'Every change versioned, so any edit an agent makes can be reviewed or reversed and every finished piece links to the recipe that made it.',
    tools: ['Git', 'Git LFS', 'AGENTS.md'],
  },
  core: {
    n: '01',
    name: 'Brand core',
    color: '#e9b949',
    what: 'The rules. What the brand is, written once for every tool: exact values, judgment, approved examples. Change a rule once and everything made after uses it.',
    tools: ['tokens.json', 'BRAND.md', 'canon/'],
  },
  design: {
    n: '02',
    name: 'Design system',
    color: '#b28dff',
    what: 'The parts. The rules built into ready-made components and templates at real platform sizes, shared by Claude Design and the repo.',
    tools: ['HTML + CSS', 'Claude Design', '/design-sync'],
  },
  library: {
    n: '03',
    name: 'Asset library',
    color: '#e889b5',
    what: 'The materials. Logos, fonts, photography, footage and graphic elements, plus licensed stock and generated voice and music when the library runs short.',
    tools: ['assets/', 'Pexels · Unsplash', 'ElevenLabs'],
  },
  static: {
    n: '04',
    name: 'Make · static',
    color: '#46cdbf',
    what: 'Carousels, posts, stories, decks and print, rendered to exact images in every format a platform needs.',
    tools: ['HTML templates', 'Headless Chrome'],
  },
  video: {
    n: '05',
    name: 'Make · video',
    color: '#5aa9ff',
    what: 'Short-form, explainers and cut-downs: cuts, motion graphics, voice and captions in every aspect ratio.',
    tools: ['HyperFrames', 'Remotion', 'ffmpeg', 'ElevenLabs'],
  },
  publish: {
    n: '05',
    name: 'Publishing',
    color: '#f2836b',
    what: 'Organic posting: a manifest per campaign and swappable ways to schedule and post it, always behind approval.',
    tools: ['post.json', 'Postiz', 'Browser agent'],
  },
  learn: {
    n: '06',
    name: 'Paid social',
    color: '#93d16a',
    what: 'Meta Ads through an MCP connector: the campaigns that put the brand on paid social, and what their numbers say to change next.',
    tools: ['Meta Ads MCP', 'ads/reports/'],
  },
}

const ORDER: LayerKey[] = ['core', 'design', 'library', 'static', 'video', 'publish', 'learn', 'foundation']

const GROUPS: { label: string; keys: (LayerKey | 'make')[] }[] = [
  { label: 'Content production', keys: ['core', 'design', 'library', 'make'] },
  { label: 'Distribution', keys: ['publish', 'learn'] },
  { label: 'Tracking', keys: ['foundation'] },
]

const tint = (key: LayerKey) => ({ '--c': LAYERS[key].color }) as CSSProperties

/** Static and video share one row: both are derived from the rules, parts and library above. */
function MakeRow() {
  return (
    <div className="dg-layer dg-layer--make">
      <span className="dg-layer-n">04</span>
      <div className="dg-layer-main">
        <span className="dg-layer-name">Make</span>
        <span className="dg-layer-what">Everything above, turned into finished work.</span>
        <div className="dg-make-subs">
          {(['static', 'video'] as LayerKey[]).map((key) => (
            <div key={key} className="dg-make-sub" style={tint(key)}>
              <span className="dg-make-name">{key === 'static' ? 'Static' : 'Video'}</span>
              <span className="dg-layer-what">{LAYERS[key].what}</span>
              <div className="dg-chips">
                {LAYERS[key].tools.map((t) => (
                  <span key={t} className="dg-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Layers() {
  return (
    <div className="dg dg-layers">
      {GROUPS.flatMap((g) => [
        <span key={g.label} className="dg-group-label">
          {g.label}
        </span>,
        ...g.keys.map((key) => {
        if (key === 'make') return <MakeRow key="make" />
        const layer = LAYERS[key]
        return (
          <div key={key} className="dg-layer" style={tint(key)}>
            <span className="dg-layer-n">{layer.n}</span>
            <div className="dg-layer-main">
              <span className="dg-layer-name">{layer.name}</span>
              <span className="dg-layer-what">{layer.what}</span>
            </div>
            <div className="dg-chips">
              {layer.tools.map((t) => (
                <span key={t} className="dg-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )
      }),
      ])}
    </div>
  )
}

function Core() {
  const files = [
    { name: 'tokens.json', holds: 'Exact values: color, type, sizes, formats.', wins: 'Wins on values' },
    { name: 'BRAND.md', holds: 'Judgment: voice, hierarchy, do and don’t.', wins: 'Wins on rules' },
    { name: 'canon/', holds: 'Approved work, each with a note on why it works.', wins: 'Wins on feel' },
  ]
  const outputs = [
    { file: 'tokens.css', target: 'HyperFrames', layer: 'video' as LayerKey },
    { file: 'brand.ts', target: 'Remotion', layer: 'video' as LayerKey },
    { file: 'design-system/', target: 'Claude Design', layer: 'design' as LayerKey },
  ]
  return (
    <div className="dg dg-core" style={tint('core')}>
      <div className="dg-core-files">
        {files.map((f) => (
          <div key={f.name} className="dg-card">
            <span className="dg-card-name">{f.name}</span>
            <span className="dg-card-text">{f.holds}</span>
            <span className="dg-card-tag">{f.wins}</span>
          </div>
        ))}
      </div>
      <div className="dg-fan">
        <span className="dg-fan-src">tokens.json</span>
        <span className="dg-fan-arrow" aria-hidden>
          →
        </span>
        <span className="dg-fan-build">brand/build.py</span>
        <span className="dg-fan-arrow" aria-hidden>
          →
        </span>
        <div className="dg-fan-outs">
          {outputs.map((o) => (
            <span key={o.file} className="dg-fan-out" style={tint(o.layer)}>
              <b>{o.file}</b> {o.target}
            </span>
          ))}
        </div>
      </div>
      <p className="dg-note">
        One file holds every value. A script writes each engine’s copy and fails the build if any
        copy drifts.
      </p>
    </div>
  )
}

function Roundtrip() {
  const steps: { side: string; title: string; text: string; layer: LayerKey }[] = [
    {
      side: 'Repo',
      title: '1 · Build the system',
      text: 'Tokens, classes named after the canon’s moves, preview cards, templates.',
      layer: 'core',
    },
    {
      side: 'Claude Design',
      title: '2 · Sync it',
      text: 'One design-system project per brand. Every new design starts on-brand.',
      layer: 'design',
    },
    {
      side: 'Either',
      title: '3 · Design anywhere',
      text: 'Establish the look in Claude Design, or have an agent design it in the repo from the same system.',
      layer: 'design',
    },
    {
      side: 'Repo',
      title: '4 · Bring it home',
      text: 'Claude Design work exports as HTML. Approved work joins the canon and becomes a template.',
      layer: 'static',
    },
  ]
  return (
    <div className="dg dg-round">
      <div className="dg-round-grid">
        {steps.map((s) => (
          <div key={s.title} className="dg-round-step" style={tint(s.layer)}>
            <span className="dg-round-side">{s.side}</span>
            <span className="dg-round-title">{s.title}</span>
            <span className="dg-round-text">{s.text}</span>
          </div>
        ))}
        <span className="dg-round-arrow dg-round-arrow--a" aria-hidden>→</span>
        <span className="dg-round-arrow dg-round-arrow--b" aria-hidden>↓</span>
        <span className="dg-round-arrow dg-round-arrow--c" aria-hidden>←</span>
        <span className="dg-round-arrow dg-round-arrow--d" aria-hidden>↑</span>
      </div>
      <p className="dg-note">
        Same HTML, same pixels: a Claude Design file rendered by the repo matches Claude Design’s own
        export frame for frame.
      </p>
    </div>
  )
}

function Fanout() {
  const outputs: { name: string; text: string; layer: LayerKey }[] = [
    { name: 'Carousel · 4:5', text: 'Instagram, LinkedIn', layer: 'static' },
    { name: 'Story · Reel · 9:16', text: 'Instagram, TikTok, Shorts', layer: 'video' },
    { name: 'Square · 1:1', text: 'Feeds and ads', layer: 'static' },
    { name: 'Wide · 16:9', text: 'LinkedIn, YouTube, decks', layer: 'static' },
    { name: 'Cut-downs', text: 'Shorter edits that extend the piece', layer: 'video' },
  ]
  return (
    <div className="dg dg-publish dg-fanout">
      <div className="dg-pub-col">
        <span className="dg-pub-label">In</span>
        <div className="dg-card" style={tint('core')}>
          <span className="dg-card-name">One idea</span>
          <span className="dg-card-text">A brief, a launch, a recap, a few words.</span>
        </div>
      </div>
      <span className="dg-pub-arrow" aria-hidden>→</span>
      <div className="dg-gate" style={tint('design')}>
        <span className="dg-gate-title">Brand agent</span>
        <span className="dg-card-text">Templates from the design system, copy in the brand’s voice, every frame checked against the canon.</span>
      </div>
      <span className="dg-pub-arrow" aria-hidden>→</span>
      <div className="dg-pub-col">
        <span className="dg-pub-label">Out</span>
        {outputs.map((o) => (
          <div key={o.name} className="dg-card" style={tint(o.layer)}>
            <span className="dg-card-name">{o.name}</span>
            <span className="dg-card-text">{o.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Publish() {
  const adapters = [
    { name: 'Scheduler API', text: 'Accounts connected in Postiz' },
    { name: 'Browser agent', text: 'Drives a platform’s own scheduler' },
    { name: 'Hand-off', text: 'A folder a person posts from' },
  ]
  return (
    <div className="dg dg-publish" style={tint('publish')}>
      <div className="dg-pub-col">
        <span className="dg-pub-label">Campaign</span>
        <div className="dg-card">
          <span className="dg-card-name">post.json</span>
          <span className="dg-card-text">Channel, time, media, caption. A POST.md beside it for people.</span>
        </div>
        <div className="dg-card">
          <span className="dg-card-name">channels.json</span>
          <span className="dg-card-text">Which account posts through which adapter.</span>
        </div>
      </div>
      <span className="dg-pub-arrow" aria-hidden>→</span>
      <div className="dg-gate">
        <span className="dg-gate-title">Approval</span>
        <span className="dg-card-text">Dry run first. Nothing goes out until the owner approves these posts, these accounts, these times.</span>
      </div>
      <span className="dg-pub-arrow" aria-hidden>→</span>
      <div className="dg-pub-col">
        <span className="dg-pub-label">Adapters</span>
        {adapters.map((a) => (
          <div key={a.name} className="dg-card">
            <span className="dg-card-name">{a.name}</span>
            <span className="dg-card-text">{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Tools() {
  const tools: { name: string; does: string; layers: LayerKey[] }[] = [
    { name: 'Claude Code · Codex', does: 'Any coding agent runs every workflow in the repo', layers: ORDER },
    { name: 'Claude Design', does: 'Visual design on the brand’s system', layers: ['design', 'static'] },
    { name: 'Headless Chrome', does: 'Renders any HTML design to exact PNGs', layers: ['static'] },
    { name: 'HyperFrames', does: 'HTML timelines for motion graphics', layers: ['video'] },
    { name: 'Remotion', does: 'React video, many variants from one component', layers: ['video'] },
    { name: 'ffmpeg', does: 'Cuts footage to a beat-locked list', layers: ['video'] },
    { name: 'video-use', does: 'Transcript-driven edits', layers: ['video'] },
    { name: 'ElevenLabs', does: 'Transcripts, voiceover, music beds', layers: ['library', 'video'] },
    { name: 'Pexels · Unsplash', does: 'Licensed stock, credits logged', layers: ['library'] },
    { name: 'librosa', does: 'Beat grid for cutting to music', layers: ['video'] },
    { name: 'Git + LFS', does: 'History, undo, media across machines', layers: ['foundation'] },
    { name: 'Postiz', does: 'Scheduling and posting across platforms', layers: ['publish'] },
    { name: 'Meta Ads MCP', does: 'Paid social campaigns and their numbers', layers: ['learn'] },
  ]
  return (
    <div className="dg dg-tools">
      <div className="dg-legend">
        {ORDER.map((key) => (
          <span key={key} className="dg-legend-item" style={tint(key)}>
            <i />
            {LAYERS[key].name}
          </span>
        ))}
      </div>
      <div className="dg-tools-grid">
        {tools.map((t) => (
          <div key={t.name} className="dg-tool">
            <span className="dg-tool-dots">
              {t.layers.map((l) => (
                <i key={l} style={tint(l)} />
              ))}
            </span>
            <span className="dg-tool-name">{t.name}</span>
            <span className="dg-tool-does">{t.does}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Tree() {
  const rows: { path: string; note: string; layer: LayerKey; depth?: number }[] = [
    { path: 'AGENTS.md', note: 'one guide for every agent', layer: 'foundation' },
    { path: 'BRAND.md', note: 'rules, voice, the canon’s moves', layer: 'core' },
    { path: 'brand/', note: '', layer: 'core' },
    { path: 'tokens.json', note: 'every exact value', layer: 'core', depth: 1 },
    { path: 'build.py', note: 'writes each engine’s copy', layer: 'core', depth: 1 },
    { path: 'channels.json', note: 'accounts → adapters', layer: 'publish', depth: 1 },
    { path: 'canon/', note: 'approved work + why it works', layer: 'core' },
    { path: 'guidelines/', note: 'the human-made source', layer: 'core' },
    { path: 'assets/', note: 'the library: marks, fonts, imagery, footage', layer: 'library' },
    { path: 'design-system/', note: 'components + templates, synced to Claude Design', layer: 'design' },
    { path: 'social/<campaign>/', note: 'HTML + PNGs + post.json', layer: 'static' },
    { path: 'print/  decks/', note: 'more static channels', layer: 'static' },
    { path: 'video/', note: 'engine project + cut projects', layer: 'video' },
    { path: 'ads/reports/', note: 'dated, read-only', layer: 'learn' },
  ]
  return (
    <div className="dg dg-tree">
      <span className="dg-tree-root">brand-repo/</span>
      {rows.map((r) => (
        <div key={r.path} className="dg-tree-row" style={tint(r.layer)}>
          <span className="dg-tree-path" style={{ paddingLeft: `${(r.depth ?? 0) * 1.4}rem` }}>
            <i />
            {r.path}
          </span>
          <span className="dg-tree-note">{r.note}</span>
        </div>
      ))}
    </div>
  )
}

function Status() {
  const rows: { layer: LayerKey; state: 'done' | 'partial' | 'next'; text: string }[] = [
        { layer: 'core', state: 'done', text: 'Tokens, rules and canon for every brand.' },
    { layer: 'design', state: 'done', text: 'Built for every brand and live in Claude Design.' },
    { layer: 'library', state: 'done', text: 'Marks, fonts and imagery for every brand; stock and voice tools shared.' },
    { layer: 'static', state: 'done', text: 'Renderer and templates work for any brand.' },
    { layer: 'video', state: 'done', text: 'The most mature layer, shared across every brand.' },
    { layer: 'publish', state: 'partial', text: 'One shared tool and adapters; live for one brand, others connecting accounts.' },
    { layer: 'learn', state: 'partial', text: 'Connected for one brand, read-only for now: it reports, I make the changes.' },
    { layer: 'foundation', state: 'done', text: 'Every brand repo under git, media in LFS.' },
  ]
  const label = { done: 'Built', partial: 'In progress', next: 'Next' }
  return (
    <div className="dg dg-status">
      {rows.map((r) => (
        <div key={r.layer} className="dg-status-row" style={tint(r.layer)}>
          <span className="dg-status-name">
            <i />
            {LAYERS[r.layer].name}
          </span>
          <span className={`dg-pill dg-pill--${r.state}`}>{label[r.state]}</span>
          <span className="dg-status-text">{r.text}</span>
        </div>
      ))}
    </div>
  )
}

const DIAGRAMS: Record<DiagramId, () => React.JSX.Element> = {
  layers: Layers,
  fanout: Fanout,
  core: Core,
  roundtrip: Roundtrip,
  publish: Publish,
  tools: Tools,
  tree: Tree,
  status: Status,
}

export function Diagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const Body = DIAGRAMS[id]
  return (
    <figure className="nt-diagram">
      <Body />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
