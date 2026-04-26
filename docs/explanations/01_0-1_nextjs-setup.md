# Next.js 프로젝트 초기화

**완료한 task:** `0. 프로젝트 셋업 > Next.js 프로젝트 초기화`  
**함께 완료:** Tailwind CSS 설정, Inter 폰트 설정  
**생성 파일:** `app/`, `app/layout.tsx`, `app/globals.css`, `package.json`, `tsconfig.json`, `next.config.ts`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. Next.js에서 `app/admin/page.tsx` 파일을 만들면 자동으로 `/admin` URL이 생긴다.
2. `next/font`를 쓰면 구글 폰트를 외부 네트워크 없이 서버에서 직접 제공한다.
3. `layout.tsx`는 페이지가 바뀔 때마다 새로 렌더링된다.

---

## 왜 Next.js인가?

`index.html` 하나로도 페이지를 보여줄 수 있다.  
하지만 이 프로젝트에는 세 가지 이유로 Next.js가 필요하다.

**1. SSR/ISR (서버 렌더링)**  
방문자가 페이지를 열 때 Supabase에서 데이터를 미리 가져와서 완성된 HTML을 보내준다.  
`index.html`은 브라우저에서 JS가 실행된 후에야 데이터가 채워지므로, 로딩 중 빈 화면이 보인다.

**2. SEO (검색 최적화)**  
구글 봇은 JS 실행 없이 HTML만 읽는다. SSR로 만들어진 페이지는 강사 이름, 경력 텍스트가 처음부터 HTML에 담겨 있어서 검색 노출이 된다.

**3. App Router + 파일 기반 라우팅**  
`app/page.tsx` → `/` (공개 페이지)  
`app/admin/page.tsx` → `/admin` (관리자)  
파일을 만들면 자동으로 URL이 생긴다.

---

## 핵심 개념 1: App Router 폴더 구조

```
app/
├── layout.tsx      ← 모든 페이지를 감싸는 공통 껍데기 (html, body 태그)
├── globals.css     ← 전체 공통 스타일 (디자인 토큰 포함)
├── page.tsx        ← "/" 경로 (공개 페이지)
└── admin/
    └── page.tsx    ← "/admin" 경로 (관리자 페이지)
```

`layout.tsx`는 레이아웃 역할이다. 페이지가 바뀌어도 layout은 유지된다.  
공통 메타태그, 폰트, 글로벌 스타일은 모두 여기서 설정한다.

- ❌ 과거: `"어드민 페이지 만들어줘"`
- ✅ 현재: `"app/admin/page.tsx 만들어줘"`

---

## 핵심 개념 2: `next/font`

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",  // CSS 변수 이름
  subsets: ["latin"],
});
```

`next/font`를 쓰면 구글 폰트를 외부 네트워크 없이 Next.js 서버에서 직접 제공한다.  
`@import url(...)` 방식보다 빠르고, 폰트 로딩 중 레이아웃이 흔들리는 현상(CLS)이 없다.

`variable: "--font-inter"` 로 설정하면 `globals.css`에서 `var(--font-inter)` 로 꺼내 쓸 수 있다.

- ❌ 과거: `"폰트 바꿔줘"`
- ✅ 현재: `"app/layout.tsx에서 next/font로 Noto Sans KR 불러와서 --font-noto CSS 변수로 연결해줘"`

---

## 주요 파일 변경 내용

### `app/layout.tsx`
- Geist 폰트 → Inter 폰트로 교체 (디자인 시스템과 일치)
- `lang="en"` → `lang="ko"` 로 변경
- 메타데이터 기본값을 프로젝트 내용으로 교체

### `app/globals.css`
- Next.js 기본 스타일 제거
- 디자인 토큰 `:root` 변수 통합
- `@theme inline` 으로 Tailwind에 토큰 연결
- `body` 기본 스타일 (Inter 폰트, 배경색, 폰트 크기) 적용

---

## 다음 단계

- `components/` 폴더 생성 (Hero, TrustBar, LinkList 등 컴포넌트 분리)
- `lib/` 폴더 생성 (Supabase 클라이언트 설정)
- Supabase 프로젝트 생성 후 `.env.local` 설정

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. `✓ Ready` 메시지가 뜨는지 확인 (오류 없이 시작됨)
3. 브라우저에서 `http://localhost:3000` 접속
4. 흰 화면이 아닌 기본 레이아웃(배경색·폰트)이 적용된 화면이 뜨는지 확인

---

## 퀴즈 정답

1. Next.js에서 `app/admin/page.tsx` 파일을 만들면 자동으로 `/admin` URL이 생긴다. → **O**  
   ↳ 파일 경로가 곧 URL이 되는 파일 기반 라우팅 방식이다.

2. `next/font`를 쓰면 구글 폰트를 외부 네트워크 없이 서버에서 직접 제공한다. → **O**  
   ↳ `@import url(...)` 방식보다 빠르고 CLS(레이아웃 흔들림)가 없다.

3. `layout.tsx`는 페이지가 바뀔 때마다 새로 렌더링된다. → **X**  
   ↳ 페이지가 바뀌어도 유지된다. 공통 메타태그, 폰트, 글로벌 스타일을 담당하는 껍데기다.
