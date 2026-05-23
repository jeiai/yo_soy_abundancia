import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MobileSocialMenu } from "./MobileSocialMenu";
import { SocialButtons } from "./SocialButtons";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/camino-de-abundancia-en-21-dias", label: "Camino de abundancia en 21 días" },
  { href: "/agenda", label: "Agenda" },
  { href: "/merch", label: "Merch" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/miembros", label: "Miembros" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/registro", label: "Registrarse" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ivory/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-plum text-white shadow-soft">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold leading-none text-plum">
                {siteConfig.name}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Comunidad espiritual
              </span>
            </span>
          </Link>
          <MobileSocialMenu />
        </div>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold text-plum/80 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-white hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SocialButtons className="hidden max-w-full lg:flex" />
      </div>
    </header>
  );
}
