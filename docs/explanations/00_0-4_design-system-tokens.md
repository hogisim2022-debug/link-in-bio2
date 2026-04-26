# 디자인 시스템 토큰 (globals.css)

**완료한 task:** `0. 프로젝트 셋업 > Design System CSS 토큰 적용`  
**생성 파일:** `globals.css` (Next.js 세팅 후 `app/globals.css`로 이동 예정)

---

## 이 문서를 읽고 나면 풀 수 있어요

1. CSS 변수를 `:root`에 선언하면 HTML 문서 전체에서 사용할 수 있다.
2. `1rem`은 브라우저 설정과 상관없이 항상 `16px`이다.
3. 디자인 토큰을 쓰면 색상 하나를 바꿀 때 모든 파일을 직접 찾아서 수정해야 한다.
4. `font-size: 62.5%`를 html에 설정하면 `3rem = 30px`이 된다.

---

## 왜 만들었나?

`index.html`에는 CSS가 `<style>` 태그 안에 직접 작성되어 있다.  

```css
<html>
<head>
  <style>
    .hero {
      background-color: #00754A; 
    }

    .footer {
      background-color: #00754A;
    }
  </style>
</head>

```

Next.js로 넘어가면 여러 컴포넌트 파일(Hero, LinkItem, Footer 등)이 분리되는데,  
위처럼 하드코딩되어있는 것들을 컬러나 간격 값이 파일마다 따로 적혀 있으면 나중에 색깔 하나 바꾸려 해도 수십 군데를 찾아야 하는 불상사가 발생한다.

그래서 `globals.css` 하나에 모든 값을 **이름 붙인 변수**로 정리해 두면,  
`--sb-green-accent` 값 하나만 바꿔도 프로젝트 전체에 즉시 반영된다.

--sb는 Starbucks의 약자다.

이 프로젝트의 디자인 시스템이 docs/Design_System/README.md에 명시된 대로 Starbucks 디자인 시스템에서 영감을 받아만들어졌기 때문이다.

```
--sb-green          /* Starbucks Green */
--sb-green-accent   /* Green Accent */
--sb-shadow-frap    /* "Frap" = Frappuccino 주문 버튼 */
```

---

## 핵심 개념 1: CSS Custom Properties (CSS 변수)

```css
:root {
  --sb-green-accent: #00754A;
}

.cta-button {
  background: var(--sb-green-accent);  /* 변수 사용 */
}
```

- `:root` 에 선언하면 HTML 전체 어디서든 사용할 수 있다.
- `--이름: 값` 형식으로 선언한다.
- `var(--이름)` 으로 꺼내 쓴다.
- 자바스크립트로도 런타임에 바꿀 수 있다 (다크모드, 테마 변경 등).

- ❌ 과거: `"배경색 초록으로 바꿔"`
- ✅ 현재: `".hero 배경을 var(--sb-green-accent)로 바꿔"`

---

## 핵심 개념 2: Design Tokens (디자인 토큰)

디자인 토큰이란 **"우리 프로젝트에서 쓰는 색, 크기, 간격의 공식 목록"**이다.  
디자이너와 개발자가 같은 이름으로 대화할 수 있게 해준다.

```
토큰 이름          값        용도
─────────────────────────────────────────────────
--sb-green-accent  #00754A   CTA 버튼, 강조 링크
--sb-neutral-warm  #f2f0eb   페이지 기본 배경색
```

디자이너 → 개발자  
> “페이지 배경은 전부 --sb-neutral-warm으로 통일할게.”  

개발자 → 디자이너  
> “지금 다크모드에서는 --sb-neutral-warm 그대로 써도 괜찮아?”

- ❌ 과거: `”버튼 색 바꿔줘”`
- ✅ 현재: `”CTA 버튼 background를 --sb-green-accent 토큰으로 바꿔”`

---

## 핵심 개념 3: `font-size: 62.5%` 트릭

### rem 이란?
**root em**의 약자
- root = 루트 요소 (보통 <html>)
- em = 현재 폰트 크기 기준 단위

그래서 합치면: 루트(html)의 폰트 크기를 기준으로 한 단위

```css
html {
  font-size: 16px;
}

h1 {
  font-size: 1rem;  /* 16px */
}
```
---

```css
html {
  font-size: 62.5%;  /* 브라우저 기본 16px × 62.5% = 10px */
}

body {
  font-size: 1.6rem; /* 10px × 1.6 = 16px → 본문 크기 */
}
```

브라우저 기본 폰트 크기는 `16px`이다.  
`62.5%`를 설정하면 `1rem = 10px`이 되어서, `1.6rem`이 `16px`이라고 바로 계산할 수 있다.  
예를 들면 `2.4rem = 24px`, `3.2rem = 32px` — 10의 배수라 직관적이다.

- ❌ 과거: `"폰트 좀 키워줘"`
- ✅ 현재: `".hero__name의 font-size를 4rem으로 바꿔"`

---

## globals.css에 담긴 토큰 구조

```
:root
├── 컬러 (--sb-green, --sb-text-black, ...)
├── 폰트 (--sb-font, --sb-text-base, ...)
├── 간격 (--sb-space-1 ~ --sb-space-8)
├── 모서리 반경 (--sb-radius-card, --sb-radius-pill, ...)
├── 그림자 (--sb-shadow-card, --sb-shadow-frap, ...)
└── 애니메이션 (--sb-dur, --sb-ease)
```

---

## index.html과의 관계

`index.html`에 인라인으로 작성된 `:root { ... }` 블록이 바로 이 파일의 내용입니다.  
Next.js 포팅 시 해당 블록을 삭제하고 `globals.css`를 import하면 된다.

```tsx
// app/layout.tsx
import '@/app/globals.css'
```

---

## 다음 단계

- Next.js 프로젝트 생성 후 이 파일을 `app/globals.css`로 이동
- `index.html`의 인라인 `:root` 블록 제거
- Tailwind를 쓴다면 `tailwind.config.ts`의 `theme.extend`에 토큰 값을 동기화

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행 — 오류 없이 시작되는지 확인
2. 브라우저에서 `http://localhost:3000` 접속
3. 페이지 배경이 연한 크림색으로 표시되는지 확인
4. 버튼이 초록색으로 표시되는지 확인
5. 개발자 도구(F12) → Elements → `<html>` 태그 선택 → Styles 탭에서 `--sb-green-accent` 등 CSS 변수가 보이는지 확인

---

## 퀴즈 정답

1. CSS 변수를 `:root`에 선언하면 HTML 문서 전체에서 사용할 수 있다. → **O**  
   ↳ `:root`에 선언하면 HTML 어디서든 `var(--이름)`으로 꺼내 쓸 수 있다.

2. `1rem`은 브라우저 설정과 상관없이 항상 `16px`이다. → **X**  
   ↳ `html`의 `font-size` 설정에 따라 달라진다. `62.5%` 설정 시 `1rem = 10px`.

3. 디자인 토큰을 쓰면 색상 하나를 바꿀 때 모든 파일을 직접 찾아서 수정해야 한다. → **X**  
   ↳ `:root`의 변수 값 하나만 바꾸면 그 변수를 쓰는 모든 곳에 즉시 반영된다.

4. `font-size: 62.5%`를 html에 설정하면 `3rem = 30px`이 된다. → **O**  
   ↳ `62.5%` 설정 시 `1rem = 10px`이므로 `3rem = 30px`.
