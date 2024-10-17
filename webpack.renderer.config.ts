import dotenv from 'dotenv';
if (!dotenv.config()) {
    console.log('!! ERROR in webpack.common.js: Missing .env');
    process.exit(-1);
}
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// import path from 'path';
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import ReactRefreshTypeScript from 'react-refresh-typescript';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const isDevelopment = process.env.NODE_ENV !== 'production';
import type { Configuration } from 'webpack';
console.log(`isDevelopment: ${isDevelopment}`);

export const rendererConfig: Configuration = {
    // target: 'web',
    // mode: 'development',
    devtool: 'eval-source-map',
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, "site/")
    //     },
    //     compress: false,
    //     port: 9000
    // },
    // output: {
    //     filename: 'main.js',
    //     path: path.join(__dirname, "site/")
    // },
    module: {
        rules: [
            {
                test: /native_modules[\\].+\.node$/,
                use: 'node-loader'
            },
            {
                test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
                parser: { amd: false },
                use: {
                    loader: '@vercel/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules'
                    }
                }
            },
            {
                test: /\.tsx?$/i,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.json",
                    // getCustomTransformers: () => ({
                    //     before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean)
                    // })
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ["style-loader"],
                exclude: /node_modules/
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
                            additionalData: `$env: "development";`
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    plugins: [
        // isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Overworld',
            filename: 'index.html',
            template: './templates/index.html'
        })
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css', '.scss']
    }
}