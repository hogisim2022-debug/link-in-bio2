# 복습 퀴즈 — 25. Vercel 배포 설정

**연계 문서:** `13` ISR, `07` Auth Middleware, `25` Vercel 배포 설정

---

1. Vercel에 환경변수를 등록하지 않아도 `NEXT_PUBLIC_` 접두사가 붙은 변수는 자동으로 공개되어 동작한다.
2. Vercel은 GitHub에 push할 때마다 자동으로 새 빌드를 실행한다.
5. ISR `revalidate = 60` 설정은 Vercel 배포 환경에서만 동작하고, 로컬 개발 서버에서는 동작하지 않는다.

---

## 정답

1. X — `NEXT_PUBLIC_` 접두사는 브라우저에 값을 노출하는 의미이지, 환경변수를 자동 등록해주는 것이 아니다. Vercel 대시보드에서 직접 추가해야 한다.
2. O — Vercel은 GitHub 저장소와 연결되면 `main` 브랜치(또는 설정된 브랜치)에 push할 때마다 자동 배포를 실행한다.
5. X — ISR은 로컬 `npm run dev`에서도 동작한다. 단, dev 모드에서는 캐시 없이 매 요청마다 새로 fetch한다. ISR 캐싱은 `npm run build && npm run start` 또는 Vercel 배포 환경에서 실제 효과가 나타난다.
