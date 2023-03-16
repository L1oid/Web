const path = require("path");

const execNodePath = path.dirname(process.execPath);
const globalModulesPath = path.normalize(path.join(execNodePath,"node_modules"));
const babelLoader = path.join(globalModulesPath,"babel-loader");
const babelPreset = path.join(globalModulesPath,"@babel","preset-env");
const regeneratorRuntime = path.join(globalModulesPath,"regenerator-runtime","runtime");


module.exports = {
  mode: 'production',
  entry: [
            regeneratorRuntime,
            './public/js/view/start.js'
  ],
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: babelLoader,
        options: {
          presets: [babelPreset]
        }
      }
    }
  ]
 },
 devServer: {
  static: {
    directory: path.join(__dirname, 'web')
  },
  port: 9090
 }
};