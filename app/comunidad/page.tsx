import type { Metadata } from "next";
import { HeartHandshake, MessageCircleHeart, Sparkles } from "lucide-react";
import { SocialButtons } from "@/components/layout/SocialButtons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Comunidad"
};

export default function CommunityPage() {
  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Comunidad"
            title="No camines solo(a): únete a Yo Soy Abundancia"
            description="Conecta con contenido diario, reflexiones, videos, oraciones, comunidad y formas de apoyar este proyecto para que llegue a más personas."
          />
          <SocialButtons className="mt-10" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-3 lg:px-8">
        {[
          {
            title: "Inspiración diaria",
            text: "Frases, ejercicios y recordatorios para volver a tu centro.",
            Icon: Sparkles
          },
          {
            title: "Acompañamiento",
            text: "Comparte avances, preguntas y testimonios dentro de la comunidad.",
            Icon: MessageCircleHeart
          },
          {
            title: "Apoyo consciente",
            text: "Patreon ayuda a sostener contenido gratuito, meditaciones y recursos.",
            Icon: HeartHandshake
          }
        ].map(({ title, text, Icon }) => (
          <article key={title} className="rounded-3xl bg-white p-6 shadow-sm">
            <Icon className="mb-4 h-7 w-7 text-rosewood" />
            <h2 className="text-xl font-bold text-plum">{title}</h2>
            <p className="mt-3 leading-7 text-plum/72">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
