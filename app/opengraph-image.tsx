import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const dynamic = "force-static";
export const alt = `${SITE.name} · ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FFFBF5",
          color: "#14141A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#FFC83D",
              border: "5px solid #14141A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            ✏
          </div>
          <div style={{ fontSize: 64, fontWeight: 800 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {SITE.tagline}
          </div>
          <div style={{ fontSize: 32, color: "#4A4A57" }}>
            Lecciones interactivas en español, hechas con la currícula de tu institución.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[
            ["Hecho en Uruguay", "#2E9BFF"],
            ["En español", "#FFC83D"],
            ["Cualquier materia", "#7C5CFF"],
          ].map(([t, c]) => (
            <div
              key={t}
              style={{
                padding: "12px 26px",
                borderRadius: 999,
                background: c,
                fontSize: 28,
                fontWeight: 700,
                color: c === "#7C5CFF" ? "#fff" : "#14141A",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
