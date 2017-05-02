const DOMNodeCollection = require('./dom_node_collection');

window.$l = (selector) => {
  if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    const collection = Array.from(nodeList);
    return new DOMNodeCollection(collection);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
};
