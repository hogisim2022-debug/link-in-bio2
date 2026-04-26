# 복습 퀴즈 — 08. Link Manager (Drag & Drop)

**연계 문서:** `05` Live Preview, `08` Link Manager

---

1. `DndContext` 없이 `useSortable`만 써도 드래그 앤 드롭이 동작한다.
2. 드래그가 끝나면 `active.id`(집은 것)와 `over.id`(놓은 곳)로 배열을 재정렬한다.
3. 드래그로 순서를 바꾸면 Live Preview에 즉시 반영된다.
4. 링크의 노출 여부 토글(`is_visible`)은 드래그 핸들을 클릭해야 동작한다.

---

## 정답

1. X — `DndContext` → `SortableContext` → `useSortable` 3단계 구조가 모두 필요하다.
2. O — `arrayMove(배열, 원래인덱스, 새인덱스)`로 재정렬한다.
3. O — `links` state가 바뀌면 `AdminClient`를 통해 Live Preview도 즉시 갱신된다.
4. X — 노출 토글은 눈 아이콘 버튼을 클릭해야 한다. 핸들에만 `listeners`를 붙여서 드래그와 충돌하지 않는다.
