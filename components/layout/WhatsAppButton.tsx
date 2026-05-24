import { MessageCircle } from "lucide-react";

const whatsappHref =
  "https://wa.me/526241091216?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Yo%20Soy%20Abundancia%20y%20su%20camino%20de%20acompa%C3%B1amiento.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2f7d57] px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#276947] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d57] sm:px-5"
      aria-label="Hablar por WhatsApp sobre Yo Soy Abundancia"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Hablar por WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
