const path = require("path"),
  HTMLWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"),
  TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const config = {
    splitChunks: {
      // mv same libs imports to general place
      chunks: "all"
    }
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(), // minify css
      new TerserWebpackPlugin() // minify js
    ];
  }

  return config;
};

const filename = ext => {
  return isDev ? `[name].[hash].${ext}` : `[name].${ext}`;
};

module.exports = {
  // base url
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // freeload server, saved all files data in memory
  devServer: {
    port: 4205,
    hot: isDev // hmr if mode is dev
  },

  entry: {
    // divide files into separate bundles
    main: ["@babel/polyfill", "./index.js"],
    analytics: "./analytics.ts"
  },

  output: {
    // where to compile
    filename: filename("js"), //bundle name
    path: path.resolve(__dirname, "dist") // where
  },

  resolve: {
    // what extensions are default?
    extensions: [".js", ".json", ".ts"],
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
      }
    }),
    new CleanWebpackPlugin(), // clean dist folder
    new CopyWebpackPlugin([
      // copy all files to dist
      {
        from: path.resolve(__dirname, "src/favicon.ico"),
        to: path.resolve(__dirname, "dist")
      }
    ]),
    new MiniCssExtractPlugin({
      // mv all css files to single file
      filename: filename("css")
    })
  ],

  module: {
    rules: [
      {
        // if test reg exp true -> use loader
        test: /\.(s[ac]ss|css)$/, // reg exp
        // loader works from right-to-left: style-loader <- css-loader <- sass-loader <- webpack
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
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            //here you can add presets
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
        // loader: 'babel-loader', // if you add single loader use key `loader`
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
        // loader: 'babel-loader', // if you add single loader use key `loader`
      }
    ]
  }
};
