"use client";

import { CreditCard } from "lucide-react";
import { useState } from "react";

type CheckoutButtonProps = {
  checkoutPath: string;
  label?: string;
};

export function CheckoutButton({
  checkoutPath,
  label = "Comprar ahora"
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        window.location.href = checkoutPath;
      }}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rosewood disabled:cursor-wait disabled:opacity-80 sm:w-auto"
      disabled={loading}
    >
      <CreditCard className="h-4 w-4" />
      {loading ? "Preparando compra..." : label}
    </button>
  );
}
