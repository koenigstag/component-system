export class Component extends hyperHTML.hyper.Component {

  _props = {};

  constructor(props) {
    super();
    this.props = props;

    setTimeout(() => this.componentDidMount());
  }

  set props(value) {
    if (this.constructor.propTypes) {
      this.constructor.propTypes.validateSync(value);
    }

    this._props = value;
  }

  get props() {
    return this._props;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    throw new Error('Implement render method');
  }
}
