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

const PIECEFLAG_BLACK: u8 = 1;
const PIECEFLAG_WHITE: u8 = 2;
const PIECEFLAG_CROWN: u8 = 4;

impl Into<i32> for board::GamePiece {
    fn into(self) -> i32 {
        let mut val: u8 = 0;
        if self.color == board::PieceColor::Black {
            val += PIECEFLAG_BLACK;
        } else if self.color == board::PieceColor::White {
            val += PIECEFLAG_WHITE;
        }

        if self.crowned {
            val += PIECEFLAG_CROWN;
        }
        val as i32
    }
}

#[wasm_bindgen]
pub extern "C" fn get_piece(engine: &game::GameEngine, x: i32, y: i32) -> i32 {
    let piece = engine.get_piece(board::Coordinate(x as usize, y as usize));
    match piece {
        Ok(Some(p)) => p.into(),
        Ok(None) => - 1,
        Err(_) => -1,
    }
}

#[wasm_bindgen]
pub extern "C" fn get_current_turn(engine: &game::GameEngine) -> i32 {
    engine.current_turn() as i32
}

#[wasm_bindgen]
pub extern "C" fn move_piece(engine: &mut game::GameEngine, fx: i32, fy: i32, tx: i32, ty: i32) -> i32 {
    let mv = board::Move::new((fx as usize, fy as usize), (tx as usize, ty as usize));
    let result = engine.move_piece(&mv);
    match result {
        Ok(_mr) => {
            1
        }
        Err(_) => 0,
    }
}

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