import {
  FaFacebookF,
  FaInstagram,
  FaPatreon,
  FaTiktok,
  FaYoutube
} from "react-icons/fa";
import { socialLinks } from "@/config/social-links";

const items = [
  {
    key: "tiktok",
    label: "Síguenos en TikTok",
    short: "TikTok",
    href: socialLinks.tiktok,
    Icon: FaTiktok
  },
  {
    key: "facebook",
    label: "Únete a nuestra comunidad en Facebook",
    short: "Facebook",
    href: socialLinks.facebook,
    Icon: FaFacebookF
  },
  {
    key: "instagram",
    label: "Inspírate en Instagram",
    short: "Instagram",
    href: socialLinks.instagram,
    Icon: FaInstagram
  },
  {
    key: "youtube",
    label: "Escucha y mira contenido en YouTube",
    short: "YouTube",
    href: socialLinks.youtube,
    Icon: FaYoutube
  },
  {
    key: "patreon",
    label: "Apoya este proyecto en Patreon",
    short: "Patreon",
    href: socialLinks.patreon,
    Icon: FaPatreon
  }
] as const;

type SocialButtonsProps = {
  compact?: boolean;
  className?: string;
};

export function SocialButtons({ compact = false, className = "" }: SocialButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map(({ key, href, label, short, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/30 transition hover:-translate-y-0.5 hover:bg-linen hover:shadow-soft"
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4 text-rosewood" />
          {compact ? short : label}
        </a>
      ))}
    </div>
  );
}
