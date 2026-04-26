# 프로필 이미지 업로드 (Supabase Storage)

**완료한 task:** `4. Admin 페이지 > 4-4. 프로필 이미지 업로드 → Supabase Storage`  
**수정 파일:** `app/admin/page.tsx`, `components/admin/AdminClient.tsx`  
**브랜치:** `task/22-profile-image-upload`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. 관리자 페이지는 이제 mock 데이터가 아닌 Supabase에서 실제 데이터를 불러온다.
2. 프로필 이미지를 업로드하면 파일이 브라우저(클라이언트)에서 직접 Supabase Storage로 전송된다.
3. 이미지 업로드 후 `profile` 테이블의 `image_url`이 자동으로 업데이트되고, 미리보기에도 즉시 반영된다.

---

## 무엇을 했나?

관리자 페이지를 Supabase 실데이터에 연결하고, 프로필 이미지를 업로드해서 공개 페이지에 즉시 반영되도록 했다.

```
Admin 설정 패널 — 프로필 이미지 영역
┌─────────────────────────────────────────┐
│  프로필 이미지                           │
│  ┌──────┐  [이미지 변경]               │
│  │  사진 │  JPG, PNG, WebP · 최대 5MB  │
│  └──────┘                              │
└─────────────────────────────────────────┘
```

### 데이터 흐름

```
관리자 페이지에서 이미지 변경 클릭
       ↓
브라우저 → Supabase Storage (profiles 버킷)
       ↓
Storage에서 공개 URL 발급
       ↓
profile 테이블 image_url 업데이트
       ↓
Admin 미리보기 즉시 반영
```

---

## 핵심 개념 1: Admin 페이지 Supabase 연결

기존에는 mock 데이터를 사용했다. 이제 페이지가 열릴 때 서버에서 Supabase에 접속해 실제 데이터를 불러온다.

```
브라우저 → admin/page.tsx (서버)
              ↓
        Supabase에서 profile, links, logos 동시 조회
              ↓
        AdminClient에 전달 → 화면 렌더링
```

mock 데이터와 달리 실제 DB 데이터를 쓰므로, 저장한 내용이 새로고침 후에도 유지된다.

---


## 이렇게 확인하세요

1. 터미널에서 `npm run dev` 실행
2. `http://localhost:3000/admin` 접속 → 로그인
3. 설정 패널 상단 "프로필 이미지" 섹션에서 **[이미지 변경]** 클릭
4. 사진 파일 선택 → "업로드 중…" 표시 후 이미지 교체 확인
5. 우측 미리보기에서 프로필 사진이 바뀌는지 확인
6. `http://localhost:3000/` 새로고침 → 공개 페이지 프로필 사진도 업데이트 확인
7. Supabase 대시보드 → Storage → `profiles` 버킷에서 업로드된 파일 확인

---

## 퀴즈 정답

1. 관리자 페이지는 이제 mock 데이터가 아닌 Supabase에서 실제 데이터를 불러온다. → **O**  
   ↳ `app/admin/page.tsx`가 서버 컴포넌트로 바뀌어 Supabase에서 profile, links, logos를 조회한다.

2. 프로필 이미지를 업로드하면 파일이 브라우저(클라이언트)에서 직접 Supabase Storage로 전송된다. → **O**  
   ↳ `AdminClient`는 `"use client"` 컴포넌트이고, 브라우저용 Supabase 클라이언트로 Storage에 직접 업로드한다.

3. 이미지 업로드 후 `profile` 테이블의 `image_url`이 자동으로 업데이트되고, 미리보기에도 즉시 반영된다. → **O**  
   ↳ 업로드 완료 후 `setProfile({ ...profile, image_url: publicUrl })`로 로컬 상태를 바꾸면 미리보기가 즉시 업데이트된다.
