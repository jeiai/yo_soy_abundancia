import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { AlreadyLoggedIn } from "@/components/auth/AlreadyLoggedIn";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Crear Cuenta"
};

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <AlreadyLoggedIn
        name={user.name ?? user.email}
        role={user.role}
      />
    );
  }

  return (
    <div className="soft-band px-5 py-20 lg:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-gold/20 bg-white p-8 shadow-soft">
        <UserPlus className="mb-5 h-9 w-9 text-gold" />
        <h1 className="font-display text-4xl font-semibold text-plum">
          Crear cuenta
        </h1>
        <p className="mt-3 leading-7 text-plum/72">
          Registra tu acceso para guardar tu camino de abundancia. La primera
          cuenta creada sera administradora.
        </p>
        <AuthForm mode="register" />
        <p className="mt-5 text-center text-sm text-plum/70">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-rosewood hover:text-plum">
            Inicia sesion
          </Link>
        </p>
      </section>
    </div>
  );
}
