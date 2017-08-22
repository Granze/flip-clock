const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "flip-clock.js"),
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,

        include: [
          path.join(__dirname, 'src')
        ],

        exclude: [
          path.join(__dirname, 'node_modules')
        ],

        loader: 'babel-loader',

        options: {
          // plugins: [
          //   "transform-custom-element-classes",
          //   "transform-es2015-classes"
          // ],
          // presets: [
          //   [ 'es2015', {"modules": false} ]
          // ]
        }
      }
    ]
  }
};
