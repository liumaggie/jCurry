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

$l.extend = (...objs) => {
  const extendedObj = objs[0];
  const mergedObjs = objs.slice(1);

  mergedObjs.forEach((obj) => {
    for (let i in obj) {
      extendedObj[i] = obj[i];
    }
  });

  return extendedObj;
};

$l.ajax = (options) => {
  const defaultOpts = {
    method: 'GET',
    url: "",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'JSON',
    success: () => {},
    error: () => {}
  };

  options = window.$l.extend(defaultOpts, options);
  if (options.method === 'GET') {
    options.url += "?" + toQueryString(options.data);
  }

  const xhr = new XMLHttpRequest();
  xhr.open(defaultOpts.method, defaultOpts.url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      defaultOpts.success(xhr.response);
    } else {
      defaultOpts.error(xhr.response);
    }
  };

  xhr.send(defaultOpts);
};

toQueryString = (obj) => {
  let queryString = "";
  obj.forEach((key) => {
    queryString += key + "=" + obj[key] + "&";
  });
  return queryString.slice(0, -1);
};

document.addEventListener('DOMContentLoaded', () => {
  readyCallbacks.forEach((callback) => callback());
});
