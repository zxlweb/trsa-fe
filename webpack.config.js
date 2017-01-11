var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = {
    entry: {
        entry: './src/framework/bootstrap/entry.tsx'
    },
    output: {
        path: path.join(__dirname, 'dist', 'js/page'),
        publicPath: '/dist/js/page/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    devtool: "false",
    externals: {
        'react': 'React',
        'immutable': 'Immutable',
        'react-dom': 'ReactDOM',
        'cookies': 'Cookies',
        'antd': 'antd'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'to-string!css!postcss-loader!less!xnl-less-base-import-loader'
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: 'ts-loader!server-less-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    postcss: function() {
        return [autoprefixer, cssnano({zindex: false, reduceIdents: false})];
    },
    serverLessLoader: {
        loader: '_importLess'
    },
    lessImportLoader: {
        base: process.cwd() + '/src/framework/style/base'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ // prod
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            __WEBPACK_DEV__: false,
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        })
    ],
    resolve: {
        alias: {
            app: process.cwd() + '/src'
        },
        extensions: ['', '.ts', '.tsx', '.js']
    }
};
