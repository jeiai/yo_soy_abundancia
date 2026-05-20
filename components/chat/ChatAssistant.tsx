"use client";

import { Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hola, soy YoSoyAbundancia. Estoy aquí para acompañarte con amor, claridad y pasos prácticos. ¿Qué deseas trabajar hoy?"
  }
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages })
    });
    const data = (await response.json()) as { reply: string };
    setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <section className="rounded-3xl border border-gold/20 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-plum text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-3xl font-semibold text-plum">
            YoSoyAbundancia
          </h2>
          <p className="text-sm text-plum/65">Acompañamiento amoroso y práctico</p>
        </div>
      </div>
      <div className="max-h-[520px] space-y-3 overflow-y-auto rounded-2xl bg-ivory p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl p-4 leading-7 ${
              message.role === "assistant"
                ? "bg-white text-plum"
                : "ml-auto max-w-[88%] bg-plum text-white"
            }`}
          >
            {message.content}
          </div>
        ))}
        {loading ? (
          <div className="rounded-2xl bg-white p-4 text-plum/70">
            Respirando contigo y preparando una respuesta...
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-12 flex-1 rounded-full border border-blush/70 bg-ivory px-5 text-plum outline-none focus:border-gold"
          placeholder="Cuéntame qué sientes o qué deseas manifestar..."
        />
        <button
          type="submit"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-plum text-white transition hover:bg-rosewood"
          aria-label="Enviar mensaje"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </section>
  );
}
