# Tiza · landing

Landing de presentación de la idea (Next.js App Router + Tailwind v4 + Motion), export estático.

## Editar textos y datos

- `lib/config.ts`: nombre, tagline, URL de producción, email, WhatsApp, LinkedIn y equipo.
  Dejá `phone` o `linkedin` vacíos para ocultar esos botones.
- `lib/content.ts`: todo el copy de las secciones.
- `/qr`: QR grande con la URL de `SITE.url`. Actualizala cuando tengas la URL final.

## Desarrollo

```bash
npm install
npm run dev
npm run build   # genera la carpeta out/ (export estático)
```

## Deploy en Vercel

1. Subí el repo a GitHub.
2. Entrá a https://vercel.com/new, importá el repo y dale Deploy (se detecta Next.js solo).
3. Copiá la URL final a `SITE.url` en `lib/config.ts` y volvé a desplegar (afecta Open Graph y `/qr`).

Alternativa por CLI: `npx vercel --prod`.
