module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        'babel-plugin-macros',
        '@babel/plugin-proposal-class-properties',
    ],
    env: {
        es: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
            ],
        },
        cjs: {
            presets: [
                [
                    '@babel/preset-env',
                ],
            ],
        },
    },
};

