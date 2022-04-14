function Header () {
  const headerElem = document.createElement('header');

  // logo, search, phone, buttons

  return headerElem;
}

class HeaderClass extends Component{
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
    };
  }

  headerClickEvent(e) {
    this.setState({ x: e.x, y: e.y });
  }

  render() {
    const headerElem = document.createElement('header');
    // logo, search, phone, buttons
    
    headerElem.addEventListener('click', (e) => this.headerClickEvent(e));
    headerElem.append(`X: ${this.state.x}; Y: ${this.state.y}`);

    return headerElem;
  }
}
