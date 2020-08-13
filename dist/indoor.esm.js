/* @preserve
 * IndoorJS 1.0.18+master.3cb5fd5, a JS library for interactive indoor maps. https://mudin.github.io/indoorjs
 * (c) 2019 Mudin Ibrahim
 */

import fabric$1 from 'fabric-pure-browser';
import EventEmitter2 from 'eventemitter2';

var version = "1.0.18+master.3cb5fd5";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Point = /*#__PURE__*/function (_fabric$Point) {
  _inherits(Point, _fabric$Point);

  var _super = _createSuper(Point);

  function Point() {
    _classCallCheck(this, Point);

    var x;
    var y;

    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    if (params.length > 1) {
      x = params[0];
      y = params[1];
    } else if (params.length === 0 || !params[0]) {
      x = 0;
      y = 0;
    } else if (Object.prototype.hasOwnProperty.call(params[0], 'x')) {
      x = params[0].x;
      y = params[0].y;
    } else if (params[0].length) {
      var _params$ = _slicedToArray(params[0], 2);

      x = _params$[0];
      y = _params$[1];
    } else {
      console.error('Parameter for Point is not valid. Use Point(x,y) or Point({x,y}) or Point([x,y])', params);
    }

    return _super.call(this, x, y);
  }

  _createClass(Point, [{
    key: "setX",
    value: function setX(x) {
      this.x = x || 0;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y || 0;
    }
  }, {
    key: "copy",
    value: function copy(point) {
      this.x = point.x;
      this.y = point.y;
    }
  }, {
    key: "getArray",
    value: function getArray() {
      return [this.x, this.y];
    }
  }]);

  return Point;
}(fabric.Point);
var point = function point() {
  for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    params[_key2] = arguments[_key2];
  }

  return _construct(Point, params);
};

var Modes = {
  SELECT: 'SELECT',
  GRAB: 'GRAB',
  MEASURE: 'MEASURE',
  DRAW: 'DRAW'
};
var MAP = {
  center: new Point(),
  zoom: 1,
  minZoom: 0,
  maxZoom: 20,
  gridEnabled: true,
  zoomEnabled: true,
  selectEnabled: true,
  mode: Modes.SELECT,
  showGrid: true
};
var MARKER = {
  position: new Point(),
  minZoom: 1,
  maxZoom: 20
};
var ICON = {
  url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAy8SURBVHhe7Z1r1BVVGcdn5n0hQZMyL62VEGmIN4xqhaV2QQwE0cxLSHbRMsH6nvVdQEWgPpUo0kUDQQGt5eqLIaho2jKF1irAoEi8QEtdXApEV/2e2SPC4Zl59z5n5szl7P9af877cp7/s/d+nnln9uzZe0/QQPTDEfC8IAivCYLoh/x8J1zF7+v4fQvcAXfBAwnlZ/k/vhMbsQ0W8jvacLrxFfsU3x4Vw6kk6Wo+F8DVJG0bfDsMov/lSfFpfAePmbLCr5myPbqN95OIi/mcx+dzcJ+WsG5QyjZ1CObzOZnPY6WCHvnjKAI8lc9FfG7TklEFUrd/JXWUulJnj05xJryFgG7WAl5lUucXqfuspA0ebggn8M8KgviWFtw6kTbQyQxW0qaL4qZ5ZCG6jECt0QLZBNK2tbTxK0ljPd5DOAmu1oLWRNJW7iTijmzP42z4gBakXiBtfxCOkUD0GoZAOkjRf7TA9BKJwX+JxWw4VALTA5DOUPSCFoyiKAcafBn+hQo8AX8PH4LLEsrP8n98JzaxbVcPTspbT2wmUofGYjCcqzU+TxLILZTzMJxDQK8Ngj4Zxv0oPAaGcCCIjdiiEa34EF/iM9qilZknKWcelFg1CucQyGe0BndK89caPBAF0Qw+x8IiB2DEN2XEZS2XsrU6dUpi9Sz+PyEFNgDyMCXapTW0XeLvFRwv5lNuqT4QF1MOhlEHbl3juuR6MOBvN7H7uimmvpijNa5dEhBuFcPr8XuccV8pUCepW763s/i91bivF94H79ca5Er+EmQkbSn8gjiuCT4Pl1D3XEYy8SUd1do8WzgBrtUa4kr83Avlul5XyHX81xwI72jtcyF+HocnitMq4yM0tuNbPPyshp+LPTYDn4UdXxqILbeKwfDYYwUxkgpu1CpuS/Qv05u/MfHXQEjbOussot+Eo1OMv+pA/vI3aRW2JT4Wwg/H3pqNk+CdWgxsSaw34+Pk2FsFcDwVWq9V1IZo/03Pflriq4cgU8qinVpMbIh2A06kv1Uq6O2HT2oVtCF66dicFnvqTYyCbXeYib1MYC317qDtWz20MuTpZ9kGQR+8Q4uRDdEuj72UgLYHeejo/SDx4XEQ0U1arGyI+Dbjo2sIp2kVGYg0cn9vXu9tEfcLiJEevyyilfULXcGZVHK3VoksonmDSn458eGRivhx+etaDLOIZg9imWBTKAZR0HNaBbKI5k20MhjiYYdxEjMtlllE8zzaQh8lO3dWqNR+dH5GrDsuJHbOi17QzTfy/PElrcCBGS+h8mgL4dV6TLOJcLzR5wfu96O/aoVlkd7+9xO9R9uIZmqxzSKajQhzHR+YpRWURTSFnYp6EG1ceuNpbLlgtFzHtULSyKlLRqhkgMMjH0TE1GnEVXKG7nQj7wwPaQWkkYK53Qs+ZqQeOYKYut0eovmtkbaNcILmOItc969MxB65I7pCi3kWyWEnYy+upx1ZGu1RMO7SYp9GcvhUonNFdInmMI3Y70B0vNF6FIgPEevXtBykEftLE60Lwqc0Z+kMb0iEHoUj/I6eA53Y/zER2iL8ouYojdjLciuPriJ8XMtFGrF3Ghyy7vlzenkb+08bmUcX8UmJvZYTjdhb3xGMwvEBzYlG7JcYmUcJuE/LiUbJKfajjSwbt2gONOL0Lez9Hjjl4QxyYD1Ih70sQ8+EjPn/QxNrxF5WrHiUi6VabjSS239in/WMILpYE6YRgX/GXz7O1XKTRnI8JdGpWKSJNPqef5UQWs8sxnix0RyJYzg6XtFEOsPrEp1H6Qi/pefoSJLjVxHIBhitCCdqAo04kVE/vy1qdSDb51qPDmKr7lBm/cwZ218YiUeFsFjLlUZs1bkaf9aMNXIEyV64HpVCNEXLlUaMZfLoYfslycpeq/tJ7OT0r11DPMrF0eTG6jKAnYzfHLrCOLpKM9SI8Qqj8aggrDfd5AQg71g4iPmakcYoiGYmGo/KIbpRy5lGjH9iNAaPaUYag6C/KduXNRD9YzgIrLajwXit0cQrdKOXNKNWYidDibIBlEc1MZgcWQ3lY7cd+0EiGs4vVo8Vse10kqFH8bB6lC85x1Z2UA3O0ww0YpvbXHOPwmC9hgNb2c7Ofqk3trXfubL5CKdrudMotgiim7UvNQZBn3/6V3n0Wz8dJPc/FoXVjlUYy772I0XgUWmMkFxpOWwltrIzW7BK+7KVOJVe49Ei8Kg0hpIry7u6+D0J4Trty1biVF62YLPfvke5IEfRBi2HrcRUFo3YvQQBwydj9x51gNWUcck9ttEO7ctWYiivVPGoBx7RcthKcr8TW7uXOWAo1wuPemCllsNWSu6xtVsDgKGfAVwfWM0Ultxj6w+ABsLpAPCXgObB6RLgO4HNg1Mn0N8GNg+2t4FbsbXbBwBjPxBUD7gMBD0tAj8U3Cy4DgU7PQyKJxB4VBouD4Pugv5xcLPQP07LnUZyL4+D/YSQZiG8RsudRmxlQkjf+dqXGjEecIMBj9LhsMFHn0wJc5oUKq9l96g2bDv1ByeF+mnhzYFMC9+q5a6V2B2cFi5wWBgSnGMkHhVEWwtDBNZLwyhgRqLxqBzaXhrmF4c2BC6LQw97k4vL8vDXsPfLw6sHWR7+qpazVmLXujxcELlsEHFJIvKoDKLJWq40YvsCgiOe6/gtYuqNe7RcacRW2yImnKQZa+QI8ptEVQu5bBLltE0cB8y3E51H6Qi/qeVIoxwoCDhgdDicRkJ59btHJRCu0XKkEeOsy7d9R0KI4Fyj8ygR1k//hOQ4swN/FAZ+s+h6YYmWG43kdhv2Q4wsHQ4bDMT3k2cYmUcJOJ0cuGwXb7XBx2k4dXlhxG+MzKME3KvlRCM5lad/1i+SfFhzojFx/Ckj8+gixjr+of7OyKwQOr0p3N8RlAH7LeKF2F+YCG0RPq05SiP2302EHoUjvF7LQRqxfyYRuiCaqjlLI/YywOBfHFk8jpNYazlII/aXJVpX2O0e8i4R3G10HgVioRb7NMqZPNG1g/AizWkWOdquSMQeuSO6XIt5FslhJy+PjmF9RyCkkq+j8a+Pzx8yZ8P19fEuPf9UjKZg68EGIUedLCSNjNwjBxDL8Akt1mlEkusg3WytkCyimWekHjlgrhbjLKK51UjzgTwj+JtWUBbR+HcLdIxohhbbLKLZiDDrBZFtYbxW2EDk1HXYmyk8XBBdqcV0ICJ0HfSxxjytwCzSiP3oCqtQgzGe2O3TYppFdAuMvBgMolLWk0ffJZo30Y4zLjws8Bli9oYWyyyikcmeg42L4nAWBe3RKpBFaZCMKyQ+PFIRTiBWTrd7QjR7EY8xPgqH/RLkQ0kluRz4PkE6oqug82nfsPtL92/TKzIwaeRNiQ+Pg4hmarGyIeK5xkf3sVyrkA3R3gH7Yi+9DYnB7VqMbIj2wdhLSeBe0+2B0aFEvwaOij31Jj4OrVdmt5LYy3bvA87xKxoncPqy2pZMI9qdvdkviK/3Vpt0akQr2/adaHyVj5Op0GatorbEx8/hSbG3ZkOS9jMtBrYk1i/iY3jsrUI4hYpt0ipsS/TbORvckPhrIKRt0Xat7bZMkn+q8Vc9yH5D67WKuxA/f4BNWnQig2CPam11IbGV0/6I2GOFIac4q71qs0hj38HPr2Cd31Us2+n8krZYbcKVRfzII/baXCLlSdQyrSGuJHjyXFvWHlwgjmuC8+F91N1pHkUa8bUclt7bbwdtDxZpJKCPch29Dr8fNO4rBeokK6ajjk/1hxK/txv3tUV4LUHZrTWuXeJPtjhbxOelfA6LiykHx1KHqXxKXTrq3LUSf3vCIPyGKab+4DoePqs1tFMmB8My/H/PlFPoPobim+t6XNb9lG21v6Ir8fsn/I+VApsECZ7zfAJXEry/U45sgz6LRE1PNriWnrNsdW/zvgOxEVs0oo3308VXsEp8a2XmScqR5/lN3owznEggO75VdCHl7YUvwQ1UQJaxPQJXwqUJ5Wf5P74Tm9h2r+arKFIet3jhJOrQExgK59Boq33tm0xisI9YyAROiUnPQe6TV2iB6QXSdjnz1HmcIy9Ekzn9tf1UrG6krWto85Sk8R7vIbqc4HQ8ilhVStto41eTxnqkI17PJr1u6w0QqkraIBtocFcinV8PV5wFZxPEwm+/8qbU2dQ9OFsa4tEZhhBQGfW7h89CBl/yoNSNOi7mU9bj13Lsvg4YRoClA7WAz+dhLg9c2qGUbeoge+/HdSpzWLpnMYrr6zQ+fwqldy2DOFZvzXCh+DS+4zdtUFZcZi/PZ6wsZGWMvAzpApIkD6Ju5md5QaJ0xNbx+xa4A+6CBxLKz/J/W7GRiZYylIwm+pHxET+KHgkLX3XTXQTB/wEErHoK8OgOXgAAAABJRU5ErkJggg==',
  size: [128, 128],
  anchor: [64, 64]
};
fabric.Object.prototype.originX = 'center';
fabric.Object.prototype.originY = 'center';
fabric.Object.prototype.lockUniScaling = true;
fabric.Object.prototype.lockScalingFlip = true;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.centeredScaling = true; // fabric.Object.prototype.cornerStyle = 'circle';

fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.borderColor = 'blue';
fabric.Object.prototype.borderOpacity = 0.7;
fabric.Object.prototype.cornerOpacity = 0.7;
fabric.Object.prototype.cornerStrokeColor = 'blue';
fabric.Object.prototype.borderColor = '#ff0099';
fabric.Object.prototype.cornerColor = '#00eaff';
fabric.Object.prototype.cornerStrokeColor = '#00bbff';
fabric.Object.prototype.objectCaching = false;
fabric.Group.prototype.objectCaching = true;
fabric.Group.prototype.selectionBackgroundColor = 'rgba(45,207,171,0.25)';
fabric.Object.prototype.borderDashArray = [3, 3];
fabric.Object.prototype.padding = 5;

fabric.Object.prototype.getBounds = function getBounds() {
  var coords = [];
  coords.push(new Point(this.left - this.width / 2.0, this.top - this.height / 2.0));
  coords.push(new Point(this.left + this.width / 2.0, this.top + this.height / 2.0));
  return coords;
};

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

var isNum = function isNum(val) {
  return typeof val === 'number' && !isNaN(val);
};

var evPos = (function (ev, toElement) {
  toElement = toElement || ev.currentTarget;
  var toElementBoundingRect = toElement.getBoundingClientRect();
  var orgEv = ev.originalEvent || ev;
  var hasTouches = ev.touches && ev.touches.length;
  var pageX = 0;
  var pageY = 0;

  if (hasTouches) {
    if (isNum(ev.touches[0].pageX) && isNum(ev.touches[0].pageY)) {
      pageX = ev.touches[0].pageX;
      pageY = ev.touches[0].pageY;
    } else if (isNum(ev.touches[0].clientX) && isNum(ev.touches[0].clientY)) {
      pageX = orgEv.touches[0].clientX;
      pageY = orgEv.touches[0].clientY;
    }
  } else if (isNum(ev.pageX) && isNum(ev.pageY)) {
    pageX = ev.pageX;
    pageY = ev.pageY;
  } else if (ev.currentPoint && isNum(ev.currentPoint.x) && isNum(ev.currentPoint.y)) {
    pageX = ev.currentPoint.x;
    pageY = ev.currentPoint.y;
  }

  var isRight = false;

  if ('which' in ev) {
    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    isRight = ev.which == 3;
  } else if ('button' in ev) {
    // IE, Opera
    isRight = ev.button == 2;
  }

  return {
    x: pageX - toElementBoundingRect.left,
    y: pageY - toElementBoundingRect.top,
    isRight: isRight
  };
});

