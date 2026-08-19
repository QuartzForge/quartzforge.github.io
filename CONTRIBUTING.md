# Contributing

## Setup

    npm ci
    npm run dev

## Before opening a PR

    npm run lint
    npm test -- --run
    npm run build

## Content rules

- Code examples are always in English — even on a pt-BR page. They must compile
  against the real modules (quartz 0.1.1, facet 0.1.0). Never invent APIs.
- i18n covers prose and interface only. Code, file names and terminal output never
  pass through `$t()`.
- Unreleased modules (obsidian, pulse, vault) show concept, status and roadmap —
  zero code examples.
- Versions come from `scripts/fetch_versions.cr` at build time. If the fetch fails,
  the badge degrades to "in development" — never a fabricated number.

## Releases

Push to `main` deploys to GitHub Pages. `develop` never deploys.
