import Base from './Base';
import Point from './Point';

class Layer extends Base {
  constructor(options) {
    super(options);
    this.position = new Point(this.position);
    this.label = this.label!=undefined ? this.label : null;
    this.draggable = this.draggable || false;
  }

  addTo(map) {
    if(!map) {
      if(this._map) {
        this._map.removeLayer(this);
      }
      return;
    }
    this._map = map;
    this._map.addLayer(this);
  }
}

export default Layer;