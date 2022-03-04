const dotenv = require("dotenv");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

dotenv.config({ path: ".env" });

const mode = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/index.js"),
  },
  devtool: "source-map",
  watch: mode === "development" ? true : false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000,
  },
  mode: "production",
  output: {
    filename: "js/[name].min.js",
    chunkFilename: "js/chunk-[name].[contenthash].js",
    path: path.join(__dirname, "..", "assets/dist"),
  },
  resolve: {
    extensions: [".css", ".scss", ".js", ".jsx", ".json"],
    alias: {
      "@scss": path.resolve(__dirname, "..", "src/scss"),
      "@css": path.resolve(__dirname, "..", "src/css"),
      "@node_modules": path.resolve(__dirname, "..", "node_modules"),
      "~bootstrap": path.resolve(__dirname, "..", "node_modules/bootstrap"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-import"), require("autoprefixer")],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "..", "src/scss")],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(eot|gif|otf|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/main.min.css",
    }),
  ],
};