var stopThresholdDefault = 0.3;
var bounceDeceleration = 0.04;
var bounceAcceleration = 0.11; // fixes weird safari 10 bug where preventDefault is prevented
// @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356

window.addEventListener('touchmove', function () {});

var Impetus = function Impetus(_ref) {
  var _ref$source = _ref.source,
      sourceEl = _ref$source === void 0 ? document : _ref$source,
      updateCallback = _ref.update,
      stopCallback = _ref.stop,
      _ref$multiplier = _ref.multiplier,
      multiplier = _ref$multiplier === void 0 ? 1 : _ref$multiplier,
      _ref$friction = _ref.friction,
      friction = _ref$friction === void 0 ? 0.92 : _ref$friction,
      initialValues = _ref.initialValues,
      boundX = _ref.boundX,
      boundY = _ref.boundY,
      _ref$bounce = _ref.bounce,
      bounce = _ref$bounce === void 0 ? true : _ref$bounce;

  _classCallCheck(this, Impetus);

  var boundXmin;
  var boundXmax;
  var boundYmin;
  var boundYmax;
  var pointerLastX;
  var pointerLastY;
  var pointerCurrentX;
  var pointerCurrentY;
  var pointerId;
  var decVelX;
  var decVelY;
  var targetX = 0;
  var targetY = 0;
  var stopThreshold = stopThresholdDefault * multiplier;
  var ticking = false;
  var pointerActive = false;
  var paused = false;
  var decelerating = false;
  var trackingPoints = [];
  /**
   * Initialize instance
   */

  (function init() {
    sourceEl = typeof sourceEl === 'string' ? document.querySelector(sourceEl) : sourceEl;

    if (!sourceEl) {
      throw new Error('IMPETUS: source not found.');
    }

    if (!updateCallback) {
      throw new Error('IMPETUS: update function not defined.');
    }

    if (initialValues) {
      if (initialValues[0]) {
        targetX = initialValues[0];
      }

      if (initialValues[1]) {
        targetY = initialValues[1];
      }

      callUpdateCallback();
    } // Initialize bound values


    if (boundX) {
      boundXmin = boundX[0];
      boundXmax = boundX[1];
    }

    if (boundY) {
      boundYmin = boundY[0];
      boundYmax = boundY[1];
    }

    sourceEl.addEventListener('touchstart', onDown);
    sourceEl.addEventListener('mousedown', onDown);
  })();
  /**
   * In edge cases where you may need to
   * reinstanciate Impetus on the same sourceEl
   * this will remove the previous event listeners
   */


  this.destroy = function () {
    sourceEl.removeEventListener('touchstart', onDown);
    sourceEl.removeEventListener('mousedown', onDown);
    cleanUpRuntimeEvents(); // however it won't "destroy" a reference
    // to instance if you'd like to do that
    // it returns null as a convinience.
    // ex: `instance = instance.destroy();`

    return null;
  };
  /**
   * Disable movement processing
   * @public
   */


  this.pause = function () {
    cleanUpRuntimeEvents();
    pointerActive = false;
    paused = true;
  };
  /**
   * Enable movement processing
   * @public
   */


  this.resume = function () {
    paused = false;
  };
  /**
   * Update the current x and y values
   * @public
   * @param {Number} x
   * @param {Number} y
   */


  this.setValues = function (x, y) {
    if (typeof x === 'number') {
      targetX = x;
    }

    if (typeof y === 'number') {
      targetY = y;
    }
  };
  /**
   * Update the multiplier value
   * @public
   * @param {Number} val
   */


  this.setMultiplier = function (val) {
    multiplier = val;
    stopThreshold = stopThresholdDefault * multiplier;
  };
  /**
   * Update boundX value
   * @public
   * @param {Number[]} boundX
   */


  this.setBoundX = function (boundX) {
    boundXmin = boundX[0];
    boundXmax = boundX[1];
  };
  /**
   * Update boundY value
   * @public
   * @param {Number[]} boundY
   */


  this.setBoundY = function (boundY) {
    boundYmin = boundY[0];
    boundYmax = boundY[1];
  };
  /**
   * Removes all events set by this instance during runtime
   */


  function cleanUpRuntimeEvents() {
    // Remove all touch events added during 'onDown' as well.
    document.removeEventListener('touchmove', onMove, getPassiveSupported() ? {
      passive: false
    } : false);
    document.removeEventListener('touchend', onUp);
    document.removeEventListener('touchcancel', stopTracking);
    document.removeEventListener('mousemove', onMove, getPassiveSupported() ? {
      passive: false
    } : false);
    document.removeEventListener('mouseup', onUp);
  }
  /**
   * Add all required runtime events
   */


  function addRuntimeEvents() {
    cleanUpRuntimeEvents(); // @see https://developers.google.com/web/updates/2017/01/scrolling-intervention

    document.addEventListener('touchmove', onMove, getPassiveSupported() ? {
      passive: false
    } : false);
    document.addEventListener('touchend', onUp);
    document.addEventListener('touchcancel', stopTracking);
    document.addEventListener('mousemove', onMove, getPassiveSupported() ? {
      passive: false
    } : false);
    document.addEventListener('mouseup', onUp);
  }
  /**
   * Executes the update function
   */


  function callUpdateCallback() {
    updateCallback.call(sourceEl, targetX, targetY);
  }
  /**
   * Creates a custom normalized event object from touch and mouse events
   * @param  {Event} ev
   * @returns {Object} with x, y, and id properties
   */


  function normalizeEvent(ev) {
    if (ev.type === 'touchmove' || ev.type === 'touchstart' || ev.type === 'touchend') {
      var touch = ev.targetTouches[0] || ev.changedTouches[0];
      return {
        x: touch.clientX,
        y: touch.clientY,
        id: touch.identifier
      };
    } // mouse events


    return {
      x: ev.clientX,
      y: ev.clientY,
      id: null
    };
  }
  /**
   * Initializes movement tracking
   * @param  {Object} ev Normalized event
   */


  function onDown(ev) {
    var event = normalizeEvent(ev);

    if (!pointerActive && !paused) {
      pointerActive = true;
      decelerating = false;
      pointerId = event.id;
      pointerLastX = pointerCurrentX = event.x;
      pointerLastY = pointerCurrentY = event.y;
      trackingPoints = [];
      addTrackingPoint(pointerLastX, pointerLastY);
      addRuntimeEvents();
    }
  }
  /**
   * Handles move events
   * @param  {Object} ev Normalized event
   */


  function onMove(ev) {
    ev.preventDefault();
    var event = normalizeEvent(ev);

    if (pointerActive && event.id === pointerId) {
      pointerCurrentX = event.x;
      pointerCurrentY = event.y;
      addTrackingPoint(pointerLastX, pointerLastY);
      requestTick();
    }
  }
  /**
   * Handles up/end events
   * @param {Object} ev Normalized event
   */


  function onUp(ev) {
    var event = normalizeEvent(ev);

    if (pointerActive && event.id === pointerId) {
      stopTracking();
    }
  }
  /**
   * Stops movement tracking, starts animation
   */


  function stopTracking() {
    pointerActive = false;
    addTrackingPoint(pointerLastX, pointerLastY);
    startDecelAnim();
    cleanUpRuntimeEvents();
  }
  /**
   * Records movement for the last 100ms
   * @param {number} x
   * @param {number} y [description]
   */


  function addTrackingPoint(x, y) {
    var time = Date.now();

    while (trackingPoints.length > 0) {
      if (time - trackingPoints[0].time <= 100) {
        break;
      }

      trackingPoints.shift();
    }

    trackingPoints.push({
      x: x,
      y: y,
      time: time
    });
  }
  /**
   * Calculate new values, call update function
   */


  function updateAndRender() {
    var pointerChangeX = pointerCurrentX - pointerLastX;
    var pointerChangeY = pointerCurrentY - pointerLastY;
    targetX += pointerChangeX * multiplier;
    targetY += pointerChangeY * multiplier;

    if (bounce) {
      var diff = checkBounds();

      if (diff.x !== 0) {
        targetX -= pointerChangeX * dragOutOfBoundsMultiplier(diff.x) * multiplier;
      }

      if (diff.y !== 0) {
        targetY -= pointerChangeY * dragOutOfBoundsMultiplier(diff.y) * multiplier;
      }
    } else {
      checkBounds(true);
    }

    callUpdateCallback();
    pointerLastX = pointerCurrentX;
    pointerLastY = pointerCurrentY;
    ticking = false;
  }
  /**
   * Returns a value from around 0.5 to 1, based on distance
   * @param {Number} val
   */


  function dragOutOfBoundsMultiplier(val) {
    return 0.000005 * Math.pow(val, 2) + 0.0001 * val + 0.55;
  }
  /**
   * prevents animating faster than current framerate
   */


  function requestTick() {
    if (!ticking) {
      requestAnimFrame(updateAndRender);
    }

    ticking = true;
  }
  /**
   * Determine position relative to bounds
   * @param {Boolean} restrict Whether to restrict target to bounds
   */


  function checkBounds(restrict) {
    var xDiff = 0;
    var yDiff = 0;

    if (boundXmin !== undefined && targetX < boundXmin) {
      xDiff = boundXmin - targetX;
    } else if (boundXmax !== undefined && targetX > boundXmax) {
      xDiff = boundXmax - targetX;
    }

    if (boundYmin !== undefined && targetY < boundYmin) {
      yDiff = boundYmin - targetY;
    } else if (boundYmax !== undefined && targetY > boundYmax) {
      yDiff = boundYmax - targetY;
    }

    if (restrict) {
      if (xDiff !== 0) {
        targetX = xDiff > 0 ? boundXmin : boundXmax;
      }

      if (yDiff !== 0) {
        targetY = yDiff > 0 ? boundYmin : boundYmax;
      }
    }

    return {
      x: xDiff,
      y: yDiff,
      inBounds: xDiff === 0 && yDiff === 0
    };
  }
  /**
   * Initialize animation of values coming to a stop
   */


  function startDecelAnim() {
    var firstPoint = trackingPoints[0];
    var lastPoint = trackingPoints[trackingPoints.length - 1];
    var xOffset = lastPoint.x - firstPoint.x;
    var yOffset = lastPoint.y - firstPoint.y;
    var timeOffset = lastPoint.time - firstPoint.time;
    var D = timeOffset / 15 / multiplier;
    decVelX = xOffset / D || 0; // prevent NaN

    decVelY = yOffset / D || 0;
    var diff = checkBounds();

    if (Math.abs(decVelX) > 1 || Math.abs(decVelY) > 1 || !diff.inBounds) {
      decelerating = true;
      requestAnimFrame(stepDecelAnim);
    } else if (stopCallback) {
      stopCallback(sourceEl);
    }
  }
  /**
   * Animates values slowing down
   */


  function stepDecelAnim() {
    if (!decelerating) {
      return;
    }

    decVelX *= friction;
    decVelY *= friction;
    targetX += decVelX;
    targetY += decVelY;
    var diff = checkBounds();

    if (Math.abs(decVelX) > stopThreshold || Math.abs(decVelY) > stopThreshold || !diff.inBounds) {
      if (bounce) {
        var reboundAdjust = 2.5;

        if (diff.x !== 0) {
          if (diff.x * decVelX <= 0) {
            decVelX += diff.x * bounceDeceleration;
          } else {
            var adjust = diff.x > 0 ? reboundAdjust : -reboundAdjust;
            decVelX = (diff.x + adjust) * bounceAcceleration;
          }
        }

        if (diff.y !== 0) {
          if (diff.y * decVelY <= 0) {
            decVelY += diff.y * bounceDeceleration;
          } else {
            var _adjust = diff.y > 0 ? reboundAdjust : -reboundAdjust;

            decVelY = (diff.y + _adjust) * bounceAcceleration;
          }
        }
      } else {
        if (diff.x !== 0) {
          if (diff.x > 0) {
            targetX = boundXmin;
          } else {
            targetX = boundXmax;
          }

          decVelX = 0;
        }

        if (diff.y !== 0) {
          if (diff.y > 0) {
            targetY = boundYmin;
          } else {
            targetY = boundYmax;
          }

          decVelY = 0;
        }
      }

      callUpdateCallback();
      requestAnimFrame(stepDecelAnim);
    } else {
      decelerating = false;

      if (stopCallback) {
        stopCallback(sourceEl);
      }
    }
  }
};

var requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

function getPassiveSupported() {
  var passiveSupported = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        passiveSupported = true;
      }
    });
    window.addEventListener('test', null, options);
  } catch (err) {}

  getPassiveSupported = function getPassiveSupported() {
    return passiveSupported;
  };

  return passiveSupported;
}

var rootPosition = {
  left: 0,
  top: 0
};

function mouseEventOffset(ev, target, out) {
  target = target || ev.currentTarget || ev.srcElement;

  if (!Array.isArray(out)) {
    out = [0, 0];
  }

  var cx = ev.clientX || 0;
  var cy = ev.clientY || 0;
  var rect = getBoundingClientOffset(target);
  out[0] = cx - rect.left;
  out[1] = cy - rect.top;
  return out;
}

function getBoundingClientOffset(element) {
  if (element === window || element === document || element === document.body) {
    return rootPosition;
  } else {
    return element.getBoundingClientRect();
  }
}

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

function touchPinch(target) {
  target = target || window;
  var emitter = new EventEmitter2();
  var _fingers = [null, null];
  var activeCount = 0;
  var lastDistance = 0;
  var ended = false;
  var enabled = false; // some read-only values

  Object.defineProperties(emitter, {
    pinching: function pinching() {
      return activeCount === 2;
    },
    fingers: function fingers() {
      return _fingers;
    }
  });
  enable();
  emitter.enable = enable;
  emitter.disable = disable;
  emitter.indexOfTouch = indexOfTouch;
  return emitter;

  function indexOfTouch(touch) {
    var id = touch.identifier;

    for (var i = 0; i < _fingers.length; i++) {
      if (_fingers[i] && _fingers[i].touch && _fingers[i].touch.identifier === id) {
        return i;
      }
    }

    return -1;
  }

  function enable() {
    if (enabled) return;
    enabled = true;
    target.addEventListener('touchstart', onTouchStart, false);
    target.addEventListener('touchmove', onTouchMove, false);
    target.addEventListener('touchend', onTouchRemoved, false);
    target.addEventListener('touchcancel', onTouchRemoved, false);
  }

  function disable() {
    if (!enabled) return;
    enabled = false;
    activeCount = 0;
    _fingers[0] = null;
    _fingers[1] = null;
    lastDistance = 0;
    ended = false;
    target.removeEventListener('touchstart', onTouchStart, false);
    target.removeEventListener('touchmove', onTouchMove, false);
    target.removeEventListener('touchend', onTouchRemoved, false);
    target.removeEventListener('touchcancel', onTouchRemoved, false);
  }

  function onTouchStart(ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var newTouch = ev.changedTouches[i];
      var id = newTouch.identifier;
      var idx = indexOfTouch(id);

      if (idx === -1 && activeCount < 2) {
        var first = activeCount === 0; // newest and previous finger (previous may be undefined)

        var newIndex = _fingers[0] ? 1 : 0;
        var oldIndex = _fingers[0] ? 0 : 1;
        var newFinger = new Finger(); // add to stack

        _fingers[newIndex] = newFinger;
        activeCount++; // update touch event & position

        newFinger.touch = newTouch;
        mouseEventOffset(newTouch, target, newFinger.position);
        var oldTouch = _fingers[oldIndex] ? _fingers[oldIndex].touch : undefined;
        emitter.emit('place', newTouch, oldTouch);

        if (!first) {
          var initialDistance = computeDistance();
          ended = false;
          emitter.emit('start', initialDistance);
          lastDistance = initialDistance;
        }
      }
    }
  }

  function onTouchMove(ev) {
    var changed = false;

    for (var i = 0; i < ev.changedTouches.length; i++) {
      var movedTouch = ev.changedTouches[i];
      var idx = indexOfTouch(movedTouch);

      if (idx !== -1) {
        changed = true;
        _fingers[idx].touch = movedTouch; // avoid caching touches

        mouseEventOffset(movedTouch, target, _fingers[idx].position);
      }
    }

    if (activeCount === 2 && changed) {
      var currentDistance = computeDistance();
      emitter.emit('change', currentDistance, lastDistance);
      lastDistance = currentDistance;
    }
  }

  function onTouchRemoved(ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var removed = ev.changedTouches[i];
      var idx = indexOfTouch(removed);

      if (idx !== -1) {
        _fingers[idx] = null;
        activeCount--;
        var otherIdx = idx === 0 ? 1 : 0;
        var otherTouch = _fingers[otherIdx] ? _fingers[otherIdx].touch : undefined;
        emitter.emit('lift', removed, otherTouch);
      }
    }

    if (!ended && activeCount !== 2) {
      ended = true;
      emitter.emit('end');
    }
  }

  function computeDistance() {
    if (activeCount < 2) return 0;
    return distance(_fingers[0].position, _fingers[1].position);
  }
}

