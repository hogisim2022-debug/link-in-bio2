import type { Metadata } from "next";
import AdminClient from "@/components/admin/AdminClient";
import { mockProfile, mockLinks, mockLogos } from "@/lib/mock-data";

export const metadata: Metadata = { title: "관리자 | 김강사" };

export default function AdminPage() {
  return (
    <AdminClient
      initialProfile={mockProfile}
      initialLinks={mockLinks}
      initialLogos={mockLogos}
    />
  );
}
