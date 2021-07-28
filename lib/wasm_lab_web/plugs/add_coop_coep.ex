defmodule WasmLabWeb.Plugs.AddCoopCoep do
  @moduledoc false
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    conn
    |> put_resp_header("Cross-Origin-Embedder-Policy", "require-corp")
    |> put_resp_header("Cross-Origin-Opener-Policy", "same-origin")

    # conn
    # |> put_resp_header("cross-origin-embedder-policy", "require-corp")
    # |> put_resp_header("cross-origin-opener-policy", "same-origin")
  end
end
