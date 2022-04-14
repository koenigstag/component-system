
/**
 * React-like class component. Intended for usage with regular DOM
 * - Usage:
 * 1) Inherit Component ```class MyComponent extends Component```
 * 2) Override ```prototype.render()``` method and return component content
 * 3) Create an instance ```component = new Component(props?)```
 * 4) Use ```component.redraw(props?)``` method to get ```render()``` results
 * @class
 * @constructor
 * @public
 */
class Component {
  /**
   * Current props object
   * @property object
   */
  props = {};
  /** 
   * Current state object
   * @property object
   */
  state = {};
  /** 
   * Previous props object
   * @property object
   */
  #prevProps = this.props;
  /** 
   * Previous state object
   * @property object
   */
  #prevState = this.state;

  /** 
   * Used to store prev ```Element``` instance between renders
   * @type Element
   */
  #prevRenderedElement;

  /**
   * @constructor
   * @param {object} props
   */
  constructor(props = this.props) {
    this.props = props;
  };

  /**
   * Props accessor method
   * @param {object} value
   */
  set props(value) {
    // if value is not an object instance or the same value as prev value
    if (typeof newValue !== "object" || value.constructor.name !== 'Object')
      return;

    this.#prevProps = this.props;
    this.props = value;
  };

  /**
   * State accessor method
   * @param {object} value
   */
  set state(value) {
    // if value is not an object instance
    if (typeof newValue !== "object" || value.constructor.name !== 'Object')
      return;

    this.#prevState = this.state;
    this.state = value;
  };

  /* LIFECYCLE methods */
  /** 
   * @see {@link https://ru.reactjs.org/docs/react-component.html#componentdidmount React.Component.componentDidMount} for more information
   */
  componentDidMount() {};
  /**
   * - For more information read ```React.Component.componentDidUpdate``` docs
   * @see {@link https://ru.reactjs.org/docs/react-component.html#componentdidupdate React.Component.componentDidUpdate} for more information
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps = this.#prevProps, prevState = this.#prevState) {};

  /**
   * Used to calculate ```render()``` and make some more stuff
   * @param {object} props
   */
  redraw(props = this.#prevProps) {
    // reassign props
    this.props = props;
    
    // re-render
    const newElem = this.render();
    
    // after first render
    if (this.#prevRenderedElement) {
      // replace dom node
      this.#prevRenderedElement.replaceWith(newElem);
    } else {
      setTimeout(() => this.componentDidMount(), 0);
    }
    setTimeout(() => this.componentDidUpdate(), 0);
    
    // assign newly renderred element
    this.#prevRenderedHTMLElement = newElem;

    return newElem;
  };

  /**
   * Used to set new state object and redraw component
   * @see {@link https://ru.reactjs.org/docs/react-component.html#setstate React.Component.setState} for more information
   * @param {object | function} newValue new state object or function which returns one
   * @param {function | undefined} callback is called after state have changed
   */
  setState(newValue, callback = () => {}) {

    // if function - then calculate result; else get value
    const newState = typeof newValue === "function" ? newValue(this.state) : newValue;
    
    // if the same value as prev value
    if (Object.is(newState, this.state))
      return;
      
      // change state
    this.state = newState;

    callback();

    // re-render
    this.redraw();
  };

  /** 
   * @see {@link https://ru.reactjs.org/docs/react-component.html#forceUpdate React.Component.forceUpdate} for more information
   */
  forceUpdate() {
    // re-render
    this.redraw();
  };

  /**
   * @see {@link https://ru.reactjs.org/docs/react-component.html#render React.Component.render} for more information
   * @returns {Element | string | boolean | number | null | undefined} content
   * @throws {Error} if ```render()``` realisation not found
   */
  render() {
    throw new Error('Cannot find render() method realisation. Please make sure you created render method in your class');
  };
}
