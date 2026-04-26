# 프로필 이미지 업로드 (Supabase Storage)

**완료한 task:** `4. Admin 페이지 > 4-4. 프로필 이미지 업로드 → Supabase Storage`  
**수정 파일:** `app/admin/page.tsx`, `components/admin/AdminClient.tsx`  
**브랜치:** `task/22-profile-image-upload`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. 관리자 페이지는 이제 mock 데이터가 아닌 Supabase에서 실제 데이터를 불러온다.
2. 프로필 이미지를 업로드하면 파일이 브라우저(클라이언트)에서 직접 Supabase Storage로 전송된다.
3. `upsert: true` 옵션이 없으면 같은 파일명으로 재업로드할 때 오류가 발생한다.
4. 이미지 업로드 후 `profile` 테이블의 `image_url`이 자동으로 업데이트되고, 미리보기에도 즉시 반영된다.
5. Storage에 올린 이미지의 URL을 얻으려면 별도의 `getPublicUrl` 호출이 필요하다.

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
파일 선택 (파일 탐색기)
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

- ❌ 과거: `"관리자 페이지 데이터 연동해줘"`
- ✅ 현재: `"admin/page.tsx를 서버 컴포넌트로 바꾸고, 서버에서 Supabase profile/links/logos를 병렬 조회해서 AdminClient에 전달해줘"`

---

## 핵심 개념 2: Storage 업로드 3단계

이미지를 Storage에 올리고 DB에 URL을 저장하는 과정은 항상 3단계로 이루어진다.

```
1단계: 파일 업로드
profiles 버킷 / {user_id}.jpg
(upsert: true → 같은 이름이면 덮어쓰기)

2단계: 공개 URL 발급
https://.../storage/v1/object/public/profiles/{user_id}.jpg

3단계: DB 업데이트
profile.image_url = 위 URL
```

`upsert: true`가 없으면 같은 사람이 이미지를 두 번 바꿀 때 오류가 발생한다.

- ❌ 과거: `"Storage에 이미지 업로드해줘"`
- ✅ 현재: `"Storage에 upsert로 업로드하고, getPublicUrl로 URL 받아서 profile 테이블도 업데이트해줘. 업로드 중에는 버튼 비활성화해줘"`

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

3. `upsert: true` 옵션이 없으면 같은 파일명으로 재업로드할 때 오류가 발생한다. → **O**  
   ↳ 기본 동작은 이미 존재하는 파일이면 오류를 반환한다. `upsert: true`로 덮어쓰기를 허용해야 한다.

4. 이미지 업로드 후 `profile` 테이블의 `image_url`이 자동으로 업데이트되고, 미리보기에도 즉시 반영된다. → **O**  
   ↳ 업로드 완료 후 `setProfile({ ...profile, image_url: publicUrl })`로 로컬 상태를 바꾸면 미리보기가 즉시 업데이트된다.

5. Storage에 올린 이미지의 URL을 얻으려면 별도의 `getPublicUrl` 호출이 필요하다. → **O**  
   ↳ `upload()`는 파일만 올린다. URL은 `getPublicUrl(path)`를 따로 호출해야 받을 수 있다.
