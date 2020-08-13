import { Point } from '../geometry/Point';

class Measurer {
  constructor(options) {
    options = options || {};
    options.hasBorders = false;
    options.selectable = false;
    options.hasControls = false;
    // options.evented = false;
    options.class = 'measurer';
    options.scale = options.scale || 1;

    // super([], options);

    this.options = options || {};
    this.start = this.options.start;
    this.end = this.options.end;

    this.canvas = this.options.map.canvas;

    this.completed = false;

    if (!this.start || !this.end) {
      throw new Error('start must be defined');
    }
    this.draw();
  }

  clear() {
    if (this.objects) {
      this.objects.forEach((object) => {
        this.canvas.remove(object);
      });
    }
  }

  draw() {
    this.clear();

    let { start, end } = this;
    start = new Point(start);
    end = new Point(end);

    const center = start.add(end).multiply(0.5);

    this.line = new fabric.Line([start.x, start.y, end.x, end.y], {
      stroke: this.options.stroke || '#3e82ff',
      hasControls: false,
      hasBorders: false,
      selectable: false,
      evented: false,
      strokeDashArray: [5, 5],
    });

    const lineEndOptions = {
      left: start.x,
      top: start.y,
      strokeWidth: 1,
      radius: this.options.radius || 1,
      fill: this.options.fill || '#3e82ff',
      stroke: this.options.stroke || '#3e82ff',
      hasControls: false,
      hasBorders: false,
    };

    const lineEndOptions2 = {
      left: start.x,
      top: start.y,
      strokeWidth: 1,
      radius: this.options.radius || 5,
      fill: this.options.fill || '#3e82ff33',
      stroke: this.options.stroke || '#3e82ff',
      hasControls: false,
      hasBorders: false,
    };

    this.circle1 = new fabric.Circle(lineEndOptions2);
    this.circle2 = new fabric.Circle({
      ...lineEndOptions2,
      left: end.x,
      top: end.y,
    });

    this.circle11 = new fabric.Circle(lineEndOptions);
    this.circle22 = new fabric.Circle({
      ...lineEndOptions,
      left: end.x,
      top: end.y,
    });

    let text = Math.round(start.distanceFrom(end));
    text = `${text / 100} m`;
    this.text = new fabric.Text(text, {
      textBackgroundColor: 'black',
      fill: 'white',
      left: center.x,
      top: center.y - 10,
      fontSize: 12,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      evented: false,
    });

    this.objects = [this.line, this.text, this.circle11, this.circle22, this.circle1, this.circle2];

    this.objects.forEach((object) => {
      this.canvas.add(object);
    });

    this.line.hasControls = false;
    this.line.hasBorders = false;
    this.line.selectable = false;
    this.line.evented = false;

    this.registerListeners();
  }

  setStart(start) {
    this.start = start;
    this.draw();
  }

  setEnd(end) {
    this.end = end;
    this.draw();
  }

  complete() {
    this.completed = true;
  }

  registerListeners() {
    this.circle2.on('moving', (e) => {
      this.setEnd(e.pointer);
    });

    this.circle1.on('moving', (e) => {
      this.setStart(e.pointer);
    });
  }

  applyScale(scale) {
    this.start.x *= scale;
    this.start.y *= scale;
    this.end.x *= scale;
    this.end.y *= scale;
    this.draw();
  }
}
export default Measurer;
