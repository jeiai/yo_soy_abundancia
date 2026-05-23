import Link from "next/link";
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
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="flex w-fit flex-col items-center gap-2 text-center">
            <img
              src="/brand/yo-soy-abundancia-logo.jpeg"
              alt="Logo de Yo Soy Abundancia"
              className="h-16 w-16 rounded-full object-cover shadow-soft ring-2 ring-gold/35"
            />
            <span>
              <span className="block font-display text-2xl font-semibold leading-none text-plum">
                {siteConfig.name}
              </span>
              <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-gold">
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
