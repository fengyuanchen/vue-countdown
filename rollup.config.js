const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();
const banner = `/*!
 * vue-countdown v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} Xkeshi
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/vue-countdown.js',
      format: 'umd',
      name: 'VueCountdown',
    },
    {
      banner,
      file: 'dist/vue-countdown.common.js',
      format: 'cjs',
    },
    {
      banner,
      file: 'dist/vue-countdown.esm.js',
      format: 'es',
    },
    {
      banner,
      file: 'docs/js/vue-countdown.js',
      format: 'umd',
      name: 'VueCountdown',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
};
