import { LESSONS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LessonPreview } from "@/components/ui/LessonPreview";
import { TONE_BG } from "@/components/ui/tones";

export function Lessons() {
  return (
    <section id="lecciones" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={LESSONS.eyebrow} title={LESSONS.title} sub={LESSONS.sub} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.items.map((l, i) => (
            <li key={l.id}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-card transition-transform hover:-translate-y-1">
                  <div className={`px-4 pt-4 ${TONE_BG[l.tone]}`}>
                    <LessonPreview id={l.id} />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                      <span className="rounded-full bg-ink px-2.5 py-1 text-paper">{l.subject}</span>
                      <span className="rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft">{l.age}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug">{l.title}</h3>
                    <p className="mt-auto pt-3 text-sm text-ink-soft">
                      Competencia: <span className="font-semibold text-ink">{l.skill}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
