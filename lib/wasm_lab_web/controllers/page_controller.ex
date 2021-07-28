defmodule WasmLabWeb.PageController do
  use WasmLabWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def asteroids(conn, _params) do
    render(conn, "asteroids.html")
  end

  def ffmpeg(conn, _params) do
    # [Deprecation] SharedArrayBuffer will require cross-origin isolation as of M92, around July 2021. See https://developer.chrome.com/blog/enabling-shared-array-buffer/ for more details.
    # ReferenceError: SharedArrayBuffer is not defined
    # To use SharedArrayBuffer, You need to set additional response's headers

    # conn = conn
    # |> Plug.Conn.put_resp_header("Cross-Origin-Embedder-Policy", "require-corp")
    # |> Plug.Conn.put_resp_header("Cross-Origin-Opener-Policy", "same-origin")
    render(conn, "ffmpeg.html")
  end

  def fireworks(conn, _params) do
    render(conn, "fireworks.html")
  end

  def game_of_life(conn, _params) do
    render(conn, "game_of_life.html")
  end

  def hello_bindgen(conn, _params) do
    render(conn, "hello_bindgen.html")
  end

  def rustycheckers(conn, _params) do
    render(conn, "rustycheckers.html")
  end

  def rustygo(conn, _params) do
    render(conn, "rustygo.html")
  end

  def rogue(conn, _params) do
    render(conn, "rogue.html")
  end

  def stockfish(conn, _params) do
    # conn = conn
    # |> Plug.Conn.put_resp_header("Cross-Origin-Embedder-Policy", "require-corp")
    # |> Plug.Conn.put_resp_header("Cross-Origin-Opener-Policy", "same-origin")
    render(conn, "stockfish.html")
  end

  def screen(conn, _params) do
    render(conn, "screen.html")
  end
end
