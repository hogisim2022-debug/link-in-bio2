# 복습 퀴즈 — 04. Admin 페이지 레이아웃

**연계 문서:** `02` 폴더 구조, `03` Public 페이지 포팅, `04` Admin 레이아웃

---

1. Admin의 Live Preview는 Public 페이지 컴포넌트를 새로 만들지 않고 그대로 가져다 렌더링한다.
2. named props 방식은 `children`보다 코드가 복잡하지만, 슬롯이 하나일 때도 쓰는 것이 좋다.
3. Server Component는 DB에서 데이터를 직접 가져올 수 있지만, 버튼 클릭을 직접 처리하지 못한다.
4. 모바일에서 탭바를 보이게 하려면 CSS에서 `display: none`을 `display: flex`로 바꾼다.

---

## 정답

1. O — `Hero`, `TrustBar` 등 Public 컴포넌트를 `previewPanel`에 그대로 넣어 실제 공개 페이지와 동일한 화면을 보여준다.
2. X — named props는 슬롯이 여러 개일 때 쓴다. 하나일 때는 `children`이 적합하다.
3. O — 서버에서 데이터를 준비하고, 인터랙션은 Client Component에 위임한다.
4. O — `@media (max-width: 768px)` 안에서 `.admin-tabs { display: flex; }`로 바꾼다.
