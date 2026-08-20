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
  header: {
    guide: 'Get started',
    github: 'GitHub repositories',
    lang: 'Change language',
    burger: 'Open menu',
  },
  drawer: {
    projects: 'Projects',
  },
  status: {
    stable: 'stable',
    development: 'in development',
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
    heroKicker: 'Full framework · Crystal ~> 1.21',
    heroLead: 'A whole stack, in a language',
    markWord: 'compiled',
    heroBody:
      'QuartzForge brings together five official projects covering an application end to end — HTTP, validation, data, jobs and login. None of them requires the others. Together, the compiler sees the whole application.',
    heroNote: ['MIT', '·', 'no runtime, no VM', '·', 'single binary', '·', 'Linux · macOS · FreeBSD'],
    ctaDocs: 'Read the documentation',
    ctaEcosystem: 'See the ecosystem',
    projectsKicker: 'Five projects, zero scavenging',
    projectsTitle: 'Each piece solves one scope. None forces the next.',
    projectsBody:
      'You can ship an API with just quartz, use facet inside a Lucky project, or drop pulse into a service that already exists. Using everything together means the compiler sees the whole application.',
    role: {
      quartz: 'HTTP',
      vault: 'OAuth',
      pulse: 'Jobs',
      facet: 'Validation',
      obsidian: 'Data',
    },
    allProjects: 'all',
    allRole: 'Ecosystem',
    allBody:
      'Compatibility matrix, dependencies between the projects and what each one assumes about your database and runtime.',
    openEcosystem: 'Open the ecosystem',
  },
  compiler: {
    kicker: 'The main argument',
    title: 'The N+1 never reaches production because it never passes the build.',
    body:
      'In almost every ORM, a forgotten preload is a problem that only shows up under load. In obsidian, the query returns a type that only knows the relations you loaded — touching any other is a compile error.',
    concept: 'concept',
    points: [
      { title: 'The message already carries the fix', body: 'The compiler knows which preload is missing because it built the type.' },
      { title: 'It works for the editor too', body: 'The same type feeds autocomplete: unloaded relations do not appear in the list.' },
      { title: 'No hidden lazy loading', body: 'There is no silent fallback that fires a query inside a loop.' },
    ],
  },
  arch: {
    kicker: 'How the pieces fit together',
    title: 'Coupling by contract, not by inheritance.',
    body:
      'The projects know each other through small interfaces. quartz accepts any validator that answers #validate; pulse uses the same connection obsidian already opened. Swapping one piece does not break the others.',
    diag: {
      lead: 'takes the request, routes, responds',
      facet: 'validates and returns a type',
      vault: 'user identity',
      obsidian: 'reads and writes, relations verified',
      pulse: 'queues what is slow',
      pg: 'data and queue in one place',
    },
    arrows: ['raw body', 'typed value', 'same connection'],
    points: [
      { title: 'One binary for everything', body: 'API, worker, migrations and scheduled tasks come from the same build. Deploy is copying a file.' },
      { title: 'One infrastructure dependency', body: 'Postgres. The queue lives in it, sessions can live in it, and no Redis is required along the way.' },
      { title: 'No runtime discovery', body: 'Routes, columns and jobs are resolved at compile time. No directory scanning at boot.' },
      { title: 'Macros only where they pay off', body: 'Metaprogramming stays in schema and column definitions. The rest is plain Crystal the LSP understands.' },
    ],
    link: 'See the compatibility matrix',
  },
  principles: {
    kicker: 'Principles',
    title: 'Four decisions that explain the rest.',
    list: [
      { title: 'Explicit > automatic magic', body: 'No file is loaded by naming convention. If something runs, it is written somewhere you can open.' },
      { title: 'The type is the documentation', body: 'Signatures carry the intent. A Facet::Valid(NewInvoice) needs no comment explaining what already passed.' },
      { title: 'Each piece lives alone', body: 'No project depends on another QuartzForge project to work. Adopting one does not force adopting five.' },
      { title: 'Errors are data, not exceptions', body: 'Validation, OAuth and persistence return results that the case statement forces you to handle.' },
    ],
  },
  proof: {
    kicker: 'Proof, not promise',
    title: 'Named workloads, numbers only after CI.',
    body:
      'We do not publish benchmarks until the harness runs on neutral hardware and the result is reproducible by anyone. Until then, the rows below stay blank.',
    rows: [
      'Simple JSON API, 1 route, no database',
      'List 500 records with two preloaded relations',
      'Enqueue and process 10k jobs in Postgres',
      'Clean build of the example project, no cache',
    ],
    pending: '— awaiting CI',
    noteTitle: 'Why the fields are empty',
    noteBody:
      'A number without methodology is marketing. The rows above stay blank until the quartzforge/benchmarks repository publishes CI-signed results with declared hardware and compiler version.',
  },
  cta: {
    kicker: 'Start with the scope that hurts today',
    title: 'Adopt one project. Adopt all five. Same door.',
    body:
      'The getting-started guide takes about ten minutes and ends with a running API, a validating schema and an applied migration.',
    primary: 'Getting-started guide',
    secondary: 'Compare the projects',
  },
  roadmap: {
    title: 'Roadmap',
    disclaimer: 'Planned — not available.',
  },
  ecosystem: {
    title: 'Ecosystem',
    subtitle:
      'Five independent projects, installed separately, designed to work together.',
    heroKicker: 'Ecosystem',
    heroTitle: 'Five projects with scopes that never overlap.',
    heroLede:
      'Each one solves a whole problem and stops there. You choose how many go into your shard.yml — and none of them complains about the absence of the others.',
    filterLabel: 'Filter projects by scope',
    chipsAll: 'all',
    scope: {
      web: 'web',
      dados: 'data',
      validacao: 'validation',
      filas: 'jobs',
      oauth: 'oauth',
    },
    count: '1 project | {count} projects',
    open: 'Open',
    role: {
      quartz: 'HTTP framework',
      obsidian: 'Typed data mapper',
      pulse: 'Job queue',
      facet: 'Standalone validation',
      vault: 'OAuth client',
    },
    matrixTitle: 'Compatibility matrix',
    matrixLead: 'What each project requires — and nothing beyond that.',
    matrixNote:
      'The dependencies below are what each project assumes about your environment. No project depends on another QuartzForge project.',
    matrixCaption: 'Dependencies and compatibility of the QuartzForge projects',
    columnProject: 'Project',
    columnStatus: 'Status',
    columnCrystal: 'Crystal',
    columnLicense: 'License',
    columnDeps: 'Dependencies',
    deps: {
      stdlib: 'nothing beyond the stdlib',
      postgres: 'PostgreSQL 14+',
      http: 'stdlib HTTP client',
    },
    noteTitle: 'In development',
    noteBody:
      'obsidian, pulse and vault have not released v1 — the API is designed from approved specs but may change. This page does not document APIs: it documents vision and roadmap.',
  },
  docs: {
    title: 'Documentation',
    quickStart: 'Quick start',
    subtitle: 'From zero to a running API — the examples below are taken from the shipped quartz 0.1.1 and facet 0.1.0 examples and README.',
    step: 'Step {n}',
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the documentation',
    searchEmpty: 'No pages for “{query}”.',
    sidebarToggle: 'Documentation outline',
    groupGettingStarted: 'Getting started',
    groupGuides: 'Guides',
    groupReference: 'Reference',
    onThisPage: 'On this page',
    crumb: 'Documentation',
    pagerLabel: 'Page navigation',
    pager: {
      prev: 'See the ecosystem',
      next: 'Meet quartz',
    },
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
    copy: 'copy',
    copied: 'copied',
  },
  theme: {
    toggle: 'Switch to light theme',
    lang: 'Change language',
  },
  footer: {
    tagline: 'Official projects for building complete applications in Crystal.',
    projects: 'Projects',
    documentation: 'Documentation',
    community: 'Community',
    github: 'GitHub',
    discussions: 'Discussions',
    contributing: 'Contributing guide',
    versionPolicy: 'Version policy',
    docs: {
      quickStart: 'Quick start',
      installation: 'Installation',
      controller: 'The controller',
      errors: 'Error format',
    },
    madeIn: 'Made in Crystal',
  },
}
