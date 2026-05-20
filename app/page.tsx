import { Benefits } from "@/components/home/Benefits";
import { Hero } from "@/components/home/Hero";
import { ProductCTA } from "@/components/home/ProductCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialButtons } from "@/components/layout/SocialButtons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Qué es"
            title="Una plataforma para unir espiritualidad, claridad emocional y movimiento real"
            description="Yo Soy Abundancia nace para acompañarte a vivir con más gratitud, sanar patrones de escasez, fortalecer tu oración diaria y tomar acciones concretas hacia una vida más plena."
          />
        </div>
      </section>
      <Benefits />
      <Testimonials />
      <ProductCTA />
      <section className="bg-ivory px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Comunidad"
            title="Camina acompañada también en redes sociales"
            description="Únete a los espacios donde compartimos frases, reflexiones, oraciones, contenido en video y formas de apoyar el proyecto."
            centered
          />
          <SocialButtons className="mt-10 justify-center" />
        </div>
      </section>
    </>
  );
}
