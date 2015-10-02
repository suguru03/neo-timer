'use strict';

var fs = require('fs');
var path = require('path');

(function resolve(dirpath, _exports) {
  fs.readdirSync(dirpath).forEach(function(filename) {
    if (path.extname(filename) === '.js' && filename !== 'index.js') {
      var jsname = path.basename(filename, '.js');
      jsname = jsname.charAt().toUpperCase() + jsname.slice(1);
      _exports[jsname] = require('./' + filename);
    } else if (fs.statSync(__dirname + '/' + filename).isDirectory()) {
      _exports[filename] = {};
      resolve(__dirname + '/' + filename, _exports[filename]);
    }
  });
})(__dirname, exports);
