import { products } from "@/config/products";

export type PaymentProvider = "stripe" | "mercado-pago" | "demo";

export async function createCheckoutUrl(productId: string, provider: PaymentProvider = "demo") {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // Demo local. Reemplazar por Stripe Checkout o Mercado Pago Preference.
  if (provider === "demo") {
    return `/gracias?product=${product.id}&provider=demo`;
  }

  if (provider === "stripe") {
    return `/gracias?product=${product.id}&provider=stripe-pending`;
  }

  return `/gracias?product=${product.id}&provider=mercado-pago-pending`;
}
