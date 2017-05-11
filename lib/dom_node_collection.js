class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  each(callback) {
    this.htmlElements.forEach(callback);
  }

  selectEl(i) {
    return this.htmlElements[i];
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
      const eventName = `events-${eventType}`;
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