function Finger() {
  this.position = [0, 0];
  this.touch = null;
}

function getPrefixed(name) {
  return window['webkit' + name] || window['moz' + name] || window['ms' + name];
}

var lastTime = 0; // fallback for IE 7-8

function timeoutDefer(fn) {
  var time = +new Date(),
      timeToCall = Math.max(0, 16 - (time - lastTime));
  lastTime = time + timeToCall;
  return window.setTimeout(fn, timeToCall);
}

function bind(fn, obj) {
  var slice = Array.prototype.slice;

  if (fn.bind) {
    return fn.bind.apply(fn, slice.call(arguments, 1));
  }

  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
  };
}
var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') || getPrefixed('CancelRequestAnimationFrame') || function (id) {
  window.clearTimeout(id);
};

var raf = function raf(fn, context, immediate) {
  if (immediate && requestFn === timeoutDefer) {
    fn.call(context);
  } else {
    return requestFn.call(window, bind(fn, context));
  }
};

raf.cancel = function (id) {
  if (id) {
    cancelFn.call(window, id);
  }
};

var MagicScroll = /*#__PURE__*/function () {
  function MagicScroll(target) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 80;
    var smooth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
    var current = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, MagicScroll);

    if (target === document) {
      target = document.scrollingElement || document.documentElement || document.body.parentNode || document.body;
    } // cross browser support for document scrolling


    this.speed = speed;
    this.smooth = smooth;
    this.moving = false;
    this.scrollTop = current * 3000;
    this.pos = this.scrollTop;
    this.frame = target === document.body && document.documentElement ? document.documentElement : target; // safari is the new IE

    target.addEventListener('wheel', scrolled, {
      passive: passive
    });
    target.addEventListener('DOMMouseScroll', scrolled, {
      passive: passive
    });
    var scope = this;

    function scrolled(e) {
      e.preventDefault(); // disable default scrolling

      var delta = scope.normalizeWheelDelta(e);
      scope.pos += -delta * scope.speed; // scope.pos = Math.max(0, Math.min(scope.pos, 3000)); // limit scrolling

      if (!scope.moving) scope.update(e);
    }
  }

  _createClass(MagicScroll, [{
    key: "normalizeWheelDelta",
    value: function normalizeWheelDelta(e) {
      if (e.detail) {
        if (e.wheelDelta) return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1); // Opera

        return -e.detail / 3; // Firefox
      }

      return e.wheelDelta / 120; // IE,Safari,Chrome
    }
  }, {
    key: "update",
    value: function update(e) {
      this.moving = true;
      var delta = (this.pos - this.scrollTop) / this.smooth;
      this.scrollTop += delta; // this.scrollTop = Math.round(this.scrollTop);

      if (this.onUpdate) {
        this.onUpdate(delta, e);
      }

      var scope = this;

      if (Math.abs(delta) > 1) {
        requestFrame(function () {
          scope.update();
        });
      } else this.moving = false;
    }
  }]);

  return MagicScroll;
}();

var requestFrame = function () {
  // requestAnimationFrame cross browser
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
    window.setTimeout(func, 1000);
  };
}();

