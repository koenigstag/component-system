import { Component, Fragment } from '../Component.mjs';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      int: 0,
    };
    this.generateReactiveTree();
  }

  headerClickEvent = (e) => {
    this.setState((state) => {
      state.x += 1;
      // state.x = e.x;
      // state.y = e.y;
      return state;
    });
  }

  componentDidMount() {
    this.registerReactiveHandler('int', '&', 'innerText');
    this.registerReactiveHandler('x', '&', 'innerText');

    console.time('interval');
    setInterval(() => this.setState((state) => {
      state.int = state.int + 1;
      return state;
    }), 1000);
  }

  render() {
    const headerElem = new Fragment(`
      <header style="border: 1px solid red;">
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
