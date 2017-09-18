const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue-countdown.js',
      format: 'umd',
    },
    {
      file: 'dist/vue-countdown.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/vue-countdown.esm.js',
      format: 'es',
    },
    {
      file: 'docs/js/vue-countdown.js',
      format: 'umd',
    },
  ],
  name: 'VueCountdown',
  plugins: [
    nodeResolve({
      jsnext: true,
    }),
    commonjs(),
    babel(),
  ],
  banner: `/*!
 * vue-countdown v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} Xkeshi
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`,
};
