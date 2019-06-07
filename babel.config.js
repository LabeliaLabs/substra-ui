module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        ["emotion", {"sourceMap": true}],
        "@babel/plugin-syntax-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
    ],
};