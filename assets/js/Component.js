
/**
 * React-like class component. Intended for usage with regular DOM
 * - Usage:
 * 1) Inherit Component ```class MyComponent extends Component```
 * 2) Override ```prototype.render()``` method and return component content
 * 3) Create an instance ```component = new Component(props?)```
 * 4) Use ```component.redraw(props?)``` method to get ```render()``` method results
 */
class Component {
  props = {};
  state = {};
  _prevProps = this.props;
  _prevState = this.state;

  _prevRenderedElement;

  constructor(props = this.props) {
    this.props = props;
  };

  set props(value) {
    // if value is not an object instance
    if (typeof newValue !== "object" || value.constructor.name !== 'Object')
      return;

    this._prevProps = this.props;
    this.props = value;
  };

  set state(value) {
    // if value is not an object instance
    if (typeof newValue !== "object" || value.constructor.name !== 'Object')
      return;

    this._prevState = this.state;
    this.state = value;
  };

  redraw(props = this._prevProps) {
    // reassign props
    this.props = props;
    
    // re-render
    const newElem = this.render();
    
    // after first render
    if (this._prevRenderedElement) {
      // replace dom node
      this._prevRenderedElement.replaceWith(newElem);
    }
    
    // assign newly renderred element
    this._prevRenderedHTMLElement = newElem;

    return newElem;
  };

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

  render() {
    throw new Error('Cannot find render() method realisation. Please make sure you created render method in your class');
  };
}
