export type ProjectStatus = 'released' | 'design'

export interface Project {
  id: 'quartz' | 'facet' | 'obsidian' | 'pulse' | 'vault'
  name: string
  role: string
  tagline: string
  description: string
  status: ProjectStatus
  repo: string
  accent: string
  gap: string[]
  roadmap: string[]
  whenNotToUse: string
}

export const projects: Project[] = [
  {
    id: 'quartz',
    name: 'quartz',
    role: 'HTTP',
    tagline: 'Routes, parameters and middleware become data structures at compile time.',
    description:
      'HTTP framework for robust APIs: annotation routing, compile-time dependency injection, RFC 9457 errors and automatic OpenAPI 3.1.',
    status: 'released',
    repo: 'QuartzForge/quartz',
    accent: 'amber',
    gap: [
      'No mainstream OpenAPI shard for Crystal existed before quartz.',
      'Compile time and memory are the #1 community complaint — the macro only collects, the runtime is plain Crystal.',
    ],
    roadmap: [
      'Rate limiting middleware',
      'WebSocket and SSE',
      'Reverse routing (named paths)',
      'Public in-memory test client',
    ],
    whenNotToUse:
      'If you need server-rendered HTML with layouts, form helpers and asset pipelines, quartz gets in the way — it is built for APIs.',
  },
  {
    id: 'facet',
    name: 'facet',
    role: 'Validation',
    tagline: 'Rules declared next to the field; validation that never raises.',
    description:
      'Standalone validation for Crystal: annotations on struct/record properties, an immutable ValidationResult, and automatic nested validation with prefixed error paths.',
    status: 'released',
    repo: 'QuartzForge/facet',
    accent: 'amber',
    gap: [
      'Eight shards in the category, only two active; the good one is tied to Athena.',
    ],
    roadmap: [
      'i18n message tables (Facet.messages)',
      'Nested collection validation',
      'Custom rule annotations',
    ],
    whenNotToUse:
      'If you want ActiveRecord-style validation on mutable entities with dirty tracking, facet targets immutable structs — entity validation is a post-v1 decision.',
  },
  {
    id: 'obsidian',
    name: 'obsidian',
    role: 'Data',
    tagline: 'Compile-time verified relation loading — the N+1 is a build error.',
    description:
      'Typed data mapper for Crystal with explicit relations (ManyToOne, OneToMany) and no lazy loading ever: a relation you did not load does not compile.',
    status: 'design',
    repo: 'QuartzForge/obsidian',
    accent: 'violet',
    gap: [
      'Avram and Marten are alive but unsatisfying; the community consensus is raw SQL plus DB::Serializable.',
      'The ecosystem wants something that is not another ActiveRecord.',
    ],
    roadmap: [
      'Annotation-declared entities and repositories',
      'Compile-time verified loading via load: { :relation }',
      'Transactions and unit of work',
      'Settled entity/column annotation syntax',
    ],
    whenNotToUse:
      'If you prefer raw SQL with DB::Serializable — the community default — obsidian adds a layer you may not want.',
  },
  {
    id: 'pulse',
    name: 'pulse',
    role: 'Jobs',
    tagline: 'Postgres-native background jobs — no Redis, no extra broker.',
    description:
      'Background job queue native to Postgres: SKIP LOCKED to claim, LISTEN/NOTIFY to wake. One database to operate.',
    status: 'design',
    repo: 'QuartzForge/pulse',
    accent: 'emerald',
    gap: [
      'Redis-backed queues exist (sidekiq.cr). The gap is a Postgres-native queue.',
    ],
    roadmap: [
      'Queue declaration and retries with exponential backoff',
      'Unique jobs for a window',
      'Worker CLI',
    ],
    whenNotToUse:
      'If you already run Redis and want mature retry UIs, the existing Redis ecosystem may serve better.',
  },
  {
    id: 'vault',
    name: 'vault',
    role: 'OAuth',
    tagline: 'Multi-provider OAuth client with a normalized identity.',
    description:
      'OAuth 2.1 client for Crystal: Google, GitHub, Microsoft, GitLab and Discord with PKCE by default and a single normalized identity on the way out.',
    status: 'design',
    repo: 'QuartzForge/vault',
    accent: 'violet',
    gap: [
      'JWT and OAuth server are solved; the OAuth client side is dead (multi-auth is unmaintained).',
    ],
    roadmap: [
      'PKCE by default',
      'Normalized identity across providers',
      'Custom provider support (e.g. gov.br SSO)',
    ],
    whenNotToUse:
      'If you need OAuth server functionality or SAML, vault is only the client side.',
  },
]
