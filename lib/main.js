const DOMNodeCollection = require('./dom_node_collection');

const readyCallbacks = [];

window.$l = (selector) => {
  if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    const collection = Array.from(nodeList);
    return new DOMNodeCollection(collection);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function') {
    if (document.readyState === 'complete') {
      selector();
    } else {
      readyCallbacks.push(selector);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  readyCallbacks.forEach((callback) => callback());
});
