// Mini previews animados en SVG/CSS. Decorativos: el texto de la tarjeta ya describe la lección.
const INK = "#14141A";

function Pizza() {
  const slices = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      <g transform="translate(60 46)">
       <g className="animate-float">
        <circle r="34" fill="#FFF1C7" stroke={INK} strokeWidth="3" />
        {slices.map((i) => (
          <path
            key={i}
            d="M0 0 L0 -34 A34 34 0 0 1 34 0 Z"
            transform={`rotate(${i * 90})`}
            fill={i < 3 ? "#FF6B5B" : "#fff"}
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="12" cy="-14" r="3.5" fill="#FFC83D" />
        <circle cx="16" cy="12" r="3.5" fill="#FFC83D" />
        <circle cx="-14" cy="14" r="3.5" fill="#FFC83D" />
       </g>
      </g>
    </svg>
  );
}

function Water() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      <circle cx="22" cy="20" r="11" fill="#FFC83D" stroke={INK} strokeWidth="3" />
      <g className="animate-float">
        <ellipse cx="86" cy="24" rx="24" ry="11" fill="#fff" stroke={INK} strokeWidth="3" />
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={78 + i * 10} cy="40" r="2.8" fill="#2E9BFF" className="animate-fall" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
      <path d="M0 72 q10 -7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V90 H0 Z" fill="#2E9BFF" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

function Timeline() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      <path d="M12 46 H108" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {[18, 46, 74, 102].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="46" r="9" fill={i === 1 ? "#FFC83D" : "#fff"} stroke={INK} strokeWidth="3" className={i === 1 ? "animate-float" : ""} />
          <rect x={x - 8} y={i % 2 ? 62 : 22} width="16" height="8" rx="3" fill="#ECE7FF" stroke={INK} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

function Line() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      <path d="M14 12 V76 H108" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {[34, 54, 74, 94].map((x) => (
        <path key={x} d={`M${x} 76 V12`} stroke="#ECE7FF" strokeWidth="2" />
      ))}
      <g style={{ transformOrigin: "14px 76px" }} className="animate-[tilt_3.2s_ease-in-out_infinite]">
        <path d="M14 76 L106 24" stroke="#7C5CFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="106" cy="24" r="7" fill="#FFC83D" stroke={INK} strokeWidth="3" />
      </g>
      <style>{`@keyframes tilt{0%,100%{transform:rotate(14deg)}50%{transform:rotate(-8deg)}}`}</style>
    </svg>
  );
}

function Algorithm() {
  const blocks = [
    { y: 10, c: "#19B28A", w: 70 },
    { y: 36, c: "#FFC83D", w: 84 },
    { y: 62, c: "#2E9BFF", w: 58 },
  ];
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      {blocks.map((b, i) => (
        <rect
          key={b.y}
          x="14"
          y={b.y}
          width={b.w}
          height="20"
          rx="7"
          fill={b.c}
          stroke={INK}
          strokeWidth="3"
          className="animate-float"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <path d="M96 20 l8 8 l-8 8" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function English() {
  const words = [
    { t: "I", x: 6, y: 14, c: "#FFE5E1" },
    { t: "love", x: 34, y: 14, c: "#E3F2FF" },
    { t: "mate", x: 76, y: 14, c: "#DCF6EE" },
  ];
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full">
      {words.map((w, i) => (
        <g key={w.t} className="animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
          <rect x={w.x} y={w.y} width={w.t.length * 9 + 14} height="20" rx="8" fill={w.c} stroke={INK} strokeWidth="3" />
          <text x={w.x + (w.t.length * 9 + 14) / 2} y={w.y + 14} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK}>
            {w.t}
          </text>
        </g>
      ))}
      <rect x="10" y="56" width="100" height="22" rx="8" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="5 5" />
    </svg>
  );
}

const PREVIEWS: Record<string, () => React.JSX.Element> = {
  fracciones: Pizza,
  agua: Water,
  historia: Timeline,
  funciones: Line,
  algoritmo: Algorithm,
  ingles: English,
};

export function LessonPreview({ id }: { id: string }) {
  const Cmp = PREVIEWS[id];
  return (
    <div aria-hidden className="h-28 w-full">
      {Cmp && <Cmp />}
    </div>
  );
}
