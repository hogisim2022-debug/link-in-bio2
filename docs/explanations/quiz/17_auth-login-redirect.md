# 복습 퀴즈 — 16. 로그인 & 리다이렉트

**연계 문서:** `07` 인증 Middleware, `14` Supabase DB & RLS, `16` 로그인 리다이렉트

---

1. `getUser()`는 Supabase 서버에서 JWT를 재검증하므로 `getSession()`보다 느리지만 더 안전하다.
2. 로그인 성공 후 `/admin`으로 이동하기만 하면 서버도 새 세션 쿠키를 바로 인식한다.
3. 쿠키 전파 패턴(`setAll`)에서 request와 response 쿠키 둘 다 반영해야 세션이 유지된다.
4. `/login` 페이지에서 이미 로그인된 사용자는 middleware가 `/admin`으로 보낸다.

---

## 정답

1. O — `getSession()`은 로컬 쿠키만 파싱해 위조 가능성이 있다. `getUser()`는 서버에서 검증한다.
2. X — 페이지를 새로 고침(`router.refresh()`)해야 서버 컴포넌트가 새 세션 쿠키를 인식한다.
3. O — request 쿠키는 같은 요청 안에서, response 쿠키는 브라우저 저장을 위해 둘 다 반영해야 한다.
4. O — middleware가 `/login` 접근 시 세션이 있으면 `/admin`으로 리다이렉트한다.
