
class Point extends fabric.Point {
  constructor(...params) {
    let x,y;
    if (params.length > 1) {
      [x,y] = params;
    } else if (params.length === 0 || !params[0]) {
      [x, y] = [0, 0];
    } else if (Object.prototype.hasOwnProperty.call(params[0], 'x')) {
      x = params[0].x;
      y = params[0].y;
    } else if (params[0].length){
      x = params[0][0];
      y = params[0][1];
    }
    else {
      console.error('Parameter for Point is not valid. Use Point(x,y) or Point({x,y}) or Point([x,y])', params);
    }

    super(x,y);
  }

  setX(x) {
    this.x = x || 0;
  }

  setY(y) {
    this.y = y || 0;
  }

  getArray() {
    return [this.x, this.y];
  }
}

export default Point;