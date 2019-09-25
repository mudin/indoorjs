import ArrowHead from './ArrowHead';

export class Arrow extends fabric.Group {
  constructor(point, options) {
    options = options || {};
    options.strokeWidth = options.strokeWidth || 5;
    options.stroke = options.stroke || '#7db9e8';
    options.class = 'arrow';
    super(
      [],
      Object.assign(options, {
        evented: false
      })
    );
    this.pointArray = [point, Object.assign({}, point)];
    this.options = options;
    this.draw();
  }

  draw() {
    if (this.head) {
      this.remove(this.head);
    }

    if (this.polyline) {
      this.remove(this.polyline);
    }

    this.polyline = new fabric.Polyline(
      this.pointArray,
      Object.assign(this.options, {
        strokeLineJoin: 'round',
        fill: false
      })
    );

    this.addWithUpdate(this.polyline);

    const lastPoints = this.getLastPoints();

    const p1 = new fabric.Point(lastPoints[0], lastPoints[1]);
    const p2 = new fabric.Point(lastPoints[2], lastPoints[3]);
    const dis = p1.distanceFrom(p2);
    console.log(`dis = ${dis}`);

    this.head = new ArrowHead(
      lastPoints,
      Object.assign(this.options, {
        headLength: this.strokeWidth * 2,
        lastAngle: dis <= 10 ? this.lastAngle : undefined
      })
    );

    if (dis > 10) {
      this.lastAngle = this.head.angle;
    }
    this.addWithUpdate(this.head);
  }

  addPoint(point) {
    this.pointArray.push(point);
    this.draw();
  }

  addTempPoint(point) {
    const len = this.pointArray.length;
    const lastPoint = this.pointArray[len - 1];
    lastPoint.x = point.x;
    lastPoint.y = point.y;
    this.draw();
  }

  getLastPoints() {
    const len = this.pointArray.length;
    const point1 = this.pointArray[len - 2];
    const point2 = this.pointArray[len - 1];
    return [point1.x, point1.y, point2.x, point2.y];
  }

  setColor(color) {
    this._objects.forEach(obj => {
      obj.setColor(color);
    });
  }
}

export const arrow = (points, options) => new Arrow(points, options);

export default Arrow;
