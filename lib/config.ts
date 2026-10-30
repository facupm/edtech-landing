// Todo lo que hay que reemplazar a mano vive acá.
export const SITE = {
  name: "Tiza",
  tagline: "La IA que convierte tu currícula en experiencias que hacen clic.",
  description:
    "Plataforma para instituciones educativas de Uruguay: cargá tu currícula y tu metodología, y la IA genera lecciones interactivas en español que el docente revisa y aprueba.",
  // TODO: reemplazar por la URL de producción cuando se despliegue
  url: "https://tiza-uy.vercel.app",
  locale: "es_UY",
} as const;

export const CONTACT = {
  email: "facpimas@gmail.com",
  // Dejá vacío para ocultar el botón. Formato internacional sin +, ej: 59899123456
  phone: "",
  // Dejá vacío para ocultar el botón. URL completa del perfil o página.
  linkedin: "",
} as const;

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT.email}${qs ? `?${qs}` : ""}`;
};

export const whatsappUrl = CONTACT.phone ? `https://wa.me/${CONTACT.phone}` : "";

export const TEAM = [
  {
    name: "Martin Duva",
    initials: "MD",
    role: "Co-founder",
    bio: "Ingeniero en Sistemas, egresado de ORT Uruguay.", // TODO: ampliar con más info
    linkedin: "", // URL de LinkedIn; vacío = sin link
    tone: "sky",
  },
  {
    name: "Facundo Pirez",
    initials: "FP",
    role: "Co-founder",
    bio: "Ingeniero en Sistemas, egresado de ORT Uruguay.", // TODO: ampliar con más info
    linkedin: "",
    tone: "sun",
  },
] as const;
