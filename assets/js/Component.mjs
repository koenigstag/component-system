export const clsx = (...classes) =>
  classes
    .map((data) => {
      if (typeof data === "string") {
        return data;
      } else if (typeof data === "function") {
        const result = data();

        if (typeof result === "string") {
          return result;
        }
      } else if (data instanceof Object) {
        const arr = [];
        for (const key in data) {
          const cell = data[key];

          if (typeof cell === "function") {
            const result = cell();

            if (typeof result === "string") {
              arr.push(result);
            }
          } else if (Boolean(cell)) {
            arr.push(key);
          }
        }
        return arr;
      }
    })
    .flat(Infinity)
    .filter((v) => typeof v === "string")
    .join(" ");

export const rootDOM = (elemId, child) => {

  const rootDOMElement = document.getElementById(elemId);
  const rootFragment = document.createDocumentFragment();

  // here should be virtual dom calculations using Component class instances
  // instead of that here is calculation of root Element and its children Elements
  if (child instanceof Component) {
    rootFragment.append(child.redraw());
  } else {
    rootFragment.append(child);
  }

  rootDOMElement.append(rootFragment);
}

/**
 * React-like class component. Intended for usage with regular DOM
 * - Usage:
 * 1) Inherit Component ```class MyComponent extends Component```
 * 2) Override ```prototype.render()``` method and return component content
 * 3) Create an instance ```component = new Component(props?)```
 * 4) Use ```component.redraw(props?)``` method to get ```render()``` method results
 */
export class Component {
  props;
  state;
  _prevProps;
  _prevState;

  _prevRenderedElement;

  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  set props(value) {
    // if value is not an object instance
    if (typeof newValue !== "object" || value.constructor.name !== "Object")
      return;

    this._prevProps = this.props;
    this.props = value;
  }

  set state(value) {
    // if value is not an object instance
    if (typeof newValue !== "object" || value.constructor.name !== "Object")
      return;

    this._prevState = this.state;
    this.state = value;
  }

  /* LIFECYCLE methods */
  componentDidMount() {}
  componentDidUpdate(
    prevProps = this._prevProps,
    prevState = this._prevState
  ) {}

  redraw(props = this._prevProps) {
    // reassign props
    this.props = props;

    // re-render
    const newElem = this.render();

    // after first render
    if (
      this._prevRenderedElement &&
      this._prevRenderedElement instanceof Element
      ) {
        // replace dom node
        if (this._prevRenderedElement.replaceWith) {
          this._prevRenderedElement.replaceWith(newElem);
        } else {
          // polyfill
          this._prevRenderedElement.after(newElem);
          this._prevRenderedElement.remove();
        }
      } else {
      // here is bug - didmount = didupdate when creating instance in parent render()
      // so didmount should be called in rootDOM, same for willunmount
      // solution appears to be "architecture-breaking" as while rootDOM works with Element class
      setTimeout(() => this.componentDidMount(), 0);
    }
    setTimeout(() => this.componentDidUpdate(), 0);

    // assign newly renderred element
    this._prevRenderedElement = newElem;

    return newElem;
  }

  setState(newValue, callback = () => {}) {
    // if function - then calculate result; else get value
    const newState =
      typeof newValue === "function" ? newValue(this.state) : newValue;

    // if the same value as prev value
    if (Object.is(newState, this.state)) return;

    // change state
    this.state = newState;

    callback();

    // re-render
    this.redraw();
  }

  static addElementStyle(element, style) {
    if (typeof style === "string") {
      element.style = style;
    } else if (typeof style === "object") {
      for (const cssProp in style) {
        const value = style[cssProp];
        element.style[cssProp] = value;
      }
    }
  }

  static addElementClassName(element, className) {
    if (typeof className === "string") {
      element.className = className;
    } else if (Array.isArray(className)) {
      const classes = clsx(...className);

      element.className = classes;
    }
  }

  static addElementEvents(element, events) {
    for (const eventKey in events) {
      const handler = events[eventKey];
      if (typeof handler === "function") {
        element.addEventListener(eventKey, handler);
      } else if (Array.isArray(handler)) {
        for (const func of handler) {
          element.addEventListener(eventKey, func);
        }
      }
    }
  }

  static addElementChildren(element, children) {
    if (Array.isArray(children)) {
      for (const child of children) {
        this.appendComponentChild(element, child);
      }
    } else {
      this.appendComponentChild(element, children);
    }
  }

  static appendComponentChild(element, child) {
    if (!(element instanceof Element)) return;

    if (child instanceof Component) {
      Promise.resolve().then(() => {
        element.append(child.redraw());
      });
    } else {
      element.append(child);
    }
  }

  static addElementAttributes(element, props) {
    const nonHTMLAttributes = ["style", "className", "events", "children"];
    const filteredAttributes = Object.keys(props).filter(
      (key) => !nonHTMLAttributes.includes(key)
    );
    for (const attribute of filteredAttributes) {
      const value = props[attribute];
      element[attribute] = value;
    }
  }

  static createFragment(markup, props = {}) {
    let element = null;

    if (markup.includes('<') || markup.includes('</')) {
      // convert string to fragment
      const fragment = document
      .createRange()
      .createContextualFragment(markup.trim());

      if (fragment.childElementCount > 1) {
        throw new Error(
          "Only one child element permitted in component first child level"
        );
      }

      element = fragment.firstChild;
    } else {
      element = document.createElement(markup);
    }

    // add styles, attributes, listeners, child nodes
    if (props.style) {
      this.addElementStyle(element, props.style);
    }

    if (props.className) {
      this.addElementClassName(element, props.className);
    }

    if (props.events) {
      this.addElementEvents(element, props.events);
    }

    if (props.children) {
      this.addElementChildren(element, props.children);
    }

    this.addElementAttributes(element, props);

    // get fragment first inner element
    return element;
  }

  render() {
    throw new Error(
      "Cannot find render() method realisation. Please make sure you created render method in your class"
    );
  }
}
