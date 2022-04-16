import { Component, Fragment } from '../Component.mjs';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      int: 0,
    };
  }

  headerClickEvent = (e) => {
    this.setState((state) => ({ ...state, x: e.x, y: e.y }));
  }

  componentDidMount() {
    setInterval(() => this.setState((state) => ({ ...state, int: state.int + 1 })), 1000);
  }

  render() {
    const headerElem = new Fragment(`
      <header>
        X: ${this.state.x}; Y: ${this.state.y}
        timer: ${this.state.int}
      </header>
    `,
    {
      style: { padding: '30px' },
      events: { click: [this.headerClickEvent] },
    }).rootElement;
    
    return headerElem;
  }
}

export default Header;
