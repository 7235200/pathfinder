import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.BUILD === 'production';

const plugins = [
  resolve(),
  typescript(),
  postcss({
    modules: true,
    extract: true,
    sourceMap: !isProduction,
    minimize: isProduction,
    extensions: ['.css'],
  }),
];

if (isProduction) plugins.push(terser());
else plugins.push(serve('build'));

export default {
  input: 'src/index.tsx',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins,
  // https://github.com/WebReflection/hyperHTML/issues/304
  context: 'null',
  moduleContext: 'null',
};
