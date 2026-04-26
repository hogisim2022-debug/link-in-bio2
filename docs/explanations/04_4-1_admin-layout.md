# Admin 페이지 레이아웃

**완료한 task:** `4. Admin 페이지 > 4-1. 레이아웃`  
**생성 파일:** `app/admin/page.tsx`, `components/admin/AdminShell.tsx`, `app/globals.css` (admin 스타일 추가)

---

## 이 문서를 읽고 나면 풀 수 있어요

1. Server Component는 버튼 클릭 같은 인터랙션을 직접 처리할 수 있다.
2. `children` prop은 여러 개의 독립적인 UI 슬롯을 넘길 때 적합하다.
3. `@media (max-width: 768px)`는 화면 너비가 768px 이하일 때 적용된다.

---

## 만들어진 구조

```
/admin
├── 헤더 (관리자 타이틀 + 로그아웃 버튼)
├── [Desktop] 대시보드 (상단 고정)
├── [Mobile]  탭바 (설정 | 미리보기 | 대시보드)
└── 패널 영역
    ├── 설정 패널 (좌측 420px 고정)
    └── Live Preview (우측 나머지 공간)
```

**Desktop**
```
┌─────────────────────────────────────────────────────────┐
│  관리자                                      [로그아웃]  │  ← 헤더
├─────────────────────────────────────────────────────────┤
│  대시보드   총 클릭수 —  [ 7일 | 30일 ]                  │  ← 대시보드 (상단 고정)
├──────────────────────┬──────────────────────────────────┤
│  프로필 / Trust      │                                  │
│  ─────────────────   │                                  │
│  링크 관리           │        Live Preview              │
│  ─────────────────   │     ( 공개 페이지 렌더링 )       │
│  문의 버튼 연결      │                                  │
│  ─────────────────   │                                  │
│  SEO 설정            │                                  │
│  (420px 고정)        │        (나머지 공간)             │
└──────────────────────┴──────────────────────────────────┘
```

**Mobile (768px 이하)**
```
┌──────────────────────────────┐
│  관리자            [로그아웃] │  ← 헤더
├──────────┬─────────┬─────────┤
│   설정   │ 미리보기 │ 대시보드 │  ← 탭바 (sticky)
├──────────┴─────────┴─────────┤
│                              │
│       활성 탭 내용           │
│                              │
└──────────────────────────────┘
```

---

## 핵심 개념 1: Server Component와 Client Component 분리

Admin 페이지는 두 파일로 나뉜다.

```
app/admin/page.tsx        ← Server Component (데이터 준비, 레이아웃 조립)
components/admin/AdminShell.tsx  ← Client Component (탭 전환 상태 관리)
```

**왜 나눴나?**

“일은 서버에서 최대한 하고, 화면에서만 필요한 건 브라우저에 맡긴다”는 구조

🔹 한 줄 비유
- **서버**: “음식 미리 다 만들어서 보내줌”
- **클라이언트**: “먹다가 반찬 바꿔달라고 하는 역할”

🔹 구조적 역할
- **서버 컴포넌트**: 데이터 준비 + 기본 틀
- **클라이언트 컴포넌트**: 버튼 클릭, 탭 전환 같은 동작



## 핵심 개념 2: children vs named slot props

React에서 컴포넌트에 UI 조각을 넘기는 방법은 두 가지다.

**방법 A: `children`** (하나의 슬롯)
```tsx
<Layout>
  <div>내용</div>
</Layout>
```

**방법 B: named props** (여러 슬롯)
```tsx
<AdminShell
  settingsPanel={<설정 UI />}
  previewPanel={<미리보기 />}
  dashboardPanel={<대시보드 />}
/>
```

Admin은 설정/미리보기/대시보드 세 영역이 독립적으로 교체되므로 named props를 선택했다.  
나중에 설정 패널만 실제 폼으로 교체해도 나머지는 건드리지 않아도 된다.

- ❌ 과거: `"패널 두 개 넘겨줘"`
- ✅ 현재: `"AdminShell에 settingsPanel이랑 previewPanel named props로 UI 조각 넘겨줘"`

---

## 핵심 개념 3: 반응형 레이아웃 (미디어 쿼리)

```css
/* 기본: Desktop 레이아웃 */
.admin-panels {
  display: flex;       /* 좌우로 나란히 */
}
.admin-tabs { display: none; }   /* 탭바 숨김 */

/* 768px 이하: Mobile 레이아웃 */
@media (max-width: 768px) {
  .admin-tabs { display: flex; }  /* 탭바 노출 */
  .admin-settings { width: 100%; } /* 패널 세로 배치 */
}
```

같은 HTML을 브라우저 너비에 따라 다르게 보여준다.  
Desktop에서는 좌우 분할, Mobile에서는 탭 전환 방식으로 바뀐다.

- ❌ 과거: `"모바일에서 탭바 보이게 해줘"`
- ✅ 현재: `"@media (max-width: 768px) 안에서 .admin-tabs를 display: flex로 바꿔"`

---

## 핵심 개념 4: Live Preview

Admin의 우측 패널에는 Public 페이지 컴포넌트를 그대로 가져다 렌더링한다.

```tsx
// app/admin/page.tsx
previewPanel={
  <div className="page">
    <Hero profile={mockProfile} />
    <TrustBar ... />
    <section className="links">...</section>
    <Footer ... />
  </div>
}
```

Public 페이지 컴포넌트를 재사용하기 때문에, 실제 공개 페이지와 완전히 동일한 화면을 보여준다.  
나중에 설정 패널에서 값을 바꾸면 같은 컴포넌트에 다른 데이터를 넘겨서 즉시 반영한다.

---

## 다음 단계

- Supabase Auth 연동 후 `/admin` 접근 보호 (Middleware)
- 설정 패널에 실제 폼 컴포넌트 연결 (ProfileForm, LinkEditor, SEOForm)
- 설정 변경 시 previewPanel에 즉시 반영 (로컬 state 기반)

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000/admin` 접속
3. 상단 헤더에 "관리자" 타이틀과 로그아웃 버튼이 보이는지 확인
4. **Desktop**: 좌측 설정 패널과 우측 미리보기가 나란히 배치되는지 확인
5. 브라우저 창을 좁혀 768px 이하로 줄이면 하단에 탭바(설정 · 미리보기 · 대시보드)가 나타나는지 확인
6. 탭을 눌러 각 탭 내용이 전환되는지 확인

---

## 퀴즈 정답

1. Server Component는 버튼 클릭 같은 인터랙션을 직접 처리할 수 있다. → **X**  
   ↳ 인터랙션은 Client Component(`"use client"`)가 담당한다. Server Component는 데이터 준비와 기본 틀을 맡는다.

2. `children` prop은 여러 개의 독립적인 UI 슬롯을 넘길 때 적합하다. → **X**  
   ↳ `children`은 하나의 슬롯이다. 여러 슬롯은 `settingsPanel`, `previewPanel` 같은 named props를 쓴다.

3. `@media (max-width: 768px)`는 화면 너비가 768px 이하일 때 적용된다. → **O**  
   ↳ 모바일 기기 대응에 주로 사용하는 breakpoint다.
