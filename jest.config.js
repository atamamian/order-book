/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults } = require('jest-config');
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'json-summary', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};