"use client";

import Hero from "@/components/public/Hero";
import TrustBar from "@/components/public/TrustBar";
import { LinkItem, OverflowCardItem } from "@/components/public/LinkItem";
import Footer from "@/components/public/Footer";
import FloatingCTA from "@/components/public/FloatingCTA";
import { Profile, Link, ClientLogo } from "@/lib/types";

interface PreviewPaneProps {
  profile: Profile;
  links: Link[];
  logos: ClientLogo[];
  ctaUrl: string;
}

export default function PreviewPane({ profile, links, logos, ctaUrl }: PreviewPaneProps) {
  const visibleLinks = links.filter((l) => l.is_visible);
  const basicLinks = visibleLinks.filter((l) => l.type === "link");
  const overflowCards = visibleLinks.filter((l) => l.type === "overflow_card");

  return (
    <div style={{ width: "100%", maxWidth: 480, position: "relative" }}>
      <div
        className="page"
        style={{
          background: "var(--sb-neutral-warm)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--sb-shadow-frap)",
        }}
      >
        <Hero profile={profile} />
        <TrustBar experience={profile.experience} logos={logos} />
        <section className="links">
          {basicLinks.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
          {overflowCards.map((link) => (
            <OverflowCardItem key={link.id} link={link} />
          ))}
        </section>
        <Footer name={profile.name} />
      </div>
      {ctaUrl && (
        <div style={{ position: "sticky", bottom: 0, marginTop: 8 }}>
          <FloatingCTA url={ctaUrl} />
        </div>
      )}
    </div>
  );
}
