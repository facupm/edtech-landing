"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { RotateCcw, Sparkles } from "lucide-react";
import { DEMO_SUBJECTS, HISTORY_EVENTS, type DemoSubject } from "@/lib/content";

type Phase = "input" | "generating" | "output";

export function HeroDemo() {
  const reduce = useReducedMotion();
  const [subjectId, setSubjectId] = useState<DemoSubject["id"]>("mate");
  const [phase, setPhase] = useState<Phase>("input");
  const [chars, setChars] = useState(0);
  const [runKey, setRunKey] = useState(0);

  const subject = DEMO_SUBJECTS.find((s) => s.id === subjectId) ?? DEMO_SUBJECTS[0];
  const fullText = subject.lines.join("\n");
  const total = fullText.length;

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => {
        setChars(total);
        setPhase("output");
      }, 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const typing = setInterval(() => {
      i += 2;
      setChars(Math.min(i, total));
      if (i >= total) {
        clearInterval(typing);
        t1 = setTimeout(() => {
          setPhase("generating");
          t2 = setTimeout(() => setPhase("output"), 1500);
        }, 450);
      }
    }, 26);
    return () => {
      clearInterval(typing);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [subjectId, runKey, reduce, total]);

  const restart = (id: DemoSubject["id"]) => {
    setSubjectId(id);
    setPhase("input");
    setChars(0);
    setRunKey((k) => k + 1);
  };

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky/25 via-sun/30 to-violet/25 blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[0_8px_0_var(--color-ink)]">
        {/* barra de ventana */}
        <div className="flex items-center gap-2 border-b-2 border-ink bg-sun px-4 py-2.5">
          <span className="size-3 rounded-full bg-coral" />
          <span className="size-3 rounded-full bg-paper" />
          <span className="size-3 rounded-full bg-mint" />
          <span className="ml-2 truncate text-xs font-bold text-ink">Demo · así se crea una lección</span>
        </div>

        {/* tabs de materia */}
        <div role="tablist" aria-label="Materia de la demo" className="flex gap-1.5 overflow-x-auto px-3 pt-3">
          {DEMO_SUBJECTS.map((s) => {
            const active = s.id === subjectId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={active}
                onClick={() => restart(s.id)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-bold transition-colors ${
                  active ? "bg-ink text-paper" : "bg-sky-soft text-sky-deep hover:bg-sky/20"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* escenario */}
        <div className="h-[27rem] p-4" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "input" && (
              <m.div
                key="input"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
                  1 · Tu currícula
                </p>
                <div className="h-[calc(100%-1.75rem)] rounded-2xl border-2 border-dashed border-sky bg-sky-soft/60 p-4 font-mono text-[13px] leading-relaxed text-ink">
                  {fullText
                    .slice(0, chars)
                    .split("\n")
                    .map((line, i) => (
                      <p key={i} className="mb-1.5 break-words">
                        {line}
                        {i === fullText.slice(0, chars).split("\n").length - 1 && (
                          <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-blink bg-sky-deep" />
                        )}
                      </p>
                    ))}
                </div>
              </m.div>
            )}

            {phase === "generating" && (
              <m.div
                key="gen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col items-center justify-center gap-5"
              >
                <div className="relative grid size-20 place-items-center rounded-3xl bg-sun shadow-[0_5px_0_var(--color-ink)] border-2 border-ink">
                  <Sparkles className="size-9 animate-spin-slow text-ink" />
                </div>
                <p className="font-display text-lg font-bold">Generando lección interactiva…</p>
                <div className="w-full max-w-xs space-y-2.5">
                  {[100, 82, 64].map((w) => (
                    <div
                      key={w}
                      className="shimmer-line h-3 animate-shimmer rounded-full"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </m.div>
            )}

            {phase === "output" && (
              <m.div
                key={`out-${subjectId}-${runKey}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                    2 · Tu lección, lista para revisar
                  </p>
                  <button
                    onClick={() => restart(subjectId)}
                    className="flex min-h-8 items-center gap-1 rounded-full px-2 text-xs font-bold text-sky-deep hover:bg-sky-soft"
                  >
                    <RotateCcw className="size-3.5" aria-hidden /> Repetir
                  </button>
                </div>
                {subjectId === "mate" && <MathLesson />}
                {subjectId === "ciencias" && <WaterLesson />}
                {subjectId === "historia" && <HistoryLesson />}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------- Matemática: interactiva de verdad ---------- */

function MathLesson() {
  const [d, setD] = useState(2);
  const k = d / 2;
  const solved = d > 2;

  return (
    <div className="flex h-[calc(100%-2rem)] flex-col justify-between rounded-2xl bg-sky-soft/60 p-4">
      <div>
        <p className="font-display text-base font-bold leading-snug">
          Mové el control y encontrá fracciones equivalentes a ½
        </p>

        <div className="mt-3">
          <p className="mb-1 text-xs font-bold text-ink-soft">Referencia</p>
          <Bar parts={2} filled={1} />
        </div>
        <div className="mt-3">
          <p className="mb-1 text-xs font-bold text-ink-soft">Tu barra</p>
          <Bar parts={d} filled={k} />
        </div>

        <p
          className="mt-2 text-center font-display text-3xl font-extrabold tabular-nums"
          aria-label={`${k} sobre ${d}`}
        >
          <span className="text-sky-deep">{k}</span>
          <span className="mx-1 text-ink-soft">/</span>
          <span>{d}</span>
          <span className="mx-2 text-ink-soft">=</span>
          <span className="text-ink-soft">1/2</span>
        </p>
      </div>

      <div>
        <div className="min-h-9 pt-1">
          <AnimatePresence mode="wait" initial={false}>
            {solved ? (
              <m.p
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl bg-mint-soft px-3 py-2 text-center text-sm font-bold text-mint-deep"
              >
                ¡Eso! Son equivalentes ✨
              </m.p>
            ) : (
              <m.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-ink-soft"
              >
                Probá con más partes →
              </m.p>
            )}
          </AnimatePresence>
        </div>
        <input
          type="range"
          min={2}
          max={12}
          step={2}
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          aria-label="Cantidad de partes de la barra"
          aria-valuetext={`${d} partes`}
          className="range-chispa mt-2"
        />
        <div className="mt-1 flex justify-between text-[11px] font-bold text-ink-soft" aria-hidden>
          <span>2 partes</span>
          <span>12 partes</span>
        </div>
      </div>
    </div>
  );
}

function Bar({ parts, filled }: { parts: number; filled: number }) {
  return (
    <div className="flex h-9 gap-1 rounded-xl border-2 border-ink bg-paper p-1" aria-hidden>
      {Array.from({ length: parts }, (_, i) => (
        <div
          key={i}
          className={`flex-1 rounded-md transition-colors duration-200 ${
            i < filled ? "bg-sky" : "bg-sky-soft"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- Ciencias: animación con un toque interactivo ---------- */

function WaterLesson() {
  const [hot, setHot] = useState(false);
  const speed = hot ? "1.2s" : "2.6s";

  return (
    <div className="flex h-[calc(100%-2rem)] flex-col justify-between rounded-2xl bg-sky-soft/60 p-4">
      <p className="font-display text-base font-bold leading-snug">
        {hot ? "Más calor, más evaporación 🔥" : "El agua del mar sube, se enfría y vuelve a caer"}
      </p>
      <svg viewBox="0 0 300 170" className="my-2 w-full" role="img" aria-label="Ciclo del agua: evaporación, condensación y precipitación">
        <circle cx="46" cy="40" r={hot ? 24 : 18} fill="#FFC83D" stroke="#14141A" strokeWidth="3" className="transition-all" />
        <g className="animate-float">
          <ellipse cx="220" cy="42" rx="52" ry="22" fill="#fff" stroke="#14141A" strokeWidth="3" />
          <ellipse cx="190" cy="52" rx="30" ry="16" fill="#fff" stroke="#14141A" strokeWidth="3" />
          <ellipse cx="220" cy="46" rx="50" ry="20" fill="#fff" />
        </g>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={200 + i * 22}
            cy="76"
            r="3.5"
            fill="#2E9BFF"
            className="animate-fall"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${70 + i * 28} 146 q6 -8 0 -16 q-6 -8 0 -16`}
            fill="none"
            stroke="#FF6B5B"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-rise"
            style={{ animationDelay: `${i * 0.5}s`, animationDuration: speed }}
          />
        ))}
        <path d="M0 140 q18 -10 37 0 t37 0 t37 0 t37 0 t37 0 t37 0 t37 0 t37 0 V170 H0 Z" fill="#2E9BFF" stroke="#14141A" strokeWidth="3" />
      </svg>
      <div>
        <div className="mb-3 flex gap-1.5 text-[11px] font-bold">
          <span className="rounded-full bg-coral-soft px-2.5 py-1 text-coral-deep">Evaporación</span>
          <span className="rounded-full bg-violet-soft px-2.5 py-1 text-violet-deep">Condensación</span>
          <span className="rounded-full bg-sky-soft px-2.5 py-1 text-sky-deep">Precipitación</span>
        </div>
        <button
          onClick={() => setHot((h) => !h)}
          aria-pressed={hot}
          className="min-h-11 w-full rounded-xl border-2 border-ink bg-sun px-4 text-sm font-bold shadow-[0_3px_0_var(--color-ink)] active:translate-y-0.5 active:shadow-none"
        >
          {hot ? "Bajar el sol" : "☀️ Subir el sol"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Historia: línea de tiempo tocable ---------- */

function HistoryLesson() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (touched || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % HISTORY_EVENTS.length), 2600);
    return () => clearInterval(t);
  }, [touched, reduce]);

  const ev = HISTORY_EVENTS[active];

  return (
    <div className="flex h-[calc(100%-2rem)] flex-col justify-between rounded-2xl bg-sun-soft/70 p-4">
      <p className="font-display text-base font-bold leading-snug">
        Tocá cada hito y armá la historia en orden
      </p>

      <div className="relative my-4">
        <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-ink/15" aria-hidden />
        <div
          className="absolute left-0 top-5 h-1 rounded-full bg-ink transition-all duration-500"
          style={{ width: `${(active / (HISTORY_EVENTS.length - 1)) * 100}%` }}
          aria-hidden
        />
        <ol className="relative flex justify-between">
          {HISTORY_EVENTS.map((e, i) => (
            <li key={e.title}>
              <button
                onClick={() => {
                  setTouched(true);
                  setActive(i);
                }}
                aria-label={`${e.year}: ${e.title}`}
                aria-current={i === active}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={`grid size-11 place-items-center rounded-full border-2 border-ink text-xs font-extrabold transition-all ${
                    i <= active ? "bg-sun shadow-[0_3px_0_var(--color-ink)]" : "bg-paper"
                  } ${i === active ? "scale-110" : ""}`}
                >
                  {i + 1}
                </span>
                <span className="text-[11px] font-bold text-ink-soft">{e.year}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <m.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border-2 border-ink bg-paper p-3"
      >
        <p className="font-display text-base font-extrabold">{ev.title}</p>
        <p className="mt-1 text-sm text-ink-soft">{ev.text}</p>
      </m.div>
    </div>
  );
}
