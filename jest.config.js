module.exports = {
    snapshotSerializers: ['jest-emotion'],
    moduleNameMapper: {
        'react-syntax-highlighter/dist/esm/styles/prism': '<rootDir>/__mocks__/prismMock.js'
    },
};
