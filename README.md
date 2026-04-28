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

## Supabase 설정

실습 시작 전 Supabase SQL Editor에서 아래 SQL을 순서대로 실행하세요.

### 1단계 — 테이블 생성 (task/19 전)

```sql
-- profiles 테이블
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  title text not null default '',
  bio text not null default '',
  experience text not null default '',
  image_url text,
  primary_cta_link_id uuid,
  seo_title text,
  seo_description text,
  og_image_url text
);

-- links 테이블
create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  url text not null,
  type text not null check (type in ('link', 'card', 'overflow_card', 'youtube')),
  image_url text,
  "order" integer not null default 0,
  is_visible boolean not null default true,
  click_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- client_logos 테이블
create table client_logos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  image_url text not null default '',
  "order" integer not null default 0
);

-- RLS 활성화
alter table profiles enable row level security;
alter table links enable row level security;
alter table client_logos enable row level security;

-- RLS 정책
create policy "public read profiles" on profiles for select using (true);
create policy "owner update profiles" on profiles for update using (auth.uid() = id);
create policy "owner insert profiles" on profiles for insert with check (auth.uid() = id);

create policy "public read links" on links for select using (true);
create policy "owner all links" on links for all using (auth.uid() = user_id);

create policy "public read logos" on client_logos for select using (true);
create policy "owner all logos" on client_logos for all using (auth.uid() = user_id);
```

### 2단계 — 초기 데이터 삽입 (task/19 전)

> `your-user-id-here`를 본인 UUID로 교체 후 실행하세요.
> UUID는 Supabase 대시보드 → Authentication → Users → 본인 계정 클릭 후 확인.

```sql
do $$
declare
  uid uuid := 'your-user-id-here';
begin

insert into profiles (id, name, title, bio, experience, image_url, primary_cta_link_id, seo_title, seo_description, og_image_url)
values (
  uid,
  '김강사',
  'AI전공 AI교육 강사',
  'AI전공 AI교육 강사',
  '강의경력 8년 | 삼성 출강 경험',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  null,
  'AI전공 AI교육 강사 | 김강사',
  '강의경력 8년, 삼성 출강 경험. 기업·공공기관 AI 교육 전문 강사 김강사에게 문의하세요.',
  null
);

insert into links (user_id, title, url, type, image_url, "order", is_visible, click_count, created_at) values
  (uid, '카카오톡 문의',                'https://open.kakao.com/o/example', 'link',          null, 1, true, 0, now()),
  (uid, '이메일 문의',                 'mailto:instructor@example.com',    'link',          null, 2, true, 0, now()),
  (uid, '강의 소개 페이지',             'https://notion.so/example',        'link',          null, 3, true, 0, now()),
  (uid, 'AI 교육 블로그',               'https://blog.example.com',         'link',          null, 4, true, 0, now()),
  (uid, 'GPT 실전 활용 기업 맞춤 강의', 'https://forms.gle/example',        'overflow_card', null, 5, true, 0, now());

insert into client_logos (user_id, name, image_url, "order") values
  (uid, '삼성전자',   '', 1),
  (uid, 'LG전자',     '', 2),
  (uid, '현대자동차', '', 3),
  (uid, 'SK하이닉스', '', 4),
  (uid, 'KT',         '', 5),
  (uid, '네이버',     '', 6),
  (uid, '카카오',     '', 7),
  (uid, '롯데그룹',   '', 8);

end $$;
```

### 3단계 — 클릭 이벤트 테이블 + RPC 함수 (task/20 전)

```sql
-- link_click_events 테이블
create table link_click_events (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references links(id) on delete cascade not null,
  user_id uuid,
  clicked_at timestamptz not null default now()
);

alter table link_click_events enable row level security;

-- increment_click_count RPC 함수
create or replace function increment_click_count(link_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update links set click_count = click_count + 1 where id = link_id;
  insert into link_click_events (link_id, user_id)
  select link_id, l.user_id from links l where l.id = link_id;
end;
$$;
```

### 4단계 — Storage 버킷 생성 (task/22 전)

```sql
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('profiles',  'profiles',  true, 5242880, array['image/jpeg','image/png','image/webp','image/gif']),
  ('logos',     'logos',     true, 2097152, array['image/jpeg','image/png','image/webp','image/svg+xml']),
  ('og-images', 'og-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
```

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
