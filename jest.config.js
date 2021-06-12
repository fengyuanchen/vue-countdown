module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/*.spec.ts'],
};
