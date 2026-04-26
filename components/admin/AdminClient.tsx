"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import LinkEditor from "./LinkEditor";
import PreviewPane from "./PreviewPane";
import { Profile, Link, ClientLogo } from "@/lib/types";

interface AdminClientProps {
  initialProfile: Profile;
  initialLinks: Link[];
  initialLogos: ClientLogo[];
}

export default function AdminClient({
  initialProfile,
  initialLinks,
  initialLogos,
}: AdminClientProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [ctaLinkId, setCtaLinkId] = useState<string>(
    initialProfile.primary_cta_link_id ?? initialLinks[0]?.id ?? ""
  );
  const [seo, setSeo] = useState({
    title:       initialProfile.seo_title       ?? "",
    description: initialProfile.seo_description ?? "",
  });

  const ctaUrl = links.find((l) => l.id === ctaLinkId)?.url ?? "";

  return (
    <AdminShell
      /* ── 대시보드 ── */
      dashboardPanel={
        <div>
          <p className="admin-section__title">대시보드</p>
          <p style={{ fontSize: "var(--sb-text-sm)", color: "var(--sb-text-soft)" }}>
            Supabase 연동 후 클릭 통계가 표시됩니다.
          </p>
        </div>
      }

      /* ── 설정 패널 ── */
      settingsPanel={
        <div>
          {/* 프로필 편집 — 실시간 미리보기 연동 */}
          <div className="admin-section">
            <p className="admin-section__title">프로필 / Trust</p>
            <div className="admin-field">
              <label className="admin-field__label">이름</label>
              <input
                className="admin-field__input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">한 줄 소개</label>
              <input
                className="admin-field__input"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">경력</label>
              <input
                className="admin-field__input"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-section">
            <p className="admin-section__title">링크 관리</p>
            <LinkEditor links={links} onChange={setLinks} />
          </div>
          {/* Primary CTA 드롭다운 */}
          <div className="admin-section">
            <p className="admin-section__title">문의하기 버튼 연결</p>
            <div className="admin-field">
              <label className="admin-field__label">하단 고정 버튼이 열 링크</label>
              <select
                className="admin-field__input"
                value={ctaLinkId}
                onChange={(e) => setCtaLinkId(e.target.value)}
              >
                {links.map((link) => (
                  <option key={link.id} value={link.id}>
                    {link.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-section">
            <p className="admin-section__title">SEO 설정</p>
            <div className="admin-field">
              <label className="admin-field__label">페이지 제목</label>
              <input
                className="admin-field__input"
                placeholder="AI전공 AI교육 강사 | 김강사"
                value={seo.title}
                onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              />
              <p className="admin-field__hint">{seo.title.length} / 60자 권장</p>
            </div>
            <div className="admin-field">
              <label className="admin-field__label">설명 (Meta Description)</label>
              <textarea
                className="admin-field__input admin-field__textarea"
                placeholder="강의경력 8년, 삼성 출강 경험. AI 교육 전문 강사에게 문의하세요."
                value={seo.description}
                onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                rows={3}
              />
              <p className="admin-field__hint">{seo.description.length} / 160자 권장</p>
            </div>
            <p className="admin-field__note">
              OG 이미지 업로드는 Supabase Storage 연동 후 활성화됩니다.
            </p>
          </div>
        </div>
      }

      /* ── Live Preview ── */
      previewPanel={
        <PreviewPane
          profile={profile}
          links={links}
          logos={initialLogos}
          ctaUrl={ctaUrl}
        />
      }
    />
  );
}
