import Base from './Base';

class Layer extends Base {
  constructor(options) {
    super(options);
    this.label = this.label!=undefined ? this.label : null;
    this.draggable = this.draggable || false;
    this.zIndex = this.zIndex || 0;
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