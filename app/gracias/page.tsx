import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { SocialButtons } from "@/components/layout/SocialButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Gracias"
};

export default function ThanksPage() {
  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-gold" />
          <SectionHeader
            title="Gracias por abrir este camino de abundancia"
            description="Tu compra quedó simulada en esta versión local. En producción, esta página recibirá la confirmación desde Stripe o Mercado Pago y activará tu acceso."
            centered
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/miembros">Entrar al área de miembros</ButtonLink>
            <ButtonLink href="/comunidad" variant="secondary">
              Unirme a la comunidad
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Siguiente paso"
            title="Sigue conectada con la comunidad"
            description="Encuentra inspiración diaria, videos, contenido espiritual y formas de apoyar este proyecto."
            centered
          />
          <SocialButtons className="mt-10 justify-center" />
        </div>
      </section>
    </div>
  );
}
