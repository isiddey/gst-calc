var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var PouchDB = require('pouchdb');
var db = new PouchDB('calcStore');
console.log("PouchDB is running.")
var app = express();
var compiler = webpack(config);

const port = process.env.PORT || 9999;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${port}/`);
})