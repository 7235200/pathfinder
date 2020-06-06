import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
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
      modules: true,
      sourceMap: true,
      extract: true,
      minimize: true,
      extensions: ['.css']
    }),
    serve('public')
  ]
};
