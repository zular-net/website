# Zular website

The landing page for Zular, built with React and Vite. The design lives in the `Website` section of the `UI` page in the Zular Figma file.

## Run it

```sh
npm install
npm run dev
```

```sh
npm test            # logic tests, no extra packages needed
npm run build       # production build in dist/
docker compose up --build
```

## Publishing

Every push to `main` runs the tests, builds the site and publishes it to https://zular.net through GitHub Pages (`.github/workflows/deploy.yml`). Publishing runs only while the repository is public, because GitHub's free plan has no Pages for private repositories.

## Change the content

- `src/config.js`: download links, social links, donation addresses, contact email. Blank values stay hidden or show "Coming soon".
- `src/data/examples.js`: the sample activity, offers and trust graph.
- `src/data/media.js` and `public/brand-assets/`: the media assets page and its files.

## How it's organised

- `src/pages/`: the home page and the media assets page at `/media`.
- `src/sections/`: one component per home page section.
- `src/components/`: `ui` (buttons, rows, icons), `card` (balance card), `layout` (section, nav, footer), `bolt` (3D).
- `src/lib/`: pure logic with tests in `test/`.
- `src/styles/`: tokens that mirror the Figma variables.

## The 3D bolt

`public/models/zular-bolt-v3a.glb` is the real brand model. It renders live with three.js, and `BoltAnchor` marks each place it can fly to as the page scrolls.

three.js loads as a separate chunk after the page is usable. If WebGL is missing, the model can't load, or the graphics context is lost, each anchor shows the flat logo instead.
