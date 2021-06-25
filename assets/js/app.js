// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html";

// import "../wasm/hello-wasm/lib.js";

// HELLO WASM
//
// import { add, hello } from "hello-wasm";
// console.log(`3 + 2 = ${add(3, 2)}`);
// hello('Meli7');

import "./load_game_of_life";

// import RustyCheckers from "rustycheckers";

// console.log(RustyCheckers);

// Import function from wasm rust via the package!
// import { add } from "rustycheckers";

// console.log(add(8, 8))

import React from "react"
import { render } from "react-dom"

// import { GameEngine } from "rustycheckers";

// let engine = GameEngine.new();

// console.log(engine);

// console.log(GameEngine);

import RustyCheckers from "./components/RustyCheckers";

const rustycheckers = document.getElementById("rustycheckers");

if (rustycheckers) {
  render(
    <RustyCheckers />, 
    rustycheckers
  )
}