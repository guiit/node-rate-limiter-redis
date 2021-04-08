module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/**/*.ts'],

  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1'
  },

  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: [
    '**/__tests__/integration/*test.ts',
    '**/__tests__/unit/**/*spec.ts'
  ]
};
