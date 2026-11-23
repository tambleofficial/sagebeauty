// 관리자에서 바꾼 내용(content/*.json)을 페이지에 넣어주는 클라우드플레어 미들웨어.
// window.__CMS = { text, media, reviews } 로 넣고, /assets/sj-cms.js 가 화면에 반영합니다.
// 바꾼 문구는 서버에서도 미리 바꿔서 보내 검색엔진이 새 문구를 읽을 수 있게 합니다(글자 하나로 된 단순 문구만).
const FILES = ['text', 'media', 'reviews'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function loadCms(ctx, url) {
  const data = {};
  await Promise.all(FILES.map(async (name) => {
    try {
      const r = await ctx.env.ASSETS.fetch(new URL('/content/' + name + '.json', url));
      if (r.ok) data[name] = await r.json();
    } catch (e) { /* 파일이 없으면 건너뜀 */ }
  }));
  return data;
}

export function inject(html, data, extraHead = '', serverText = true) {
  const T = serverText ? ((data.text && data.text.t) || {}) : {};
  for (const [from, to] of Object.entries(T)) {
    if (!from || from.includes('\n') || to.includes('\n') || from.length < 2) continue;
    html = html.split('>' + esc(from) + '<').join('>' + esc(to) + '<');
  }
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return html.replace(/<head>/i, (m) => m + extraHead + '<script>window.__CMS=' + json + ';</script>');
}

// 검색로봇(네이버 Yeti, 구글 등)은 자바스크립트로 그리는 화면을 잘 못 읽어서,
// 방문자에게 보이는 화면을 미리 그려 둔 seo/*.html 을 로봇에게만 보냅니다(내용은 같음).
const BOT_RE = /Yeti|NaverBot|Googlebot|Google-InspectionTool|AdsBot-Google|Storebot-Google|bingbot|BingPreview|msnbot|Daumoa|Daum|kakaotalk-scrap|Applebot|DuckDuckBot|YandexBot|Baiduspider|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Pinterest/i;
const SEO_PAGES = { '/': 'home', '/index': 'home', '/brand': 'brand', '/program': 'program', '/correction': 'correction', '/cases': 'cases', '/contact': 'contact' };
const APEX = 'sayjibeauty.co.kr';

export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const p = url.pathname;

  // www 로 들어오면 대표 주소로 영구 이동 (DNS only 라 존 규칙 대신 여기서 처리)
  if (url.hostname === 'www.' + APEX) {
    return Response.redirect('https://' + APEX + p + url.search, 301);
  }

  // 네이버·구글 소유확인 파일은 .html 주소 그대로 200 으로 (Pages 기본 동작은 308 이동)
  if (/^\/(naver|google)[0-9a-f]+\.html$/.test(p)) {
    const r = await ctx.env.ASSETS.fetch(new URL(p.replace(/\.html$/, ''), url));
    if (r.ok) return new Response(await r.text(), { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } });
  }

  // 로봇용 화면 파일은 직접 열지 못하게
  if (p === '/seo' || p.startsWith('/seo/')) return new Response('Not found', { status: 404 });

  if (p.startsWith('/edit') || p.startsWith('/api/') || p.startsWith('/assets/') || p.startsWith('/content/')) return ctx.next();

  const key = SEO_PAGES[p.length > 1 ? p.replace(/\/+$/, '').replace(/\.html$/, '') : p];
  const ua = ctx.request.headers.get('user-agent') || '';
  if (key && BOT_RE.test(ua) && (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')) {
    const r = await ctx.env.ASSETS.fetch(new URL('/seo/' + key, url));
    if (r.ok) {
      const data = await loadCms(ctx, url);
      const html = inject(await r.text(), data).replace(/<script>window\.__CMS=[\s\S]*?<\/script>/, '');
      return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'vary': 'User-Agent', 'cache-control': 'public, max-age=0, must-revalidate', 'x-sj-render': 'prerender' } });
    }
  }

  const res = await ctx.next();
  const type = res.headers.get('content-type') || '';
  if (!type.includes('text/html') || p.endsWith('.dc.html') || res.status !== 200) return res;
  const data = await loadCms(ctx, url);
  const html = inject(await res.text(), data);
  const headers = new Headers(res.headers);
  headers.delete('content-length');
  headers.delete('etag');
  if (key) headers.set('vary', 'User-Agent');
  return new Response(html, { status: res.status, headers });
}
