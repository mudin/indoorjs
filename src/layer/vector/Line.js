export class Line extends fabric.Line {
  constructor(points, options) {
    options = options || {};
    options.strokeWidth = options.strokeWidth || 1;
    options.class = 'line';
    super(points, options);
    this._strokeWidth = options.strokeWidth;
  }

  _renderStroke(ctx) {
    const stroke = this._strokeWidth / this.canvas.getZoom();
    this.strokeWidth = stroke > 0.01 ? stroke : 0.01;
    super._renderStroke(ctx);
    this.setCoords();
  }
}

export const line = (points, options) => new Line(points, options);

export default Line;
