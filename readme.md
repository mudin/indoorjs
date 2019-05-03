# plot-grid [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges) ![gzip-size](https://img.shields.io/badge/size-18.4kb-brightgreen.svg)

Indoor maps based on fabricjs with zooming, panning, grid system and anotations. 
See [demo](https://mudin.github.io/indoorjs).


## Usage

[![npm install indoorjs](https://nodei.co/npm/indoorjs.png?mini=true)](https://npmjs.org/package/indoorjs/)

```js
import { Map } from 'indoorjs';

let imgUrl = 'path/to/floorplan image';
let mapEl = document.querySelector('.my-map');
let map = new Map(mapEl, {
  minZoom:0.01,
  maxZoom:10
});

map.on('ready', ()=>{
	console.log('map is ready');
	map.setFloorPlan(imgUrl, {
		opacity:0.7
	});
});
```
