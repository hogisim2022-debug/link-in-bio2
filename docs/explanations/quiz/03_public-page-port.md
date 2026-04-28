# 복습 퀴즈 — 03. Public 페이지 포팅

**연계 문서:** `01` Next.js 초기화, `02` 폴더 구조, `03` Public 페이지 포팅

---

1. mock 데이터의 구조는 실제 DB 스키마와 달라도 된다.
2. `export const metadata`에서 `openGraph` 필드를 설정하면 카카오톡 공유 미리보기에 반영된다.
3. Supabase 연동 후 `Hero`, `LinkItem` 등 컴포넌트 내부 코드는 수정할 필요가 없다.
4. Next.js에서 `??` 연산자는 왼쪽 값이 `null`이거나 `undefined`일 때 오른쪽 값을 쓴다.

---

## 정답

1. X — mock 데이터는 DB 스키마와 동일한 구조여야 한다. 나중에 데이터 소스만 교체하기 위해서다.
2. O — `og:title`, `og:description`, `og:image`가 SNS 공유 미리보기에 사용된다.
3. O — 컴포넌트는 그대로 두고 `page.tsx`의 데이터 소스 두 줄만 바꾸면 된다.
4. O — null 병합 연산자(nullish coalescing)라고 한다.
