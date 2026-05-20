export type JournalDay = {
  day: number;
  title: string;
  opening: string;
  prayer: string;
  gratitude: string;
  reflection: string;
  actions: string[];
  affirmation: string;
};

export const journalDays: JournalDay[] = [
  {
    day: 1,
    title: "Abrir el corazón",
    opening: "Hoy inicio con fe, suavidad y disposición para recibir.",
    prayer: "Dios, guíame a reconocer las bendiciones que ya viven en mí y abre mi corazón a nuevas oportunidades.",
    gratitude: "Escribe tres bendiciones presentes en tu vida, aunque parezcan pequeñas.",
    reflection: "¿Qué significa abundancia para mí más allá del dinero?",
    actions: ["Ordena un espacio pequeño", "Bebe agua con intención", "Agradece en voz alta una oportunidad"],
    affirmation: "Estoy lista para recibir lo bueno con paz y merecimiento."
  },
  {
    day: 2,
    title: "Soltar la escasez",
    opening: "Hoy observo mis pensamientos sin juzgarme.",
    prayer: "Amor divino, ayúdame a liberar el miedo y a elegir pensamientos que nutran mi confianza.",
    gratitude: "Agradece tres momentos en que la vida te sostuvo.",
    reflection: "¿Qué frase de escasez repito y por cuál verdad amorosa puedo cambiarla?",
    actions: ["Detecta un pensamiento limitante", "Escribe su nueva versión", "Comparte una palabra de ánimo"],
    affirmation: "Mi mente aprende a confiar y mi vida se abre con calma."
  },
  {
    day: 3,
    title: "Reconocer mi valor",
    opening: "Mi valor no depende de lo que produzco.",
    prayer: "Fuente de amor, recuérdame que soy digna de amor, descanso, oportunidades y prosperidad.",
    gratitude: "Escribe tres cualidades tuyas que hayan bendecido a alguien.",
    reflection: "¿Dónde he confundido merecimiento con esfuerzo excesivo?",
    actions: ["Descansa 15 minutos sin culpa", "Di no a una carga innecesaria", "Celebra un logro reciente"],
    affirmation: "Soy valiosa por quien soy y recibo desde mi dignidad."
  },
  {
    day: 4,
    title: "Sanar la relación con recibir",
    opening: "Recibir también puede ser un acto sagrado.",
    prayer: "Dios, enséñame a recibir ayuda, amor y prosperidad sin cerrarme por miedo.",
    gratitude: "Agradece tres personas o gestos que te hayan apoyado.",
    reflection: "¿Qué siento cuando alguien me ofrece ayuda o reconocimiento?",
    actions: ["Acepta un cumplido", "Pide apoyo concreto", "Registra una forma de recibir hoy"],
    affirmation: "Recibo con humildad, alegría y confianza."
  },
  {
    day: 5,
    title: "Orden interior",
    opening: "El orden suave crea espacio para nuevas bendiciones.",
    prayer: "Presencia divina, armoniza mis emociones y ayúdame a elegir claridad.",
    gratitude: "Agradece tres áreas de tu vida que están mejorando.",
    reflection: "¿Qué pendiente emocional o práctico está ocupando energía?",
    actions: ["Haz una lista breve de pendientes", "Resuelve uno de menos de 10 minutos", "Respira profundo cinco veces"],
    affirmation: "Creo espacio para la paz, la claridad y la abundancia."
  },
  {
    day: 6,
    title: "Gratitud activa",
    opening: "La gratitud me devuelve al presente.",
    prayer: "Gracias, Dios, por lo visible y lo invisible que sostiene mi camino.",
    gratitude: "Escribe cinco cosas que sí tienes hoy.",
    reflection: "¿Cómo cambia mi energía cuando miro lo que ya está aquí?",
    actions: ["Envía un mensaje de agradecimiento", "Cuida algo que ya posees", "Camina observando belleza"],
    affirmation: "Lo que agradezco florece en mi vida."
  },
  {
    day: 7,
    title: "Fe en movimiento",
    opening: "Mi fe se fortalece cuando doy un paso.",
    prayer: "Guía mis acciones para que sean sencillas, honestas y alineadas con mi bien.",
    gratitude: "Agradece una oportunidad que aún está en proceso.",
    reflection: "¿Qué pequeño paso he estado posponiendo por miedo?",
    actions: ["Elige una acción de 20 minutos", "Ponle hora en tu agenda", "Hazla antes de dormir"],
    affirmation: "Camino con fe y cada paso abre posibilidad."
  },
  {
    day: 8,
    title: "Perdonarme",
    opening: "Hoy dejo de castigarme por mi proceso.",
    prayer: "Amor infinito, ayúdame a mirarme con compasión y aprender sin dureza.",
    gratitude: "Agradece tres aprendizajes que nacieron de errores.",
    reflection: "¿Qué necesito perdonarme para avanzar más ligera?",
    actions: ["Escribe una carta breve de perdón", "Rompe una exigencia imposible", "Haz algo amable por tu cuerpo"],
    affirmation: "Me perdono, aprendo y sigo creciendo."
  },
  {
    day: 9,
    title: "Abundancia en mis vínculos",
    opening: "Mis relaciones también pueden ser tierra fértil.",
    prayer: "Bendice mis vínculos y ayúdame a crear relaciones honestas, recíprocas y amorosas.",
    gratitude: "Nombra tres relaciones que traen luz a tu vida.",
    reflection: "¿Qué vínculo deseo nutrir y cuál necesito limitar con amor?",
    actions: ["Haz una llamada pendiente", "Pon un límite claro", "Reconoce el valor de alguien"],
    affirmation: "Merezco relaciones que honren mi paz y mi expansión."
  },
  {
    day: 10,
    title: "Dinero con paz",
    opening: "Puedo mirar mis finanzas con amor y responsabilidad.",
    prayer: "Dios, dame sabiduría para administrar, recibir, compartir y crecer.",
    gratitude: "Agradece tres formas en que el dinero te ha servido.",
    reflection: "¿Qué emoción aparece cuando reviso mi dinero?",
    actions: ["Revisa tus gastos de la semana", "Elige un ajuste pequeño", "Aparta una cantidad simbólica para ahorro"],
    affirmation: "Administro mis recursos con claridad, fe y amor."
  },
  {
    day: 11,
    title: "Merecimiento",
    opening: "No necesito sufrir para merecer lo bueno.",
    prayer: "Que mi corazón recuerde que el amor divino no se gana: se recibe.",
    gratitude: "Agradece tres regalos de vida que no tuviste que controlar.",
    reflection: "¿En qué área me cuesta creer que merezco más paz?",
    actions: ["Di tu afirmación frente al espejo", "Acepta una comodidad sencilla", "Permítete disfrutar sin justificarlo"],
    affirmation: "Merezco amor, prosperidad y descanso."
  },
  {
    day: 12,
    title: "Creatividad próspera",
    opening: "Mis ideas pueden convertirse en caminos.",
    prayer: "Inspira mi creatividad y muéstrame cómo servir desde mis dones.",
    gratitude: "Agradece tres talentos, habilidades o experiencias que tienes.",
    reflection: "¿Qué idea me emociona y qué primer paso necesita?",
    actions: ["Anota diez ideas sin filtro", "Elige una viable", "Comparte tu idea con alguien de confianza"],
    affirmation: "Mis dones tienen valor y pueden bendecir al mundo."
  },
  {
    day: 13,
    title: "Cuidar mi energía",
    opening: "Mi energía es un recurso sagrado.",
    prayer: "Ayúdame a proteger mi paz y elegir ambientes que eleven mi espíritu.",
    gratitude: "Agradece tres hábitos que cuidan tu bienestar.",
    reflection: "¿Qué drena mi energía y qué la restaura?",
    actions: ["Silencia una distracción", "Haz una pausa de respiración", "Elige una comida o bebida nutritiva"],
    affirmation: "Honro mi energía y la uso con sabiduría."
  },
  {
    day: 14,
    title: "Visión de futuro",
    opening: "Puedo imaginar un futuro bueno sin abandonar el presente.",
    prayer: "Dios, ordena mis deseos y muéstrame la visión que nace del amor.",
    gratitude: "Agradece tres sueños que siguen vivos en ti.",
    reflection: "¿Cómo deseo sentirme dentro de un año?",
    actions: ["Escribe una visión de una página", "Elige una meta mensual", "Define el primer hábito que la sostiene"],
    affirmation: "Mi futuro se construye con fe, claridad y acción."
  },
  {
    day: 15,
    title: "Generosidad",
    opening: "Dar desde el amor me conecta con la abundancia.",
    prayer: "Enséñame a dar sin vaciarme y a compartir desde la alegría.",
    gratitude: "Agradece tres cosas que puedes compartir hoy.",
    reflection: "¿Cómo puedo ser generosa sin traicionarme?",
    actions: ["Comparte conocimiento", "Dona o regala algo útil", "Ora por la prosperidad de otra persona"],
    affirmation: "Comparto desde plenitud y recibo con gratitud."
  },
  {
    day: 16,
    title: "Disciplina amorosa",
    opening: "La disciplina también puede sentirse tierna.",
    prayer: "Dame constancia sin dureza y enfoque sin perder mi paz.",
    gratitude: "Agradece tres rutinas que te han sostenido.",
    reflection: "¿Qué hábito pequeño multiplicaría mi bienestar?",
    actions: ["Elige un hábito de cinco minutos", "Prepara tu entorno", "Marca tu avance al terminar"],
    affirmation: "Soy constante con amor y mi vida responde."
  },
  {
    day: 17,
    title: "Sanar la comparación",
    opening: "El camino de otra persona no cancela el mío.",
    prayer: "Libérame de compararme y enséñame a bendecir el bien ajeno.",
    gratitude: "Agradece tres rasgos únicos de tu camino.",
    reflection: "¿Con quién me comparo y qué deseo propio revela esa comparación?",
    actions: ["Limita una fuente de comparación", "Bendice el logro de alguien", "Trabaja 15 minutos en tu meta"],
    affirmation: "Mi camino es sagrado, suficiente y fértil."
  },
  {
    day: 18,
    title: "Pedir con claridad",
    opening: "Puedo pedir desde la fe y la honestidad.",
    prayer: "Dios, ayúdame a pedir lo que necesito con humildad, claridad y confianza.",
    gratitude: "Agradece tres peticiones que ya fueron respondidas.",
    reflection: "¿Qué necesito pedir a Dios, a mí misma o a alguien más?",
    actions: ["Escribe una petición clara", "Haz una solicitud concreta", "Permanece abierta a la respuesta"],
    affirmation: "Pido con claridad y recibo guía perfecta."
  },
  {
    day: 19,
    title: "Alegría cotidiana",
    opening: "La alegría pequeña también abre caminos.",
    prayer: "Que mi corazón reconozca la belleza sencilla y vuelva a sonreír.",
    gratitude: "Agradece tres detalles hermosos de este día.",
    reflection: "¿Qué placer simple deseo permitirme más seguido?",
    actions: ["Escucha una canción que eleve tu ánimo", "Haz algo creativo", "Toma una pausa sin pantalla"],
    affirmation: "La alegría habita en mí y me guía hacia la vida."
  },
  {
    day: 20,
    title: "Integrar lo aprendido",
    opening: "Reconozco mi avance con amor.",
    prayer: "Gracias por cada revelación, cada paso y cada puerta que se está abriendo.",
    gratitude: "Agradece tres cambios internos de estos días.",
    reflection: "¿Qué descubrí sobre mi manera de recibir, agradecer y actuar?",
    actions: ["Relee tus notas favoritas", "Elige tres prácticas para continuar", "Celebra tu compromiso"],
    affirmation: "Integro mi aprendizaje y avanzo con nueva luz."
  },
  {
    day: 21,
    title: "Camino abierto",
    opening: "Hoy cierro un ciclo y abro una nueva etapa.",
    prayer: "Dios, bendice mis caminos. Que mi vida sea testimonio de gratitud, amor, prosperidad y servicio.",
    gratitude: "Escribe veintiuna gratitudes, una por cada día recorrido.",
    reflection: "¿Qué camino de abundancia elijo sostener desde hoy?",
    actions: ["Define tu siguiente meta", "Comparte tu testimonio", "Haz una acción de fe hacia tu futuro"],
    affirmation: "Yo soy abundancia en expansión, guiada por amor y propósito."
  }
];
