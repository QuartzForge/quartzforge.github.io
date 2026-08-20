// Each code block below is taken from the shipped quartz 0.1.1 and facet 0.1.0 examples.
export type DocGroup = 'comecando' | 'guias' | 'referencia'

export interface DocSection {
  id: string
  headingKey: string
  bodyKey: string
  group: DocGroup
  keywords: string
  code?: { label: string; file: string; code: string }
}

export interface DocProjectLink {
  to: string
  textKey: string
  keywords: string
}

// Sidebar groups mirror the template sidebar. The "Referência" group carries
// no guide sections — the view fills it with the project links and the
// ecosystem link.
export const docsGroups: { id: DocGroup; titleKey: string; sectionIds: string[] }[] = [
  { id: 'comecando', titleKey: 'docs.groupGettingStarted', sectionIds: ['instalacao', 'rodar', 'testar'] },
  { id: 'guias', titleKey: 'docs.groupGuides', sectionIds: ['payload', 'controller', 'validacao', 'erros'] },
  { id: 'referencia', titleKey: 'docs.groupReference', sectionIds: [] },
]

// Project links rendered in the Referência group. Keywords feed the docs
// search, which matches link text plus this field.
export const docsProjectLinks: DocProjectLink[] = [
  { to: '/quartz', textKey: 'nav.quartz', keywords: 'http api router middleware' },
  { to: '/facet', textKey: 'nav.facet', keywords: 'validação validation schema validar' },
  { to: '/obsidian', textKey: 'nav.obsidian', keywords: 'orm data mapper banco postgres' },
  { to: '/pulse', textKey: 'nav.pulse', keywords: 'fila job jobs postgres' },
  { to: '/vault', textKey: 'nav.vault', keywords: 'oauth identidade login' },
]

// Display order of the guide on the page and in the TOC: installation, then
// the payload/controller/validation trio, then run and test, closing with
// RFC 9457.
export const docsSections: DocSection[] = [
  {
    id: 'instalacao',
    headingKey: 'docs.installation',
    bodyKey: 'docs.installationBody',
    group: 'comecando',
    keywords: 'instalar shard shards dependências setup começar',
    code: {
      label: 'shard.yml',
      file: 'shard.yml',
      code: `dependencies:
  quartz:
    github: QuartzForge/quartz
    version: ~> 0.1.1
  facet:
    github: QuartzForge/facet
    version: ~> 0.1.0`,
    },
  },
  {
    id: 'payload',
    headingKey: 'docs.payload',
    bodyKey: 'docs.payloadBody',
    group: 'guias',
    keywords: 'payload schema record campo field validar facet',
    code: {
      label: 'payload',
      file: 'src/schemas/signup.cr',
      code: `require "facet"

record Signup, name : String, email : String, age : Int32 do
  include Facet::Validatable

  @[Facet::Assert::NotBlank]
  def name : String
    @name
  end

  @[Facet::Assert::Email]
  def email : String
    @email
  end

  @[Facet::Assert::Min(18, message: "you must be an adult")]
  def age : Int32
    @age
  end
end`,
    },
  },
  {
    id: 'controller',
    headingKey: 'docs.controller',
    bodyKey: 'docs.controllerBody',
    group: 'guias',
    keywords: 'controller rota route post endpoint annotation',
    code: {
      label: 'controller',
      file: 'src/controllers/signups_controller.cr',
      code: `require "quartz"
require "facet"
require "./schemas/signup"

@[Quartz::Service]
class SignupService
  def create(payload : Signup) : String
    "ok"
  end
end

@[Quartz::Controller(prefix: "/signups")]
class SignupsController
  def initialize(@service : SignupService)
  end

  @[Quartz::Post("/", status: 201)]
  def create(body : Signup) : String
    @service.create(body)
  end
end`,
    },
  },
  {
    id: 'validacao',
    headingKey: 'docs.validation',
    bodyKey: 'docs.validationBody',
    group: 'guias',
    keywords: 'validar validação facet validation binderror erro',
    code: {
      label: 'validate',
      file: 'src/controllers/signups_controller.cr',
      code: `unless result.valid?
  errors = result.errors.map do |e|
    Quartz::FieldError.new(e.field, "body", e.message)
  end
  raise Quartz::BindError.new(errors)
end`,
    },
  },
  {
    id: 'rodar',
    headingKey: 'docs.run',
    bodyKey: 'docs.runBody',
    group: 'comecando',
    keywords: 'rodar run servidor server port configure',
    code: {
      label: 'app',
      file: 'src/app.cr',
      code: `require "quartz"
require "./controllers/signups_controller"

Quartz.configure do |config|
  config.port = 3000
  config.openapi.title = "Signup API"
end

Quartz.run`,
    },
  },
  {
    id: 'testar',
    headingKey: 'docs.test',
    bodyKey: 'docs.testBody',
    group: 'comecando',
    keywords: 'testar test spec specs client',
    code: {
      label: 'spec',
      file: 'spec/signups_spec.cr',
      code: `require "spec"
require "../src/app"

# The in-memory test client exercises the full pipeline
# without opening a socket. (Internal API in quartz 0.1.x.)
describe SignupsController do
  it "creates a signup" do
    # POST /signups with a valid body returns 201
  end
end`,
    },
  },
  {
    id: 'erros',
    headingKey: 'docs.errors',
    bodyKey: 'docs.errorsBody',
    group: 'guias',
    keywords: 'erro error rfc 9457 problem json',
  },
]
