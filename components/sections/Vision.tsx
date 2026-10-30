import { VISION } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Vision() {
  return (
    <section className="bg-sun-soft py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="mb-5 inline-block rounded-full bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun-deep">
            {VISION.eyebrow}
          </p>
          <blockquote className="font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
            “{VISION.quote}”
          </blockquote>
        </Reveal>

        <ol className="mt-12 grid gap-3 text-left sm:grid-cols-3">
          {VISION.roadmap.map((r, i) => (
            <li key={r.step}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-3xl border-2 border-ink bg-paper p-5 shadow-[0_4px_0_var(--color-ink)]">
                  <p className="font-display text-sm font-extrabold uppercase tracking-wider text-sky-deep">
                    {r.step}
                  </p>
                  <p className="mt-2 leading-snug">{r.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
