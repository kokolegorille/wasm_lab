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

use std::time::{Duration, SystemTime, UNIX_EPOCH};

use std::f64;
use wasm_bindgen::JsCast;

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

    performance();
    smile();
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

fn performance() {
    let window = web_sys::window().expect("Window error");
    let performance = window
        .performance()
        .expect("Performance error");
    console_log!("The current time (in ms) is {}", performance.now());

    let start = perf_to_system(performance.timing().request_start());
    let end = perf_to_system(performance.timing().response_end());

    console_log!("request started at {}", humantime::format_rfc3339(start));
    console_log!("request ended at {}", humantime::format_rfc3339(end));
}

fn perf_to_system(amt: f64) -> SystemTime {
    let secs = (amt as u64) / 1_000;
    let nanos = ((amt as u32) % 1_000) * 1_000_000;
    UNIX_EPOCH + Duration::new(secs, nanos)
}

fn smile() {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    context.begin_path();

    // Draw the outer circle.
    context
        .arc(75.0, 75.0, 50.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the mouth.
    context.move_to(110.0, 75.0);
    context.arc(75.0, 75.0, 35.0, 0.0, f64::consts::PI).unwrap();

    // Draw the left eye.
    context.move_to(65.0, 65.0);
    context
        .arc(60.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the right eye.
    context.move_to(95.0, 65.0);
    context
        .arc(90.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    context.stroke();
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