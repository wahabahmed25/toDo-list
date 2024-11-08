const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Cleans the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Loads CSS files
            },
            {
                test: /\.(png|jpe?g|gif|svg|avif)$/i, // Image formats
                type: 'asset/resource', // Use asset modules to handle images
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Your HTML file
            filename: 'index.html',
        }),
        new BundleAnalyzerPlugin(), // Optional: Analyzes your bundle
    ],
    devServer: {
        static: path.join(__dirname, 'dist'), // Serve files from dist
        port: 9000,
    },
    mode: 'development',
};
