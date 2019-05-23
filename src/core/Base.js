import Emitter from 'eventemitter2';

class Base extends Emitter {
  constructor(options) {
    super(options);
    this._options = options || {};
    Object.assign(this, options);
  }
}
export default Base;
