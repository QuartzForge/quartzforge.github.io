export default {
  nav: {
    overview: 'Overview',
    ecosystem: 'Ecosystem',
    documentation: 'Documentation',
    projects: 'Projects',
    quartz: 'quartz — HTTP',
    facet: 'facet — validation',
    obsidian: 'obsidian — data',
    pulse: 'pulse — jobs',
    vault: 'vault — OAuth',
  },
  status: {
    development: 'In development',
    released: 'Released',
  },
  project: {
    inDevelopment: 'In development',
    noExamples:
      'API not released — no code examples until the first release. The content below is the project vision.',
    gapTitle: 'The gap it fills',
    whenNotTitle: 'When not to use',
  },
  home: {
    heroTitle: 'The ecosystem for serious Crystal APIs.',
    heroSubtitle:
      'QuartzForge brings together an HTTP framework, validation, data, jobs and auth — each piece independent, installed separately.',
    installLabel: 'Installation — shard.yml',
    ctaDocs: 'Read the documentation',
    ctaEcosystem: 'See the ecosystem',
    projectsTitle: 'Projects',
    principlesTitle: 'Principles across the ecosystem',
    principles: [
      { title: 'The macro only collects', body: 'No logic inside macros. The runtime is plain Crystal, with real stack traces.' },
      { title: 'Wiring mistakes are compile errors', body: 'Unregistered dependency, conflicting route, malformed rule — the build fails naming the problem.' },
      { title: 'No exceptions for expected flow', body: 'Validation returns a result. API errors are RFC 9457 problem+json.' },
    ],
    roadmapTitle: 'What is next',
    roadmapSubtitle: 'In development — API not released, subject to change.',
  },
  roadmap: {
    title: 'Roadmap',
    disclaimer: 'Planned — not available.',
  },
  ecosystem: {
    title: 'Ecosystem',
    subtitle:
      'Five independent projects, installed separately, designed to work together.',
    matrixTitle: 'Compatibility matrix',
    columnProject: 'Project',
    columnStatus: 'Status',
    columnCrystal: 'Crystal',
    columnLicense: 'License',
    columnDeps: 'Dependencies',
    noteTitle: 'In development',
    noteBody:
      'obsidian, pulse and vault have not released v1 — the API is designed from approved specs but may change. This page does not document APIs: it documents vision and roadmap.',
  },
  code: {
    copy: 'Copy',
  },
  theme: {
    toggle: 'Switch to light theme',
  },
  footer: {
    tagline: 'Official projects for building complete applications in Crystal.',
    projects: 'Projects',
    documentation: 'Documentation',
    community: 'Community',
    quickStart: 'Quick start',
    installation: 'Installation',
    firstRoute: 'First route',
    github: 'GitHub',
    discussions: 'Discussions',
    contributing: 'Contributing guide',
    madeIn: 'Made in Crystal',
  },
}
