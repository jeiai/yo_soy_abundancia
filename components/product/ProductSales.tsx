import { CheckCircle2, Heart, Sparkles, Users } from "lucide-react";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/config/products";

const includes = [
  "21 días de frases de apertura",
  "Oraciones diarias con tono amoroso",
  "Ejercicios de gratitud",
  "Preguntas de reflexión escrita",
  "Tres acciones prácticas por día",
  "Afirmaciones de cierre"
];

const audience = [
  "Mujeres que desean reconectar con su fe y su paz interior.",
  "Personas que sienten bloqueos de escasez, culpa o miedo a recibir.",
  "Quienes quieren una práctica espiritual sencilla y constante.",
  "Quienes buscan crecer emocionalmente sin perder acción práctica."
];

const outcomes = [
  {
    title: "Más claridad emocional",
    text: "Identifica pensamientos de escasez y transfórmalos con compasión.",
    Icon: Heart
  },
  {
    title: "Mayor conexión espiritual",
    text: "Sostén una práctica diaria de oración, gratitud y presencia.",
    Icon: Sparkles
  },
  {
    title: "Acción inspirada",
    text: "Convierte cada reflexión en pasos pequeños y reales.",
    Icon: CheckCircle2
  },
  {
    title: "Sentido de comunidad",
    text: "Camina junto a una comunidad que comparte intención y propósito.",
    Icon: Users
  }
];

export function ProductSales() {
  const journal = products[0];

  return (
    <>
      <section className="soft-band px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              Cuaderno digital
            </p>
            <h1 className="font-display text-5xl font-semibold leading-tight text-plum md:text-7xl">
              {journal.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-plum/78">
              Un recorrido guiado para abrir caminos internos y externos de
              abundancia con gratitud, oración, reflexión y acciones sencillas.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CheckoutButton checkoutPath={journal.checkoutPath} label="Comprar cuaderno digital" />
              <p className="text-2xl font-bold text-plum">
                ${journal.price} <span className="text-base">{journal.currency}</span>
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-gold/25 bg-white p-7 shadow-soft">
            <p className="font-display text-3xl font-semibold text-plum">
              Lo que vas a trabajar
            </p>
            <div className="mt-6 grid gap-3">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-linen p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-medium text-plum">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title="Para quién es este cuaderno" />
            <div className="mt-8 grid gap-4">
              {audience.map((item) => (
                <p key={item} className="rounded-2xl bg-ivory p-5 leading-7 text-plum/78">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Beneficios emocionales y espirituales" />
            <div className="mt-8 grid gap-4">
              {outcomes.map(({ title, text, Icon }) => (
                <article key={title} className="rounded-2xl border border-blush/50 p-5">
                  <Icon className="mb-3 h-6 w-6 text-rosewood" />
                  <h3 className="font-bold text-plum">{title}</h3>
                  <p className="mt-2 leading-7 text-plum/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
