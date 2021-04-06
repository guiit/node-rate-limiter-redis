// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');

config.testMatch = ['**/__tests__/unit/**/*spec.ts'];
module.exports = config;
