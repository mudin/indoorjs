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

    this.load();
  }

  load() {
    const vm = this;
    const index = this.url.lastIndexOf('.');
    const ext = this.url.substr(index + 1, 3);

    if (ext === 'svg') {
      fabric.loadSVGFromURL(this.url, (objects, options) => {
        objects = objects.filter(e => e.id !== 'grid');
        const image = fabric.util.groupSVGElements(objects, options);
        vm.setImage(image);
      });
    } else {
      fabric.Image.fromURL(
        this.url,
        image => {
          vm.setImage(image);
        },
        {
          selectable: false,
          opacity: this.opacity
        }
      );
    }

    this.handler = new fabric.Rect({
      left: 0,
      top: 0,
      width: 0.1,
      height: 0.1,
      stroke: 'black',
      fill: '',
      hasControls: false,
      hasBorders: false
    });
  }

  setImage(image) {
    if (this.shape && this.image) {
      this.shape.remove(this.image);
    }
    const ratio = image.width / image.height;
    if (this.width === -1 && this.height === -1) {
      this.width = image.width;
      this.height = image.height;
    } else if (this.width === -1) {
      this.width = this.height * ratio;
    } else if (this.height === -1) {
      this.height = this.width / ratio;
    }
    image.originalWidth = image.width;
    image.originalHeight = image.height;
    this.image = image.scaleToWidth(this.width, true);

    this.scaleX = image.scaleX + 0;
    this.scaleY = image.scaleY + 0;

    this.drawShape();
  }

  drawShape() {
    if (this.shape) {
      this.shape.addWithUpdate(this.image);
      this.emit('load', this);
      return;
    }

    this.shape = new Group([this.image, this.handler], {
      selectable: false,
      draggable: false,
      left: this.position.x,
      top: this.position.y,
      parent: this,
      lockMovementX: true,
      lockMovementY: true,
      class: this.class,
      zIndex: this.zIndex
    });
    this.emit('load', this);
  }

  setWidth(width) {
    this.width = width;
    this.onResize();
  }

  setHeight(height) {
    this.height = height;
    this.onResize();
  }

  setOpacity(opacity) {
    this.opacity = opacity;
    this.image.set('opacity', opacity);
    if (this.image.canvas) {
      this.image.canvas.renderAll();
    }
  }

  setPosition(position) {
    this.position = new Point(position);
    if (!this.shape) return;
    this.shape.set({
      left: this.position.x,
      top: this.position.y
    });
  }

  setUrl(url) {
    this.url = url;
    this.load();
  }

  onResize(width, height) {
    if (width !== undefined) {
      this.width = width;
    }
    if (height !== undefined) {
      this.height = height;
    }

    const ratio = this.image.width / this.image.height;
    if (this.width === -1 && this.height === -1) {
      this.width = this.image.width;
      this.height = this.image.height;
    } else if (this.width === -1) {
      this.width = this.height / ratio;
    } else if (this.height === -1) {
      this.height = this.width * ratio;
    }
    this.image = this.image.scaleToWidth(this.width);
    this.shape.addWithUpdate();
  }
}

export const floorplan = options => new Floor(options);
