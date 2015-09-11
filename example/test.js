'use strict';

var Timer = require('../');
var timer = new Timer({
  MAX_LAP_LENGTH: 100
});

var count = 0;
var times = 100;

timer.init().start();

var iter = function() {
  setTimeout(function() {
    clearTimeout(iter);
    timer.lap();
    if (count === times) {
      console.log(timer.result());
    } else {
      iter();
    }
  }, Math.random() * 10 * ++count);
};

iter();
