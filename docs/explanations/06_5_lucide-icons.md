# Lucide React 아이콘

**완료한 task:** `5. 디자인 시스템 > 아이콘: Lucide React`  
**수정 파일:** `components/public/LinkItem.tsx`, `components/public/FloatingCTA.tsx`, `components/admin/AdminShell.tsx`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. SVG 아이콘은 아무리 확대해도 선이 깨지지 않는다.
2. 이모지는 OS마다 모양이 달라서 디자인 일관성을 보장하기 어렵다.

---

## 왜 Lucide인가?

`index.html`에서는 이모지(💬, ✉️, 📄)를 아이콘으로 사용했다.  
이모지는 OS마다 모양이 달라서 디자인 일관성을 보장할 수 없다.  
Lucide는 2px stroke, rounded cap의 SVG 아이콘 세트로, 디자인 시스템 README에 명시된 아이콘 소스다.

---

## 핵심 개념: SVG 아이콘 컴포넌트

- SVG는 Scalable Vector Graphics의 줄임말
- 쉽게 말하면 확대해도 깨지지 않는 이미지 형식

🧩 핵심 개념
- 픽셀로 이루어진 이미지(예: JPG, PNG)가 아니라
- 수학적인 좌표와 선, 도형으로 그린 이미지

그래서 아무리 확대해도 선이 또렷함 👍

- ❌ 과거: `"저장 아이콘 넣어줘"`
- ✅ 현재: `"lucide-react의 Save 아이콘 써줘"`

- ❌ 과거: `"드래그 핸들 아이콘 넣어줘"`
- ✅ 현재: `"lucide-react의 GripVertical 아이콘 써줘"`


## 적용된 곳

| 위치 | 아이콘 | 용도 |
|------|--------|------|
| `LinkItem` | `MessageCircle`, `Mail`, `FileText`, `PenLine`, `Link2` | 링크 타입별 아이콘 |
| `LinkItem` | `ChevronRight` | 화살표 (`›` 대체) |
| `FloatingCTA` | `MessageCircle` | 문의 버튼 |
| `AdminShell` | `LogOut` | 로그아웃 버튼 |

---

## 다음 단계

- Admin 설정 패널 폼 완성 시 `Save`, `Trash2`, `GripVertical`(드래그) 등 추가

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. 링크 목록 각 항목 왼쪽에 아이콘(말풍선, 메일, 문서 등)이 표시되는지 확인
4. 하단 CTA 버튼에 말풍선 아이콘이 보이는지 확인
5. `http://localhost:3000/admin` 접속
6. 링크 행마다 ⠿(드래그), ✏️(수정), 👁(노출), 🗑(삭제) 아이콘이 표시되는지 확인

---

## 퀴즈 정답

1. SVG 아이콘은 아무리 확대해도 선이 깨지지 않는다. → **O**  
   ↳ 픽셀이 아닌 수학적 좌표와 선으로 그리기 때문이다.

2. 이모지는 OS마다 모양이 달라서 디자인 일관성을 보장하기 어렵다. → **O**  
   ↳ 같은 이모지도 iOS, Android, Windows에서 다르게 보인다.
