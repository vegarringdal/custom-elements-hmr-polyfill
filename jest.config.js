module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom-sixteen',
    maxConcurrency: 1,
    verbose: true,
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        'custom-elements-hmr-polyfill': '<rootDir>/src/package/index.ts'
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
            tsconfig: './tsconfig.json'
        }
    },
    collectCoverageFrom: ['src/custom-elements-hmr-polyfill/package/**/*.ts']
};
