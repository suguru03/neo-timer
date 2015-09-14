'use strict';

class Timer {

  constructor() {
    this._startTime = null;
    this._diff = null;
    this._before = 0;
    this._lapTime = [];
    this._stats = {
      count: 0,
      sum: 0,
      mean: 0,
      lapTime: []
    };
    this.MAX_LAP_LENGTH = 10000;
  }

  init() {
    this._startTime = null;
    this._diff = null;
    this._lapTime = [];
    return this;
  }

  lap() {
    let diff = this.diff();
    let before = this._before;
    let lapTime = this._stats.lapTime;
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
  }

  result() {
    this._stats.mean = this._stats.sum / this._stats.count;
    return this._stats;
  }

  start() {
  }

  diff() {
  }
}

class NodeTimer extends Timer {

  constructor(option) {
    option = option || {};
    super();
    this.MAX_LAP_LENGTH = option.MAX_LAP_LENGTH || this.MAX_LAP_LENGTH;
  }

  start() {
    this._startTime = process.hrtime();
  }

  diff() {
    let diff = process.hrtime(this._startTime);
    // ns -> s
    this._diff = (diff[0] * 1e9 + diff[1]) / 1e9;
    return this._diff;
  }
}

export default NodeTimer;
