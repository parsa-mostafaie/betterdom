/* Better Dom: v0.9.0 */

let sibs = function () {
  let e = this;
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

// Load External Script
function loadscript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");

    script.src = url;

    script.onload = () => resolve("Script Loaded!");
    script.onerror = () => reject("Script Load Failed!");

    document.body.appendChild(script);
  });
}

async function script_init(url, callback) {
  let res = await loadscript(url);
  callback(res);
  return res;
}

// attr
function attr(name, value) {
  let e = this;
  if (value != undefined) {
    e.setAttribute(name, value);
  } else {
    return e.getAttribute(name);
  }
}

// memoize
const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!cache[argsKey]) {
      cache[argsKey] = func(...args);
    }
    return cache[argsKey];
  };
};

// alias
Element.prototype.on = Element.prototype.addEventListener;
Element.prototype.appendHTML = Element.prototype.insertAdjacentElement;
Element.prototype.sibs = sibs;
Element.prototype.attr = attr;
window.$ = document;
window.htmlspecialchars = function (text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};

const debounce = function (func, timeout = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const throttle = function (func, delay) {
  let lastExecTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecTime >= delay) {
      func.apply(this, args);
    }
  };
};

export default {
  ldScript: script_init,
  memoize,
  throttle,
  debounce,
};
