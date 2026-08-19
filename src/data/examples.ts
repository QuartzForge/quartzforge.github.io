// Both examples are the real hello-world programs shipped with the released
// modules, copied verbatim so they compile against quartz 0.1.1 and facet
// 0.1.0. Inside a template literal only `${` interpolates, so `#{...}` stays
// literal and needs no escape — the rendered text must show `#{error.field}`
// without a backslash (pinned by the HomeView spec).

export const quartzExample = `require "quartz"

record Greeting, message : String do
  include JSON::Serializable
end

@[Quartz::Service]
class GreetingService
  def greet(name : String) : Greeting
    Greeting.new("Hello, #{name}!")
  end
end

@[Quartz::Controller(prefix: "/greetings")]
class GreetingsController
  def initialize(@service : GreetingService)
  end

  @[Quartz::Get("/:name")]
  def show(name : String) : Greeting
    @service.greet(name)
  end
end

Quartz.configure do |config|
  config.port = 3000
  config.openapi.title = "Hello API"
end

Quartz.run`

export const facetExample = `require "facet"

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
end

result = Facet.validate(Signup.new(name: "", email: "x", age: 10))

result.errors.each do |error|
  puts "#{error.field}: #{error.message}"
end`
