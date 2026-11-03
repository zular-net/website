# Zular website

The landing page for Zular, built with React and Vite. The design lives in the `Website` section of the `UI` page in the Zular Figma file.

## Run it

```sh
npm install
npm run dev
```

```sh
npm run check       # format, lint, types, tests and build, as in CI
npm run build       # production build in dist/
docker compose up --build
```

## Publishing

Every push to `main` runs the tests, builds the site and publishes it to https://zular.net through GitHub Pages (`.github/workflows/deploy.yml`). Publishing runs only while the repository is public, because GitHub's free plan has no Pages for private repositories.

## Change the content

- `src/config.ts`: download links, social links, donation addresses, contact email. Blank values stay hidden or show "Coming soon".
- `src/pages/home/examples.ts`: the sample activity, offers and trust graph.
- `src/pages/media/content.ts` and `public/brand-assets/`: the media assets page and its files.

## How it's organised

- `src/pages/`: `home` and `media`, each with its own content and navigation.
- `src/components/`: shared parts. `ui` (buttons, rows, icons), `card` (balance card), `layout` (section, nav, footer), `bolt` (3D).
- `src/lib/` and `src/hooks/`: logic, with tests for `lib` in `test/`.
- `src/styles/`: tokens that mirror the Figma variables.

See [AGENTS.md](AGENTS.md) for commands, conventions and product rules.

## The 3D bolt

`public/models/zular-bolt-v3a.glb` is the real brand model. It renders live with three.js, and `BoltAnchor` marks each place it can fly to as the page scrolls.

three.js loads as a separate chunk after the page is usable. If WebGL is missing, the model can't load, or the graphics context is lost, each anchor shows the flat logo instead.
