(function(){
  function md(){ if (window.__sjMedia) return window.__sjMedia; var r = document.getElementById('sj-media'); if (!r) return null; var o = {}; r.querySelectorAll('[data-k]').forEach(function(e){ o['assets/media/' + e.getAttribute('data-k')] = e.getAttribute('src'); }); return (window.__sjMedia = o); }
  var M = '';
  var common = {
    'm-face-1': 'assets/media/main1.mp4', 'm-face-2': 'assets/media/main2.jpg', 'm-face-3': 'assets/media/main3.jpg',
    'm-program-brow': 'assets/media/prog1.jpg', 'm-program-lip': 'assets/media/prog2.jpg', 'm-program-eyeline': 'assets/media/prog3.jpg', 'm-program-correction': 'assets/media/prog4.jpeg', 'p-corr-1': 'assets/media/prog4.jpeg', 'p-corr-2': 'assets/media/rc-brow.jpeg', 'p-corr-3': 'assets/media/rc-lip.jpeg',
    'm-brow-1': 'assets/media/brow1.jpg', 'm-brow-2': 'assets/media/brow2.png', 'm-brow-3': 'assets/media/brow3.jpg|flip',
    'm-lip-1': 'assets/media/lip1.mp4', 'm-lip-2': 'assets/media/lip2.jpg', 'm-lip-3': 'assets/media/lip3.png',
    'm-corr-1': 'assets/media/corr.png',
    'm-consult-01': 'assets/media/consult1.png', 'm-consult-02': 'assets/media/consult2.png', 'm-consult-03': 'assets/media/consult3.jpg', 'm-consult-04': 'assets/media/consult4.jpg', 'm-consult-05': 'assets/media/consult5.mp4',
    'm-dir-1': 'assets/media/director.jpg', 'm-dir-2': 'assets/media/studio1b.png', 'm-dir-3': 'assets/media/studio2.png', 'b-space-3': 'assets/media/studio1.jpg',
    'b-philosophy': 'assets/media/philosophy.png',
    'p-eye-1': 'assets/media/prog3.jpg', 'p-eye-2': 'assets/media/cs6.jpg', 'p-eye-3': 'assets/media/cs10.png',
    'case-01': 'assets/media/case1.png', 'case-02': 'assets/media/case2.png', 'case-03': 'assets/media/case3.png', 'case-04': 'assets/media/case4.jpg', 'case-05': 'assets/media/case5.png', 'case-06': 'assets/media/case6.jpg',
    'review-1': 'assets/media/review1.jpg', 'review-2': 'assets/media/review2.png', 'review-3': 'assets/media/review3.mp4', 'review-4': 'assets/media/review4.png', 'review-5': 'assets/media/review5.jpg'
  };
  var pages = {
    Brand: { 'b-team': 'assets/media/b-director.jpg', 'b-dir-1': 'assets/media/dir1.jpg', 'b-dir-2': 'assets/media/dir2.jpg', 'b-dir-3': 'assets/media/dir3.png', 'b-dir-4': 'assets/media/dir4b.png', 'b-dir-5': 'assets/media/dir5.jpg', 'b-dir-6': 'assets/media/dir6.jpg' },
    Correction: { 'm-corr-1': 'assets/media/rc2.webp', 'c-process': 'assets/media/rc1.webp', 'case-05': 'assets/media/rc-brow.jpeg', 'case-09': 'assets/media/rc-lip.jpeg', 'c-case-3': 'assets/media/rc-eye.jpeg' },
    Cases: { 'ba-before-45': 'assets/media/ba-before.png', 'ba-after-45': 'assets/media/ba-after.png',
      'review-1': 'assets/media/cr1.png', 'review-2': 'assets/media/cr2.jpg', 'review-3': 'assets/media/cr3.jpg', 'review-4': 'assets/media/cr4.jpg', 'review-5': 'assets/media/cr5.png',
      'case-01': 'assets/media/cs1.jpg', 'case-02': 'assets/media/cs2.jpg', 'case-03': 'assets/media/cs3.png', 'case-04': 'assets/media/cs4.jpg', 'case-05': 'assets/media/cs5.jpeg', 'case-06': 'assets/media/cs6.jpg',
      'case-07': 'assets/media/cs7.jpeg', 'case-08': 'assets/media/cs8.png', 'case-09': 'assets/media/cs9.mp4', 'case-10': 'assets/media/cs10.png', 'case-11': 'assets/media/cs11.jpg', 'case-12': 'assets/media/cs12.jpg' }
  };
  var pm = document.querySelector('meta[name="sj-page"]'); var p = (pm ? pm.getAttribute('content') + ' ' : '') + decodeURIComponent(location.pathname + location.href);
  var map = Object.assign({}, common);
  Object.keys(pages).forEach(function(k){ if (p.indexOf(k) >= 0) Object.assign(map, pages[k]); });
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ es.forEach(function(e){ var el = e.target;
      if (el.tagName === 'VIDEO') { if (e.isIntersecting) { if (el.preload !== 'auto') el.preload = 'auto'; var pp = el.play(); if (pp && pp.catch) pp.catch(function(){}); } else if (!el.paused) el.pause(); return; }
      if (e.isIntersecting && el.__sjSrc) { el.setAttribute('src', el.__sjSrc); el.__sjSrc = null; io.unobserve(el); }
    }); }, { rootMargin: window.innerWidth < 760 ? '0px' : '600px 0px' }) : null;
  function apply(){
    var slots = document.querySelectorAll('image-slot[id]');
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i], v = map[s.id] || map[s.id.replace(/^mobile-/, '')]; if (!v) continue;
      var parts = v.split('|'), f = ((md() || {})[parts[0]]) || (M + parts[0]), flip = parts[1] === 'flip';
      if (s.getAttribute('data-media') === f) continue;
      s.setAttribute('data-media', f);
      var host = s.parentElement;
      var old = host && host.querySelector(':scope > video[data-media-video]'); if (old) old.remove();
      if (/\.mp4$/i.test(f)) {
        var vd = document.createElement('video');
        vd.setAttribute('data-media-video', '1');
        vd.src = f; vd.muted = true; vd.defaultMuted = true; vd.setAttribute('muted', ''); vd.loop = true; vd.playsInline = true; vd.setAttribute('playsinline', ''); vd.preload = 'none';
        vd.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none';
        if (host && getComputedStyle(host).position === 'static') host.style.position = 'relative';
        host && host.appendChild(vd);
        if (io) io.observe(vd); else { vd.autoplay = true; var pr = vd.play(); if (pr && pr.catch) pr.catch(function(){}); }
      } else {
        if (io) { s.__sjSrc = f; io.observe(s); } else s.setAttribute('src', f);
      }
      s.style.transform = flip ? 'scaleX(-1)' : '';
    }
  }
  var t; function sched(){ clearTimeout(t); t = setTimeout(apply, 60); }
  new MutationObserver(sched).observe(document.documentElement, { childList: true, subtree: true });
  if (window.__sjMM) return; window.__sjMM = 1;
  apply(); window.addEventListener('load', apply);
})();