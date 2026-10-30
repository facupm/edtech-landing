import { ExternalLink } from "lucide-react";
import { TEAM } from "@/lib/config";
import { TEAM_COPY } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const AVATAR: Record<string, string> = {
  sky: "bg-sky text-ink",
  sun: "bg-sun text-ink",
};

export function Team() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow={TEAM_COPY.eyebrow} title={TEAM_COPY.title} center />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="flex h-full flex-col items-center rounded-3xl border border-line bg-paper p-6 text-center shadow-card">
                <div
                  aria-hidden
                  className={`grid size-24 place-items-center rounded-full border-2 border-ink font-display text-3xl font-extrabold shadow-[0_4px_0_var(--color-ink)] ${AVATAR[p.tone]}`}
                >
                  {p.initials}
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold">{p.name}</h3>
                <p className="text-sm font-bold text-sky-deep">{p.role}</p>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.bio}</p>
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${p.name}`}
                    className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-sky-soft px-4 text-sm font-bold text-sky-deep hover:bg-sky/20"
                  >
                    <ExternalLink className="size-4" aria-hidden /> LinkedIn
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
