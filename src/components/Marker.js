import Layer from "./Layer";
import Group from "./Group";
import Point from "./Point";
import Connector from "./Connector";

class Marker extends Layer {
  constructor(position, options) {
    options = options || {};
    options.zIndex = options.zIndex || 10;
    options.keepOnZoom  = true;
    options.position = new Point(position);
    super(options);
    this.text = this.text || "";
    this.size = this.size || 10;
    
    this.textObj = new fabric.Text(this.text,{
      fontSize:this.size,
    });
    this.circle = new fabric.Circle({
      radius:this.size,
      strokeWidth:2,
      stroke:'red',
      fill: 'white'
    });

    Object.assign(this.style, {
      left:this.position.x,
      top:this.position.y,
      selectionBackgroundColor: false
    });

    this.shape = new Group([this.circle, this.textObj], this.style);
    this.links = this.links || [];

    this.addLinks();
    let vm = this;
    this.shape.on('moving', ()=>{
      vm.onShapeDrag();
    });
  }

  setLinks(links) {
    this.links = links;
    this.addLinks();
  }

  addLinks(){
    this.connectors = [];
    this.links.forEach(link => {
      let connector = new Connector(this,link);
      this.connectors.push(connector); 
    });

    this.addConnectors();
  }

  addConnectors() {
    let vm = this;
    this.connectors.forEach(connector => {
      vm._map.addLayer(connector);
    });
  }

  onAdded() {
    this.addConnectors();
  }

  onShapeDrag() {
    console.log('marker moving');
    var matrix = this.shape.calcTransformMatrix();
    let x = matrix[4];
    let y = matrix[5];
    // this.shape.scaleX = 1./matrix[0];
    // this.shape.scaleY = 1./matrix[3];
    this.position = new Point(x,y);
    this.emit('moving');
  }
}
export default Marker;