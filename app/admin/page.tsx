import type { Metadata } from "next";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/25">
              Admin: {user.name ?? user.email}
            </p>
            <LogoutButton />
          </div>
          <SectionHeader
            eyebrow="Panel administrativo"
            title="Control basico del ecosistema Yo Soy Abundancia"
            description="Vista inicial para monitorear productos, usuarios, compras y contenido. Protegida para administradores."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AdminDashboard />
      </section>
    </div>
  );
}
