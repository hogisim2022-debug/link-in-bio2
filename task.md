# Task: 강사용 Link-in-Bio v2 구현 계획

## 0. 프로젝트 셋업

- [x] Next.js 프로젝트 초기화 (App Router) → [설명](docs/explanations/01_0-1_nextjs-setup.md)
- [ ] Supabase 프로젝트 생성 및 환경변수 설정 (`.env.local`)
  - [ ] Supabase 대시보드에서 프로젝트 생성
  - [ ] MCP 설정: Claude Code → Settings → MCP에 `@supabase/mcp-server-supabase` 등록 (URL + service_role 키)
  - [x] `.env.local` 생성 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) ← 템플릿 생성 완료, 실제 값 입력 필요
- [x] Tailwind CSS 설정 → (Next.js 초기화 시 함께 완료)
- [x] Design System CSS 토큰 적용 (`colors_and_type.css` → `app/globals.css`) → [설명](docs/explanations/00_0-4_design-system-tokens.md)
- [x] 폰트 설정 (Inter → `next/font`) → (Next.js 초기화 시 함께 완료)
- [x] 기본 폴더 구조 생성 (`components/`, `lib/`) → [설명](docs/explanations/02_0-6_folder-structure.md)

---

## 1. Supabase DB & 보안

- [x] `profile` 테이블 생성 (id, name, title, bio, experience, image_url, primary_cta_link_id, seo_title, seo_description, og_image_url)
- [x] `links` 테이블 생성 (id, user_id, title, url, type, image_url, order, is_visible, click_count, created_at)
- [x] `client_logos` 테이블 생성 (id, user_id, name, image_url, order)
- [x] RLS 정책 설정 (SELECT: public 공개, INSERT/UPDATE/DELETE: 본인 `auth.uid()` 한정)
- [x] RPC 함수 `increment_click_count(link_id uuid)` 생성 (`SECURITY DEFINER`)
- [x] Supabase Storage 버킷 생성 (프로필 이미지, 로고, OG 이미지) → [설명](docs/explanations/16_1_storage-buckets.md)
- [x] Storage 버킷 Public read 정책 설정

---

## 2. 인증 (Auth)

- [x] Supabase Auth 로그인 페이지 (`/login`) → [설명](docs/explanations/07_2_auth-middleware.md)
- [x] 로그인 폼 (이메일 + 비밀번호)
- [x] 로그인 후 `/admin` 리다이렉트 (Supabase Auth 연동) → [설명](docs/explanations/17_2_auth-login-redirect.md)
- [x] 미인증 시 `/admin` 접근 차단 (Next.js Middleware) ← Supabase Auth 연동 완료
- [x] 로그아웃 버튼 (Supabase Auth 연동 후)

---

## 3. Public 페이지 (`/`)

> **Next.js 포팅 완료** (mock 데이터) → [설명](docs/explanations/03_3_public-page-port.md)  
> Supabase 연동 후 mock 데이터를 DB 데이터로 교체 필요

### 3-1. SEO / OG
- [x] `<head>` 메타 태그, Open Graph 태그 ← mock 데이터로 완성
- [ ] `generateMetadata`를 Supabase 데이터 기반 동적 설정으로 교체

### 3-2. Hero 영역
- [x] 프로필 이미지(`next/image`), 이름, 한 줄 소개 ← 완성
- [ ] Supabase Storage URL로 교체

### 3-3. Trust 영역
- [x] 경력 텍스트, 기업 로고 슬라이더 ← 완성
- [ ] Supabase `client_logos` 데이터로 교체

### 3-4. Link List
- [x] `LinkItem`(기본형), `OverflowCardItem`(돌출 카드) ← 완성
- [x] `is_visible: false` 필터링 ← mock 데이터 단계에서 완성
- [ ] 링크 클릭 시 `increment_click_count` RPC 호출 (Supabase 연동 후)

### 3-5. Floating CTA
- [x] `position: fixed`, `safe-area-inset-bottom`, `primary_cta_link_id` 연결 ← 완성

### 3-6. Footer
- [x] 미니멀 푸터 ← 완성

---

