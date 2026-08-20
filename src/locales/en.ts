export default {
  nav: {
    overview: 'Overview',
    documentation: 'Documentation',
    quartz: 'quartz (HTTP)',
    facet: 'facet (validation)',
    vault: 'vault (OAuth)',
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
    notYet: 'in development: the API is not released yet and may change',
    pagerLabel: 'Other projects',
    pager: {
      prev: 'Home',
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
    projectsKicker: 'Three projects, zero scavenging',
    projectsTitle: 'Each piece solves one scope. None forces the next.',
    projectsBody:
      'You can ship an API with just quartz, use facet inside a Lucky project, or let vault handle login. Using everything together means the compiler sees the whole application.',
    role: {
      quartz: 'HTTP',
      vault: 'OAuth',
      facet: 'Validation',
    },
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
  cta: {
    kicker: 'Start with the scope that hurts today',
    title: 'Adopt one project. Adopt all three. Same door.',
    body: 'The getting-started guide takes about ten minutes and ends with a running API and a validating schema.',
    primary: 'Getting-started guide',
  },
  ecosystem: {
    role: {
      quartz: 'HTTP framework',
      facet: 'Standalone validation',
      vault: 'OAuth client',
    },
  },
  docs: {
    quickStart: 'Quick start',
    subtitle: 'From zero to a running API: the examples below come from the README and the examples shipped with quartz 0.1.1 and facet 0.1.0.',
    searchPlaceholder: 'Search…',
    searchLabel: 'Search the documentation',
    searchEmpty: 'No pages for “{query}”.',
    navLabel: 'Documentation',
    sidebarToggle: 'Documentation outline',
    groupGettingStarted: 'Getting started',
    groupGuides: 'Guides',
    onThisPage: 'On this page',
    crumb: 'Documentation',
    pagerLabel: 'Page navigation',
    pager: {
      prev: 'Home',
      next: 'Meet quartz',
    },
    installation: 'Installation',
    installationBody:
      'Add the shards to shard.yml. Each piece is independent. Install only what you use.',
    payload: 'Define the payload',
    payloadBody:
      'A payload is a plain record with rules declared next to the field. The Facet macro collects the annotations at compile time and generates the validation.',
    controller: 'The controller',
    controllerBody:
      'Controllers are plain classes, no base class. The annotation registers the route; the body argument type is deserialized and handed to your code.',
    validation: 'Validating input',
    validationBody:
      'Facet.validate returns a ValidationResult, no exceptions. The contract with Quartz is direct: a Facet FieldError becomes a Quartz FieldError, and BindError becomes a 400 problem+json.',
    run: 'Running',
    runBody: 'Quartz.configure sets the port and OpenAPI title; Quartz.run starts the server.',
    test: 'Testing',
    testBody:
      'The specs in each repo are the real testing reference today: run crystal spec inside the project. The in-memory client is internal in 0.1.x.',
    errors: 'Error format',
    errorsBody:
      'Every error is application/problem+json (RFC 9457). The type field is the stable identifier for programmatic handling. These are the nine values emitted by Quartz:',
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
    docs: {
      quickStart: 'Quick start',
      installation: 'Installation',
      controller: 'The controller',
      errors: 'Error format',
    },
    madeIn: 'Made in Crystal',
  },
}
