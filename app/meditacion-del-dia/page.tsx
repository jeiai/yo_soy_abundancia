import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Meditación del Día"
};

export default function MeditationPage() {
  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              Meditación del Día
            </p>
            <h1 className="font-display text-5xl font-semibold leading-tight text-plum md:text-7xl">
              Acompaña tu práctica diaria
            </h1>
            <p className="mt-6 text-xl leading-9 text-plum/75">
              Este espacio está preparado para la transmisión en vivo o la
              repetición más reciente de YouTube.
            </p>
            <ButtonLink href="/comunidad" className="mt-8">
              Conocer la comunidad
              <PlayCircle className="h-4 w-4" />
            </ButtonLink>
          </div>
          <YouTubeEmbed
            videoId="jfKfPfyJRdk"
            title="Meditación del Día de Yo Soy Abundancia"
          />
        </div>
      </section>
    </div>
  );
}
