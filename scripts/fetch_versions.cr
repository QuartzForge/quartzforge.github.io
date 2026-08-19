require "json"
require "http/client"

# Fetches the latest GitHub release version for every QuartzForge repo at
# build time. Failure (offline, rate limit, no release yet) degrades to
# `released: false` — the site never displays a fabricated version number.
REPOS = %w[quartz facet obsidian pulse vault]

struct ReleaseInfo
  include JSON::Serializable

  getter version : String?
  getter released : Bool
  getter crystal : String

  def initialize(@version : String?, @released : Bool, @crystal : String)
  end
end

def latest_release(repo : String) : ReleaseInfo?
  response = HTTP::Client.get(
    "https://api.github.com/repos/QuartzForge/#{repo}/releases/latest",
    headers: HTTP::Headers{"Accept" => "application/vnd.github+json"},
  )
  return nil unless response.status_code == 200

  tag = JSON.parse(response.body)["tag_name"]?.try(&.as_s)
  return nil if tag.nil?

  tag = tag.lchop('v')
  ReleaseInfo.new(tag, true, "~> 1.21")
rescue ex : Exception
  puts "warning: could not fetch release for #{repo}: #{ex.message}"
  nil
end

releases = {} of String => ReleaseInfo

REPOS.each do |repo|
  release = latest_release(repo)
  releases[repo] = release || ReleaseInfo.new(nil, false, "~> 1.21")
end

File.write(
  "src/data/versions.json",
  JSON.build do |json|
    json.object do
      releases.each do |repo, info|
        json.field repo do
          json.object do
            json.field "version", info.version
            json.field "released", info.released
            json.field "crystal", info.crystal
          end
        end
      end
    end
  end,
)
