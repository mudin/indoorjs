import Layer from "./Layer";
import Point from "./Point";

class Marker extends Layer {
  constructor(position, options) {
    options.position = new Point(position);
    super(options);
    this.class = 'marker';
    this.text = this.text || "";
    this.textObj = new fabric.Text(this.text,{
      fontSize:18,
    });
    this.circle = new fabric.Circle({
      radius:15,
      strokeWidth:4,
      stroke:'red',
      fill: 'white'
    });
    this.shape = new fabric.Group([this.circle, this.textObj], {
      hasControls: false,
      zIndex:this.zIndex,
      left:this.position.x,
      top:this.position.y,
      class:this.class,
      id:this.id
    });
  }
}
export default Marker;