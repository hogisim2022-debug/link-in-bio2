// PRD 9절 데이터 모델 기반 TypeScript 타입 정의

export type LinkType = "link" | "card" | "overflow_card" | "youtube";

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  image_url: string | null;
  primary_cta_link_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
}

export interface Link {
  id: string;
  user_id: string;
  title: string;
  url: string;
  type: LinkType;
  image_url: string | null;
  order: number;
  is_visible: boolean;
  click_count: number;
  created_at: string;
}

export interface ClientLogo {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  order: number;
}
