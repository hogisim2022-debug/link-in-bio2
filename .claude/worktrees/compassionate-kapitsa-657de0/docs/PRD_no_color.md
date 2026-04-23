# PRD: 강사용 Link-in-Bio (개인용 v2) 고도화 버전

## 1. 개요
강사가 명함 QR, SNS 등에 활용할 수 있는 **초간단 프로필 + 링크 페이지**입니다. 
목표는 **교육담당자(HRD) 및 수강생이 3초 이내에 직관적으로 신뢰를 확인하고 문의하도록 유도**하는 것입니다. 기존 단순 링크 모음을 넘어, 전환율(Conversion Rate)을 극대화하는 마케팅 퍼널(Funnel) 역할을 수행합니다.

---

## 2. 목표
- 강의 문의 유도 및 전환율 극대화
- 연락 채널 다각화 제공 (카카오톡, 이메일, 구글폼)
- 경력 정보와 기업 로고를 통한 강사 신뢰도 즉각 전달

---

## 3. 타겟 사용자
- **1순위: 교육담당자 (80%)** - 바쁜 업무 환경 속에서 직관과 심리적 안정감으로 강사를 빠르게 검증하는 집단
- **2순위: 수강생 (20%)**

---

## 4. 핵심 가치
- **빠른 정보 전달 (3초 내 이해):** 이름과 핵심 한 줄 소개로 전문 분야 명확화
- **신뢰 확보 (경력/출강 이력):** 시각화된 데이터와 증거 기반의 전문성 어필
- **즉시 행동 유도 (문의 클릭):** 선택의 역설을 방지하고 명확한 CTA(Call To Action) 제공

---

## 5. 주요 기능

### 5.1 프로필 영역
- 이름
- 한 줄 소개: "AI전공 AI교육 강사" (검색 의도와 일치하는 키워드 중심)
- 프로필 이미지 (Supabase Storage 연동)

### 5.2 신뢰 요소 (검증 영역)
- 텍스트: "강의경력 8년 | 삼성 출강 경험"
- **(추가) 기업 로고 슬라이더 (선택):** 출강 이력을 시각적으로 보여주어 신뢰도 강화

### 5.3 CTA (Call To Action) ⭐ (핵심 전략)
- "문의하기" 버튼 (긍정적 색상 활용)
- **배치:** **화면 하단 고정(Floating, Thumb Zone)** — 모바일 엄지 접근성을 최우선으로 하여 스크롤 위치와 무관하게 항상 즉시 클릭 가능하도록 배치
- **Z-index:** 최상단 고정, `safe-area-inset-bottom` 적용으로 iOS 홈 인디케이터 회피
- **연결 대상:** 강사가 지정한 **1순위 연락 채널**(구글폼/카카오톡/이메일 중 택1, Admin에서 변경 가능)

### 5.4 링크 리스트 (선택의 역설 방지)
- **제한:** 인지적 부하(Cognitive Load)를 줄이기 위해 **핵심 링크 3~7개 이하로 제한**
- 강의 문의 (구글폼, 카카오톡, 이메일)
- 강의 소개 (노션, 블로그 등)

---

## 6. UI 컴포넌트 정의

### 6.1 Link Item 타입

#### (1) 기본형
- 텍스트 기반 버튼 (간결한 채널 탐색용)

#### (2) 카드형
- 배경 + 텍스트 + 이미지 포함 (대표 강의 시각적 요약용)

#### (3) 오버플로우 이미지 카드 ⭐ (디자인 핵심)
- 이미지가 카드 영역을 벗어나 겹치는 3D 입체 디자인
- 패턴 중단(Pattern Interruption) 효과로 특정 강의의 클릭률 극대화

---

## 7. 디자인 요구사항 및 기술 CSS

### 7.1 공통
- 모바일 우선(Mobile-First) 설계
- 시각적 위계(Hierarchy)가 명확한 리스트 구조
- Design System(./Design_System)

### 7.2 컬러 심리학 기반 테마
- design system을 따름

### 7.3 오버플로우 카드 스타일 CSS 제어
- **부모 컨테이너:** Tailwind의 `rounded-lg` 적용 시 자동으로 생기는 `overflow: hidden`을 덮어쓰고, **반드시 `overflow: visible` 속성을 유지**하여 이미지가 잘리지 않게 설정.
- **이미지 배치:** `absolute` 포지션을 사용하고, `negative margin` (또는 음수 top/bottom) 적용.
- **레이어 (Z-index):** 텍스트를 가리지 않으면서 입체감을 주도록 `z-index`를 정밀하게 분리.
- **여백:** 부모 요소 상단에 돌출될 이미지 공간을 고려한 `padding-top` 확보.

### 7.4 인터랙션
- **효과:** Hover 시 scale 효과, 클릭 시 press(압축) 애니메이션
- **속도:** **200~300ms의 전환(Transition) 속도**를 주어 부드럽고 물리적인 만족감 부여.

### 7.5 Spacing & Padding 가이드
- **목표:** 모바일 환경에서 스크롤 피로도를 낮추기 위해 섹션 간 여백을 최소화

---

## 8. 기술 스택
- Frontend: Next.js (SSR/ISR을 통한 로딩 속도 최적화 및 SEO 향상)
- Backend: Supabase (PostgreSQL, Realtime, Storage)
- 인증 및 보안: Supabase Auth, **RLS (Row Level Security)**

