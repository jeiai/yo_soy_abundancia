import { CheckCircle2 } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ButtonLink } from "@/components/ui/ButtonLink";

type AlreadyLoggedInProps = {
  name: string;
  role: string;
};

export function AlreadyLoggedIn({ name, role }: AlreadyLoggedInProps) {
  return (
    <div className="soft-band px-5 py-20 lg:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-gold/20 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-gold" />
        <h1 className="font-display text-4xl font-semibold text-plum">
          Ya estas logeado
        </h1>
        <p className="mt-3 leading-7 text-plum/72">
          Tu sesion esta activa como <span className="font-semibold">{name}</span>.
          Puedes continuar tu camino de abundancia sin volver a escribir usuario
          y contrasena.
        </p>
        <div className="mt-8 grid gap-3">
          <ButtonLink href="/miembros">Ir al area de miembros</ButtonLink>
          {role === "admin" ? (
            <ButtonLink href="/admin" variant="secondary">
              Ir al panel admin
            </ButtonLink>
          ) : null}
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
