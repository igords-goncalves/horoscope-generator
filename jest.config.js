const nextJest = require('next/jest')

const creatJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jsdom",
  preset: 'ts-jest',
};

module.exports = creatJestConfig(config);
