module.exports = {
    snapshotSerializers: ['jest-emotion'],
    moduleNameMapper: {
        'react-syntax-highlighter/dist/esm/styles/prism': '<rootDir>/test/mocks/prismMock.js',
    },
    setupFilesAfterEnv: [
        'react-testing-library/cleanup-after-each',
        '<rootDir>/test/setup.js',
    ],
};
