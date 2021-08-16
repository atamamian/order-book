/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults } = require('jest-config');
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.tsx',
  ],
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
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/view/components$1',
    '^@/constants(.*)$': '<rootDir>/src/constants$1',
    '^@/containers(.*)$': '<rootDir>/src/view/containers$1',
    '^@/helpers(.*)$': '<rootDir>/src/helpers$1',
    '^@/store(.*)$': '<rootDir>/src/store$1',
    '^@/types(.*)$': '<rootDir>/src/types$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};