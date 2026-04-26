import type { Metadata } from "next";
import Hero from "@/components/public/Hero";
import TrustBar from "@/components/public/TrustBar";
import { LinkItem, OverflowCardItem } from "@/components/public/LinkItem";
import FloatingCTA from "@/components/public/FloatingCTA";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("seo_title, seo_description, og_image_url")
    .single();

  return {
    title: profile?.seo_title ?? "",
    description: profile?.seo_description ?? "",
    openGraph: {
      title: profile?.seo_title ?? "",
      description: profile?.seo_description ?? "",
      type: "website",
      ...(profile?.og_image_url && { images: [profile.og_image_url] }),
    },
  };
}

export default async function PublicPage() {
  const supabase = await createClient();

  const [{ data: profile }, { data: links }, { data: logos }] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("links").select("*").eq("is_visible", true).order("order"),
    supabase.from("client_logos").select("*").order("order"),
  ]);

  if (!profile) return null;

  const basicLinks = (links ?? []).filter((l) => l.type === "link");
  const overflowCards = (links ?? []).filter((l) => l.type === "overflow_card");
  const ctaLink = (links ?? []).find((l) => l.id === profile.primary_cta_link_id);

  return (
    <>
      <div className="page">
        <Hero profile={profile} />
        <TrustBar experience={profile.experience} logos={logos ?? []} />
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
      {ctaLink && <FloatingCTA url={ctaLink.url} />}
    </>
  );
}
