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
