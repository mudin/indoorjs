import panzoom from '../panzoom';
import createLoop from 'canvas-loop';
import { clamp } from '../mumath';
import { fabric } from 'fabric';

import Base from './Base';
import { MAP } from '../Constants.js';
import Grid from '../helpers/Grid';
import Point from './Point';

class Map extends Base {
  constructor(container, options) {
    super(options);

    this.defaults = Object.assign({}, MAP);

    //set defaults
    Object.assign(this, this.defaults);

    //overwrite options
    Object.assign(this, this._options);

    this.center = new Point(this.center);

    this.container = container || document.body;

    let canvas = document.createElement('canvas');
    this.container.appendChild(canvas);
    canvas.setAttribute('id', 'indoors-map-canvas');

    canvas.width = this.width || this.container.clientWidth;
    canvas.height = this.height || this.container.clientHeight;

    this.canvas = new fabric.Canvas(canvas, {
      preserveObjectStacking:true
    });
    this.context = this.canvas.getContext('2d');

    this.canPan = false;

    this.on('render', () => {
      if (this.autostart) this.clear();
    });

    this.originX = -this.canvas.width / 2 + this._options.center.x;
    this.originY = -this.canvas.height / 2 + this._options.center.y;

    this.canvas.absolutePan({
      x: this.originX,
      y: this.originY
    });

    try {
      this.addFloorPlan();
    } catch (e) {}
    this.addGrid();
    // this.update();

    const vm = this;
    panzoom(this.container, e => {
      vm.panzoom(e);
    });

    this.registerListeners();

    setTimeout(() => {
      this.emit('ready', this);
    }, 300);
  }

  addFloorPlan() {
    if (!this.floorplan) return;
    const vm = this;
    this.floorplan.on('load', img => {
      vm.addLayer(img);
    });
  }

  addLayer(layer) {    
    this.canvas.add(layer.shape);
    this.canvas._objects.sort((o1,o2)=>{
      return o1.zIndex - o2.zIndex;
    });
    this.canvas.renderAll();
  }

  removeLayer(layer) {
    this.canvas.remove(layer.shape);
  }

  addGrid() {
    this.gridCanvas = this.cloneCanvas();
    this.gridCanvas.setAttribute('id', 'indoors-grid-canvas');
    this.grid = new Grid(this.gridCanvas, this);
    this.grid.draw();
  }

  moveTo(obj, index) {
    if (index != undefined) {
      obj.zIndex = index;
    }
    this.canvas.moveTo(obj.shape, obj.zIndex);
  }

  cloneCanvas(canvas) {
    canvas = canvas || this.canvas;
    let clone = document.createElement('canvas');
    clone.width = canvas.width;
    clone.height = canvas.height;
    canvas.wrapperEl.appendChild(clone);
    return clone;
  }

  update() {
    let canvas = this.canvas;

    this.grid.update2({
      x: this.center.x,
      y: this.center.y,
      zoom: this.zoom
    });

    this.emit('update', this);
    this.grid.render();

    let center = this.grid.getCenterCoords();
    canvas.viewportTransform[4] = center.x;
    canvas.viewportTransform[5] = center.y;

    canvas.zoomToPoint(
      {
        x: this.x0,
        y: this.y0
      },
      this.zoom
    );

    let objects = canvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (object.keepOnZoom) {
        object._set('scaleX', 1 / this.zoom);
        object._set('scaleY', 1 / this.zoom);
        this.emit(object.class + 'scaling', object);
      }
    }
  }

  panzoom(e) {
    //enable interactions
    let { width, height } = this.canvas;
    //shift start
    let zoom = clamp(-e.dz, -height * 0.75, height * 0.75) / height;

    let prevZoom = 1 / this.zoom;
    let curZoom = prevZoom * (1 - zoom);
    curZoom = clamp(curZoom, this.minZoom, this.maxZoom);

    let { x, y } = this.center;

    //pan
    let oX = 0.5;
    let oY = 0.5;
    if (this.panEnabled && this.canPan) {
      x -= prevZoom * e.dx;
      y += prevZoom * e.dy;
    }

    if (this.zoomEnabled) {
      let tx = e.x / width - oX;
      x -= width * (curZoom - prevZoom) * tx;
      let ty = oY - e.y / height;
      y -= height * (curZoom - prevZoom) * ty;
    }
    this.center.setX(x);
    this.center.setY(y);
    this.zoom = 1 / curZoom;
    this.x0 = e.x0;
    this.y0 = e.y0;
    this.x = e.x;
    this.y = e.y;
    this.update();
  }

  registerListeners() {
    const vm = this;

    this.canvas.on('object:scaling', e => {
      if (e.target.class) {
        vm.emit(e.target.class + 'modify', e);
        return;
      }
      let group = e.target;
      let objects = group.getObjects();
      group.removeWithUpdate();
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.fire('moving');
      }
      vm.update();
      vm.canvas.renderAll();
    });

    this.canvas.on('object:rotating', e => {
      if (e.target.class) {
        vm.emit(e.target.class + 'rotate', e);
        return;
      }
      let group = e.target;
      let objects = group.getObjects();
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (object.class) {
          object._set('angle', -group.angle);
          object.fire('moving');
        }
      }

      vm.emit('object:rotate', e);
      this.update();
    });

    this.canvas.on('object:moving',e => {
      if (e.target.class) {
        vm.emit(e.target.class + 'moving', e);
        return;
      }
      let group = e.target;
      let objects = group.getObjects();
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (object.class) {
          object.fire('moving');
        }
      }
      vm.emit('object:rotate', e);
      this.update();
    });

    this.canvas.on('object:moved', e => {
      if (e.target.class) {
        vm.emit(e.target.class + 'dragend', e);
      }
      this.update();
    });

    this.canvas.on('selection:created', e => {
      console.log(e);
      const group = e.target;
      group.zoom = 1./vm.zoom+0;
    });

    this.canvas.on('selection:cleared', e => {
      console.log(e);
      let objects = e.deselected;
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (object.class) {
          object._set('angle', 0);
          object._set('scaleX', 1./vm.zoom);
          object._set('scaleY', 1./vm.zoom);
          object.fire('moving');
        }
      }
    });

    document.addEventListener('keyup', evt => {
      vm.canPan = false;
      vm.canvas.selection = true;
    });

    document.addEventListener('keydown', evt => {
      if (evt.altKey === true) {
        vm.canPan = true;
        vm.canvas.selection = false;
      }
    });
  }

  unregisterListeners() {
    this.canvas.off('object:moving');
    this.canvas.off('object:moved');
  }
}

export default Map;
