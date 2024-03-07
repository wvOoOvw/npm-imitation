/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src),
  "useBindComponentPure": () => (/* reexport */ useBindComponentPure),
  "withBindComponentPure": () => (/* reexport */ withBindComponentPure)
});

;// CONCATENATED MODULE: ./src/monitor.js
var _Allow = Symbol('_Allow');

var differentArray = function differentArray(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return true;
  return a.filter(function (i, index) {
    return i === b[index];
  }).length !== a.length;
};

function Monitor(ImitationInstance) {
  this.ImitationInstance = ImitationInstance;
  this.dependentQueue = [];
  this.monitorQueue = [];
}

Monitor.prototype.dispatch = dispatch;
Monitor.prototype.register = register;
Monitor.prototype.executeEvent = executeEvent;
Monitor.prototype.executeDependent = executeDependent;

function dispatch() {
  var _this = this;

  this.monitorQueue.forEach(function (i, index) {
    var dependentPrevious = _this.dependentQueue[index];

    var dependentCurrent = _this.executeDependent(i.dependent);

    if (dependentCurrent === _Allow) {
      _this.executeEvent(i.event);

      _this.dependentQueue[index] = dependentCurrent;
      return;
    }

    if (Array.isArray(dependentCurrent) && Array.isArray(dependentPrevious) && differentArray(dependentCurrent, dependentPrevious)) {
      _this.executeEvent(i.event);

      _this.dependentQueue[index] = dependentCurrent;
      return;
    }

    if (!Array.isArray(dependentCurrent) && !Array.isArray(dependentPrevious) && dependentCurrent !== dependentPrevious) {
      _this.executeEvent(i.event);

      _this.dependentQueue[index] = dependentCurrent;
      return;
    }

    _this.dependentQueue[index] = dependentCurrent;
  });
}

function register(event) {
  var _this2 = this;

  var dependent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Allow;
  var monitor = {
    event: event,
    dependent: dependent
  };
  this.monitorQueue.push(monitor);
  this.dependentQueue.push(this.executeDependent(dependent));
  return function () {
    _this2.monitorQueue.forEach(function (i, index) {
      if (i === monitor) {
        _this2.monitorQueue = _this2.monitorQueue.filter(function (i, index_) {
          return index_ !== index;
        });
        _this2.dependentQueue = _this2.dependentQueue.filter(function (i, index_) {
          return index_ !== index;
        });
      }
    });
  };
}

function executeEvent(event) {
  event(this.ImitationInstance.state);
}

function executeDependent(dependent) {
  return typeof dependent === 'function' ? dependent(this.ImitationInstance.state) : dependent;
}

/* harmony default export */ const monitor = (Monitor);
;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ./src/React.BindComponent.jsx
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function ReactBindComponent(MonitorInstance) {
  this.MonitorInstance = MonitorInstance;
}

ReactBindComponent.prototype.withBindComponent = withBindComponent;
ReactBindComponent.prototype.useBindComponent = useBindComponent;
ReactBindComponent.prototype.withBindComponentPure = withBindComponentPure;
ReactBindComponent.prototype.useBindComponentPure = useBindComponentPure;

function withBindComponent(Component, dependent) {
  var Instance = this;
  return function App(props) {
    var _React$useState = external_react_default().useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        update = _React$useState2[0],
        setUpdate = _React$useState2[1];

    var destory = external_react_default().useMemo(function () {
      return Instance.MonitorInstance.register(function (state) {
        setUpdate(function (pre) {
          return pre + 1;
        });
      }, dependent);
    }, []);
    external_react_default().useEffect(function () {
      return function () {
        return destory();
      };
    }, []);
    return /*#__PURE__*/external_react_default().createElement(Component, props);
  };
}

function useBindComponent(dependent) {
  var _React$useState3 = external_react_default().useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      update = _React$useState4[0],
      setUpdate = _React$useState4[1];

  var destory = external_react_default().useMemo(function () {
    return Instance.MonitorInstance.register(function (state) {
      setUpdate(function (pre) {
        return pre + 1;
      });
    }, dependent);
  }, []);
  external_react_default().useEffect(function () {
    return function () {
      return destory();
    };
  }, []);
}

function withBindComponentPure(Component, ImitationMap) {
  return function App(props) {
    var _React$useState5 = external_react_default().useState(0),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        update = _React$useState6[0],
        setUpdate = _React$useState6[1];

    var destory = external_react_default().useMemo(function () {
      return ImitationMap.reduce(function (t, i) {
        return [].concat(_toConsumableArray(t), [i.instance.register(function (state) {
          setUpdate(function (pre) {
            return pre + 1;
          });
        }, i.dependent)]);
      }, []);
    }, [ImitationMap]);
    external_react_default().useEffect(function () {
      return function () {
        return destory();
      };
    }, [ImitationMap]);
    return /*#__PURE__*/external_react_default().createElement(Component, props);
  };
}

function useBindComponentPure(ImitationMap) {
  var _React$useState7 = external_react_default().useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      update = _React$useState8[0],
      setUpdate = _React$useState8[1];

  var destory = external_react_default().useMemo(function () {
    return ImitationMap.reduce(function (t, i) {
      return [].concat(_toConsumableArray(t), [i.instance.register(function (state) {
        setUpdate(function (pre) {
          return pre + 1;
        });
      }, i.dependent)]);
    }, []);
  }, [ImitationMap]);
  external_react_default().useEffect(function () {
    return function () {
      return destory();
    };
  }, [ImitationMap]);
}

/* harmony default export */ const React_BindComponent = (ReactBindComponent);

;// CONCATENATED MODULE: ./src/imitation.js



function Imitation(v) {
  this.state = v;
  this.MonitorInstance = new monitor(this);
  this.ReactBindComponentInstance = new React_BindComponent(this.MonitorInstance);
}

Imitation.prototype.setState = setState;
Imitation.prototype.assignState = assignState;
Imitation.prototype.register = imitation_register;
Imitation.prototype.dispatch = imitation_dispatch;
Imitation.prototype.withBindComponent = imitation_withBindComponent;
Imitation.prototype.useBindComponent = imitation_useBindComponent;

function setState(v) {
  this.state = typeof v === 'function' ? v(this.state) : v;
  this.dispatch();
}

function assignState(v) {
  this.state = Object.assign(this.state, typeof v === 'function' ? v(this.state) : v);
  this.dispatch();
}

function imitation_register() {
  var _this$MonitorInstance;

  return (_this$MonitorInstance = this.MonitorInstance).register.apply(_this$MonitorInstance, arguments);
}

function imitation_dispatch() {
  var _this$MonitorInstance2;

  return (_this$MonitorInstance2 = this.MonitorInstance).dispatch.apply(_this$MonitorInstance2, arguments);
}

function imitation_withBindComponent() {
  var _this$ReactBindCompon;

  return (_this$ReactBindCompon = this.ReactBindComponentInstance).withBindComponent.apply(_this$ReactBindCompon, arguments);
}

function imitation_useBindComponent() {
  var _this$ReactBindCompon2;

  return (_this$ReactBindCompon2 = this.ReactBindComponentInstance).useBindComponent.apply(_this$ReactBindCompon2, arguments);
}

/* harmony default export */ const imitation = (Imitation);
;// CONCATENATED MODULE: ./src/index.js


/* harmony default export */ const src = (imitation);

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;