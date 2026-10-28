/**
 * Full screen for presenting. Press F (or the Full screen button, bottom right) to fill the screen
 * with the slide: the thumbnail rail and the corner buttons hide while full screen is on, and Esc
 * or F again leaves it. N still opens the notes panel.
 */
(() => {
  if (/[?&]_snthumb=/.test(location.search) || window.__deckFullscreen) return;
  window.__deckFullscreen = true;
  const root = document.documentElement;
  const can = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  const current = () => document.fullscreenElement || document.webkitFullscreenElement;

  const css = document.createElement('style');
  css.textContent = `
    .fs-btn { position: fixed; z-index: 2147483000; right: 152px; bottom: 20px; padding: 9px 14px; border: 1px solid #34353A; border-radius: 999px; background: #16171A; font: 500 13px/1 'Space Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #B9B6AE; cursor: pointer; }
    .fs-btn:hover { color: #EDE9E0; border-color: #8C9BFF; }
    .deck-fullscreen .fs-btn, .deck-fullscreen .sn-btn { display: none; }
    @media print { .fs-btn { display: none !important; } }
  `;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.className = 'fs-btn';
  btn.type = 'button';
  btn.textContent = 'Full screen · F';

  function toggle() {
    if (current()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (root.requestFullscreen || root.webkitRequestFullscreen).call(root)?.catch?.(() => {});
  }

  function sync() {
    const on = !!current();
    root.classList.toggle('deck-fullscreen', on);
    const stage = document.querySelector('deck-stage');
    if (stage) stage.toggleAttribute('no-rail', on);
  }

  btn.addEventListener('click', (e) => { e.stopPropagation(); btn.blur(); toggle(); });
  addEventListener('keydown', (e) => {
    if (!can) return;
    const t = e.composedPath ? e.composedPath()[0] : e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggle(); }
  });
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('webkitfullscreenchange', sync);

  // Hidden where the page can't go full screen (e.g. inside a frame that doesn't allow it).
  const mount = () => { if (can) document.body.append(btn); };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', mount);
  else mount();
})();
