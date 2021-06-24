const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = (_env, options) => {
  const devMode = options.mode !== "production";

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin({})
      ]
    },
    entry: {
      "app": glob.sync("./vendor/**/*.js").concat(["./js/app.js"]),
      // "lib": "./wasm/hello-wasm/lib.js",
      // "game-of-life": "./wasm/game-of-life/lib.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../priv/static/js"),
      publicPath: "/js/"
    },
    devtool: devMode ? "eval-cheap-module-source-map" : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "../css/app.css" }),
      new CopyWebpackPlugin({
        patterns: [{ from: "static/", to: "./" }]
      }),
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "./wasm/hello-wasm/"), // Define where the root of the rust code is located (where the cargo.toml file is located)
        crateDirectory: path.resolve(__dirname, "./wasm/game-of-life/"),
        crateDirectory: path.resolve(__dirname, "./wasm/rustycheckers/"),
      }),
    ],
    experiments: {
      asyncWebAssembly: true,
    },
    // https://stackoverflow.com/questions/66734558/is-it-possible-to-use-wasm-bindgen-with-webpack-5
    // experiments: {
    //   syncWebAssembly: true
    // },
  }
};
