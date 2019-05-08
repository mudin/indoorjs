import Layer from "./Layer";
import Point from "./Point";

class Polyline extends Layer {
  constructor(_points, options) {
    options = options || {};
    options.points = _points || [];
    super(options);
    this.lines = []
    
    this.lineOptions = {
      strokeWidth: 2,
      stroke: this.color || 'grey',
      fill: this.fill || false
    }

    this.shape = new fabric.Group([], {
      selectable: false,
      hasControls: false
    });
    
    this.setPoints(this._points);
  }

  addPoint(point) {
    this.points.push(new Point(point));
    
    if(this.points.length>1) {
      let i = this.points.length - 1;
      let j = this.points.length - 2;
      let p1 = this.points[i];
      let p2 = this.points[j];
      let line = new fabric.Line(p1.getArray().concat(p2.getArray()), this.lineOptions);
      this.lines.push(line);
      this.shape.addWithUpdate(line);
    }
  }

  setPoints(points = []) {
    this.removeLines();
    this.points = [];
    for (let i = 0; i < points.length; i++) {
      const point = new Point(points[i]);
      this.points.push(point);
      this.addPoint();
    }
  }

  removeLines() {
    for (let i = 0; i < this.lines.length; i++) {
      this.shape.remove(this.lines[i]);
    }
    this.lines = [];
  }
}
export default Polyline;