import { Link } from "@/lib/types";

type Period = "7d" | "30d";

interface DashboardStatsProps {
  links: Link[];
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export default function DashboardStats({ links, period, onPeriodChange }: DashboardStatsProps) {
  // TODO: 구현 (총 클릭수, 기간 필터, 링크별 통계)
  return <div />;
}
