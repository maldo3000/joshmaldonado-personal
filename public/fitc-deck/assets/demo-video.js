/**
 * Demo videos inside slides. Each <video class="demo-video"> plays from the start when its slide
 * becomes active and pauses when you leave. Add data-sound to play with sound (the arrow key or
 * clicker press that changed slides counts as the click browsers need before allowing audio);
 * without it the video loops muted, for talking over.
 */
(() => {
  function sync() {
    document.querySelectorAll('video.demo-video').forEach((v) => {
      const slide = v.closest('section, [data-deck-slide]');
      const active = slide && slide.hasAttribute('data-deck-active');
      if (!active) { if (!v.paused) v.pause(); v._played = false; return; }
      if (v._played) return;
      v._played = true;
      const sound = v.hasAttribute('data-sound');
      v.loop = !sound;
      v.muted = !sound;
      v.currentTime = 0;
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
    });
  }
  document.addEventListener('slidechange', () => setTimeout(sync, 60));
  addEventListener('load', () => setTimeout(sync, 300));
})();
