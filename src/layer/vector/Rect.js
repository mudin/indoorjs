export class Rect extends fabric.Rect {
  constructor(points, options) {
    options = options || {};
    options.strokeWidth = options.strokeWidth || 1;
    options.class = 'rect';
    super(points, options);
    this._strokeWidth = options.strokeWidth;
  }

  _renderStroke(ctx) {
    this.strokeWidth = this._strokeWidth / this.canvas.getZoom();
    super._renderStroke(ctx);
  }
}

export const rect = (points, options) => new Rect(points, options);

export default Rect;
