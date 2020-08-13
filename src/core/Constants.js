import { Point } from '../geometry/Point.js';

export const Modes = {
  SELECT: 'SELECT',
  GRAB: 'GRAB',
  MEASURE: 'MEASURE',
  DRAW: 'DRAW'
};

export const MAP = {
  center: new Point(),
  zoom: 1,
  minZoom: 0,
  maxZoom: 20,
  gridEnabled: true,
  zoomEnabled: true,
  selectEnabled: true,
  mode: Modes.SELECT,
  showGrid: true
};

export const MARKER = {
  position: new Point(),
  minZoom: 1,
  maxZoom: 20
};

export const ICON = {
  url:
    'data:image/png;base64,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',
  size: [128, 128],
  anchor: [64, 64]
};

fabric.Object.prototype.originX = 'center';
fabric.Object.prototype.originY = 'center';

fabric.Object.prototype.lockUniScaling = true;
fabric.Object.prototype.lockScalingFlip = true;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.centeredScaling = true;
// fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.borderColor = 'blue';
fabric.Object.prototype.borderOpacity = 0.7;
fabric.Object.prototype.cornerOpacity = 0.7;
fabric.Object.prototype.cornerStrokeColor = 'blue';

fabric.Object.prototype.borderColor = '#ff0099';
fabric.Object.prototype.cornerColor = '#00eaff';
fabric.Object.prototype.cornerStrokeColor = '#00bbff';

fabric.Object.prototype.objectCaching = false;
fabric.Group.prototype.objectCaching = true;

fabric.Group.prototype.selectionBackgroundColor = 'rgba(45,207,171,0.25)';

fabric.Object.prototype.borderDashArray = [3, 3];

fabric.Object.prototype.padding = 5;

fabric.Object.prototype.getBounds = function getBounds() {
  const coords = [];
  coords.push(new Point(this.left - this.width / 2.0, this.top - this.height / 2.0));
  coords.push(new Point(this.left + this.width / 2.0, this.top + this.height / 2.0));
  return coords;
};
