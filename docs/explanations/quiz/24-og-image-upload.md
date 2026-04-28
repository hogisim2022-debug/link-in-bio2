# 복습 퀴즈 — 24. OG 이미지 업로드

**연계 문서:** `13` ISR, `19` Public 페이지 연동, `22` 프로필 이미지 업로드, `24` OG 이미지 업로드

---

1. OG 이미지를 업로드한 직후, 카카오톡에서 링크를 공유하면 새 이미지가 즉시 표시된다.
2. `og-images` 버킷이 public이 아니면 SNS 크롤러가 이미지를 가져올 수 없다.
3. `profile.og_image_url`이 null이면 `generateMetadata`의 `og:image`도 비어서 SNS 공유 시 이미지가 표시되지 않는다.
4. OG 이미지는 `next/image` 컴포넌트가 아닌 `<meta>` 태그 URL로 참조되므로 `next.config.ts`의 remotePatterns 설정과 무관하다.
5. 같은 사용자가 OG 이미지를 두 번 업로드하면 `og-images` 버킷에 파일이 2개 생긴다.

---

## 정답

1. X — SNS 플랫폼은 OG 메타 태그를 직접 읽지 않고 자체 캐시를 사용한다. 카카오톡은 몇 시간~며칠간 캐시를 유지한다. 또한 개발 서버는 외부 접근이 불가능해서 로컬에서는 확인할 수 없다.
2. O — SNS 크롤러는 인증 없이 이미지 URL에 접근한다. 버킷이 비공개(private)이면 크롤러가 이미지를 읽지 못해 미리보기에 표시되지 않는다.
3. O — `generateMetadata`에서 `og_image_url ?? ""`로 처리하면 빈 문자열이 들어간다. `og:image`에 유효한 URL이 없으면 SNS에서 이미지를 표시하지 않는다.
4. O — `<meta property="og:image" content="URL">` 태그는 HTML에 URL 문자열을 넣는 것이다. `next/image`의 최적화·도메인 검증을 거치지 않는다.
5. X — `upload(path, file, { upsert: true })`에서 path가 `{userId}.{ext}`로 고정이라 같은 경로에 덮어쓴다. 파일은 1개만 유지된다.
