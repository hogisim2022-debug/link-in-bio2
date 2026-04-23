# 디자인 시스템 토큰 (globals.css)

**완료한 task:** `0. 프로젝트 셋업 > Design System CSS 토큰 적용`  
**생성 파일:** `globals.css` (Next.js 세팅 후 `app/globals.css`로 이동 예정)

---

## 왜 만들었나?

`index.html`에는 CSS가 `<style>` 태그 안에 직접 작성되어 있습니다.  

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
위처럼 하드코딩되어있는 것들을 컬러나 간격 값이 파일마다 따로 적혀 있으면 나중에 색깔 하나 바꾸려 해도 수십 군데를 찾아야 하는 불상사가 발생합니다.

그래서 `globals.css` 하나에 모든 값을 **이름 붙인 변수**로 정리해 두면,  
`--sb-green-accent` 값 하나만 바꿔도 프로젝트 전체에 즉시 반영됩니다.

--sb는 Starbucks의 약자입니다.

이 프로젝트의 디자인 시스템이 docs/Design_System/README.md에 명시된 대로 Starbucks 디자인 시스템에서 영감을 받아만들어졌기 때문입니다.

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

- `:root` 에 선언하면 HTML 전체 어디서든 사용할 수 있습니다.
- `--이름: 값` 형식으로 선언합니다.
- `var(--이름)` 으로 꺼내 씁니다.
- 자바스크립트로도 런타임에 바꿀 수 있습니다 (다크모드, 테마 변경 등).

---

## 핵심 개념 2: Design Tokens (디자인 토큰)

디자인 토큰이란 **"우리 프로젝트에서 쓰는 색, 크기, 간격의 공식 목록"** 입니다.  
디자이너와 개발자가 같은 이름으로 대화할 수 있게 해줍니다.

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

브라우저 기본 폰트 크기는 `16px`입니다.  
`62.5%`를 설정하면 `1rem = 10px`이 되어서, `1.6rem`이 `16px`이라고 바로 계산할 수 있습니다.  
예를 들면 `2.4rem = 24px`, `3.2rem = 32px` — 10의 배수라 직관적입니다.

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
Next.js 포팅 시 해당 블록을 삭제하고 `globals.css`를 import하면 됩니다.

```tsx
// app/layout.tsx
import '@/app/globals.css'
```

---

## 다음 단계

- Next.js 프로젝트 생성 후 이 파일을 `app/globals.css`로 이동
- `index.html`의 인라인 `:root` 블록 제거
- Tailwind를 쓴다면 `tailwind.config.ts`의 `theme.extend`에 토큰 값을 동기화