var panzoom = function panzoom(target, cb) {
  if (target instanceof Function) {
    cb = target;
    target = document.documentElement || document.body;
  }

  if (typeof target === 'string') target = document.querySelector(target);
  var cursor = {
    x: 0,
    y: 0
  };

  var hasPassive = function hasPassive() {
    var supported = false;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
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

  var impetus;
  var magicScroll;
  var initX = 0;
  var initY = 0;
  var init = true;

  var initFn = function initFn(e) {
    init = true;
  };

  target.addEventListener('mousedown', initFn);

  var onMouseMove = function onMouseMove(e) {
    cursor = evPos(e);
  };

  target.addEventListener('mousemove', onMouseMove);

  var wheelListener = function wheelListener(e) {
    if (e) {
      cursor = evPos(e);
    }
  };

  target.addEventListener('wheel', wheelListener);
  target.addEventListener('touchstart', initFn, hasPassive() ? {
    passive: true
  } : false);
  target.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, false);
  var lastY = 0;
  var lastX = 0;
  impetus = new Impetus({
    source: target,
    update: function update(x, y) {
      if (init) {
        init = false;
        initX = cursor.x;
        initY = cursor.y;
      }

      var e = {
        target: target,
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
    stop: function stop() {
      var ev = {
        target: target,
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

  magicScroll.onUpdate = function (dy, e) {
    schedule({
      target: target,
      type: 'mouse',
      dx: 0,
      dy: 0,
      dz: dy,
      x: cursor.x,
      y: cursor.y,
      x0: cursor.x,
      y0: cursor.y
    });
  }; // mobile pinch zoom


  var pinch = touchPinch(target);
  var mult = 2;
  var initialCoords;
  pinch.on('start', function (curr) {
    var f1 = pinch.fingers[0];
    var f2 = pinch.fingers[1];
    initialCoords = [f2.position[0] * 0.5 + f1.position[0] * 0.5, f2.position[1] * 0.5 + f1.position[1] * 0.5];
    impetus && impetus.pause();
  });
  pinch.on('end', function () {
    if (!initialCoords) return;
    initialCoords = null;
    impetus && impetus.resume();
  });
  pinch.on('change', function (curr, prev) {
    if (!pinch.pinching || !initialCoords) return;
    schedule({
      target: target,
      type: 'touch',
      dx: 0,
      dy: 0,
      dz: -(curr - prev) * mult,
      x: initialCoords[0],
      y: initialCoords[1],
      x0: initialCoords[0],
      y0: initialCoords[0]
    });
  }); // schedule function to current or next frame

  var planned;
  var frameId;

  function schedule(ev) {
    if (frameId != null) {
      if (!planned) planned = ev;else {
        planned.dx += ev.dx;
        planned.dy += ev.dy;
        planned.dz += ev.dz;
        planned.x = ev.x;
        planned.y = ev.y;
      }
      return;
    } // Firefox sometimes does not clear webgl current drawing buffer
    // so we have to schedule callback to the next frame, not the current
    // cb(ev)


    frameId = raf(function () {
      cb(ev);
      frameId = null;

      if (planned) {
        var arg = planned;
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

/**
 * Clamp value.
 * Detects proper clamp min/max.
 *
 * @param {number} a Current value to cut off
 * @param {number} min One side limit
 * @param {number} max Other side limit
 *
 * @return {number} Clamped value
 */
function clamp(a, min, max) {
  return max > min ? Math.max(Math.min(a, max), min) : Math.max(Math.min(a, min), max);
}

/**
 * Return quadratic length
 *
 * @module  mumath/len
 *
 */
function len(a, b) {
  return Math.sqrt(a * a + b * b);
}

// Type definitions for almost-equal 1.1
// Project: https://github.com/mikolalysenko/almost-equal#readme
// Definitions by: Curtis Maddalozzo <https://github.com/cmaddalozzo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
var abs = Math.abs;
var min = Math.min;

function almostEqual(a, b, absoluteError, relativeError) {
  var d = abs(a - b);
  if (absoluteError == null) absoluteError = almostEqual.DBL_EPSILON;
  if (relativeError == null) relativeError = absoluteError;

  if (d <= absoluteError) {
    return true;
  }

  if (d <= relativeError * min(abs(a), abs(b))) {
    return true;
  }

  return a === b;
}

var FLT_EPSILON = 1.19209290e-7;
var DBL_EPSILON = 2.2204460492503131e-16;
almostEqual.FLT_EPSILON = FLT_EPSILON;
almostEqual.DBL_EPSILON = DBL_EPSILON;

// The MIT License (MIT)
// Copyright (c) 2016 angus croll
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/*
  range(0, 5); // [0, 1, 2, 3, 4]
  range(5); // [0, 1, 2, 3, 4]
  range(-5); // [0, -1, -2, -3, -4]
  range(0, 20, 5) // [0, 5, 10, 15]
  range(0, -20, -5) // [0, -5, -10, -15]
*/
function range(start, stop, step) {
  if (start != null && typeof start != 'number') {
    throw new Error('start must be a number or null');
  }

  if (stop != null && typeof stop != 'number') {
    throw new Error('stop must be a number or null');
  }

  if (step != null && typeof step != 'number') {
    throw new Error('step must be a number or null');
  }

  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (step == null) {
    step = stop > start ? 1 : -1;
  }

  var toReturn = [];
  var increasing = start < stop; //← here’s the change

  for (; increasing ? start < stop : start > stop; start += step) {
    toReturn.push(start);
  }

  return toReturn;
}

/**
 * Base 10 logarithm
 *
 * @module mumath/log10
 */

var lg = Math.log10 || function (a) {
  return Math.log(a) / Math.log(10);
};

/**
 * Check if one number is multiple of other
 *
 * @module  mumath/is-multiple
 */
function isMultiple(a, b, eps) {
  var remainder = a % b;
  if (!eps) eps = almostEqual.FLT_EPSILON;
  if (!remainder) return true;
  if (almostEqual(0, remainder, eps, 0) || almostEqual(Math.abs(b), Math.abs(remainder), eps, 0)) return true;
  return false;
}

/**
 * Get step out of the set
 *
 * @module mumath/step
 */
function scale (minStep, srcSteps) {
  var power = Math.floor(lg(minStep));
  var order = Math.pow(10, power);
  var steps = srcSteps.map(function (v) {
    return v * order;
  });
  order = Math.pow(10, power + 1);
  steps = steps.concat(srcSteps.map(function (v) {
    return v * order;
  })); //find closest scale

  var step = 0;

  for (var i = 0; i < steps.length; i++) {
    step = steps[i];
    if (step >= minStep) break;
  }

  return step;
}

var parseUnit = (function (str, out) {
  if (!out) out = [0, ''];
  str = String(str);
  var num = parseFloat(str, 10);
  out[0] = num;
  out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '';
  return out;
});

// (c) 2015 Mikola Lysenko. MIT License
var PIXELS_PER_INCH = 96;
var defaults = {
  'ch': 8,
  'ex': 7.15625,
  'em': 16,
  'rem': 16,
  'in': PIXELS_PER_INCH,
  'cm': PIXELS_PER_INCH / 2.54,
  'mm': PIXELS_PER_INCH / 25.4,
  'pt': PIXELS_PER_INCH / 72,
  'pc': PIXELS_PER_INCH / 6,
  'px': 1
};
function toPX(str) {
  if (!str) return null;
  if (defaults[str]) return defaults[str]; // detect number of units

  var parts = parseUnit(str);

  if (!isNaN(parts[0]) && parts[1]) {
    var px = toPX(parts[1]);
    return typeof px === 'number' ? parts[0] * px : null;
  }

  return null;
}

/**
 * MIT © Sindre Sorhus
 * https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
 */
var isObj = (function (value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
});

var Base = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Base, _EventEmitter);

  var _super = _createSuper(Base);

  function Base(options) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this, options);
    _this._options = options || {};
    Object.assign(_assertThisInitialized(_this), options);
    return _this;
  }

  return Base;
}(EventEmitter2);

function alpha(color, value) {
  var obj = color.replace(/[^\d,]/g, '').split(',');
  if (value == null) value = obj[3] || 1;
  obj[3] = value;
  return 'rgba(' + obj.join(',') + ')';
}

/* eslint-disable consistent-return */
var gridStyle = {
  steps: [1, 2, 5],
  distance: 20,
  unit: 10,
  lines: function lines(state) {
    var coord = state.coordinate; // eslint-disable-next-line no-multi-assign

    var step = state.step = scale(coord.distance * coord.zoom, coord.steps);
    return range(Math.floor(state.offset / step) * step, Math.ceil((state.offset + state.range) / step + 1) * step, step);
  },
  lineColor: function lineColor(state) {
    if (!state.lines) return;
    var coord = state.coordinate;
    var light = alpha(coord.color, 0.1);
    var heavy = alpha(coord.color, 0.3);
    var step = state.step;
    var power = Math.ceil(lg(step));
    var tenStep = Math.pow(10, power);
    var nextStep = Math.pow(10, power + 1);
    var eps = step / 10;
    var colors = state.lines.map(function (v) {
      if (isMultiple(v, nextStep, eps)) return heavy;
      if (isMultiple(v, tenStep, eps)) return light;
      return null;
    });
    return colors;
  },
  ticks: function ticks(state) {
    if (!state.lines) return;
    var coord = state.coordinate;
    var step = scale(scale(state.step * 1.1, coord.steps) * 1.1, coord.steps);
    var eps = step / 10;
    var tickWidth = state.axisWidth * 4;
    return state.lines.map(function (v) {
      if (!isMultiple(v, step, eps)) return null;
      if (almostEqual(v, 0, eps)) return null;
      return tickWidth;
    });
  },
  labels: function labels(state) {
    if (!state.lines) return;
    var coord = state.coordinate;
    var step = scale(scale(state.step * 1.1, coord.steps) * 1.1, coord.steps); // let precision = clamp(Math.abs(Math.floor(lg(step))), 10, 20);

    var eps = step / 100;
    return state.lines.map(function (v) {
      if (!isMultiple(v, step, eps)) return null;
      if (almostEqual(v, 0, eps)) return coord.orientation === 'y' ? null : '0';
      v = Number((v / 100).toFixed(2));
      return coord.format(v);
    });
  }
};

var Axis = /*#__PURE__*/function () {
  function Axis(orientation, options) {
    _classCallCheck(this, Axis);

    Object.assign(this, options);
    this.orientation = orientation || 'x';
  }

  _createClass(Axis, [{
    key: "getCoords",
    value: function getCoords(values) {
      var coords = [];
      if (!values) return coords;

      for (var i = 0; i < values.length; i += 1) {
        var t = this.getRatio(values[i]);
        coords.push(t);
        coords.push(0);
        coords.push(t);
        coords.push(1);
      }

      return coords;
    }
  }, {
    key: "getRange",
    value: function getRange() {
      var len = this.width;
      if (this.orientation === 'y') len = this.height;
      return len * this.zoom;
    }
  }, {
    key: "getRatio",
    value: function getRatio(value) {
      return (value - this.offset) / this.range;
    }
  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this.offset = offset;
    }
  }, {
    key: "update",
    value: function update(options) {
      options = options || {};
      Object.assign(this, options);
      this.range = this.getRange();
    }
  }]);

  return Axis;
}();

var Grid = /*#__PURE__*/function (_Base) {
  _inherits(Grid, _Base);

  var _super = _createSuper(Grid);

  function Grid(canvas, opts) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _super.call(this, opts);
    _this.canvas = canvas;
    _this.context = _this.canvas.getContext('2d');
    _this.state = {};

    _this.setDefaults();

    _this.update(opts);

    return _this;
  }

  _createClass(Grid, [{
    key: "render",
    value: function render() {
      this.draw();
      return this;
    }
  }, {
    key: "getCenterCoords",
    value: function getCenterCoords() {
      var state = this.state.x;

      var _state$shape = _slicedToArray(state.shape, 2),
          width = _state$shape[0],
          height = _state$shape[1];

      var _state$padding = _slicedToArray(state.padding, 4),
          pt = _state$padding[0],
          pr = _state$padding[1],
          pb = _state$padding[2],
          pl = _state$padding[3];

      var axisCoords = state.opposite.coordinate.getCoords([state.coordinate.axisOrigin], state.opposite);
      var y = pt + axisCoords[1] * (height - pt - pb);
      state = this.state.y;

      var _state$shape2 = _slicedToArray(state.shape, 2);

      width = _state$shape2[0];
      height = _state$shape2[1];

      var _state$padding2 = _slicedToArray(state.padding, 4);

      pt = _state$padding2[0];
      pr = _state$padding2[1];
      pb = _state$padding2[2];
      pl = _state$padding2[3];
      axisCoords = state.opposite.coordinate.getCoords([state.coordinate.axisOrigin], state.opposite);
      var x = pl + axisCoords[0] * (width - pr - pl);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this.setWidth(width);
      this.setHeight(height);
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this.canvas.width = width;
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this.canvas.height = height;
    } // re-evaluate lines, calc options for renderer

  }, {
    key: "update",
    value: function update(opts) {
      if (!opts) opts = {};
      var shape = [this.canvas.width, this.canvas.height]; // recalc state

      this.state.x = this.calcCoordinate(this.axisX, shape, this);
      this.state.y = this.calcCoordinate(this.axisY, shape, this);
      this.state.x.opposite = this.state.y;
      this.state.y.opposite = this.state.x;
      this.emit('update', opts);
      return this;
    } // re-evaluate lines, calc options for renderer

  }, {
    key: "update2",
    value: function update2(center) {
      var shape = [this.canvas.width, this.canvas.height];
      Object.assign(this.center, center); // recalc state

      this.state.x = this.calcCoordinate(this.axisX, shape, this);
      this.state.y = this.calcCoordinate(this.axisY, shape, this);
      this.state.x.opposite = this.state.y;
      this.state.y.opposite = this.state.x;
      this.emit('update', center);
      this.axisX.offset = center.x;
      this.axisX.zoom = 1 / center.zoom;
      this.axisY.offset = center.y;
      this.axisY.zoom = 1 / center.zoom;
    } // get state object with calculated params, ready for rendering

  }, {
    key: "calcCoordinate",
    value: function calcCoordinate(coord, shape) {
      var state = {
        coordinate: coord,
        shape: shape,
        grid: this
      }; // calculate real offset/range

      state.range = coord.getRange(state);
      state.offset = clamp(coord.offset - state.range * clamp(0.5, 0, 1), Math.max(coord.min, -Number.MAX_VALUE + 1), Math.min(coord.max, Number.MAX_VALUE) - state.range);
      state.zoom = coord.zoom; // calc style

      state.axisColor = typeof coord.axisColor === 'number' ? alpha(coord.color, coord.axisColor) : coord.axisColor || coord.color;
      state.axisWidth = coord.axisWidth || coord.lineWidth;
      state.lineWidth = coord.lineWidth;
      state.tickAlign = coord.tickAlign;
      state.labelColor = state.color; // get padding

      if (typeof coord.padding === 'number') {
        state.padding = Array(4).fill(coord.padding);
      } else if (coord.padding instanceof Function) {
        state.padding = coord.padding(state);
      } else {
        state.padding = coord.padding;
      } // calc font


      if (typeof coord.fontSize === 'number') {
        state.fontSize = coord.fontSize;
      } else {
        var units = parseUnit(coord.fontSize);
        state.fontSize = units[0] * toPX(units[1]);
      }

      state.fontFamily = coord.fontFamily || 'sans-serif'; // get lines stops, including joined list of values

      var lines;

      if (coord.lines instanceof Function) {
        lines = coord.lines(state);
      } else {
        lines = coord.lines || [];
      }

      state.lines = lines; // calc colors

      if (coord.lineColor instanceof Function) {
        state.lineColors = coord.lineColor(state);
      } else if (Array.isArray(coord.lineColor)) {
        state.lineColors = coord.lineColor;
      } else {
        var color = alpha(coord.color, coord.lineColor);

        if (typeof coord.lineColor !== 'number') {
          color = coord.lineColor === false || coord.lineColor == null ? null : coord.color;
        }

        state.lineColors = Array(lines.length).fill(color);
      } // calc ticks


      var ticks;

      if (coord.ticks instanceof Function) {
        ticks = coord.ticks(state);
      } else if (Array.isArray(coord.ticks)) {
        ticks = coord.ticks;
      } else {
        var tick = coord.ticks === true || coord.ticks === true ? state.axisWidth * 2 : coord.ticks || 0;
        ticks = Array(lines.length).fill(tick);
      }

      state.ticks = ticks; // calc labels

      var labels;
      if (coord.labels === true) labels = state.lines;else if (coord.labels instanceof Function) {
        labels = coord.labels(state);
      } else if (Array.isArray(coord.labels)) {
        labels = coord.labels;
      } else if (isObj(coord.labels)) {
        labels = coord.labels;
      } else {
        labels = Array(state.lines.length).fill(null);
      }
      state.labels = labels; // convert hashmap ticks/labels to lines + colors

      if (isObj(ticks)) {
        state.ticks = Array(lines.length).fill(0);
      }

      if (isObj(labels)) {
        state.labels = Array(lines.length).fill(null);
      }

      if (isObj(ticks)) {
        // eslint-disable-next-line guard-for-in
        Object.keys(ticks).forEach(function (value, tick) {
          state.ticks.push(tick);
          state.lines.push(parseFloat(value));
          state.lineColors.push(null);
          state.labels.push(null);
        });
      }

      if (isObj(labels)) {
        Object.keys(labels).forEach(function (label, value) {
          state.labels.push(label);
          state.lines.push(parseFloat(value));
          state.lineColors.push(null);
          state.ticks.push(null);
        });
      }

      return state;
    }
  }, {
    key: "setDefaults",
    value: function setDefaults() {
      this.pixelRatio = window.devicePixelRatio;
      this.autostart = true;
      this.interactions = true;
      this.defaults = Object.assign({
        type: 'linear',
        name: '',
        units: '',
        state: {},
        // visible range params
        minZoom: -Infinity,
        maxZoom: Infinity,
        min: -Infinity,
        max: Infinity,
        offset: 0,
        origin: 0.5,
        center: {
          x: 0,
          y: 0,
          zoom: 1
        },
        zoom: 1,
        zoomEnabled: true,
        panEnabled: true,
        // labels
        labels: true,
        fontSize: '11pt',
        fontFamily: 'sans-serif',
        padding: 0,
        color: 'rgb(0,0,0,1)',
        // lines params
        lines: true,
        tick: 8,
        tickAlign: 0.5,
        lineWidth: 1,
        distance: 13,
        style: 'lines',
        lineColor: 0.4,
        // axis params
        axis: true,
        axisOrigin: 0,
        axisWidth: 2,
        axisColor: 0.8,
        // stub methods
        // return coords for the values, redefined by axes
        getCoords: function getCoords() {
          return [0, 0, 0, 0];
        },
        // return 0..1 ratio based on value/offset/range, redefined by axes
        getRatio: function getRatio() {
          return 0;
        },
        // default label formatter
        format: function format(v) {
          return v;
        }
      }, gridStyle, this._options);
      this.axisX = new Axis('x', this.defaults);
      this.axisY = new Axis('y', this.defaults);
      this.axisX = Object.assign({}, this.defaults, {
        orientation: 'x',
        offset: this.center.x,
        getCoords: function getCoords(values, state) {
          var coords = [];
          if (!values) return coords;

          for (var i = 0; i < values.length; i += 1) {
            var t = state.coordinate.getRatio(values[i], state);
            coords.push(t);
            coords.push(0);
            coords.push(t);
            coords.push(1);
          }

          return coords;
        },
        getRange: function getRange(state) {
          return state.shape[0] * state.coordinate.zoom;
        },
        // FIXME: handle infinity case here
        getRatio: function getRatio(value, state) {
          return (value - state.offset) / state.range;
        }
      });
      this.axisY = Object.assign({}, this.defaults, {
        orientation: 'y',
        offset: this.center.y,
        getCoords: function getCoords(values, state) {
          var coords = [];
          if (!values) return coords;

          for (var i = 0; i < values.length; i += 1) {
            var t = state.coordinate.getRatio(values[i], state);
            coords.push(0);
            coords.push(t);
            coords.push(1);
            coords.push(t);
          }

          return coords;
        },
        getRange: function getRange(state) {
          return state.shape[1] * state.coordinate.zoom;
        },
        getRatio: function getRatio(value, state) {
          return 1 - (value - state.offset) / state.range;
        }
      });
      Object.assign(this, this.defaults);
      Object.assign(this, this._options);
      this.center = new Point(this.center);
    } // draw grid to the canvas

  }, {
    key: "draw",
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawLines(this.state.x);
      this.drawLines(this.state.y);
      return this;
    } // lines instance draw

  }, {
    key: "drawLines",
    value: function drawLines(state) {
      // draw lines and sublines
      if (!state || !state.coordinate) return;
      var ctx = this.context;

      var _state$shape3 = _slicedToArray(state.shape, 2),
          width = _state$shape3[0],
          height = _state$shape3[1];

      var left = 0;
      var top = 0;

      var _state$padding3 = _slicedToArray(state.padding, 4),
          pt = _state$padding3[0],
          pr = _state$padding3[1],
          pb = _state$padding3[2],
          pl = _state$padding3[3];

      var axisRatio = state.opposite.coordinate.getRatio(state.coordinate.axisOrigin, state.opposite);
      axisRatio = clamp(axisRatio, 0, 1);
      var coords = state.coordinate.getCoords(state.lines, state); // draw state.lines

      ctx.lineWidth = 1; // state.lineWidth/2.;

      for (var i = 0, j = 0; i < coords.length; i += 4, j += 1) {
        var color = state.lineColors[j];
        if (!color) continue;
        ctx.strokeStyle = color;
        ctx.beginPath();
        var x1 = left + pl + coords[i] * (width - pr - pl);
        var y1 = top + pt + coords[i + 1] * (height - pb - pt);
        var x2 = left + pl + coords[i + 2] * (width - pr - pl);
        var y2 = top + pt + coords[i + 3] * (height - pb - pt);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
      }

      var normals = [];

      for (var _i = 0; _i < coords.length; _i += 4) {
        var _x = coords[_i];
        var _y = coords[_i + 1];
        var _x2 = coords[_i + 2];
        var _y2 = coords[_i + 3];
        var xDif = _x2 - _x;
        var yDif = _y2 - _y;
        var dist = len(xDif, yDif);
        normals.push(xDif / dist);
        normals.push(yDif / dist);
      } // calc state.labels/tick coords


      var tickCoords = [];
      state.labelCoords = [];
      var ticks = state.ticks;

      for (var _i2 = 0, _j = 0, k = 0; _i2 < normals.length; k += 1, _i2 += 2, _j += 4) {
        var _x3 = coords[_j];
        var _y3 = coords[_j + 1];
        var _x4 = coords[_j + 2];
        var _y4 = coords[_j + 3];

        var _xDif = (_x4 - _x3) * axisRatio;

        var _yDif = (_y4 - _y3) * axisRatio;

        var tick = [normals[_i2] * ticks[k] / (width - pl - pr), normals[_i2 + 1] * ticks[k] / (height - pt - pb)];
        tickCoords.push(normals[_i2] * (_xDif + tick[0] * state.tickAlign) + _x3);
        tickCoords.push(normals[_i2 + 1] * (_yDif + tick[1] * state.tickAlign) + _y3);
        tickCoords.push(normals[_i2] * (_xDif - tick[0] * (1 - state.tickAlign)) + _x3);
        tickCoords.push(normals[_i2 + 1] * (_yDif - tick[1] * (1 - state.tickAlign)) + _y3);
        state.labelCoords.push(normals[_i2] * _xDif + _x3);
        state.labelCoords.push(normals[_i2 + 1] * _yDif + _y3);
      } // draw ticks


      if (ticks.length) {
        ctx.lineWidth = state.axisWidth / 2;
        ctx.beginPath();

        for (var _i3 = 0, _j2 = 0; _i3 < tickCoords.length; _i3 += 4, _j2 += 1) {
          if (almostEqual(state.lines[_j2], state.opposite.coordinate.axisOrigin)) continue;

          var _x5 = left + pl + tickCoords[_i3] * (width - pl - pr);

          var _y5 = top + pt + tickCoords[_i3 + 1] * (height - pt - pb);

          var _x6 = left + pl + tickCoords[_i3 + 2] * (width - pl - pr);

          var _y6 = top + pt + tickCoords[_i3 + 3] * (height - pt - pb);

          ctx.moveTo(_x5, _y5);
          ctx.lineTo(_x6, _y6);
        }

        ctx.strokeStyle = state.axisColor;
        ctx.stroke();
        ctx.closePath();
      } // draw axis


      if (state.coordinate.axis && state.axisColor) {
        var axisCoords = state.opposite.coordinate.getCoords([state.coordinate.axisOrigin], state.opposite);
        ctx.lineWidth = state.axisWidth / 2;

        var _x7 = left + pl + clamp(axisCoords[0], 0, 1) * (width - pr - pl);

        var _y7 = top + pt + clamp(axisCoords[1], 0, 1) * (height - pt - pb);

        var _x8 = left + pl + clamp(axisCoords[2], 0, 1) * (width - pr - pl);

        var _y8 = top + pt + clamp(axisCoords[3], 0, 1) * (height - pt - pb);

        ctx.beginPath();
        ctx.moveTo(_x7, _y7);
        ctx.lineTo(_x8, _y8);
        ctx.strokeStyle = state.axisColor;
        ctx.stroke();
        ctx.closePath();
      } // draw state.labels


      this.drawLabels(state);
    }
  }, {
    key: "drawLabels",
    value: function drawLabels(state) {
      if (state.labels) {
        var ctx = this.context;

        var _state$shape4 = _slicedToArray(state.shape, 2),
            width = _state$shape4[0],
            height = _state$shape4[1];

        var _state$padding4 = _slicedToArray(state.padding, 4),
            pt = _state$padding4[0],
            pr = _state$padding4[1],
            pb = _state$padding4[2],
            pl = _state$padding4[3];

        ctx.font = "300 ".concat(state.fontSize, "px ").concat(state.fontFamily);
        ctx.fillStyle = state.labelColor;
        ctx.textBaseline = 'top';
        var textHeight = state.fontSize;
        var indent = state.axisWidth + 1.5;
        var textOffset = state.tickAlign < 0.5 ? -textHeight - state.axisWidth * 2 : state.axisWidth * 2;
        var isOpp = state.coordinate.orientation === 'y' && !state.opposite.disabled;

        for (var i = 0; i < state.labels.length; i += 1) {
          var label = state.labels[i];
          if (label == null) continue;
          if (isOpp && almostEqual(state.lines[i], state.opposite.coordinate.axisOrigin)) continue;
          var textWidth = ctx.measureText(label).width;
          var textLeft = state.labelCoords[i * 2] * (width - pl - pr) + indent + pl;

          if (state.coordinate.orientation === 'y') {
            textLeft = clamp(textLeft, indent, width - textWidth - 1 - state.axisWidth);
            label *= -1;
          }

          var textTop = state.labelCoords[i * 2 + 1] * (height - pt - pb) + textOffset + pt;

          if (state.coordinate.orientation === 'x') {
            textTop = clamp(textTop, 0, height - textHeight - textOffset);
          }

          ctx.fillText(label, textLeft, textTop);
        }
      }
    }
  }]);

  return Grid;
}(Base);

var ModesMixin = function ModesMixin(superclass) {
  return /*#__PURE__*/function (_superclass) {
    _inherits(_class, _superclass);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "setMode",

      /**
       * MODES
       */
      value: function setMode(mode) {
        this.mode = mode;

        switch (mode) {
          case Modes.SELECT:
            this.canvas.isDrawingMode = false;
            this.canvas.interactive = true;
            this.canvas.selection = true;
            this.canvas.hoverCursor = 'default';
            this.canvas.moveCursor = 'default';
            break;

          case Modes.GRAB:
            this.canvas.isDrawingMode = false;
            this.canvas.interactive = false;
            this.canvas.selection = false;
            this.canvas.discardActiveObject();
            this.canvas.hoverCursor = 'move';
            this.canvas.moveCursor = 'move';
            break;

          case Modes.MEASURE:
            this.canvas.isDrawingMode = true;
            this.canvas.freeDrawingBrush.color = 'transparent';
            this.canvas.discardActiveObject();
            break;

          case Modes.DRAW:
            this.canvas.isDrawingMode = true;
            break;
        }
      }
    }, {
      key: "setModeAsDraw",
      value: function setModeAsDraw() {
        this.setMode(Modes.DRAW);
      }
    }, {
      key: "setModeAsSelect",
      value: function setModeAsSelect() {
        this.setMode(Modes.SELECT);
      }
    }, {
      key: "setModeAsMeasure",
      value: function setModeAsMeasure() {
        this.setMode(Modes.MEASURE);
      }
    }, {
      key: "setModeAsGrab",
      value: function setModeAsGrab() {
        this.setMode(Modes.GRAB);
      }
    }, {
      key: "isSelectMode",
      value: function isSelectMode() {
        return this.mode === Modes.SELECT;
      }
    }, {
      key: "isGrabMode",
      value: function isGrabMode() {
        return this.mode === Modes.GRAB;
      }
    }, {
      key: "isMeasureMode",
      value: function isMeasureMode() {
        return this.mode === Modes.MEASURE;
      }
    }, {
      key: "isDrawMode",
      value: function isDrawMode() {
        return this.mode === Modes.DRAW;
      }
    }]);

    return _class;
  }(superclass);
};

var Measurer = /*#__PURE__*/function () {
  function Measurer(options) {
    _classCallCheck(this, Measurer);

    options = options || {};
    options.hasBorders = false;
    options.selectable = false;
    options.hasControls = false; // options.evented = false;

    options["class"] = 'measurer';
    options.scale = options.scale || 1; // super([], options);

    this.options = options || {};
    this.start = this.options.start;
    this.end = this.options.end;
    this.canvas = this.options.map.canvas;
    this.completed = false;

    if (!this.start || !this.end) {
      throw new Error('start must be defined');
    }

    this.draw();
  }

  _createClass(Measurer, [{
    key: "clear",
    value: function clear() {
      var _this = this;

      if (this.objects) {
        this.objects.forEach(function (object) {
          _this.canvas.remove(object);
        });
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      this.clear();
      var start = this.start,
          end = this.end;
      start = new Point(start);
      end = new Point(end);
      var center = start.add(end).multiply(0.5);
      this.line = new fabric.Line([start.x, start.y, end.x, end.y], {
        stroke: this.options.stroke || '#3e82ff',
        hasControls: false,
        hasBorders: false,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5]
      });
      var lineEndOptions = {
        left: start.x,
        top: start.y,
        strokeWidth: 1,
        radius: this.options.radius || 1,
        fill: this.options.fill || '#3e82ff',
        stroke: this.options.stroke || '#3e82ff',
        hasControls: false,
        hasBorders: false
      };
      var lineEndOptions2 = {
        left: start.x,
        top: start.y,
        strokeWidth: 1,
        radius: this.options.radius || 5,
        fill: this.options.fill || '#3e82ff33',
        stroke: this.options.stroke || '#3e82ff',
        hasControls: false,
        hasBorders: false
      };
      this.circle1 = new fabric.Circle(lineEndOptions2);
      this.circle2 = new fabric.Circle(_objectSpread2(_objectSpread2({}, lineEndOptions2), {}, {
        left: end.x,
        top: end.y
      }));
      this.circle11 = new fabric.Circle(lineEndOptions);
      this.circle22 = new fabric.Circle(_objectSpread2(_objectSpread2({}, lineEndOptions), {}, {
        left: end.x,
        top: end.y
      }));
      var text = Math.round(start.distanceFrom(end));
      text = "".concat(text / 100, " m");
      this.text = new fabric.Text(text, {
        textBackgroundColor: 'black',
        fill: 'white',
        left: center.x,
        top: center.y - 10,
        fontSize: 12,
        hasControls: false,
        hasBorders: false,
        selectable: false,
        evented: false
      });
      this.objects = [this.line, this.text, this.circle11, this.circle22, this.circle1, this.circle2];
      this.objects.forEach(function (object) {
        _this2.canvas.add(object);
      });
      this.line.hasControls = false;
      this.line.hasBorders = false;
      this.line.selectable = false;
      this.line.evented = false;
      this.registerListeners();
    }
  }, {
    key: "setStart",
    value: function setStart(start) {
      this.start = start;
      this.draw();
    }
  }, {
    key: "setEnd",
    value: function setEnd(end) {
      this.end = end;
      this.draw();
    }
  }, {
    key: "complete",
    value: function complete() {
      this.completed = true;
    }
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this3 = this;

      this.circle2.on('moving', function (e) {
        _this3.setEnd(e.pointer);
      });
      this.circle1.on('moving', function (e) {
        _this3.setStart(e.pointer);
      });
    }
  }, {
    key: "applyScale",
    value: function applyScale(scale) {
      this.start.x *= scale;
      this.start.y *= scale;
      this.end.x *= scale;
      this.end.y *= scale;
      this.draw();
    }
  }]);

  return Measurer;
}();

