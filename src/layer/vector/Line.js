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
    this.strokeWidth = stroke > 0.1 ? stroke : 0.1;
    super._renderStroke(ctx);
  }
}

export const line = (points, options) => new Line(points, options);

export default Line;
