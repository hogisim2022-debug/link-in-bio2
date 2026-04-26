import { ClientLogo, Profile } from "@/lib/types";

interface TrustBarProps {
  experience: Profile["experience"];
  logos: ClientLogo[];
}

export default function TrustBar({ experience, logos }: TrustBarProps) {
  // 무한 루프를 위해 로고 목록을 두 번 렌더링
  const doubled = [...logos, ...logos];
  const parts = experience.split("|").map((s) => s.trim());

  return (
    <section className="trust">
      <p className="trust__headline">
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 && <span className="trust__sep">|</span>}
            {part}
          </span>
        ))}
      </p>
      <div className="trust__ticker-wrap">
        <div className="trust__ticker-track">
          {doubled.map((logo, i) => (
            <div key={i} className="trust__logo-chip">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