var Measurement = /*#__PURE__*/function () {
  function Measurement(map) {
    _classCallCheck(this, Measurement);

    this.map = map;
    this.measurer = null;
  }

  _createClass(Measurement, [{
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var point = {
        x: e.absolutePointer.x,
        y: e.absolutePointer.y
      };

      if (this.measurer && !this.measurer.completed) {
        this.measurer.setEnd(point);
        this.map.canvas.requestRenderAll();
      }
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var point = {
        x: e.absolutePointer.x,
        y: e.absolutePointer.y
      };

      if (!this.measurer) {
        this.measurer = new Measurer({
          start: point,
          end: point,
          map: this.map
        }); // this.map.canvas.add(this.measurer);
      } else if (!this.measurer.completed) {
        this.measurer.setEnd(point);
        this.measurer.complete();
      }
    }
  }]);

  return Measurement;
}();

/**
 * A fluent interface to apply a list of mixins to a superclass.
 *
 * ```javascript
 * class X extends mix(Object).with(A, B, C) {}
 * ```
 *
 * The mixins are applied in order to the superclass, so the prototype chain
 * will be: X->C'->B'->A'->Object.
 *
 * This is purely a convenience function. The above example is equivalent to:
 *
 * ```javascript
 * class X extends C(B(A(Object))) {}
 * ```
 *
 * @function
 * @param {Function} [superclass=Object]
 * @return {MixinBuilder}
 */

var mix = function mix(superclass) {
  return new MixinBuilder(superclass);
};

var MixinBuilder = /*#__PURE__*/function () {
  function MixinBuilder(superclass) {
    _classCallCheck(this, MixinBuilder);

    this.superclass = superclass || /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      return _class;
    }();
  }
  /**
   * Applies `mixins` in order to the superclass given to `mix()`.
   *
   * @param {Array.<Mixin>} mixins
   * @return {Function} a subclass of `superclass` with `mixins` applied
   */


  _createClass(MixinBuilder, [{
    key: "with",
    value: function _with() {
      for (var _len = arguments.length, mixins = new Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      return mixins.reduce(function (c, m) {
        return m(c);
      }, this.superclass);
    }
  }]);

  return MixinBuilder;
}();

