class Point {
  constructor(...params) {
    if (params.length > 1) {
      [this.x, this.y] = params;
    } else if (params.length === 0) {
      [this.x, this.y] = [0, 0];
    } else if (Object.prototype.hasOwnProperty.call(params[0], 'x')) {
      this.x = params[0].x;
      this.y = params[0].y;
    } else if (params[0].length){
      this.x = params[0][0];
      this.y = params[0][1];
    }
    else {
      console.error('Parameter for Point is not valid. Use Point(x,y) or Point({x,y}) or Point([x,y])', params);
    }
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