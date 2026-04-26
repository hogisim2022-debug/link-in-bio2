"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Period = "7d" | "30d";

interface LinkStat {
  link_id: string;
  title: string;
  count: number;
}

export default function DashboardStats() {
  const [period, setPeriod] = useState<Period>("7d");
  const [stats, setStats] = useState<LinkStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const supabase = createClient();
      const since = new Date();
      since.setDate(since.getDate() - (period === "7d" ? 7 : 30));

      const { data, error } = await supabase
        .from("link_click_events")
        .select("link_id, links(title)")
        .gte("clicked_at", since.toISOString());

      if (error) {
        console.error("[dashboard]", error);
        setLoading(false);
        return;
      }

      const countMap: Record<string, { title: string; count: number }> = {};
      for (const row of data ?? []) {
        const id = row.link_id;
        const linksData = row.links as unknown as { title: string } | null;
        const title = linksData?.title ?? id;
        if (!countMap[id]) countMap[id] = { title, count: 0 };
        countMap[id].count++;
      }

      const sorted = Object.entries(countMap)
        .map(([link_id, { title, count }]) => ({ link_id, title, count }))
        .sort((a, b) => b.count - a.count);

      setStats(sorted);
      setLoading(false);
    }

    fetchStats();
  }, [period]);

  const total = stats.reduce((s, r) => s + r.count, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      {/* 헤더 행: 총 클릭 수 + 기간 필터 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.2rem" }}>
        <div>
          <p style={{ fontSize: "var(--sb-text-sm)", color: "var(--sb-text-soft)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            총 클릭 수
          </p>
          <p style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--sb-forest)", lineHeight: 1 }}>
            {loading ? "—" : total.toLocaleString()}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {(["7d", "30d"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "0.5rem 1.2rem",
                borderRadius: "50px",
                border: "1.5px solid",
                borderColor: period === p ? "var(--sb-green-accent)" : "var(--sb-hairline)",
                background: period === p ? "var(--sb-green-accent)" : "transparent",
                color: period === p ? "var(--sb-white)" : "var(--sb-text-soft)",
                fontSize: "var(--sb-text-sm)",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all var(--sb-dur) var(--sb-ease)",
              }}
            >
              {p === "7d" ? "7일" : "30일"}
            </button>
          ))}
        </div>
      </div>

      {/* 링크별 클릭 수 테이블 */}
      {loading ? (
        <p style={{ fontSize: "var(--sb-text-sm)", color: "var(--sb-text-soft)" }}>불러오는 중…</p>
      ) : stats.length === 0 ? (
        <p style={{ fontSize: "var(--sb-text-sm)", color: "var(--sb-text-soft)" }}>
          선택한 기간에 클릭 데이터가 없어요.
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--sb-text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--sb-hairline)" }}>
              <th style={{ textAlign: "left", padding: "0.6rem 0.8rem", color: "var(--sb-text-soft)", fontWeight: 600 }}>링크</th>
              <th style={{ textAlign: "right", padding: "0.6rem 0.8rem", color: "var(--sb-text-soft)", fontWeight: 600 }}>클릭</th>
              <th style={{ textAlign: "right", padding: "0.6rem 0.8rem", color: "var(--sb-text-soft)", fontWeight: 600 }}>비율</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row) => (
              <tr key={row.link_id} style={{ borderBottom: "1px solid var(--sb-hairline)" }}>
                <td style={{ padding: "0.8rem 0.8rem", color: "var(--sb-text-primary)" }}>{row.title}</td>
                <td style={{ padding: "0.8rem 0.8rem", textAlign: "right", fontWeight: 700, color: "var(--sb-forest)" }}>{row.count}</td>
                <td style={{ padding: "0.8rem 0.8rem", textAlign: "right", color: "var(--sb-text-soft)" }}>
                  {total > 0 ? Math.round((row.count / total) * 100) : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
