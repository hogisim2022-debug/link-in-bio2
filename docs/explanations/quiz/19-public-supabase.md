# 복습 퀴즈 — 19. Public 페이지 Supabase 연동

**연계 문서:** `13` ISR, `15` Supabase DB & RLS, `16` Storage, `19` Public 페이지 연동

---

1. mock 데이터에서 Supabase로 교체할 때 Hero, LinkItem 같은 컴포넌트 내부 코드도 함께 수정해야 한다.
2. `profile` 테이블에 데이터가 없으면 공개 페이지에 아무것도 표시되지 않는다.
3. `revalidate = 60`이 설정되어 있어도 Supabase에서 데이터를 fetch하지 않으면 ISR로 동작하지 않는다.
4. Supabase Storage 이미지를 `next/image`로 표시하려면 `next.config.ts`에 해당 도메인을 등록해야 한다.
5. RLS의 SELECT 정책이 "모든 방문자 허용"으로 설정되어 있지 않으면 공개 페이지에서 데이터를 읽을 수 없다.

---

## 정답

1. X — 컴포넌트는 그대로다. `page.tsx`에서 데이터 소스(mock → Supabase)만 바꾸면 된다.
2. O — `if (!profile) return null`에 걸려 빈 화면이 표시된다. 초기 데이터 입력이 필요하다.
3. O — `fetch` 없이 import만 쓰면 Next.js가 완전 정적으로 판단해 ISR이 작동하지 않는다. (13번 문서 참고)
4. O — 허용되지 않은 도메인의 이미지는 `next/image`가 차단한다. (16번 문서 참고)
5. O — SELECT가 비공개면 로그인 없이 방문자가 데이터를 읽지 못한다. (15번 문서 참고)
