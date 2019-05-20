import { Layer } from '../Layer';
import { Group } from '../Group';
import { Point } from '../../geometry/Point';
import { Connector } from '../Connector';

export class Marker extends Layer {
  constructor(position, options) {
    options = options || {};
    options.zIndex = options.zIndex || 10;
    options.keepOnZoom = true;
    options.position = new Point(position);
    options.rotation = options.rotation || 0;
    options.clickable = options.clickable || true;
    super(options);

    const vm = this;

    this.text = this.text || '';
    this.size = this.size || 10;

    Object.assign(this.style, {
      left: this.position.x,
      top: this.position.y,
      selectionBackgroundColor: false,
      angle: this.rotation
    });

    if (this.text) {
      this.textObj = new fabric.Text(this.text, {
        fontSize: this.size
      });
    }

    if (this.icon) {
      fabric.Image.fromURL(this.icon.url, image => {
        console.log(image);
        vm.image = image.scaleToWidth(100);
        this.init();
        // vm.shape.removeWithUpdate();
      }, {
        selectable: true,
        opacity: this.opacity
      });
    } else {
      this.circle = new fabric.Circle({
        radius: this.size,
        strokeWidth: 2,
        stroke: 'red',
        fill: 'white'
      });
      this.init();
    }
  }

  init() {
    const objects = [];
    if (this.image) {
      objects.push(this.image);
    }
    if (this.circle) {
      objects.push(this.circle);
    }
    if (this.textObj) {
      objects.push(this.textObj);
    }
    this.shape = new Group(objects, this.style);
    this.links = this.links || [];
    this.addLinks();
    this.registerListeners();

    process.nextTick(() => {
      this.emit('ready');
    });
  }

  registerListeners() {
    const vm = this;
    this.shape.on('moving', () => {
      vm.onShapeDrag();
    });

    this.shape.on('mousedown', (e) => {
      vm.onShapeMouseDown(e);
    });
    this.shape.on('mousemove', (e) => {
      vm.onShapeMouseMove(e);
    });
    this.shape.on('mouseup', (e) => {
      vm.onShapeMouseUp(e);
    });
  }

  setPosition(position) {
    this.position = new Point(position);
    this.shape.set({
      left: this.position.x,
      top: this.position.y
    });
    this.emit('update:links');
    try {
      this.shape.canvas.renderAll();
    } catch (e) {
      console.error(e);
    }
  }

  setRotation(rotation) {
    this.rotation = rotation;
    this.shape.set({
      angle: this.rotation
    });
    try {
      this.shape.canvas.renderAll();
    } catch (e) {
      console.error(e);
    }
  }

  setLinks(links) {
    this.links = links;
    this.addLinks();
  }

  addLinks() {
    this.connectors = [];
    this.links.forEach(link => {
      const connector = new Connector(this, link);
      this.connectors.push(connector);
    });

    this.addConnectors();
  }

  addConnectors() {
    const vm = this;
    this.connectors.forEach(connector => {
      vm._map.addLayer(connector);
    });
  }

  onAdded() {
    this.addConnectors();
  }

  onShapeDrag() {
    const matrix = this.shape.calcTransformMatrix();
    const [,,,, x, y] = matrix;
    this.position = new Point(x, y);
    this.emit('update:links');
  }

  onShapeMouseDown(e) {
    console.log(e);
    this.dragStart = e;
  }

  onShapeMouseMove(e) {
    if (this.dragStart) {
      this.emit('dragstart', this.dragStart);
      this.dragging = true;
      this.dragStart = null;
    }

    if (this.dragging) {
      this.emit('drag', e);
    } else {
      this.emit('hover', e);
    }
  }

  onShapeMouseUp(e) {
    if (!this.dragging) {
      this.emit('click', e);
    } else {
      this.emit('dragend', e);
    }
    this.dragStart = null;
    this.dragging = false;
  }
}

export const marker = (position, options) => new Marker(position, options);
