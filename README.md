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
$ cargo new hello-wasm
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
import("./pkg/").then(lib => {
    console.log(`2 + 2 = ${lib.add(2, 2)}`);
    return lib;
});
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

npm i --prefx assets

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