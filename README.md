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

## Deploy to Cloudflare (Workers Static Assets)

This project deploys as a Cloudflare **Worker serving static assets** (the
unified Workers + Pages model). Config lives in `wrangler.jsonc`, which points
`wrangler deploy` at `./dist` and serves `index.html` for unknown routes
(`not_found_handling: single-page-application`).

**Git integration (Workers Builds):** Connect the repo in the Cloudflare
dashboard with:

- Build command: `bun run build`
- Deploy command: `wrangler deploy` (the default — it reads `wrangler.jsonc`)

On every push, Cloudflare builds `dist/` and `wrangler deploy` uploads it.

**Manual deploy from your machine:**

```sh
bun run deploy     # builds, then runs `wrangler deploy`
```

> The `name` in `wrangler.jsonc` must match your Cloudflare Worker name.

## How it works

- `src/components/GooglyLogo.tsx` — the logo; the two `o`s are googly eyes whose
  pupils chase the cursor via direct ref writes (no re-renders).
- `src/App.tsx` — search, buttons, randomized taglines, and the confetti burst.
- `src/index.css` — the entire aesthetic: floating blobs, grain overlay,
  staggered entrance, and animations (respects `prefers-reduced-motion`).
- `wrangler.jsonc` — Cloudflare config; serves `dist/` with an SPA fallback so
  every route serves `index.html`.

"Goofle Search" and "I'm Feeling Goofy" both redirect to a real Google search —
the latter with a goofy surprise query if the box is empty.
