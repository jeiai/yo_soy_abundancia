"use client";

import { CreditCard, Landmark } from "lucide-react";
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
      <p className="text-sm leading-6 text-plum/65">
        Tu acceso se activará cuando el pago quede aprobado.
      </p>
    </div>
  );
}
