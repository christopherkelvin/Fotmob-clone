const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const dotenvFilename = isProduction ? ".env.production" : ".env.development";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.bundle.js",
    },
    plugins: [
      new Dotenv({
        path: dotenvFilename,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
      }),
    ],
  };
};
