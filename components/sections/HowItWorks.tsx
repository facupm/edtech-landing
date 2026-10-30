import { Check, Pencil, Sparkles } from "lucide-react";
import { STEPS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEP_TONES = ["bg-sky-soft", "bg-sun-soft", "bg-violet-soft", "bg-mint-soft"];

function Mockup({ n }: { n: number }) {
  if (n === 1)
    return (
      <div className="space-y-2" aria-hidden>
        <div className="h-3 w-2/3 rounded-full bg-sky" />
        <div className="h-2.5 w-full rounded-full bg-ink/15" />
        <div className="h-2.5 w-5/6 rounded-full bg-ink/15" />
        <div className="flex gap-1.5 pt-1">
          <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-bold">Proyectos</span>
          <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-bold">5.º año</span>
        </div>
      </div>
    );
  if (n === 2)
    return (
      <div className="flex items-center gap-3" aria-hidden>
        <span className="grid size-12 place-items-center rounded-2xl border-2 border-ink bg-sun">
          <Sparkles className="size-6 animate-spin-slow" />
        </span>
        <div className="flex-1 space-y-2">
          <div className="shimmer-line h-3 animate-shimmer rounded-full" />
          <div className="shimmer-line h-3 w-3/4 animate-shimmer rounded-full" />
        </div>
      </div>
    );
  if (n === 3)
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <span className="flex flex-1 items-center justify-center gap-1 rounded-xl border-2 border-ink bg-paper py-2 text-xs font-bold">
          <Pencil className="size-3.5" /> Ajustar
        </span>
        <span className="flex flex-1 items-center justify-center gap-1 rounded-xl border-2 border-ink bg-mint py-2 text-xs font-bold text-ink">
          <Check className="size-3.5" /> Aprobar
        </span>
      </div>
    );
  return (
    <div className="flex h-16 items-end gap-2" aria-hidden>
      {[45, 70, 55, 90].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-lg border-2 border-ink bg-mint" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={STEPS.eyebrow} title={STEPS.title} />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.items.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-cream p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-sun">
                      {s.n}
                    </span>
                  </div>
                  <div className={`mt-4 rounded-2xl p-4 ${STEP_TONES[i]}`}>
                    <Mockup n={s.n} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
