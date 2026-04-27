# Vercel 배포 설정

**완료한 task:** `6. 성능 및 배포 > Vercel 배포 설정 (환경변수 등록)`  
**수정 파일:** `middleware.ts` → `proxy.ts`, `.vercelignore` (신규)  
**브랜치:** `task/25-vercel-deploy`

---

## 이 문서를 읽고 나면 풀 수 있어요

1. `.env.local` 파일은 Vercel에 자동으로 업로드되지 않으므로 CLI로 직접 등록해야 한다.
2. `.vercelignore`에 등록된 폴더는 git에는 남지만 Vercel 빌드에서는 제외된다.
3. `vercel env add`로 환경변수를 등록하면 Vercel 대시보드에서도 확인할 수 있다.

---

## 무엇을 했나?

Next.js 16 빌드 경고를 해결하고, CLI로 GitHub 업로드와 Vercel 배포를 준비했다.

```
로컬 개발 환경                         배포 환경
┌──────────────────┐                  ┌──────────────────┐
│ .env.local       │                  │ Vercel           │
│ SUPABASE_URL     │  vercel env add  │ SUPABASE_URL ✓   │
│ SUPABASE_KEY     │ ───────────────▶ │ SUPABASE_KEY ✓   │
│                  │                  │                  │
│ docs/ (설명문서) │  .vercelignore   │ docs/ 제외됨     │
└──────────────────┘                  └──────────────────┘
```

---

## 핵심 개념 1: 환경변수와 배포

`.env.local`은 개발 전용 파일로 `.gitignore`에 등록되어 있어 GitHub에 올라가지 않는다. Vercel도 이 파일을 읽지 못하므로 CLI로 별도 등록이 필요하다.

```
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 필요
```

- ❌ 과거: `"배포해줘"`
- ✅ 현재: `"vercel env add로 환경변수 2개 등록하고, vercel --prod로 배포해줘"`

---

## 핵심 개념 2: .vercelignore

`.vercelignore`는 Vercel 전용 무시 파일이다. `.gitignore`와 문법이 동일하지만 Vercel 빌드에만 적용된다.

```
.gitignore   → GitHub 업로드 시 제외
.vercelignore → Vercel 빌드 시 제외 (git에는 그대로 남음)
```

`docs/` 폴더는 학습 자료라 배포 서버에는 불필요하다. `.vercelignore`에 등록하면 배포 패키지 크기를 줄일 수 있다.

---

## 이렇게 확인하세요

### 1단계: GitHub에 올리기

터미널에서 아래 명령어 실행:

```
gh repo create link-in-bio2 --private --source=. --remote=origin --push
```
--private: 비공개  
--public: 공개


완료되면 `https://github.com/계정명/link-in-bio2` 주소가 출력됨

---

### 2단계: Vercel CLI 설치 및 로그인

```
npm install -g vercel
vercel login
```

브라우저가 열리면 GitHub 계정으로 로그인

---

### 3단계: Vercel 프로젝트 연결

```
vercel link -y
```

완료되면 `.vercel/` 폴더가 생성됨 (`vercel env add`가 이 정보를 사용)

---

### 4단계: 환경변수 등록

`.env.local`의 값을 아래 명령어로 Vercel에 등록:

```
vercel env add NEXT_PUBLIC_SUPABASE_URL
```
→ 터미널에 값 붙여넣기 → Enter → `production` 선택 → Enter

```
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```
→ 터미널에 값 붙여넣기 → Enter → `production` 선택 → Enter

---

### 5단계: 배포

```
vercel --prod
```

완료되면 `https://link-in-bio2.vercel.app` (또는 유사한 URL) 출력됨

---

### 6단계: Admin 계정 만들기

배포된 사이트의 `/admin`은 Supabase에 등록된 계정으로만 로그인할 수 있다.  
회원가입 페이지가 없으므로 Supabase 대시보드에서 직접 생성해야 한다.

1. [supabase.com](https://supabase.com) → 프로젝트 선택
2. 좌측 메뉴 **Authentication** → **Users**
3. 우측 상단 **Add user** → **Create new user**
4. 이메일 + 비밀번호 입력 → **Create user**

---

### 7단계: 확인

1. 출력된 URL로 접속 → 공개 페이지 확인
2. `배포URL/admin` 접속 → 6단계에서 만든 이메일 + 비밀번호로 로그인
3. Admin 페이지 정상 동작 확인
4. 링크 클릭 → Supabase `link_click_events` 테이블에 기록 확인

---

## 퀴즈 정답

1. `.env.local` 파일은 Vercel에 자동으로 업로드되지 않으므로 CLI로 직접 등록해야 한다. → **O**  
   ↳ `.gitignore`에 등록되어 GitHub에 올라가지 않으며, Vercel은 GitHub 코드만 읽는다. `vercel env add`로 별도 등록해야 한다.

2. `.vercelignore`에 등록된 폴더는 git에는 남지만 Vercel 빌드에서는 제외된다. → **O**  
   ↳ `.gitignore`와 독립적으로 동작한다. `docs/`는 GitHub에 올라가 있지만 Vercel 빌드 패키지에는 포함되지 않는다.


3. `vercel env add`로 환경변수를 등록하면 Vercel 대시보드에서도 확인할 수 있다. → **O**  
   ↳ CLI와 대시보드는 같은 데이터를 공유한다. `vercel.com → 프로젝트 → Settings → Environment Variables`에서 확인 가능하다.
