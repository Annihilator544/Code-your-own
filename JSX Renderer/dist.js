"use strict";

/** @jsx h */

// ^^^^ this tells a transpiler to inject calls to an `h()` function for each node.
function h(nodeName, attributes) {
  var _ref;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var children = args.length ? (_ref = []).concat.apply(_ref, args) : null;
  return {
    nodeName: nodeName,
    attributes: attributes,
    children: children
  };
}
function render(vnode) {
  // Strings just convert to text nodes
  if (vnode.split) return document.createTextNode(vnode);
  console.log(vnode, vnode.nodeName, vnode.split);

  // create a DOM element with the nodeName of our VDOM element:
  var n = document.createElement(vnode.nodeName);

  // copy attributes onto the new node:
  var a = vnode.attributes || {};
  Object.keys(a).forEach(function (k) {
    return n.setAttribute(k, a[k]);
  });
  // render (build) and then append child nodes:
  (vnode.children || []).forEach(function (c) {
    return n.appendChild(render(c));
  });
  return n;
}
var ITEMS = 'hello there people'.split(' ');

// a "partial" that does a filtered loop - no template BS, just functional programming:
function foo(items) {
  // imagine templates that adhere to your JS styleguide...
  return items.map(function (p) {
    return h("li", null, " ", p, " ");
  }); // <-- can be multiline
}

// a simple JSX "view" with a call out ("partial") to generate a list from an Array:
var vdom = h("div", {
  id: "foo"
}, h("p", null, "Look, a simple JSX DOM renderer!"), h("ul", null, foo(ITEMS)));

// render() converts our "virtual DOM" (see below) to a real DOM tree:
var dom = render(vdom);

// append the new nodes somewhere:
document.body.appendChild(dom);

// Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
var json = JSON.stringify(vdom, null, '  ');

// The whole process (JSX -> VDOM -> DOM) in one step:
document.body.appendChild(render(h("pre", null, json)));
console.log(render(h('div', {
  id: 'foo'
}, 'Hello!', 'World!')));
