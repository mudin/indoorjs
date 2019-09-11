class MagicScroll {
  constructor(target, speed = 80, smooth = 12, current = 0, passive = false) {
    if (target === document) {
      target = document.scrollingElement
        || document.documentElement
        || document.body.parentNode
        || document.body;
    } // cross browser support for document scrolling

    this.speed = speed;
    this.smooth = smooth;
    this.moving = false;
    this.scrollTop = current * 3000;
    this.pos = this.scrollTop;
    this.frame = target === document.body && document.documentElement ? document.documentElement : target; // safari is the new IE

    target.addEventListener('wheel', scrolled, { passive });
    target.addEventListener('DOMMouseScroll', scrolled, { passive });
    const scope = this;
    function scrolled(e) {
      e.preventDefault(); // disable default scrolling

      const delta = scope.normalizeWheelDelta(e);

      scope.pos += -delta * scope.speed;
      // scope.pos = Math.max(0, Math.min(scope.pos, 3000)); // limit scrolling

      if (!scope.moving) scope.update(e);
    }
  }

  normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta) return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      return -e.detail / 3; // Firefox
    }
    return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  update(e) {
    this.moving = true;

    const delta = (this.pos - this.scrollTop) / this.smooth;

    this.scrollTop += delta;

    // this.scrollTop = Math.round(this.scrollTop);

    if (this.onUpdate) {
      this.onUpdate(delta, e);
    }
    const scope = this;
    if (Math.abs(delta) > 1) {
      requestFrame(() => {
        scope.update();
      });
    } else this.moving = false;
  }
}

export default MagicScroll;

var requestFrame = (function () {
  // requestAnimationFrame cross browser
  return (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (func) {
      window.setTimeout(func, 1000);
    }
  );
}());
