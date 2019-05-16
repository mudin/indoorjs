import { range, almost, scale, isMultiple, lg} from './mumath';
const alpha = require('color-alpha');

const gridStyle = {
	steps: [1,2,5],
	distance: 20,
	unit:10,
	lines: (state) => {
		const coord = state.coordinate;
		const step = state.step = scale(coord.distance * coord.zoom, coord.steps);
		return range( Math.floor(state.offset/step)*step, Math.ceil((state.offset + state.range)/step + 1)*step, step);
	},
	lineColor: state => {
		if (!state.lines) return;
		const coord = state.coordinate;

		const light = alpha(coord.color, .1);
		const heavy = alpha(coord.color, .3);

		const step = state.step;
		const power = Math.ceil(lg(step));
		const tenStep = Math.pow(10,power);
		const nextStep = Math.pow(10,power+1);
		const eps = step/10;
		const colors = state.lines.map(v => {
			if (isMultiple(v, nextStep, eps)) return heavy;
			if (isMultiple(v, tenStep, eps)) return light;
			return null;
		});
		return colors;
	},
	ticks: state => {
		if (!state.lines) return;
		const coord = state.coordinate;
		const step = scale(scale(state.step*1.1, coord.steps)*1.1, coord.steps);
		const eps = step/10;
		const tickWidth = state.axisWidth*4;
		return state.lines.map(v => {
			if (!isMultiple(v, step, eps)) return null;
			if (almost(v, 0, eps)) return null;
			return tickWidth;
		});
	},
	labels: state => {
		if (!state.lines) return;
		const coord = state.coordinate;

		const step = scale(scale(state.step*1.1, coord.steps)*1.1, coord.steps);
		// let precision = clamp(Math.abs(Math.floor(lg(step))), 10, 20);
		const eps = step/10;
		return state.lines.map(v => {
			if (!isMultiple(v, step, eps)) return null;
			if (almost(v, 0, eps)) return coord.orientation === 'y' ? null : '0';
			v = Number((v/10).toFixed(2))
			return coord.format(v);
		});
	}
};

export default gridStyle;