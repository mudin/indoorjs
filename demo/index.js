import { Map, Floorplan, Marker }  from '../src/index.js';
import './index.css';
let mapEl = document.querySelector('.my-map');

let map, markers;

map = new Map(mapEl, {
  floorplan:new Floorplan({
    url:'./fp.jpeg',
    width: 400,
    zIndex:1
  }),
  minZoom:0.001,
  maxZoom:10,
  center: {
    x:0,
    y:0,
    zoom:1
  }
});

let addMarkers = () => {
  markers = [];
  for (let i=0;i<20;i++) {
    const x = Math.random()*400 - 200;
    const y = Math.random()*400 - 200;
    let marker = new Marker([x,y],{
      text:(i+1)+'',
      draggable:true,
      zIndex:100,
      id:i
    });
    marker.addTo(map);
    markers.push(marker);
  }
  addLinks();
}

let addLinks = () => {
  for (let i=1;i<markers.length;i++) {
    markers[i].setLinks(
      [markers[i-1]]
    )
  }
}

map.on('ready', ()=>{
  console.log('map is ready');
  addMarkers();
});

map.on('markerdrag', (e)=>{
  console.log('markerdrag',e);
});

map.on('object:drag', (e)=>{
  console.log('object:drag',e);
});

map.on('object:scaling', (e)=>{
  console.log('object:scaling', e);
});

map.on('object:rotate', (e)=>{
  console.log('object:rotate', e);
});

window.map = map;