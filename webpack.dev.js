const dotenv = require('dotenv');
if (!dotenv.config()) {
    console.log('!! ERROR in webpack.common.js: Missing .env');
    process.exit(-1);
}
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const path = require('path');

// const {
//     WEBSITE_ROOT
// } = process.env;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, "site/")
        },
        compress: true,
        port: 9000
    },
    output: {
        filename: 'main.js',
        path: path.join(__dirname, "site/")
    },
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
    }
})