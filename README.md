neo-timer
--

neo-timer can be used as a timer or stopwatch.

The timer is selected automatically by your environment.

## functions

### init

### start

### diff

### lap

### result


## example

```js

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

```

![graph](https://cloud.githubusercontent.com/assets/8013633/9806130/b987462c-587b-11e5-8d7e-c5ed9a9a564a.png)
