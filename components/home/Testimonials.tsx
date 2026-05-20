import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Testimonios"
          title="Historias de mujeres que eligieron caminar con más fe"
          centered
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-blush/50 bg-ivory p-6"
            >
              <Quote className="mb-5 h-7 w-7 text-gold" />
              <p className="leading-7 text-plum/78">“{testimonial.text}”</p>
              <p className="mt-5 font-semibold text-plum">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
