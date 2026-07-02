import Link from "next/link";
import { ArrowRight, BookOpen, CreditCard, Database, Users } from "lucide-react";
import { products } from "@/config/products";
import { journalDays } from "@/data/journal-days";

const stats = [
  { label: "Productos configurados", value: products.length, Icon: CreditCard },
  { label: "Días del journal", value: journalDays.length, Icon: BookOpen },
  { label: "Usuarios demo", value: 1, Icon: Users },
  { label: "Base de datos", value: "List(a)", Icon: Database }
];

export function AdminDashboard() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <article key={label} className="rounded-3xl bg-white p-6 shadow-sm">
            <Icon className="mb-4 h-7 w-7 text-rosewood" />
            <p className="text-3xl font-bold text-plum">{value}</p>
            <p className="mt-1 text-sm font-semibold text-plum/65">{label}</p>
          </article>
        ))}
      </div>
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl font-semibold text-plum">
            Productos monetizables
          </h2>
          <Link
            href="/admin/usuarios"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-plum px-5 text-sm font-semibold text-white transition hover:bg-rosewood"
          >
            Ver AdminUsuarios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gold/20 text-sm text-plum/65">
                <th className="py-3">Producto</th>
                <th className="py-3">Tipo</th>
                <th className="py-3">Precio</th>
                <th className="py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gold/10">
                  <td className="py-4 font-semibold text-plum">{product.name}</td>
                  <td className="py-4 text-plum/72">{product.type}</td>
                  <td className="py-4 text-plum/72">
                    ${product.price} {product.currency}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-linen px-3 py-1 text-sm font-semibold text-rosewood">
                      Demo local
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
