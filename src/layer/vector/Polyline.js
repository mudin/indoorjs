import { Layer } from '../Layer';
import { Point } from '../../geometry/Point';
import { Group } from '../Group';

export class Polyline extends Layer {
  constructor(_points, options) {
    options = options || {};
    options.points = _points || [];
    super(options);
    this.lines = [];
    this.class = 'polyline';
    this.strokeWidth = 1;

    this.lineOptions = {
      strokeWidth: this.strokeWidth,
      stroke: this.color || 'grey',
      fill: this.fill || false
    };

    this.shape = new Group([], {
      selectable: false,
      hasControls: false,
      class: this.class,
      parent: this
    });

    this.setPoints(this._points);
  }

  addPoint(point) {
    this.points.push(new Point(point));

    if (this.points.length > 1) {
      const i = this.points.length - 1;
      const j = this.points.length - 2;
      const p1 = this.points[i];
      const p2 = this.points[j];
      const line = new fabric.Line(p1.getArray().concat(p2.getArray()), this.lineOptions);
      this.lines.push(line);
      this.shape.addWithUpdate(line);
    }
  }

  setStrokeWidth(strokeWidth) {
    this.lines.forEach(line => {
      line.setStrokeWidth(strokeWidth);
    });
  }

  setPoints(points = []) {
    this.removeLines();
    this.points = [];
    for (let i = 0; i < points.length; i += 1) {
      const point = new Point(points[i]);
      this.points.push(point);
      this.addPoint();
    }
  }

  removeLines() {
    for (let i = 0; i < this.lines.length; i += 1) {
      this.shape.remove(this.lines[i]);
    }
    this.lines = [];
  }
}

export const polyline = (points, options) => new Polyline(points, options);
