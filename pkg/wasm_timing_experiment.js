/* tslint:disable */
import * as wasm from './wasm_timing_experiment_bg';

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_alert_7a70fd11d905de4a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    alert(varg0);
}

let cachedTextEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}
/**
* @param {string} arg0
* @returns {void}
*/
export function greet(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.greet(ptr0, len0);

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

let cachegetFloat64Memory = null;
function getFloat64Memory() {
    if (cachegetFloat64Memory === null || cachegetFloat64Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory;
}

function passArrayF64ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 8);
    getFloat64Memory().set(arg, ptr / 8);
    return [ptr, arg.length];
}
/**
* @param {Float64Array} arg0
* @param {Float64Array} arg1
* @param {Float64Array} arg2
* @returns {void}
*/
export function matrix_times_vector_3d_affine(arg0, arg1, arg2) {
    const [ptr0, len0] = passArrayF64ToWasm(arg0);
    const [ptr1, len1] = passArrayF64ToWasm(arg1);
    const [ptr2, len2] = passArrayF64ToWasm(arg2);
    try {
        return wasm.matrix_times_vector_3d_affine(ptr0, len0, ptr1, len1, ptr2, len2);

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 8);
        wasm.__wbindgen_free(ptr1, len1 * 8);
        arg2.set(getFloat64Memory().subarray(ptr2 / 8, ptr2 / 8 + len2));
        wasm.__wbindgen_free(ptr2, len2 * 8);

    }

}

/**
* @param {Float64Array} arg0
* @param {Float64Array} arg1
* @returns {void}
*/
export function apply_transform_to_plane(arg0, arg1) {
    const [ptr0, len0] = passArrayF64ToWasm(arg0);
    const [ptr1, len1] = passArrayF64ToWasm(arg1);
    try {
        return wasm.apply_transform_to_plane(ptr0, len0, ptr1, len1);

    } finally {
        arg0.set(getFloat64Memory().subarray(ptr0 / 8, ptr0 / 8 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 8);
        wasm.__wbindgen_free(ptr1, len1 * 8);

    }

}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

