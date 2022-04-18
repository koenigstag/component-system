export class Component extends hyperHTML.hyper.Component {
  constructor(props) {
    super(props);
    this.props = props;

    setTimeout(() => this.componentDidMount());
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    throw new Error('Implement render method');
  }
}
