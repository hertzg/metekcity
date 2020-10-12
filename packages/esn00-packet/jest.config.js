module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testPathIgnorePatterns: ['dist/*'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      statements: 70,
      lines: 70,
    },
  },

  testMatch: [
    '**/__tests__/**/*.+(spec|test).[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};
