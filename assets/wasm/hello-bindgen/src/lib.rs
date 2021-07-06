// extern crate wasm_bindgen;

// use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// extern "C" {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet(name: &str) {
//     alert(&format!("Hello {}!", name));
// }

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

// extern crate web_sys;


#[wasm_bindgen(start)]
pub fn run() {
    bare_bones();
    using_macro();
    using_websys();
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

fn bare_bones() {
    log("Hello from Rust!");
}

fn using_macro() {
    console_log!("Yo melita");
}

fn using_websys() {
    use web_sys::console;

    console::log_1(&"Hello using web-sys".into());

    let js: JsValue = 4.into();
    console::log_2(&"Logging arbitrary values looks like".into(), &js);
}