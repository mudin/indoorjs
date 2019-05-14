import Base from './Base';
import Point from './Point';
import Group from './Group';
import Layer from './Layer';

class Floorplan extends Layer {
  constructor(options) {
    super(options);

    this.width = this.width || 'auto';
    this.height = this.height || 'auto';

    this.position = new Point(this.position);

    this.class = 'floorplan';

    const vm = this;
    fabric.Image.fromURL(this.url, image => {
      console.log(image);
      let ratio = image.width / image.height;
      if (vm.width == 'auto' && vm.height == 'auto') {
        vm.width = image.width;
        vm.height = image.height;
      } else if (vm.width == 'auto') {
        vm.width = vm.height / ratio;
      } else if (vm.height == 'auto') {
        vm.height = vm.width * ratio;
      }
      image.originalWidth  = image.width;
      image.originalHeight  = image.height;
      vm.image = image.scaleToWidth(vm.width);
      
      vm.scaleX = image.scaleX+0;
      vm.scaleY = image.scaleY+0;
      // vm.emit('load', vm);

      vm.shape = new Group([vm.image, vm.handler],{
        selectable:false,
        draggable:false,
        left:vm.position.x,
        top:vm.position.y,
        parent:vm,
        lockMovementX :true,
        lockMovementY : true,
        class:vm.class,
        zIndex:vm.zIndex
      });
      
      vm.emit('load', vm);
      
    }, {
      selectable:false,
    });

    this.handler = new fabric.Rect({
      left: 0,
      top: 0,
      width: 20,
      height: 20,
      stroke: 'green',
      fill: '',
      hasControls: false,
      hasBorders: false
    });
    
  }
}

export default Floorplan;
