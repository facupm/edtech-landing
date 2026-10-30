import { Check } from "lucide-react";
import { COMPARE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Compare() {
  return (
    <section id="solucion" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow={COMPARE.eyebrow} title={COMPARE.title} center />

        <Reveal className="mt-12">
          <div className="grid grid-cols-2 gap-2 px-1 text-center font-display text-sm font-bold sm:gap-4 sm:text-base">
            <p className="rounded-2xl bg-ink/5 px-2 py-3 text-ink-soft">{COMPARE.left}</p>
            <p className="rounded-2xl bg-sky-deep px-2 py-3 text-white shadow-[0_4px_0_#0b3d7a]">
              {COMPARE.right}
            </p>
          </div>

          <ul className="mt-4 space-y-3">
            {COMPARE.rows.map((r) => (
              <li key={r.label} className="rounded-3xl border border-line bg-paper p-3 shadow-card sm:p-4">
                <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-ink-soft">
                  {r.label}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <p className="flex items-center justify-center rounded-2xl bg-ink/5 px-2 py-3 text-center text-sm text-ink-soft sm:text-base">
                    {r.left}
                  </p>
                  <p className="flex items-center justify-center gap-1.5 rounded-2xl bg-sky-soft px-2 py-3 text-center text-sm font-bold text-sky-deep sm:text-base">
                    <Check className="hidden size-4 shrink-0 sm:block" aria-hidden />
                    {r.right}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
