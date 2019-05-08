import Base from './Base';
import Point from './Point';

class Floorplan extends Base {
  constructor(options) {
    super(options);

    this.width = this.width || 'auto';
    this.height = this.height || 'auto';

    this.position = new Point(this.position);

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
      console.log(vm.position);
      image.originalWidth  = image.width;
      image.originalHeight  = image.height;
      vm.image = image.scaleToWidth(vm.width);
      
      vm.scaleX = image.scaleX+0;
      vm.scaleY = image.scaleY+0;
      vm.emit('load', vm.image);
    }, {
      selectable:false,
      left:this.position.x,
      top:this.position.y
    });
  }
}

export default Floorplan;
