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
```
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
```

On peut télécharger le js, modifier la version de gl (24->26)

## Stockfish WASM

https://github.com/niklasf/stockfish.wasm

Installer emsdk, emscripten.
Télécharger stockfisk wasm.
Compiler, à l'aide du script npm.


## FFMPEG

### Sprites

https://askubuntu.com/questions/377579/how-can-i-use-ffmpeg-to-output-a-screenshot-gallery-mosaic/377630#377630

$ ffmpeg -i syt.mp4 -vf "select=gt(scene\,0.4),scale=160:-1,tile" -frames:v 1 -qscale:v 3 preview.jpg
ffmpeg version 4.2.4-1ubuntu0.1 Copyright (c) 2000-2020 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.3.0-10ubuntu2)
  configuration: --prefix=/usr --extra-version=1ubuntu0.1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 --enable-gpl --disable-stripping --enable-avresample --disable-filter=resample --enable-avisynth --enable-gnutls --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libcodec2 --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libjack --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-libpulse --enable-librsvg --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzmq --enable-libzvbi --enable-lv2 --enable-omx --enable-openal --enable-opencl --enable-opengl --enable-sdl2 --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-nvenc --enable-chromaprint --enable-frei0r --enable-libx264 --enable-shared
  libavutil      56. 31.100 / 56. 31.100
  libavcodec     58. 54.100 / 58. 54.100
  libavformat    58. 29.100 / 58. 29.100
  libavdevice    58.  8.100 / 58.  8.100
  libavfilter     7. 57.100 /  7. 57.100
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  5.100 /  5.  5.100
  libswresample   3.  5.100 /  3.  5.100
  libpostproc    55.  5.100 / 55.  5.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'syt.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.22.100
  Duration: 00:03:25.15, start: 0.000000, bitrate: 4136 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709), 1920x1080 [SAR 1:1 DAR 16:9], 4004 kb/s, 24 fps, 24 tbr, 12288 tbn, 48 tbc (default)
    Metadata:
      handler_name    : ISO Media file produced by Google Inc.
    Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 127 kb/s (default)
    Metadata:
      handler_name    : ISO Media file produced by Google Inc.
Stream mapping:
  Stream #0:0 -> #0:0 (h264 (native) -> mjpeg (native))
Press [q] to stop, [?] for help
[swscaler @ 0x5601a96e7a80] deprecated pixel format used, make sure you did set range correctly
Output #0, image2, to 'preview.jpg':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.29.100
    Stream #0:0(und): Video: mjpeg, yuvj444p(pc), 960x450 [SAR 1:1 DAR 32:15], q=2-31, 200 kb/s, 0.80 fps, 0.80 tbn, 0.80 tbc (default)
    Metadata:
      handler_name    : ISO Media file produced by Google Inc.
      encoder         : Lavc58.54.100 mjpeg
    Side data:
      cpb: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: -1
frame=    1 fps=0.1 q=3.0 Lsize=N/A time=00:00:01.25 bitrate=N/A speed=0.097x    
video:164kB audio:0kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown

https://superuser.com/questions/984686/create-a-image-every-xx-seconds-of-the-video-ffmpeg/984688#984688

$ ffmpeg -i syt.mp4 -filter_complex "select='not(mod(n,30))',scale=120:-1,tile=layout=3x2" -vframes 1 -q:v 2 output.jpg
ffmpeg version 4.2.4-1ubuntu0.1 Copyright (c) 2000-2020 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.3.0-10ubuntu2)
  configuration: --prefix=/usr --extra-version=1ubuntu0.1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 --enable-gpl --disable-stripping --enable-avresample --disable-filter=resample --enable-avisynth --enable-gnutls --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libcodec2 --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libjack --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-libpulse --enable-librsvg --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzmq --enable-libzvbi --enable-lv2 --enable-omx --enable-openal --enable-opencl --enable-opengl --enable-sdl2 --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-nvenc --enable-chromaprint --enable-frei0r --enable-libx264 --enable-shared
  libavutil      56. 31.100 / 56. 31.100
  libavcodec     58. 54.100 / 58. 54.100
  libavformat    58. 29.100 / 58. 29.100
  libavdevice    58.  8.100 / 58.  8.100
  libavfilter     7. 57.100 /  7. 57.100
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  5.100 /  5.  5.100
  libswresample   3.  5.100 /  3.  5.100
  libpostproc    55.  5.100 / 55.  5.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'syt.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.22.100
  Duration: 00:03:25.15, start: 0.000000, bitrate: 4136 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709), 1920x1080 [SAR 1:1 DAR 16:9], 4004 kb/s, 24 fps, 24 tbr, 12288 tbn, 48 tbc (default)
    Metadata:
      handler_name    : ISO Media file produced by Google Inc.
    Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 127 kb/s (default)
    Metadata:
      handler_name    : ISO Media file produced by Google Inc.
Stream mapping:
  Stream #0:0 (h264) -> select
  tile -> Stream #0:0 (mjpeg)
Press [q] to stop, [?] for help
[swscaler @ 0x55d1e9a7a0c0] deprecated pixel format used, make sure you did set range correctly
Output #0, image2, to 'output.jpg':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.29.100
    Stream #0:0: Video: mjpeg, yuvj420p(pc), 360x136 [SAR 136:135 DAR 8:3], q=2-31, 200 kb/s, 4 fps, 4 tbn, 4 tbc (default)
    Metadata:
      encoder         : Lavc58.54.100 mjpeg
    Side data:
      cpb: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: -1
frame=    1 fps=0.0 q=2.0 Lsize=N/A time=00:00:00.25 bitrate=N/A speed=0.691x    
video:10kB audio:0kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown

$ ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 syt.mp4
205.149000

### Gif anime from movie

https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/

$ ffmpeg -ss 30 -t 10 -i miss_fisher.mp4 miss.gif

more complex, better quality

$ ffmpeg -ss 30 -t 10 -i miss_fisher.mp4 -filter_complex "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" miss.gif

### Poster

$ ffmpeg -ss 30 -i miss_fisher.mp4 -frames:v 1 poster.jpg