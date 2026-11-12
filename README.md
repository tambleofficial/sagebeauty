# SAYJI BEAUTY — Cloudflare Pages 배포

## 1. GitHub
이 폴더의 내용을 그대로 GitHub 저장소 루트에 올립니다.

## 2. Cloudflare Pages
Workers & Pages → Create → Pages → Connect to Git → 저장소 선택
- Framework preset: None
- Build command: (비움)
- Build output directory: /

## 3. 도메인 교체 (필수)
현재 주소는 임시로 https://sayjibeauty.co.kr 로 들어가 있습니다.
실제 도메인 연결 후 아래 파일에서 https://sayjibeauty.co.kr 를 실제 도메인으로 일괄 변경하세요.
- index.html, brand.html, program.html, correction.html, cases.html, contact.html (canonical / og)
- sitemap.xml, rss.xml, robots.txt

## 4. 검색 등록
- 네이버 서치어드바이저: 사이트 등록 → sitemap.xml, rss.xml 제출
- Google Search Console: sitemap.xml 제출

## 페이지 주소
/ · /brand · /program · /correction · /cases · /contact

## 참고
- 영상/이미지: assets/media (Cloudflare Pages 파일당 25MB 제한)
- 이미지 교체: 같은 파일명으로 assets/media 에 덮어쓰기

## 관리자
- 편집 모드: /edit (비밀번호 로그인)
- Pages CMS: 방문자 후기 목록 (content/reviews.json)
