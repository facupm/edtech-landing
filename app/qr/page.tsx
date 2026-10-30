import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { Logo } from "@/components/ui/Logo";
import { QrCard } from "./QrCard";

export const metadata: Metadata = {
  title: `QR · ${SITE.name}`,
  robots: { index: false },
};

export default function QrPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-4 py-10">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center"><Logo size="lg" /></div>
        <p className="mx-auto mt-3 max-w-sm text-lg text-ink-soft text-balance">{SITE.tagline}</p>
        <div className="mt-8 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-[0_8px_0_var(--color-ink)]">
          <QrCard url={SITE.url} />
        </div>
        <p className="mt-6 text-lg font-bold">Escaneá y conocé la idea</p>
        <p className="mt-1 break-all text-sm text-ink-soft">{SITE.url.replace(/^https?:\/\//, "")}</p>
      </div>
    </main>
  );
}
