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
            <div
              key={i}
              className="trust__logo-chip"
              style={logo.image_url ? { background: "transparent", boxShadow: "none" } : undefined}
            >
              {logo.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.image_url}
                  alt={logo.name}
                  style={{ height: 24, width: "auto", display: "block" }}
                />
              ) : (
                logo.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
