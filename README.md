# Link in Bio — 수강생 실습 가이드

Next.js + Supabase 기반 Link-in-Bio 서비스 실습 레포입니다.
브랜치마다 기능이 하나씩 구현되어 있으며, 각 브랜치의 설명 파일을 따라가며 학습합니다.

---

## 시작하기

### 1. 레포 클론

```bash
gh repo clone hogisim2022-debug/link-in-bio2
cd link-in-bio2
```

### 2. 전체 브랜치 받기

클론 직후에는 원격 브랜치가 로컬에 없습니다. 아래 명령어로 모두 로컬에 생성합니다.

**Mac / Linux (bash/zsh)**
```bash
git fetch --all
for branch in $(git branch -r | grep 'task/' | sed 's/origin\///'); do git checkout --track origin/$branch; done
git checkout main
```

**Windows (CMD)**
```cmd
git fetch --all
for /f "tokens=*" %b in ('git branch -r ^| findstr "task/"') do git checkout --track %b
git checkout main
```

실행 후 `git branch` 로 브랜치 목록이 모두 보이는지 확인하세요.

### 3. 의존성 설치

```bash
npm i
```

### 4. 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 직접 만들고, 아래 내용을 붙여넣은 뒤 **본인의 Supabase 값으로 교체**하세요.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> Supabase 대시보드 → 프로젝트 선택 → Settings → API 에서 URL과 anon key를 확인할 수 있습니다.

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 에 접속해 확인합니다.

---

## 브랜치 구조

각 브랜치는 독립적인 기능 단위로 구성되어 있습니다.
브랜치를 순서대로 이동하면서 해당 기능을 확인하세요.

| 브랜치 | 구현 기능 | 설명 파일 |
|---|---|---|
| `task/18-logout` | 로그아웃 | `docs/explanations/18_2_logout.md` |
| `task/19-public-supabase` | Public 페이지 Supabase 연동 | `docs/explanations/19-public-supabase.md` |
| `task/20-link-click-tracking` | 링크 클릭 수 집계 | `docs/explanations/20-link-click-tracking.md` |
| `task/21-admin-dashboard` | Admin 대시보드 통계 | `docs/explanations/21-admin-dashboard.md` |
| `task/22-profile-image-upload` | 프로필 이미지 업로드 | `docs/explanations/22-profile-image-upload.md` |
| `task/23-client-logos` | 기업 로고 관리 | `docs/explanations/23-client-logos.md` |
| `task/24-og-image-upload` | OG 이미지 업로드 | `docs/explanations/24-og-image-upload.md` |
| `task/25-vercel-deploy` | Vercel 배포 | `docs/explanations/25-vercel-deploy.md` |

---

## 학습 방법

브랜치를 순서대로 이동하며 아래 단계를 반복합니다.

1. 브랜치로 이동합니다.

```bash
git checkout task/18-logout
```

2. 위 표에서 해당 브랜치의 설명 파일을 열어 내용을 읽습니다.

3. 설명 파일 내 **"이렇게 확인하세요"** 섹션의 단계를 따라 기능을 직접 테스트합니다.

4. 다음 브랜치로 이동해 1~3을 반복합니다.

---

## 유의사항

- `.env.local` 파일은 git에 포함되지 않습니다. 브랜치를 이동해도 `.env.local`은 유지되므로 처음 한 번만 생성하면 됩니다.
- 브랜치마다 코드가 다르게 구현되어 있습니다. 
