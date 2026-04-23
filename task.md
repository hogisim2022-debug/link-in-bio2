# Task: 강사용 Link-in-Bio v2 구현 계획

## 0. 프로젝트 셋업

- [ ] Next.js 프로젝트 초기화 (App Router)
- [ ] Supabase 프로젝트 생성 및 환경변수 설정 (`.env.local`)
- [ ] Tailwind CSS 설정
- [x] Design System CSS 토큰 적용 (`colors_and_type.css` → `globals.css`) → [설명](docs/explanations/00_design-system-tokens.md)
- [ ] 폰트 설정 (Inter, Lora → `next/font`)
- [ ] 기본 폴더 구조 생성 (`app/`, `components/`, `lib/`)

---

## 1. Supabase DB & 보안

- [ ] `profile` 테이블 생성 (id, name, title, bio, experience, image_url, primary_cta_link_id, seo_title, seo_description, og_image_url)
- [ ] `links` 테이블 생성 (id, user_id, title, url, type, image_url, order, is_visible, click_count, created_at)
- [ ] `client_logos` 테이블 생성 (id, user_id, name, image_url, order)
- [ ] RLS 정책 설정 (`profile.id = auth.uid()`, `links.user_id = auth.uid()`, `client_logos.user_id = auth.uid()`)
- [ ] RPC 함수 `increment_click_count(link_id uuid)` 생성 (`SECURITY DEFINER`)
- [ ] Supabase Storage 버킷 생성 (프로필 이미지, 로고, OG 이미지)
- [ ] Storage 버킷 Public read 정책 설정

---

## 2. 인증 (Auth)

- [ ] Supabase Auth 로그인 페이지 (`/login`)
- [ ] 로그인 폼 (이메일 + 비밀번호)
- [ ] 로그인 후 `/admin` 리다이렉트
- [ ] 미인증 시 `/admin` 접근 차단 (Next.js Middleware)
- [ ] 로그아웃 버튼

---

## 3. Public 페이지 (`/`)

> **정적 HTML 프로토타입 완성** (`index.html`) — Next.js + Supabase 데이터 연동으로 포팅 필요

### 3-1. SEO / OG
- [x] `<head>` 메타 태그 (title, description) ← `index.html` 완성
- [x] Open Graph 태그 (og:title, og:description, og:image) ← `index.html` 완성
- [ ] Next.js `generateMetadata`로 Supabase 데이터 기반 동적 설정으로 교체

### 3-2. Hero 영역
- [x] 프로필 이미지, 이름, 한 줄 소개 ← `index.html` 완성
- [ ] `next/image` + Supabase Storage URL로 교체

### 3-3. Trust 영역
- [x] 경력 텍스트 표시 ← `index.html` 완성
- [x] 기업 로고 슬라이더 (무한 루프 CSS 애니메이션) ← `index.html` 완성
- [ ] Supabase `client_logos` 데이터로 동적 렌더링으로 교체

### 3-4. Link List
- [x] `link-item` (기본형) ← `index.html` 완성
- [x] `card-item` (카드형) ← `index.html` 완성
- [x] `overflow-card` (이미지 돌출 카드) ← `index.html` 완성
  - `overflow: visible`, 이미지 `absolute` + 음수 `top`, z-index 분리 완성
- [x] Hover/클릭 `scale(0.97)` 애니메이션 ← `index.html` 완성
- [ ] `is_visible: false` 링크 필터링 (Supabase 연동 시 적용)
- [ ] 링크 클릭 시 `increment_click_count` RPC 호출 후 URL 이동

### 3-5. Floating CTA
- [x] `position: fixed; bottom: 0`, `z-index: 9999` ← `index.html` 완성
- [x] `padding-bottom: env(safe-area-inset-bottom)` (iOS 대응) ← `index.html` 완성
- [x] 링크 리스트 하단 여백 `calc(80px + env(...))` ← `index.html` 완성
- [ ] `profile.primary_cta_link_id` 기반 URL 동적 연결 (Supabase 연동 시 적용)

### 3-6. Footer
- [x] 미니멀 푸터 ← `index.html` 완성

---

## 4. Admin 페이지 (`/admin`)

### 4-1. 레이아웃
- [ ] Desktop: 상단 대시보드 + 좌측 설정 패널 + 우측 Live Preview
- [ ] Mobile: 상단 3탭 (`설정 | 미리보기 | 대시보드`)

### 4-2. Dashboard
- [ ] 총 클릭 수 표시
- [ ] 기간 필터 (최근 7일 / 30일)
- [ ] 링크별 클릭 수 테이블

### 4-3. Link Manager
- [ ] 링크 목록 조회 (Supabase Realtime 또는 useEffect)
- [ ] 링크 추가 폼 (title, url, type 선택, image_url, is_visible)
- [ ] 링크 수정 인라인 에디터
- [ ] 링크 삭제
- [ ] Drag & Drop 순서 변경 (`@dnd-kit/core` 또는 `react-beautiful-dnd`)
  - 변경 후 `order` 필드 일괄 업데이트

### 4-4. Profile & Trust Settings
- [ ] 이름, 한 줄 소개, 경력 텍스트 수정 폼
- [ ] 프로필 이미지 업로드 → Supabase Storage
- [ ] 기업 로고 업로드 / 삭제 / 순서 관리
- [ ] Primary CTA 연결 링크 드롭다운 (`links` 목록 중 선택)

### 4-5. SEO Settings
- [ ] SEO 페이지 제목 입력
- [ ] Meta Description 입력
- [ ] OG 이미지 업로드 → Supabase Storage

### 4-6. Live Preview
- [ ] 우측(Desktop) / 탭(Mobile)에서 Public 페이지 실시간 렌더링
- [ ] 설정 변경 시 즉시 미리보기 반영 (로컬 상태 기반)

---

## 5. 디자인 시스템 적용 (Starbucks-inspired)

- [ ] 컬러 토큰 CSS 변수 (`--green-*`, `--cream-*`, `--gold-*` 등) 전역 적용
- [ ] Inter 폰트 letter-spacing `-0.01em` 기본 적용
- [ ] 버튼: `border-radius: 50px` (full pill), `scale(0.95)` press 애니메이션
- [ ] 카드: `border-radius: 12px`, 이중 whisper shadow (`0 0 0.5px / 0 1px 1px`)
- [ ] Floating CTA 그림자: `0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)`
- [ ] 폼 인풋: `border-radius: 4px`, focus 시 Green Accent 테두리
- [ ] 아이콘: Lucide React (`outline, 24px`)
- [ ] 모바일 우선 반응형 (`max-w-md mx-auto` 기준)

---

## 6. 성능 및 배포

- [ ] Next.js ISR 설정 (Public 페이지 revalidate 주기 설정)
- [ ] `next/image` 최적화 (Supabase Storage 도메인 `remotePatterns` 등록)
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
