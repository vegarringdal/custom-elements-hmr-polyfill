
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'dist/ES6/index.js',
  output: {
    file: './dist/custom-elements-hmr-pollyfill.js',
    format: 'esm',
  },
  plugins: [
    terser()
  ]
}