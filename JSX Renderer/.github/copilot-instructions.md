# JSX Renderer Project - AI Coding Agent Instructions

## Project Overview

This is a **minimal educational JSX renderer** that demonstrates how JSX syntax works without React or any framework. It transpiles JSX to plain JavaScript and renders a virtual DOM to real DOM elements.

## Architecture

### Core Components (all in [index.js](index.js))

1. **`h(nodeName, attributes, ...args)`** - The JSX pragma function that Babel calls for each JSX element

   - Returns a simple VDOM object: `{ nodeName, attributes, children }`
   - The `/** @jsx h */` directive tells Babel to use this instead of `React.createElement`

2. **`render(vnode)`** - Converts virtual DOM to real DOM

   - Strings become text nodes (using `vnode.split` as a string check)
   - Objects become DOM elements with attributes and recursively rendered children

3. **VDOM Structure** - Plain JavaScript objects with 3 properties:
   ```javascript
   { nodeName: "div", attributes: { id: "foo" }, children: [...] }
   ```

## Build & Development Workflow

### Running the Project (Two Methods)

**Method 1: Browser with Babel Standalone** (zero build step)

- Open [index.html](index.html) directly in browser
- Uses CDN Babel standalone to transpile JSX in-browser
- `<script type="text/babel" src="index.js">` enables live JSX parsing

**Method 2: Pre-transpiled with Babel CLI**

```bash
npm run build   # Transpiles index.js -> dist.js using @babel/cli
npm run start   # Build + run (though dist.js is browser code)
```

### Babel Configuration

- Uses `@babel/plugin-transform-react-jsx` to transform JSX
- The `/** @jsx h */` pragma overrides default `React.createElement` behavior
- Output is ES5-compatible code in [dist.js](dist.js)

## Key Patterns & Conventions

### JSX Without React Pattern

This codebase demonstrates that JSX is **syntax sugar**, not React-specific:

- Any function matching `(nodeName, props, ...children)` can be a JSX pragma
- The transpiler converts `<div id="foo">Hello</div>` to `h("div", {id: "foo"}, "Hello")`

### String Detection Idiom

```javascript
if (vnode.split) return document.createTextNode(vnode);
```

Uses duck typing - strings have a `.split()` method, objects don't. This avoids `typeof` checks.

### Functional Component Pattern

```javascript
function foo(items) {
  return items.map((p) => <li>{p}</li>);
}
// Used as: <ul>{ foo(ITEMS) }</ul>
```

Components are just functions returning VDOM. No class components, no hooks - pure functional JavaScript.

## What This Project Is NOT

- Not a production framework (no event handling, state management, or lifecycle)
- No reconciliation/diffing - re-rendering would replace entire DOM subtrees
- No TypeScript, testing, or linting configured
- Single file architecture - not designed for scaling

## When Working on This Codebase

- Maintain the educational simplicity - this demonstrates concepts, not production patterns
- Keep all logic in [index.js](index.js) unless adding major features
- Preserve the `/** @jsx h */` pragma - removing it breaks JSX transpilation
- Test changes by opening [index.html](index.html) in a browser (fastest iteration)
