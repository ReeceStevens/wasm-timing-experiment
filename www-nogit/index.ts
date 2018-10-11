import * as _ from 'lodash';
import * as wasm from "wasm-timing-experiment";

export type Vector2d = [number, number];
export type Vector3d = [number, number, number];
export type Vector4d = [number, number, number, number];
export type Vector = Vector2d | Vector3d | Vector4d;
export type Vector2dAffine = Vector3d;
export type Vector3dAffine = Vector4d;
export type VectorAffine = Vector2dAffine | Vector3dAffine;

export type Matrix2d = [
    [number, number],
    [number, number]
    ];
export type Matrix3d = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
    ];
export type Matrix4d = [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number]
    ];
export type Matrix = Matrix2d | Matrix3d | Matrix4d;
export type Matrix2dAffine = Matrix3d;
export type Matrix3dAffine = Matrix4d;
export type MatrixAffine = Matrix2dAffine | Matrix3dAffine;

function matrixTimesVector3dAffine(matrixThisFromThat: Matrix3dAffine,
                                          vectorThat: Vector3d | Vector3dAffine): Vector3dAffine {
    const [[a, b, c, d], [e, f, g, h], [i, j, k, m]] = matrixThisFromThat;
    const [A, B, C] = vectorThat;
    return [
        a * A + b * B + c * C + d,
        e * A + f * B + g * C + h,
        i * A + j * B + k * C + m,
        1
    ]; // vectorThis
}

function applyTransformToPlane(plane: Float64Array) {
    let result;
    for (let i = 0; i < plane.length; i++) {
        result = matrixTimesVector3dAffine(identity, testVector);
    }
}


const identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
] as Matrix3dAffine;
const testVector = [16, 23, 42] as Vector3d;
let resultVector = new Float64Array([0, 0, 0, 0]);
const flatIdentity = _.flatten(identity);

let wasm_individual = [];
let wasm_batch = [];
let js_individual = [];
let js_batch = [];
let start_ts, end_ts;

for (let max_iters = 10000; max_iters < 500000; max_iters += 10000) {
    if ((max_iters % 10000) === 0) {
        console.log(max_iters)
    }

    const somePlane = new Float64Array(max_iters);

    // Individual invocations
    start_ts = performance.now();
    for (let i = 0; i < max_iters; i++) {
        wasm.matrix_times_vector_3d_affine(flatIdentity, new Float64Array(testVector), resultVector)
    }
    end_ts = performance.now()
    wasm_individual.push(end_ts - start_ts);

    let js_result;
    start_ts = performance.now();
    for (let i = 0; i < max_iters; i++) {
        js_result = matrixTimesVector3dAffine(identity, testVector)
    }
    end_ts = performance.now()
    js_individual.push(end_ts - start_ts);

    // Batch invocations
    start_ts = performance.now();
    wasm.apply_transform_to_plane(somePlane, flatIdentity);
    end_ts = performance.now();
    wasm_batch.push(end_ts - start_ts);

    start_ts = performance.now();
    applyTransformToPlane(somePlane);
    end_ts = performance.now();
    js_batch.push(end_ts - start_ts);
}

console.log(wasm_individual);
console.log(wasm_batch);
console.log(js_individual);
console.log(js_batch);
