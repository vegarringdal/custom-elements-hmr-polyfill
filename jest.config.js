module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    maxConcurrency: 1,
    moduleDirectories: ['node_modules'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    }
};
