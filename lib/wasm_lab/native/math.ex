defmodule WasmLab.Native.Math do
  use Rustler, otp_app: :wasm_lab, crate: :math

  def add(_a, _b) do
    :erlang.nif_error(:nif_not_loaded)
  end
end
