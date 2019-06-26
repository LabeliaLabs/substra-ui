module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-syntax-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        'babel-plugin-macros',
        '@babel/plugin-proposal-class-properties',
    ],
};
