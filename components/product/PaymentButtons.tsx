"use client";

import { CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { CheckoutButton } from "@/components/ui/CheckoutButton";

type PaymentButtonsProps = {
  productId: string;
};

export function PaymentButtons({ productId }: PaymentButtonsProps) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <CheckoutButton
          checkoutPath={`/api/checkout?product=${productId}&provider=stripe`}
          label="Pagar con Stripe"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <CheckoutButton
          checkoutPath={`/api/checkout?product=${productId}&provider=mercado-pago`}
          label="Pagar con Mercado Pago"
          icon={<Landmark className="h-4 w-4" />}
        />
      </div>
      <a
        href={`/api/checkout?product=${productId}&provider=demo`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-plum/65 transition hover:text-plum"
      >
        <ShieldCheck className="h-4 w-4 text-gold" />
        Probar compra demo
      </a>
    </div>
  );
}
