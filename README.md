# SAYJI BEAUTY — GitHub → Cloudflare Pages 배포

## 사이트 주소
- 임시 설정 주소: https://sagebeauty.pages.dev
- Cloudflare Pages 프로젝트 이름을 `sagebeauty`로 지정하고, 해당 이름이 실제로 사용 가능할 때만 위 주소가 됩니다.
- 브랜드 표시명 `SAYJI BEAUTY`는 원본과 동일하게 보존했습니다.
- 별도 구매 도메인을 연결한다면 전체 파일의 `https://sagebeauty.pages.dev`를 확정된 사이트 주소로 교체하세요.

## GitHub 배포
ZIP 압축을 풀어 나오는 `index.html`, `_headers`, `assets/` 등이 **저장소 최상위**에 오도록 업로드합니다. 폴더 `deploy/`를 추가로 만들 필요가 없습니다.

Cloudflare 대시보드 → Workers & Pages → Create → Pages → Connect to Git → GitHub 저장소 선택
- Project name: `sagebeauty` (사용 가능할 경우)
- Framework preset: None
- Build command: 비워 두기
- Build output directory: `/` (저장소 루트)

## 수정한 SEO 파일
- `robots.txt`: 크롤링 허용 + 사이트맵 주소
- `sitemap.xml`: 공개 HTML 페이지 6개의 사이트 URL
- `rss.xml`: RSS 2.0 + Atom self link, 공개 페이지 6개의 항목
- HTML 6개: canonical / og:url / og:image / 내부 구조화 데이터의 주소 일치, RSS 자동발견 link 추가

## 배포 후 확인
- https://sagebeauty.pages.dev/robots.txt
- https://sagebeauty.pages.dev/sitemap.xml
- https://sagebeauty.pages.dev/rss.xml
- 네이버 서치어드바이저: 사이트 소유확인 후 사이트맵·RSS 제출
- Google Search Console: 속성 소유확인 후 사이트맵 제출
- 검색 등록은 색인/노출을 보장하지 않습니다.

## 주의
- 실제 프로젝트 이름이 다르면 모든 절대 URL을 실제 사이트 주소로 수정해야 합니다.
- `lastmod`/RSS 날짜는 실제 내용 변경 시 함께 갱신하세요.
- RSS는 현재 정적 페이지 안내용이며, 새 글 자동 발행 피드는 아닙니다.
- 원본 이미지·영상·디자인·JS는 유지했습니다.
