/**
 * <live-embed> — a live website inside a slide, framed like a browser window.
 *
 *   <div style="position:relative"><live-embed
 *     src="https://bruno-simon.com/"          site to load
 *     poster="assets/posters/bruno.jpg"       screenshot shown before load, offline, and in thumbnails
 *     video="assets/clips/bruno.mp4"          optional: a recording that loops while the slide is up;
 *                                             the live site loads only when you click
 *     label="bruno-simon.com"                 text in the address bar (defaults to the host + path)
 *     mode="link"                             optional: site refuses iframes, show poster and open in a new tab
 *     scale="0.75"                            optional: render the site larger and shrink it to fit
 *     keep                                    optional: keep the site loaded after leaving the slide
 *   ></live-embed></div>
 *
 * The embed fills its nearest positioned ancestor, like <image-slot>.
 * With a video, the recording plays (muted, looping) instead of loading the
 * site, so the slide works offline and nothing heavy runs until you ask.
 * The iframe only exists while its slide (or the slide before it) is
 * active, so the next site preloads but heavy WebGL sites don't all run
 * at once. A click shield sits over the site so slide
 * navigation keeps working; click to interact, move the pointer off the
 * frame to hand the keyboard back to the deck.
 */
(() => {
  if (customElements.get('live-embed')) return;

  const CSS = `
    .frame{position:absolute;inset:0;display:flex;flex-direction:column;background:#0B0B0D;border:1px solid #34353A;overflow:hidden}
    .bar{flex:none;height:56px;display:flex;align-items:center;gap:18px;padding:0 20px;background:#18191C;border-bottom:1px solid #34353A;font-family:'Space Mono',monospace;font-size:20px;letter-spacing:0.04em;color:#8E8C86}
    .dots{display:flex;gap:9px;flex:none}
    .dots i{width:12px;height:12px;border-radius:50%;background:#34353A}
    .url{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#B9B6AE}
    .badge{flex:none;display:flex;align-items:center;gap:10px;font-size:17px;letter-spacing:0.1em;text-transform:uppercase}
    .badge b{width:10px;height:10px;border-radius:50%;background:#8E8C86}
    :host([data-state="live"]) .badge,:host([data-state="interact"]) .badge{color:var(--acchi,#8C9BFF)}
    :host([data-state="live"]) .badge b,:host([data-state="interact"]) .badge b{background:var(--acchi,#8C9BFF);box-shadow:0 0 0 4px color-mix(in srgb,var(--acchi,#8C9BFF) 25%,transparent)}
    .open{flex:none;color:#8E8C86;text-decoration:none;font-size:24px;line-height:1;padding:4px 2px}
    .open:hover{color:#EDE9E0}
    :host([data-state="empty"]) .open,:host([data-state="empty"]) .shield{display:none}
    .body{position:relative;flex:1;min-height:0;overflow:hidden;background:#0B0B0D}
    .poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;transition:opacity .4s}
    :host([data-state="live"]) .poster,:host([data-state="interact"]) .poster{opacity:0}
    .clip{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;opacity:0;transition:opacity .3s}
    :host([data-state="clip"]) .clip,:host([data-state="loading"]) .clip{opacity:1}
    .empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:24px;color:#5A5954}
    iframe{position:absolute;top:0;left:0;border:0;background:transparent;transform-origin:0 0}
    .shield{all:unset;position:absolute;inset:0;cursor:pointer;display:flex;align-items:flex-end;justify-content:center;padding:28px;box-sizing:border-box}
    :host([data-state="interact"]) .shield{pointer-events:none}
    :host([data-state="interact"]) .shield .hint{opacity:0}
    .hint{font-family:'Space Mono',monospace;font-size:20px;letter-spacing:0.06em;text-transform:uppercase;color:#EDE9E0;background:rgba(17,18,20,0.88);border:1px solid #34353A;padding:12px 20px;opacity:0;transition:opacity .2s}
    .shield:hover .hint,.shield:focus-visible .hint{opacity:1}
  `;

  function prettyUrl(src) {
    try {
      const u = new URL(src);
      return (u.host + u.pathname).replace(/^www\./, '').replace(/\/$/, '');
    } catch (e) { return src || ''; }
  }

  class LiveEmbed extends HTMLElement {
    static get observedAttributes() { return ['src', 'poster', 'label', 'mode', 'scale', 'video']; }

    constructor() {
      super();
      // Render the static chrome here, not in connectedCallback: the deck's
      // thumbnail rail clones slides without connecting them, and adopts
      // whatever the constructor put in the shadow root.
      this.attachShadow({ mode: 'open' });
      this._render();
    }

    _render() {
      const src = this.getAttribute('src') || '';
      const poster = this.getAttribute('poster');
      const label = this.getAttribute('label') || prettyUrl(src);
      const link = this.getAttribute('mode') === 'link';
      const clip = this.getAttribute('video');
      const badge = !src ? 'No URL' : clip ? 'Recording' : link ? 'Screenshot' : 'Live';
      const hint = link ? 'Click to open live &#8599;' : clip ? 'Click to try it live' : 'Click to interact';
      this.shadowRoot.innerHTML = `<style>${CSS}</style>
        <div class="frame">
          <div class="bar">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="url"></span>
            <span class="badge"><b></b><span class="state">${badge}</span></span>
            <a class="open" target="_blank" rel="noopener" title="Open in a new tab">&#8599;</a>
          </div>
          <div class="body">
            ${poster ? '<img class="poster" alt="">' : '<div class="empty"></div>'}
            ${clip ? '<video class="clip" muted loop playsinline preload="none"></video>' : ''}
            <button class="shield" type="button"><span class="hint">${hint}</span></button>
          </div>
        </div>`;
      const r = this.shadowRoot;
      r.querySelector('.url').textContent = label;
      r.querySelector('.open').href = src;
      if (poster) r.querySelector('.poster').src = poster;
      else r.querySelector('.empty').textContent = label;
      // The clip's src is set on first play, so thumbnail clones never download it.
      this._clip = r.querySelector('.clip');
      r.querySelector('.shield').addEventListener('click', (e) => this._onShield(e));
      r.querySelector('.open').addEventListener('click', (e) => e.stopPropagation());
      this._iframe = null;
    }

    connectedCallback() {
      this.addEventListener('pointerleave', this._release = () => this._endInteract());
      this._slide = this.closest('section, [data-deck-slide]');
      document.addEventListener('slidechange', this._onSlide = () => this._sync());
      this._sync();
    }

    disconnectedCallback() {
      document.removeEventListener('slidechange', this._onSlide);
      this.removeEventListener('pointerleave', this._release);
      clearTimeout(this._loadTimer);
      this._unload();
    }

    attributeChangedCallback() {
      if (!this.shadowRoot) return;
      this._unload();
      this._render();
      if (this.isConnected) this._sync();
    }

    get _active() {
      // No slide wrapper (embed used outside the deck): treat as always active.
      return !this._slide || this._slide.hasAttribute('data-deck-active');
    }

    get _wanted() {
      if (this._active) return true;
      const prev = this._slide.previousElementSibling;
      return !!(prev && prev.hasAttribute('data-deck-active'));
    }

    get _linkOnly() {
      return this.getAttribute('mode') === 'link' || this._frameBlocked;
    }

    // The page hosting the deck refused to frame this site (its CSP has no
    // room for it, e.g. when the deck is viewed as a hosted artifact): fall
    // back to the screenshot + open-in-new-tab card instead of a blank frame.
    _blocked() {
      this._frameBlocked = true;
      this._unload();
      const r = this.shadowRoot;
      r.querySelector('.hint').innerHTML = 'Click to open live &#8599;';
      if (this._clip) { this._sync(); return; }
      this.dataset.state = 'link';
      r.querySelector('.state').textContent = 'Screenshot';
    }

    _playClip() {
      const v = this._clip;
      if (!v.getAttribute('src')) v.src = this.getAttribute('video');
      if (v.paused) { v.currentTime = 0; v.play().catch(() => {}); }
    }

    _stopClip() {
      if (!this._clip.paused) this._clip.pause();
    }

    _sync() {
      clearTimeout(this._loadTimer);
      if (!this.getAttribute('src')) { this.dataset.state = 'empty'; return; }
      if (this._clip) {
        // Recording first: the live site only loads on click (_onShield).
        if (!this._active) {
          this._stopClip();
          if (this.hasAttribute('keep')) this._endInteract(); else this._unload();
        } else if (!this._iframe) {
          this._playClip();
        }
        if (!this._iframe) this.dataset.state = 'clip';
        return;
      }
      if (this._linkOnly) { this.dataset.state = 'link'; return; }
      if (this._wanted) {
        // Small delay so a fast click-through doesn't spin up every site.
        if (!this._iframe) this._loadTimer = setTimeout(() => this._load(), 350);
        if (!this._active) this._endInteract();
      } else if (!this.hasAttribute('keep')) {
        this._unload();
      } else {
        this._endInteract();
      }
    }

    _load() {
      if (this._iframe || !this._wanted || !this.getAttribute('src')) return;
      if (navigator.onLine === false) { this.dataset.state = 'offline'; return; }
      const s = Math.min(1, Math.max(0.2, parseFloat(this.getAttribute('scale')) || 1));
      const f = document.createElement('iframe');
      f.style.width = `${100 / s}%`;
      f.style.height = `${100 / s}%`;
      f.style.transform = `scale(${s})`;
      f.setAttribute('allow', 'autoplay; fullscreen; gamepad; accelerometer; gyroscope; xr-spatial-tracking; clipboard-write');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('title', this.getAttribute('label') || prettyUrl(this.getAttribute('src')));
      // Cross-origin pages often paint a beat after load; hold the poster
      // until then so the frame never flashes empty.
      f.addEventListener('load', () => setTimeout(() => {
        if (this._iframe === f && this.dataset.state === 'loading') this.dataset.state = 'live';
      }, 1200));
      f.src = this.getAttribute('src');
      this.dataset.state = 'loading';
      this.shadowRoot.querySelector('.body').insertBefore(f, this.shadowRoot.querySelector('.shield'));
      this._iframe = f;
    }

    _unload() {
      if (this._iframe) { this._iframe.remove(); this._iframe = null; }
      if (!this._linkOnly) this.dataset.state = 'idle';
    }

    _onShield(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this._linkOnly) {
        window.open(this.getAttribute('src'), '_blank', 'noopener');
        return;
      }
      if (!this._iframe) { clearTimeout(this._loadTimer); this._load(); }
      if (this._iframe) {
        if (this._clip) this._stopClip();
        this.dataset.state = 'interact';
        this._iframe.focus();
      }
    }

    _endInteract() {
      if (this.dataset.state !== 'interact') return;
      this.dataset.state = 'live';
      // Pull keyboard focus back out of the site so arrow keys and the
      // clicker drive the deck again.
      if (this._iframe) this._iframe.blur();
      if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
      window.focus();
    }
  }

  customElements.define('live-embed', LiveEmbed);

  const origin = (u) => { try { return new URL(u, location.href).origin; } catch (e) { return null; } };
  document.addEventListener('securitypolicyviolation', (e) => {
    if (!/^(frame|child|default)-src/.test(e.effectiveDirective || e.violatedDirective || '')) return;
    const blocked = origin(e.blockedURI);
    if (!blocked) return;
    document.querySelectorAll('live-embed').forEach((el) => {
      if (!el._frameBlocked && origin(el.getAttribute('src')) === blocked) el._blocked();
    });
  });
})();
