import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
// import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
    sourceMap: 'inline',
    // plugins: [terser()]
  },
  plugins: [
    typescript(),
    postcss({
      extensions: ['.css']
    }),
  ]
};
