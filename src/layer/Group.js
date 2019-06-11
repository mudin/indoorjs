import { Point } from '../geometry/Point';

export class Group extends fabric.Group {
  constructor(objects, options) {
    options = options || {};
    super(objects, options);
  }

  getBounds() {
    const coords = [];
    coords.push(new Point(this.left - this.width / 2.0, this.top - this.height / 2.0));
    coords.push(new Point(this.left + this.width / 2.0, this.top + this.height / 2.0));
    return coords;
  }
}

export const group = (objects, options) => new Group(objects, options);

export default Group;
