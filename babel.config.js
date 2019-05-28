module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
       ["emotion", { "sourceMap": true }],
    ],
};