function Header () {
  const headerElem = document.createElement('header');

  // logo, search, phone, buttons

  return headerElem;
}

class HeaderClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
    };
  }

  headerClickEvent = (e) => {
    this.setState({ x: e.x, y: e.y });
  }

  render() {
    const headerElem = Component.createFragment(`
      <header>
        X: ${this.state.x}; Y: ${this.state.y}
      </header>
    `,
    {
      style: { padding: '30px' },
      events: { click: [this.headerClickEvent] },
      children: [new TestChild().redraw()],
    });
    
    return headerElem;
  }
}

class TestChild extends Component {
  constructor(props) {
    super(props);
  }

  handleMouseMove = (e) => {
    console.log(e.x, e.y);
  }

  render() {
    const elem = Component.createFragment('<div>test</div>', { className: "test", events: { mousemove: this.handleMouseMove } })

    return elem;
  }
}
