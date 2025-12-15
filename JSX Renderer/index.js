/** @jsx h */

// ^^^^ this tells a transpiler to inject calls to an `h()` function for each node.
function h(nodeName, attributes, ...args){
    console.log('h()', nodeName, attributes, args);
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
}

function render(vnode){
    // Strings just convert to text nodes
    if(vnode.split) return document.createTextNode(vnode);
    console.log(vnode, vnode.nodeName, vnode.split);

    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach(k => n.setAttribute(k, a[k]));
     // render (build) and then append child nodes:
    (vnode.children || []).forEach(c => n.appendChild(render(c)));

    return n;
}

const ITEMS = 'hello there people'.split(' ');

// a "partial" that does a filtered loop - no template BS, just functional programming:
function foo(items) {
  // imagine templates that adhere to your JS styleguide...
  return items.map( p => <li> {p} </li> );    // <-- can be multiline
}

// a simple JSX "view" with a call out ("partial") to generate a list from an Array:
let vdom = (
  <div id="foo">
    <p class="hello" id="455">Look, a simple JSX DOM renderer!</p>
    <ul>{ foo(ITEMS) }</ul>
  </div>
);

// render() converts our "virtual DOM" (see below) to a real DOM tree:
let dom = render(vdom);

// append the new nodes somewhere:
document.getElementById("app").appendChild(dom);

// Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
let json = JSON.stringify(vdom, null, '  ');

// The whole process (JSX -> VDOM -> DOM) in one step:
document.body.appendChild(
  render( <pre>{ json }</pre> )
);