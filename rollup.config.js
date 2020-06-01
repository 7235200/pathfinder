import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

// @rollup/plugin-typescript doesn't work in --watch mode
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins: [
    resolve(),
    typescript(),
    postcss({
      extensions: ['.css']
    }),
    serve('public')
  ]
};
