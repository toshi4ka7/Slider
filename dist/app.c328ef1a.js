// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"slider.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var config = [{
  width: 0,
  count: 3,
  move: 1,
  class: false
}];

var _Init = new WeakSet();

var _createState = new WeakSet();

var Slider = /*#__PURE__*/function () {
  function Slider(selector) {
    var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slider);

    _createState.add(this);

    _Init.add(this);

    this.container = document.querySelector(selector);

    if (this.container) {
      _classPrivateMethodGet(this, _Init, _Init2).call(this, _options);
    } else {
      console.error("Not element with selector = ".concat(this.selector));
    }
  }

  _createClass(Slider, [{
    key: "goToCount",
    value: function goToCount(count) {
      var state = this.state.filter(function (state) {
        if (state.count === count) return true;
      })[0];
      this.width = state.width;
      this.history = state.history;
      this.position = state.position;
      this.count = state.count;
      this.move = state.move;
      this.pages = state.pages;
      this.widthItem = state.widthItem;
    }
  }, {
    key: "goToPage",
    value: function goToPage(page) {
      if (page <= 0 || page > this.pages) return;
      this.page = page;

      if (page === 1) {
        if (this.controlPrev) this.controlPrev.classList.add('disabled');
        if (this.controlStart) this.controlStart.classList.add('disabled');
        if (this.controlNext) this.controlNext.classList.remove('disabled');
        if (this.controlEnd) this.controlEnd.classList.remove('disabled');
      } else if (page === this.pages) {
        if (this.controlPrev) this.controlPrev.classList.remove('disabled');
        if (this.controlStart) this.controlStart.classList.remove('disabled');
        if (this.controlNext) this.controlNext.classList.add('disabled');
        if (this.controlEnd) this.controlEnd.classList.add('disabled');
      } else {
        if (this.controlNext) this.controlNext.classList.remove('disabled');
        if (this.controlPrev) this.controlPrev.classList.remove('disabled');
        if (this.controlStart) this.controlStart.classList.remove('disabled');
        if (this.controlEnd) this.controlEnd.classList.remove('disabled');
      }

      var position = this.position[page - 1];
      this.class ? this.addClass() : null;
      this.container.style.transform = "translateX(".concat(position, "%)");
    }
  }, {
    key: "addClass",
    value: function addClass() {
      this.items.forEach(function (elem) {
        elem.classList.remove('right');
        elem.classList.remove('left');
      });

      if (this.count >= 2) {
        this.history[this.page - 1][0].classList.add('left');
        this.history[this.page - 1][this.history[this.page - 1].length - 1].classList.add('right');
      }
    }
  }, {
    key: "next",
    value: function next() {
      this.goToPage(this.page + 1);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.goToPage(this.page - 1);
    }
  }, {
    key: "start",
    value: function start() {
      this.goToPage(1);
    }
  }, {
    key: "end",
    value: function end() {
      this.goToPage(this.pages);
    }
  }]);

  return Slider;
}();

var _Init2 = function _Init2(options) {
  var _this2 = this;

  this.items = Array.from(this.container.children);
  this.itemsCount = this.items.length;
  this.container.style.transition = 'transform 0.6s';
  this.class = options.class || config.class;
  this.controlNext = document.querySelector(options.next);
  this.controlPrev = document.querySelector(options.prev);
  this.controlStart = document.querySelector(options.start);
  this.controlEnd = document.querySelector(options.end);
  if (this.controlNext) this.controlNext.addEventListener('click', this.next.bind(this));
  if (this.controlPrev) this.controlPrev.addEventListener('click', this.prev.bind(this));
  if (this.controlStart) this.controlStart.addEventListener('click', this.start.bind(this));
  if (this.controlEnd) this.controlEnd.addEventListener('click', this.end.bind(this));
  this.state = [];
  var state = options.states || config;
  state.forEach(function (state) {
    _classPrivateMethodGet(_this2, _createState, _createState2).call(_this2, state.width, state.count, state.move);
  });
  this.mediaWidth = this.state.map(function (state) {
    return state.width;
  }).sort(function (a, b) {
    return a - b;
  });
  window.addEventListener('resize', windowHandler.bind(this));
  window.addEventListener('load', windowHandler.bind(this));
};

var _createState2 = function _createState2(width, count, move) {
  var state = {};
  state.history = [];
  state.position = [];
  state.width = width;
  state.count = count;
  state.move = move;
  state.pages = Math.ceil((this.itemsCount - state.count) / state.move) + 1;
  state.widthItem = 100 / state.count;
  var start = 0;

  for (var i = 0; i < state.pages; i++) {
    var array = this.items.slice(start, start + state.count);
    state.history.push(array);
    state.position.push(-i * state.widthItem * state.move);
    start += state.move;
  }

  if (state.history[state.history.length - 1].length !== state.count) {
    state.history[state.history.length - 1] = this.items.slice(-state.count);
    state.position[state.position.length - 1] = -(this.itemsCount - state.count) * state.widthItem;
  }

  this.state.push(state);
};

module.exports = Slider;

function windowHandler(e) {
  var _this = this;

  var windowWidth = window.innerWidth;
  var width = this.mediaWidth.filter(function (width) {
    if (width >= windowWidth) return true;
  })[0];
  var count = this.state.filter(function (state) {
    if (state.width === width) return true;
  })[0].count;

  if (e.type === 'load') {
    this.goToCount(count);
    this.goToPage(1);
    return;
  }

  if (count === this.count) return;
  var elem = this.history[this.page - 1][0];
  this.goToCount(count);
  this.history.forEach(function (array, index) {
    if (array.includes(elem)) {
      _this.container.style.transition = 'none';

      _this.goToPage(index + 1);

      setTimeout(function () {
        _this.container.style.transition = 'transform 0.6s';
      }, 0);
      return;
    }
  }); //this.goToPage(1)
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _slider = _interopRequireDefault(require("./slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slider = new _slider.default('.slider__items', {
  //class: true,
  prev: '.slider__control-left',
  next: '.slider__control-right',
  start: '.slider__control-start',
  end: '.slider__control-end',
  states: [{
    width: 5000,
    count: 4,
    move: 1
  }, {
    width: 1200,
    count: 3,
    move: 1
  }, {
    width: 800,
    count: 2,
    move: 2
  }, {
    width: 500,
    count: 1,
    move: 1
  }]
});
window.s = slider;
},{"./slider":"slider.js"}],"C:/Users/Anton/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "2526" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Anton/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map