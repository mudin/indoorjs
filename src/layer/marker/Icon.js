import { ICON } from '../../core/Constants';

export class Icon extends fabric.Image {
  constructor(options) {
    super(options);
    this.defaults = Object.assign({}, ICON);
    Object.assign({}, this.defaults);
    Object.assign({}, this._options);
  }
}
export const icon = (options) => new Icon(options);
