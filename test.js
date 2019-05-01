require('enable-mobile');
const Grid = require('./gl');
const isBrowser = require('is-browser');
const createSettings = require('settings-panel');
const insertCss = require('insert-styles');
const createFps = require('fps-indicator');
const pick = require('just-pick');

insertCss(`
	body {
		margin: 0;
		overflow: hidden;
		padding: 0;
	}
	.frame {
		display: block;
		overflow: hidden;
		min-height: 100vh;
	}

	@media (min-width:960px) {
		.frame {
			width: calc(100% - 300px);
		}
		.fps {
			right: 310px!important;
		}
	}
	@media (max-width:960px) {
		.settings-panel {
			display: none!important;
		}
		.frame {
			width: 100vw;
		}
		.fps {
			right: 10px!important;
		}
	}

	.fps {
		z-index: 2;
		font-size: 10px;
	}
`);


var frame = document.body.appendChild(document.createElement('div'));
frame.className = 'frame';


let fps = createFps({
	container: frame,
	position: 'bottom-left'
});


var settings = createSettings([
	// {id: 'use-case', type: 'select', value: 'logarithmic', options: {
	// 		'linear': '⊞ Linear',
	// 		'logarithmic': '♒ Logarithmic',
	// 		'time': '┈ Time',
	// 		// 'multigrid': '⧉ Multigrid',
	// 		// 'polar': '⊕ Polar'
	// 	}, change: v => {
	// 		if (v === 'linear') {
	// 			grid.update({
	// 				x: Grid.types.linear,
	// 				y: Grid.types.linear
	// 			});
	// 		}
	// 		//FIXME: add type = log, time, linear to options
	// 		else if (v === 'logarithmic') {
	// 			grid.update({
	// 				x: Grid.types.log,
	// 				y: Grid.types.log
	// 			});
	// 		}
	// 		else if (v === 'time') {
	// 			grid.update({
	// 				x: Grid.types.time,
	// 				{
	// 					lines: false,
	// 					pan: true,
	// 					zoom: true,
	// 					axis: Infinity,
	// 					fontSize: '11pt',
	// 					fontFamily: 'sans-serif',
	// 					offset: 0,
	// 					scale: 10,
	// 					minScale: .006,
	// 					maxScale: 120*1000,
	// 					axisWidth: 2,
	// 					min: 0,
	// 					origin: 0,
	// 					align: 0,
	// 					distance: 20,
	// 					steps: [1, 2.5, 5],
	// 					padding: [60, 0, 0, 0]
	// 				},
	// 				y: {
	// 					zoom: false,
	// 					pan: false,
	// 					axis: Infinity,
	// 					offset: 0,
	// 					origin: .5,
	// 					axisColor: 'transparent',
	// 					padding: [60, 0,0,0],
	// 					distance: 20,
	// 					scale: 20/grid.viewport[3],
	// 					// ticks: null,
	// 					labels: state => {
	// 						return state.values.map(v => -Math.abs(v).toFixed(0));
	// 					}
	// 					// lines: false
	// 				}
	// 			});
	// 		}
	// 		else if (v === 'polar') {

	// 		}
	// 	}
	// },

	// viewport: {
	// 	type: 'text',
	// 	value: [0,0,0,0],
	// 	change: (v) => {
	// 		grid.updateViewport();
	// 		grid.update();
	// 	}
	// },


	// color: {type: 'color', value: 'rgb(0, 0, 0)', change: c => {
	// 	grid.update({x:{color: c}, y:{color: c}, r:{color: c}, a:{color: c}});
	// }},


	{id: 'coord', label: 'Lines', type:'switch', title: 'Lines coordinates', value: 'x', options: {
		x: '||| x', y: '☰ y', r: '⊚ r', a: '✳ a'
	}, change: v => {
		settings.set(
			pick(grid[v], ['disabled', 'type'])
		);
	}},

	{content: '<br/>'},

	{id: 'disabled', type: 'checkbox', value: false, change: v => {
		grid.update({
			[settings.get('coord')]: {disabled: v}
		});
	}},
	{id: 'type', type: 'select', title: 'X lines type', value: 'linear', options: ['linear', 'logarithmic', 'time', 'custom'], change: v => {
			grid.update({
				[settings.get('coord')]: {type: v}
			});
		}
	},

	//offset
	//origin
	//min, max
	//minScale, maxScale
	//pan, zoom
	//padding
	{id: 'padding', type: 'range', title: 'Padding', value: 0, change: v => {
		grid.update({
			x: {padding: v},
			y: {padding: v}
		})
	}}
	//axis
	//distance
	//steps?
	//fontSize
	//offset/scale readonly
	//axisWidth
	//align

	// {id: 'y', label: '☰', title: 'Horizontal Y lines', value: true, change: v => {
	// 	grid.update({y: {disabled: !v}});
	// }},
	// {id: 'r', label: '⊚', title: 'Radial R lines', value: false, change: v => {
	// 	grid.update({r: {disabled: !v}});
	// }},
	// {id: 'a', label: '✳', title: 'Angular α lines', value: false, change: v => {
	// 	grid.update({a: {disabled: !v}});
	// }}
], {
	title: '<a href="https://github.com/dfcreative/plot-grid">plot-grid</a>',
	theme: require('settings-panel/theme/control'),
	fontSize: 11,
	palette: ['rgb(30,30,30)', 'rgb(220,220,220)'],
	fontFamily: 'monospace',
	style: `position: absolute; top: 0px; right: 0px; padding: 20px; height: 100%; width: 300px; z-index: 1;`,
	css: '.settings-panel-title {text-align: left;}'
});



//create grid
var grid = Grid({
	container: frame,
	// autostart: true,
	//x: {},
	// viewport: function (w, h) {
	// 	return [10, 10, w - 20, h - 20];
	// }
});

// grid.render()

