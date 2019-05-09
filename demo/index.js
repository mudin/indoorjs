import { Map, Floorplan, Marker, Polyline }  from '../src/index.js';
import './index.css';
let mapEl = document.querySelector('.my-map');

let map, polyline, markers;

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
  for (let i=0;i<10;i++) {
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
  updateMarkers(e.target);
  updatePolyline();
});

let updateMarkers = (obj) => {
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    if(marker.id=== obj.id) {
      var matrix = obj.calcTransformMatrix();
      let x = matrix[4] // translation in X
      let y = matrix[5] 
      marker.position = [x,y];
    }
  }
}

map.on('object:drag', (e)=>{
  console.log('object:drag',e);
  let obj = e.target;
  let objects = obj.getObjects();
  for (let j in objects) {
    updateMarkers(objects[j]);
  }
  updatePolyline();
});

map.on('object:scaling', (e)=>{
  console.log('object:scaling',e);
  let obj = e.target;
  let objects = obj.getObjects();
  for (let j in objects) {
    updateMarkers(objects[j]);
  }
  updatePolyline();
});

map.on('object:rotate', (e)=>{
  console.log('object:rotate',e);
  let obj = e.target;
  let objects = obj.getObjects();
  for (let j in objects) {
    updateMarkers(objects[j]);
  }
  updatePolyline();
});

window.map = map;