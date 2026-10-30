import type { CSSProperties } from "react";

/*
 * Escena de la lección: una función pura del tiempo `t` (en segundos).
 * Colores: a² = sky (azul), b² = sun (ámbar), c² = mint (verde).
 * Layout "wide" (800×450) para escritorio y "compact" (400×500) para celular:
 * en compact cada escena es un <svg> anidado con su propio viewBox, así el
 * texto queda a tamaño legible y las ecuaciones bajan debajo del dibujo.
 */

type V = [number, number];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const prog = (t: number, s: number, e: number) => ease(clamp((t - s) / (e - s)));
const add = (P: V, v: V, k = 1): V => [P[0] + v[0] * k, P[1] + v[1] * k];
const mid = (P: V, Q: V): V => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
const pts = (a: V[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
const fmt = (x: number) => (Math.round(x * 100) / 100).toString().replace(".", ",");
const vis = (k: number): CSSProperties => ({ opacity: k, visibility: k <= 0.001 ? "hidden" : "visible" });

export const STAGE = {
  wide: { w: 800, h: 450 },
  compact: { w: 400, h: 500 },
} as const;

const TXT = {
  a: "fill-sky-deep",
  b: "fill-sun-deep",
  c: "fill-mint-deep",
} as const;
const SQ = {
  a: "fill-sky/20 stroke-sky-deep",
  b: "fill-sun/35 stroke-sun-deep",
  c: "fill-mint/25 stroke-mint-deep",
} as const;
const GAP = {
  a: "fill-sky/25",
  b: "fill-sun/40",
  c: "fill-mint/30",
} as const;

const MATH = "font-math fill-ink";

/** Variable en cursiva al cuadrado, con color. */
function Sq({ v, cls }: { v: string; cls: string }) {
  return (
    <>
      <tspan className={`italic ${cls}`}>{v}</tspan>
      <tspan className={cls}>²</tspan>
    </>
  );
}

type PythProps = {
  a: number;
  b: number;
  u: number;
  x0: number;
  y0: number;
  draw: number;
  fill: number;
  labels: number;
  kA: number;
  kB: number;
  kC: number;
  areaText: { a: string; b: string; c: string };
};

/** Triángulo con un cuadrado sobre cada lado. a = cateto vertical, b = horizontal. */
function Pyth({ a, b, u, x0, y0, draw, fill, labels, kA, kB, kC, areaText }: PythProps) {
  const A = a * u;
  const B = b * u;
  const C = Math.hypot(A, B);
  const P0: V = [x0, y0];
  const P1: V = [x0 + B, y0];
  const P2: V = [x0, y0 - A];
  const sides = [
    { key: "a" as const, k: kA, P: P0, Q: P2, n: [-A, 0] as V },
    { key: "b" as const, k: kB, P: P0, Q: P1, n: [0, B] as V },
    { key: "c" as const, k: kC, P: P2, Q: P1, n: [A, -B] as V },
  ];
  const per = A + B + C;
  const r = Math.min(12, A * 0.3, B * 0.3);
  const M = mid(P0, [x0 + B, y0 - A]);
  const side = "font-math italic fill-ink text-[21px]";
  return (
    <g>
      {sides.map(({ key, k, P, Q, n }) => {
        const m = add(mid(P, Q), n, k / 2);
        return (
          <g key={key}>
            <polygon
              points={pts([P, Q, add(Q, n, k), add(P, n, k)])}
              className={SQ[key]}
              strokeWidth={2}
              strokeLinejoin="round"
              style={vis(k > 0.001 ? 1 : 0)}
            />
            <text
              x={m[0]}
              y={m[1]}
              textAnchor="middle"
              dominantBaseline="central"
              className={`font-math italic font-medium text-[22px] ${TXT[key]}`}
              style={vis(k)}
            >
              {areaText[key]}
            </text>
          </g>
        );
      })}
      <polygon
        points={pts([P0, P1, P2])}
        className="stroke-ink"
        strokeWidth={2}
        strokeLinejoin="round"
        style={{
          fill: "var(--color-ink)",
          fillOpacity: 0.1 * fill,
          strokeDasharray: per,
          strokeDashoffset: per * (1 - draw),
        }}
      />
      <path d={`M${P0[0]},${P0[1] - r}h${r}v${r}`} className="fill-none stroke-ink" strokeWidth={1.5} style={vis(labels)} />
      <g style={vis(labels)}>
        <text x={P0[0] + 14} y={P0[1] - A / 2} textAnchor="start" dominantBaseline="central" className={side}>
          a
        </text>
        <text x={P0[0] + B / 2} y={P0[1] - 14} textAnchor="middle" dominantBaseline="central" className={side}>
          b
        </text>
        <text
          x={M[0] + (A / C) * 16}
          y={M[1] - (B / C) * 16}
          textAnchor="middle"
          dominantBaseline="central"
          className={side}
        >
          c
        </text>
      </g>
    </g>
  );
}

type Props = { t: number; a: number; b: number; compact: boolean };

export function PythagorasScene({ t, a, b, compact }: Props) {
  const { w, h } = compact ? STAGE.compact : STAGE.wide;
  const vb = (wide: string, c: string) => (compact ? c : wide);
  const scene = (o: number, viewBox: string, children: React.ReactNode) =>
    o > 0 ? (
      <svg x={0} y={0} width={w} height={h} viewBox={viewBox} style={vis(o)}>
        {children}
      </svg>
    ) : null;

  /* ---------- Escena 1: la pregunta ---------- */
  const o1 = 1 - prog(t, 14, 15);
  const s1 = scene(
    o1,
    vb("0 0 800 450", "0 0 400 500"),
    <>
      {compact ? (
        <>
          <text x={24} y={42} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
            TEOREMA DE PITÁGORAS
          </text>
          <text x={24} y={90} className="font-display font-bold text-[36px] fill-ink">
            ¿Por qué
          </text>
          <text x={24} y={140} className={`${MATH} font-medium text-[44px]`}>
            <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} /> = <Sq v="c" cls={TXT.c} />?
          </text>
          <text x={24} y={182} className="font-sans text-[17px] fill-ink" style={vis(prog(t, 12, 13))}>
            <tspan className={TXT.c}>verde</tspan> = <tspan className={TXT.a}>azul</tspan> +{" "}
            <tspan className={TXT.b}>naranja</tspan>
          </text>
        </>
      ) : (
        <>
          <text x={60} y={150} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
            TEOREMA DE PITÁGORAS
          </text>
          <text x={60} y={200} className="font-display font-bold text-[40px] fill-ink">
            ¿Por qué
          </text>
          <text x={60} y={252} className={`${MATH} font-medium text-[44px]`}>
            <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} /> = <Sq v="c" cls={TXT.c} />?
          </text>
          <text x={60} y={310} className="font-sans text-[18px] fill-ink" style={vis(prog(t, 12, 13))}>
            <tspan className={TXT.c}>verde</tspan> = <tspan className={TXT.a}>azul</tspan> +{" "}
            <tspan className={TXT.b}>naranja</tspan>
          </text>
        </>
      )}
      <Pyth
        a={3}
        b={4}
        u={compact ? 22 : 28}
        x0={compact ? 156 : 464}
        y0={compact ? 372 : 310}
        draw={prog(t, 0.5, 2.5)}
        fill={prog(t, 2, 3)}
        labels={prog(t, 2.6, 3.6)}
        kA={prog(t, 6.3, 7.8)}
        kB={prog(t, 7.8, 9.3)}
        kC={prog(t, 9.3, 11)}
        areaText={{ a: "a²", b: "b²", c: "c²" }}
      />
    </>,
  );

  /* ---------- Escenas 2 a 4: la demostración por reordenamiento ---------- */
  const A2 = 126;
  const B2 = 168;
  const S2 = A2 + B2;
  const X = compact ? 53 : 100;
  const Y = compact ? 66 : 78;
  const TRIS: { R: V; h: V; v: V; mv: V; m: [number, number] | null }[] = [
    { R: [X, Y], h: [A2, 0], v: [0, B2], mv: [0, A2], m: [24, 25.5] },
    { R: [X + S2, Y], h: [-B2, 0], v: [0, A2], mv: [0, 0], m: null },
    { R: [X + S2, Y + S2], h: [-A2, 0], v: [0, -B2], mv: [-B2, 0], m: [27.6, 29.1] },
    { R: [X, Y + S2], h: [B2, 0], v: [0, -A2], mv: [A2, -B2], m: [25.8, 27.3] },
  ];
  const o2 = prog(t, 14.8, 15.4) * (1 - prog(t, 40, 40.6));
  const kc = prog(t, 19.5, 20.5) * (1 - prog(t, 23.5, 24.2));
  const kab = prog(t, 29.3, 30.3);
  const per = 4 * S2;
  const areaCls = "font-math italic font-medium text-[26px]";
  const s2 = scene(
    o2,
    vb("0 0 800 450", "0 0 400 500"),
    <>
      <polygon
        points={pts([[X + A2, Y], [X + S2, Y + A2], [X + B2, Y + S2], [X, Y + B2]])}
        className={GAP.c}
        style={vis(kc)}
      />
      <rect x={X} y={Y} width={A2} height={A2} className={GAP.a} style={vis(kab)} />
      <rect x={X + A2} y={Y + A2} width={B2} height={B2} className={GAP.b} style={vis(kab)} />
      {TRIS.map((T, i) => {
        const k = prog(t, 16.4 + i * 0.7, 17 + i * 0.7);
        const m = T.m ? prog(t, T.m[0], T.m[1]) : 0;
        const R = add(add(T.R, T.mv, m), [0, -24 * (1 - k)]);
        return (
          <polygon
            key={i}
            points={pts([R, add(R, T.h), add(R, T.v)])}
            className="stroke-ink"
            strokeWidth={2}
            strokeLinejoin="round"
            style={{ ...vis(k), fill: "var(--color-ink)", fillOpacity: 0.1 }}
          />
        );
      })}
      <rect
        x={X}
        y={Y}
        width={S2}
        height={S2}
        className="fill-none stroke-ink"
        strokeWidth={2.5}
        style={{ strokeDasharray: per, strokeDashoffset: per * (1 - prog(t, 15.2, 16.4)) }}
      />
      <text x={X + S2 / 2} y={Y + S2 / 2} textAnchor="middle" dominantBaseline="central" className={`${areaCls} ${TXT.c}`} style={vis(kc)}>
        c²
      </text>
      <text x={X + A2 / 2} y={Y + A2 / 2} textAnchor="middle" dominantBaseline="central" className={`${areaCls} ${TXT.a}`} style={vis(kab)}>
        a²
      </text>
      <text x={X + A2 + B2 / 2} y={Y + A2 + B2 / 2} textAnchor="middle" dominantBaseline="central" className={`${areaCls} ${TXT.b}`} style={vis(kab)}>
        b²
      </text>
      <g style={vis(prog(t, 16.4, 17.2))}>
        <text x={X + A2 / 2} y={Y - 16} textAnchor="middle" dominantBaseline="central" className="font-math italic fill-ink text-[21px]">
          a
        </text>
        <text x={X + A2 + B2 / 2} y={Y - 16} textAnchor="middle" dominantBaseline="central" className="font-math italic fill-ink text-[21px]">
          b
        </text>
      </g>
      {compact ? (
        <>
          <text x={24} y={398} className={`${MATH} text-[24px]`} style={vis(prog(t, 20.5, 21.3))}>
            Antes: hueco = <Sq v="c" cls={TXT.c} />
          </text>
          <text x={24} y={434} className={`${MATH} text-[24px]`} style={vis(prog(t, 30.3, 31.1))}>
            Después: hueco = <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} />
          </text>
          <text x={24} y={482} className={`${MATH} font-medium text-[38px]`} style={vis(prog(t, 35, 36))}>
            <Sq v="c" cls={TXT.c} /> = <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} />
          </text>
        </>
      ) : (
        <>
          <g style={vis(prog(t, 20.5, 21.3))}>
            <text x={470} y={112} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
              ANTES
            </text>
            <text x={470} y={146} className={`${MATH} text-[30px]`}>
              Hueco = <Sq v="c" cls={TXT.c} />
            </text>
          </g>
          <g style={vis(prog(t, 30.3, 31.1))}>
            <text x={470} y={196} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
              DESPUÉS
            </text>
            <text x={470} y={230} className={`${MATH} text-[30px]`}>
              Hueco = <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} />
            </text>
          </g>
          <text x={470} y={290} className="font-sans text-[18px] fill-ink" style={vis(prog(t, 32.5, 33.3))}>
            Mismo cuadrado, mismos triángulos:
          </text>
          <text x={470} y={316} className="font-sans text-[18px] fill-ink" style={vis(prog(t, 33.5, 34.3))}>
            los dos huecos ocupan lo mismo.
          </text>
          <text x={470} y={382} className={`${MATH} font-medium text-[44px]`} style={vis(prog(t, 35, 36))}>
            <Sq v="c" cls={TXT.c} /> = <Sq v="a" cls={TXT.a} /> + <Sq v="b" cls={TXT.b} />
          </text>
        </>
      )}
    </>,
  );

  /* ---------- Escena 5: la escalera ---------- */
  const o3 = prog(t, 40.6, 41.2) * (1 - prog(t, 51.4, 52.1));
  const F: V = [240, 380];
  const LD = 300;
  const dir: V = [0.6, -0.8];
  const nr: V = [0.8, 0.6];
  const L = LD * prog(t, 41.6, 43.2);
  const E = add(F, dir, L);
  const rails: [V, V][] = [
    [add(F, nr, 8), add(E, nr, 8)],
    [add(F, nr, -8), add(E, nr, -8)],
  ];
  const rungs: number[] = [];
  for (let s = 24; s < LD; s += 32) rungs.push(s);
  const eq = `${MATH} ${compact ? "text-[26px]" : "text-[30px]"}`;
  const ex = compact ? 290 : 540;
  const ey = compact ? [498, 548, 598] : [200, 252, 304];
  const ea = compact ? "middle" : "start";
  const s3 = scene(
    o3,
    vb("0 0 800 450", "30 60 520 650"),
    <>
      <text x={60} y={compact ? 88 : 70} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
        EN LA VIDA REAL
      </text>
      <polygon points="240,380 420,380 420,140" className="fill-mint/10" style={vis(prog(t, 44.6, 45.4))} />
      <rect x={60} y={380} width={420} height={10} className="fill-line" />
      <line x1={60} y1={380} x2={480} y2={380} className="stroke-ink" strokeWidth={2} />
      {rails.map(([p, q], i) => (
        <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} className="stroke-mint-deep" strokeWidth={4} strokeLinecap="round" style={vis(L > 1 ? 1 : 0)} />
      ))}
      {rungs.map((s) => {
        const c = add(F, dir, s);
        const p = add(c, nr, 8);
        const q = add(c, nr, -8);
        return (
          <line key={s} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} className="stroke-mint-deep" strokeWidth={3} strokeLinecap="round" style={vis(s <= L ? 1 : 0)} />
        );
      })}
      <rect x={420} y={96} width={34} height={284} className="fill-ink/10 stroke-ink" strokeWidth={2} />
      <g style={vis(prog(t, 43.4, 44))}>
        <path d="M240 402V414M420 402V414M240 408H420" className="stroke-ink-soft fill-none" strokeWidth={1.5} />
        <text x={330} y={436} textAnchor="middle" className={`font-math ${TXT.a} text-[24px]`}>
          3 m
        </text>
      </g>
      <g style={vis(prog(t, 44, 44.6))}>
        <path d="M464 140H476M464 380H476M470 140V380" className="stroke-ink-soft fill-none" strokeWidth={1.5} />
        <text x={482} y={268} className={`font-math ${TXT.b} text-[24px]`}>
          4 m
        </text>
        <path d="M408 380V368H420" className="fill-none stroke-ink" strokeWidth={1.5} />
      </g>
      <text x={300} y={240} textAnchor="middle" className={`font-math ${compact ? "text-[26px]" : "text-[30px]"} ${TXT.c}`} style={vis(prog(t, 44.6, 45.2) * (1 - prog(t, 49.4, 49.9)))}>
        ?
      </text>
      <text x={296} y={240} textAnchor="middle" className={`font-math ${TXT.c} text-[26px]`} style={vis(prog(t, 49.6, 50.2))}>
        5 m
      </text>
      <text x={ex} y={ey[0]} textAnchor={ea} className={eq} style={vis(prog(t, 46, 46.6))}>
        <tspan className={TXT.a}>3²</tspan> + <tspan className={TXT.b}>4²</tspan> = <Sq v="c" cls={TXT.c} />
      </text>
      <text x={ex} y={ey[1]} textAnchor={ea} className={eq} style={vis(prog(t, 47.4, 48))}>
        <tspan className={TXT.a}>9</tspan> + <tspan className={TXT.b}>16</tspan> = <tspan className={TXT.c}>25</tspan>
      </text>
      <text x={ex} y={ey[2]} textAnchor={ea} className={eq} style={vis(prog(t, 48.8, 49.4))}>
        <tspan className="italic">c</tspan> = √25 = <tspan className={TXT.c}>5 m</tspan>
      </text>
    </>,
  );

  /* ---------- Escena 6: probalo vos ---------- */
  const o4 = prog(t, 52, 53);
  const a2 = a * a;
  const b2 = b * b;
  const c2 = a2 + b2;
  const c = Math.sqrt(c2);
  const exact = Math.abs(c - Math.round(c * 100) / 100) < 1e-9;
  const u = compact ? Math.min(340 / (2 * a + b), 250 / (a + 2 * b)) : Math.min(400 / (2 * a + b), 380 / (a + 2 * b));
  const sc = (compact ? 340 : 280) / 162;
  const g = prog(t, 54.6, 55.6);
  const bx = compact ? 30 : 490;
  const by = compact ? [412, 460] : [236, 306];
  const s4 = scene(
    o4,
    vb("0 0 800 450", "0 0 400 500"),
    <>
      <Pyth
        a={a}
        b={b}
        u={u}
        x0={compact ? 200 - (b * u) / 2 : 240 - (b * u) / 2}
        y0={compact ? 160 + (a * u) / 2 : 232 + (a * u) / 2}
        draw={prog(t, 52.3, 53.3)}
        fill={prog(t, 52.8, 53.6)}
        labels={prog(t, 53, 53.6)}
        kA={prog(t, 53.2, 54.2)}
        kB={prog(t, 53.6, 54.6)}
        kC={prog(t, 54, 55)}
        areaText={{ a: `a² = ${fmt(a2)}`, b: `b² = ${fmt(b2)}`, c: `c² = ${fmt(c2)}` }}
      />
      {!compact && (
        <text x={490} y={82} className="font-sans font-bold text-[12px] fill-ink-soft" letterSpacing="0.14em">
          PROBALO VOS
        </text>
      )}
      <text x={compact ? 24 : 490} y={compact ? 340 : 132} className={`${MATH} ${compact ? "text-[26px]" : "text-[30px]"}`}>
        <tspan className={TXT.a}>{fmt(a2)}</tspan> + <tspan className={TXT.b}>{fmt(b2)}</tspan> = <tspan className={TXT.c}>{fmt(c2)}</tspan>
      </text>
      <text x={compact ? 24 : 490} y={compact ? 376 : 176} className={`${MATH} ${compact ? "text-[26px]" : "text-[30px]"}`}>
        <tspan className="italic">c</tspan> = √{fmt(c2)} {exact ? "=" : "≈"} <tspan className={TXT.c}>{fmt(c)}</tspan>
      </text>
      <text x={bx} y={by[0] - 10} className="font-sans text-[14px] fill-ink-soft">
        a² + b²
      </text>
      <rect x={bx} y={by[0]} width={a2 * sc * g} height={compact ? 24 : 26} rx={3} className="fill-sky-deep" />
      <rect x={bx + a2 * sc * g} y={by[0]} width={b2 * sc * g} height={compact ? 24 : 26} rx={3} className="fill-sun" />
      <text x={bx} y={by[1] - 10} className="font-sans text-[14px] fill-ink-soft">
        c²
      </text>
      <rect x={bx} y={by[1]} width={c2 * sc * g} height={compact ? 24 : 26} rx={3} className="fill-mint-deep" />
      {!compact && (
        <text x={490} y={372} className="font-sans text-[14px] fill-ink-soft">
          Las dos barras miden siempre lo mismo.
        </text>
      )}
    </>,
  );

  return (
    <>
      {s1}
      {s2}
      {s3}
      {s4}
    </>
  );
}
