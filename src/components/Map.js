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

    this.canvas = new fabric.Canvas(canvas);
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

    try {
      this.addFloorPlan();
    }
    catch(e){

    }
    this.addGrid();
		// this.update();

    this.emit('ready', this);

    const vm = this;
    panzoom(this.container, (e)=>{
      vm.panzoom(e);
    });

    this.registerListeners();
  }

  addFloorPlan() {
    if(!this.floorplan) return;

    this.floorplan.on('load',(img)=>{
      img.left+=this.canvas.width/2;
      img.top+=this.canvas.height/2;
      this.canvas.add(img);
      this.canvas.renderAll();
    });
    
  }

  addGrid() {
    this.gridCanvas = document.createElement('canvas');
    this.gridCanvas.width = this.canvas.width;
    this.gridCanvas.height = this.canvas.height;
    this.canvas.wrapperEl.appendChild(this.gridCanvas);
    this.gridCanvas.setAttribute('id','indoors-grid-canvas');
    this.gridCanvas.style.position = 'absolute';
    this.gridCanvas.style.pointerEvents = 'none';
    this.grid = new Grid(this.gridCanvas, this);
  }

  render() {
		// this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.grid.render();
		return this;
  }
  
  update() {
    this.grid.update2({
      x:this.center.x,
      y:this.center.y,
      zoom:1./this.zoom
    });
    this.canvas.zoomToPoint({
      x:this.x0,
      y:this.y0
    },this.zoom);

    if(this.canPan && this.isDragging) {
      console.log(this.x - this.x0);
      this.canvas.viewportTransform[4] += this.x - this.lastX;//e.clientX - this.lastPosX;
      this.canvas.viewportTransform[5] += this.y - this.lastY;//e.clientY - this.lastPosY;
      this.canvas.renderAll();
      this.lastX = this.x;
      this.lastY = this.y;
    }

    this.emit('update', this);
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
    // if(this.lastX==undefined) this.lastX = e.x0;
    // if(this.lastY==undefined) this.lastY = e.y0;
    // this.x = e.x;
    // this.y = e.y;
    // this.dx = prevZoom * e.dx;
    // this.dy = prevZoom * e.dy;
    console.log(e.x, e.y, e.x0, e.y0);
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