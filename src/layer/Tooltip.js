import { Layer } from './Layer';
import { Group } from './Group';
import { Point } from '../geometry/Point';

class Tooltip extends Layer {
  constructor(position, options) {
    options = options || {};
    options.zIndex = options.zIndex || 300;
    options.keepOnZoom = true;
    options.position = new Point(position);
    options.class = 'tooltip';
    super(options);

    this.content = this.content || '';
    this.size = this.size || 10;
    this.textColor = this.textColor || 'black';
    this.fill = this.fill || 'white';
    this.stroke = this.stroke || 'red';

    Object.assign(this.style, {
      left: this.position.x,
      top: this.position.y
    });

    if (this.content) {
      this.textObj = new fabric.Text(this.content, {
        fontSize: this.size,
        fill: this.textColor
      });
    }
    this.init();
  }

  init() {
    const objects = [];
    if (this.textObj) {
      objects.push(this.textObj);
    }
    this.shape = new Group(objects, this.style);
    process.nextTick(() => {
      this.emit('ready');
    });
  }
}
export default Tooltip;
