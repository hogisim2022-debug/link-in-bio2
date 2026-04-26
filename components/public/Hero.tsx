import Image from "next/image";
import { Profile } from "@/lib/types";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="hero">
      {profile.image_url ? (
        <Image
          src={profile.image_url}
          alt={profile.name}
          width={88}
          height={88}
          className="hero__avatar"
          priority
        />
      ) : (
        <div className="hero__avatar-placeholder">
          {profile.name.charAt(0)}
        </div>
      )}
      <div>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__title">{profile.bio}</p>
      </div>
    </section>
  );
}
