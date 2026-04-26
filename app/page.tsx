import type { Metadata } from "next";
import Hero from "@/components/public/Hero";
import TrustBar from "@/components/public/TrustBar";
import { LinkItem, OverflowCardItem } from "@/components/public/LinkItem";
import FloatingCTA from "@/components/public/FloatingCTA";
import Footer from "@/components/public/Footer";
import { mockProfile, mockLinks, mockLogos } from "@/lib/mock-data";

// ISR: 60초마다 백그라운드 재생성 (Supabase 연동 후 DB 변경이 반영되는 주기)
// mock 데이터 단계에서는 정적 페이지로 동작 (revalidate 무효)
export const revalidate = 60;

// TODO: Supabase 연동 후 generateMetadata로 교체
export const metadata: Metadata = {
  title: mockProfile.seo_title ?? "",
  description: mockProfile.seo_description ?? "",
  openGraph: {
    title: mockProfile.seo_title ?? "",
    description: mockProfile.seo_description ?? "",
    type: "website",
  },
};

export default function PublicPage() {
  const visibleLinks = mockLinks.filter((l) => l.is_visible);
  const basicLinks = visibleLinks.filter((l) => l.type === "link");
  const overflowCards = visibleLinks.filter((l) => l.type === "overflow_card");
  const ctaLink = mockLinks.find((l) => l.id === mockProfile.primary_cta_link_id);

  return (
    <>
      <div className="page">
        <Hero profile={mockProfile} />
        <TrustBar experience={mockProfile.experience} logos={mockLogos} />
        <section className="links">
          {basicLinks.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
          {overflowCards.map((link) => (
            <OverflowCardItem key={link.id} link={link} />
          ))}
        </section>
        <Footer name={mockProfile.name} />
      </div>
      {ctaLink && <FloatingCTA url={ctaLink.url} />}
    </>
  );
}
