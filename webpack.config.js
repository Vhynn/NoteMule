const path = require('path');

module.exports = {
  entry: './src/notes.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};