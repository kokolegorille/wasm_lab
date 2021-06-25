// extern crate wasm_bindgen;

// use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// pub fn add(a: i32, b: i32) -> i32 {
//     a + b
// }

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

mod board;
mod game;

// #[wasm_bindgen]
// pub fn log_game(engine: &game::GameEngine) -> () {
//     match engine.current_turn() {
//         board::PieceColor::White => log("White"),
//         board::PieceColor::Black => log("Black"),
//     }
// }

#[wasm_bindgen]
pub fn log_game(engine: &game::GameEngine) -> () {
    log(&format!("Current turn: {}", engine.current_turn()))
}