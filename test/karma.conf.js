const puppeteer = require('puppeteer');
const rollupConfig = require('../rollup.config');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },
    files: [
      '../node_modules/vue/dist/vue.js',
      './index.js',
      './specs/**/*.spec.js',
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      './index.js': ['rollup'],
      './specs/**/*.spec.js': ['rollup'],
    },
    reporters: ['mocha', 'coverage-istanbul'],
    rollupPreprocessor: {
      plugins: rollupConfig.plugins,
      output: {
        format: 'iife',
        name: rollupConfig.output[0].name,
        sourcemap: 'inline',
      },
    },
    singleRun: true,
  });
};
