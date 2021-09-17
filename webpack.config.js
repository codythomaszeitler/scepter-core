const path = require('path');

console.log(path.__dirname);

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/, use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                ],
                type: 'javascript/auto'
            }
        ]
    },
    entry: './src/index.ts',
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'inline-source-map',
    output : {
        library: 'scepter-core',
        libraryTarget : 'umd',
        filename : 'scepter-core.ts'
    }
}