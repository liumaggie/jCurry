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

  options = $l.extend(defaultOpts, options);
  if (options.method.toUpperCase() === 'GET') {
    options.url += toQueryString(options.data);
  }

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
};

toQueryString = (obj) => {
  let queryString = "";
  for (let key in obj) {
    queryString += key + "=" + obj[key] + "&";
  }
  return queryString.slice(0, -1);
};

document.addEventListener('DOMContentLoaded', () => {
  readyCallbacks.forEach((callback) => callback());
});
