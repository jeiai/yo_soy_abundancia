import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { AlreadyLoggedIn } from "@/components/auth/AlreadyLoggedIn";
import { AuthForm } from "@/components/auth/AuthForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Login"
};

type LoginPageProps = {
  searchParams?: {
    next?: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const nextPath = searchParams?.next ?? "/miembros";
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
        <LockKeyhole className="mb-5 h-9 w-9 text-gold" />
        <h1 className="font-display text-4xl font-semibold text-plum">
          Acceso a miembros
        </h1>
        <p className="mt-3 leading-7 text-plum/72">
          Entra con tu correo y contrasena para acceder al journal, agenda y
          acompanamiento.
        </p>
        <AuthForm mode="login" nextPath={nextPath} />
        <div className="mt-5 text-center text-sm text-plum/70">
          <span>No tienes cuenta? </span>
          <ButtonLink href="/registro" variant="ghost" className="min-h-10 px-4 py-2">
            Crear cuenta
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
