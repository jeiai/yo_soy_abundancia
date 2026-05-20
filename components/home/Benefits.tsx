import { Flower2, HandHeart, LineChart, Moon, Sprout, Sun } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const benefits = [
  {
    title: "Gratitud con intención",
    text: "Entrenas tu mirada para reconocer lo que ya sostiene tu vida.",
    Icon: Sun
  },
  {
    title: "Sanación emocional",
    text: "Nombras bloqueos con amor y los transformas en nuevas decisiones.",
    Icon: HandHeart
  },
  {
    title: "Oración diaria",
    text: "Conectas con una guía espiritual clara, cercana y esperanzadora.",
    Icon: Flower2
  },
  {
    title: "Acción práctica",
    text: "Cada reflexión termina en pasos pequeños que puedes cumplir.",
    Icon: Sprout
  },
  {
    title: "Hábitos de abundancia",
    text: "Construyes constancia sin exigencia ni culpa.",
    Icon: LineChart
  },
  {
    title: "Calma interior",
    text: "Regresas a tu centro para elegir desde paz, no desde miedo.",
    Icon: Moon
  }
];

export function Benefits() {
  return (
    <section className="bg-ivory px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Beneficios"
          title="Un espacio para recordar tu valor y moverte hacia lo que deseas"
          description="La abundancia se cultiva por dentro y se sostiene con acciones visibles. Esta plataforma une ambas dimensiones."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text, Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm"
            >
              <Icon className="mb-5 h-7 w-7 text-rosewood" />
              <h3 className="text-xl font-bold text-plum">{title}</h3>
              <p className="mt-3 leading-7 text-plum/72">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
