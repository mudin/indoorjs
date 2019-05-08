import panzoom from '../panzoom';
import createLoop from 'canvas-loop';
import { clamp } from '../mumath';
import { fabric } from 'fabric';

import Base from './Base';
import { MAP } from '../Constants.js';
import Grid from '../helpers/Grid';

class Map extends Base {
  constructor(container, options) {
    super(options);

    this.defaults = Object.assign({}, MAP);

    //set defaults
    Object.assign(this, this.defaults);

    //overwrite options
    Object.assign(this, this.options);

    this.container = container || document.body;
    
    let canvas = document.createElement('canvas');
    this.container.appendChild(canvas);
    canvas.setAttribute('id','indoors-map-canvas')
  
    canvas.width = this.width || this.container.clientWidth;
    canvas.height = this.height || this.container.clientHeight;

    this.canvas = new fabric.Canvas(canvas,{
      preserveObjectStacking:true
    });
    this.context = this.canvas.getContext('2d');

    this.canPan = false;

    this.loop = createLoop(canvas, { parent: this.container, zoom: this.pixelRatio });
		this.loop.on('tick', () => {
			this.render && this.render();
		});
		this.loop.on('resize', () => {
			this.update && this.update();
		});
    
    this.loop.start();

		this.on('render', () => {
			if (this.autostart)
				this.clear();
    });

    this.originX = -this.canvas.width/2.;
    this.originY = -this.canvas.height/2.;

    this.canvas.absolutePan({x:this.originX, y:this.originY});

    try {
      this.addFloorPlan();
    }
    catch(e){

    }
    this.addGrid();
    // this.update();
    
    const vm = this;
    panzoom(this.container, (e)=>{
      vm.panzoom(e);
    });

    this.registerListeners();

    setTimeout(() => {
      this.emit('ready', this);  
    }, 300);
  }

  addFloorPlan() {
    if(!this.floorplan) return;

    this.floorplan.on('load',(img)=>{
      this.canvas.add(img);
      this.canvas.renderAll();
    });
    
  }

  addLayer(layer) {
    this.canvas.add(layer.shape);
    this.canvas.renderAll();
    this.moveTo(layer);
  }

  removeLayer(layer) {
    this.canvas.remove(layer.shape);
  }

  addGrid() {
    this.gridCanvas = this.cloneCanvas();
    this.gridCanvas.setAttribute('id','indoors-grid-canvas');
    this.grid = new Grid(this.gridCanvas, this);
    this.grid.draw();
  }

  moveTo(obj, index) {
    if(index!=undefined) {
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
    // clone.style.position = 'absolute';
    // clone.style.pointerEvents = 'none';
    return clone;
  }

  render() {
		// this.grid.render();
		return this;
  }
  
  update() {
    let canvas = this.canvas;
    
    canvas.zoomToPoint({
      x:this.x0,
      y:this.y0
    },this.zoom);
    
    let center = this.grid.getCenterCoords();
    // if(this.canPan && this.isDragging) {
      canvas.viewportTransform[4] = center.x;// + this.originX;//this.x - this.lastX;//e.clientX - this.lastPosX;
      canvas.viewportTransform[5] = center.y;// + this.originY;//this.y - this.lastY;//e.clientY - this.lastPosY;
      canvas.renderAll();
      this.lastX = this.x;
      this.lastY = this.y;
    // }
    // let center = this.grid.getCenterCoords();
    // console.log(center);
    // this.floorplan.image.left = center.x + this.originX + this.floorplan.position.x;
    // this.floorplan.image.top = center.y  + this.originY + this.floorplan.position.y;

    // let width = this.floorplan.width * this.zoom;
    // this.floorplan.image.scaleToWidth(width);

    canvas.renderAll();

    this.grid.update2({
      x:this.center.x,
      y:this.center.y,
      zoom:1./this.zoom
    });

    this.emit('update', this);
    this.grid.render();
  }

  panzoom(e) {
    //enable interactions
    let { width, height } = this.canvas;
    //shift start
    let zoom = clamp(-e.dz, -height * .75, height * .75) / height;
    
    let prevZoom = 1./this.zoom;
    let curZoom = prevZoom * (1 - zoom);
    curZoom = clamp(curZoom, this.minZoom, this.maxZoom);

    let {x,y} = this.center; 

    //pan
    let oX = 0.5;
    let oY = 0.5;
    if (this.panEnabled && this.canPan) {
      x -= prevZoom * e.dx;
      y += prevZoom * e.dy;
    }

    if (this.zoomEnabled) {
      let tx = (e.x) / width - oX;
      x -= width * (curZoom - prevZoom) * tx;
      let ty = oY - (e.y) / height;
      y -= height * (curZoom - prevZoom) * ty;
    }
    this.center.setX(x);
    this.center.setY(y);
    this.zoom = 1./curZoom;
    this.x0 = e.x0;
    this.y0 = e.y0;
    this.update();
  }

  registerListeners() {
    const vm = this;

    this.canvas.on('mouse:down', (opt) => {
      var evt = opt.e;
      this.isDragging = vm.canPan;
      // if (vm.canPan) {
        this.lastX = evt.clientX;
        this.lastY = evt.clientY;
      // }
    });
    this.canvas.on('mouse:move', (opt) => {
      var evt = opt.e;
      if (vm.isDragging) {
        this.x = evt.clientX;
        this.y = evt.clientY;
      }
    });
    this.canvas.on('mouse:up', (opt) => {
      var evt = opt.e;
      this.isDragging = false;
      // if(vm.canPan) {

      // }
      // if (evt.altKey === true) {
        // delete this.lastX;
        // delete this.lastY;
      // }
    });

    this.canvas.on('object:moving', (e) => {
      console.log(e);
      if(e.target.class) {
        vm.emit(e.target.class+'drag', e);
        return;
      }

      let objects = e.target.getObjects();
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        e.target = object;
        vm.emit(object.class+'drag', e);
      }
    });

    this.canvas.on('object:moved', (e) => {
      if(e.target.class) {
        vm.emit(e.target.class+'dragend', e);
      }
    });

    document.addEventListener('keyup',(evt)=>{
      // if (evt.altKey === true) {
        delete this.lastX;
        delete this.lastY;
        vm.canPan = false;
        vm.canvas.selection = true;
      // }
    });

    document.addEventListener('keydown',(evt)=>{
      if (evt.shiftKey === true) {
        vm.canPan = true;
        vm.canvas.selection = false;
      }
    });
  }

  unregisterListeners() {
    this.canvas.off('mouse:down');
    this.canvas.off('mouse:move');
    this.canvas.off('mouse:up');
  }

  
}

export default Map;