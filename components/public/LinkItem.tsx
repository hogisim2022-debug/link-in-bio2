import { MessageCircle, Mail, FileText, PenLine, Link2, ChevronRight } from "lucide-react";
import { Link } from "@/lib/types";

interface LinkItemProps {
  link: Link;
}

type IconEntry = { icon: React.ReactNode; cls: string };

const ICON_MAP: Record<string, IconEntry> = {
  카카오:  { icon: <MessageCircle size={18} />, cls: "link-item__icon--kakao" },
  이메일:  { icon: <Mail size={18} />,          cls: "link-item__icon--email" },
  노션:    { icon: <FileText size={18} />,       cls: "link-item__icon--notion" },
  블로그:  { icon: <PenLine size={18} />,        cls: "link-item__icon--blog" },
};

function getIcon(title: string): IconEntry {
  const key = Object.keys(ICON_MAP).find((k) => title.includes(k));
  return key ? ICON_MAP[key] : { icon: <Link2 size={18} />, cls: "link-item__icon--default" };
}

// 기본형 링크
// TODO: Supabase 연동 후 클릭 시 increment_click_count RPC 호출 추가
export function LinkItem({ link }: LinkItemProps) {
  const { icon, cls } = getIcon(link.title);
  return (
    <a className="link-item" href={link.url} target="_blank" rel="noopener noreferrer">
      <div className={`link-item__icon ${cls}`}>{icon}</div>
      <div className="link-item__text">
        <div className="link-item__label">{link.title}</div>
      </div>
      <ChevronRight size={16} className="link-item__arrow" />
    </a>
  );
}

// 오버플로우 이미지 카드
export function OverflowCardItem({ link }: LinkItemProps) {
  return (
    <div className="overflow-card-wrap">
      <a className="overflow-card" href={link.url} target="_blank" rel="noopener noreferrer">
        <div className="overflow-card__img">🤖</div>
        <div className="overflow-card__body">
          <p className="overflow-card__badge">★ 대표 강의</p>
          <h2 className="overflow-card__title">{link.title}</h2>
        </div>
      </a>
    </div>
  );
}
