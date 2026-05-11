# 복습 퀴즈 — 17. 로그아웃

**연계 문서:** `07` 인증 Middleware, `16` 로그인 리다이렉트, `17` 로그아웃

---

1. 로그아웃 후 뒤로 가기 버튼을 누르면 `/admin`에 다시 접근할 수 있다.
2. `signOut()`은 브라우저 Client Component에서 호출해야 한다.
4. 로그아웃 후 `/login`으로 이동하면 이미 로그아웃된 상태이므로 middleware가 다시 리다이렉트하지 않는다.

---

## 정답

1. X — middleware가 세션 없음을 감지하고 다시 `/login`으로 리다이렉트한다.
2. O — `signOut()`은 브라우저 Supabase 클라이언트(`lib/supabase/client.ts`)를 쓴다.
4. O — middleware는 `/login` 접근 시 세션이 없으면 통과시킨다.
