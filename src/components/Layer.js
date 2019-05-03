import Base from './Base';
import Point from './Point';

class Layer extends Base {
  constructor(options) {
    super(options);
    this.position = new Point(this.options.position);
    this.label = this.options.label!=undefined ? this.options.label : null;
    this.draggable = this.options.draggable || false;
    this.setMap(this.options.map);
  }

  setMap(map) {
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