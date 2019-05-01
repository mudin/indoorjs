/**
 * Types of grids, extensions to default options
 *
 * @module plot-grid/src/types
 */

const alpha = require('color-alpha');
import { pad, range, almost, scale, clamp, isMultiple, lg} from './mumath';

let linear = {
	steps: [1,2,5],
	distance: 20,
	lines: (state) => {
		let coord = state.coordinate;

		let step = state.step = scale(coord.distance * coord.scale, coord.steps);

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
			return coord.format(v);
		});
	}
};

let	logarithmic = {
	scale: 0.002,
	offset: 0,
	distance: 13,
	lines: state => {
		let res = [];
		let coord = state.coordinate;

		//get log range numbers
		let logMinStep = coord.distance * coord.scale;

		let logMin = state.offset, logMax = state.offset + state.range;
		let logRange = state.range;

		//get linear range numbers
		let min = clamp(Math.pow(10, logMin), -Number.MAX_VALUE, Number.MAX_VALUE),
			max = clamp(Math.pow(10, logMax), -Number.MAX_VALUE, Number.MAX_VALUE);

		//local step is like interest (but not in %), or increase
		// multStep = 1/.98, 1/.99, 1/.995, 1/.998, 1/.999, ...
		// 1/multStep = .99
		// 1 -  1/multStep = .01...
		//inspiration: http://customgraph.com/SGL/piart.php?art=2161
		let localStep = 1 -  1/Math.pow(10, logMinStep);

		//calc power steps
		let logStep = Math.ceil(logMinStep);
		let step10 = Math.pow(10, logStep);

		state.step = logStep;
		state.localStep = localStep;

		let steps = [1,2,5];


		//big scales
		if (.25 < localStep) {
			//10² scale, we need only big step here
			let step = state.step = scale(logMinStep, steps);
			let bigLogStep = scale(scale(step*1.1, steps)*1.1, steps);
			state.bigStep = bigLogStep;

			//10⁵ scale, we can regenerate lines
			if (.7 < localStep)
				return range( Math.floor(logMin/step)*step, Math.ceil(logMax/step)*step, step);
		}

		let start = Math.pow(10, Math.max(Math.floor(logMin/logStep)*logStep, -300));

		//small scales
		for (let order = start; order <= max; order *= step10 ) {
			//display 1, 2, 5 * order lines
			if (.15 < localStep) {
				res = res.concat(steps.map(v => lg(v*order)));
				// state.logSteps = [logStep, logStep-lg(), logStep-lg()];
			}
			//display 1..9 * order lines
			else if (.035 < localStep) {
				res = res.concat([1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => lg(v*order)));
			}
			//try to pick proper subdivision for 2,5 ranges
			else {
				let step = scale(localStep, steps);
				let step1 = scale(step*1.1, steps);
				let step2 = scale(step1*1.1, steps);
				let step5 = scale(step2*1.1, steps);

				state.bigStep1 = step5
				state.bigStep2 = step1*10
				state.bigStep5 = step2*10

				let baseMin = Math.max(min, order)/order,
					baseMax = Math.min(max, 10*order)/order;

				if (baseMin < 2) {
					let from = Math.floor((baseMin+step1/15)/step1)*step1;
					let to = Math.min(baseMax, 2);
					let res1 = range(from, to, step1);
					if (res1) {
						res = res.concat(res1.map(v => lg(v*order)));
					}
				}
				if (baseMin <= 5 && baseMax > 2) {
					let from = Math.max(Math.floor(baseMin/step2)*step2, 2);
					let to = Math.min(baseMax, 5-step1);
					let res2 = range(from, to, step2);
					if (res2) {
						res = res.concat(res2.map(v => lg(v*order)));
					}
				}
				if (baseMax > 5) {
					let from = Math.max(Math.floor(baseMin/step5)*step5, 5);
					let to = Math.min(baseMax, 10-step1);
					let res5 = range(from, to, step5);
					if (res5) {
						res = res.concat(res5.map(v => lg(v*order)));
					}
				}
			}
		}

		return res;
	},
	lineColor: state => {
		let light = alpha(state.coordinate.color, .1);
		let heavy = alpha(state.coordinate.color, .3);


		return state.lines.map(v => {
			if ( state.coordinate.isMajorLine(v, state) ) return heavy;
			return light;
		});
	},
	ticks: state => {
		return state.lines.map(v => {
			if ( state.coordinate.isLabel(v, state) ) return state.axisWidth*4;
			return null;
		});
	},
	labels: state => {
		let precision = state.step > 2 ? 2 : 10;
		return state.lines.map(v => {
			if ( state.coordinate.isLabel(v, state) ) return state.coordinate.format(Math.pow(10, v), precision);
			return null;
		});
	},
	isMajorLine: function isMajor (v, state) {
		let base = Math.pow(10, v - Math.floor(v));

		//small scales
		if (.02 > state.localStep) {
			let bigStep = base < 2 ? state.bigStep1 : base < 5 ? state.bigStep2 : state.bigStep5;
			return almost((base+bigStep/8) % bigStep, 0, bigStep/5);
		}
		else if (.06 > state.localStep) {
			return almost(base, 2) || almost(base, 5) || almost(base, 1);
		}

		//big scales
		if (.25 < state.localStep) {
			return (Math.abs(v)+state.localStep/8)%state.bigStep <= state.localStep/5
		}
		return (Math.abs(v)+state.localStep/8)%state.step <= state.localStep/5
	},
	//more frequent than isMajorLine
	isLabel: function isLabel (v, state) {
		let base = Math.pow(10, v - Math.floor(v));

		let eps = state.localStep/2;

		//small scales
		if (.02 > state.localStep) {
			let bigStep = base < 2 ? state.bigStep1 : base < 5 ? state.bigStep2 : state.bigStep5;
			return almost((base+bigStep/8) % bigStep, 0, bigStep/5);
		}
		else if (.035 > state.localStep) {
			return almost(base, 2, eps) ||
					almost(base, 3, eps) ||
					almost(base, 4, eps) ||
					almost(base, 5, eps) ||
					almost(base, 6, eps) ||
					almost(base, 7, eps) ||
					almost(base, 8, eps) ||
					almost(base, 9, eps) ||
					almost(base, 1.5, eps) ||
					almost(base, 1, eps);
		}
		else if (.052 > state.localStep) {
			return almost(base, 2, eps) ||
					almost(base, 3, eps) ||
					almost(base, 4, eps) ||
					almost(base, 5, eps) ||
					almost(base, 1.5, eps) ||
					almost(base, 1, eps);
		}
		else if (.09 > state.localStep) {
			return almost(base, 2) || almost(base, 5) || almost(base, 1);
		}

		//big scales
		if (.25 < state.localStep) {
			return (Math.abs(v)+state.localStep/8)%state.bigStep <= state.localStep/5
		}

		return (Math.abs(v)+state.localStep/8)%state.step <= state.localStep/5
	}
};


