# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :wasm_lab,
  ecto_repos: [WasmLab.Repo]

# Configures the endpoint
config :wasm_lab, WasmLabWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "pxsDPqb1L7MOBMKtdcrIBEYpqffToWHxT4RR7ByCGEoeA5CuKXUVWN42YzpNGY6S",
  render_errors: [view: WasmLabWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: WasmLab.PubSub,
  live_view: [signing_salt: "heEMmwmB"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# https://github.com/elixir-plug/mime/pull/35
config :mime, :types, %{
  "application/wasm" => ["wasm"]
}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
