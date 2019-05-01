import { Map }  from '../src/index.js';
import './index.css';
let mapEl = document.querySelector('.my-map');

let map = new Map(mapEl, {
  minZoom:0.01,
  maxZoom:10
});

map.on('ready', ()=>{
  console.log('map is ready');
});