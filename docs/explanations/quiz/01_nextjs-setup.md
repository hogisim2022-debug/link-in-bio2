# 복습 퀴즈 — 01. Next.js 프로젝트 초기화

**연계 문서:** `00` 디자인 토큰, `01` Next.js 초기화

---

1. `globals.css`에 선언한 CSS 변수(`--sb-green-accent` 등)는 `app/layout.tsx`에서 import해야 전체 페이지에 적용된다.
2. Next.js의 파일 기반 라우팅에서 `app/about/page.tsx`는 `/about` URL을 만든다.
3. `next/font`로 불러온 폰트는 CSS 변수 이름으로 `globals.css`와 연결할 수 있다.
4. `layout.tsx`에서 `lang="ko"`를 설정하면 구글이 한국어 페이지로 인식한다.

---

## 정답

1. O — `import '@/app/globals.css'`를 `layout.tsx`에 추가해야 전체에 적용된다.
2. O — 파일 경로가 곧 URL이 된다.
3. O — `variable: "--font-inter"` 옵션으로 지정하면 `var(--font-inter)`로 꺼내 쓸 수 있다.
4. O — `<html lang="ko">`로 선언하면 검색엔진이 언어를 올바르게 인식한다.
