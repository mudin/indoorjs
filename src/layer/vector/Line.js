export class Line extends fabric.Line {
  constructor(points, options) {
    options = options || {};
    options.strokeWidth = options.strokeWidth || 1;
    super(points, options);
    this._strokeWidth = options.strokeWidth;
  }

  _renderStroke(ctx) {
    this.strokeWidth = this._strokeWidth / this.canvas.getZoom();
    super._renderStroke(ctx);
  }
}

export const line = (points, options) => new Line(points, options);

export default Line;
