import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminClient from "@/components/admin/AdminClient";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "관리자 | 김강사" };

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: links }, { data: logos }] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("links").select("*").order("order"),
    supabase.from("client_logos").select("*").order("order"),
  ]);

  if (!profile) redirect("/login");

  return (
    <AdminClient
      initialProfile={profile}
      initialLinks={links ?? []}
      initialLogos={logos ?? []}
    />
  );
}
