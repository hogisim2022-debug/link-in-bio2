import { MessageCircle } from "lucide-react";

interface FloatingCTAProps {
  url: string;
  label?: string;
}

export default function FloatingCTA({ url, label = "강의 문의하기" }: FloatingCTAProps) {
  return (
    <div className="floating-cta">
      <div className="floating-cta__inner">
        <a className="floating-cta__btn" href={url} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} />
          {label}
        </a>
      </div>
    </div>
  );
}
