import { Check } from "lucide-react";
import { AUDIENCE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TONE_SOFT } from "@/components/ui/tones";

export function Audience() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={AUDIENCE.eyebrow} title={AUDIENCE.title} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {AUDIENCE.items.map((a, i) => (
            <Reveal key={a.who} delay={i * 0.08}>
              <article className="h-full rounded-3xl border border-line bg-cream p-6 shadow-card">
                <span className={`grid size-12 place-items-center rounded-2xl ${TONE_SOFT[a.tone]}`}>
                  <a.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold">{a.who}</h3>
                <ul className="mt-4 space-y-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2.5 leading-snug text-ink-soft">
                      <Check className="mt-0.5 size-5 shrink-0 text-mint-deep" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
