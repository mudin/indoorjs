import { Map, Floorplan, Marker, Polyline }  from '../src/index.js';
import './index.css';
let mapEl = document.querySelector('.my-map');

let map, polyline, markers;

map = new Map(mapEl, {
  floorplan:new Floorplan({
    url:'./fp.jpeg',
    position: [0,0],
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
  for (let i=0;i<4;i++) {
    const x = Math.random()*400 - 200;
    const y = Math.random()*400 - 200;
    let marker = new Marker([x,y],{
      text:(i+1)+'',
      draggable:true,
      zIndex:3,
      id:i
    });
    console.log('marker ',i);
    marker.addTo(map);
    markers.push(marker);
  }
  updatePolyline();
}

let updatePolyline = () => {
  if(polyline) {
    map.removeLayer(polyline);
  }
  polyline = new Polyline([],{
    zIndex:2
  });
  for (let i=0;i<markers.length;i++) {
    polyline.addPoint(markers[i].position);
  }
  polyline.addTo(map);
}

map.on('ready', ()=>{
  console.log('map is ready');
  addMarkers();
});

map.on('markerdrag', (e)=>{
  console.log('markerdrag',e);
  let id = e.target.id;
  console.log(id);
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    if(marker.id===e.target.id) {
      marker.position = [e.target.left - map.canvas.width/2., e.target.top - map.canvas.height/2.];
    }
  }
  updatePolyline();
});

window.map = map;