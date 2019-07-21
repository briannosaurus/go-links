var webpack = require('webpack');


config = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.html$/,
        loader: 'html'},
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/../server/src/static/_scripts',
    publicPath: '/_scripts/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.IgnorePlugin(
        /(^fs$|cptable|jszip|xlsx|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|cpexcel|^path$|^react-native-fs$|^react-native-fetch-blob$)/
    )
  ]
};

// for local dev
if (JSON.stringify(process.env.NODE_ENV || 'development') == '"development"') {
  config.entry.push('webpack-dev-server/client?http://localhost:5007');
  config.entry.push('webpack/hot/only-dev-server');
  config.devServer = {
    contentBase: __dirname + '/../server/src/static',
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;