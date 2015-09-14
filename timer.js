/* global performance */

(function() {

  'use strict';

  var root = this;
  var objectTypes = {
    'object': true,
    'function': true
  };

  function extend(Source, Target) {
    var source = new Source();
    for (var key in source) {
      Target.prototype[key] = source[key];
    }
  }

  function Timer() {
    this._startTime = null;
    this._diff = null;
    this._lapTime = [];
    this._before = 0;
    this._stats = {
      count: 0,
      sum: 0,
      mean: 0,
      lapTime: []
    };
    this.MAX_LAP_LENGTH = 10000;
  }

  Timer.prototype.init = function() {
    this._startTime = null;
    this._diff = null;
    this._lapTime = [];
    return this;
  };

  Timer.prototype.lap = function() {
    var diff = this.diff();
    var before = this._before;
    var lapTime = this._stats.lapTime;
    this._before = diff;
    diff -= before;
    this._stats.count++;
    this._stats.sum += diff;

    if (this.MAX_LAP_LENGTH === 0) {
      return this;
    }

    lapTime.push(diff);
    if (lapTime.length > this.MAX_LAP_LENGTH) {
      lapTime.shift();
    }
    return this;
  };

  Timer.prototype.result = function() {
    this._stats.mean = this._stats.sum / this._stats.count;
    return this._stats;
  };

  Timer.prototype.start = undefined;
  Timer.prototype.diff = undefined;


  /**
   * using process.hrtime
   * @param {Object} [option]
   * @param {integer} [option.MAX_LAP_LENGTH=10000]
   */
  function NodeTimer(option) {
    option = option || {};
    this.MAX_LAP_LENGTH = option.MAX_LAP_LENGTH || this.MAX_LAP_LENGTH;
  }
  extend(Timer, NodeTimer);

  NodeTimer.prototype.start = function () {
    this._startTime = process.hrtime();
    return this;
  };

  NodeTimer.prototype.diff = function() {
    var diff = process.hrtime(this._startTime);
    // ns -> s
    this._diff = (diff[0] * 1e9 + diff[1]) / 1e9;
    return this._diff;
  };

  /**
   * using performance.now
   * @param {Object} [option]
   * @param {integer} [option.MAX_LAP_LENGTH=10000]
   */
  function PerformanceTimer(option) {
    option = option || {};
    this.MAX_LAP_LENGTH =option.MAX_LAP_LENGTH || this.MAX_LAP_LENGTH;
  }
  extend(Timer, PerformanceTimer);

  PerformanceTimer.prototype.start = function () {
    this._startTime = performance.now();
    return this;
  };

  PerformanceTimer.prototype.diff = function() {
    // ms -> s
    this._diff = (performance.now() - this._startTime) / 1e3;
    return this._diff;
  };

  /**
   * using Date
   * @param {Object} [option]
   * @param {integer} [option.MAX_LAP_LENGTH=10000]
   */
  function DateTimer(option) {
    option = option || {};
    this.MAX_LAP_LENGTH =option.MAX_LAP_LENGTH || this.MAX_LAP_LENGTH;
  }

  DateTimer.prototype.start = function () {
    this._startTime = Date.now();
    return this;
  };

  DateTimer.prototype.diff = function() {
    // ms -> s
    this._diff = (Date.now() - this._startTime) / 1e3;
    return this._diff;
  };

  if (objectTypes[typeof define] && define && define.amd) {
    // AMD / RequireJS
    define([], function() {
      return getTimer();
    });
  } else if (objectTypes[typeof module] && module && module.exports) {
    // Node.js
    module.exports = getTimer();
  } else {
    root.Timer = getTimer();
  }

  function getTimer() {
    if (objectTypes[typeof process] && process && process.hrtime) {
      return NodeTimer;
    }
    if (objectTypes[typeof performance] && performance && performance.now) {
      return PerformanceTimer;
    }
     return DateTimer;
  }
})();
