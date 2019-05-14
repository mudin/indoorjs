import Base from './Base';

class Layer extends Base {
  constructor(options) {
    super(options);
    this.label = this.label!=undefined ? this.label : null;
    this.draggable = this.draggable || false;
    this.zIndex = this.zIndex || 1;
    this.keepOnZoom = this.keepOnZoom || false;

    this.class = this.class || this.constructor.name.toLowerCase();

    this.style = {
      zIndex: this.zIndex,
      class:this.class,
      parent:this,
      keepOnZoom:this.keepOnZoom,
      id:this.id,
      hasControls: false,
      hasBorders:false
    }
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