import type { Metadata } from "next";
import { ProductSales } from "@/components/product/ProductSales";

export const metadata: Metadata = {
  title: "Camino de abundancia en 21 días"
};

type ProductPageProps = {
  searchParams?: {
    checkout?: string;
    provider?: string;
    message?: string;
  };
};

export default function ProductPage({ searchParams }: ProductPageProps) {
  const checkoutMessage =
    searchParams?.checkout === "error"
      ? searchParams.message ?? "No pudimos iniciar el pago. Revisa la configuración del proveedor."
      : searchParams?.checkout === "cancelled"
        ? "El pago fue cancelado. Puedes intentarlo de nuevo cuando estés listo(a)."
        : searchParams?.checkout === "failure"
          ? "El pago no pudo completarse. Puedes intentar con otro método."
          : undefined;

  return <ProductSales checkoutMessage={checkoutMessage} />;
}
