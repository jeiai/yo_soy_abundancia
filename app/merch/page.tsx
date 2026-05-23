import type { Metadata } from "next";
import { Package } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Merch"
};

export default function MerchPage() {
  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Package className="mb-6 h-12 w-12 text-gold" />
          <h1 className="font-display text-5xl font-semibold leading-tight text-plum md:text-7xl">
            Merch
          </h1>
          <p className="mt-4 text-2xl font-semibold text-rosewood">
            Lleva contigo un recordatorio de abundancia
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-plum/75">
            Una colección de productos pensados para acompañar tu camino y
            mantener presente, en tu día a día, la práctica de vivir con
            intención, gratitud y plenitud.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/comunidad">Conocer la comunidad</ButtonLink>
            <ButtonLink href="/producto" variant="secondary">
              Ver productos digitales
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
