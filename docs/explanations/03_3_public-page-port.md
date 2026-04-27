# Public 페이지 Next.js 포팅

**완료한 task:** `3. Public 페이지 → Next.js 컴포넌트 포팅 (mock 데이터)`  
**생성/수정 파일:** `app/page.tsx`, `app/globals.css`, `components/public/*`, `lib/mock-data.ts`, `next.config.ts`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. mock 데이터를 쓰는 이유는 Supabase 없이도 UI 개발을 진행하기 위해서다.
2. Supabase 연동 후에는 컴포넌트 코드도 함께 바꿔야 한다.

---

## 무엇을 했나?

`index.html` 한 파일에 있던 HTML + CSS + 데이터를 Next.js 구조로 분리했다.

```
index.html (600줄, 정적)
       ↓
app/page.tsx          ← 페이지 조립 (데이터 → 컴포넌트에 전달)
app/globals.css       ← 모든 CSS (디자인 토큰 + 컴포넌트 스타일)
lib/mock-data.ts      ← 임시 데이터 (Supabase 연동 전)
components/public/
  ├── Hero.tsx
  ├── TrustBar.tsx
  ├── LinkItem.tsx    ← LinkItem + OverflowCardItem
  ├── FloatingCTA.tsx
  └── Footer.tsx
```

---



---

## 핵심 개념 3: mock 데이터 패턴

```ts
// lib/mock-data.ts
export const mockProfile: Profile = {
  name: "김강사",
  bio: "AI전공 AI교육 강사",
  // ...
};
```

Supabase 없이도 개발할 수 있도록 DB 데이터와 동일한 구조로 가짜 데이터를 만들어 둔다.  
나중에 Supabase 연동이 완료되면 `page.tsx`에서 이 두 줄만 바꾸면 된다.

```tsx
// 변경 전 (mock)
import { mockProfile, mockLinks, mockLogos } from "@/lib/mock-data";

// 변경 후 (Supabase)
const { profile, links, logos } = await fetchPublicPageData();
```

컴포넌트는 그대로 두고 데이터 소스만 바꾸는 것이다.

---

## 핵심 개념 4: metadata (SEO)

```tsx
// app/page.tsx
export const metadata: Metadata = {
  title: mockProfile.seo_title ?? "",
  description: mockProfile.seo_description ?? "",
  openGraph: {
    title: mockProfile.seo_title ?? "",
    description: mockProfile.seo_description ?? "",
  },
};
```

Next.js에서 `metadata` 객체를 export하면 자동으로 `<head>` 안에 메타태그를 넣어준다.  
`index.html`에서 직접 썼던 `<meta>` 태그를 TypeScript 코드로 관리한다.  
`??`는 null이면 빈 문자열(`""`)을 쓰라는 뜻이다.

- ❌ 과거: `"SEO 태그 넣어줘"`
- ✅ 현재: `"app/page.tsx에 export const metadata 객체로 title, description, openGraph 추가해줘"`

---

## 다음 단계

- Supabase 연동 후 `lib/mock-data.ts` 삭제
- `app/page.tsx`에서 Supabase `createClient`로 데이터 페칭으로 교체
- `generateMetadata` 함수로 변경 (동적 메타데이터)
- 링크 클릭 시 `increment_click_count` RPC 호출 추가

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. 프로필 사진, 이름, 한 줄 소개가 표시되는지 확인
4. 링크 목록(기본형·카드형)이 나타나는지 확인
5. 하단에 초록색 Floating CTA 버튼이 고정되는지 확인
6. 브라우저 탭 제목이 설정한 `seo_title` 값으로 표시되는지 확인

---

## 퀴즈 정답

1. mock 데이터를 쓰는 이유는 Supabase 없이도 UI 개발을 진행하기 위해서다. → **O**  
   ↳ DB 데이터와 동일한 구조로 가짜 데이터를 만들어 두는 패턴이다.

2. Supabase 연동 후에는 컴포넌트 코드도 함께 바꿔야 한다. → **X**  
   ↳ 컴포넌트는 그대로 두고 `page.tsx`의 데이터 소스 두 줄만 바꾸면 된다.
