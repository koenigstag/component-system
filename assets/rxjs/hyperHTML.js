function s(state, value) {
  return new Subscriber(state, value);
}

function h(tagName, props, ...children) {
  const elem = document.createElement(tagName);

  if (props) {
    for(const key in props) {
      const prop = props[key];

      if (key === 'events') {
        const handlers = prop;
        for (const eventKey in handlers) {
          const handler = handlers[eventKey];
          elem.addEventListener(eventKey, handler);
        }
        continue;
      }

      if (prop instanceof Subscriber) {
        watchEffect(() => {
          if (typeof prop.value === 'function') {
            elem[key] = prop.value(prop.state);
          } else if (typeof prop.value === 'string') {
            console.log(prop);
            elem[key] = prop.state[prop.value];
          }
        });
      } else {
        elem[key] = prop;
      }
    }
  }

  if (typeof children === 'string') {
    elem.append(children);
  } else if(Array.isArray(children)) {
    for (const child of children) {
      if (typeof child === "string" || typeof child === "number") {
        elem.textContent = child;
      } else if (child instanceof Element) {
        elem.append(child);
      }
    }
  }

  return elem;
}