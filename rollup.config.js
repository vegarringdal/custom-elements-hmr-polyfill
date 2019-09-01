import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.system.js',
    format: 'system',
  },
  plugins: [
    terser()
  ]
}, {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.amd.js',
    format: 'amd',
  },
  plugins: [
    terser()
  ]
}, {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.cjs.js',
    format: 'cjs',
  },
  plugins: [
    terser()
  ]
}, {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.iife.js',
    format: 'iife',
  },
  plugins: [
    terser()
  ]
}, {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.umd.js',
    format: 'umd',
  },
  plugins: [
    terser()
  ]
}, {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.mjs',
    format: 'esm',
  },
  plugins: [
    terser()
  ]
}]