## 4. Admin 페이지 (`/admin`)

### 4-1. 레이아웃
- [x] Desktop: 상단 대시보드 + 좌측 설정 패널 + 우측 Live Preview → [설명](docs/explanations/04_4-1_admin-layout.md)
- [x] Mobile: 상단 3탭 (`설정 | 미리보기 | 대시보드`)

### 4-2. Dashboard
- [ ] 총 클릭 수 표시
- [ ] 기간 필터 (최근 7일 / 30일)
- [ ] 링크별 클릭 수 테이블

### 4-3. Link Manager
- [x] 링크 목록 조회 (mock 데이터, Supabase 연동 후 교체) → [설명](docs/explanations/08_4-3_link-manager.md)
- [x] 링크 추가 폼 (title, url, type 선택, is_visible) → [설명](docs/explanations/09_4-3_link-add-form.md)
- [x] 링크 수정 인라인 에디터 → [설명](docs/explanations/10_4-3_link-inline-edit.md)
- [x] 링크 삭제 (로컬 상태, Supabase 연동 후 DB DELETE)
- [x] Drag & Drop 순서 변경 (`@dnd-kit/sortable`)
  - [x] 변경 후 `order` 필드 일괄 업데이트 (로컬, Supabase 연동 후 DB UPDATE)
- [x] 노출/숨김 토글 → Live Preview 즉시 반영

### 4-4. Profile & Trust Settings
- [x] 이름, 한 줄 소개, 경력 텍스트 수정 폼 → (Live Preview task에서 완료)
- [ ] 프로필 이미지 업로드 → Supabase Storage
- [ ] 기업 로고 업로드 / 삭제 / 순서 관리 → Supabase Storage
- [x] Primary CTA 연결 링크 드롭다운 → [설명](docs/explanations/11_4-4_primary-cta.md)

### 4-5. SEO Settings
- [x] SEO 페이지 제목 입력 → [설명](docs/explanations/12_4-5_seo-form.md)
- [x] Meta Description 입력 (글자 수 힌트 포함)
- [ ] OG 이미지 업로드 → Supabase Storage

### 4-6. Live Preview
- [x] 우측(Desktop) / 탭(Mobile)에서 Public 페이지 실시간 렌더링
- [x] 설정 변경 시 즉시 미리보기 반영 (로컬 상태 기반) → [설명](docs/explanations/05_4-6_live-preview.md)

---

## 5. 디자인 시스템 적용 (Starbucks-inspired)

- [x] 컬러 토큰 CSS 변수 전역 적용 → (`app/globals.css` 완료)
- [x] Inter 폰트 letter-spacing `-0.01em` 기본 적용 → (`body`에 완료)
- [x] 버튼: `border-radius: 50px` (full pill), `scale(0.97)` press 애니메이션 → (완료)
- [x] 카드: `border-radius: 12px`, 이중 whisper shadow → (완료)
- [x] Floating CTA 그림자: `0 0 6px / 0 8px 12px` → (완료)
- [x] 폼 인풋: `border-radius: 4px`, focus 시 Green Accent 테두리 → (`admin-field__input` 완료)
- [x] 아이콘: Lucide React (`outline, 24px`) → [설명](docs/explanations/06_5_lucide-icons.md)
- [x] 모바일 우선 반응형 (`max-width: 480px` + 미디어쿼리) → (완료)

---

## 6. 성능 및 배포

- [x] Next.js ISR 설정 (Public 페이지 `revalidate = 60`) → [설명](docs/explanations/13_6_isr.md)
- [x] `next/image` 최적화 (Supabase Storage `remotePatterns` placeholder 추가)
- [ ] Vercel 배포 설정 (환경변수 등록)
- [ ] Lighthouse 모바일 점수 확인 (Performance, CLS 체크)

---

## 우선순위 (MVP 순서)

1. **DB + Auth** (0, 1, 2번)
2. **Public 페이지** (3번 전체)
3. **Admin 기본** (링크 CRUD + Live Preview)
4. **Admin 고도화** (Dashboard, SEO, Drag & Drop)
5. **디자인 시스템 완성도** (5번)
6. **배포** (6번)
