"use client";
import { Profile } from "@/lib/types";

type SEOFields = Pick<Profile, "seo_title" | "seo_description" | "og_image_url">;

interface SEOFormProps {
  values: SEOFields;
  onSave: (data: SEOFields) => void;
}

export default function SEOForm({ values, onSave }: SEOFormProps) {
  // TODO: 구현 (SEO 제목, 설명, OG 이미지 업로드)
  return <div />;
}
