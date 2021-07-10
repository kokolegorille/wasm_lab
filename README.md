# WasmLab

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `npm install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix

# How to use Wasm Rust with Webpack 5 and Phoenix

Add wasm-pack

```
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

Add wasm-pack-plugin
```
$ npm i @wasm-tool/wasm-pack-plugin --prefix assets
```

## Create crate

```
$ mkdir assets/wasm
$ cd assets/wasm
$ cargo new hello-wasm --lib
```

Update Cargo.toml and Add wasm-bindgen

```
[package]
name = "hello-wasm"
version = "0.1.0"
authors = ["kokolegorille <koko.le.gorille@gmail.com>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

Add lib.js
```
// import("./pkg/").then(lib => {
//     console.log(`2 + 2 = ${lib.add(2, 2)}`);
//     return lib;
// });

import("./pkg/").then(lib => lib);
```

Update src/lib.rs

```
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

## Configure webpack

```
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
...
    plugins: [
      ...
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "./wasm/hello-wasm/"), 
      }),
    ],
    experiments: {
      asyncWebAssembly: true,
    },
...
```

In case You update, but no changes...

Go in the assets/wasm/<crate>

wasm-pack build

Don't forget to run after adding new crate

npm i --prefix assets

## Configure reload

wasm-pack has no watch option, use cargo-watch

$ cargo install cargo-watch

Then, update config/dev.exs, and configure watchers...

```
    # "wasm-pack": [
    #   "build",
    #   cd: Path.expand("../assets/wasm/rustycheckers", __DIR__)
    # ]

    cargo: [
      "watch",
      "-i",
      ".gitignore",
      "-i",
      "pkg/*",
      "-s",
      "wasm-pack build",
      cd: Path.expand("../assets/wasm/rustycheckers", __DIR__)
    ]
```

It's possible to watch multiple crates.

## Rustler

This is the server side of Rust with Elixir.

Add rustler to mix 
Use version 0.22 with Elixir 1.12 and OTP24

```
      {:rustler, "~> 0.22.0"},
```

Create a new rustler crate

```
$ mix rustler.new
==> toml
Compiling 10 files (.ex)
Generated toml app
==> rustler
Compiling 7 files (.ex)
Generated rustler app
==> wasm_lab
This is the name of the Elixir module the NIF module will be registered to.
Module name > Math
This is the name used for the generated Rust crate. The default is most likely fine.
Library name (math) > 
* creating native/math/.cargo/config
* creating native/math/README.md
* creating native/math/Cargo.toml
* creating native/math/src/lib.rs
* creating native/math/.gitignore
Ready to go! See /home/sqrt/DATA_2021/code/_ELIXIR/_LAB/wasm_lab/native/math/README.md for further instructions.
```

Update config/dev.exs

```
config :wasm_lab, WasmLab.Native.Math,
  crate: :math,
  mode: :debug
```

You have a native folder at the root of the project.


```
#[rustler::nif]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

rustler::init!("Elixir.WasmLab.Native.Math", [add]);
```

Add wasm_lab/native/math.ex

```
defmodule WasmLab.Native.Math do
  use Rustler, otp_app: :wasm_lab, crate: :math

  def add(_a, _b) do
    :erlang.nif_error(:nif_not_loaded)
  end
end
```

## Game of life

export const memory = wasm.memory;

## Rustygo

```
cd assets/wasm
cargo new rustygo --lib
```

* Update Cago.toml

```
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

* Update assets/webpack.config.js

```
        crateDirectory: path.resolve(__dirname, "./wasm/rustygo/"),
```

Update assets/package.json

```
"rustygo": "file:./wasm/rustygo/pkg"
```

```
npm i --prefix assets
```

* Add new route

```
    get "/rustygo", PageController, :rustygo
```

* Add new template

Wrapper for react component... in ... templates/page/rustygo.html.eex

```
<div id="rustygo"></div>
```

* Update ... controllers/page_controller.ex
```
  def rustygo(conn, _params) do
    render(conn, "rustygo.html")
  end
```


* Update navbar ... in templates/layout/app.html.eex

```
            <li><%= link "Rusty Go", to: Routes.page_path(@conn, :rustygo) %></li>
```

* Create react component

```
import React from "react";

const RustyGo = () => {
    return (
        <div>
            <h1>Rusty Go</h1>
        </div>
    )
}

export default RustyGo;
```

* Update assets/app.js

```
// RUSTY GO
// ----------------------

import RustyGo from "./components/RustyGo";

const rustygo = document.getElementById("rustygo");

if (rustygo) {
  render(
    <RustyGo />,
    rustygo
  )
}
```

* Build with wasm-pack once...

cd assets/wasm/rustygo
wasm-pack build

* Add wasm-bindgen to the crate

## Asteroids

<style>
    html,
    body,
    #glcanvas {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        background: black;
        z-index: 0;
    }
</style>

<canvas id="glcanvas" tabindex='1'></canvas>

<script src="https://not-fl3.github.io/miniquad-samples/mq_js_bundle.js"></script>
<script>load("/wasm/asteroids.wasm");</script> <!-- Your compiled wasm file -->
