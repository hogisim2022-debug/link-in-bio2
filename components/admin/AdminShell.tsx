"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Tab = "settings" | "preview" | "dashboard";

interface AdminShellProps {
  settingsPanel: React.ReactNode;
  previewPanel: React.ReactNode;
  dashboardPanel: React.ReactNode;
}

export default function AdminShell({
  settingsPanel,
  previewPanel,
  dashboardPanel,
}: AdminShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="admin-shell">
      {/* 상단 헤더 */}
      <header className="admin-header">
        <span className="admin-header__title">관리자</span>
        <button className="admin-header__logout" onClick={handleLogout}><LogOut size={14} /> 로그아웃</button>
      </header>

      {/* 모바일 탭 (768px 이하에서만 노출) */}
      <nav className="admin-tabs">
        {(["settings", "preview", "dashboard"] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? "admin-tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_LABEL[tab]}
          </button>
        ))}
      </nav>

      {/* Desktop: 대시보드 상단 고정 */}
      <div className="admin-dashboard">{dashboardPanel}</div>

      {/* 패널 영역 */}
      <div className="admin-panels">
        {/* 설정 패널 — mobile: 탭 비활성 시 숨김 / desktop: 항상 노출 */}
        <aside className={`admin-settings ${activeTab !== "settings" ? "admin-panel--hidden" : ""}`}>
          {settingsPanel}
        </aside>

        {/* 미리보기 패널 — mobile: 탭 비활성 시 숨김 / desktop: 항상 노출 */}
        <main className={`admin-preview ${activeTab !== "preview" ? "admin-panel--hidden" : ""}`}>
          {previewPanel}
        </main>
      </div>

      {/* 모바일 대시보드 탭 */}
      {activeTab === "dashboard" && (
        <div className="admin-section">{dashboardPanel}</div>
      )}
    </div>
  );
}

const TAB_LABEL: Record<Tab, string> = {
  settings:  "설정",
  preview:   "미리보기",
  dashboard: "대시보드",
};
