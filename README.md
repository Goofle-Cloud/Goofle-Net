# Goofle 🪿

The goofier way to search. A playful Google parody landing page — googly eyes
that track your cursor, randomized taglines, emoji confetti, and a real working
search.

Built with **Bun + Vite + React + TypeScript**, deployed to **Cloudflare Pages**.

## Develop

```sh
bun install
bun run dev
```

Open the URL Vite prints (default http://localhost:5173).

## Build

```sh
bun run build      # type-checks, then builds to dist/
bun run preview    # serve the production build locally
```

## Deploy to Cloudflare Pages

**Option A — Git integration (recommended):** Connect the repo in the Cloudflare
dashboard and use:

- Build command: `bun run build`
- Build output directory: `dist`

**Option B — Direct upload via Wrangler:**

```sh
bun run deploy     # builds, then runs `wrangler pages deploy dist`
```

The first deploy will prompt you to log in and create the Pages project.

## How it works

- `src/components/GooglyLogo.tsx` — the logo; the two `o`s are googly eyes whose
  pupils chase the cursor via direct ref writes (no re-renders).
- `src/App.tsx` — search, buttons, randomized taglines, and the confetti burst.
- `src/index.css` — the entire aesthetic: floating blobs, grain overlay,
  staggered entrance, and animations (respects `prefers-reduced-motion`).
- `public/_redirects` — SPA fallback so every route serves `index.html`.

"Goofle Search" and "I'm Feeling Goofy" both redirect to a real Google search —
the latter with a goofy surprise query if the box is empty.
