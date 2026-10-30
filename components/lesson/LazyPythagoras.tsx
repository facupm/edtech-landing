"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

function Placeholder() {
  return (
    <div className="grid aspect-[4/5] place-items-center rounded-3xl border border-line bg-paper text-sm text-ink-soft shadow-card sm:aspect-video">
      Cargando la lección…
    </div>
  );
}

// El código del reproductor se baja recién cuando la sección está cerca de la pantalla.
const Player = dynamic(() => import("./PythagorasPlayer"), { ssr: false, loading: Placeholder });

export function LazyPythagoras() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{near ? <Player /> : <Placeholder />}</div>;
}
