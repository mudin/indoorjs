# IndoorJS 
[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)
![gzip-size](https://img.shields.io/badge/size-18.4kb-brightgreen.svg)
<a href="http://hits.dwyl.io/mudin/indoorjs">
    <img src="http://hits.dwyl.io/mudin/indoorjs.svg" alt="HitCount">
  </a>

Indoor maps based on fabricjs with grid system, zooming, panning and anotations. 
See [demo](https://mudin.github.io/indoorjs).

![Markers and Connections demo](https://mudin.github.io/indoorjs/indoorjs.gif?raw=true)

## Usage

[![npm install indoorjs](https://nodei.co/npm/indoorjs.png?mini=true)](https://npmjs.org/package/indoorjs/)

```js
const mapEl = document.querySelector('.my-map');

let radar; let
  markers;

const map = new Indoor.Map(mapEl, {
  floorplan: new Indoor.Floor({
    url: './fp.jpeg',
    opacity: 0.4,
    width: 400,
    zIndex: 1
  }),
  minZoom: 0.001,
  maxZoom: 10,
  center: {
    x: 0,
    y: 0,
    zoom: 1
  }
});
```
