/* Better Dom: v0.9.0 */

let sibs = function (e) {
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

export default { getSiblings: sibs, ldScript: script_init };
