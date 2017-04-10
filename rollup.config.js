const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();

export default {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/vue-countdown.js',
    },
    {
      dest: 'dist/vue-countdown.common.js',
      format: 'cjs',
    },
    {
      dest: 'dist/vue-countdown.esm.js',
      format: 'es',
    },
    {
      dest: 'docs/js/vue-countdown.js',
    },
  ],
  format: 'umd',
  moduleName: 'VueCountdown',
  plugins: [
    babel({
      exclude: '/node_modules/**',
    }),
    nodeResolve({ jsnext: true }),
    commonjs(),
  ],
  banner: `/*!
 * vue-countdown v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`,
};
