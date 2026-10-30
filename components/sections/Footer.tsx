import { CONTACT, SITE, whatsappUrl } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  const link = "font-semibold underline-offset-4 hover:underline";
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center text-sm text-ink-soft sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div>
          <p className="font-display text-lg font-extrabold text-ink">{SITE.name}</p>
          <p>Hecho con 🧉 en Montevideo · {year}</p>
        </div>
        <ul className="flex flex-wrap justify-center gap-5">
          <li>
            <a className={link} href={`mailto:${CONTACT.email}`}>Email</a>
          </li>
          {whatsappUrl && (
            <li>
              <a className={link} href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </li>
          )}
          {CONTACT.linkedin && (
            <li>
              <a className={link} href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
