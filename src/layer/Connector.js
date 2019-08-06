import { Layer } from './Layer';
import { Line } from './vector/Line';

export class Connector extends Layer {
  constructor(start, end, options) {
    options = options || {};
    options.zIndex = options.zIndex || 10;
    options.class = 'connector';
    super(options);

    if (!start || !end) {
      console.error('start or end is missing');
      return;
    }
    this.start = start;
    this.end = end;
    this.strokeWidth = this.strokeWidth || 1;

    Object.assign(this.style, {
      strokeWidth: this.strokeWidth,
      stroke: this.color || 'grey',
      fill: this.fill || false,
      selectable: false
    });

    this.draw();

    this.registerListeners();
  }

  registerListeners() {
    const vm = this;
    this.start.on('update:links', () => {
      vm.shape.set({
        x1: vm.start.position.x,
        y1: vm.start.position.y
      });
    });

    this.end.on('update:links', () => {
      vm.shape.set({
        x2: vm.end.position.x,
        y2: vm.end.position.y
      });
    });
  }

  draw() {
    this.shape = new Line(
      [this.start.position.x, this.start.position.y, this.end.position.x, this.end.position.y],
      this.style
    );
    // this.shape.setCoords();
  }

  redraw() {
    this.shape.set({
      x1: this.start.position.x,
      y1: this.start.position.y,
      x2: this.end.position.x,
      y2: this.end.position.y
    });
  }

  setStart(start) {
    this.start = start;
    this.redraw();
  }

  setEnd(end) {
    this.end = end;
    this.redraw();
  }

  setColor(color) {
    this.color = color;
    this.style.stroke = color;
    this.shape.set('stroke', color);
    if (this.shape.canvas) {
      this.shape.canvas.renderAll();
    }
  }

  setStrokeWidth(strokeWidth) {
    this.strokeWidth = strokeWidth;
    this.style.strokeWidth = strokeWidth;
    this.shape.set('strokeWidth', strokeWidth);
    if (this.shape.canvas) {
      this.shape.canvas.renderAll();
    }
  }
}

export const connector = (start, end, options) => new Connector(start, end, options);

export default Connector;