---

## 9. 데이터 모델 (보안 및 확장성 보완)

### 9.1 profile 테이블
| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| id | uuid | PK | `auth.users.id`와 1:1 매핑 (RLS: `auth.uid() = id`) |
| name | text | 이름 | |
| title | text | 직업 | |
| bio | text | 한 줄 소개 | |
| experience | text | 경력 | |
| image_url | text | 프로필 이미지 | Supabase Storage 연동 |
| **primary_cta_link_id** | uuid | **플로팅 CTA 연결 링크 (FK → links.id)** | **Admin에서 지정** |
| **seo_title** | text | 페이지 제목 | Open Graph용 |
| **seo_description** | text | 요약 설명 | Open Graph용 |
| **og_image_url** | text | 공유 썸네일 | Supabase Storage |

### 9.2 client_logos 테이블 ⭐ (신규)
| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| id | uuid | PK | |
| user_id | uuid | 강사 식별자 (FK) | RLS: `auth.uid() = user_id` |
| name | text | 기업명 | alt 텍스트용 |
| image_url | text | 로고 이미지 | Supabase Storage |
| order | int | 정렬 순서 | |

### 9.3 links 테이블

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| id | uuid | PK | |
| **user_id** | uuid | **강사 식별자 (FK)** | **보안(RLS) 필수로 `auth.uid() = user_id` 적용** |
| title | text | 링크 제목 | |
| url | text | 링크 주소 | |
| type | text | 타입 | link / card / overflow_card / youtube |
| image_url | text | 카드 이미지 | |
| order | int | 정렬 순서 | |
| is_visible | boolean | 노출 여부 | |
| **click_count** | int | **클릭 수** | **전환 성과 분석용 (기본값 0)** |
| created_at | timestamp| 생성일 | |

### 9.4 click_count 증가 정책
- RLS로 인해 방문자는 `UPDATE` 불가 → **Supabase RPC 함수** `increment_click_count(link_id uuid)` 호출
- 함수는 `SECURITY DEFINER`로 선언, 내부에서 해당 `link_id`의 `click_count`만 +1 수행

---

## 10. 관리자 기능 (Admin) - 강사 본인용
- 로그인 (Supabase Auth)
- 링크 CRUD (생성, 수정, 삭제) 및 드래그앤드롭 순서 변경
- 링크 타입 선택 및 숨김 처리
- **(추가) 실시간 미리보기 (Live Preview):** 우측 또는 하단에 노출될 공개 페이지를 실시간으로 렌더링하여 관리자 경험(AX) 향상
- **(추가) 성과 대시보드 (MVP):** `click_count` 기반의 단순 클릭 수 확인을 통해 링크별 마케팅 효율 파악

---

## 11. 페이지 구조

### 11.1 공개 페이지 (/)
**스크롤 순서:** Hero(프로필) → Trust(경력/로고) → Link List(보조 행동) → Footer
**고정 레이어:** 화면 하단에 **Floating CTA (문의하기)** 항시 노출 (Z-index 최상단)

### 11.2 관리자 페이지 (/admin) — Desktop
1. 상단: Dashboard (총 클릭수 + 기간 필터 + 링크별 통계)
2. 좌측: 설정 패널 (링크 관리, 프로필/Trust, SEO, Primary CTA 지정)
3. 우측: 실시간 미리보기 (Public 페이지 렌더링)

### 11.3 관리자 페이지 — Mobile
- 상단 탭: `설정 | 미리보기 | 대시보드` (3개 탭으로 전환)

---

## 12. 사용자 흐름

### 12.1 방문자 (HRD 및 수강생)
1. QR 코드/URL 진입
2. 강사 프로필 및 권위(경력) 3초 내 확인
3. 기업 로고와 경력 정보로 전문성 검증
4. CTA (문의하기) 또는 개별 링크 클릭 (자동 클릭 수 집계)

### 12.2 관리자 (강사 본인)
1. 로그인 후 링크 추가/수정 (미리보기로 즉시 디자인 확인)
2. 저장 시 Supabase 실시간 연동으로 즉각 배포
3. 대시보드에서 클릭 성과 확인

---

## 13. MVP 범위
- 프로필/신뢰 표시 및 문의 CTA 버튼
- 기본형 + 오버플로우 카드 1종 표시
- **관리자 실시간 미리보기(Live Preview)**
- **단순 링크 클릭 통계 로깅 (`click_count`)**
- RLS 기반의 안전한 링크 CRUD 및 Supabase Auth

---

## 14. 제외 범위 (Out of Scope)
- 결제 기능
- 다중 사용자 가입 시스템 지원 (SaaS화 전 단계)
- 구글 애널리틱스 수준의 복잡한 체류시간/퍼널 추적 (추후 고도화)

---

## 15. 성공 기준
- **문의 버튼 클릭 수 증가 및 실제 문의 전환 발생**
- 모바일 환경에서의 끊김 없는 부드러운 스크롤 및 렌더링 성능
- 교육 담당자 타겟에 맞춘 정돈되고 신뢰감 있는 브랜드 이미지 확립

## 16. 임시 데이터 & 이미지 (개발 진행 중)
- MVP 단계에서는 무료 이미지로 프로토타이핑
- 최종 운영 시에는 Supabase Storage 기반의 실제 이미지 관리 시스템으로 교체