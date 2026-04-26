// Supabase 연동 전 개발용 임시 데이터
// 연동 후 삭제하고 DB 데이터로 교체

import { Profile, Link, ClientLogo } from "./types";

export const mockProfile: Profile = {
  id: "mock-user-id",
  name: "김강사",
  title: "AI전공 AI교육 강사",
  bio: "AI전공 AI교육 강사",
  experience: "강의경력 8년 | 삼성 출강 경험",
  image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  primary_cta_link_id: "link-google-form",
  seo_title: "AI전공 AI교육 강사 | 김강사",
  seo_description: "강의경력 8년, 삼성 출강 경험. 기업·공공기관 AI 교육 전문 강사 김강사에게 문의하세요.",
  og_image_url: null,
};

export const mockLinks: Link[] = [
  {
    id: "link-kakao",
    user_id: "mock-user-id",
    title: "카카오톡 문의",
    url: "https://open.kakao.com/o/example",
    type: "link",
    image_url: null,
    order: 1,
    is_visible: true,
    click_count: 0,
    created_at: "",
  },
  {
    id: "link-email",
    user_id: "mock-user-id",
    title: "이메일 문의",
    url: "mailto:instructor@example.com",
    type: "link",
    image_url: null,
    order: 2,
    is_visible: true,
    click_count: 0,
    created_at: "",
  },
  {
    id: "link-notion",
    user_id: "mock-user-id",
    title: "강의 소개 페이지",
    url: "https://notion.so/example",
    type: "link",
    image_url: null,
    order: 3,
    is_visible: true,
    click_count: 0,
    created_at: "",
  },
  {
    id: "link-blog",
    user_id: "mock-user-id",
    title: "AI 교육 블로그",
    url: "https://blog.example.com",
    type: "link",
    image_url: null,
    order: 4,
    is_visible: true,
    click_count: 0,
    created_at: "",
  },
  {
    id: "link-google-form",
    user_id: "mock-user-id",
    title: "GPT 실전 활용 기업 맞춤 강의",
    url: "https://forms.gle/example",
    type: "overflow_card",
    image_url: null,
    order: 5,
    is_visible: true,
    click_count: 0,
    created_at: "",
  },
];

export const mockLogos: ClientLogo[] = [
  { id: "1", user_id: "mock-user-id", name: "삼성전자", image_url: "", order: 1 },
  { id: "2", user_id: "mock-user-id", name: "LG전자", image_url: "", order: 2 },
  { id: "3", user_id: "mock-user-id", name: "현대자동차", image_url: "", order: 3 },
  { id: "4", user_id: "mock-user-id", name: "SK하이닉스", image_url: "", order: 4 },
  { id: "5", user_id: "mock-user-id", name: "KT", image_url: "", order: 5 },
  { id: "6", user_id: "mock-user-id", name: "네이버", image_url: "", order: 6 },
  { id: "7", user_id: "mock-user-id", name: "카카오", image_url: "", order: 7 },
  { id: "8", user_id: "mock-user-id", name: "롯데그룹", image_url: "", order: 8 },
];
