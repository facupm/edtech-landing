import type { ReactNode } from "react";

export const DUR = 56;
/** A partir de acá la escena es interactiva (aparecen los sliders). */
export const TRY_AT = 52;

const B = ({ children }: { children: ReactNode }) => <b className="font-bold">{children}</b>;

// `say` es el texto para la narración: sin símbolos que la voz lea mal.
export const CAPS: { at: number; text: ReactNode; say: string }[] = [
  {
    at: 0,
    text: (
      <>
        Esto es un triángulo rectángulo. Sus lados cortos se llaman catetos, <B>a</B> y <B>b</B>; el largo es la
        hipotenusa, <B>c</B>.
      </>
    ),
    say: "Esto es un triángulo rectángulo. Sus lados cortos se llaman catetos, a y b. El largo es la hipotenusa, c.",
  },
  {
    at: 6,
    text: <>Sobre cada lado dibujamos un cuadrado. Su área es el lado al cuadrado: a², b² y c².</>,
    say: "Sobre cada lado dibujamos un cuadrado. Su área es el lado al cuadrado: a al cuadrado, b al cuadrado y c al cuadrado.",
  },
  {
    at: 11.6,
    text: <>El teorema dice que el cuadrado verde ocupa lo mismo que el azul y el naranja juntos. ¿Por qué?</>,
    say: "El teorema dice que el cuadrado verde ocupa lo mismo que el azul y el naranja juntos. ¿Por qué?",
  },
  {
    at: 15,
    text: <>Tomamos un cuadrado de lado a + b y ponemos adentro 4 copias del mismo triángulo.</>,
    say: "Tomamos un cuadrado de lado a más b, y ponemos adentro cuatro copias del mismo triángulo.",
  },
  {
    at: 19.5,
    text: <>El hueco que queda en el centro es justo el cuadrado c².</>,
    say: "El hueco que queda en el centro es justo el cuadrado c al cuadrado.",
  },
  {
    at: 23.5,
    text: <>Ahora movemos esos mismos triángulos, sin girarlos ni cambiar su tamaño…</>,
    say: "Ahora movemos esos mismos triángulos, sin girarlos ni cambiar su tamaño.",
  },
  {
    at: 29.3,
    text: <>…y el hueco se convierte en dos cuadrados: a² y b².</>,
    say: "Y el hueco se convierte en dos cuadrados: a al cuadrado y b al cuadrado.",
  },
  {
    at: 32.3,
    text: (
      <>
        El cuadrado grande no cambió y los triángulos tampoco, así que los huecos ocupan lo mismo:{" "}
        <B>c² = a² + b²</B>.
      </>
    ),
    say: "El cuadrado grande no cambió, y los triángulos tampoco. Así que los huecos ocupan lo mismo: c al cuadrado es igual a a al cuadrado más b al cuadrado.",
  },
  {
    at: 40.6,
    text: (
      <>
        ¿Para qué sirve? Apoyás una escalera con la base a 3 m de la pared y llega a 4 m de altura. ¿Cuánto mide?
      </>
    ),
    say: "¿Para qué sirve? Apoyás una escalera con la base a tres metros de la pared, y llega a cuatro metros de altura. ¿Cuánto mide?",
  },
  {
    at: 45.8,
    text: (
      <>
        3² + 4² = 9 + 16 = 25. La raíz de 25 es 5: la escalera mide <B>5 metros</B>.
      </>
    ),
    say: "Tres al cuadrado más cuatro al cuadrado: nueve más dieciséis, veinticinco. La raíz de veinticinco es cinco. La escalera mide cinco metros.",
  },
  {
    at: TRY_AT,
    text: <>Ahora te toca a vos: mové los catetos y comprobá que las áreas siempre cuadran.</>,
    say: "Ahora te toca a vos: mové los catetos y comprobá que las áreas siempre cuadran.",
  },
];

export const CHAPTERS: { at: number; name: string }[] = [
  { at: 0, name: "La pregunta" },
  { at: 6, name: "Los cuadrados" },
  { at: 15, name: "El truco" },
  { at: 23.5, name: "Reordenar" },
  { at: 32.3, name: "Conclusión" },
  { at: 40.6, name: "En la vida real" },
  { at: TRY_AT, name: "Probalo vos" },
];
