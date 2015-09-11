'use strict';

var Timer = require('../');
var timer = new Timer({
  MAX_LAP_LENGTH: 10
});

var result = timer
  .init()
  .start()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .lap()
  .result();

console.log(result);
