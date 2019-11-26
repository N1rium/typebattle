const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = args => {
  return {
    output: {
      filename: 'bundle.min.js',
    },
    devtool: false,
    performance: {
      maxEntrypointSize: 900000,
      maxAssetSize: 900000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
              plugins: [
                '@babel/plugin-transform-regenerator',
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 2008,
      historyApiFallback: true,
    },
  };
};
