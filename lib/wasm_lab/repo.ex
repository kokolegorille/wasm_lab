defmodule WasmLab.Repo do
  use Ecto.Repo,
    otp_app: :wasm_lab,
    adapter: Ecto.Adapters.Postgres
end
