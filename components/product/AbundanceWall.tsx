"use client";

import { FormEvent, useEffect, useState } from "react";
import { Download, HeartHandshake, Loader2, PenLine, Sparkles } from "lucide-react";
import { mayPromoEndLabel } from "@/lib/may-promo";

type Signature = {
  id: string;
  displayName: string;
  intention: string;
  isAnonymous: boolean;
  createdAt: string;
};

const pdfHref = "/api/downloads/camino-21-dias-pdf";

export function AbundanceWall() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [intention, setIntention] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "signed" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/abundance-wall")
      .then((response) => response.json())
      .then((data: { signatures?: Signature[] }) => {
        setSignatures(data.signatures ?? []);
      })
      .catch(() => {
        setSignatures([]);
      });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/abundance-wall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        displayName,
        intention,
        isAnonymous
      })
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "No pudimos firmar el muro en este momento.");
      return;
    }

    setStatus("signed");
    setMessage("Tu petición ya forma parte del muro colectivo de la abundancia.");
    setIntention("");
    setSignatures((current) => [data.signature, ...current].slice(0, 24));
  };

  return (
    <section className="lavender-band px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rosewood ring-1 ring-gold/30">
            <HeartHandshake className="h-4 w-4 text-gold" />
            Muro colectivo de la abundancia
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Firma una petición de abundancia y recibe la versión PDF.
          </h2>
          <p className="mt-5 text-lg leading-8 text-plum/75">
            Gratis por tiempo limitado: versión PDF al firmar el muro colectivo
            de la abundancia. Puedes hacerlo con tu nombre visible o de forma
            anónima.
          </p>
          <p className="mt-4 rounded-3xl bg-white/75 p-4 text-sm font-semibold leading-6 text-plum/70 ring-1 ring-gold/20">
            Disponible hasta el {mayPromoEndLabel}.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-3xl border border-gold/20 bg-white p-5 shadow-soft">
            <label className="grid gap-2 text-sm font-semibold text-plum">
              Tu nombre
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                disabled={isAnonymous}
                maxLength={70}
                className="min-h-12 rounded-2xl border border-gold/25 bg-ivory px-4 text-base font-normal outline-none transition focus:border-gold disabled:opacity-55"
                placeholder="Ej. María, Josué, Alma abundante"
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-ivory px-4 py-3 text-sm font-semibold text-plum">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(event) => setIsAnonymous(event.target.checked)}
                className="h-4 w-4 accent-plum"
              />
              Firmar de forma anónima
            </label>
            <label className="grid gap-2 text-sm font-semibold text-plum">
              Petición o intención de abundancia
              <textarea
                value={intention}
                onChange={(event) => setIntention(event.target.value)}
                maxLength={280}
                rows={5}
                required
                className="rounded-2xl border border-gold/25 bg-ivory px-4 py-3 text-base font-normal leading-7 outline-none transition focus:border-gold"
                placeholder="Ej. Pido claridad, paz y caminos abiertos para sostener mi propósito con amor."
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rosewood disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenLine className="h-4 w-4" />}
              Firmar el muro colectivo
            </button>
            {message ? (
              <p className={`rounded-2xl p-3 text-sm font-semibold ${status === "error" ? "bg-blush/30 text-rosewood" : "bg-linen text-plum"}`}>
                {message}
              </p>
            ) : null}
            {status === "signed" ? (
              <a
                href={pdfHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-plum shadow-soft transition hover:bg-gold/80"
              >
                Descargar PDF imprimible
                <Download className="h-4 w-4" />
              </a>
            ) : null}
          </form>
        </div>

        <div className="rounded-3xl border border-gold/20 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                Libro colectivo
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-plum">
                Peticiones de abundancia
              </h3>
            </div>
            <Sparkles className="h-8 w-8 text-rosewood" />
          </div>
          <div className="mt-6 grid max-h-[42rem] gap-3 overflow-y-auto pr-1">
            {signatures.length === 0 ? (
              <p className="rounded-2xl bg-ivory p-4 leading-7 text-plum/70">
                Aún no hay firmas. Sé de las primeras personas en dejar una
                intención para este muro.
              </p>
            ) : (
              signatures.map((signature) => (
                <article key={signature.id} className="rounded-2xl bg-ivory p-4">
                  <p className="text-sm font-bold text-plum">{signature.displayName}</p>
                  <p className="mt-2 leading-7 text-plum/72">{signature.intention}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
