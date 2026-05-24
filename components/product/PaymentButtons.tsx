"use client";

import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";

type PaymentButtonsProps = {
  productId: string;
};

export function PaymentButtons({ productId }: PaymentButtonsProps) {
  const accessHref = productId === "agenda-anual" ? "/agenda" : "/miembros";

  return (
    <div className="grid gap-3 rounded-3xl border border-gold/25 bg-white/80 p-4">
      <p className="inline-flex w-fit items-center gap-2 rounded-full bg-linen px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rosewood">
        <Gift className="h-4 w-4" />
        Gratis en mayo
      </p>
      <Link
        href={accessHref}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rosewood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
      >
        Acceder gratis ahora
        <Sparkles className="h-4 w-4" />
      </Link>
      <p className="text-sm leading-6 text-plum/65">
        Acceso abierto hasta el 31 de mayo de 2026 a las 11:59pm hora centro de México.
      </p>
    </div>
  );
}
