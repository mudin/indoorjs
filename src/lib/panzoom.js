import evPos from './ev-pos';
import Impetus from './impetus';
import touchPinch from './touch-pinch';
import raf from './raf';
import MagicScroll from './MagicScroll';

const panzoom = (target, cb) => {
  if (target instanceof Function) {
    cb = target;
    target = document.documentElement || document.body;
  }

  if (typeof target === 'string') target = document.querySelector(target);

  let cursor = {
    x: 0,
    y: 0
  };

  const hasPassive = () => {
    let supported = false;

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
        }
      });

      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {
      supported = false;
    }

    return supported;
  };

  let impetus;
  let magicScroll;

  let initX = 0;
  let initY = 0;
  let init = true;
  const initFn = function(e) {
    init = true;
  };
  target.addEventListener('mousedown', initFn);

  const onMouseMove = e => {
    cursor = evPos(e);
  };

  target.addEventListener('mousemove', onMouseMove);

  const wheelListener = function(e) {
    if (e) {
      cursor = evPos(e);
    }
  };

  target.addEventListener('wheel', wheelListener);
  target.addEventListener('touchstart', initFn, hasPassive() ? { passive: true } : false);

  target.addEventListener(
    'contextmenu',
    e => {
      e.preventDefault();
      return false;
    },
    false
  );

  let lastY = 0;
  let lastX = 0;
  impetus = new Impetus({
    source: target,
    update(x, y) {
      if (init) {
        init = false;
        initX = cursor.x;
        initY = cursor.y;
      }

      const e = {
        target,
        type: 'mouse',
        dx: x - lastX,
        dy: y - lastY,
        dz: 0,
        x: cursor.x,
        y: cursor.y,
        x0: initX,
        y0: initY,
        isRight: cursor.isRight
      };

      lastX = x;
      lastY = y;

      schedule(e);
    },
    stop() {
      const ev = {
        target,
        type: 'mouse',
        dx: 0,
        dy: 0,
        dz: 0,
        x: cursor.x,
        y: cursor.y,
        x0: initX,
        y0: initY
      };
      schedule(ev);
    },
    multiplier: 1,
    friction: 0.75
  });

  magicScroll = new MagicScroll(target, 80, 12, 0);

  magicScroll.onUpdate = (dy, e) => {
    schedule({
      target,
      type: 'mouse',
      dx: 0,
      dy: 0,
      dz: dy,
      x: cursor.x,
      y: cursor.y,
      x0: cursor.x,
      y0: cursor.y
    });
  };

  // mobile pinch zoom
  const pinch = touchPinch(target);
  const mult = 2;
  let initialCoords;

  pinch.on('start', curr => {
    const f1 = pinch.fingers[0];
    const f2 = pinch.fingers[1];

    initialCoords = [
      f2.position[0] * 0.5 + f1.position[0] * 0.5,
      f2.position[1] * 0.5 + f1.position[1] * 0.5
    ];

    impetus && impetus.pause();
  });
  pinch.on('end', () => {
    if (!initialCoords) return;

    initialCoords = null;

    impetus && impetus.resume();
  });
  pinch.on('change', (curr, prev) => {
    if (!pinch.pinching || !initialCoords) return;

    schedule({
      target,
      type: 'touch',
      dx: 0,
      dy: 0,
      dz: -(curr - prev) * mult,
      x: initialCoords[0],
      y: initialCoords[1],
      x0: initialCoords[0],
      y0: initialCoords[0]
    });
  });

  // schedule function to current or next frame
  let planned;
  let frameId;
  function schedule(ev) {
    if (frameId != null) {
      if (!planned) planned = ev;
      else {
        planned.dx += ev.dx;
        planned.dy += ev.dy;
        planned.dz += ev.dz;

        planned.x = ev.x;
        planned.y = ev.y;
      }

      return;
    }

    // Firefox sometimes does not clear webgl current drawing buffer
    // so we have to schedule callback to the next frame, not the current
    // cb(ev)

    frameId = raf(() => {
      cb(ev);
      frameId = null;
      if (planned) {
        const arg = planned;
        planned = null;
        schedule(arg);
      }
    });
  }

  return function unpanzoom() {
    target.removeEventListener('mousedown', initFn);
    target.removeEventListener('mousemove', onMouseMove);
    target.removeEventListener('touchstart', initFn);

    impetus.destroy();

    target.removeEventListener('wheel', wheelListener);

    pinch.disable();

    raf.cancel(frameId);
  };
};

export default panzoom;
