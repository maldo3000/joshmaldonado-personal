/**
 * Notes panel. Press N (or the Notes button, bottom right) to show what the current slide means
 * (data-explain on its <section>) and the on-stage cue (data-speaker-notes). Closed by default so
 * the projector stays clean; the open state is remembered per browser.
 */
(() => {
  if (/[?&]_snthumb=/.test(location.search) || window.__slideNotes) return;
  window.__slideNotes = true;
  const KEY = 'deck-notes-open';
  let open = false;
  try { open = localStorage.getItem(KEY) === '1'; } catch (e) {}

  const css = document.createElement('style');
  css.textContent = `
    .sn-btn, .sn-panel { position: fixed; z-index: 2147483000; font-family: 'Archivo', sans-serif; color: #EDE9E0; }
    .sn-btn { right: 20px; bottom: 20px; padding: 9px 14px; border: 1px solid #34353A; border-radius: 999px; background: #16171A; font: 500 13px/1 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #B9B6AE; cursor: pointer; }
    .sn-btn:hover, .sn-btn[aria-expanded="true"] { color: #EDE9E0; border-color: #8C9BFF; }
    .sn-panel { right: 20px; bottom: 64px; width: min(520px, calc(100vw - 40px)); max-height: min(70vh, 640px); overflow: auto; box-sizing: border-box; padding: 22px 24px 24px; background: rgba(22, 23, 26, .97); border: 1px solid #34353A; border-radius: 14px; box-shadow: 0 20px 60px rgba(0, 0, 0, .5); }
    .sn-panel[hidden] { display: none; }
    .sn-head { display: flex; justify-content: space-between; gap: 16px; font: 13px/1.3 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8E8C86; }
    .sn-title { margin: 10px 0 0; font-size: 24px; line-height: 1.15; font-weight: 700; }
    .sn-label { margin: 20px 0 6px; font: 12px/1 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8C9BFF; }
    .sn-text { margin: 0; font-size: 16px; line-height: 1.55; color: #D6D2C9; text-wrap: pretty; }
    .sn-cue { color: #9F9C95; }
    @media print { .sn-btn, .sn-panel { display: none !important; } }
  `;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.className = 'sn-btn';
  btn.type = 'button';
  btn.textContent = 'Notes · N';
  const panel = document.createElement('aside');
  panel.className = 'sn-panel';
  panel.setAttribute('aria-label', 'Slide notes');
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = '<div class="sn-head"><span class="sn-num"></span><span>Notes</span></div>'
    + '<h2 class="sn-title"></h2>'
    + '<p class="sn-label">What it means</p><p class="sn-text sn-explain"></p>'
    + '<p class="sn-label">On stage</p><p class="sn-text sn-cue"></p>';
  const $ = (s) => panel.querySelector(s);

  function render() {
    const slides = [...document.querySelectorAll('section[data-label]')];
    const i = Math.max(0, slides.findIndex((s) => s.hasAttribute('data-deck-active')));
    const s = slides[i];
    if (!s) return;
    $('.sn-num').textContent = `${String(i + 1).padStart(2, '0')} / ${slides.length}`;
    $('.sn-title').textContent = s.getAttribute('data-label');
    $('.sn-explain').textContent = s.getAttribute('data-explain') || 'No explanation yet.';
    $('.sn-cue').textContent = s.getAttribute('data-speaker-notes') || 'No cue.';
  }

  function set(v) {
    open = v;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    try { localStorage.setItem(KEY, open ? '1' : '0'); } catch (e) {}
    if (open) render();
  }

  btn.addEventListener('click', (e) => { e.stopPropagation(); set(!open); });
  panel.addEventListener('click', (e) => e.stopPropagation());
  addEventListener('keydown', (e) => {
    const t = e.composedPath ? e.composedPath()[0] : e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'n' || e.key === 'N') set(!open);
    else if (e.key === 'Escape' && open) set(false);
  });
  document.addEventListener('slidechange', () => { if (open) setTimeout(render, 0); });
  const mount = () => { document.body.append(btn, panel); set(open); };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', mount);
  else mount();
})();
