# 복습 퀴즈 — 05. Live Preview

**연계 문서:** `04` Admin 레이아웃, `05` Live Preview

---

1. 설정 폼과 미리보기가 각자 별도 state를 가지면 입력값이 미리보기에 실시간 반영된다.
2. 상태 끌어올리기(State Lifting)는 데이터를 공유해야 하는 두 컴포넌트의 공통 부모에 state를 두는 패턴이다.
3. `AdminClient`에서 `profile` state가 바뀌면 설정 패널과 미리보기 모두 자동으로 다시 그려진다.
4. Supabase 연동 후 저장 버튼을 누르면 `profile` state를 DB에 UPDATE한다.

---

## 정답

1. X — 각자 별도 state면 서로 독립적으로 움직인다. 같은 state를 공유해야 실시간 반영된다.
2. O — 두 컴포넌트의 공통 부모(`AdminClient`)가 state를 보관하고 내려준다.
3. O — React는 state가 바뀌면 그 state를 읽는 모든 컴포넌트를 다시 렌더링한다.
4. O — 현재는 로컬 state에만 반영되고, Supabase 연동 후 DB UPDATE가 추가된다.
