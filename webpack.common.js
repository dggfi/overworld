const path = require('path');
const dotenv = require('dotenv');
if (!dotenv.config()) {
    console.log('ERROR in webpack.common.js:', 'Missing .env');
    process.exit(-1);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
process.traceDeprecation = true;

module.exports = {
    target: 'web',
    entry: './src/main.tsx',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tryhard Gaming',
            filename: 'index.html',
            template: './templates/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass'],
        alias: {
            three: path.resolve('./node_modules/three')
        }
    }
}