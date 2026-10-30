import { SITE } from "@/lib/config";

// Marca: pizarra oscura con una tiza amarilla que acaba de dibujar un trazo.
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="60" height="60" rx="17" fill="#14141A" />
      {/* trazo de tiza */}
      <path
        d="M13 50 Q 22 56 31 51 T 52 52"
        fill="none"
        stroke="#FFFBF5"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* tiza */}
      <g transform="rotate(42 32 30)">
        <rect x="25" y="6" width="14" height="38" rx="5" fill="#FFC83D" />
        <rect x="25" y="34" width="14" height="10" rx="5" fill="#FFE08A" />
        <rect x="29" y="11" width="3" height="20" rx="1.5" fill="#fff" opacity="0.55" />
      </g>
      {/* polvo de tiza */}
      <circle cx="49" cy="17" r="2.6" fill="#2E9BFF" />
      <circle cx="54" cy="26" r="1.8" fill="#FFFBF5" />
      <circle cx="44" cy="10" r="1.6" fill="#FFFBF5" />
    </svg>
  );
}

export function Logo({ size = "md", dark = false }: { size?: "md" | "lg"; dark?: boolean }) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center ${lg ? "gap-3.5" : "gap-2.5"}`}>
      <LogoMark size={lg ? 64 : 36} />
      <span
        className={`relative font-display font-extrabold leading-none tracking-[-0.045em] ${
          lg ? "text-6xl" : "text-[1.65rem]"
        } ${dark ? "text-paper" : "text-ink"}`}
      >
        {SITE.name}
        <svg
          aria-hidden
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className={`absolute left-0 w-full text-sun ${lg ? "-bottom-2 h-2.5" : "-bottom-1 h-1.5"}`}
        >
          <path d="M2 5 Q 25 1 50 4 T 98 3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
