defmodule WasmLabWeb.PageController do
  use WasmLabWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def game_of_life(conn, _params) do
    render(conn, "game_of_life.html")
  end
end
