# Working on the Zular website

Instructions for anyone changing this repo, human or AI. `CLAUDE.md` points here.

## Commands

| Command          | What it does                                               |
| ---------------- | ---------------------------------------------------------- |
| `npm run dev`    | Runs the site locally                                      |
| `npm run check`  | Runs everything CI runs: format, lint, types, tests, build |
| `npm run format` | Fixes formatting                                           |

Run `npm run check` before pushing. Every push to `main` publishes to https://zular.net once CI passes.

## Where things go

| To change                              | Edit                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| Links, addresses, contact email        | `src/config.ts`                                                                        |
| Home page section                      | `src/pages/home/sections/`                                                             |
| Sample activity, offers, fees, roadmap | `src/pages/home/examples.ts`                                                           |
| Media page text and asset lists        | `src/pages/media/content.ts`                                                           |
| Media files                            | `public/brand-assets/`, then rebuild `zular-media-kit.zip`                             |
| Colors, radii, fonts                   | `src/styles/global.css`                                                                |
| Logic with no UI                       | `src/lib/`, with a test in `test/`                                                     |
| A new page                             | Add it to `Route` in `src/lib/route.ts`, then `src/App.tsx` and `scripts/postbuild.js` |

## Product rules

- **Custody:** Zular is custodial at launch. Never describe it as self-custody, and keep the balance note in the wallet section.
- **3D bolt:** render the real `public/models/zular-bolt-v3a.glb`. An SVG or image of it isn't a substitute, except as the fallback when 3D fails.
- **Examples:** invented names, amounts and prices must be labelled as examples on the page.
- **Share images:** each page has a designed 1200 by 630 banner in `public/`. Never use a screenshot of the page.
- **Domain:** `zular.net`. The old Daric name and orange logo appear only in the rule telling people not to use them.
- **Design:** the source is the `Website` and `Media assets` sections on the `UI` page of the Zular Figma file. Tokens in `global.css` mirror its variables.

## Code rules

- Strict TypeScript. Avoid `any`, and don't add `@ts-ignore`.
- Write file extensions in imports (`./format.ts`), so tests run directly in Node.
- One component per file where practical. Styles live in a CSS module next to it, and colors come from `global.css` variables.
- Keep logic out of components: pure functions go in `src/lib/` and get tests.
- The build writes each page's HTML before the browser runs it, so a component's first render can't read `window` or `document`. Use `useEffect` for those.
- Respect `prefers-reduced-motion`, keyboard focus and phone widths down to 360px.
- `src/components/bolt/energy.js` is copied from the brand assets. Change it there first.

## Writing on the page

Short, plain sentences, written from the user's side. No unverified numbers or claims.
