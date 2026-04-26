# 복습 퀴즈 — 21. Admin Dashboard

**연계 문서:** `15` Supabase DB & RLS, `20` 링크 클릭 수 집계, `21` Admin Dashboard

---

1. `link_click_events` 테이블에 RLS를 설정하지 않으면 누구나 다른 사람의 클릭 통계를 볼 수 있다.
2. `DashboardStats`에서 기간 필터를 바꿀 때마다 Supabase에 새 요청이 발생한다.
3. `increment_click_count` RPC 안에서 `click_count` 업데이트와 이벤트 삽입 중 하나가 실패하면, 나머지 하나도 자동으로 취소된다.
4. `link_click_events` 테이블의 데이터가 쌓일수록 `links.click_count`는 의미가 없어지므로 삭제해도 된다.
5. 비로그인 방문자가 링크를 클릭하면 `link_click_events`에 행이 삽입되지 않는다.

---

## 정답

1. O — RLS가 없으면 anon 키로 모든 행을 읽을 수 있다. SELECT 정책으로 `auth.uid() = user_id` 조건을 걸어야 본인 데이터만 조회된다.
2. O — `useEffect`가 `period` 상태 변경을 감지하고 Supabase 쿼리를 재실행한다.
3. O — 두 작업이 하나의 PL/pgSQL 함수(트랜잭션) 안에 있어서 원자적으로 실행된다. 하나 실패 시 전체 롤백.
4. X — `links.click_count`는 전체 누적 합계를 빠르게 읽는 데 유용하고, `link_click_events`는 기간별 분석에 쓰인다. 둘은 서로 다른 용도로 공존한다.
5. X — `increment_click_count`는 `SECURITY DEFINER`로 실행되므로 비로그인 방문자도 호출 가능하다. RPC 내부에서 `links.user_id`를 가져와 삽입하기 때문에 이벤트 행이 정상 생성된다.
