
/*
 * Author: Max
 * Credit: YT channel "Learn Programming Together"
 * YT Playlist: https://www.youtube.com/watch?v=_Mv1WSE8fY0&list=PLu_62Q68DvTqT1wqptF332yXjCU3dXrRb
*/

// slightly modified
watchEffect.activeEffect = null;
function watchEffect(fn) {
  watchEffect.activeEffect = fn;
  fn();
  watchEffect.activeEffect = null;
}

window.watchEffect = watchEffect;

class Dependency {
  constructor() {
    this.subscribers = new Set();
  }

  // adds watchEffect callback
  depend() {
    if (watchEffect.activeEffect) this.subscribers.add(window.watchEffect.activeEffect);
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
        // slightly modified
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
  constructor(state, field) {
    this.state = state;
    this.field = field;
  }

  read() {
    if (typeof this.field === 'function') {
      return this.field(this.state);
    } else if (typeof this.field === 'string') {
      return this.state[this.field];
    }
  }
}

window.newState = function newState(obj) {
  const state = reactiveObj(obj);
  const sub = (field) => new Subscriber(state, field);
  
  // return tuple
  return [state, sub];
}

// h (tag | Function | Component, attrs, [text?, Elements?,...])
window.h = function h(tag, props, ...children) {
  if (typeof tag === 'function') {
    if (!props) props = {};
    if (children.length) props.children = children;
    const componentElem = tag(props);

    return componentElem;
  }

  const subscribers = { children: [] };

  if (props) {
    for(const key in props) {
      const prop = props[key];
      
      if (prop instanceof Subscriber) {
        subscribers[key] = prop;
        delete props[key];
      }
    }
  }
  
  for(const index in children) {
    const child = children[index];
    
    if (child instanceof Subscriber) {
      const value = child.read();
      let node = null;
      if (typeof value === 'string' || typeof value === 'number') {
        node = document.createTextNode(value);
      } else if (value instanceof HTMLElement) {
        node = value;
      } else if (Array.isArray(value)) {
        node = value[0];
      }
      children.splice(index, 1, node);

      subscribers.children[index] = child;
    }
  }

  const ref = window.hyperscript(tag, props, children);

  if (ref) {
    for (const index in subscribers.children) {
      const child = subscribers.children[index];

      window.watchEffect(async () => {
        const value = await child.read();
        if (value instanceof HTMLElement) {
          ref.childNodes[index].replaceWith(value);
        } else if (Array.isArray(value)) {
          const listElem = document.createElement('list');
          listElem.append(...value);
          ref.childNodes[index].replaceWith(listElem);
        } else {
          ref.childNodes[index].textContent = value;
        }
      });
    }
    subscribers.children = null;

    for (const key in subscribers) {
      const subscriber = subscribers[key];

      if (key === 'children') {
        continue;
      } else {
        window.watchEffect(async () => {
          ref[key] = await subscriber.read();
        });
      }
    }
  }

  return ref;
}

window.loadStylesheet = function loadStylesheet(absPath, props = { rel: "stylesheet" }) {
  document.head.append(h('link', { ...props, href: absPath }));
}
