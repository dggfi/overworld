const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].bundle.js'
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Test',
        //     template: './templates/index.html'
        // }),
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.json"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: MiniCssExtractPlugin.loader,
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ["css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                loader: "postcss-loader",
                exclude: /node_modules/,
                options: {
                    postcssOptions: {
                        plugins: [
                            tailwindcss("./tailwind.config.js"),
                            autoprefixer
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    "sass-loader",
                    {   
                        loader: "sass-loader",
                        options: {
                            additionalData: `$env: "production";` 
                        }
                    }
                ],
                exclude: /node_modules/,
            },
        ]
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            `...`
        ]
    }
})