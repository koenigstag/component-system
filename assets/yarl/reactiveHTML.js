
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
    // WIP components nesting
    if (!props) props = {};
    if (children?.length) props.children = children;
    
    // TODO props sub

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
      subscribers.children[index] = child;
      children.splice(index, 1, document.createTextNode(child.read()));
    }
  }

  const ref = window.hyperscript(tag, props, children);

  if (ref) {
    for (const key in subscribers) {
      const subscriber = subscribers[key];

      if (key === 'children') {
        for (const index in subscriber) {
          const child = subscriber[index];

          window.watchEffect(() => {
            ref.childNodes[index].textContent = child.read();
          });
        }
      } else {
        window.watchEffect(() => {
          ref[key] = subscriber.read();
        });
      }
    }
  }

  return ref;
}

window.loadStylesheet = function loadStylesheet(absPath, options = { rel: "stylesheet" }) {
  document.head.append(h('link', { rel: options.rel, href: absPath }));
}