var Map = /*#__PURE__*/function (_mix$with) {
  _inherits(Map, _mix$with);

  var _super = _createSuper(Map);

  function Map(container, options) {
    var _this;

    _classCallCheck(this, Map);

    _this = _super.call(this, options);
    _this.defaults = Object.assign({}, MAP); // set defaults

    Object.assign(_assertThisInitialized(_this), _this.defaults); // overwrite options

    Object.assign(_assertThisInitialized(_this), _this._options);
    _this.center = new Point(_this.center);
    _this.container = container || document.body;
    var canvas = document.createElement('canvas');

    _this.container.appendChild(canvas);

    canvas.setAttribute('id', 'indoors-map-canvas');
    canvas.width = _this.width || _this.container.clientWidth;
    canvas.height = _this.height || _this.container.clientHeight;
    _this.canvas = new fabric.Canvas(canvas, {
      preserveObjectStacking: true,
      renderOnAddRemove: true
    });
    _this.context = _this.canvas.getContext('2d');

    _this.on('render', function () {
      if (_this.autostart) _this.clear();
    });

    _this.originX = -_this.canvas.width / 2;
    _this.originY = -_this.canvas.height / 2;

    _this.canvas.absolutePan({
      x: _this.originX,
      y: _this.originY
    }); // this.center = {
    //   x: this.canvas.width / 2.0,
    //   y: this.canvas.height / 2.0
    // };


    _this.x = _this.center.x;
    _this.y = _this.center.y;
    _this.dx = 0;
    _this.dy = 0;

    try {
      _this.addFloorPlan();
    } catch (e) {
      console.error(e);
    }

    if (_this.showGrid) {
      _this.addGrid();
    }

    _this.setMode(_this.mode || Modes.GRAB);

    var vm = _assertThisInitialized(_this);

    panzoom(_this.container, function (e) {
      vm.panzoom(e);
    });

    _this.registerListeners();

    setTimeout(function () {
      _this.emit('ready', _assertThisInitialized(_this));
    }, 300);
    _this.measurement = new Measurement(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Map, [{
    key: "addFloorPlan",
    value: function addFloorPlan() {
      if (!this.floorplan) return;
      var vm = this;
      this.floorplan.on('load', function (img) {
        vm.addLayer(img);
      });
    }
  }, {
    key: "addLayer",
    value: function addLayer(layer) {
      // this.canvas.renderOnAddRemove = false;
      if (!layer.shape) {
        console.error('shape is undefined');
        return;
      }

      this.canvas.add(layer.shape);

      this.canvas._objects.sort(function (o1, o2) {
        return o1.zIndex - o2.zIndex;
      });

      if (layer.shape.keepOnZoom) {
        var scale = 1.0 / this.zoom;
        layer.shape.set('scaleX', scale);
        layer.shape.set('scaleY', scale);
        layer.shape.setCoords();
        this.emit("".concat(layer["class"], "scaling"), layer);
      }

      if (layer["class"]) {
        this.emit("".concat(layer["class"], ":added"), layer);
      } // this.canvas.renderOnAddRemove = true;
      // this.update();


      this.canvas.requestRenderAll();
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layer) {
      if (!layer || !layer.shape) return;

      if (layer["class"]) {
        this.emit("".concat(layer["class"], ":removed"), layer);
      }

      this.canvas.remove(layer.shape);
    }
  }, {
    key: "addGrid",
    value: function addGrid() {
      this.gridCanvas = this.cloneCanvas();
      this.gridCanvas.setAttribute('id', 'indoors-grid-canvas');
      this.grid = new Grid(this.gridCanvas, this);
      this.grid.draw();
    }
  }, {
    key: "moveTo",
    value: function moveTo(obj, index) {
      if (index !== undefined) {
        obj.zIndex = index;
      }

      this.canvas.moveTo(obj.shape, obj.zIndex);
    }
  }, {
    key: "cloneCanvas",
    value: function cloneCanvas(canvas) {
      canvas = canvas || this.canvas;
      var clone = document.createElement('canvas');
      clone.width = canvas.width;
      clone.height = canvas.height;
      canvas.wrapperEl.appendChild(clone);
      return clone;
    }
  }, {
    key: "setZoom",
    value: function setZoom(zoom) {
      var _this2 = this;

      var _this$canvas = this.canvas,
          width = _this$canvas.width,
          height = _this$canvas.height;
      this.zoom = clamp(zoom, this.minZoom, this.maxZoom);
      this.dx = 0;
      this.dy = 0;
      this.x = width / 2.0;
      this.y = height / 2.0;
      this.update();
      nextTick(function () {
        _this2.update();
      });
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var minX = Infinity;
      var maxX = -Infinity;
      var minY = Infinity;
      var maxY = -Infinity;
      this.canvas.forEachObject(function (obj) {
        var coords = obj.getBounds();
        coords.forEach(function (point) {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        });
      });
      return [new Point(minX, minY), new Point(maxX, maxY)];
    }
  }, {
    key: "fitBounds",
    value: function fitBounds() {
      var _this3 = this;

      var padding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      this.onResize();
      var _this$canvas2 = this.canvas,
          width = _this$canvas2.width,
          height = _this$canvas2.height;
      this.originX = -this.canvas.width / 2;
      this.originY = -this.canvas.height / 2;
      var bounds = this.getBounds();
      this.center.x = (bounds[0].x + bounds[1].x) / 2.0;
      this.center.y = -(bounds[0].y + bounds[1].y) / 2.0;
      var boundWidth = Math.abs(bounds[0].x - bounds[1].x) + padding;
      var boundHeight = Math.abs(bounds[0].y - bounds[1].y) + padding;
      var scaleX = width / boundWidth;
      var scaleY = height / boundHeight;
      this.zoom = Math.min(scaleX, scaleY);
      this.canvas.setZoom(this.zoom);
      this.canvas.absolutePan({
        x: this.originX + this.center.x * this.zoom,
        y: this.originY - this.center.y * this.zoom
      });
      this.update();
      nextTick(function () {
        _this3.update();
      });
    }
  }, {
    key: "setCursor",
    value: function setCursor(cursor) {
      this.container.style.cursor = cursor;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this4 = this;

      var _this$canvas3 = this.canvas,
          width = _this$canvas3.width,
          height = _this$canvas3.height;
      this.zoom = this._options.zoom || 1;
      this.center = new Point();
      this.originX = -this.canvas.width / 2;
      this.originY = -this.canvas.height / 2;
      this.canvas.absolutePan({
        x: this.originX,
        y: this.originY
      });
      this.x = width / 2.0;
      this.y = height / 2.0;
      this.update();
      nextTick(function () {
        _this4.update();
      });
    }
  }, {
    key: "onResize",
    value: function onResize(width, height) {
      var oldWidth = this.canvas.width;
      var oldHeight = this.canvas.height;
      width = width || this.container.clientWidth;
      height = height || this.container.clientHeight;
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);

      if (this.grid) {
        this.grid.setSize(width, height);
      }

      var dx = width / 2.0 - oldWidth / 2.0;
      var dy = height / 2.0 - oldHeight / 2.0;
      this.canvas.relativePan({
        x: dx,
        y: dy
      });
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var canvas = this.canvas;

      if (this.grid) {
        this.grid.update2({
          x: this.center.x,
          y: this.center.y,
          zoom: this.zoom
        });
      }

      this.emit('update', this);

      if (this.grid) {
        this.grid.render();
      }

      canvas.zoomToPoint(new Point(this.x, this.y), this.zoom);

      if (this.isGrabMode() || this.isRight) {
        canvas.relativePan(new Point(this.dx, this.dy));
        this.emit('panning');
        this.setCursor('grab');
      } else {
        this.setCursor('pointer');
      }

      var now = Date.now();

      if (!this.lastUpdatedTime && Math.abs(this.lastUpdatedTime - now) < 100) {
        return;
      }

      this.lastUpdatedTime = now;
      var objects = canvas.getObjects();
      var hasKeepZoom = false;

      for (var i = 0; i < objects.length; i += 1) {
        var object = objects[i];

        if (object.keepOnZoom) {
          object.set('scaleX', 1.0 / this.zoom);
          object.set('scaleY', 1.0 / this.zoom);
          object.setCoords();
          hasKeepZoom = true;
          this.emit("".concat(object["class"], "scaling"), object);
        }
      }

      if (hasKeepZoom) canvas.requestRenderAll();
    }
  }, {
    key: "panzoom",
    value: function panzoom(e) {
      // enable interactions
      var _this$canvas4 = this.canvas,
          width = _this$canvas4.width,
          height = _this$canvas4.height; // shift start

      var zoom = clamp(-e.dz, -height * 0.75, height * 0.75) / height;
      var prevZoom = 1 / this.zoom;
      var curZoom = prevZoom * (1 - zoom);
      curZoom = clamp(curZoom, this.minZoom, this.maxZoom);
      var _this$center = this.center,
          x = _this$center.x,
          y = _this$center.y; // pan

      var oX = 0.5;
      var oY = 0.5;

      if (this.isGrabMode() || e.isRight) {
        x -= prevZoom * e.dx;
        y += prevZoom * e.dy;
        this.setCursor('grab');
      } else {
        this.setCursor('pointer');
      }

      if (this.zoomEnabled) {
        var tx = e.x / width - oX;
        x -= width * (curZoom - prevZoom) * tx;
        var ty = oY - e.y / height;
        y -= height * (curZoom - prevZoom) * ty;
      }

      this.center.setX(x);
      this.center.setY(y);
      this.zoom = 1 / curZoom;
      this.dx = e.dx;
      this.dy = e.dy;
      this.x = e.x0;
      this.y = e.y0;
      this.isRight = e.isRight;
      this.update();
    }
  }, {
    key: "setView",
    value: function setView(view) {
      var _this5 = this;

      this.dx = 0;
      this.dy = 0;
      this.x = 0;
      this.y = 0;
      view.y *= -1;
      var dx = this.center.x - view.x;
      var dy = -this.center.y + view.y;
      this.center.copy(view);
      this.canvas.relativePan(new Point(dx * this.zoom, dy * this.zoom));
      this.canvas.renderAll();
      this.update();
      nextTick(function () {
        _this5.update();
      });
    }
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this6 = this;

      var vm = this;
      this.canvas.on('object:scaling', function (e) {
        if (e.target["class"]) {
          vm.emit("".concat(e.target["class"], ":scaling"), e.target.parent);
          e.target.parent.emit('scaling', e.target.parent);
          return;
        }

        var group = e.target;
        if (!group.getObjects) return;
        var objects = group.getObjects();
        group.removeWithUpdate();

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];
          object.orgYaw = object.parent.yaw || 0;
          object.fire('moving', object.parent);
          vm.emit("".concat(object["class"], ":moving"), object.parent);
        }

        vm.update();
        vm.canvas.requestRenderAll();
      });
      this.canvas.on('object:rotating', function (e) {
        if (e.target["class"]) {
          vm.emit("".concat(e.target["class"], ":rotating"), e.target.parent, e.target.angle);
          e.target.parent.emit('rotating', e.target.parent, e.target.angle);
          return;
        }

        var group = e.target;
        if (!group.getObjects) return;
        var objects = group.getObjects();

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"] === 'marker') {
            object._set('angle', -group.angle);

            object.parent.yaw = -group.angle + (object.orgYaw || 0); // object.orgYaw = object.parent.yaw;

            object.fire('moving', object.parent);
            vm.emit("".concat(object["class"], ":moving"), object.parent);
            object.fire('rotating', object.parent);
            vm.emit("".concat(object["class"], ":rotating"), object.parent);
          }
        }

        _this6.update();
      });
      this.canvas.on('object:moving', function (e) {
        if (e.target["class"]) {
          vm.emit("".concat(e.target["class"], ":moving"), e.target.parent);
          e.target.parent.emit('moving', e.target.parent);
          return;
        }

        var group = e.target;
        if (!group.getObjects) return;
        var objects = group.getObjects();

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"]) {
            object.fire('moving', object.parent);
            vm.emit("".concat(object["class"], ":moving"), object.parent);
          }
        }

        _this6.update();
      });
      this.canvas.on('object:moved', function (e) {
        if (e.target["class"]) {
          vm.emit("".concat(e.target["class"], "dragend"), e);
          vm.emit("".concat(e.target["class"], ":moved"), e.target.parent);
          e.target.parent.emit('moved', e.target.parent);

          _this6.update();

          return;
        }

        var group = e.target;
        if (!group.getObjects) return;
        var objects = group.getObjects();

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"]) {
            object.fire('moved', object.parent);
            vm.emit("".concat(object["class"], ":moved"), object.parent);
          }
        }

        _this6.update();
      });
      this.canvas.on('selection:cleared', function (e) {
        var objects = e.deselected;
        if (!objects || !objects.length) return;

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"] === 'marker') {
            object._set('angle', 0);

            object._set('scaleX', 1 / vm.zoom);

            object._set('scaleY', 1 / vm.zoom);

            if (object.parent) {
              object.parent.inGroup = false;
            }

            object.fire('moving', object.parent);
          }
        }
      });
      this.canvas.on('selection:created', function (e) {
        var objects = e.selected;
        if (!objects || objects.length < 2) return;

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"] && object.parent) {
            object.parent.inGroup = true;
            object.orgYaw = object.parent.yaw || 0;
          }
        }
      });
      this.canvas.on('selection:updated', function (e) {
        var objects = e.selected;
        if (!objects || objects.length < 2) return;

        for (var i = 0; i < objects.length; i += 1) {
          var object = objects[i];

          if (object["class"] && object.parent) {
            object.parent.inGroup = true;
            object.orgYaw = object.parent.yaw || 0;
          }
        }
      });
      this.canvas.on('mouse:down', function (e) {
        vm.dragObject = e.target;
      });
      this.canvas.on('mouse:move', function (e) {
        if (_this6.isMeasureMode()) {
          _this6.measurement.onMouseMove(e);
        }

        if (vm.dragObject && vm.dragObject.clickable) {
          if (vm.dragObject === e.target) {
            vm.dragObject.dragging = true;
          } else {
            vm.dragObject.dragging = false;
          }
        }

        _this6.isRight = false;

        if ('which' in e.e) {
          // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
          _this6.isRight = e.e.which === 3;
        } else if ('button' in e.e) {
          // IE, Opera
          _this6.isRight = e.e.button === 2;
        }

        vm.emit('mouse:move', e);
      });
      this.canvas.on('mouse:up', function (e) {
        if (_this6.isMeasureMode()) {
          _this6.measurement.onClick(e);
        }

        _this6.isRight = false;
        _this6.dx = 0;
        _this6.dy = 0;

        if (!vm.dragObject || !e.target || !e.target.selectable) {
          e.target = null;
          vm.emit('mouse:click', e);
        }

        if (vm.dragObject && vm.dragObject.clickable) {
          if (vm.dragObject !== e.target) return;

          if (!vm.dragObject.dragging && !vm.modeToggleByKey) {
            vm.emit("".concat(vm.dragObject["class"], ":click"), vm.dragObject.parent);
          }

          vm.dragObject.dragging = false;
        }

        vm.dragObject = null;
      });
      window.addEventListener('resize', function () {
        vm.onResize();
      }); // document.addEventListener('keyup', () => {
      //   if (this.modeToggleByKey && this.isGrabMode()) {
      //     this.setModeAsSelect();
      //     this.modeToggleByKey = false;
      //   }
      // });
      // document.addEventListener('keydown', event => {
      //   if (event.ctrlKey || event.metaKey) {
      //     if (this.isSelectMode()) {
      //       this.setModeAsGrab();
      //     }
      //     this.modeToggleByKey = true;
      //   }
      // });
    }
  }, {
    key: "unregisterListeners",
    value: function unregisterListeners() {
      this.canvas.off('object:moving');
      this.canvas.off('object:moved');
    }
  }, {
    key: "getMarkerById",
    value: function getMarkerById(id) {
      var objects = this.canvas.getObjects();

      for (var i = 0; i < objects.length; i += 1) {
        var obj = objects[i];

        if (obj["class"] === 'marker' && obj.id === id) {
          return obj.parent;
        }
      }

      return null;
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      var list = [];
      var objects = this.canvas.getObjects();

      for (var i = 0; i < objects.length; i += 1) {
        var obj = objects[i];

        if (obj["class"] === 'marker') {
          list.push(obj.parent);
        }
      }

      return list;
    }
  }]);

  return Map;
}(mix(Base)["with"](ModesMixin));
var map = function map(container, options) {
  return new Map(container, options);
};

var Group = /*#__PURE__*/function (_fabric$Group) {
  _inherits(Group, _fabric$Group);

  var _super = _createSuper(Group);

  function Group(objects, options) {
    _classCallCheck(this, Group);

    options = options || {};
    return _super.call(this, objects, options);
  }

  _createClass(Group, [{
    key: "getBounds",
    value: function getBounds() {
      var coords = [];
      coords.push(new Point(this.left - this.width / 2.0, this.top - this.height / 2.0));
      coords.push(new Point(this.left + this.width / 2.0, this.top + this.height / 2.0));
      return coords;
    }
  }]);

  return Group;
}(fabric.Group);
var group = function group(objects, options) {
  return new Group(objects, options);
};

var Layer = /*#__PURE__*/function (_Base) {
  _inherits(Layer, _Base);

  var _super = _createSuper(Layer);

  function Layer(options) {
    var _this;

    _classCallCheck(this, Layer);

    _this = _super.call(this, options);
    _this.label = _this.label !== undefined ? _this.label : null;
    _this.draggable = _this.draggable || false;
    _this.zIndex = _this.zIndex || 1;
    _this.opacity = _this.opacity || 1;
    _this.keepOnZoom = _this.keepOnZoom || false;
    _this.clickable = _this.clickable || false;
    _this.hoverCursor = _this.hoverCursor || _this.clickable ? 'pointer' : 'default';
    _this.moveCursor = _this.moveCursor || 'move'; // this.class = this.class || this.constructor.name.toLowerCase();

    _this.style = {
      zIndex: _this.zIndex,
      "class": _this["class"],
      parent: _assertThisInitialized(_this),
      keepOnZoom: _this.keepOnZoom,
      id: _this.id,
      hasControls: false,
      hasBorders: false,
      lockMovementX: !_this.draggable,
      lockMovementY: !_this.draggable,
      draggable: _this.draggable,
      clickable: _this.clickable,
      evented: _this.clickable,
      selectable: _this.draggable,
      hoverCursor: _this.hoverCursor,
      moveCursor: _this.moveCursor
    };
    return _this;
  }

  _createClass(Layer, [{
    key: "setOptions",
    value: function setOptions(options) {
      var _this2 = this;

      if (!this.shape) return;
      Object.keys(options).forEach(function (key) {
        _this2.shape.set(key, options[key]);
      });

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }, {
    key: "addTo",
    value: function addTo(map) {
      if (!map) {
        if (this._map) {
          this._map.removeLayer(this);
        }

        return;
      }

      this._map = map;

      this._map.addLayer(this);
    }
  }]);

  return Layer;
}(Base);
var layer = function layer(options) {
  return new Layer(options);
};

var Floor = /*#__PURE__*/function (_Layer) {
  _inherits(Floor, _Layer);

  var _super = _createSuper(Floor);

  function Floor(options) {
    var _this;

    _classCallCheck(this, Floor);

    _this = _super.call(this, options);
    _this.width = _this.width || -1;
    _this.height = _this.height || -1;
    _this.position = new Point(_this.position);
    _this["class"] = 'floorplan';

    _this.load();

    return _this;
  }

  _createClass(Floor, [{
    key: "load",
    value: function load() {
      var vm = this;
      var index = this.url.lastIndexOf('.');
      var ext = this.url.substr(index + 1, 3);

      if (ext === 'svg') {
        fabric.loadSVGFromURL(this.url, function (objects, options) {
          objects = objects.filter(function (e) {
            return e.id !== 'grid';
          });
          var image = fabric.util.groupSVGElements(objects, options);
          vm.setImage(image);
        });
      } else {
        fabric.Image.fromURL(this.url, function (image) {
          vm.setImage(image);
        }, {
          selectable: false,
          opacity: this.opacity
        });
      }

      this.handler = new fabric.Rect({
        left: 0,
        top: 0,
        width: 0.1,
        height: 0.1,
        stroke: 'black',
        fill: '',
        hasControls: false,
        hasBorders: false
      });
    }
  }, {
    key: "setImage",
    value: function setImage(image) {
      if (this.shape && this.image) {
        this.shape.remove(this.image);
      }

      var ratio = image.width / image.height;

      if (this.width === -1 && this.height === -1) {
        this.width = image.width;
        this.height = image.height;
      } else if (this.width === -1) {
        this.width = this.height * ratio;
      } else if (this.height === -1) {
        this.height = this.width / ratio;
      }

      image.originalWidth = image.width;
      image.originalHeight = image.height;
      this.image = image.scaleToWidth(this.width, true);
      this.scaleX = image.scaleX + 0;
      this.scaleY = image.scaleY + 0;
      this.drawShape();
    }
  }, {
    key: "drawShape",
    value: function drawShape() {
      if (this.shape) {
        this.shape.addWithUpdate(this.image);
        this.emit('load', this);
        return;
      }

      this.shape = new Group([this.image, this.handler], {
        selectable: false,
        draggable: false,
        left: this.position.x,
        top: this.position.y,
        parent: this,
        lockMovementX: true,
        lockMovementY: true,
        "class": this["class"],
        zIndex: this.zIndex
      });
      this.emit('load', this);
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this.width = width;
      this.onResize();
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this.height = height;
      this.onResize();
    }
  }, {
    key: "setOpacity",
    value: function setOpacity(opacity) {
      this.opacity = opacity;
      this.image.set('opacity', opacity);

      if (this.image.canvas) {
        this.image.canvas.renderAll();
      }
    }
  }, {
    key: "setPosition",
    value: function setPosition(position) {
      this.position = new Point(position);
      if (!this.shape) return;
      this.shape.set({
        left: this.position.x,
        top: this.position.y
      });
    }
  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.url = url;
      this.load();
    }
  }, {
    key: "onResize",
    value: function onResize(width, height) {
      if (width !== undefined) {
        this.width = width;
      }

      if (height !== undefined) {
        this.height = height;
      }

      var ratio = this.image.width / this.image.height;

      if (this.width === -1 && this.height === -1) {
        this.width = this.image.width;
        this.height = this.image.height;
      } else if (this.width === -1) {
        this.width = this.height / ratio;
      } else if (this.height === -1) {
        this.height = this.width * ratio;
      }

      this.image = this.image.scaleToWidth(this.width);
      this.shape.addWithUpdate();
    }
  }]);

  return Floor;
}(Layer);
var floorplan = function floorplan(options) {
  return new Floor(options);
};

