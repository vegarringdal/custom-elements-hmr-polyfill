import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'dist/ES6/index.js',
        output: {
            file: './dist/custom-elements-hmr-pollyfill.system.js',
            format: 'system',
            sourcemap: true
        },
        plugins: [terser()]
    },
    {
        input: 'dist/ES6/index.js',
        output: {
            file: './dist/custom-elements-hmr-pollyfill.amd.js',
            format: 'amd',
            sourcemap: true
        },
        plugins: [terser()]
    },
    {
        input: 'dist/ES6/index.js',
        output: {
            file: './dist/custom-elements-hmr-pollyfill.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [terser()]
    },
    {
        input: 'dist/ES6/index.js',
        output: {
            name: 'customElementsHmrPolyfill',
            file: './dist/custom-elements-hmr-pollyfill.iife.js',
            format: 'iife',
            sourcemap: true
        },
        plugins: [terser()]
    },
    {
        input: 'dist/ES6/index.js',
        output: {
            name: 'customElementsHmrPolyfill',
            file: './dist/custom-elements-hmr-pollyfill.umd.js',
            format: 'umd',
            sourcemap: true
        },
        plugins: [terser()]
    },
    {
        input: 'dist/ES6/index.js',
        output: {
            file: './dist/custom-elements-hmr-pollyfill.mjs',
            format: 'esm',
            sourcemap: true
        },
        plugins: [terser()]
    }
];
