const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "../../docs/react-webpack/"),
    filename: "react-webpack.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./coi.serviceworker.js", to: "../../docs/react-webpack/coi.serviceworker.js" },
      ],
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    open: true,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        ignored: /node_modules\/js-randomness-predictor/,
      },
    },
  },
  mode: "development",
};
