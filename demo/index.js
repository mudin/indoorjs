import { Map, Floorplan, Marker }  from '../src/index.js';
import './index.css';
let mapEl = document.querySelector('.my-map');

let map = new Map(mapEl, {
  floorplan:new Floorplan({
    url:'./fp.jpeg',
    position: [0,0],
    width: 400
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
  for (let i=0;i<4;i++) {
    const x = Math.random()*400 - 200;
    const y = Math.random()*400 - 200;
    let marker = new Marker([x,y],{
      text:(i+1)+'',
      draggable:true
    });
    marker.addTo(map);
  }
}

map.on('ready', ()=>{
  console.log('map is ready');
  addMarkers();
});

window.map = map;