var Line = /*#__PURE__*/function (_fabric$Line) {
  _inherits(Line, _fabric$Line);

  var _super = _createSuper(Line);

  function Line(points, options) {
    var _this;

    _classCallCheck(this, Line);

    options = options || {};
    options.strokeWidth = options.strokeWidth || 1;
    options["class"] = 'line';
    _this = _super.call(this, points, options);
    _this._strokeWidth = options.strokeWidth;
    return _this;
  }

  _createClass(Line, [{
    key: "_renderStroke",
    value: function _renderStroke(ctx) {
      var stroke = this._strokeWidth / this.canvas.getZoom();
      this.strokeWidth = stroke > 0.01 ? stroke : 0.01;

      _get(_getPrototypeOf(Line.prototype), "_renderStroke", this).call(this, ctx);

      this.setCoords();
    }
  }]);

  return Line;
}(fabric.Line);
var line = function line(points, options) {
  return new Line(points, options);
};

var Connector = /*#__PURE__*/function (_Layer) {
  _inherits(Connector, _Layer);

  var _super = _createSuper(Connector);

  function Connector(start, end, options) {
    var _this;

    _classCallCheck(this, Connector);

    options = options || {};
    options.zIndex = options.zIndex || 10;
    options["class"] = 'connector';
    _this = _super.call(this, options);

    if (!start || !end) {
      console.error('start or end is missing');
      return _possibleConstructorReturn(_this);
    }

    _this.start = start;
    _this.end = end;
    _this.strokeWidth = _this.strokeWidth || 1;
    Object.assign(_this.style, {
      strokeWidth: _this.strokeWidth,
      stroke: _this.color || 'grey',
      fill: _this.fill || false,
      selectable: false
    });

    _this.draw();

    _this.registerListeners();

    return _this;
  }

  _createClass(Connector, [{
    key: "registerListeners",
    value: function registerListeners() {
      var vm = this;
      this.start.on('update:links', function () {
        vm.shape.set({
          x1: vm.start.position.x,
          y1: vm.start.position.y
        });
      });
      this.end.on('update:links', function () {
        vm.shape.set({
          x2: vm.end.position.x,
          y2: vm.end.position.y
        });
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.shape = new Line([this.start.position.x, this.start.position.y, this.end.position.x, this.end.position.y], this.style); // this.shape.setCoords();
    }
  }, {
    key: "redraw",
    value: function redraw() {
      this.shape.set({
        x1: this.start.position.x,
        y1: this.start.position.y,
        x2: this.end.position.x,
        y2: this.end.position.y
      });
    }
  }, {
    key: "setStart",
    value: function setStart(start) {
      this.start = start;
      this.redraw();
    }
  }, {
    key: "setEnd",
    value: function setEnd(end) {
      this.end = end;
      this.redraw();
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
      this.style.stroke = color;
      this.shape.set('stroke', color);

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }, {
    key: "setStrokeWidth",
    value: function setStrokeWidth(strokeWidth) {
      this.strokeWidth = strokeWidth;
      this.style.strokeWidth = strokeWidth;
      this.shape.set('strokeWidth', strokeWidth);

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }]);

  return Connector;
}(Layer);
var connector = function connector(start, end, options) {
  return new Connector(start, end, options);
};

var Marker = /*#__PURE__*/function (_Layer) {
  _inherits(Marker, _Layer);

  var _super = _createSuper(Marker);

  function Marker(position, options) {
    var _this;

    _classCallCheck(this, Marker);

    options = options || {};
    options.zIndex = options.zIndex || 100;
    options.keepOnZoom = options.keepOnZoom === undefined ? true : options.keepOnZoom;
    options.position = new Point(position);
    options.rotation = options.rotation || 0;
    options.yaw = options.yaw || 0;
    options.clickable = options.clickable !== undefined ? options.clickable : true;
    options["class"] = 'marker';
    _this = _super.call(this, options);

    var vm = _assertThisInitialized(_this);

    _this.text = _this.text || '';
    _this.size = _this.size || 10;
    _this.textColor = _this.textColor || 'black';
    _this.fill = _this.fill || 'white';
    _this.stroke = _this.stroke || 'red';
    Object.assign(_this.style, {
      left: _this.position.x,
      top: _this.position.y,
      // selectionBackgroundColor: false,
      angle: _this.rotation,
      yaw: _this.yaw,
      clickable: _this.clickable
    });

    if (_this.text) {
      _this.textObj = new fabric.Text(_this.text, {
        fontSize: _this.size,
        fill: _this.textColor
      });
    }

    if (_this.icon) {
      fabric.Image.fromURL(_this.icon.url, function (image) {
        vm.image = image.scaleToWidth(_this.size);

        _this.init(); // vm.shape.removeWithUpdate();

      }, {
        selectable: false,
        evented: _this.evented,
        clickable: _this.clickable,
        opacity: _this.opacity
      });
    } else {
      _this.circle = new fabric.Circle({
        radius: _this.size,
        strokeWidth: 2,
        stroke: _this.stroke,
        fill: _this.fill
      });

      _this.init();
    }

    return _this;
  }

  _createClass(Marker, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var objects = [];

      if (this.image) {
        objects.push(this.image);
      }

      if (this.circle) {
        objects.push(this.circle);
      }

      if (this.textObj) {
        objects.push(this.textObj);
      }

      this.shape = new Group(objects, this.style);
      this.links = this.links || [];
      this.addLinks();
      this.registerListeners();
      nextTick(function () {
        _this2.emit('ready');
      });
    }
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var vm = this;
      this.shape.on('moving', function () {
        vm.onShapeDrag();
      });
      this.shape.on('rotating', function () {
        vm.emit('rotating');
      });
      this.shape.on('mousedown', function (e) {
        vm.onShapeMouseDown(e);
      });
      this.shape.on('mousemove', function (e) {
        vm.onShapeMouseMove(e);
      });
      this.shape.on('mouseup', function (e) {
        vm.onShapeMouseUp(e);
      });
      this.shape.on('mouseover', function () {
        vm.emit('mouseover', vm);
      });
      this.shape.on('mouseout', function () {
        vm.emit('mouseout', vm);
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(position) {
      this.position = new Point(position);
      if (!this.shape) return;
      this.shape.set({
        left: this.position.x,
        top: this.position.y
      });
      this.emit('update:links');

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }, {
    key: "setRotation",
    value: function setRotation(rotation) {
      this.rotation = rotation;
      if (!this.shape) return;
      this.shape.set({
        angle: this.rotation
      });

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this3 = this;

      if (!this.shape) return;
      Object.keys(options).forEach(function (key) {
        switch (key) {
          case 'textColor':
            _this3.setTextColor(options[key]);

            break;

          case 'stroke':
            _this3.setStroke(options[key]);

            break;

          case 'fill':
            _this3.setColor(options[key]);

            break;
        }
      });

      if (this.shape.canvas) {
        this.shape.canvas.renderAll();
      }
    }
  }, {
    key: "setTextColor",
    value: function setTextColor(color) {
      if (this.text && this.textObj) {
        this.textObj.setColor(color);
        this.textObj.canvas.renderAll();
      }
    }
  }, {
    key: "setText",
    value: function setText(text) {
      if (this.text && this.textObj) {
        this.textObj.set({
          text: text
        });
        this.textObj.canvas.renderAll();
      }
    }
  }, {
    key: "setStroke",
    value: function setStroke(color) {
      if (this.circle) {
        this.circle.set('stroke', color);
      }
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      if (this.circle) {
        this.circle.setColor(color);
      }
    }
  }, {
    key: "setLinks",
    value: function setLinks(links) {
      this.links = links;
      this.addLinks();
    }
  }, {
    key: "setSize",
    value: function setSize(size) {
      if (this.image) {
        this.image.scaleToWidth(size);

        if (this.image.canvas) {
          this.image.canvas.renderAll();
        }
      } else if (this.circle) {
        this.circle.setRadius(size);
      }
    }
  }, {
    key: "addLinks",
    value: function addLinks() {
      var _this4 = this;

      this.connectors = [];
      this.links.forEach(function (link) {
        var connector = new Connector(_this4, link);

        _this4.connectors.push(connector);
      });
      this.addConnectors();
    }
  }, {
    key: "addConnectors",
    value: function addConnectors() {
      var vm = this;
      this.connectors.forEach(function (connector) {
        vm._map.addLayer(connector);
      });
    }
  }, {
    key: "onAdded",
    value: function onAdded() {
      this.addConnectors();
    }
  }, {
    key: "onShapeDrag",
    value: function onShapeDrag() {
      var matrix = this.shape.calcTransformMatrix();

      var _matrix = _slicedToArray(matrix, 6),
          x = _matrix[4],
          y = _matrix[5];

      this.position = new Point(x, y);
      this.emit('update:links');
      this.emit('moving');
    }
  }, {
    key: "onShapeMouseDown",
    value: function onShapeMouseDown(e) {
      this.dragStart = e;
    }
  }, {
    key: "onShapeMouseMove",
    value: function onShapeMouseMove(e) {
      if (this.dragStart) {
        this.emit('dragstart');
        var a = new fabric.Point(e.pointer.x, e.pointer.y);
        var b = new fabric.Point(this.dragStart.pointer.x, this.dragStart.pointer.y); // if distance is far enough, we don't want to fire click event

        if (a.distanceFrom(b) > 3) {
          this.dragStart = null;
          this.dragging = true;
        }
      }

      if (this.dragging) {
        this.emit('drag');
      } else {
        this.emit('hover');
      }
    }
  }, {
    key: "onShapeMouseUp",
    value: function onShapeMouseUp() {
      if (!this.dragging) {
        this.emit('click');
      } else {
        this.emit('moved');
      }

      this.dragStart = null;
      this.dragging = false;
    }
  }]);

  return Marker;
}(Layer);
var marker = function marker(position, options) {
  return new Marker(position, options);
};

var Icon = /*#__PURE__*/function (_fabric$Image) {
  _inherits(Icon, _fabric$Image);

  var _super = _createSuper(Icon);

  function Icon(options) {
    var _this;

    _classCallCheck(this, Icon);

    _this = _super.call(this, options);
    _this.defaults = Object.assign({}, ICON);
    Object.assign({}, _this.defaults);
    Object.assign({}, _this._options);
    return _this;
  }

  return Icon;
}(fabric.Image);
var icon = function icon(options) {
  return new Icon(options);
};

var Polyline = /*#__PURE__*/function (_Layer) {
  _inherits(Polyline, _Layer);

  var _super = _createSuper(Polyline);

  function Polyline(_points, options) {
    var _this;

    _classCallCheck(this, Polyline);

    options = options || {};
    options.points = _points || [];
    _this = _super.call(this, options);
    _this.lines = [];
    _this["class"] = 'polyline';
    _this.strokeWidth = 1;
    _this.lineOptions = {
      strokeWidth: _this.strokeWidth,
      stroke: _this.color || 'grey',
      fill: _this.fill || false
    };
    _this.shape = new Group([], {
      selectable: false,
      hasControls: false,
      "class": _this["class"],
      parent: _assertThisInitialized(_this)
    });

    _this.setPoints(_this._points);

    return _this;
  }

  _createClass(Polyline, [{
    key: "addPoint",
    value: function addPoint(point) {
      this.points.push(new Point(point));

      if (this.points.length > 1) {
        var i = this.points.length - 1;
        var j = this.points.length - 2;
        var p1 = this.points[i];
        var p2 = this.points[j];
        var line = new fabric.Line(p1.getArray().concat(p2.getArray()), this.lineOptions);
        this.lines.push(line);
        this.shape.addWithUpdate(line);
      }
    }
  }, {
    key: "setStrokeWidth",
    value: function setStrokeWidth(strokeWidth) {
      this.lines.forEach(function (line) {
        line.setStrokeWidth(strokeWidth);
      });
    }
  }, {
    key: "setPoints",
    value: function setPoints() {
      var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.removeLines();
      this.points = [];

      for (var i = 0; i < points.length; i += 1) {
        var point = new Point(points[i]);
        this.points.push(point);
        this.addPoint();
      }
    }
  }, {
    key: "removeLines",
    value: function removeLines() {
      for (var i = 0; i < this.lines.length; i += 1) {
        this.shape.remove(this.lines[i]);
      }

      this.lines = [];
    }
  }]);

  return Polyline;
}(Layer);
var polyline = function polyline(points, options) {
  return new Polyline(points, options);
};

var Circle = /*#__PURE__*/function (_fabric$Circle) {
  _inherits(Circle, _fabric$Circle);

  var _super = _createSuper(Circle);

  function Circle() {
    _classCallCheck(this, Circle);

    return _super.apply(this, arguments);
  }

  return Circle;
}(fabric.Circle);
var circle = function circle(options) {
  return new Circle(options);
};

var Rect = /*#__PURE__*/function (_fabric$Rect) {
  _inherits(Rect, _fabric$Rect);

  var _super = _createSuper(Rect);

  function Rect(points, options) {
    var _this;

    _classCallCheck(this, Rect);

    options = options || {};
    options.strokeWidth = options.strokeWidth || 1;
    options["class"] = 'rect';
    _this = _super.call(this, points, options);
    _this._strokeWidth = options.strokeWidth;
    return _this;
  }

  _createClass(Rect, [{
    key: "_renderStroke",
    value: function _renderStroke(ctx) {
      this.strokeWidth = this._strokeWidth / this.canvas.getZoom();

      _get(_getPrototypeOf(Rect.prototype), "_renderStroke", this).call(this, ctx);
    }
  }]);

  return Rect;
}(fabric.Rect);
var rect = function rect(points, options) {
  return new Rect(points, options);
};

var MarkerGroup = /*#__PURE__*/function (_Layer) {
  _inherits(MarkerGroup, _Layer);

  var _super = _createSuper(MarkerGroup);

  function MarkerGroup(bounds, options) {
    var _this;

    _classCallCheck(this, MarkerGroup);

    options = options || {};
    options.bounds = bounds;
    options.zIndex = options.zIndex || 50;
    options["class"] = 'markergroup';
    _this = _super.call(this, options);

    if (!_this.bounds) {
      console.error('bounds is missing!');
      return _possibleConstructorReturn(_this);
    }

    _this.style = {
      strokeWidth: 1,
      stroke: _this.stroke || 'black',
      fill: _this.color || '#88888822',
      "class": _this["class"],
      zIndex: _this.zIndex,
      parent: _assertThisInitialized(_this)
    };

    _this.draw();

    return _this;
  }

  _createClass(MarkerGroup, [{
    key: "setBounds",
    value: function setBounds(bounds) {
      this.bounds = bounds;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var width = this.bounds[1][0] - this.bounds[0][0];
      var height = this.bounds[1][1] - this.bounds[0][1];
      this.coords = {
        left: this.bounds[0][0] + width / 2,
        top: this.bounds[0][1] + height / 2,
        width: width,
        height: height
      };

      if (this.shape) {
        this.shape.set(this.coords);
      } else {
        Object.assign(this.style, this.coords);
        this.shape = new Rect(this.style);
      }
    }
  }]);

  return MarkerGroup;
}(Layer);
var markerGroup = function markerGroup(bounds, options) {
  return new MarkerGroup(bounds, options);
};

var ArrowHead = /*#__PURE__*/function (_fabric$Triangle) {
  _inherits(ArrowHead, _fabric$Triangle);

  var _super = _createSuper(ArrowHead);

  function ArrowHead(points, options) {
    _classCallCheck(this, ArrowHead);

    options = options || {};
    options.headLength = options.headLength || 10;
    options.stroke = options.stroke || '#207cca';

    var _points = _slicedToArray(points, 4),
        x1 = _points[0],
        y1 = _points[1],
        x2 = _points[2],
        y2 = _points[3];

    var dx = x2 - x1;
    var dy = y2 - y1;
    var angle = Math.atan2(dy, dx);
    angle *= 180 / Math.PI;
    angle += 90;

    if (options.lastAngle !== undefined) {
      angle = options.lastAngle;
      console.log("Angle: ".concat(angle));
    }

    return _super.call(this, {
      angle: angle,
      fill: options.stroke,
      top: y2,
      left: x2,
      height: options.headLength,
      width: options.headLength,
      originX: 'center',
      originY: 'center',
      selectable: false
    });
  }

  return ArrowHead;
}(fabric.Triangle);

var Arrow = /*#__PURE__*/function (_fabric$Group) {
  _inherits(Arrow, _fabric$Group);

  var _super = _createSuper(Arrow);

  function Arrow(point, options) {
    var _this;

    _classCallCheck(this, Arrow);

    options = options || {};
    options.strokeWidth = options.strokeWidth || 5;
    options.stroke = options.stroke || '#7db9e8';
    options["class"] = 'arrow';
    _this = _super.call(this, [], Object.assign(options, {
      evented: false
    }));
    _this.pointArray = [point, Object.assign({}, point)];
    _this.options = options;

    _this.draw();

    return _this;
  }

  _createClass(Arrow, [{
    key: "draw",
    value: function draw() {
      if (this.head) {
        this.remove(this.head);
      }

      if (this.polyline) {
        this.remove(this.polyline);
      }

      this.polyline = new fabric.Polyline(this.pointArray, Object.assign(this.options, {
        strokeLineJoin: 'round',
        fill: false
      }));
      this.addWithUpdate(this.polyline);
      var lastPoints = this.getLastPoints();
      var p1 = new fabric.Point(lastPoints[0], lastPoints[1]);
      var p2 = new fabric.Point(lastPoints[2], lastPoints[3]);
      var dis = p1.distanceFrom(p2);
      console.log("dis = ".concat(dis));
      this.head = new ArrowHead(lastPoints, Object.assign(this.options, {
        headLength: this.strokeWidth * 2,
        lastAngle: dis <= 10 ? this.lastAngle : undefined
      }));

      if (dis > 10) {
        this.lastAngle = this.head.angle;
      }

      this.addWithUpdate(this.head);
    }
  }, {
    key: "addPoint",
    value: function addPoint(point) {
      this.pointArray.push(point);
      this.draw();
    }
  }, {
    key: "addTempPoint",
    value: function addTempPoint(point) {
      var len = this.pointArray.length;
      var lastPoint = this.pointArray[len - 1];
      lastPoint.x = point.x;
      lastPoint.y = point.y;
      this.draw();
    }
  }, {
    key: "getLastPoints",
    value: function getLastPoints() {
      var len = this.pointArray.length;
      var point1 = this.pointArray[len - 2];
      var point2 = this.pointArray[len - 1];
      return [point1.x, point1.y, point2.x, point2.y];
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this._objects.forEach(function (obj) {
        obj.setColor(color);
      });
    }
  }]);

  return Arrow;
}(fabric.Group);

var Modes$1 = {
  SELECT: 'select',
  DRAWING: 'drawing',
  ARROW: 'arrow',
  TEXT: 'text'
};
var Canvas = /*#__PURE__*/function (_Base) {
  _inherits(Canvas, _Base);

  var _super = _createSuper(Canvas);

  function Canvas(container, options) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _super.call(this, options);
    _this.container = container;
    var canvas = document.createElement('canvas');

    _this.container.appendChild(canvas);

    canvas.setAttribute('id', 'indoorjs-canvas');
    canvas.width = _this.width || _this.container.clientWidth;
    canvas.height = _this.height || _this.container.clientHeight;
    _this.currentColor = _this.currentColor || 'black';
    _this.fontFamily = _this.fontFamily || 'Roboto';
    _this.canvas = new fabric.Canvas(canvas, {
      freeDrawingCursor: 'none',
      freeDrawingLineWidth: _this.lineWidth
    });
    _this.arrows = [];

    _this.setLineWidth(_this.lineWidth || 10);

    _this.addCursor();

    _this.addListeners();

    _this.setModeAsArrow();

    return _this;
  }

  _createClass(Canvas, [{
    key: "setModeAsDrawing",
    value: function setModeAsDrawing() {
      this.mode = Modes$1.DRAWING;
      this.canvas.isDrawingMode = true;
      this.canvas.selection = false;
      this.onModeChanged();
    }
  }, {
    key: "isDrawingMode",
    value: function isDrawingMode() {
      return this.mode === Modes$1.DRAWING;
    }
  }, {
    key: "setModeAsSelect",
    value: function setModeAsSelect() {
      this.mode = Modes$1.SELECT;
      this.canvas.isDrawingMode = false;
      this.canvas.selection = true;
      this.onModeChanged();
    }
  }, {
    key: "isSelectMode",
    value: function isSelectMode() {
      return this.mode === Modes$1.SELECT;
    }
  }, {
    key: "setModeAsArrow",
    value: function setModeAsArrow() {
      this.mode = Modes$1.ARROW;
      this.canvas.isDrawingMode = false;
      this.canvas.selection = false;
      this.onModeChanged();
    }
  }, {
    key: "isArrowMode",
    value: function isArrowMode() {
      return this.mode === Modes$1.ARROW;
    }
  }, {
    key: "setModeAsText",
    value: function setModeAsText() {
      this.mode = Modes$1.TEXT;
      this.canvas.isDrawingMode = false;
      this.canvas.selection = false;
      this.onModeChanged();
    }
  }, {
    key: "isTextMode",
    value: function isTextMode() {
      return this.mode === Modes$1.TEXT;
    }
  }, {
    key: "onModeChanged",
    value: function onModeChanged() {
      var _this2 = this;

      this.updateCursor();
      this.emit('mode-changed', this.mode);

      this.canvas._objects.forEach(function (obj) {
        obj.evented = _this2.isSelectMode();
      });
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this3 = this;

      var canvas = this.canvas;
      canvas.on('mouse:move', function (evt) {
        var mouse = canvas.getPointer(evt.e);

        if (_this3.mousecursor) {
          _this3.mousecursor.set({
            top: mouse.y,
            left: mouse.x
          }).setCoords().canvas.renderAll();
        }

        if (_this3.isTextMode()) {
          console.log('text');
        } else if (_this3.isArrowMode()) {
          if (_this3.activeArrow) {
            _this3.activeArrow.addTempPoint(mouse);
          }

          _this3.canvas.requestRenderAll();
        }
      });
      canvas.on('mouse:out', function () {
        // put circle off screen
        if (!_this3.mousecursor) return;

        _this3.mousecursor.set({
          left: -1000,
          top: -1000
        }).setCoords();

        _this3.cursor.renderAll();
      });
      canvas.on('mouse:up', function (event) {
        if (canvas.mouseDown) {
          canvas.fire('mouse:click', event);
        }

        canvas.mouseDown = false;
      });
      canvas.on('mouse:move', function (event) {
        canvas.mouseDown = false;
      });
      canvas.on('mouse:down', function (event) {
        canvas.mouseDown = true;
      });
      canvas.on('mouse:click', function (event) {
        console.log('mouse click', event);
        var mouse = canvas.getPointer(event.e);
        if (event.target) return;

        if (_this3.isTextMode()) {
          var text = new fabric.IText('Text', {
            left: mouse.x,
            top: mouse.y,
            width: 100,
            fontSize: 20,
            fontFamily: _this3.fontFamily,
            lockUniScaling: true,
            fill: _this3.currentColor,
            stroke: _this3.currentColor
          });
          canvas.add(text).setActiveObject(text).renderAll();

          _this3.setModeAsSelect();
        } else if (_this3.isArrowMode()) {
          console.log('arrow mode');

          if (_this3.activeArrow) {
            _this3.activeArrow.addPoint(mouse);
          } else {
            _this3.activeArrow = new Arrow(mouse, {
              stroke: _this3.currentColor,
              strokeWidth: _this3.lineWidth
            });

            _this3.canvas.add(_this3.activeArrow);
          }

          _this3.canvas.requestRenderAll();
        }
      });
      canvas.on('mouse:dblclick', function (event) {
        console.log('mouse:dbclick');

        if (_this3.isArrowMode() && _this3.activeArrow) {
          _this3.arrows.push(_this3.activeArrow);

          _this3.activeArrow = null;
        }
      });
      canvas.on('selection:created', function (event) {
        _this3.emit('selected');
      });
      canvas.on('selection:cleared', function (event) {
        _this3.emit('unselected');
      });
    }
  }, {
    key: "removeSelected",
    value: function removeSelected() {
      var _this4 = this;

      this.canvas.remove(this.canvas.getActiveObject());
      this.canvas.getActiveObjects().forEach(function (obj) {
        _this4.canvas.remove(obj);
      });
      this.canvas.discardActiveObject().renderAll();
    }
  }, {
    key: "updateCursor",
    value: function updateCursor() {
      if (!this.cursor) return;
      var canvas = this.canvas;

      if (this.mousecursor) {
        this.cursor.remove(this.mousecursor);
        this.mousecursor = null;
      }

      var cursorOpacity = 0.3;
      var mousecursor = null;

      if (this.isDrawingMode()) {
        mousecursor = new fabric.Circle({
          left: -1000,
          top: -1000,
          radius: canvas.freeDrawingBrush.width / 2,
          fill: "rgba(255,0,0,".concat(cursorOpacity, ")"),
          stroke: 'black',
          originX: 'center',
          originY: 'center'
        });
      } else if (this.isTextMode()) {
        mousecursor = new fabric.Path('M0,-10 V10', {
          left: -1000,
          top: -1000,
          radius: canvas.freeDrawingBrush.width / 2,
          fill: "rgba(255,0,0,".concat(cursorOpacity, ")"),
          stroke: "rgba(0,0,0,".concat(cursorOpacity, ")"),
          originX: 'center',
          originY: 'center',
          scaleX: 1,
          scaleY: 1
        });
      } else {
        mousecursor = new fabric.Path('M0,-10 V10 M-10,0 H10', {
          left: -1000,
          top: -1000,
          radius: canvas.freeDrawingBrush.width / 2,
          fill: "rgba(255,0,0,".concat(cursorOpacity, ")"),
          stroke: "rgba(0,0,0,".concat(cursorOpacity, ")"),
          originX: 'center',
          originY: 'center'
        });
      }

      if (this.isSelectMode()) {
        mousecursor = null;
        this.canvas.defaultCursor = 'default';
      } else {
        this.canvas.defaultCursor = 'none';
      }

      if (mousecursor) {
        this.cursor.add(mousecursor);
      }

      this.mousecursor = mousecursor;
    }
  }, {
    key: "addCursor",
    value: function addCursor() {
      var canvas = this.canvas;
      var cursorCanvas = document.createElement('canvas');
      this.canvas.wrapperEl.appendChild(cursorCanvas);
      cursorCanvas.setAttribute('id', 'indoorjs-cursor-canvas');
      cursorCanvas.style.position = 'absolute';
      cursorCanvas.style.top = '0';
      cursorCanvas.style.pointerEvents = 'none';
      cursorCanvas.width = this.width || this.container.clientWidth;
      cursorCanvas.height = this.height || this.container.clientHeight;
      this.cursorCanvas = cursorCanvas;
      canvas.defaultCursor = 'none';
      this.cursor = new fabric.StaticCanvas(cursorCanvas);
      this.updateCursor();
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.currentColor = color;
      this.canvas.freeDrawingBrush.color = color;
      var obj = this.canvas.getActiveObject();

      if (obj) {
        obj.set('stroke', color);
        obj.set('fill', color);
        this.canvas.requestRenderAll();
      }

      if (!this.mousecursor) return;
      this.mousecursor.set({
        left: 100,
        top: 100,
        fill: color
      }).setCoords().canvas.renderAll();
    }
  }, {
    key: "setLineWidth",
    value: function setLineWidth(width) {
      this.lineWidth = width;
      this.canvas.freeDrawingBrush.width = width;
      if (!this.mousecursor) return;
      this.mousecursor.set({
        left: 100,
        top: 100,
        radius: width / 2
      }).setCoords().canvas.renderAll();
    }
  }, {
    key: "setFontFamily",
    value: function setFontFamily(family) {
      this.fontFamily = family;
      var obj = this.canvas.getActiveObject();

      if (obj && obj.type === 'i-text') {
        obj.set('fontFamily', family);
        this.canvas.requestRenderAll();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.arrows = [];
      this.canvas.clear();
    }
  }]);

  return Canvas;
}(Base);
var canvas = function canvas(container, options) {
  return new Canvas(container, options);
};

console.log('fabricJS ', fabric$1.version || window.fabric.version);
console.log('IndoorJS ', version);

export { Canvas, Circle, Connector, Floor, Group, ICON, Icon, Layer, Line, MAP, MARKER, Map, Marker, MarkerGroup, Modes, Point, Polyline, Rect, canvas, circle, connector, floorplan, group, icon, layer, line, map, marker, markerGroup, point, polyline, rect, version };
//# sourceMappingURL=indoor.esm.js.map
