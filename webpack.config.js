const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./demo/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {presets: ["@babel/env"]}
            },
        ]
    },
    resolve: {extensions: ["*", ".js", ".jsx"]},
    output: {
        path: path.resolve(__dirname, "demo-dist/"),
        publicPath: "/demo-dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "demo-public/"),
        port: 3300,
        publicPath: "http://localhost:3300/demo-dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
