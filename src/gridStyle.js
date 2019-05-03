const alpha = require('color-alpha');
import { range, almost, scale, isMultiple, lg} from './mumath';

let gridStyle = {
	steps: [1,2,5],
	distance: 20,
	lines: (state) => {
		let coord = state.coordinate;
		let step = state.step = scale(coord.distance * coord.zoom, coord.steps);
		return range( Math.floor(state.offset/step)*step, Math.ceil((state.offset + state.range)/step + 1)*step, step);
	},
	lineColor: state => {
		if (!state.lines) return;
		let coord = state.coordinate;

		let light = alpha(coord.color, .1);
		let heavy = alpha(coord.color, .3);

		let step = state.step;
		let power = Math.ceil(lg(step));
		let tenStep = Math.pow(10,power);
		let nextStep = Math.pow(10,power+1);
		let eps = step/10;
		let colors = state.lines.map(v => {
			if (isMultiple(v, nextStep, eps)) return heavy;
			if (isMultiple(v, tenStep, eps)) return light;
			return null;
		});
		return colors;
	},
	ticks: state => {
		if (!state.lines) return;
		let coord = state.coordinate;
		let step = scale(scale(state.step*1.1, coord.steps)*1.1, coord.steps);
		let eps = step/10;
		let tickWidth = state.axisWidth*4;
		return state.lines.map(v => {
			if (!isMultiple(v, step, eps)) return null;
			if (almost(v, 0, eps)) return null;
			return tickWidth;
		});
	},
	labels: state => {
		if (!state.lines) return;
		let coord = state.coordinate;

		let step = scale(scale(state.step*1.1, coord.steps)*1.1, coord.steps);
		// let precision = clamp(Math.abs(Math.floor(lg(step))), 10, 20);
		let eps = step/10;
		return state.lines.map(v => {
			if (!isMultiple(v, step, eps)) return null;
			if (almost(v, 0, eps)) return coord.orientation === 'y' ? null : '0';
			v = Number((v).toFixed(2))
			return coord.format(v);
		});
	}
};

export default gridStyle;