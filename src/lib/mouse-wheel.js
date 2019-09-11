import MagicScroll from './MagicScroll';
import toPX from './mumath/to-px';

export default mouseWheelListen;

function mouseWheelListen(element, callback, noScroll) {
  if (typeof element === 'function') {
    noScroll = !!callback;
    callback = element;
    element = window;
  }

  const magicScroll = new MagicScroll(element, 80, 12);

  magicScroll.onUpdate = function (delta, ev) {
    callback(delta, ev);
  };

  // const lineHeight = toPX('ex', element);
  // const listener = function (ev) {
  //   if (noScroll) {
  //     ev.preventDefault();
  //   }
  //   let dx = ev.deltaX || 0;
  //   let dy = ev.deltaY || 0;
  //   let dz = ev.deltaZ || 0;
  //   const mode = ev.deltaMode;
  //   let scale = 1;
  //   switch (mode) {
  //     case 1:
  //       scale = lineHeight;
  //       break;
  //     case 2:
  //       scale = window.innerHeight;
  //       break;
  //   }
  //   dx *= scale;
  //   dy *= scale;
  //   dz *= scale;
  //   if (dx || dy || dz) {
  //     return callback(dx, dy, dz, ev);
  //   }
  // };
  // element.addEventListener('wheel', listener);
  // return listener;
}
