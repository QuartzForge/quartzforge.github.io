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
    planned: 'planned',
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
  docs: {
    title: 'Documentation',
    subtitle: 'From zero to a running API — the examples below are taken from the shipped quartz 0.1.1 and facet 0.1.0 examples and README.',
    step: 'Step {n}',
    installation: 'Installation',
    installationBody:
      'Add the shards to shard.yml. Each piece is independent — install only what you use.',
    payload: 'Define the payload',
    payloadBody:
      'A payload is a plain record with rules declared next to the field. The Facet macro collects the annotations at compile time and generates the validation.',
    controller: 'The controller',
    controllerBody:
      'Controllers are plain classes, no base class. The annotation registers the route; the body argument type is deserialized and handed to your code.',
    validation: 'Validating input',
    validationBody:
      'Facet.validate returns a ValidationResult — no exceptions. The contract with Quartz is direct: a Facet FieldError becomes a Quartz FieldError, and BindError becomes a 400 problem+json.',
    run: 'Running',
    runBody: 'Quartz.configure sets the port and OpenAPI title; Quartz.run starts the server.',
    test: 'Testing',
    testBody:
      'The specs in each repo are the real testing reference today: run crystal spec inside the project. The in-memory client is internal in 0.1.x.',
    errors: 'Error format',
    errorsBody:
      'Every error is application/problem+json (RFC 9457). The type field is the stable identifier for programmatic handling — these are the nine values emitted by Quartz:',
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
