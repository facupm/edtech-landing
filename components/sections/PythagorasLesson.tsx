import { PYTHAGORAS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyPythagoras } from "@/components/lesson/LazyPythagoras";
import { TONE_SOFT } from "@/components/ui/tones";

export function PythagorasLesson() {
  return (
    <section id="aprende-viendo" className="bg-sky-soft/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={PYTHAGORAS.eyebrow} title={PYTHAGORAS.title} sub={PYTHAGORAS.sub} />

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <LazyPythagoras />
        </Reveal>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {PYTHAGORAS.points.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line bg-paper p-4">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${TONE_SOFT[p.tone]}`}>
                {p.title}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
