/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = (selector) => {
  if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    const collection = Array.from(nodeList);
    return new DOMNodeCollection(collection);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  each(callback) {
    this.htmlElements.forEach(callback);
  }

  html(arg) {
    if (typeof arg === 'string') {
      this.each((el) => {
        el.innerHTML = arg;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.each((el) => {
      el.innerHTML = '';
    });
  }

  append(children) {
    if (this.htmlElements.length === 0) return;

    if (typeof children === 'string') {
      this.each((el) => { el.innerHTML += children; });
    } else if (children instanceof HTMLElement) {
      this.each((el) => { el.innerHTML += children.outerHTML; });
    } else if (children instanceof DOMNodeCollection){
      this.each((el) => {
        children.each((child) => { el.innerHTML += child.outerHTML; });
      });
    }
  }

  attr(attrName, value) {
    if (typeof value === 'string') {
      this.each((el) => el.setAttribute(attrName, value));
    } else {
      const firstEl = this.htmlElements[0];
      return firstEl.getAttribute(attrName);
    }
  }

  addClass(className) {
    this.each((el) => { el.classList.add(className); });
  }

  removeClass(className) {
    this.each((el) => { el.classList.remove(className); });
  }

  children() {
    let allChildren = [];
    this.each((node) => {
      allChildren = allChildren.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let parents = [];
    this.each((node) => {
      if (!parents.includes(node.parentNode)) {
        parents.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let foundNodes = [];
    this.each((node) => {
      const nodes = Array.from(node.querySelectorAll(selector));
      nodes.forEach((el) => {
        if (!foundNodes.includes(el)) {
          foundNodes.push(el);
        }
      });
    });
    return new DOMNodeCollection(foundNodes);
  }

  remove() {
    const removedNodes = this;
    this.each((el) => { el.outerHTML = ''; });
    this.htmlElements = [];
    return removedNodes;
  }

  on(eventType, callback) {
    this.each((node) => {
      node.addEventListener(eventType, callback);
      const eventName = `${eventType}`;
      if (typeof node[eventName] === 'undefined') {
        node[eventName] = [];
      }
      node[eventName].push(callback);
    });
  }

  off(eventType) {
    this.each((node) => {
      const eventName = `${eventType}`;
      if (node[eventName]) {
        node[eventName].forEach((callback) => {
          node.removeEventListener(eventType, callback);
        });
      }
      node[eventName] = [];
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);