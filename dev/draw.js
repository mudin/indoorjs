/* eslint-disable no-undef */
import * as Indoor from '../src/Indoor.js';

import './index.css';

const canvasEl = document.querySelector('.my-canvas');
const drawingColorEl = document.querySelector('#drawing-color');
const drawingLineWidthEl = document.querySelector('#drawing-line-width');
const clearEl = document.querySelector('#clear-canvas');

const canvas = new Indoor.Canvas(canvasEl, {});

function oninput() {
  canvas.setLineWidth(parseInt(this.value, 10) || 1);
}

drawingLineWidthEl.addEventListener('input', oninput, false);

drawingColorEl.onchange = function onchange() {
  canvas.setColor(this.value);
};

clearEl.onclick = function onclick() {
  canvas.clear();
};

canvas.on('mode-changed', mode => {
  console.log('mode-changed', mode);
});

window.canv = canvas;
