extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn matrix_times_vector_3d_affine(
    matrix_this_from_that: &[f64],
    vector_that: &[f64],
    result: &mut [f64]
    ) {
        match matrix_this_from_that {
            [a, b, c, d, e, f, g, h, i, j, k, m, _n, _p, _q, _r] => {
                if let [A, B, C] = vector_that {
                    result[0] = a * A + b * B + c * C + d;
                    result[1] = e * A + f * B + g * C + h;
                    result[2] = i * A + j * B + k * C + m;
                    result[3] = 1_f64;
                } else {
                    alert("Vector is invalid shape");
                }
            },
            _ => {alert("Invalid input shape");}
        };
}

#[wasm_bindgen]
pub fn apply_transform_to_plane(plane: &mut [f64], transform: &[f64]) {
    let test_vector: [f64; 3] = [16., 23., 42.];
    let mut result: [f64; 4] = [0., 0., 0., 0.];
    for point in plane.into_iter() {
        matrix_times_vector_3d_affine(transform, &test_vector, &mut result);
        *point = result[0];
    }
}
