// Each code block below is taken from the shipped quartz 0.1.1 and facet 0.1.0 examples.
export interface DocSection {
  id: string
  headingKey: string
  bodyKey: string
  code?: { label: string; file: string; code: string }
}

export const docsSections: DocSection[] = [
  {
    id: 'instalacao',
    headingKey: 'docs.installation',
    bodyKey: 'docs.installationBody',
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
]
