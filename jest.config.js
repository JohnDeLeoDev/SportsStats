module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': '@swc/jest',
    },
    moduleNameMapper: {
        '^@/app/(.*)$': '<rootDir>/src/app/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
