export default {
  nav: {
    overview: 'Overview',
    ecosystem: 'Ecosystem',
    documentation: 'Documentation',
    quartz: 'quartz — HTTP',
    facet: 'facet — validation',
    vault: 'vault — OAuth',
  },
  header: {
    guide: 'Get started',
    github: 'GitHub repositories',
    burger: 'Open menu',
    navLabel: 'Main',
  },
  drawer: {
    projects: 'Projects',
  },
  sheet: {
    close: 'Close',
  },
  status: {
    stable: 'stable',
    development: 'in development',
  },
  project: {
    inDevelopment: 'In development',
    gapTitle: 'The gap it fills',
    whenNotTitle: 'When not to use',
    roadmapKicker: 'Roadmap',
    roadmapTitle: 'What comes next',
    roadmapPlanned: 'planned',
    gapKicker: 'The gap it fills',
    notYet: 'API not released — subject to change',
    pagerLabel: 'Other projects',
    pager: {
      prev: 'See the ecosystem',
      next: 'Read the documentation',
    },
    notFound: 'Project not found',
  },
  home: {
    heroKicker: 'Full framework · Crystal ~> 1.21',
    heroLead: 'A whole stack, in a language',
    markWord: 'compiled',
    heroBody:
      'QuartzForge brings together three official projects: quartz (HTTP), facet (validation) and vault (OAuth). None of them requires the others. The compiler sees the whole application.',
    ctaDocs: 'Read the documentation',
    ctaEcosystem: 'See the ecosystem',
    projectsKicker: 'Three projects, zero scavenging',
    projectsTitle: 'Each piece solves one scope. None forces the next.',
    projectsBody:
      'You can ship an API with just quartz, use facet inside a Lucky project, or let vault handle login. Using everything together means the compiler sees the whole application.',
    role: {
      quartz: 'HTTP',
      vault: 'OAuth',
      facet: 'Validation',
    },
    allProjects: 'all',
    allRole: 'Ecosystem',
    allBody:
      'Compatibility matrix, dependencies between the projects and what each one assumes about your database and runtime.',
    openEcosystem: 'Open the ecosystem',
  },
  arch: {
    kicker: 'How the pieces fit together',
    title: 'Coupling by contract, not by inheritance.',
    body:
      'The projects know each other through small interfaces. quartz takes the request, facet validates the payload and returns a type, vault owns the user identity. Swapping one piece does not break the others.',
    diag: {
      lead: 'takes the request, routes, responds',
      facet: 'validates and returns a type',
      vault: 'user identity',
      pg: 'data and sessions in one place',
    },
    arrows: ['raw body', 'typed value'],
    points: [
      { title: 'One binary for everything', body: 'API and tests come from the same build. Deploy is copying a file.' },
      { title: 'Minimal dependencies', body: 'quartz and facet need nothing beyond the stdlib; vault adds only the OAuth client.' },
      { title: 'No runtime discovery', body: 'Routes are resolved at compile time. No directory scanning at boot.' },
      { title: 'Macros only where they pay off', body: 'Metaprogramming stays where the compiler collects. The rest is plain Crystal the LSP understands.' },
    ],
    link: 'See the compatibility matrix',
  },
  principles: {
    kicker: 'Principles',
    title: 'Four decisions that explain the rest.',
    list: [
      { title: 'Explicit > automatic magic', body: 'No file is loaded by naming convention. If something runs, it is written somewhere you can open.' },
      { title: 'The type is the documentation', body: 'Signatures carry the intent. A Facet::Valid(NewInvoice) needs no comment explaining what already passed.' },
      { title: 'Each piece lives alone', body: 'No project depends on another QuartzForge project to work. Adopting one does not force adopting the rest.' },
      { title: 'Errors are data, not exceptions', body: 'Validation, OAuth and persistence return results that the case statement forces you to handle.' },
    ],
  },
  proof: {
    kicker: 'Proof, not promise',
    title: 'Named workloads, numbers only after CI.',
    body:
      'We do not publish benchmarks until the harness runs on neutral hardware and the result is reproducible by anyone. Until then, the rows below await CI.',
    rows: [
      'Simple JSON API, 1 route, no database',
      'Validate 10k signup payloads',
      'OAuth login flow with PKCE',
      'Clean build of the example project, no cache',
    ],
    pending: 'awaiting CI',
    noteTitle: 'Why the fields are empty',
    noteBody:
      'A number without methodology is marketing. The rows above wait for a neutral harness to publish CI-signed results with declared hardware and compiler version, reproducible by anyone.',
  },
  cta: {
    kicker: 'Start with the scope that hurts today',
    title: 'Adopt one project. Adopt all three. Same door.',
    body: 'The getting-started guide takes about ten minutes and ends with a running API and a validating schema.',
    primary: 'Getting-started guide',
    secondary: 'Compare the projects',
  },
  ecosystem: {
    heroKicker: 'Ecosystem',
    heroTitle: 'Three projects with scopes that never overlap.',
    heroLede:
      'Each one solves a whole problem and stops there. You choose how many go into your shard.yml and none of them complains about the absence of the others.',
    filterLabel: 'Filter projects by scope',
    chipsAll: 'all',
    scope: {
      web: 'web',
      validacao: 'validation',
      oauth: 'oauth',
    },
    count: '1 project | {count} projects',
    open: 'Open',
    role: {
      quartz: 'HTTP framework',
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
      http: 'stdlib HTTP client',
    },
    noteTitle: 'In development',
    noteBody:
      'vault has not released v1 yet. The API is designed from approved specs and may change. This page does not document APIs: it documents vision and roadmap.',
  },
  docs: {
    quickStart: 'Quick start',
    subtitle: 'From zero to a running API — the examples below are taken from the shipped quartz 0.1.1 and facet 0.1.0 examples and README.',
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the documentation',
    searchEmpty: 'No pages for “{query}”.',
    navLabel: 'Documentation',
    sidebarToggle: 'Documentation outline',
    groupGettingStarted: 'Getting started',
    groupGuides: 'Guides',
    groupProjects: 'Projects',
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
