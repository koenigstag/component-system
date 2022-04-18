import { Component } from "../../Component.mjs";
import { clsx } from "../../utils/clsx.mjs";

class Header extends Component {
  get defaultState() {
    return {
      x: 0,
      y: 0,
      time: dateFns.format(new Date(), "HH:mm:ssA"),
      timer: 0,
    };
  }

  headerClickEvent = (e) => {
    // save old state plus changes
    // after state changes render method is called
    this.setState((state) => ({ ...state, x: e.x, y: e.y }));
  };

  // is called once the component rendered for the first time
  componentDidMount() {
    setInterval(
      () => this.setState((state) => ({ ...state, timer: state.timer + 1, time: dateFns.format(new Date(), "HH:mm:ssA") })),
      1000
    );
  }

  // is called after each render
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    setTimeout(() => this.componentDidUpdate());

    const { x, y, timer, time } = this.state;

    return this.html`
      <header class="${clsx("content-box", "pageHeader", "d-flex", "justify-content-center", "align-items-center", {
        conditional: timer % 2 === 0,
      })}" onclick=${this.headerClickEvent}>
        <div class="container">
          <div class="row">
            <div class="col">
              X: ${x}; Y: ${y}
            </div>
            <div class="col d-flex justify-content-end">
              Time: ${time}
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

export default Header;
