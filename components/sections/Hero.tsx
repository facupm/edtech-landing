import { ArrowRight, PlayCircle } from "lucide-react";
import { HERO } from "@/lib/content";
import { HeroDemo } from "./HeroDemo";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-sky/15 blur-3xl" />
        <div className="absolute -right-16 top-64 size-72 rounded-full bg-sun/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="animate-enter">
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-balance sm:text-6xl">
            {HERO.titleStart}{" "}
            <span className="relative inline-block text-sky-deep">
              {HERO.titleHighlight}
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-sun"
              >
                <path d="M2 8 Q 75 0 150 6 T 298 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
            {HERO.sub}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-sky-deep px-6 text-base font-bold text-white shadow-[0_5px_0_#0b3d7a] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            >
              {HERO.ctaPrimary}
              <ArrowRight className="size-5" aria-hidden />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-paper px-6 text-base font-bold shadow-[0_5px_0_var(--color-ink)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            >
              <PlayCircle className="size-5" aria-hidden />
              {HERO.ctaSecondary}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {HERO.chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-semibold"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-enter [animation-delay:150ms]">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
