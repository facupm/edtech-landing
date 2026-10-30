import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 inline-block rounded-full bg-sun-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun-deep">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg text-ink-soft text-pretty">{sub}</p>}
    </Reveal>
  );
}
