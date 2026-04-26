# 기본 폴더 구조

**완료한 task:** `0. 프로젝트 셋업 > 기본 폴더 구조 생성`  
**생성 파일:** `components/public/*`, `components/admin/*`, `lib/types.ts`, `lib/supabase/client.ts`, `lib/supabase/server.ts`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. `"use client"`가 없는 컴포넌트는 기본적으로 서버에서 실행된다.
2. Supabase 클라이언트는 브라우저용, 서버용 구분 없이 하나만 쓰면 된다.
3. `useState`나 이벤트 핸들러가 필요한 컴포넌트는 `"use client"`를 붙여야 한다.

---

## 만들어진 구조

```
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── public/          ← 방문자가 보는 페이지 컴포넌트
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── LinkItem.tsx     (LinkItem / CardItem / OverflowCardItem)
│   │   ├── FloatingCTA.tsx
│   │   └── Footer.tsx
│   │
│   └── admin/           ← 관리자 페이지 컴포넌트
│       ├── DashboardStats.tsx
│       ├── LinkEditor.tsx
│       ├── PreviewPane.tsx
│       ├── ProfileForm.tsx
│       └── SEOForm.tsx
│
└── lib/
    ├── types.ts             ← DB 테이블 타입 정의
    └── supabase/
        ├── client.ts        ← 브라우저용 Supabase 클라이언트
        └── server.ts        ← 서버용 Supabase 클라이언트
```

---

## 핵심 개념 1: 컴포넌트를 왜 나누는가?

`index.html`에는 모든 HTML이 한 파일에 있다.  
Next.js에서는 UI를 **컴포넌트**라는 독립된 조각으로 나눈다.

```
index.html (1개 파일, 600줄)
       ↓ 분리
Hero.tsx (프로필 영역)
TrustBar.tsx (경력 + 로고 슬라이더)
LinkItem.tsx (링크 목록)
FloatingCTA.tsx (하단 고정 버튼)
```

장점:
- **재사용**: `PreviewPane`(관리자 미리보기)에서 Public 컴포넌트를 그대로 가져다 쓴다.
- **유지보수**: FloatingCTA 버튼 색을 바꾸려면 `FloatingCTA.tsx` 하나만 열면 된다.
- **협업**: 팀 작업 시 담당 파일이 명확하게 나뉜다.

---

## 핵심 개념 2: `"use client"` 지시어

파일 맨 위에 `"use client"`가 있는 것과 없는 것이 있다.

| | Server Component (기본값) | Client Component (`"use client"`) |
|---|---|---|
| **실행 위치** | 서버에서 HTML 생성 | 브라우저에서 실행 |
| **데이터** | DB 직접 조회 가능 | `useState`, 이벤트 핸들러 사용 가능 |
| **예시** | Hero, TrustBar, Footer | LinkEditor, ProfileForm |

**규칙**: 클릭/입력 같은 사용자 인터랙션이 필요하면 `"use client"`, 데이터를 보여주기만 하면 Server Component로 둔다.

관리자 컴포넌트(`LinkEditor`, `ProfileForm` 등)는 폼 입력과 버튼 클릭이 있으므로 `"use client"`가 붙는다.

- ❌ 과거: `"버튼 컴포넌트 만들어줘"`
- ✅ 현재: `"components/admin/SaveButton.tsx 만들어줘. 클릭 이벤트 있으니까 "use client" 붙여줘"`

---

## 핵심 개념 3: Supabase 클라이언트가 두 개인 이유

```
lib/supabase/client.ts  ← 브라우저에서 실행
lib/supabase/server.ts  ← 서버에서 실행
```

Next.js App Router에서는 서버 컴포넌트와 클라이언트 컴포넌트가 다른 환경에서 실행된다.  
Supabase는 이 두 환경에 맞는 별도 클라이언트를 제공한다.

- **server.ts**: 공개 페이지(`/`)에서 Supabase DB 데이터를 읽을 때 사용. 쿠키로 인증 상태를 확인한다.
- **client.ts**: 관리자 페이지에서 버튼 클릭 → 데이터 저장 같은 인터랙션에 사용.

- ❌ 과거: `"Supabase로 데이터 가져와줘"`
- ✅ 현재: `"서버 컴포넌트니까 lib/supabase/server.ts 써서 데이터 fetch해줘"`

두 파일 모두 현재는 주석 처리 상태다. Supabase 프로젝트 생성 후 `.env.local`을 설정하면 활성화한다.

---

## 핵심 개념 4: TypeScript 타입 (`lib/types.ts`)

| 필드 | 타입 | 설명 |
|------|------|------|
| id | 문자열 | 고유 번호 |
| user_id | 문자열 | 소유자 계정 ID |
| title | 문자열 | 링크 제목 |
| url | 문자열 | 이동할 주소 |
| type | 선택값 | link / card / overflow_card / youtube |
| is_visible | 참/거짓 | 공개 여부 |
| click_count | 숫자 | 누적 클릭 수 |

PRD 9절의 DB 스키마를 TypeScript 타입으로 그대로 옮긴 것이다.  
이 타입을 컴포넌트의 props에 지정하면, 잘못된 데이터가 넘어올 때 빌드 단계에서 오류가 난다.  
런타임 오류를 사전에 잡는다.

---

## 다음 단계

- Supabase 프로젝트 생성 후 `.env.local` 설정
- `lib/supabase/client.ts`, `server.ts` 주석 해제
- `components/public/` 컴포넌트에 `index.html` UI 이식 시작

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행 — 오류 없이 시작되는지 확인
2. VS Code 사이드바(또는 파일 탐색기)에서 다음 폴더·파일이 생성됐는지 확인
   - `components/public/` — Hero, TrustBar, LinkItem 등
   - `components/admin/` — AdminShell, LinkEditor 등
   - `lib/supabase/client.ts`, `lib/supabase/server.ts`
   - `lib/types.ts`

---

## 퀴즈 정답

1. `"use client"`가 없는 컴포넌트는 기본적으로 서버에서 실행된다. → **O**  
   ↳ App Router에서는 모든 컴포넌트가 기본적으로 Server Component다.

2. Supabase 클라이언트는 브라우저용, 서버용 구분 없이 하나만 쓰면 된다. → **X**  
   ↳ 실행 환경이 다르므로 `client.ts`(브라우저)와 `server.ts`(서버) 두 개를 구분해 쓴다.

3. `useState`나 이벤트 핸들러가 필요한 컴포넌트는 `"use client"`를 붙여야 한다. → **O**  
   ↳ 클릭, 입력 같은 사용자 인터랙션은 브라우저에서만 동작한다.
