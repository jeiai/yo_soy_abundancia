import { ArrowRight, BookOpen, HeartHandshake, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";

const journalFeatures = [
  { label: "Oración diaria", Icon: HeartHandshake },
  { label: "Reflexión guiada", Icon: BookOpen },
  { label: "Acciones prácticas", Icon: Sparkles },
  { label: "Cierre afirmativo", Icon: ArrowRight }
];

export function Hero() {
  return (
    <section className="soft-band">
      <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rosewood ring-1 ring-gold/30">
            <Sparkles className="h-4 w-4 text-gold" />
            Un camino de gratitud, fe y acción
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-plum md:text-7xl">
            Yo Soy Abundancia
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-plum/78">
            Bienvenida a una comunidad espiritual y práctica para sanar
            bloqueos, fortalecer tu fe y abrir caminos de abundancia desde el
            amor, la gratitud y acciones concretas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/producto">
              {siteConfig.mainCta}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/comunidad" variant="secondary">
              Unirme a la comunidad
            </ButtonLink>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] border border-gold/25 bg-white/82 p-6 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-linen p-6">
              <p className="font-display text-4xl font-semibold text-plum">
                21 días para abrir caminos de abundancia
              </p>
              <p className="mt-4 leading-7 text-plum/75">
                Un cuaderno digital guiado con oración, gratitud, reflexión y
                acciones prácticas para acompañarte día a día.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {journalFeatures.map(({ label, Icon }) => (
                  <div key={label} className="rounded-2xl bg-white p-4">
                    <Icon className="mb-3 h-5 w-5 text-gold" />
                    <p className="font-semibold text-plum">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
