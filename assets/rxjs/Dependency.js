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

class Subscriber {
  constructor(state, value) {
    this.state = state;
    this.value = value;
  }
}

function reactiveObj(obj) {
  console.log(obj);

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
