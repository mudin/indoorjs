class ArrowHead extends fabric.Triangle {
  constructor(points, options) {
    options = options || {};
    options.headLength = options.headLength || 10;
    options.stroke = options.stroke || '#207cca';

    const [x1, y1, x2, y2] = points;
    const dx = x2 - x1;
    const dy = y2 - y1;
    let angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    angle += 90;

    if (options.lastAngle !== undefined) {
      angle = options.lastAngle;
      console.log(`Angle: ${angle}`);
    }

    super({
      angle,
      fill: options.stroke,
      top: y2,
      left: x2,
      height: options.headLength,
      width: options.headLength,
      originX: 'center',
      originY: 'center',
      selectable: false
    });
  }
}
export default ArrowHead;
