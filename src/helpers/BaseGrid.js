/**
 * Abstract plot-grid class, with no specific renderer
 *
 * @module  plot-grid/src/core
 */

import createLoop from 'canvas-loop';
import alpha from 'color-alpha';
import Emitter from 'events';
import getContext from 'gl-util/context';
import panzoom from '../panzoom';
import { clamp, parseUnit, toPx, isObj } from '../mumath';
import types from '../types';

//constructor
class BaseGrid extends Emitter{
	constructor(opts) {
		super(opts);
		this.types = types;
		//create rendering state
		this.state = {};
		Object.assign(this, opts);
		//create canvas/container
		//FIXME: this is not very good for 2d case though
		if(opts.context == '2d') {
			// this.context = this.can
			if(!this.canvas) {
				this.canvas = document.createElement('canvas');	
			}
			this.container = opts.container || document.body;
			
			this.canvas.width = opts.width || this.container.clientWidth;
			this.canvas.height = opts.height || this.container.clientHeight;
			console.log(this.canvas.width);
			this.context = this.canvas.getContext('2d');
		}
		if (!this.context) this.context = getContext(this);
		if (!this.canvas) this.canvas = this.context.canvas;
		if (!this.container) this.container = document.body || document.documentElement;
		if (!this.canvas.parentNode) {
			this.container.appendChild(this.canvas);
		}
		this.canvas.classList.add('plot-grid-canvas');
		//set default coords as xy
		if (opts.r == null && opts.a == null && opts.y == null && opts.x == null) {
			opts.x = true;
			opts.y = true;
		}

		this.setDefaults();

		//create x/y/r
		this.x = Object.assign({ disabled: true }, this.x, opts.x);
		this.y = Object.assign({ disabled: true }, this.y, opts.y);
		this.r = Object.assign({ disabled: true }, this.r, opts.r);
		this.a = Object.assign({ disabled: true }, this.a, opts.a);
		//enable proper lines
		if (opts.x !== undefined)
			this.x.disabled = !opts.x;
		if (opts.y !== undefined)
			this.y.disabled = !opts.y;
		if (opts.r !== undefined)
			this.r.disabled = !opts.r;
		if (opts.a !== undefined)
			this.a.disabled = !opts.a;
		//create loop
		this.loop = createLoop(this.canvas, { parent: this.container, scale: this.pixelRatio });
		this.loop.on('tick', () => {
			this.render && this.render();
		});
		this.loop.on('resize', () => {
			this.update && this.update();
		});
		this.autostart && this.loop.start();

		//enable interactions
		panzoom(this.canvas, (e) => {
			if (!this.interactions) return;
			let { width, height } = this.canvas;
			//shift start
			let zoom = clamp(-e.dz, -height * .75, height * .75) / height;
			
			let prevScale = this.x.scale;
			this.scale = prevScale * (1 - zoom);
			this.scale = clamp(this.scale, this.minZoom, this.maxZoom);

			let x = { offset: this.x.offset}; 
			let y = { offset: this.y.offset};
			//pan
			if (!this.x.disabled) {
				let oX = this.x && this.x.origin || 0;
				if (this.x.pan) {
					x.offset -= prevScale * e.dx;
				}
				if (this.x.zoom !== false) {
					let tx = (e.x) / width - oX;
					x.offset -= width * (this.scale - prevScale) * tx;
				}
			}
			if (!this.y.disabled) {
				let oY = this.y && this.y.origin || 0;
				if (this.y.pan) {
					y.offset += prevScale * e.dy;
				}
				if (this.y.zoom !== false) {
					let ty = oY - (e.y) / height;
					y.offset -= height * (this.scale - prevScale) * ty;
				}
			}
			x.scale = this.scale;
			y.scale = this.scale;
			this.update({ x, y });
			this.emit('interact', this);
		});

		this.emit('ready', this);
	}
	//re-evaluate lines, calc options for renderer
	update(opts) {
		if (!opts)
			opts = {};
		let shape = [this.canvas.width, this.canvas.height];
		if (opts) {
			//treat bools
			if (opts.x === false || opts.x === true)
				opts.x = { disabled: !opts.x };
			if (opts.y === false || opts.y === true)
				opts.y = { disabled: !opts.y };
			if (opts.r === false || opts.r === true)
				opts.r = { disabled: !opts.r };
			if (opts.a === false || opts.a === true)
				opts.a = { disabled: !opts.a };
			//take over types properties
			if (opts.x && opts.x.type)
				opts.x = Object.assign({}, Grid.types[opts.x.type], opts.x);
			if (opts.y && opts.y.type)
				opts.y = Object.assign({}, Grid.types[opts.y.type], opts.y);
			if (opts.r && opts.r.type)
				opts.r = Object.assign({}, Grid.types[opts.r.type], opts.r);
			if (opts.a && opts.a.type)
				opts.a = Object.assign({}, Grid.types[opts.a.type], opts.a);
			//Object.assign props
			if (opts.x)
				Object.assign(this.x, opts.x);
			if (opts.y)
				Object.assign(this.y, opts.y);
			if (opts.r)
				Object.assign(this.r, opts.r);
			if (opts.a)
				Object.assign(this.a, opts.a);
		}
		//normalize, make sure range/offset are not off the limits
		if (!this.x.disabled) {
			let range = this.x.getRange({ shape: shape, coordinate: this.x });
			this.x.offset = clamp(this.x.offset, this.x.min, Math.max(this.x.max - range, this.x.min));
			// this.x.maxScale = (this.x.max - this.x.min) / shape[0];
		}
		if (!this.y.disabled) {
			let range = this.y.getRange({ shape: shape, coordinate: this.y });
			this.y.offset = clamp(this.y.offset, this.y.min, Math.max(this.y.max - range, this.y.min));
			// this.y.maxScale = (this.y.max - this.y.min) / shape[1];
		}
		//recalc state
		this.state.x = this.calcCoordinate(this.x, shape, this);
		this.state.y = this.calcCoordinate(this.y, shape, this);
		this.state.x.opposite = this.state.y;
		this.state.y.opposite = this.state.x;
		this.emit('update', opts);
		return this;
	}
	//get state object with calculated params, ready for rendering
	calcCoordinate(coord, shape) {
		let state = {
			coordinate: coord,
			shape: shape,
			grid: this
		};
		//calculate real offset/range
		state.range = coord.getRange(state);
		state.offset = clamp(coord.offset - state.range * clamp(coord.origin, 0, 1), Math.max(coord.min, -Number.MAX_VALUE + 1), Math.min(coord.max, Number.MAX_VALUE) - state.range);
		state.scale = coord.scale;
		//calc style
		state.axisColor = typeof coord.axisColor === 'number' ? alpha(coord.color, coord.axisColor) : coord.axisColor || coord.color;
		state.axisWidth = coord.axisWidth || coord.lineWidth;
		state.lineWidth = coord.lineWidth;
		state.tickAlign = coord.tickAlign;
		state.labelColor = state.color;
		//get padding
		if (typeof coord.padding === 'number') {
			state.padding = Array(4).fill(coord.padding);
		}
		else if (coord.padding instanceof Function) {
			state.padding = coord.padding(state);
		}
		else {
			state.padding = coord.padding;
		}
		//calc font
		if (typeof coord.fontSize === 'number') {
			state.fontSize = coord.fontSize;
		}
		else {
			let units = parseUnit(coord.fontSize);
			state.fontSize = units[0] * toPx(units[1]);
		}
		state.fontFamily = coord.fontFamily || 'sans-serif';
		//get lines stops, including joined list of values
		let lines;
		if (coord.lines instanceof Function) {
			lines = coord.lines(state);
		}
		else {
			lines = coord.lines || [];
		}
		state.lines = lines;
		//calc colors
		if (coord.lineColor instanceof Function) {
			state.lineColors = coord.lineColor(state);
		}
		else if (Array.isArray(coord.lineColor)) {
			state.lineColors = coord.lineColor;
		}
		else {
			let color = typeof coord.lineColor === 'number' ? alpha(coord.color, coord.lineColor) : (coord.lineColor === false || coord.lineColor == null) ? null : coord.color;
			state.lineColors = Array(lines.length).fill(color);
		}
		//calc ticks
		let ticks;
		if (coord.ticks instanceof Function) {
			ticks = coord.ticks(state);
		}
		else if (Array.isArray(coord.ticks)) {
			ticks = coord.ticks;
		}
		else {
			let tick = (coord.ticks === true || coord.ticks === true) ? state.axisWidth * 2 : coord.ticks || 0;
			ticks = Array(lines.length).fill(tick);
		}
		state.ticks = ticks;
		//calc labels
		let labels;
		if (coord.labels === true)
			labels = state.lines.concat(Array(sublines.length).fill(null));
		else if (coord.labels instanceof Function) {
			labels = coord.labels(state);
		}
		else if (Array.isArray(coord.labels)) {
			labels = coord.labels;
		}
		else if (isObj(coord.labels)) {
			labels = coord.labels;
		}
		else {
			labels = Array(state.lines.length).fill(null);
		}
		state.labels = labels;
		//convert hashmap ticks/labels to lines + colors
		if (isObj(ticks)) {
			state.ticks = Array(lines.length).fill(0);
		}
		if (isObj(labels)) {
			state.labels = Array(lines.length).fill(null);
		}
		if (isObj(ticks)) {
			for (let value in ticks) {
				state.ticks.push(ticks[value]);
				state.lines.push(parseFloat(value));
				state.lineColors.push(null);
				state.labels.push(null);
			}
		}
		if (isObj(labels)) {
			for (let value in labels) {
				state.labels.push(labels[value]);
				state.lines.push(parseFloat(value));
				state.lineColors.push(null);
				state.ticks.push(null);
			}
		}
		return state;
	}

