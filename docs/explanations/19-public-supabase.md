# Public 페이지 Supabase 데이터 연동

**완료한 task:** `3. Public 페이지 > 3-1 SEO 동적 설정 / 3-2 Storage URL / 3-3 client_logos 연동`  
**수정 파일:** `app/page.tsx`, `next.config.ts`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. `export const metadata`를 `generateMetadata` 함수로 바꾸면 DB 데이터로 SEO 정보를 동적으로 설정할 수 있다.
2. mock 데이터에서 Supabase로 교체할 때 컴포넌트 코드도 함께 바꿔야 한다.
3. Supabase Storage 이미지를 `next/image`로 표시하려면 `next.config.ts`에 도메인을 등록해야 한다.

---

## 무엇을 했나?

`app/page.tsx`가 mock 파일 대신 Supabase DB에서 직접 데이터를 가져오도록 교체했다.

```
변경 전
app/page.tsx
  └── import { mockProfile, mockLinks, mockLogos } from "@/lib/mock-data"
              ↓ 하드코딩된 가짜 데이터

변경 후
app/page.tsx
  └── createClient() → Supabase DB 쿼리
              ↓ 실제 DB 데이터 (profile / links / client_logos)
```

변경된 내용:
- `export const metadata` → `export async function generateMetadata()` (DB에서 SEO 정보 조회)
- `PublicPage()` → `async function` (DB에서 profile, links, logos 병렬 조회)
- `next.config.ts` → Supabase Storage 도메인 추가 (`next/image` 사용 허용)

---

## 핵심 개념 1: `generateMetadata` 함수

기존 `export const metadata`는 빌드 시 고정되는 정적 값이다.  
강사가 Admin에서 SEO 제목을 바꿔도 재빌드 전까지 반영되지 않는다.

`generateMetadata` 함수로 바꾸면 ISR 주기(60초)마다 DB에서 최신 값을 읽어온다.

```
정적 metadata        →  빌드 시 고정, DB 변경 반영 안 됨
generateMetadata()   →  요청마다(ISR 주기) DB에서 읽어옴
```

- ❌ 과거: `"SEO 정보 바꿔줘"`
- ✅ 현재: `"export const metadata를 generateMetadata 비동기 함수로 바꾸고 Supabase에서 seo_title, seo_description 읽어와"`

---

## 핵심 개념 2: 병렬 데이터 페칭

페이지에 필요한 데이터가 여러 테이블에 있을 때, 하나씩 순서대로 가져오면 시간이 배로 걸린다.

```
순차 처리 (느림)          병렬 처리 (빠름)
profile 조회 300ms        ┌── profile 조회 300ms
     ↓                    │   links 조회  200ms  → 모두 완료: 300ms
links 조회  200ms         └── logos 조회  150ms
     ↓
logos 조회  150ms
총 650ms                  총 300ms (가장 오래 걸리는 것 기준)
```

`Promise.all()`을 쓰면 세 쿼리가 동시에 실행된다.

- ❌ 과거: `"profile, links, logos 순서대로 가져와"`
- ✅ 현재: `"Promise.all()로 profile, links, logos 세 쿼리 병렬로 실행해"`

---

## 핵심 개념 3: `next/image` 외부 도메인 허용

`next/image`는 보안을 위해 허용된 도메인의 이미지만 최적화한다.  
`next.config.ts`에 Supabase Storage 도메인을 추가하지 않으면 이미지 로딩이 차단된다.

```
next.config.ts에 추가한 것:
{ hostname: "srmoliyhigxamvuntzxz.supabase.co" }
```

- ❌ 과거: `"Supabase 이미지가 안 나와"`
- ✅ 현재: `"next.config.ts의 remotePatterns에 srmoliyhigxamvuntzxz.supabase.co 추가해줘"`

---

## 다음 단계

- 링크 클릭 시 `increment_click_count` RPC 호출 (3-4)
- Admin 저장 버튼 → Supabase DB UPDATE 연동

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. 페이지가 DB 데이터로 표시되는지 확인 (프로필 이름, 링크 목록 등)
4. Supabase 대시보드 → Table Editor → `profile` 테이블에서 이름 수정
5. 60초 후 페이지 새로고침 → 변경된 이름이 반영되는지 확인 (ISR 동작 확인)

---

## 퀴즈 정답

1. `export const metadata`를 `generateMetadata` 함수로 바꾸면 DB 데이터로 SEO 정보를 동적으로 설정할 수 있다. → **O**  
   ↳ `generateMetadata`는 ISR 주기마다 실행되어 DB에서 최신 SEO 정보를 읽어온다.

2. mock 데이터에서 Supabase로 교체할 때 컴포넌트 코드도 함께 바꿔야 한다. → **X**  
   ↳ 컴포넌트는 그대로다. `page.tsx`의 데이터 소스만 바꾸면 된다.

3. Supabase Storage 이미지를 `next/image`로 표시하려면 `next.config.ts`에 도메인을 등록해야 한다. → **O**  
   ↳ 허용되지 않은 도메인의 이미지는 `next/image`가 차단한다.
