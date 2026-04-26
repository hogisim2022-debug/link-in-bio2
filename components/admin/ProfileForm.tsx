"use client";
import { Profile, ClientLogo, Link } from "@/lib/types";

interface ProfileFormProps {
  profile: Profile;
  logos: ClientLogo[];
  links: Link[];
  onSave: (data: Partial<Profile>) => void;
}

export default function ProfileForm({ profile, logos, links, onSave }: ProfileFormProps) {
  // TODO: 구현 (이름/소개/경력 수정, 이미지 업로드, 로고 관리, Primary CTA 지정)
  return <div />;
}
