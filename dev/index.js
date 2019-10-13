/* eslint-disable no-undef */
import * as Indoor from '../src/Indoor.js';

import './index.css';

const mapEl = document.querySelector('.my-map');

let radar;
let markers;

const map = new Indoor.Map(mapEl, {
  floorplan: new Indoor.Floor({
    url: './fp.jpg',
    opacity: 0.7,
    width: 400,
    zIndex: 1
  }),
  minZoom: 0.001,
  maxZoom: 10
});

const addLinks = () => {
  for (let i = 1; i < markers.length; i += 1) {
    markers[i].setLinks([markers[i - 1]]);
  }
};

const addMarkers = () => {
  markers = [];
  for (let i = 0; i < 10; i += 1) {
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 400 - 200;
    const marker = new Indoor.Marker([x, y], {
      text: `${i + 1}`,
      draggable: true,
      zIndex: 100,
      id: i
    });
    // eslint-disable-next-line no-loop-func
    marker.on('ready', () => {
      marker.addTo(map);
    });
    markers.push(marker);
    window.markers = markers;
  }
  setTimeout(() => {
    addLinks();
    // eslint-disable-next-line no-use-before-define
    addRadar(markers[0]);
  }, 1000);

  const rect = Indoor.markerGroup([[0, 0], [100, 200]]);
  rect.on('moving', e => {
    console.log('moving', e);
  });
  rect.addTo(map);
};

const addRadar = marker => {
  if (radar) {
    map.removeLayer(radar);
  }
  radar = new Indoor.Marker(marker.position, {
    size: 100,
    id: marker.id,
    icon: {
      url: './radar.png'
    },
    rotation: Math.random() * 360,
    clickable: false,
    zIndex: 290
  });
  radar.on('ready', () => {
    radar.addTo(map);
  });
  window.radar = radar;
};

map.on('ready', () => {
  console.log('map is ready');
  addMarkers();
});

// map.on('marker:added', (e) => {
//   // console.log('marker:added', e);
//   // addMarkers();
// });

map.on('marker:removed', e => {
  console.log('marker:removed', e);
  // addMarkers();
});

map.on('marker:click', e => {
  console.log('marker:click', e);
  addRadar(e);
});

map.on('marker:moving', e => {
  // console.log('marker:moving', e);
  if (radar && e.id === radar.id) {
    // console.log(e);
    radar.setPosition(e.position);
  }
});
map.on('marker:moved', e => {
  // console.log('marker:moved', e);
  if (radar && e.id === radar.id) {
    // console.log(e);
    radar.setPosition(e.position);
  }
});

map.on('markergroup:moving', e => {
  console.log('markergroup:moving', e);
});
map.on('markergroup:rotating', (e, angle) => {
  console.log('markergroup:rotating', e, angle);
});

map.on('marker:rotating', (e, angle) => {
  console.log('marker:rotating', e, angle);
});

map.on('bbox:moving', () => {
  // console.log('bbox:moving', e);
});

map.on('object:drag', e => {
  console.log('object:drag', e);
});

map.on('object:scaling', e => {
  console.log('object:scaling', e);
});

map.on('object:rotate', e => {
  console.log('object:rotate', e);
});

map.on('mouse:move', () => {
  // console.log('mouse:move', e);
});

window.map2 = map;
