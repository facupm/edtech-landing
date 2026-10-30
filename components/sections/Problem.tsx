import { PROBLEM } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TONE_SOFT } from "@/components/ui/tones";

export function Problem() {
  return (
    <section id="problema" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} sub={PROBLEM.sub} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROBLEM.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <article className="h-full rounded-3xl border border-line bg-cream p-6 shadow-card transition-transform hover:-translate-y-1">
                <span className={`grid size-12 place-items-center rounded-2xl ${TONE_SOFT[c.tone]}`}>
                  <c.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
