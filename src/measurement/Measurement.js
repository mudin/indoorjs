import Measurer from './Measurer';

class Measurement {
  constructor(map) {
    this.map = map;
    this.measurer = null;
  }

  onMouseMove(e) {
    const point = {
      x: e.absolutePointer.x,
      y: e.absolutePointer.y,
    };

    if (this.measurer && !this.measurer.completed) {
      this.measurer.setEnd(point);
      this.map.canvas.requestRenderAll();
    }
  }

  onClick(e) {
    const point = {
      x: e.absolutePointer.x,
      y: e.absolutePointer.y,
    };
    if (!this.measurer) {
      this.measurer = new Measurer({
        start: point,
        end: point,
        map: this.map,
      });

      // this.map.canvas.add(this.measurer);
    } else if (!this.measurer.completed) {
      this.measurer.setEnd(point);
      this.measurer.complete();
    }
  }
}

export default Measurement;