	setDefaults() {
		this.pixelRatio = window.devicePixelRatio;
		this.autostart = true;
		this.interactions = true;

		this.defaults = Object.assign({
			type: 'linear',
			name: '',
			units: '',
		
			//visible range params
			minZoom:0.01,
  		maxZoom:10,
			min: -Infinity,
			max: Infinity,
			offset: 0,
			origin: .5,
			scale: 1,
			minScale: 1.19209290e-13,
			maxScale: Number.MAX_VALUE || 1e100,
			zoom: true,
			pan: true,
		
			//labels
			labels: true,
			fontSize: '11pt',
			fontFamily: 'sans-serif',
			padding: 0,
			color: 'rgb(0,0,0,1)',
		
			//lines params
			lines: true,
			tick: 8,
			tickAlign: .5,
			lineWidth: 1,
			distance: 13,
			style: 'lines',
			lineColor: .4,
		
			//axis params
			axis: true,
			axisOrigin: 0,
			axisWidth: 1.5,
			axisColor: 0.8,
		
			//stub methods
			//return coords for the values, redefined by axes
			getCoords: (values, state) => [0,0,0,0],
		
			//return 0..1 ratio based on value/offset/range, redefined by axes
			getRatio: (value, state) => 0,
		
			//default label formatter
			format: v => v
		}, types.linear);

		this.x = Object.assign({}, this.defaults, {
			orientation: 'x',
			getCoords: (values, state) => {
				let coords = [];
				if (!values) return coords;
				for (let i = 0; i < values.length; i++) {
					let t = state.coordinate.getRatio(values[i], state);
					coords.push(t);
					coords.push(0);
					coords.push(t);
					coords.push(1);
				}
				return coords;
			},
			getRange: state => {
				return state.shape[0] * state.coordinate.scale;
			},
			//FIXME: handle infinity case here
			getRatio: (value, state) => {
				return (value - state.offset) / state.range
			}
		});
		this.y = Object.assign({}, this.defaults, {
			orientation: 'y',
			getCoords: (values, state) => {
				let coords = [];
				if (!values) return coords;
				for (let i = 0; i < values.length; i++) {
					let t = state.coordinate.getRatio(values[i], state);
					coords.push(0);
					coords.push(t);
					coords.push(1);
					coords.push(t);
				}
				return coords;
			},
			getRange: state => {
				return state.shape[1] * state.coordinate.scale;
			},
			getRatio: (value, state) => {
				return 1 - (value - state.offset) / state.range
			}
		});
		this.r = Object.assign({}, this.defaults, {
			orientation: 'r'
		});
		this.a = Object.assign({}, this.defaults, {
			orientation: 'a'
		});
	}
}

export default BaseGrid;