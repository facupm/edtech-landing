"use client";

import { useState } from "react";
import { ExternalLink, Mail, MessageCircle, Send } from "lucide-react";
import { CONTACT, SITE, mailto, whatsappUrl } from "@/lib/config";
import { CONTACT_COPY } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const field =
  "min-h-12 w-full rounded-xl border-2 border-line bg-paper px-4 text-base text-ink placeholder:text-ink-soft/60 focus:border-sky-deep focus:outline-none";

export function Contact() {
  const [f, setF] = useState({ nombre: "", institucion: "", rol: "", email: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hola, soy ${f.nombre} (${f.rol}) de ${f.institucion}.\nMe interesa conversar sobre ${SITE.name}.\n\nMi mail: ${f.email}`;
    window.location.href = mailto(`Quiero conversar sobre ${SITE.name}`, body);
  };

  return (
    <section id="contacto" className="px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-sky-deep px-5 py-12 text-white sm:px-12 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
            {CONTACT_COPY.title}
          </h2>
          <p className="mt-4 text-lg text-white/90">{CONTACT_COPY.sub}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={mailto(`Quiero conversar sobre ${SITE.name}`)}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-sun px-6 text-base font-bold text-ink shadow-[0_5px_0_var(--color-ink)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            >
              <Mail className="size-5" aria-hidden /> Escribinos
            </a>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-bold text-ink shadow-[0_5px_0_var(--color-ink)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
              >
                <MessageCircle className="size-5" aria-hidden /> WhatsApp
              </a>
            )}
            {CONTACT.linkedin && (
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-white px-6 text-base font-bold transition-colors hover:bg-white/10"
              >
                <ExternalLink className="size-5" aria-hidden /> LinkedIn
              </a>
            )}
          </div>
          <p className="mt-6 text-sm text-white/80">{CONTACT_COPY.notice}</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-xl">
          <form onSubmit={submit} className="rounded-3xl bg-cream p-5 text-ink sm:p-7">
            <h3 className="font-display text-xl font-extrabold">{CONTACT_COPY.formTitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-bold">
                Nombre
                <input required autoComplete="name" value={f.nombre} onChange={set("nombre")} className={`${field} mt-1 font-normal`} />
              </label>
              <label className="text-sm font-bold">
                Institución
                <input required autoComplete="organization" value={f.institucion} onChange={set("institucion")} className={`${field} mt-1 font-normal`} />
              </label>
              <label className="text-sm font-bold">
                Rol
                <input required autoComplete="organization-title" placeholder="Docente, director/a…" value={f.rol} onChange={set("rol")} className={`${field} mt-1 font-normal`} />
              </label>
              <label className="text-sm font-bold">
                Email
                <input required type="email" autoComplete="email" inputMode="email" value={f.email} onChange={set("email")} className={`${field} mt-1 font-normal`} />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-base font-bold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <Send className="size-4" aria-hidden /> {CONTACT_COPY.formCta}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
