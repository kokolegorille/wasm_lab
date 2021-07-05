extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn debug(message: &str) {
    console_log!("{}", message)
}

#[wasm_bindgen]
pub extern "C" fn get_grid(game: &game::Game) -> js_sys::Uint32Array {
    console_log!("---> {:?}", game.grid());
    game.grid()
}

#[wasm_bindgen]
pub extern "C" fn get_current_turn(game: &game::Game) -> i32 {
    game.current_turn as i32
}

mod board;
mod game;