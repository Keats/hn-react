const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/app/index",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: "minimal",  // shhh webpack
    hot: true
  },
  plugins: [
    // needed by hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({template: "index.html"}),
  ],
  module: {
    rules: [
      { enforce: "pre", test: /\.tsx?$/, loader: "tslint-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require("autoprefixer")({browsers: ["last 2 versions"]})
                ];
              }
            }
          },
          {loader: "sass-loader"},
        ]
      }
    ]
  }
};

