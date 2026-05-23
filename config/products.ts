export const products = [
  {
    id: "journal-21-dias",
    name: "21 días para abrir caminos de abundancia",
    type: "Camino digital",
    price: 222,
    currency: "MXN",
    description:
      "Un journal guiado con oración, gratitud, reflexión y acciones prácticas para transformar tu relación con la abundancia.",
    checkoutPath: "/api/checkout?product=journal-21-dias",
    featured: true
  },
  {
    id: "agenda-anual",
    name: "Agenda anual de gratitud y propósito",
    type: "Agenda digital",
    price: 333,
    currency: "MXN",
    description:
      "Planifica tus días con frases positivas, metas mensuales, hábitos y gratitud diaria.",
    checkoutPath: "/api/checkout?product=agenda-anual"
  },
  {
    id: "membresia-mensual",
    name: "Membresía mensual Yo Soy Abundancia",
    type: "Comunidad premium",
    price: 111,
    currency: "MXN/mes",
    description:
      "Acompañamiento mensual con contenido espiritual, meditaciones, retos y comunidad.",
    checkoutPath: "/api/checkout?product=membresia-mensual"
  },
  {
    id: "imprimibles",
    name: "Kit de imprimibles de abundancia",
    type: "Producto descargable",
    price: 88,
    currency: "MXN",
    description:
      "Tarjetas de afirmaciones, hojas de gratitud y planners para rituales cotidianos.",
    checkoutPath: "/api/checkout?product=imprimibles"
  },
  {
    id: "meditaciones",
    name: "Curso de meditaciones para merecimiento",
    type: "Curso digital",
    price: 444,
    currency: "MXN",
    description:
      "Meditaciones guiadas para trabajar merecimiento, calma interior y acción inspirada.",
    checkoutPath: "/api/checkout?product=meditaciones"
  }
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);
