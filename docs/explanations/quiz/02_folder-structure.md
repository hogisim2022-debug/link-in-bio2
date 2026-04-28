# 복습 퀴즈 — 02. 기본 폴더 구조

**연계 문서:** `01` Next.js 초기화, `02` 폴더 구조

---

1. `components/public/` 안의 컴포넌트는 `"use client"` 없이도 관리자 페이지에서 재사용할 수 있다.
2. `lib/supabase/server.ts`는 `useState`를 쓰는 Client Component에서 호출해야 한다.
3. TypeScript 타입을 미리 정의해 두면 잘못된 데이터가 넘어올 때 런타임이 아닌 빌드 단계에서 오류가 난다.
4. `"use client"` 지시어는 파일 맨 아래에 작성해야 한다.

---

## 정답

1. O — Server Component인 `Hero`, `TrustBar` 등은 admin의 Live Preview에서 그대로 재사용한다.
2. X — `server.ts`는 서버 환경에서만 동작한다. Client Component에서는 `client.ts`를 써야 한다.
3. O — TypeScript가 빌드 시 타입을 검사해 런타임 오류를 사전에 방지한다.
4. X — 파일 맨 위에 작성해야 한다.
