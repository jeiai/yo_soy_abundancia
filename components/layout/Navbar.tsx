import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialButtons } from "./SocialButtons";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/producto", label: "Cuaderno" },
  { href: "/miembros", label: "Miembros" },
  { href: "/agenda", label: "Agenda" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/login", label: "Login" },
  { href: "/registro", label: "Registro" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ivory/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
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
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-plum/80">
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
        <SocialButtons className="max-w-full" />
      </div>
    </header>
  );
}
