# Primary CTA 연결 링크 드롭다운

**완료한 task:** `4. Admin 페이지 > 4-4. Profile & Trust Settings > Primary CTA 연결 링크 드롭다운`  
**수정 파일:** `components/admin/AdminClient.tsx`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. 파생 상태는 기존 상태에서 계산하는 값으로, `useState`로 따로 관리하지 않는다.
2. 드롭다운의 `<option>` 목록은 링크가 추가/삭제돼도 자동으로 갱신되지 않는다.
3. Admin 미리보기에서 `position: fixed`를 그대로 쓰면 미리보기 박스 밖에 붙어버린다.

---

## 무엇을 했나?

설정 패널에 "문의하기 버튼 연결" 드롭다운이 추가됐다.  
링크 목록 중 하나를 선택하면 미리보기 하단의 Floating CTA 버튼이 해당 링크로 즉시 바뀐다.

```
설정 패널 (좌)                     Live Preview (우)
┌──────────────────────────┐       ┌──────────────────────┐
│  문의하기 버튼 연결       │       │  Hero                │
│  하단 고정 버튼이 열 링크 │       │  TrustBar            │
│  ┌────────────────────┐  │       │  LinkList            │
│  │  카카오톡 문의  ▼  │  │──────▶│                      │
│  └────────────────────┘  │       │ ┌──────────────────┐ │
└──────────────────────────┘       │ │ 💬 강의 문의하기 │ │  ← CTA
                                   │ └──────────────────┘ │
                                   └──────────────────────┘
```

---

## 핵심 개념 1: 파생 상태 (Derived State)

```
[저장] ctaLinkId = 드롭다운에서 선택한 링크의 ID
[계산] ctaUrl   = 링크 목록에서 해당 ID의 URL을 찾아옴
```

`ctaUrl`은 `useState`로 따로 관리하지 않는다.  
`ctaLinkId`와 `links`에서 매 렌더마다 계산한다.  
상태를 최소화할수록 불일치(ctaLinkId는 A인데 ctaUrl은 B인 버그)가 줄어든다.

`?.url`은 옵셔널 체이닝으로 `find` 결과가 `undefined`여도 에러가 나지 않는다.  
`?? ""`는 null/undefined면 빈 문자열로 대체한다.

- ❌ 과거: `"선택한 링크 URL 따로 state로 저장해줘"`
- ✅ 현재: `"ctaUrl은 useState 따로 안 만들고 links.find(l => l.id === ctaLinkId)?.url ?? "" 로 파생 상태로 계산해줘"`

---

## 핵심 개념 2: `<select>` 제어 컴포넌트

드롭다운은 links 목록을 옵션으로 자동 변환해 표시한다.  
링크가 추가/삭제되면 드롭다운 항목도 자동으로 갱신된다.

---

## 핵심 개념 3: Preview 안의 FloatingCTA

실제 공개 페이지에서 FloatingCTA는 `position: fixed`로 화면 전체 하단에 고정된다.  
Admin 미리보기 안에서는 `position: fixed`가 뷰포트 기준이라 미리보기 박스 밖에 붙어버린다.

```tsx
// 미리보기 전용: position sticky로 미리보기 하단에 고정
<div style={{ position: "sticky", bottom: 0, marginTop: 8 }}>
  <FloatingCTA url={ctaUrl} />
</div>
```

`position: sticky`는 스크롤 컨테이너 안에서 하단에 붙는다.  
실제 동작은 다르지만 시각적으로 올바른 위치에 보여준다.

---

## 다음 단계

- Supabase 연동 후 `ctaLinkId` 변경 시 `profile.primary_cta_link_id` UPDATE
- 프로필 이미지, 기업 로고 업로드는 Supabase Storage 연동 후 구현

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000/admin` 접속
3. 설정 패널에서 **문의하기 버튼 연결** 드롭다운 확인
4. 드롭다운에서 다른 링크 선택
5. 오른쪽 미리보기 하단 CTA 버튼이 선택한 링크 제목으로 즉시 바뀌는지 확인

---

## 퀴즈 정답

1. 파생 상태는 기존 상태에서 계산하는 값으로, `useState`로 따로 관리하지 않는다. → **O**  
   ↳ 상태를 최소화할수록 불일치 버그가 줄어든다.

2. 드롭다운의 `<option>` 목록은 링크가 추가/삭제돼도 자동으로 갱신되지 않는다. → **X**  
   ↳ `links` 상태가 바뀌면 `<option>` 목록도 자동으로 갱신된다.

3. Admin 미리보기에서 `position: fixed`를 그대로 쓰면 미리보기 박스 밖에 붙어버린다. → **O**  
   ↳ `fixed`는 뷰포트 기준으로 고정되기 때문이다. `position: sticky`로 대체했다.
