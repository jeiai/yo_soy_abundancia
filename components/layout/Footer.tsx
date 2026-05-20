import Link from "next/link";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialButtons } from "./SocialButtons";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-plum text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
              <Heart className="h-5 w-5 text-honey" />
            </span>
            <div>
              <p className="font-display text-3xl font-semibold">{siteConfig.name}</p>
              <p className="text-sm text-white/70">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="max-w-2xl leading-7 text-white/75">
            Una plataforma para practicar gratitud, oración, sanación emocional
            y acciones concretas que sostienen una vida más abundante.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-honey">
            Comunidad y redes
          </p>
          <SocialButtons />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-white/65 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Yo Soy Abundancia. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/producto" className="hover:text-white">
              Comprar cuaderno
            </Link>
            <Link href="/comunidad" className="hover:text-white">
              Comunidad
            </Link>
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
