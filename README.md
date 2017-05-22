# jCurry

Check out this live [Snake](http://maggieliu.me/snake/) demo ([repo](https://github.com/liumaggie/snake)) for an example of using this jCurry library.

## Background

jCurry is a library to simplify DOM manipulation inspired by jQuery. With this library, users can:

* Traverse and manipulate elements (i.e adding/removing elements)
* Create `DOMNodeCollection` as an array from `HTMLElements`
* Handle events
* Store callbacks until DOM is successfully loaded
* Simplify HTTP requests

## API

[`$l`](#$l)

[DOM Traversal](#dom-traversal)

* [each](#each)
* [children](#children)
* [parent](#parent)
* [find](#find)

[DOM Manipulation](#dom-manipulation)

* [html](#html)
* [empty](#empty)
* [append](#append)
* [remove](#remove)
* [attr](#attr)
* [addClass](#addClass)
* [removeClass](#removeClass)

[Event Handling](#event-handling)

* [on](#on)
* [off](#off)

[Ajax](#ajax)


### `$l`

This is the core function of this library. It wraps around queried elements, converting them into a `DOMNodeCollection` (an array of HTMLElements) to easily traverse and manipulate the DOM. It may receive four different types of arguments as explained below.

1. It may take in a CSS selector, such as `'li'`, to select all the `li` elements on the page.
2. It may take in an HTMLElement, such as `<p></p>`, to select all the `<p></p>` elements on the page.
3. It may take in the `window` to return it as a `DOMNodeCollection` for adding event listeners such as `'keydown'`.
3. It may take in a function that will be stored in a queue of functions that would be executed when the `document` is `ready`.

```javascript
window.$l = (selector) =>
  // used as a CSS selector
  if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    const collection = Array.from(nodeList);
    return new DOMNodeCollection(collection);
  // used as a selector for a certain HTMLElement or the window
  } else if (selector instanceof HTMLElement || selector === window) {
    return new DOMNodeCollection([selector]);
  // used as a way to invoke or store the callbacks when the // document is fully loaded
  } else if (typeof selector === 'function') {
    if (document.readyState === 'complete') {
      selector();
    } else {
      readyCallbacks.push(selector);
    }
  }
};
```
In the first three ways to use `$l`, the queried elements are returned as a `DOMNodeCollection` so they have access to methods for traversing, updating or manipulating the DOM.

### DOM Traversal

`DOMNodeCollection` methods for DOM navigation

#### **`each`**
  * Iterates through the elements of `DOMNodeCollection` array, passing in a callback for each element.

#### **`children`**
  * Returns a `DOMNodeCollection` of ALL children of all nodes in the `DOMNodeCollection` array.

#### **`parent`**
  * Returns a `DOMNodeCollection` of the `parent` elements of each node.

#### **`find`**
  * Returns a `DOMNodeCollection` of all descendants of the nodes that match the selector passed in as an argument.


### DOM Manipulation

`DOMNodeCollection` methods for updating the DOM

#### **`html`**
* Gets the HTML contents of the first element in the `DOMNodeCollection` if no argument is given or sets the HTML of each node in the `DOMNodeCollection` to the string argument passed in using `innerHTML`

#### **`empty`**
* Removes all nodes in the `DOMNodeCollection` by clearing out the content of all the nodes.

#### **`append`**
* This method accepts either a `string`, `HTMLElement` or `DOMNodeCollection` as an argument.
* Adds the content, specified by the parameter, to the end of each element in the `DOMNodeCollection`.

#### **`remove`**
* Removes the html of all nodes in the `DOMNodeCollection` array.

#### **`attr`**
* If one argument is given, `attribute`, it gets the value of an attribute for the first element in the `DOMNodeCollection`.
* If two arguments are given, `attribute`, `value` it sets the value of an attribute for each element in the `DOMNodeCollection`.

#### **`addClass`**
* Adds the specified class for each element in the `DOMNodeCollection`.

#### **`removeClass`**
* Removes the specified class for each element in the `DOMNodeCollection`.

### Event Handling

#### **`on`**
* Attaches an event handler callback for the `eventType` on each element of the `DOMNodeCollection`.

#### **`off`**
* Removes event handler for each element of the `DOMNodeCollection`.

### Ajax

**`$l.ajax`**

* Receives an options object argument or uses default argument with parameters for sending a HTTP request.

Arguments include:
  * method: HTTP request type (default: `GET`)
  * url: HTTP request url
  * data: Data to be sent to the server
  * contentType: (default: `'application/x-www-form-urlencoded; charset=UTF-8'`)
  * dataType: Type of data expecting back from the server
  * success: Callback on success
  * error: Callback if there's an error

## Future Features To be Implemented

* Return a `Promise` for the `ajax` request
* Update the `$l` function to include all the other possible selectors, such as for creating new elements
* Add all the jQuery methods in this lightweight library
