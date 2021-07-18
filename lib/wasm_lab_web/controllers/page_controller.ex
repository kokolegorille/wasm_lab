defmodule WasmLabWeb.PageController do
  use WasmLabWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def asteroids(conn, _params) do
    render(conn, "asteroids.html")
  end

  def ffmpeg(conn, _params) do
    render(conn, "ffmpeg.html")
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
    render(conn, "stockfish.html")
  end

  def screen(conn, _params) do
    render(conn, "screen.html")
  end
end
