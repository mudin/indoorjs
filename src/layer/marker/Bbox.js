import { Rect } from '../vector';
import { Layer } from '../Layer';

export class Bbox extends Layer {
  constructor(bounds, options) {
    options = options || {};
    options.bounds = bounds;
    options.class = 'bbox';
    super(options);
    if (!this.bounds) {
      console.error('bounds is missing!');
      return;
    }
    this.style = {
      strokeWidth: 1,
      stroke: this.color || 'black',
      fill: this.fill || '#88888822',
      class: this.class,
      parent: this
    };
    this.draw();
  }

  setBounds(bounds) {
    this.bounds = bounds;
    this.draw();
  }

  draw() {
    this.coords = {
      left: this.bounds[0][0],
      top: this.bounds[0][1],
      width: this.bounds[1][0] - this.bounds[0][0],
      height: this.bounds[1][1] - this.bounds[0][1]
    };

    if (this.shape) {
      this.shape.set(this.coords);
    } else {
      Object.assign(this.style, this.coords);
      this.shape = new Rect(this.style);
    }
  }
}
export const bbox = (bounds, options) => new Bbox(bounds, options);
export default Bbox;
