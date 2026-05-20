import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <div className="soft-band px-5 py-20 lg:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-gold/20 bg-white p-8 shadow-soft">
        <LockKeyhole className="mb-5 h-9 w-9 text-gold" />
        <h1 className="font-display text-4xl font-semibold text-plum">
          Acceso a miembros
        </h1>
        <p className="mt-3 leading-7 text-plum/72">
          Formulario visual listo para conectarse con NextAuth, Clerk, Supabase
          Auth o el proveedor que prefieras.
        </p>
        <form className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Correo electrónico</span>
            <input
              type="email"
              className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
              placeholder="tu@email.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="font-semibold text-plum">Contraseña</span>
            <input
              type="password"
              className="min-h-12 rounded-full border border-blush/70 bg-ivory px-5 outline-none focus:border-gold"
              placeholder="••••••••"
            />
          </label>
          <ButtonLink href="/miembros" className="mt-2">
            Entrar en modo demo
          </ButtonLink>
        </form>
      </section>
    </div>
  );
}
