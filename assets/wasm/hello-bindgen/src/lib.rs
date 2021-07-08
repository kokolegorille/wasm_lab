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

#[wasm_bindgen(start)]
pub fn run() {
    bare_bones();
    using_macro();
    using_websys();

    log(&format!("Hello from {}!", name()));
    let x = MyClass::new();
    assert_eq!(x.number(), 42);
    x.set_number(10);
    log(&x.render());
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// In the wasm root
#[wasm_bindgen(module = "/defined-in-js.js")]
extern "C" {
    fn name() -> String;

    type MyClass;

    #[wasm_bindgen(constructor)]
    fn new() -> MyClass;

    #[wasm_bindgen(method, getter)]
    fn number(this: &MyClass) -> u32;
    #[wasm_bindgen(method, setter)]
    fn set_number(this: &MyClass, number: u32) -> MyClass;
    #[wasm_bindgen(method)]
    fn render(this: &MyClass) -> String;
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

// Counter
#[wasm_bindgen]
#[derive(Debug)]
pub struct Counter {
    key: char,
    count: i32,
}

#[wasm_bindgen]
impl Counter {
    pub fn default() -> Counter {
        log("Counter::default");
        Self::new('a', 0)
    }

    pub fn new(key: char, count: i32) -> Counter {
        log(&format!("Counter::new({}, {})", key, count));
        Counter {
            key, 
            count,
        }
    }

    pub fn key(&self) -> char {
        log("Counter.key()");
        self.key
    }

    pub fn count(&self) -> i32 {
        log("Counter.count()");
        self.count
    }

    pub fn increment(&mut self) {
        log("Counter.increment()");
        self.count += 1;
    }

    pub fn update_key(&mut self, key: char) {
        self.key = key;
    }
}