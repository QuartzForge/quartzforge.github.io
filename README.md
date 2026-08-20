# QuartzForge website

The public site for the QuartzForge ecosystem: a Vue 3 single-page app built with
Vite and Tailwind CSS 4, with internationalized content in English (default) and
Brazilian Portuguese. It presents the QuartzForge projects (quartz, facet,
vault) with their real release status, documentation and roadmaps.

## Requirements

- Node.js 24 (CI uses 24; `engines` is not enforced)

## Getting started

```bash
npm ci
npm run dev
```

`npm run dev` starts the Vite dev server. The site serves three views: Home,
Project (one page per project) and Docs, with both locales available
through the language switcher.

## Commands

| Command                 | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm ci`                | Install dependencies from the lockfile              |
| `npm run dev`           | Start the Vite dev server                           |
| `npm test -- --run`     | Run the Vitest suite once                           |
| `npm run lint`          | Run ESLint                                          |
| `npm run build`         | Type-check with vue-tsc, build to `dist/`           |

## Folder structure

```
src/
  components/    UI components (version badge, code tabs, headers, ...)
  composables/   Shared state (versions, theme, reveal, ...)
  data/          Static content: projects, examples, docs sections
  locales/       i18n messages (pt-BR.ts, en.ts)
  views/         Route views: Home, Project, Docs
  router.ts      Route table
  main.ts        Application entry
```

## How versions work

`src/data/versions.json` is the committed baseline: the latest known release
per project. On app load the browser fetches the GitHub "latest release"
endpoint for each QuartzForge repository and updates the displayed versions
(`refreshVersions` in `src/composables/useVersions.ts`).

If the fetch fails — offline, rate limited, or the project has no release
yet — the baseline is kept. The site never displays a fabricated version
number.

## Content rules

- Code examples are always in English, even on a pt-BR page, and must compile
  against the real modules (quartz 0.1.1, facet 0.1.0). Never invent APIs.
- i18n covers prose and interface only. Code, file names and terminal output never
  pass through `$t()`.
- Unreleased modules (vault) show concept, status and roadmap — zero code examples.

## Deployment

A push to `main` runs CI and deploys the built site to GitHub Pages via Actions.
`develop` never deploys; publish happens only when a merge to `main` is decided.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.
