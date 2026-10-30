"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { CAPS, CHAPTERS, DUR, TRY_AT } from "./lesson-data";
import { PythagorasScene, STAGE } from "./PythagorasScene";

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const fmt = (x: number) => String(x).replace(".", ",");

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const capIndex = (t: number) => CAPS.reduce((acc, c, i) => (c.at <= t ? i : acc), 0);
const chapterIndex = (t: number) => CHAPTERS.reduce((acc, c, i) => (c.at <= t ? i : acc), 0);

const GRID = 25;

export default function PythagorasPlayer() {
  const compact = useMedia("(max-width: 639px)");
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const rootRef = useRef<HTMLElement>(null);
  const tRef = useRef(0);
  const dragging = useRef(false);
  const [t, setT] = useState(0);
  // Intención del usuario; sin movimiento reducido arranca sola (en silencio, no hay audio).
  const [intent, setIntent] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [inView, setInView] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);

  const running = intent && inView;

  // El loop solo existe mientras la sección está en pantalla y reproduciendo.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      if (last !== null && !dragging.current) {
        tRef.current = Math.min(DUR, tRef.current + Math.min(0.1, (now - last) / 1000));
      }
      last = now;
      setT(tRef.current);
      if (tRef.current >= DUR) {
        setIntent(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const ci = capIndex(t);

  // Narración opcional con la voz del navegador.
  useEffect(() => {
    if (!canSpeak || !voiceOn || !running) return;
    const u = new SpeechSynthesisUtterance(CAPS[ci].say);
    const voices = window.speechSynthesis.getVoices();
    const v =
      voices.find((x) => /^es[-_](uy|ar)/i.test(x.lang)) ?? voices.find((x) => /^es/i.test(x.lang));
    u.lang = v?.lang ?? "es-ES";
    if (v) u.voice = v;
    u.rate = 1.03;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return () => window.speechSynthesis.cancel();
  }, [canSpeak, voiceOn, running, ci]);

  const seek = useCallback((nt: number) => {
    tRef.current = clamp(nt, 0, DUR);
    setT(tRef.current);
  }, []);

  const toggle = useCallback(() => {
    if (intent) {
      setIntent(false);
      return;
    }
    if (tRef.current >= DUR) seek(0);
    setIntent(true);
  }, [intent, seek]);

  const goTo = (at: number) => {
    seek(at);
    setIntent(true);
  };

  const onSlide = (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(+e.target.value);
    if (tRef.current < DUR) {
      seek(DUR);
      setIntent(false);
    }
  };

  const tFromX = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return clamp((e.clientX - r.left) / r.width) * DUR;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const el = e.target as HTMLElement;
    if (el.tagName === "INPUT") return;
    const isBtn = el.tagName === "BUTTON";
    if (e.key === "ArrowRight") seek(tRef.current + 3);
    else if (e.key === "ArrowLeft") seek(tRef.current - 3);
    else if ((e.key === " " || e.key === "Enter") && !isBtn) toggle();
    else return;
    e.preventDefault();
  };

  const stage = compact ? STAGE.compact : STAGE.wide;
  const ended = t >= DUR;
  const PlayIcon = intent ? Pause : ended ? RotateCcw : Play;
  const playLabel = intent ? "Pausar" : ended ? "Volver a ver" : "Reproducir";
  const pct = `${(t / DUR) * 100}%`;
  const tryOpen = t >= TRY_AT;
  const ch = chapterIndex(t);

  return (
    <section
      ref={rootRef}
      aria-label="Lección animada: Pitágoras en 60 segundos"
      onKeyDown={onKeyDown}
      className="overflow-hidden rounded-3xl border border-line bg-paper shadow-pop"
    >
      <div
        className={`relative cursor-pointer bg-cream ${compact ? "aspect-[4/5]" : "aspect-video"}`}
        onClick={toggle}
      >
        <svg
          viewBox={`0 0 ${stage.w} ${stage.h}`}
          role="img"
          aria-label="Animación que demuestra el teorema de Pitágoras con cuadrados de colores sobre los lados de un triángulo rectángulo"
          className="block size-full"
        >
          <defs>
            <pattern id="pyth-grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
              <path d={`M${GRID} 0H0V${GRID}`} className="fill-none stroke-line" strokeWidth={1} opacity={0.6} />
            </pattern>
          </defs>
          <rect width={stage.w} height={stage.h} fill="url(#pyth-grid)" />
          <PythagorasScene t={t} a={a} b={b} compact={compact} />
        </svg>
        {!intent && t < TRY_AT && (
          <button
            type="button"
            aria-label={playLabel}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="absolute inset-0 m-auto grid size-20 place-items-center rounded-full border-2 border-ink bg-sun text-ink shadow-card transition-transform hover:scale-105"
          >
            <PlayIcon className={`size-9 ${ended ? "" : "translate-x-0.5 fill-current"}`} aria-hidden />
          </button>
        )}
      </div>

      <p aria-live="polite" className="min-h-[6.5rem] border-t border-line px-5 pt-4 text-base leading-relaxed text-pretty sm:min-h-[4.75rem] sm:text-lg">
        {CAPS[ci].text}
      </p>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${tryOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!tryOpen}>
          <div className="grid gap-5 px-5 pb-3 pt-4 sm:grid-cols-2 sm:gap-8">
            {(
              [
                ["a", a, setA, "text-sky-deep"],
                ["b", b, setB, "text-sun-deep"],
              ] as const
            ).map(([name, val, setter, color]) => (
              <label key={name} className="flex items-center gap-3 font-math text-xl italic">
                <span className={`w-4 font-bold ${color}`}>{name}</span>
                <input
                  type="range"
                  min={1}
                  max={9}
                  step={0.5}
                  value={val}
                  onChange={onSlide(setter)}
                  aria-label={`Cateto ${name}`}
                  className="range-chispa min-w-0 flex-1"
                />
                <output className="w-10 text-right font-sans text-base not-italic tabular-nums">{fmt(val)}</output>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 pb-2 pt-3 sm:flex-nowrap sm:gap-x-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playLabel}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper"
        >
          <PlayIcon className={`size-5 ${ended && !intent ? "" : "fill-current"}`} aria-hidden />
        </button>
        <span className="min-w-[5.5rem] text-sm tabular-nums text-ink-soft">
          {mmss(t)} / {mmss(DUR)}
        </span>
        {canSpeak && (
          <button
            type="button"
            aria-pressed={voiceOn}
            onClick={() => setVoiceOn((v) => !v)}
            title="Lee los subtítulos en voz alta con la voz del navegador"
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper sm:order-last sm:ml-0"
          >
            <Volume2 className="size-4" aria-hidden /> Narración
          </button>
        )}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Línea de tiempo de la lección"
          aria-valuemin={0}
          aria-valuemax={DUR}
          aria-valuenow={Math.round(t)}
          aria-valuetext={`${mmss(t)} de ${mmss(DUR)}, ${CHAPTERS[ch].name}`}
          className="relative order-last h-9 w-full min-w-0 cursor-pointer touch-none rounded-md sm:order-none sm:w-auto sm:flex-1"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(tFromX(e));
          }}
          onPointerMove={(e) => dragging.current && seek(tFromX(e))}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="absolute inset-x-0 top-4 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-ink" style={{ width: pct }} />
          </div>
          {CHAPTERS.slice(1).map((c) => (
            <span
              key={c.at}
              aria-hidden
              className="absolute top-3 h-3.5 w-0.5 rounded bg-ink-soft/60"
              style={{ left: `${(c.at / DUR) * 100}%` }}
            />
          ))}
          <span
            aria-hidden
            className="absolute top-2.5 size-4 -translate-x-1/2 rounded-full border-2 border-paper bg-ink shadow"
            style={{ left: pct }}
          />
        </div>
      </div>

      <nav aria-label="Capítulos" className="flex gap-2 overflow-x-auto px-4 pb-4 pt-1">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.at}
            type="button"
            onClick={() => goTo(c.at)}
            aria-current={i === ch ? "step" : undefined}
            className="grid shrink-0 gap-0.5 rounded-xl border border-line px-3 py-2 text-left text-sm leading-tight text-ink-soft aria-[current=step]:border-ink aria-[current=step]:bg-sun-soft aria-[current=step]:text-ink"
          >
            <span className="font-semibold">{c.name}</span>
            <span className="text-xs tabular-nums opacity-70">{mmss(c.at)}</span>
          </button>
        ))}
      </nav>
    </section>
  );
}
