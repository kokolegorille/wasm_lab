defmodule WasmLabWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :wasm_lab

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_wasm_lab_key",
    signing_salt: "czMBe404"
  ]

  socket "/socket", WasmLabWeb.UserSocket,
    websocket: true,
    longpoll: false

  #socket "/live", Phoenix.LiveView.Socket, websocket: [connect_info: [session: @session_options]]

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  # plug Plug.Static,
  #   at: "/",
  #   from: :wasm_lab,
  #   gzip: true,
  #   only: ~w(css fonts images js favicon.ico robots.txt wasm),
  #   content_types: %{
  #     "index" => "application/wasm"
  #   }

  plug Plug.Static,
    at: "/",
    from: :wasm_lab,
    gzip: true,
    only: ~w(css fonts images js favicon.ico robots.txt wasm),
    content_types: %{"index" => "application/wasm"},
    # headers: [
    #   {"Cross-Origin-Embedder-Policy", "require-corp"},
    #   {"Cross-Origin-Opener-Policy", "same-origin"}
    # ]
    headers: [
      {"cross-origin-embedder-policy", "require-corp"},
      {"cross-origin-opener-policy", "same-origin"}
    ]

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :wasm_lab
  end

  # plug Phoenix.LiveDashboard.RequestLogger,
  #   param_key: "request_logger",
  #   cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug WasmLabWeb.Router
end
