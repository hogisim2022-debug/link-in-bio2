# 복습 퀴즈 — 11. Primary CTA 드롭다운

**연계 문서:** `05` Live Preview, `08~10` Link Manager, `11` Primary CTA

---

1. `ctaUrl`을 `useState`로 따로 관리하면 `ctaLinkId`와 불일치 버그가 생길 수 있다.
2. 파생 상태는 렌더링마다 새로 계산되므로 성능상 문제가 된다.
3. 미리보기의 CTA 버튼은 `position: sticky`를 써서 미리보기 하단에 고정한다.
4. 링크 목록이 비어 있으면 드롭다운에 옵션이 표시되지 않는다.

---

## 정답

1. O — `ctaLinkId`는 A인데 `ctaUrl`은 B인 불일치 버그가 생길 수 있다. 파생 상태로 계산하면 항상 일치한다.
2. X — 간단한 계산이라 렌더링마다 다시 계산해도 성능 문제가 없다. 상태 최소화의 이점이 더 크다.
3. O — `position: fixed`는 뷰포트 기준이라 미리보기 박스 밖에 붙어버리므로 `sticky`로 대체했다.
4. O — `links` 목록이 비어 있으면 `map`으로 생성되는 `<option>`도 없다.
