mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn test() -> String {
    return " !!!Welcome from Rust".to_string()
}

#[wasm_bindgen]
pub struct Backend {
    msg: String
}

#[wasm_bindgen]
impl Backend {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Backend {
        Backend { msg: "Message".to_string() }
    }

    pub fn start(&self) -> String {
        format!(" A {} from Rust!", self.msg).to_string()
    }
}


#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm!");
}
