# 진행 현황

**설명 문서:** `docs/explanations/` — `00_0-4` ~ `14_1` (총 15개)

---

## 섹션별 상태

| 섹션 | 상태 | 비고 |
|------|------|------|
| 0. 프로젝트 셋업 | 🟡 진행 중 | 패키지·클라이언트 완료, `.env.local` 값 입력 완료 |
| 1. DB & 보안 | 🟡 진행 중 | 테이블+RLS+RPC 완료, Storage 버킷 대기 |
| 2. 인증 | 🟡 구조 완성 | Supabase 연동 후 활성화 |
| 3. Public 페이지 | 🟡 UI 완성 | 데이터 교체 대기 |
| 4. Admin 페이지 | 🟡 UI 완성 | 저장 기능 대기 |
| 5. 디자인 시스템 | ✅ 완료 | |
| 6. 성능 & 배포 | 🟡 ISR 완성 | Vercel 배포 대기 |

---

## 다음 단계 (Supabase 연동 순서)

1. ~~Supabase 프로젝트 생성 + MCP 등록 + `.env.local` 설정~~ ✅
2. ~~DB 테이블 생성 (`profile`, `links`, `client_logos`) + RLS~~ ✅
3. ~~RPC 함수 `increment_click_count` 생성~~ ✅
4. Storage 버킷 생성 (이미지, 로고, OG)
5. ~~`lib/supabase/` 클라이언트 활성화~~ ✅
6. `app/page.tsx` mock 데이터 → Supabase fetch 교체
7. `middleware.ts` TODO 해제 → 실제 세션 보호
8. Admin 저장 버튼 → DB UPDATE 연결
9. Vercel 배포

---

## 설명 문서 목록

| 파일 | task |
|------|------|
| `00_0-4_design-system-tokens.md` | 디자인 시스템 CSS 토큰 |
| `01_0-1_nextjs-setup.md` | Next.js 프로젝트 초기화 |
| `02_0-6_folder-structure.md` | 기본 폴더 구조 |
| `03_3_public-page-port.md` | Public 페이지 Next.js 포팅 |
| `04_4-1_admin-layout.md` | Admin 페이지 레이아웃 |
| `05_4-6_live-preview.md` | Live Preview 실시간 반영 |
| `06_5_lucide-icons.md` | Lucide React 아이콘 |
| `07_2_auth-middleware.md` | 로그인 페이지 & Middleware |
| `08_4-3_link-manager.md` | Link Manager Drag & Drop |
| `09_4-3_link-add-form.md` | 링크 추가 폼 |
| `10_4-3_link-inline-edit.md` | 링크 수정 인라인 에디터 |
| `11_4-4_primary-cta.md` | Primary CTA 드롭다운 |
| `12_4-5_seo-form.md` | SEO Settings 폼 |
| `13_6_isr.md` | ISR 설정 |
| `14_1_supabase-db-rls.md` | Supabase DB 테이블 & RLS |
