# IA: 강사용 Link-in-Bio (개인용 v2) 고도화 버전

## 1. 개요
본 IA는 강사용 Link-in-Bio 서비스의 정보 구조를 정의하며, 단순 페이지 구성이 아닌 **전환(문의) 중심 퍼널 구조**를 기반으로 설계된다.  
목표는 교육담당자가 **3초 이내 신뢰 형성 → 문의 행동**으로 이어지도록 유도하는 것이다.

---

## 2. 전체 구조

[Public]  
/  
- SEO Meta/OG Data (Invisible)
- Hero (프로필 + 소개)  
- Trust (경력 + 기업 로고 슬라이더)  
- Link List (보조 행동 선택)  
- Floating CTA (1순위 문의하기 - **화면 하단 고정, Thumb Zone**)  

[Admin]  
/admin  
- Dashboard (성과 조회)
- Link Manager (링크 관리)  
- Live Preview (실시간 미리보기)  
- Profile & Trust Settings (프로필/로고 관리)  
- SEO Settings (공유 메타 관리)

---

## 3. Public IA (전환 퍼널 구조)

### 3.1 Hero 영역 (인지 단계)
- 이름  
- 한 줄 소개 ("AI전공 AI교육 강사")  
- 프로필 이미지  
*역할: 방문자가 1초 내 “무슨 강사인지” 직관적 이해*

### 3.2 Trust 영역 (신뢰 형성)
- 핵심 텍스트: "강의경력 8년 | 삼성 출강 경험"  
- **기업 로고 슬라이더 (Client Logos) ⭐추가**  
*역할: 교육담당자의 리스크 판단 제거, 전문성 및 시각적 권위 전달*

### 3.3 CTA 영역 (전환 트리거) ⭐위계 정리
- "문의하기" 버튼 (**화면 하단 고정 / Thumb Zone / Z-index 최상단 / safe-area-inset 대응**)
- **연결 대상:** 강사가 지정한 **1순위 연락 채널 (profile.primary_cta_link_id)**로 직결
*역할: 스크롤 위치와 무관하게 상시 노출되어 신뢰 형성 직후 즉각 전환 유도*

### 3.4 Link List (보조 행동 선택) ⭐위계 정리
- 보조 문의 채널 (카카오톡, 이메일)  
- 강의 소개 페이지 (노션, 블로그 등)  
- 기타 서브 콘텐츠  
*규칙: 최대 7개 이하 유지 (인지적 부하 및 선택의 역설 방지)*  
*역할: 메인 CTA 외의 서브 경로 제공*

---

## 4. 핵심 사용자 흐름 (Conversion Funnel)

**인지 → 신뢰 → (확신 강화) → 최종 행동**  

* 스크롤 순서: Hero → Trust → Link List → Footer
* 고정 레이어: Floating CTA는 전 구간 하단 노출 (언제든 클릭 가능)
* 설계 원칙: CTA 이전에 신뢰 확보가 필수이며, 메인 CTA(하단 고정)와 서브 링크(리스트)의 위계를 명확히 분리한다.

---

## 5. Admin IA (관리자 구조)

`/admin`  

### 5.1 Dashboard ⭐지표 구체화
- 총 클릭 수 및 링크별 클릭 수
- **기간별 조회 필터 (최근 7일 / 30일):** 프로필 업데이트 후 실제 전환(클릭) 성과 트렌드 비교용
- **페이지뷰(PV) 및 CTR:** 노출 대비 클릭률로 전환 성과 측정 (추후 고도화 가능)

### 5.2 Link Manager
- 링크 목록 (추가 / 수정 / 삭제)  
- Drag & Drop 순서 정렬  
- 타입 설정 (link / card / overflow_card / youtube)  

### 5.3 Live Preview
- 실제 공개 페이지 실시간 렌더링 (변경 즉시 반영)  
- 구조: 좌측 설정 패널 / 우측 미리보기 화면  

### 5.4 Profile & Trust Settings ⭐신뢰 요소 관리 추가
- 이름, 한 줄 소개, 경력 텍스트, 프로필 이미지 업로드
- **출강 기업 로고 이미지 업로드 및 관리 (Client Logos 슬라이더용)**
- **Primary CTA 연결 링크 지정:** Floating 문의 버튼이 연결될 1순위 채널 선택

### 5.5 SEO & Meta Settings ⭐공유 최적화 추가
- 페이지 제목 (Page Title)  
- 요약 설명 (Meta Description)  
- SNS/카카오톡 공유용 썸네일 이미지 업로드 (Open Graph Image)  

---

## 6. 컴포넌트 구조

### 6.1 Public Page
`Page (Layout Wrapper - overflow-x-hidden 적용)`  
- SEO Meta/OG Data (Invisible) ⭐추가
- Hero  
- TrustBar (텍스트 + 기업 로고 슬라이더) ⭐추가  
- LinkList  
  - LinkItem  
  - CardItem  
  - OverflowCardItem  
- Floating CTAButton (Z-index 최상단 고정 래퍼) ⭐위계 정리  
- Footer  

### 6.2 Admin Page
`AdminPage`  
- DashboardStats (기간 필터 포함) ⭐추가  
- LinkEditor & DragList  
- PreviewPane  
- ProfileForm (기업 로고 업로드 포함) ⭐추가  
- SEOForm ⭐추가  

---

## 7. 데이터 흐름

Admin 설정 업데이트  
→ Supabase DB 및 Storage 자동 저장  
→ Public 페이지 실시간 렌더링  
→ 방문자 클릭 이벤트 발생  
→ DB `click_count` 증가  
→ Admin Dashboard 기간별 데이터 반영  

---

## 8. 설계 핵심 원칙

1. **CTA 중심의 명확한 위계:** 메인 문의(플로팅)와 서브 문의(리스트)의 역할 분리  
2. **최소 선택지 제공:** 인지 부하를 막기 위해 링크 3~7개 이하 엄격 유지  
3. **신뢰 기반의 퍼널:** 텍스트와 로고를 통해 CTA 클릭 전 충분한 설득 과정 배치  
4. **마케팅 관점 관리:** SEO 썸네일 세팅과 대시보드를 통한 전환 성과 측정 필수  
5. **관리자 UX (AX) 최적화:** 수정 사항의 즉각적인 미리보기 제공으로 운영 속도 향상  