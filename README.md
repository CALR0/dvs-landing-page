# Daily VA Services — Landing page

Rediseño del sitio de [Daily VA Services Inc.](https://dailyvaservices.com/), un contact center de Estados Unidos que atiende a consumidores residenciales por teléfono (atención, seguimiento y servicios de energía residencial).

Concepto visual: *"Energy that connects"* — cielo, luz solar y conexión humana, con una estética editorial y animaciones suaves ligadas al scroll.

> Todo el contenido proviene del sitio original (home, Privacy Policy y Messaging Terms). No se inventan datos, clientes, cifras ni testimonios.

## Tecnologías

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de diseño en `app/globals.css`)
- **Framer Motion** — animaciones y efectos de scroll
- **next/image** — imágenes optimizadas (AVIF/WebP)
- **next/font** — Geist, Geist Mono e Instrument Serif
- **Lucide** — iconos

## Estructura

```
app/
  page.tsx            Landing (orden de secciones)
  layout.tsx          Fuentes y metadatos
  globals.css         Tokens de color, tipografía y animaciones
  icon.svg, apple-icon.png   Iconos de la marca (pestaña y móvil)
  privacy/            Privacy Policy
  sms-terms/          Messaging Terms
components/
  landing/            Secciones: header, hero, about, conversation (proceso),
                      services, energy, trust, contact + footer
                      primitives.tsx → Reveal, enlaces, hooks de scroll
                      sky.tsx        → foto de cielo, luz y líneas animadas
  legal/              Plantilla de las páginas legales
lib/
  content.ts          Todo el texto y los datos de la empresa (fuente única)
public/images/        Imagen de cielo
```

Orden de la página: **Hero → About us** (identidad, proceso, principios) **→ Services** (incluye energía) **→ Trust → Contact**.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm start       # sirve el build
```

## Notas

- Para cambiar textos o datos de contacto, edita solo `lib/content.ts`.
- Las URLs antiguas `/privacy.html` y `/sms-terms.html` redirigen a las nuevas (necesario para el registro del programa de SMS). Ver `next.config.mjs`.
- Responsive y accesible: diseño específico para móvil/tablet, soporte de `prefers-reduced-motion` y animaciones optimizadas para 60 fps.
