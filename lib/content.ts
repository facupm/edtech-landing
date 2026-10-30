import {
  Clock,
  Languages,
  Bot,
  Atom,
  Building2,
  GraduationCap,
  Smile,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "./config";

const N = SITE.name;

export const NAV_LINKS = [
  { href: "#problema", label: "Problema" },
  { href: "#solucion", label: "Solución" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#contacto", label: "Contacto" },
];

export const HERO = {
  titleStart: "Tu currícula, convertida en",
  titleHighlight: "experiencias interactivas.",
  sub: `${N} es la plataforma donde cada institución carga su programa y su metodología, y la IA genera lecciones interactivas en español. El docente revisa y decide.`,
  ctaPrimary: "Quiero un piloto en mi institución",
  ctaSecondary: "Ver cómo funciona",
  chips: ["Hecho en Uruguay 🇺🇾", "En español", "Pensado para el MCN", "Cualquier materia"],
};

export type DemoSubject = {
  id: "mate" | "ciencias" | "historia";
  label: string;
  lines: string[];
};

export const DEMO_SUBJECTS: DemoSubject[] = [
  {
    id: "mate",
    label: "Matemática",
    lines: [
      "3.º año · Matemática",
      "Competencia: pensamiento matemático",
      "Unidad: Fracciones equivalentes",
      "Metodología: aprendizaje basado en proyectos",
    ],
  },
  {
    id: "ciencias",
    label: "Ciencias",
    lines: [
      "5.º año · Ciencias de la Naturaleza",
      "Competencia: pensamiento científico",
      "Unidad: El ciclo del agua",
      "Metodología: indagación",
    ],
  },
  {
    id: "historia",
    label: "Historia",
    lines: [
      "1.º liceo · Historia",
      "Competencia: pensamiento crítico",
      "Unidad: La Revolución Oriental",
      "Metodología: trabajo con fuentes",
    ],
  },
];

export const HISTORY_EVENTS = [
  { year: "1811", title: "Grito de Asencio", text: "Empieza el levantamiento en la campaña oriental." },
  { year: "1811", title: "Batalla de Las Piedras", text: "Primera gran victoria de las fuerzas orientales." },
  { year: "1811", title: "Éxodo del Pueblo Oriental", text: "Miles de familias siguen a Artigas en la retirada." },
  { year: "1813", title: "Instrucciones del Año XIII", text: "Las ideas políticas de la Provincia Oriental, por escrito." },
];

export const PROBLEM = {
  eyebrow: "El problema",
  title: "No es falta de ganas. Es falta de tiempo y de herramientas.",
  sub: "Los docentes saben qué quieren que los estudiantes vivan en clase. Producirlo es lo que no da.",
  cards: [
    {
      icon: Clock,
      tone: "sun",
      title: "Producir material interactivo lleva horas",
      text: "Lo que llega al aula sigue siendo mayormente estático: fotocopias, PDFs y diapositivas. No por falta de ideas, sino de tiempo.",
    },
    {
      icon: Languages,
      tone: "sky",
      title: "Lo mejor está en inglés y es de otro país",
      text: "Las mejores herramientas de aprendizaje interactivo siguen currículas ajenas y no se pueden adaptar a tu programa.",
    },
    {
      icon: Bot,
      tone: "violet",
      title: "Los chatbots genéricos no conocen tu institución",
      text: "No respetan tu metodología y muchas veces resuelven la tarea en lugar de enseñar. Cada institución tiene identidad pedagógica propia.",
    },
    {
      icon: Atom,
      tone: "mint",
      title: "Lo abstracto se entiende mejor haciendo",
      text: "Fracciones, fotosíntesis, causas de un proceso histórico, funciones. Se aprenden manipulando, pero ese material cuesta mucho de hacer.",
    },
  ] as { icon: LucideIcon; tone: Tone; title: string; text: string }[],
};

export type Tone = "sky" | "sun" | "violet" | "mint" | "coral";

export const COMPARE = {
  eyebrow: "Lo que existe vs. lo que proponemos",
  title: "No vendemos cursos. Te damos la capacidad de crearlos.",
  left: "Plataformas globales de aprendizaje",
  right: N,
  rows: [
    { label: "Idioma", left: "Inglés", right: "Español rioplatense" },
    { label: "Currícula", left: "De EE.UU., fija", right: "La de tu institución" },
    { label: "Materias", left: "Matemática y programación", right: "Todas" },
    { label: "Quién controla", left: "La plataforma", right: "El docente" },
    { label: "Modelo", left: "App individual", right: "Herramienta institucional" },
  ],
};

export const STEPS = {
  eyebrow: "Cómo funciona",
  title: "De tu planificación a una clase que engancha, en cuatro pasos.",
  items: [
    {
      n: 1,
      title: "Cargá tu currícula y metodología",
      text: "Subí tu planificación anual, elegí tu enfoque (proyectos, Montessori, IB, bilingüe, competencias) y el nivel de cada grupo.",
    },
    {
      n: 2,
      title: "Generá lecciones interactivas con IA",
      text: "Simulaciones, puzzles, visualizaciones y desafíos paso a paso con feedback inmediato. En español y alineados a tu programa.",
    },
    {
      n: 3,
      title: "Revisá y ajustá: el docente decide",
      text: "La IA hace el trabajo pesado de producción. Vos mantenés el criterio pedagógico y aprobás cada pieza antes de que llegue al aula.",
    },
    {
      n: 4,
      title: "Medí el progreso por competencia",
      text: "Mirá cómo avanza cada grupo, alineado al Marco Curricular Nacional. Datos para decidir, no para vigilar.",
    },
  ],
};

// TODO: verificar con el MCN que cada competencia asignada a estas lecciones sea la correcta
export const LESSONS = {
  eyebrow: "Así se ve aprender haciendo",
  title: "Distintas materias, distintas edades. Una misma idea: tocar para entender.",
  sub: "Ejemplos ilustrativos de lo que la plataforma podría generar.",
  items: [
    { id: "fracciones", title: "Fracciones con pizzas", subject: "Matemática", age: "3.º primaria", skill: "Pensamiento matemático", tone: "coral" },
    { id: "agua", title: "El ciclo del agua: simulación", subject: "Ciencias", age: "5.º primaria", skill: "Pensamiento científico", tone: "sky" },
    { id: "historia", title: "La Revolución Oriental: línea de tiempo jugable", subject: "Historia", age: "1.º liceo", skill: "Pensamiento crítico", tone: "sun" },
    { id: "funciones", title: "Funciones lineales: mové la recta", subject: "Matemática", age: "3.º liceo", skill: "Pensamiento matemático", tone: "violet" },
    { id: "algoritmo", title: "Programá tu primer algoritmo", subject: "Programación", age: "6.º primaria", skill: "Pensamiento computacional", tone: "mint" },
    { id: "ingles", title: "Inglés: armá la oración", subject: "Inglés", age: "Bilingüe", skill: "Comunicación", tone: "coral" },
  ] as { id: string; title: string; subject: string; age: string; skill: string; tone: Tone }[],
};

export const AUDIENCE = {
  eyebrow: "Para quién",
  title: "Una herramienta pensada para toda la comunidad educativa.",
  items: [
    {
      icon: Building2,
      tone: "sky",
      who: "Instituciones",
      points: [
        "Diferenciación: tu identidad pedagógica, en cada lección",
        "Contenido propio, alineado a tu programa",
        "Datos de progreso por grupo y por competencia",
      ],
    },
    {
      icon: GraduationCap,
      tone: "sun",
      who: "Docentes",
      points: [
        "Horas ahorradas en producir material",
        "Control total: nada llega al aula sin tu aprobación",
        "Material que engancha, hecho a tu medida",
      ],
    },
    {
      icon: Smile,
      tone: "mint",
      who: "Estudiantes",
      points: [
        "Aprender jugando y experimentando",
        "A su propio ritmo, con feedback al instante",
        "Un tutor que guía con preguntas, sin dar la respuesta",
      ],
    },
  ] as { icon: LucideIcon; tone: Tone; who: string; points: string[] }[],
};

export const WHY_NOW = {
  eyebrow: "Por qué Uruguay, por qué ahora",
  title: "El país y el momento están alineados.",
  items: [
    {
      tag: "Pionero",
      title: "Uruguay ya es referente en tecnología educativa",
      text: "Plan Ceibal (un dispositivo por niño desde 2007) y la plataforma CREA, usada masivamente, dejaron una base única en la región.",
    },
    {
      tag: "2025",
      title: "La IA en educación ya está en la agenda país",
      // TODO: verificar dato (fecha y socios del EduIA Lab)
      text: "En marzo de 2025, Ceibal lanzó el EduIA Lab, un laboratorio regional de IA en educación junto al Banco Mundial, el BID y el IDRC.",
    },
    {
      tag: "Currícula",
      title: "La Transformación Curricular pide traducir el marco a la práctica",
      text: "La ANEP organizó la Transformación Curricular en torno al Marco Curricular Nacional, con enfoque por competencias. Cada institución tiene que bajarlo a su aula.",
    },
    {
      tag: "IA",
      title: "Producir contenido interactivo se volvió accesible",
      text: "Lo que antes pedía un equipo de diseño instruccional y desarrollo, hoy se genera en minutos y se revisa en otros pocos.",
    },
  ],
  footnote:
    "Un país chico y bien conectado es ideal para validar con pilotos rápidos y escalar después a la LatAm hispanohablante.",
};

export const VISION = {
  eyebrow: "Nuestra visión",
  quote:
    "Que cada estudiante uruguayo tenga acceso a experiencias de aprendizaje de nivel mundial, diseñadas por sus propios docentes.",
  roadmap: [
    { step: "Hoy", text: "Validando la idea y buscando instituciones piloto en Uruguay." },
    { step: "Después", text: "Escalar al sistema educativo uruguayo, privado y público." },
    { step: "Más adelante", text: "Llevar la plataforma a la LatAm hispanohablante." },
  ],
};

export const TEAM_COPY = {
  eyebrow: "Equipo",
  title: "Dos personas, una idea y muchas ganas de construirla con vos.",
};

export const CONTACT_COPY = {
  title: "¿Querés que tu institución sea de las primeras?",
  sub: "Buscamos instituciones piloto, docentes, mentores y aliados.",
  notice: "Somos una idea en etapa temprana. Lo que más nos sirve ahora es conversar.",
  formTitle: "O dejanos tus datos",
  formCta: "Enviar por mail",
};
