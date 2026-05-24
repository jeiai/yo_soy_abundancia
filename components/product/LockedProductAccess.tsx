import { LockKeyhole } from "lucide-react";
import { PaymentButtons } from "@/components/product/PaymentButtons";

type LockedProductAccessProps = {
  eyebrow: string;
  title: string;
  description: string;
  productId: string;
};

export function LockedProductAccess({
  eyebrow,
  title,
  description,
  productId
}: LockedProductAccessProps) {
  return (
    <div className="bg-ivory">
      <section className="soft-band px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/20 bg-white p-8 text-center shadow-soft md:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linen text-rosewood ring-1 ring-gold/25">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-plum md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-plum/75">
            {description}
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <PaymentButtons productId={productId} />
          </div>
          <p className="mt-6 text-sm leading-6 text-plum/60">
            Si ya realizaste tu pago y aún no ves el acceso, inicia sesión con
            el mismo correo usado en la compra o escríbenos por WhatsApp para
            ayudarte.
          </p>
        </div>
      </section>
    </div>
  );
}
