/* Better Dom: v0.9.0 */

/**
* @return { Array } Array of siblings in this node's parent or empty array if no parent or no
*/
let sibs = function () {
  let e = this;
  // for collecting siblings
  let siblings = [];
  // Returns the siblings of the node.
  if (!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;

  // Add sibling to siblings list.
  while (sibling) {
    // Add a sibling to the list of siblings.
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

/**
* Loads a script and returns a promise. This is a wrapper around loadScript. The promise resolves with " Script Loaded! " when the script is loaded and rejects with " Script Load Failed! " when the script fails.
* 
* @param url - The URL of the script to load. Must be absolute.
* 
* @return { Promise } A promise that will resolve or reject depending on whether the script has loaded succesfully
*/
function loadscript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");

    script.src = url;

    script.onload = () => resolve("Script Loaded!");
    script.onerror = () => reject("Script Load Failed!");

    document.body.appendChild(script);
  });
}

/**
* Loads a script and calls the callback with the result. This is a wrapper around loadscript that does not require a callback so we don't have to worry about it
* 
* @param url - URL of the script to load
* @param callback - Function to call with the result of the script
* 
* @return { Promise } A promise that resolves to the result of the script or rejects if there was an
*/
async function script_init(url, callback) {
  let res = await loadscript(url);
  callback(res);
  return res;
}

/**
* Set or get an attribute on the element. If you don't pass a value the attribute will be returned
* 
* @param name - The name of the attribute
* @param value - The value to set or null to get the attribute
* 
* @return { String| * } The value of the attribute or null if it does not exist or is not
*/
function attr(name, value) {
  let e = this;
  // Set the value of the attribute.
  if (value != undefined) {
    e.setAttribute(name, value);
  } else {
    return e.getAttribute(name);
  }
}

// memoize
// Memoizes the arguments of a function so they can be reused across calls. This is useful for optimizing graph construction
const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    // Cache the arguments to the function.
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
/**
* Replace & < > with & < > and " with &#039. This is used to prevent XSS attacks when displaying text that is too long to fit in HTML
* 
* @param text - The text to be processed
* 
* @return { string } The text with ampersands replaced with & < > and " replaced with & and
*/
window.htmlspecialchars = function (text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  /**
  * @param m
  * 
  * @return { * } Returns the key ` m ` or ` undefined ` if not found. Note that this function uses the [ " SameValueZero " comparison ] module : lamb. isSVZ|isSVZ
  */
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};

/**
* Creates a function that calls func after timeout. The timeout is set to 300ms by default. Use this to avoid timing out functions that are called indefinitely.
* 
* @param func - The function to call. It must have a ` then ` method
* @param timeout - The timeout in ms.
* 
* @return { Function } The new function that calls func after timeout ms. If func returns a value it will be returned
*/
const debounce = function (func, timeout = 300) {
  let timer;
  /**
  * args Arguments to pass to the when it is
  * 
  * @param args
  */
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

/**
* Wraps a function so it will only be executed once per delay. This is useful for functions that take advantage of timing and can't be called at all in a single function.
* 
* @param func - The function to wrap. Must be a function
* @param delay - The delay in ms before calling the wrapped function
* 
* @return { Function } The wrapped
*/
const throttle = function (func, delay) {
  let lastExecTime = 0;

  /**
  * args Arguments to pass to the if it's
  * 
  * @param args
  */
  return function (...args) {
    const now = Date.now();

    // If the last execution time is greater than delay call the function.
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
