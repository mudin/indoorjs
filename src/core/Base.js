import EventEmitter2 from 'eventemitter2';

class Base extends EventEmitter2 {
  constructor(options) {
    super(options);
    this._options = options || {};
    Object.assign(this, options);
  }
}

export default Base;