let time = {
	lines: false,
	ticks: (state) => {
		let result = {};
		let coord = state.coordinate;

		let minStep = coord.distance * coord.scale;

		let [step, bigStep] = getTimeSteps(minStep);

		let start = Math.floor(state.offset/step-1)*step, end = Math.ceil((state.offset + state.range)/step)*step;
		start = Math.max(start, 0);

		for (let i = start; i < end; i+= step) {
			if (i % bigStep) result[i] = 5;
			else result[i] = 20;
		}

		return result;
	},
	labels: (state) => {
		let result = {};
		let coord = state.coordinate;
		let minStep = coord.distance * coord.scale;

		let [step, bigStep] = getTimeSteps(minStep);

		let start = Math.floor(state.offset/step-1)*step, end = Math.ceil((state.offset + state.range)/step)*step;
		start = Math.max(start, 0);

		function time(ts, showMs) {
			let ms = ts % 1000;
			let seconds = Math.floor(ts/1000) % 60;
			let minutes = Math.floor(ts/1000/60) % 60;
			let hours = Math.floor(ts/1000/60/60) % 60;
			let str = '';
			if (hours) str += pad(hours,2,0) + ':';
			str += pad(minutes,2,0) + ':';
			str += pad(seconds,2,0);
			if (showMs) str += ':' + pad(ms, 3, 0);
			return str;
		}

		for (let i = start; i < end; i+= step) {
			if (i % bigStep) result[i] = null;
			else result[i] = time(i, step < 100);
		}

		return result;
	}
};


function getTimeSteps (minStep) {
	let step, bigStep;

	//500ms, 250ms, 100ms, 50ms, 25ms, 10ms, 5ms, ...
	if (minStep < 500) {
		step = scale(minStep, [1, 2.5, 5]);
		bigStep = scale(step*2.1,[1, 2]);
	}
	//1s, 2s, 5s, 10s, 20s
	else if (minStep < 2500) {
		let steps = [1,2.5,5];
		step = scale(minStep, steps);
		bigStep = scale(step*2.55, steps);
	}
	else {
		let minute = 60000;
		//10s
		if (minStep < minute/12) {
			step = minute/12;
			bigStep = minute/2;
		}
		else if (minStep < minute/6) {
			step = minute/4;
			bigStep = minute;
		}
		//30s
		else if (minStep < minute/2) {
			step = minute*.5;
			bigStep = minute*2;
		}
		//1min
		else if (minStep < minute) {
			step = minute*1;
			bigStep = minute*5;
		}
		//2min
		else if (minStep < minute*2) {
			step = minute*2;
			bigStep = minute*10;
		}
		//5min
		else if (minStep < minute*5) {
			step = minute*5;
			bigStep = minute*30;

		}
		//10min
		else if (minStep < minute*10) {
			step = minute*10;
			bigStep = minute*60;
		}
		//30min
		else if (minStep < minute*30) {
			step = minute*30;
			bigStep = minute*120;
		}
		//1h+
		else {
			step = minute*60;
			bigStep = minute*240;
		}
	}
	return [step, bigStep];
}

export default {
	linear,
	logarithmic,
	time
};
