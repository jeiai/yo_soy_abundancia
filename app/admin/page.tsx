import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Admin"
};

export default function AdminPage() {
  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Panel administrativo"
            title="Control básico del ecosistema Yo Soy Abundancia"
            description="Vista inicial para monitorear productos, usuarios, compras y contenido. Lista para conectarse con autenticación de administradores y base de datos."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AdminDashboard />
      </section>
    </div>
  );
}
