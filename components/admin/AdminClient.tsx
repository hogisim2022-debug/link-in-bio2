"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import AdminShell from "./AdminShell";
import LinkEditor from "./LinkEditor";
import PreviewPane from "./PreviewPane";
import DashboardStats from "./DashboardStats";
import { createClient } from "@/lib/supabase/client";
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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ctaUrl = links.find((l) => l.id === ctaLinkId)?.url ?? "";

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${profile.id}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      console.error("[image upload]", uploadError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("profiles")
      .getPublicUrl(path);

    await supabase
      .from("profile")
      .update({ image_url: publicUrl })
      .eq("id", profile.id);

    setProfile({ ...profile, image_url: publicUrl });
    setUploading(false);
  }

  return (
    <AdminShell
      /* ── 대시보드 ── */
      dashboardPanel={<DashboardStats />}

      /* ── 설정 패널 ── */
      settingsPanel={
        <div>
          {/* 프로필 편집 — 실시간 미리보기 연동 */}
          <div className="admin-section">
            <p className="admin-section__title">프로필 / Trust</p>

            {/* 프로필 이미지 */}
            <div className="admin-field">
              <label className="admin-field__label">프로필 이미지</label>
              <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  background: "var(--sb-hairline)", position: "relative",
                }}>
                  {profile.image_url ? (
                    <Image
                      src={profile.image_url}
                      alt="프로필"
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized={profile.image_url.startsWith("https://images.unsplash")}
                    />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "2rem", color: "var(--sb-text-soft)",
                    }}>
                      👤
                    </div>
                  )}
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <button
                    style={{
                      fontSize: "var(--sb-text-sm)", padding: "0.6rem 1.4rem",
                      borderRadius: "50px", border: "1.5px solid var(--sb-hairline)",
                      background: "transparent", color: "var(--sb-text-primary)",
                      fontFamily: "inherit", fontWeight: 600, cursor: "pointer",
                      opacity: uploading ? 0.5 : 1,
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "업로드 중…" : "이미지 변경"}
                  </button>
                  <p style={{ fontSize: "var(--sb-text-xs)", color: "var(--sb-text-soft)", marginTop: "0.4rem" }}>
                    JPG, PNG, WebP · 최대 5MB
                  </p>
                </div>
              </div>
            </div>

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
