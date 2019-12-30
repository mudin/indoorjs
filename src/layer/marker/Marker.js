import { Layer } from '../Layer';
import { Group } from '../Group';
import { Point } from '../../geometry/Point';
import { Connector } from '../Connector';

export class Marker extends Layer {
  constructor(position, options) {
    options = options || {};
    options.zIndex = options.zIndex || 100;
    options.keepOnZoom = options.keepOnZoom === undefined ? true : options.keepOnZoom;
    options.position = new Point(position);
    options.rotation = options.rotation || 0;
    options.yaw = options.yaw || 0;
    options.clickable = options.clickable !== undefined ? options.clickable : true;
    options.class = 'marker';
    super(options);

    const vm = this;

    this.text = this.text || '';
    this.size = this.size || 10;
    this.textColor = this.textColor || 'black';
    this.fill = this.fill || 'white';
    this.stroke = this.stroke || 'red';

    Object.assign(this.style, {
      left: this.position.x,
      top: this.position.y,
      // selectionBackgroundColor: false,
      angle: this.rotation,
      yaw: this.yaw,
      clickable: this.clickable
    });

    if (this.text) {
      this.textObj = new fabric.Text(this.text, {
        fontSize: this.size,
        fill: this.textColor
      });
    }

    if (this.icon) {
      fabric.Image.fromURL(
        this.icon.url,
        image => {
          vm.image = image.scaleToWidth(this.size);
          this.init();
          // vm.shape.removeWithUpdate();
        },
        {
          selectable: false,
          evented: this.evented,
          clickable: this.clickable,
          opacity: this.opacity
        }
      );
    } else {
      this.circle = new fabric.Circle({
        radius: this.size,
        strokeWidth: 2,
        stroke: this.stroke,
        fill: this.fill
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
    this.shape.on('rotating', () => {
      vm.emit('rotating');
    });

    this.shape.on('mousedown', e => {
      vm.onShapeMouseDown(e);
    });
    this.shape.on('mousemove', e => {
      vm.onShapeMouseMove(e);
    });
    this.shape.on('mouseup', e => {
      vm.onShapeMouseUp(e);
    });
    this.shape.on('mouseover', () => {
      vm.emit('mouseover', vm);
    });
    this.shape.on('mouseout', () => {
      vm.emit('mouseout', vm);
    });
  }

  setPosition(position) {
    this.position = new Point(position);
    if (!this.shape) return;

    this.shape.set({
      left: this.position.x,
      top: this.position.y
    });

    this.emit('update:links');

    if (this.shape.canvas) {
      this.shape.canvas.renderAll();
    }
  }

  setRotation(rotation) {
    this.rotation = rotation;

    if (!this.shape) return;

    this.shape.set({
      angle: this.rotation
    });

    if (this.shape.canvas) {
      this.shape.canvas.renderAll();
    }
  }

  setOptions(options) {
    if (!this.shape) return;

    Object.keys(options).forEach(key => {
      switch (key) {
        case 'textColor':
          this.setTextColor(options[key]);
          break;
        case 'stroke':
          this.setStroke(options[key]);
          break;
        case 'fill':
          this.setColor(options[key]);
          break;

        default:
          break;
      }
    });
    if (this.shape.canvas) {
      this.shape.canvas.renderAll();
    }
  }

  setTextColor(color) {
    if (this.text && this.textObj) {
      this.textObj.setColor(color);
      this.textObj.canvas.renderAll();
    }
  }

  setText(text) {
    if (this.text && this.textObj) {
      this.textObj.set({ text });
      this.textObj.canvas.renderAll();
    }
  }

  setStroke(color) {
    if (this.circle) {
      this.circle.set('stroke', color);
    }
  }

  setColor(color) {
    if (this.circle) {
      this.circle.setColor(color);
    }
  }

  setLinks(links) {
    this.links = links;
    this.addLinks();
  }

  setSize(size) {
    if (this.image) {
      this.image.scaleToWidth(size);
      if (this.image.canvas) {
        this.image.canvas.renderAll();
      }
    } else if (this.circle) {
      this.circle.setRadius(size);
    }
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
    const [, , , , x, y] = matrix;
    this.position = new Point(x, y);
    this.emit('update:links');
    this.emit('moving');
  }

  onShapeMouseDown(e) {
    this.dragStart = e;
  }

  onShapeMouseMove(e) {
    if (this.dragStart) {
      this.emit('dragstart');

      const a = new fabric.Point(e.pointer.x, e.pointer.y);
      const b = new fabric.Point(this.dragStart.pointer.x, this.dragStart.pointer.y);
      // if distance is far enough, we don't want to fire click event
      if (a.distanceFrom(b) > 3) {
        this.dragStart = null;
        this.dragging = true;
      } else {
        // this.dragging = false;
      }
    }

    if (this.dragging) {
      this.emit('drag');
    } else {
      this.emit('hover');
    }
  }

  onShapeMouseUp() {
    if (!this.dragging) {
      this.emit('click');
    } else {
      this.emit('moved');
    }
    this.dragStart = null;
    this.dragging = false;
  }
}

export const marker = (position, options) => new Marker(position, options);
