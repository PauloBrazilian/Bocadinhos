"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/src/__test__';
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [`${baseDir}/**/*.ts`],
    testMatch: [`${baseTestDir}/**/*.test.ts`],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map