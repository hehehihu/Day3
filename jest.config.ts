export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFiles: ['<rootDir>/src/jest.env.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],   
  };