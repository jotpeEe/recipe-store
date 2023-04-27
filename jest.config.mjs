// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/client/components/$1',
        '^@components(.*)$': '<rootDir>/client/components',
        '^@constants/(.*)$': '<rootDir>/utils/constants/$1',
        '^@constants(.*)$': '<rootDir>/utils/constants',
        '^@contexts/(.*)$': '<rootDir>/client/contexts/$1',
        '^@contexts(.*)$': '<rootDir>/client/contexts',
        '^@icons(.*)$': '<rootDir>/client/components/icons',
        '^@hooks(.*)$': '<rootDir>/client/hooks',
        '^@lib(.*)$': '<rootDir>/client/lib',
        '^@generated/graphql': '<rootDir>/client/generated/graphql',
        '^@redux(.*)$': '<rootDir>/client/redux',
    },
    testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
