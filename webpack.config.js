const path = require("path"),
  HTMLWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
  TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: { // mv same libs imports to general place
      chunks: "all"
    }
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(), // minify css
      new TerserWebpackPlugin(), // minify js
    ];
  }

  return config;
};

module.exports = {
  // base url
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // freeload server, saved all files data in memory
  devServer: {
    port: 4205,
    hot: isDev, // hmr if mode is dev
  },

  entry: {
    // divide files into separate bundles
    main: "./index.js",
    analytics: "./analytics.js"
  },

  output: {
    // where to compile
    filename: "[name].[contenthash].js", //bundle name
    path: path.resolve(__dirname, "dist") // where
  },

  resolve: {
    // what extensions are default?
    extensions: [".js", ".json"],
    // alias path
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src")
    }
  },

  optimization: optimization(),

  plugins: [
    // copy html endpoint to dist with all dynamic links and scripts
    new HTMLWebpackPlugin({
      // title: 'Webpack title', // doesn't work if template exist
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev
      },
    }),
    new CleanWebpackPlugin(), // clean dist folder
    new CopyWebpackPlugin([
      // copy all files to dist
      {
        from: path.resolve(__dirname, "src/favicon.ico"),
        to: path.resolve(__dirname, "dist")
      }
    ]),
    new MiniCssExtractPlugin({ // mv all css files to single file
      filename: "[name].[contenthash].css"
    })
  ],

  module: {
    rules: [
      {
        // if test reg exp true -> use loader
        test: /\.css$/, // reg exp
        // loader works from right-to-left: style-loader <- css-loader <- webpack
        /*
         * style-loader - add styles to head of html
         * css-loader - provides import css to js components
         */
        // use: ["style-loader", "css-loader"]
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev, // hot module replacement - refresh single entities without reloading all page
              reloadAll: true,
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"]
      }
    ]
  }
};
