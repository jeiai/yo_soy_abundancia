import type { Metadata } from "next";
import { ProductSales } from "@/components/product/ProductSales";

export const metadata: Metadata = {
  title: "Cuaderno Digital"
};

export default function ProductPage() {
  return <ProductSales />;
}
