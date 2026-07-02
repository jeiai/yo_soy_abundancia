import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminUsuarios } from "@/components/admin/AdminUsuarios";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: "AdminUsuarios"
};

export default async function AdminUsuariosPage() {
  const user = await requireAdmin();

  return (
    <div className="bg-ivory">
      <section className="lavender-band px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/admin"
                className="inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-plum ring-1 ring-gold/25 transition hover:bg-linen"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al panel
              </Link>
              <p className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/25">
                Admin: {user.name ?? user.email}
              </p>
            </div>
            <LogoutButton />
          </div>
          <SectionHeader
            eyebrow="Panel administrativo"
            title="AdminUsuarios"
            description="Tabla operativa para revisar usuarios registrados, compras del cuaderno digital, actividad requerida y preparación para versión impresa."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <AdminUsuarios />
      </section>
    </div>
  );
}
