module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: '\\.(spec|test)\\.ts?$',
    moduleFileExtensions: ['js', 'ts'],
    modulePaths: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/jest.config.js', './src/test/setup.ts'],
    clearMocks: true,
    forceExit: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/app.ts',
        '!src/routes/**/*.ts',
        '!src/config/params/*.ts',
        '!src/config/environment/schemas/*.ts',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['lcov', 'text', 'text-summary'],
    reporters: ['default', './tools/coverage-total-reporter.js'],
    coverageThreshold: {
        src: {
            branches: 60,
            functions: 90,
            lines: 90,
            statements: 90,
        },
        // "src/utils/*.ts": {
        //     statements: 50,
        //     branches: 50,
        //     functions: 50,
        //     lines: 50
        // }
    },
    coveragePathIgnorePatterns: ['./src/middlewares/error/validationError.*.ts', './src/utils/'],
    // testPathIgnorePatterns: []
};
