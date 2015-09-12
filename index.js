'use strict';

var version = +process.versions.node.split('.').shift();
module.exports = version >= 4 ? require('./lib/timer') : require('./timer');

