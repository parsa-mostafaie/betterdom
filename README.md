# Better DOM
  > *Code Better And easier in js*
  ## Import
  ```js
  import bd from 'https://cdn.jsdelivr.net/gh/parsa-mostafaie/betterdom@master/betterdom.js';
      
  // Use BetterDom features
  ```
  ## Important Note
  You Can Also Import betterdom using :
  ```html
  <script src='...'></script>
  ```
  but this Maybe cause bugs.

  ## Features
  + *\[alias\]* `element.on(...)` is alias for `element.addEventListener(...)`
  + *\[alias\]* `element.appendHTML(...)` is alias for `element.insertAdjacentHTML(...)`
  + *\[alias\]* `element.attr(name, value)` is alias for `element.setAttribute(name, value)` and `element.getAttribute(name)`
  + *\[alias\]* `window.$` is alias for `document`
  + *\[shorthand\]* `element.sibs` is shortway to get siblings of an element
  + *\[function\]* `window.htmlspecialchars` converts some predefined characters to HTML entities
  + *\[function\]* `bd.ldScript` Loads a script and returns a promise
  + *\[function\]* `bd.memoize`
  + *\[function\]* `bd.debounce`
  + *\[function\]* `bd.throttle`
  + *\[function\]* `bd.createElement(tag, props, ...childs)` Create A DOM Element
  + *\[function\]* `bd.fragment(...childs)` shorthand for `bd.createElement("", null, ...childs)`

🙏 If you Finded an issue i will thank you to report this to me using github issues.

> Maked By ❤ &copy; 2024
