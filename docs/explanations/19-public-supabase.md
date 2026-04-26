# Public 페이지 Supabase 데이터 연동

**완료한 task:** `3. Public 페이지 > 3-1 SEO 동적 설정 / 3-2 Storage URL / 3-3 client_logos 연동`  
**수정 파일:** `app/page.tsx`, `next.config.ts`  
**브랜치:** `task/19-public-supabase`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. mock 데이터에서 Supabase로 교체할 때 컴포넌트 코드도 함께 바꿔야 한다.

---

## 무엇을 했나?

`app/page.tsx`가 mock 파일 대신 Supabase DB에서 직접 데이터를 가져오도록 교체했다.

```
변경 전
app/page.tsx
  └── import { mockProfile, mockLinks, mockLogos } from "@/lib/mock-data"
              ↓ 하드코딩된 가짜 데이터

변경 후
app/page.tsx
  └── createClient() → Supabase DB 쿼리
              ↓ 실제 DB 데이터 (profile / links / client_logos)
```


---

## 핵심 개념 1: 병렬 데이터 페칭

페이지에 필요한 데이터가 여러 테이블에 있을 때, 하나씩 순서대로 가져오면 시간이 배로 걸린다.

```
순차 처리 (느림)          병렬 처리 (빠름)
profile 조회 300ms        ┌── profile 조회 300ms
     ↓                    │   links 조회  200ms  → 모두 완료: 300ms
links 조회  200ms         └── logos 조회  150ms
     ↓
logos 조회  150ms
총 650ms                  총 300ms (가장 오래 걸리는 것 기준)
```

---

## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 `http://localhost:3000` 접속
3. 페이지가 DB 데이터로 표시되는지 확인 (프로필 이름, 링크 목록 등)
4. Supabase 대시보드 → Table Editor → `links` 테이블에서 카카오톡 문의 url 수정
5. 60초 후 페이지 새로고침 → 변경된 이름이 반영되는지 확인 

---

## 퀴즈 정답

1. mock 데이터에서 Supabase로 교체할 때 컴포넌트 코드도 함께 바꿔야 한다. → **X**  
   ↳ 컴포넌트는 그대로다. `page.tsx`의 데이터 소스만 바꾸면 된다.

