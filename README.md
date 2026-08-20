# QuartzForge website

The public site for the QuartzForge ecosystem: a Vue 3 single-page app built with
Vite and Tailwind CSS 4, with internationalized content in English (default) and
Brazilian Portuguese. It presents the QuartzForge projects (quartz, facet,
vault) with their real release status, documentation and roadmaps.

## Requirements

- Node.js 24 (CI uses 24; `engines` is not enforced)
- Crystal 1.21+ — required by the build. The version data is fetched by a Crystal
  script at build time, so `npm run build`, `npm test` and `npm run fetch-versions`
  need Crystal installed locally. CI installs it via
  `crystal-lang/install-crystal@v1`.

## Getting started

```bash
npm ci
npm run dev
```

`npm run dev` starts the Vite dev server. The site serves four views: Home,
Projects (one page per project), Ecosystem and Docs, with both locales available
through the language switcher.

## Commands

| Command                 | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm ci`                | Install dependencies from the lockfile              |
| `npm run dev`           | Start the Vite dev server                           |
| `npm run fetch-versions`| Run the Crystal script that writes `src/data/versions.json` |
| `npm test -- --run`     | Run the Vitest suite once                           |
| `npm run lint`          | Run ESLint                                          |
| `npm run build`         | Fetch versions, type-check with vue-tsc, build to `dist/` |

## Folder structure

```
src/
  components/    UI components (version badge, code tabs, headers, ...)
  data/          Static content: projects, examples, docs sections
  locales/       i18n messages (pt-BR.ts, en.ts)
  views/         Route views: Home, Project, Ecosystem, Docs
  router.ts      Route table
  main.ts        Application entry
scripts/
  fetch_versions.cr   Build-time GitHub release fetcher (Crystal)
legacy/          The previous static site, kept for reference (see below)
```

## How versions work

`scripts/fetch_versions.cr` queries the GitHub "latest release" endpoint for each
QuartzForge repository at build time and writes `src/data/versions.json`. The file
is gitignored; `src/data/versions.example.json` documents its shape.

If a fetch fails — offline, rate limited, or the project has no release yet — the
badge for that project degrades to "in development". The site never displays a
fabricated version number.

## Content rules

- Code examples are always in English, even on a pt-BR page, and must compile
  against the real modules (quartz 0.1.1, facet 0.1.0). Never invent APIs.
- i18n covers prose and interface only. Code, file names and terminal output never
  pass through `$t()`.
- Unreleased modules (vault) show concept, status and roadmap — zero code examples.

## legacy/

The old static site, preserved in git. It is removed when the new site publishes:
a push to `main` deploys to GitHub Pages, and `legacy/` goes away at that moment.

## Deployment

A push to `main` runs CI and deploys the built site to GitHub Pages via Actions.
`develop` never deploys; publish happens only when a merge to `main` is decided.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.
