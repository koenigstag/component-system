import { clsx } from "../clsx.mjs";

class Header extends hyperHTML.hyper.Component {
  get defaultState() {
    return {
      x: 0,
      y: 0,
      timer: 0,
    };
  }

  constructor(props) {
    super(props);
    setTimeout(() => this.componentDidMount());
  }

  headerClickEvent = (e) => {
    // save old state plus changes
    // after state changes render method is called
    this.setState((state) => ({ ...state, x: e.x, y: e.y }));
  };

  // is called once the component rendered for the first time
  componentDidMount() {
    setInterval(
      () => this.setState((state) => ({ ...state, timer: state.timer + 1 })),
      1000
    );
  }

  // is called after each render
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    setTimeout(() => this.componentDidUpdate());

    const { x, y, timer } = this.state;

    return this.html`
      <style>
        .pageHeader {
          padding: 30px;
          border: 1px solid red;
        }

        .conditional {
          background: bisque;
        }
      </style>

      <header class="${clsx("pageHeader", { conditional: timer % 2 === 1 })}" onclick=${this.headerClickEvent}>
        X: ${x}; Y: ${y}
        timer: ${timer}
      </header>
    `;
  }
}

export default Header;
