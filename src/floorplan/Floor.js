import { Point } from '../geometry/Point';
import { Group } from '../layer/Group';
import { Layer } from '../layer/Layer';

export class Floor extends Layer {
  constructor(options) {
    super(options);

    this.width = this.width || -1;
    this.height = this.height || -1;

    this.position = new Point(this.position);

    this.class = 'floorplan';

    const vm = this;
    fabric.Image.fromURL(
      this.url,
      image => {
        const ratio = image.width / image.height;
        if (vm.width === -1 && vm.height === -1) {
          vm.width = image.width;
          vm.height = image.height;
        } else if (vm.width === -1) {
          vm.width = vm.height / ratio;
        } else if (vm.height === -1) {
          vm.height = vm.width * ratio;
        }
        image.originalWidth = image.width;
        image.originalHeight = image.height;
        vm.image = image.scaleToWidth(vm.width);

        vm.scaleX = image.scaleX + 0;
        vm.scaleY = image.scaleY + 0;
        // vm.emit('load', vm);

        vm.shape = new Group([vm.image, vm.handler], {
          selectable: false,
          draggable: false,
          left: vm.position.x,
          top: vm.position.y,
          parent: vm,
          lockMovementX: true,
          lockMovementY: true,
          class: vm.class,
          zIndex: vm.zIndex
        });

        vm.emit('load', vm);
      },
      {
        selectable: false,
        opacity: this.opacity
      }
    );

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

export const floorplan = (options) => new Floor(options);
