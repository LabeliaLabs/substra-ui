module.exports = {
    snapshotSerializers: ['jest-emotion'],
    moduleNameMapper: {
        'react-syntax-highlighter/dist/esm/styles/prism': '<rootDir>/test/mocks/prismMock.js',
    },
    setupFilesAfterEnv: [
        '<rootDir>/test/setup.js',
    ]
};
