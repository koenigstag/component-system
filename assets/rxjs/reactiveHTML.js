
/*
 * Author: Max
 * Credit: YT channel "Learn Programming Together"
 * YT Playlist: https://www.youtube.com/watch?v=_Mv1WSE8fY0&list=PLu_62Q68DvTqT1wqptF332yXjCU3dXrRb
*/

let activeEffect = null;

function watchEffect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

class Dependency {
  constructor() {
    this.subscribers = new Set();
  }

  // adds watchEffect callback
  depend() {
    if (activeEffect) this.subscribers.add(activeEffect);
  }

  // fires when state changes
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

window.reactiveObj = function reactiveObj(obj) {
  Object.keys(obj).forEach((key) => {
    const dep = new Dependency();
    let value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        if (!Object.is(newValue, value)) {
          value = newValue;
          dep.notify();
        }
      },
    });
  });

  return obj;
}

/* ====================== */

/* 
 * Author: Yevhenii Laphsynov
 * email: koenigstag@gmail.com
*/
class Subscriber {
  constructor(state, value) {
    this.state = state;
    this.value = value;
  }
}

window.s = function s(state, value) {
  return new Subscriber(state, value);
}



window.h = function h(tagName, props, ...children) {
  const ref = document.createElement(tagName);

  if (props) {
    for(const key in props) {
      const prop = props[key];

      if (key === 'events') {
        const handlers = prop;
        for (const eventKey in handlers) {
          const handler = handlers[eventKey];
          ref.addEventListener(eventKey, handler);
        }
        continue;
      }

      if (prop instanceof Subscriber) {
        watchEffect(() => {
          if (typeof prop.value === 'function') {
            ref[key] = prop.value(prop.state);
          } else if (typeof prop.value === 'string') {
            ref[key] = prop.state[prop.value];
          }
        });
      } else {
        ref[key] = prop;
      }
    }
  }

  h.processChildren(ref, children);

  return ref;
}

h.processChildren = function (elem, children) {
  if(Array.isArray(children)) {
    console.log('array');
    for (const child of children) {
      if (typeof child === "string" || typeof child === "number") {
        elem.textContent = child;
      } else if (child instanceof Element) {
        elem.append(child);
      } else if (child instanceof Subscriber) {
        console.log('sub');
    
        watchEffect(() => {
          let content;
    
          if (typeof child.value === 'function') {
            content = child.value(child.state);
          } else if (typeof child.value === 'string') {
            content = child.state[child.value];
          }
    
          console.log(content);
          if (typeof content === "string" || typeof content === "number") {
            content = [content];
          } else if (!Array.isArray(content) || content !== undefined || content !== null || typeof content !== "boolean") {
            throw new TypeError('Unprocessable child in reactive state');
          }
    
          Promise.resolve().then(() => h.processChildren(elem, content));
        });
      }
    }
    return true;
  }

  return false;
};
