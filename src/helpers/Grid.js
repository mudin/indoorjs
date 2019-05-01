/**
 * @module  plot-grid/2d
 *
 * Canvas2D html grid renderer
 */
'use strict';

import BaseGrid from './BaseGrid';
import {almost, len, clamp} from '../mumath';

class Grid extends BaseGrid {
	constructor(opts) {
		
		opts = opts || {};
		opts.context = '2d';
		super(opts);

		this.on('render', () => {
			if (this.autostart)
				this.clear();
		});
		this.update(opts);
	}

	render(data) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.draw(data);
		return this;
	}

	//draw grid to the canvas
	draw(data) {
		this.drawLines(this.state.x);
		this.drawLines(this.state.y);
		return this;
	}
	//lines instance draw
	drawLines(state) {
		
		//draw lines and sublines
		if (!state || !state.coordinate || state.coordinate.disabled) return;

		const ctx = this.context;
		let [width, height] = state.shape;
		let left = 0;
		let top = 0;
		let [pt, pr, pb, pl] = state.padding;

		let axisRatio = state.opposite.coordinate.getRatio(state.coordinate.axisOrigin, state.opposite);
		axisRatio = clamp(axisRatio, 0, 1);
		let coords = state.coordinate.getCoords(state.lines, state);
		//draw state.lines
		ctx.lineWidth = 1;//state.lineWidth/2.;
		for (let i = 0, j = 0; i < coords.length; i += 4, j++) {
			let color = state.lineColors[j];
			if (!color) continue;
			ctx.strokeStyle = color;
			ctx.beginPath();
			let x1 = left + pl + coords[i] * (width - pr - pl), y1 = top + pt + coords[i + 1] * (height - pb - pt);
			let x2 = left + pl + coords[i + 2] * (width - pr - pl), y2 = top + pt + coords[i + 3] * (height - pb - pt);
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
		}
		let normals = [];
		for (let i = 0; i < coords.length; i += 4) {
			let x1 = coords[i], y1 = coords[i + 1], x2 = coords[i + 2], y2 = coords[i + 3];
			let xDif = x2 - x1, yDif = y2 - y1;
			let dist = len(xDif, yDif);
			normals.push(xDif / dist);
			normals.push(yDif / dist);
		}
		//calc state.labels/tick coords
		let tickCoords = [];
		let labelCoords = [];
		let ticks = state.ticks;
		for (let i = 0, j = 0, k = 0; i < normals.length; k++ , i += 2, j += 4) {
			let x1 = coords[j], y1 = coords[j + 1], x2 = coords[j + 2], y2 = coords[j + 3];
			let xDif = (x2 - x1) * axisRatio, yDif = (y2 - y1) * axisRatio;
			let tick = [normals[i] * ticks[k] / (width - pl - pr), normals[i + 1] * ticks[k] / (height - pt - pb)];
			tickCoords.push(normals[i] * (xDif + tick[0] * state.tickAlign) + x1);
			tickCoords.push(normals[i + 1] * (yDif + tick[1] * state.tickAlign) + y1);
			tickCoords.push(normals[i] * (xDif - tick[0] * (1 - state.tickAlign)) + x1);
			tickCoords.push(normals[i + 1] * (yDif - tick[1] * (1 - state.tickAlign)) + y1);
			labelCoords.push(normals[i] * xDif + x1);
			labelCoords.push(normals[i + 1] * yDif + y1);
		}
		//draw ticks
		if (ticks.length) {
			ctx.lineWidth = state.axisWidth/2.;
			ctx.beginPath();
			for (let i = 0, j = 0; i < tickCoords.length; i += 4, j++) {
				if (almost(state.lines[j], state.opposite.coordinate.axisOrigin))
					continue;
				let x1 = left + pl + tickCoords[i] * (width - pl - pr), y1 = top + pt + tickCoords[i + 1] * (height - pt - pb);
				let x2 = left + pl + tickCoords[i + 2] * (width - pl - pr), y2 = top + pt + tickCoords[i + 3] * (height - pt - pb);
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
			}
			ctx.strokeStyle = state.axisColor;
			ctx.stroke();
			ctx.closePath();
		}
		//draw axis
		if (state.coordinate.axis && state.axisColor) {
			let axisCoords = state.opposite.coordinate.getCoords([state.coordinate.axisOrigin], state.opposite);
			ctx.lineWidth = state.axisWidth/2.;
			let x1 = left + pl + clamp(axisCoords[0], 0, 1) * (width - pr - pl);
			let y1 = top + pt + clamp(axisCoords[1], 0, 1) * (height - pt - pb);
			let x2 = left + pl + clamp(axisCoords[2], 0, 1) * (width - pr - pl);
			let y2 = top + pt + clamp(axisCoords[3], 0, 1) * (height - pt - pb);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = state.axisColor;
			ctx.stroke();
			ctx.closePath();
		}
		//draw state.labels
		if (state.labels) {
			ctx.font = '300 '+state.fontSize + 'px ' + state.fontFamily;
			ctx.fillStyle = state.labelColor;
			ctx.textBaseline = 'top';
			let textHeight = state.fontSize;
			let indent = state.axisWidth + 1.5;
			let textOffset = state.tickAlign < .5 ? -textHeight - state.axisWidth * 2 : state.axisWidth * 2;
			let isOpp = state.coordinate.orientation === 'y' && !state.opposite.disabled;
			for (let i = 0; i < state.labels.length; i++) {
				let label = state.labels[i];
				if (label == null) continue;
				
				if (isOpp && almost(state.lines[i], state.opposite.coordinate.axisOrigin)) continue;
				
				let textWidth = ctx.measureText(label).width;
				
				let textLeft = labelCoords[i * 2] * (width - pl - pr) + left + indent + pl;

				if (state.coordinate.orientation === 'y') {
					textLeft = clamp(textLeft, left + indent, left + width - textWidth - 1 - state.axisWidth);
				}
				
				let textTop = labelCoords[i * 2 + 1] * (height - pt - pb) + top + textOffset + pt;
				if (state.coordinate.orientation === 'x') {
					textTop = clamp(textTop, top, top + height - textHeight - textOffset);
				}
				ctx.fillText(label, textLeft, textTop);
			}
		}
	}
}

export default Grid;
