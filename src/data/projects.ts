export type ProjectStatus = 'released' | 'design'

export interface Project {
  id: 'quartz' | 'facet' | 'vault'
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
