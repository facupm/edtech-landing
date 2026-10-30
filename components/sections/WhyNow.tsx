import { WHY_NOW } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function WhyNow() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-ink px-5 py-12 text-paper sm:px-10 sm:py-16">
          <Reveal className="max-w-2xl">
            <p className="mb-3 inline-block rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              {WHY_NOW.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
              {WHY_NOW.title}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {WHY_NOW.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.07}>
                <article className="h-full rounded-3xl border border-paper/15 bg-paper/5 p-6">
                  <span className="rounded-full bg-sky px-3 py-1 text-xs font-extrabold text-ink">{it.tag}</span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug">{it.title}</h3>
                  {/* TODO: verificar dato */}
                  <p className="mt-2 leading-relaxed text-paper/75">{it.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-2xl text-lg text-paper/80">{WHY_NOW.footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
