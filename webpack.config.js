const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-cheap-source-map",
    resolve: {
        extensions: [".ts", ".js"],
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.html$/,
                use: [
                {
                    loader: "html-loader",
                    options: { minimize: true }
                }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
        })
    ]
};