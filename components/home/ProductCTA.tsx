import { BookOpenCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { products } from "@/config/products";

export function ProductCTA() {
  const journal = products[0];

  return (
    <section className="lavender-band px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-gold/20 bg-white/80 p-8 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-10">
        <div className="flex items-center justify-center rounded-[1.5rem] bg-plum p-8 text-white">
          <BookOpenCheck className="h-24 w-24 text-honey" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Producto principal
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-plum md:text-5xl">
            {journal.name}
          </h2>
          <p className="mt-4 text-lg leading-8 text-plum/75">
            Un recorrido de 21 días para cultivar gratitud, oración,
            reflexión y acción inspirada. Diseñado para iniciar hoy y sostener
            tu transformación con amor.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/camino-de-abundancia-en-21-dias">Ver el camino digital</ButtonLink>
            <p className="font-semibold text-plum">
              ${journal.price} {journal.currency}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
