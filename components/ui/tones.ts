import type { Tone } from "@/lib/content";

// Clases completas para que Tailwind las detecte en build.
export const TONE_SOFT: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky-deep",
  sun: "bg-sun-soft text-sun-deep",
  violet: "bg-violet-soft text-violet-deep",
  mint: "bg-mint-soft text-mint-deep",
  coral: "bg-coral-soft text-coral-deep",
};

export const TONE_BG: Record<Tone, string> = {
  sky: "bg-sky-soft",
  sun: "bg-sun-soft",
  violet: "bg-violet-soft",
  mint: "bg-mint-soft",
  coral: "bg-coral-soft",
};
