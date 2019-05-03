class Axis {
  constructor(orientation, options) {
    Object.assign(this, options);
    this.orientation = orientation || 'x';
  }

  getCoords (values) {
    let coords = [];
    if (!values) return coords;
    for (let i = 0; i < values.length; i++) {
      let t = this.getRatio(values[i]);
      coords.push(t);
      coords.push(0);
      coords.push(t);
      coords.push(1);
    }
    return coords;
  }

  getRange() {
    let len = this.width;
    if(this.orientation==='y') len = this.height;
    return len * this.zoom;
  }

  getRatio (value) {
    return (value - this.offset) / this.range;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  update(options) {
    options = options || {};
    Object.assign(this, options);

    this.range = this.getRange();
  }
}
export default Axis;